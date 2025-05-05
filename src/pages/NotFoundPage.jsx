import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-heading font-bold mb-6">404</h1>
      <h2 className="text-2xl font-heading mb-4">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary px-8 py-3">
        Return to Home
      </Link>
    </div>
  )
}

export default NotFoundPage