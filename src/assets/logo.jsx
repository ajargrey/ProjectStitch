import { FaGamepad } from 'react-icons/fa'

const Logo = ({ className = "h-8 w-auto" }) => {
  return (
    <div className="flex items-center space-x-2">
      <FaGamepad className={className} />
      <span className="text-2xl font-heading font-bold text-white">Stitch</span>
    </div>
  )
}

export default Logo