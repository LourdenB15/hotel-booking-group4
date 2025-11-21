import { useParams } from 'react-router-dom'

export default function PropertyDetails() {
  const { id } = useParams()

  return (
    <div className="p-lg">
      <h1 className="text-[length:var(--font-size-title)] font-bold text-dark mb-md">
        Property Details
      </h1>
      <p className="text-medium">
        Viewing property: <span className="font-mono text-primary">{id}</span>
      </p>
    </div>
  )
}
