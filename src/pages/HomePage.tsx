import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-black px-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Fraud Meter
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Test your ability to detect fraudulent statements. Click on suspicious sentences to move the fraud meter!
        </p>
        <Link 
          to="/game"
          className="w-full py-3 px-20 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white font-semibold rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
        >
          Start Game
        </Link>
      </div>
    </div>
  )
}

export default HomePage
