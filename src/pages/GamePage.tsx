import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FraudMeter from "../components/FraudMeter";
import TextGameArea from "../components/TextGameArea";
import { gameTexts } from "../data/gameTexts";

interface GameState {
  fraudLevel: number; // 0-100
  gameCompleted: boolean;
  selectedTexts: number[];
}

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    fraudLevel: 50,
    gameCompleted: false,
    selectedTexts: [],
  });

  const [showFeedback, setShowFeedback] = useState<{
    show: boolean;
    correct: boolean;
    message: string;
  }>({
    show: false,
    correct: false,
    message: "",
  });

  const handleTextClick = (textId: number, isFraud: boolean) => {
    if (gameState.selectedTexts.includes(textId)) return;

    const newSelectedTexts = [...gameState.selectedTexts, textId];
    setGameState((prev) => ({ ...prev, selectedTexts: newSelectedTexts }));

    const isCorrectGuess = isFraud;
    let newFraudLevel = gameState.fraudLevel;
    let feedbackMessage = "";

    if (isCorrectGuess) {
      // Correct: detected fraud
      newFraudLevel = Math.min(100, gameState.fraudLevel + 12);
      feedbackMessage = "Fraud detected! 🎯";
    } else {
      // Wrong: thought legitimate text was fraud
      newFraudLevel = Math.max(0, gameState.fraudLevel - 8);
      feedbackMessage = "Not fraud! 📝";
    }

    setGameState((prev) => ({
      ...prev,
      fraudLevel: newFraudLevel,
    }));

    setShowFeedback({
      show: true,
      correct: isCorrectGuess,
      message: feedbackMessage,
    });

    setTimeout(() => {
      setShowFeedback({ show: false, correct: false, message: "" });
    }, 1500);

    // Check if game should end
    const clickableTexts = gameTexts.filter((t) => t.clickable);
    if (newSelectedTexts.length >= clickableTexts.length) {
      setTimeout(() => {
        setGameState((prev) => ({ ...prev, gameCompleted: true }));
      }, 2000);
    }
  };


  const getFinalMessage = (fraudLevel: number) => {
    if (fraudLevel > 80)
      return "🚨 High fraud alert! You caught most fraudulent statements.";
    if (fraudLevel > 60)
      return "⚠️ Moderate detection. Good awareness but some fraud slipped through.";
    if (fraudLevel > 40)
      return "📊 Balanced detection. You were cautious with your selections.";
    return "✅ Low fraud level. You were very conservative but missed some actual fraud.";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] relative overflow-hidden">

      {/* Fixed Header with Meter */}
      <div className="z-10 sticky top-0 bg-[#0D0D0D] backdrop-blur-sm border-b border-gray-800/50 px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <Link
            to="/"
            className="group p-2 rounded-2xl bg-[#0D0D0D] backdrop-blur-sm border border-gray-800/50 text-gray-300 hover:text-white hover:border-gray-700/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          </Link>
          <div className="text-xs text-gray-400">
            {gameState.selectedTexts.length}/
            {gameTexts.filter((t) => t.clickable).length} clicked
          </div>
        </div>

        {/* Compact Fraud Meter for Mobile */}
        <div className="flex justify-center pb-2">
          <FraudMeter fraudLevel={gameState.fraudLevel} />
        </div>
      </div>

      {/* Game Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <AnimatePresence mode="wait">
          {!gameState.gameCompleted ? (
            <motion.div
              key="game"
              className="px-4 py-6"
            >
              <TextGameArea
                texts={gameTexts}
                selectedTexts={gameState.selectedTexts}
                onTextClick={handleTextClick}
                onFinish={()=>setGameState((prev)=>({...prev,gameCompleted:true}))}
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
                        ? "bg-gray-800/80 text-white border-gray-600/50"
                        : "bg-gray-800/80 text-gray-300 border-gray-600/50"
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
              className="px-4 py-8 space-y-6 flex flex-col flex-1"
            >
              <h2 className="text-3xl font-bold text-white text-center">Game Completed!</h2>

              <div className="bg-[#0D0D0D] backdrop-blur-sm  p-6 border border-gray-800/50 space-y-4">
                <div className="text-xl text-white text-center">
                  Final Fraud Level:{" "}
                  <span
                    className={`font-bold ${
                      gameState.fraudLevel > 70
                        ? "text-white"
                        : gameState.fraudLevel > 40
                        ? "text-gray-300"
                        : "text-gray-400"
                    }`}
                  >
                    {gameState.fraudLevel}%
                  </span>
                </div>
                <div className="text-sm text-gray-400 leading-relaxed">
                  {getFinalMessage(gameState.fraudLevel)}
                </div>
              </div>

              <div className="space-y-3 mt-auto">
                <motion.button
                  onClick={() => navigate("/blind-spots")}
                  className="w-full px-6 py-3 bg-[#96FF43] backdrop-blur-sm text-black font-semibold "
                >
                  See Blind Spots
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamePage;
