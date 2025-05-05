import { useEffect } from 'react'

const AboutPage = () => {
  useEffect(() => {
    // Set document title when component mounts
    document.title = 'About - Stitch'
  }, [])
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-heading font-bold mb-6">About StitchHunt</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-heading font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-300 mb-4">
          StitchHunt is reimagining how indie games are discovered, purchased, and enjoyed. We're building
          a platform that gives independent developers the tools and visibility they need to succeed, while
          providing players with a curated experience to find their next favorite game.
        </p>
        <p className="text-gray-300">
          We believe in supporting creativity and innovation in game development, and our platform aims to
          create sustainable opportunities for indie developers to thrive while connecting them directly with
          their audience.
        </p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-heading font-semibold mb-4">For Developers</h2>
        <p className="text-gray-300 mb-4">
          StitchHunt offers a powerful set of tools designed specifically for indie developers:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li>Simple game publishing with flexible pricing options</li>
          <li>Built-in community features to connect with your players</li>
          <li>Detailed analytics to understand your audience</li>
          <li>Fair revenue sharing model</li>
          <li>Developer-focused support and resources</li>
        </ul>
        <p className="text-gray-300">
          Join thousands of independent developers who have found success on StitchHunt.
        </p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-heading font-semibold mb-4">For Players</h2>
        <p className="text-gray-300 mb-4">
          StitchHunt is more than just a store - it's a community for game enthusiasts:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li>Discover unique games you won't find anywhere else</li>
          <li>Connect directly with developers and other players</li>
          <li>Support independent creators</li>
          <li>Enjoy a curated, personalized experience</li>
          <li>Access games across multiple platforms</li>
        </ul>
        <p className="text-gray-300">
          Your next favorite game is waiting to be discovered.
        </p>
      </div>
    </div>
  )
}

export default AboutPage