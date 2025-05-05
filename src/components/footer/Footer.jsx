import { Link } from 'react-router-dom'
import Logo from '../../assets/logo'
import { FaGithub, FaTwitter, FaDiscord, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="h-7 w-auto mb-4" />
            <p className="text-gray-400 text-sm mb-4">
              StitchHunt is the best place to discover and play indie games. 
              Support creators and find your next favorite game.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaDiscord className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-gray-200 mb-4">About StitchHunt</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white transition-colors text-sm">Press Kit</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-gray-200 mb-4">Developers</h3>
            <ul className="space-y-2">
              <li><Link to="/developers" className="text-gray-400 hover:text-white transition-colors text-sm">Get Started</Link></li>
              <li><Link to="/documentation" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</Link></li>
              <li><Link to="/forum" className="text-gray-400 hover:text-white transition-colors text-sm">Forum</Link></li>
              <li><Link to="/status" className="text-gray-400 hover:text-white transition-colors text-sm">Status</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors text-sm">Tools & SDKs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-gray-200 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</Link></li>
              <li><Link to="/refunds" className="text-gray-400 hover:text-white transition-colors text-sm">Refund Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 StitchHunt. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <select className="bg-gray-800 text-gray-400 text-sm rounded px-2 py-1 border border-gray-700">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
            <select className="bg-gray-800 text-gray-400 text-sm rounded px-2 py-1 border border-gray-700">
              <option value="usd">$ USD</option>
              <option value="eur">€ EUR</option>
              <option value="gbp">£ GBP</option>
              <option value="jpy">¥ JPY</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer