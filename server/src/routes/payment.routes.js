import { Router } from 'express';
import { createPaymentInvoice, handleXenditWebhook } from '../controllers/payment.controller.js';
import { requireAuth } from '../middleware/clerkAuth.js';
import { validateBody } from '../middleware/validate.js';
import { createPaymentInvoiceSchema } from '../schemas/payment.schema.js';

const router = Router();

router.post('/create-invoice', requireAuth, validateBody(createPaymentInvoiceSchema), createPaymentInvoice);

router.post('/webhook', handleXenditWebhook);

export default router;
