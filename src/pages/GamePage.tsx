import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import FraudMeter from '../components/FraudMeter'
import TextGameArea from '../components/TextGameArea'
import { gameTexts } from '../data/gameTexts'

interface GameState {
  fraudLevel: number // 0-100
  gameCompleted: boolean
  selectedTexts: number[]
}

const GamePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    fraudLevel: 50,
    gameCompleted: false,
    selectedTexts: []
  })

  const [showFeedback, setShowFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: ''
  })

  const handleTextClick = (textId: number, isFraud: boolean) => {
    if (gameState.selectedTexts.includes(textId)) return

    const newSelectedTexts = [...gameState.selectedTexts, textId]
    setGameState(prev => ({ ...prev, selectedTexts: newSelectedTexts }))

    const isCorrectGuess = isFraud
    let newFraudLevel = gameState.fraudLevel
    let feedbackMessage = ''

    if (isCorrectGuess) {
      // Correct: detected fraud
      newFraudLevel = Math.min(100, gameState.fraudLevel + 12)
      feedbackMessage = 'Fraud detected! 🎯'
    } else {
      // Wrong: thought legitimate text was fraud
      newFraudLevel = Math.max(0, gameState.fraudLevel - 8)
      feedbackMessage = 'Not fraud! 📝'
    }

    setGameState(prev => ({
      ...prev,
      fraudLevel: newFraudLevel
    }))

    setShowFeedback({
      show: true,
      correct: isCorrectGuess,
      message: feedbackMessage
    })

    setTimeout(() => {
      setShowFeedback({ show: false, correct: false, message: '' })
    }, 1500)

    // Check if game should end
    const clickableTexts = gameTexts.filter(t => t.clickable)
    if (newSelectedTexts.length >= clickableTexts.length) {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, gameCompleted: true }))
      }, 2000)
    }
  }

  const resetGame = () => {
    setGameState({
      fraudLevel: 50,
      gameCompleted: false,
      selectedTexts: []
    })
    setShowFeedback({ show: false, correct: false, message: '' })
  }

  const getFinalMessage = (fraudLevel: number) => {
    if (fraudLevel > 80) return "🚨 High fraud alert! You caught most fraudulent statements."
    if (fraudLevel > 60) return "⚠️ Moderate detection. Good awareness but some fraud slipped through."
    if (fraudLevel > 40) return "📊 Balanced detection. You were cautious with your selections."
    return "✅ Low fraud level. You were very conservative but missed some actual fraud."
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Fixed Header with Meter */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Home</span>
          </Link>
          <div className="text-xs text-gray-400">
            {gameState.selectedTexts.length}/{gameTexts.filter(t => t.clickable).length} clicked
          </div>
        </div>
        
        {/* Compact Fraud Meter for Mobile */}
        <div className="flex justify-center pb-2">
          <FraudMeter fraudLevel={gameState.fraudLevel} />
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {!gameState.gameCompleted ? (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 py-6"
            >
              <TextGameArea
                texts={gameTexts}
                selectedTexts={gameState.selectedTexts}
                onTextClick={handleTextClick}
              />

              {/* Feedback Toast */}
              <AnimatePresence>
                {showFeedback.show && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full font-semibold text-sm shadow-lg z-50 ${
                      showFeedback.correct 
                        ? 'bg-green-600 text-white' 
                        : 'bg-orange-600 text-white'
                    }`}
                  >
                    {showFeedback.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="game-over"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-8 text-center space-y-6"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Game Completed!
              </h2>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 space-y-4">
                <div className="text-xl">
                  Final Fraud Level: <span className={`font-bold ${gameState.fraudLevel > 70 ? 'text-red-400' : gameState.fraudLevel > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {gameState.fraudLevel}%
                  </span>
                </div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  {getFinalMessage(gameState.fraudLevel)}
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={resetGame}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300"
                >
                  Play Again
                </button>
                <Link
                  to="/"
                  className="block w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all duration-300 text-center"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default GamePage
