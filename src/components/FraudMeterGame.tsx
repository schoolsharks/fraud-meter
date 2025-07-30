import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FraudMeter from './FraudMeter'
import TextGameArea from './TextGameArea'

interface GameState {
  fraudLevel: number // 0-100
  score: number
  gameCompleted: boolean
  currentTextIndex: number
}

const GAME_TEXTS = [
  {
    id: 1,
    content: "Welcome to our comprehensive guide on digital security and fraud prevention. In today's interconnected world, it's essential to understand the various threats that exist online.",
    clickable: false,
    isFraud: false
  },
  {
    id: 2,
    content: "Recently, I received an email from a Nigerian prince who needs my help transferring $10 million dollars to the United States.",
    clickable: true,
    isFraud: true
  },
  {
    id: 3,
    content: "This type of scam, known as advance fee fraud, has been around for decades and continues to target unsuspecting individuals. The perpetrators often pose as wealthy individuals, government officials, or lottery organizations.",
    clickable: false,
    isFraud: false
  },
  {
    id: 4,
    content: "Another common tactic involves urgent messages claiming that your bank account has been compromised and requesting immediate verification of your login credentials.",
    clickable: true,
    isFraud: true
  },
  {
    id: 5,
    content: "Legitimate banks and financial institutions will never ask for sensitive information via email or text messages. They have secure channels for communication and verification processes.",
    clickable: false,
    isFraud: false
  },
  {
    id: 6,
    content: "Yesterday, while browsing social media, I saw an advertisement promising a free iPhone 15 Pro Max with just one click - no strings attached!",
    clickable: true,
    isFraud: true
  },
  {
    id: 7,
    content: "These 'free' offers are rarely genuine and often lead to data harvesting or subscription traps. When something seems too good to be true, it usually is.",
    clickable: false,
    isFraud: false
  },
  {
    id: 8,
    content: "Phishing emails have become increasingly sophisticated, mimicking the design and language of legitimate companies. They often create a sense of urgency to pressure recipients into quick action.",
    clickable: false,
    isFraud: false
  },
  {
    id: 9,
    content: "I was told that my PayPal account would be suspended immediately unless I verify my information by clicking on a provided link.",
    clickable: true,
    isFraud: true
  },
  {
    id: 10,
    content: "Always verify such claims by logging into your account directly through the official website rather than clicking links in emails. Check the sender's email address carefully for any irregularities.",
    clickable: false,
    isFraud: false
  },
  {
    id: 11,
    content: "Lottery scams are another prevalent form of fraud, where victims are informed they've won a substantial prize in a lottery they never entered.",
    clickable: false,
    isFraud: false
  },
  {
    id: 12,
    content: "Congratulations! You've won $50,000 in the International Email Lottery! Simply pay a processing fee of $500 to claim your winnings.",
    clickable: true,
    isFraud: true
  },
  {
    id: 13,
    content: "Legitimate lotteries do not require upfront payments to claim winnings. This is a clear red flag that should alert anyone to the fraudulent nature of such communications.",
    clickable: false,
    isFraud: false
  },
  {
    id: 14,
    content: "Online shopping scams have also increased significantly, especially on social media platforms and fake e-commerce websites. Scammers create professional-looking sites to steal payment information.",
    clickable: false,
    isFraud: false
  },
  {
    id: 15,
    content: "Romance scams target individuals seeking companionship online. Scammers create fake profiles and build emotional relationships before requesting money for emergencies or travel expenses.",
    clickable: false,
    isFraud: false
  },
  {
    id: 16,
    content: "My grandmother fell victim to a phone scam where someone claimed to be her grandson in jail, needing bail money urgently.",
    clickable: true,
    isFraud: true
  },
  {
    id: 17,
    content: "These emergency scams prey on people's emotions and desire to help loved ones. Always verify such claims by contacting the person directly through known phone numbers.",
    clickable: false,
    isFraud: false
  },
  {
    id: 18,
    content: "Technology support scams involve cold calls claiming there are issues with your computer or software that need immediate attention. The caller often requests remote access to your device.",
    clickable: false,
    isFraud: false
  },
  {
    id: 19,
    content: "A representative from Microsoft called me saying my computer was infected with viruses and offered to fix it remotely for a fee.",
    clickable: true,
    isFraud: true
  },
  {
    id: 20,
    content: "Microsoft and other major tech companies do not make unsolicited calls about computer problems. Such calls are always scams designed to gain access to your system or steal money.",
    clickable: false,
    isFraud: false
  },
  {
    id: 21,
    content: "Investment scams promise unrealistic returns with little to no risk. They often use terms like 'guaranteed profits' or 'exclusive opportunities' to attract victims.",
    clickable: false,
    isFraud: false
  },
  {
    id: 22,
    content: "I was offered an exclusive cryptocurrency investment opportunity with guaranteed 300% returns within 30 days by a financial advisor I met online.",
    clickable: true,
    isFraud: true
  },
  {
    id: 23,
    content: "Remember that all investments carry risk, and legitimate investment opportunities are properly regulated and do not guarantee unrealistic returns.",
    clickable: false,
    isFraud: false
  },
  {
    id: 24,
    content: "Social engineering attacks manipulate people into divulging confidential information. These attacks rely on human psychology rather than technical vulnerabilities.",
    clickable: false,
    isFraud: false
  },
  {
    id: 25,
    content: "Education and awareness are the best defenses against fraud. Stay informed about new scam tactics, trust your instincts, and always verify suspicious communications through official channels.",
    clickable: false,
    isFraud: false
  },
  {
    id: 26,
    content: "The local police department called asking for a donation to support officers' families, requesting immediate payment via gift cards.",
    clickable: true,
    isFraud: true
  },
  {
    id: 27,
    content: "Legitimate charities and organizations do not request payments through gift cards or wire transfers. These payment methods are preferred by scammers because they're difficult to trace and reverse.",
    clickable: false,
    isFraud: false
  }
]

const FraudMeterGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    fraudLevel: 50,
    score: 0,
    gameCompleted: false,
    currentTextIndex: 0
  })

  const [selectedTexts, setSelectedTexts] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: ''
  })

  const handleTextClick = (textId: number, isFraud: boolean) => {
    if (selectedTexts.includes(textId)) return

    setSelectedTexts(prev => [...prev, textId])

    const isCorrectGuess = isFraud
    let newFraudLevel = gameState.fraudLevel
    let newScore = gameState.score
    let feedbackMessage = ''

    if (isCorrectGuess) {
      // Correct: detected fraud
      newFraudLevel = Math.min(100, gameState.fraudLevel + 15)
      newScore += 10
      feedbackMessage = 'Fraud detected! Good catch!'
    } else {
      // Wrong: thought legitimate text was fraud
      newFraudLevel = Math.max(0, gameState.fraudLevel - 10)
      newScore = Math.max(0, gameState.score - 5)
      feedbackMessage = 'Oops! That was legitimate text.'
    }

    setGameState(prev => ({
      ...prev,
      fraudLevel: newFraudLevel,
      score: newScore
    }))

    setShowFeedback({
      show: true,
      correct: isCorrectGuess,
      message: feedbackMessage
    })

    setTimeout(() => {
      setShowFeedback({ show: false, correct: false, message: '' })
    }, 2000)

    // Check if game should end
    if (selectedTexts.length + 1 >= GAME_TEXTS.filter(t => t.clickable).length) {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, gameCompleted: true }))
      }, 2500)
    }
  }

  const resetGame = () => {
    setGameState({
      fraudLevel: 50,
      score: 0,
      gameCompleted: false,
      currentTextIndex: 0
    })
    setSelectedTexts([])
    setShowFeedback({ show: false, correct: false, message: '' })
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden text-white p-8">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/" 
            className="group p-3 rounded-2xl bg-black backdrop-blur-sm border border-gray-800/50 text-gray-300 hover:text-white hover:border-gray-700/50 transition-all duration-300 flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span>Back to Home</span>
          </Link>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">Score: {gameState.score}</div>
            <div className="text-sm text-gray-400">
              Clickable items: {selectedTexts.length}/{GAME_TEXTS.filter(t => t.clickable).length}
            </div>
          </div>
        </div>

        {/* Game Content */}
        <AnimatePresence mode="wait">
          {!gameState.gameCompleted ? (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Fraud Meter */}
              <div className="flex justify-center">
                <FraudMeter fraudLevel={gameState.fraudLevel} />
              </div>

              {/* Text Game Area */}
              <TextGameArea
                texts={GAME_TEXTS}
                selectedTexts={selectedTexts}
                onTextClick={handleTextClick}
              />

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback.show && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded-2xl font-semibold text-lg shadow-2xl z-50 backdrop-blur-sm border ${
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Game Completed!
              </h2>
              <div className="space-y-4">
                <div className="text-2xl text-white">
                  Final Score: <span className="font-bold">{gameState.score}</span>
                </div>
                <div className="text-xl text-white">
                  Fraud Level: <span className={`font-bold ${gameState.fraudLevel > 70 ? 'text-white' : gameState.fraudLevel > 40 ? 'text-gray-300' : 'text-gray-400'}`}>
                    {gameState.fraudLevel}%
                  </span>
                </div>
                <div className="text-lg text-gray-400">
                  {gameState.fraudLevel > 70 
                    ? "High fraud alert! You caught most of the fraudulent statements." 
                    : gameState.fraudLevel > 40 
                    ? "Moderate detection. You caught some fraud but missed others."
                    : "Low fraud level. You may have been too cautious with legitimate content."
                  }
                </div>
              </div>
              <div className="space-x-4">
                <motion.button
                  onClick={resetGame}
                  className="px-6 py-3 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white rounded-2xl font-semibold border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-gray-300 rounded-2xl font-semibold border border-gray-700/50 hover:border-gray-600/50 hover:text-white transition-all duration-300"
                >
                  Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FraudMeterGame