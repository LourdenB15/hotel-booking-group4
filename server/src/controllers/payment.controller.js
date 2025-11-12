import prisma from '../config/database.js';
import { createXenditInvoice } from '../services/payment.service.js';
import { clerkClient } from '@clerk/express';

export async function createPaymentInvoice(req, res) {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        error: 'Booking ID is required'
      });
    }

    const booking = await prisma.booking.findUnique({
      where: { bookingId },
      include: {
        property: true,
        roomType: true,
        user: true,
        payment: true
      }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (booking.user.clerkUserId !== req.auth.userId) {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to create an invoice for this booking'
      });
    }

    if (booking.payment) {
      if (booking.payment.paymentStatus === 'PAID') {
        return res.status(400).json({
          success: false,
          error: 'This booking has already been paid'
        });
      }

      if (booking.payment.paymentStatus === 'PENDING' || booking.payment.paymentStatus === 'FAILED') {
        return res.status(400).json({
          success: false,
          error: 'An invoice already exists for this booking',
          data: {
            invoiceId: booking.payment.xenditInvoiceId,
            paymentStatus: booking.payment.paymentStatus
          }
        });
      }
    }

    const clerkUser = await clerkClient.users.getUser(req.auth.userId);
    const userEmail = clerkUser.emailAddresses[0]?.emailAddress || clerkUser.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        error: 'User email not found. Please update your profile.'
      });
    }

    const description = `Hotel Booking - ${booking.property.name} (${booking.roomType.name})`;

    const invoiceData = await createXenditInvoice({
      bookingId: booking.bookingId,
      amount: booking.totalAmount,
      userEmail: userEmail,
      description: description
    });

    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        xenditInvoiceId: invoiceData.invoiceId,
        amount: booking.totalAmount,
        paymentStatus: 'PENDING'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Payment invoice created successfully',
      data: {
        invoiceUrl: invoiceData.invoiceUrl,
        invoiceId: invoiceData.invoiceId,
        amount: booking.totalAmount,
        bookingId: booking.bookingId,
        propertyName: booking.property.name,
        roomType: booking.roomType.name,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate
      }
    });

  } catch (error) {
    console.error('Create Payment Invoice Error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to create payment invoice',
      message: error.message
    });
  }
}

export async function handleXenditWebhook(req, res) {
  try {
    console.log('Xendit Webhook Received:', JSON.stringify(req.body, null, 2));

    const { id, external_id, status, paid_amount, payment_method } = req.body;

    if (!id || !external_id || !status) {
      console.error('Missing required webhook data:', { id, external_id, status });
      return res.status(200).json({ received: true });
    }

    if (status === 'PAID') {
      const payment = await prisma.payment.findUnique({
        where: { xenditInvoiceId: id },
        include: {
          booking: {
            include: {
              property: true,
              roomType: true,
              user: true
            }
          }
        }
      });

      if (!payment) {
        console.error('Payment not found for xenditInvoiceId:', id);
        return res.status(200).json({ received: true });
      }

      if (payment.paymentStatus === 'PAID') {
        console.log('Payment already marked as PAID:', id);
        return res.status(200).json({ received: true });
      }

      const expectedAmount = payment.booking.totalAmount;
      const paidAmount = paid_amount || 0;
      const amountDifference = Math.abs(expectedAmount - paidAmount);

      if (amountDifference > 1) {
        console.error('Payment amount mismatch:', {
          expected: expectedAmount,
          paid: paidAmount,
          difference: amountDifference,
          bookingId: payment.booking.bookingId,
          xenditInvoiceId: id
        });

        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            paymentStatus: 'FAILED',
            transactionDate: new Date()
          }
        });

        return res.status(200).json({
          received: true,
          error: 'Amount mismatch - payment marked as FAILED'
        });
      }

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          paymentStatus: 'PAID',
          paymentMethod: payment_method || null,
          transactionDate: new Date()
        }
      });

      await prisma.booking.update({
        where: { id: payment.booking.id },
        data: {
          bookingStatus: 'CONFIRMED'
        }
      });

      console.log('Payment and Booking updated successfully:', {
        paymentId: payment.id,
        bookingId: payment.booking.bookingId,
        xenditInvoiceId: id,
        amount: paidAmount
      });

    } else if (status === 'EXPIRED' || status === 'FAILED') {
      const payment = await prisma.payment.findUnique({
        where: { xenditInvoiceId: id }
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            paymentStatus: status === 'EXPIRED' ? 'FAILED' : 'FAILED',
            transactionDate: new Date()
          }
        });

        console.log('Payment marked as FAILED:', {
          paymentId: payment.id,
          xenditInvoiceId: id,
          status
        });
      }
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Xendit Webhook Error:', error);
    return res.status(200).json({ received: true });
  }
}
