import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="p-lg text-center">
      <h1 className="text-[length:var(--font-size-hero)] font-bold text-dark mb-md">
        404
      </h1>
      <p className="text-medium mb-lg">
        Page not found
      </p>
      <Link
        to="/"
        className="bg-primary hover:bg-primary-hover text-white px-lg py-md rounded-md font-semibold transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
