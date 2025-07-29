import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Fraud Meter
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Test your ability to detect fraudulent statements. Click on suspicious sentences to move the fraud meter!
        </p>
        <Link 
          to="/game"
          className="inline-block w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Start Game
        </Link>
      </div>
    </div>
  )
}

export default HomePage
