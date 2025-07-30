import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Fixed Header with Meter */}
      <div className="z-10 sticky top-0 bg-black backdrop-blur-sm border-b border-gray-800/50 px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <Link 
            to="/" 
            className="group p-2 rounded-2xl bg-black backdrop-blur-sm border border-gray-800/50 text-gray-300 hover:text-white hover:border-gray-700/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
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
      <div className="relative z-10 flex-1">
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
                    className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg z-50 backdrop-blur-sm border ${
                      showFeedback.correct 
                        ? 'bg-gray-800/80 text-white border-gray-600/50' 
                        : 'bg-gray-800/80 text-gray-300 border-gray-600/50'
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Game Completed!
              </h2>
              
              <div className="bg-black backdrop-blur-sm rounded-3xl p-6 border border-gray-800/50 space-y-4">
                <div className="text-xl text-white">
                  Final Fraud Level: <span className={`font-bold ${gameState.fraudLevel > 70 ? 'text-white' : gameState.fraudLevel > 40 ? 'text-gray-300' : 'text-gray-400'}`}>
                    {gameState.fraudLevel}%
                  </span>
                </div>
                <div className="text-sm text-gray-400 leading-relaxed">
                  {getFinalMessage(gameState.fraudLevel)}
                </div>
              </div>
              
              <div className="space-y-3">
                <motion.button
                  onClick={resetGame}
                  className="w-full px-6 py-3 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white rounded-2xl font-semibold border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Play Again
                </motion.button>
                <Link
                  to="/"
                  className="block w-full px-6 py-3 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-gray-300 rounded-2xl font-semibold border border-gray-700/50 hover:border-gray-600/50 hover:text-white transition-all duration-300 text-center"
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