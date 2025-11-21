import { useParams } from 'react-router-dom'

export default function BookingConfirmation() {
  const { id } = useParams()

  return (
    <div className="p-lg text-center">
      <div className="text-success text-6xl mb-md">✓</div>
      <h1 className="text-[length:var(--font-size-title)] font-bold text-dark mb-md">
        Booking Confirmed!
      </h1>
      <p className="text-medium mb-sm">
        Your booking ID:
      </p>
      <p className="font-mono text-primary text-lg">{id}</p>
    </div>
  )
}
