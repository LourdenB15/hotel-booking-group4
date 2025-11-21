import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-lightest p-lg">
      <div className="mx-auto">
        <h1 className="text-[length:var(--font-size-title)] font-bold text-primary mb-lg">
          SkyBridge Travels
        </h1>
        <p className="text-medium mb-md">
          Tailwind CSS v4 with custom theme is working!
        </p>

        <div className="bg-white rounded-xl shadow-md p-lg mb-md">
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-sm">
            Theme Test
          </h2>
          <div className="flex gap-sm flex-wrap">
            <span className="bg-primary text-white px-md py-sm rounded-md">Primary</span>
            <span className="bg-success text-white px-md py-sm rounded-md">Success</span>
            <span className="bg-error text-white px-md py-sm rounded-md">Error</span>
            <span className="bg-warning text-dark px-md py-sm rounded-md">Warning</span>
            <span className="bg-info text-white px-md py-sm rounded-md">Info</span>
          </div>
        </div>

        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-primary hover:bg-primary-hover text-white px-lg py-md rounded-md font-semibold transition-colors cursor-pointer"
        >
          Count is {count}
        </button>

        <div className="bg-white rounded-xl shadow-md p-lg mt-md">
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-sm">
            Environment Variables Test
          </h2>
          <ul className="text-[length:var(--font-size-small)] text-medium space-y-xs font-mono">
            <li>
              VITE_API_URL: {import.meta.env.VITE_API_URL || <span className="text-error">Not set</span>}
            </li>
            <li>
              VITE_CLERK_PUBLISHABLE_KEY: {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?
                <span className="text-success">✓ Set</span> :
                <span className="text-error">✗ Not set</span>}
            </li>
            <li>
              VITE_XENDIT_PUBLIC_KEY: {import.meta.env.VITE_XENDIT_PUBLIC_KEY ?
                <span className="text-success">✓ Set</span> :
                <span className="text-error">✗ Not set</span>}
            </li>
            <li>
              VITE_CLOUDINARY_CLOUD_NAME: {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?
                <span className="text-success">✓ Set</span> :
                <span className="text-error">✗ Not set</span>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
