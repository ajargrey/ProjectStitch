import { useEffect, useState } from 'react'

const SupportPage = () => {
  useEffect(() => {
    // Set document title when component mounts
    document.title = 'Support - StitchHunt'
  }, [])
  
  const [activeCategory, setActiveCategory] = useState('general')
  
  const supportCategories = [
    { id: 'general', name: 'General Help' },
    { id: 'account', name: 'Account Issues' },
    { id: 'purchases', name: 'Purchases & Refunds' },
    { id: 'technical', name: 'Technical Support' },
    { id: 'developers', name: 'Developer Support' },
  ]
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-heading font-bold mb-6">Support Center</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 pl-10"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="md:w-1/4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-heading font-semibold mb-4">Help Categories</h2>
            <ul className="space-y-2">
              {supportCategories.map(category => (
                <li key={category.id}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">Need more help?</h3>
              <p className="text-sm text-gray-300 mb-3">
                Our support team is ready to assist you with any questions or issues.
              </p>
              <button className="btn btn-primary w-full">Contact Support</button>
            </div>
          </div>
        </div>
        
        <div className="md:w-3/4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-heading font-semibold mb-6">
              {supportCategories.find(c => c.id === activeCategory)?.name}
            </h2>
            
            <div className="space-y-4">
              {activeCategory === 'general' && (
                <>
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="font-medium mb-2 text-lg">How do I create an account?</h3>
                    <p className="text-gray-300">
                      Creating an account on StitchHunt is easy. Click on the "login" button in the top right corner
                      of any page, then select "Create Account". Follow the prompts to complete your registration.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="font-medium mb-2 text-lg">What payment methods are accepted?</h3>
                    <p className="text-gray-300">
                      StitchHunt accepts various payment methods including credit/debit cards, PayPal, and regional
                      payment options. You can view all available payment methods during checkout or in your account settings.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="font-medium mb-2 text-lg">How do I download my purchased games?</h3>
                    <p className="text-gray-300">
                      After purchasing a game, you can download it from your library. Navigate to your account
                      and select "Library" to see all your purchased games. Click on any game to access download options.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 text-lg">Can I gift games to friends?</h3>
                    <p className="text-gray-300">
                      Yes! When purchasing a game, look for the "Purchase as Gift" option on the game's page or during
                      checkout. You'll be able to send the game directly to a friend's email or StitchHunt account.
                    </p>
                  </div>
                </>
              )}
              
              {activeCategory !== 'general' && (
                <div className="text-center py-8">
                  <div className="mb-4 text-gray-400">
                    <svg
                      className="mx-auto h-16 w-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-gray-300">
                    We're currently updating our support articles for this category.
                    Please check back soon or contact our support team for immediate assistance.
                  </p>
                  <button className="btn btn-primary mt-4">Contact Support</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage