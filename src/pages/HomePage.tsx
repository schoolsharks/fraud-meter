import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Fraud Meter
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Test your ability to detect fraudulent statements. Click on suspicious sentences to move the fraud meter!
        </p>
      </div>
        <Link 
          to="/game"
          className="w-full text-center max-w-60 py-3 text-black font-semibold bg-[#96FF43] mt-16"
        >
          Start Game
        </Link>
    </div>
  )
}

export default HomePage
