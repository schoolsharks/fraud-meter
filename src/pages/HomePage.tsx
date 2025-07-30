import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-[#0D0D0D] px-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white">
          Fraud Meter
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Test your ability to detect fraudulent statements. Click on suspicious sentences to move the fraud meter!
        </p>
        <Link 
          to="/game"
          className="w-full py-3 px-20 text-black font-semibold bg-[#96FF43]"
        >
          Start Game
        </Link>
      </div>
    </div>
  )
}

export default HomePage
