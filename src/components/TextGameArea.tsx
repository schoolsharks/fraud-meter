import React from 'react'
import { motion } from 'framer-motion'
import type { TextItem } from '../data/gameTexts'

interface TextGameAreaProps {
  texts: TextItem[]
  selectedTexts: number[]
  onTextClick: (textId: number, isFraud: boolean) => void
}

const TextGameArea: React.FC<TextGameAreaProps> = ({ texts, selectedTexts, onTextClick }) => {
  const getTextStyle = (text: TextItem) => {
    const isSelected = selectedTexts.includes(text.id)
    
    if (!text.clickable) {
      return "text-gray-300"
    }
    
    if (isSelected) {
      return text.isFraud 
        ? "bg-red-500/25 text-red-200 border border-red-400/50 rounded-sm px-1" 
        : "bg-orange-500/25 text-orange-200 border border-orange-400/50 rounded-sm px-1"
    }
    
    return "text-gray-200 hover:text-white hover:bg-gray-600/20 cursor-pointer border border-gray-500/30 hover:border-gray-400/60 rounded-sm px-1 transition-all duration-200"
  }

  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-300 px-2">
        Read the text and tap on suspicious statements
      </h3>
      
      {/* Scrollable Text Container */}
      <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 shadow-xl backdrop-blur-sm mx-2">
        <div className="h-[calc(100vh-280px)] overflow-y-auto p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-base md:text-lg leading-relaxed text-justify space-y-1"
          >
            {texts.map((text, index) => (
              <React.Fragment key={text.id}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className={`
                    ${getTextStyle(text)}
                    ${text.clickable ? 'py-0.5' : ''}
                  `}
                  onClick={() => {
                    if (text.clickable && !selectedTexts.includes(text.id)) {
                      onTextClick(text.id, text.isFraud)
                    }
                  }}
                  style={{
                    cursor: text.clickable && !selectedTexts.includes(text.id) ? 'pointer' : 'default'
                  }}
                >
                  {text.content}
                  
                  {/* Selection indicator - only show after click */}
                  {selectedTexts.includes(text.id) && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-1 text-xs"
                    >
                      {text.isFraud ? (
                        <span className="text-red-300">⚠️</span>
                      ) : (
                        <span className="text-orange-300">❌</span>
                      )}
                    </motion.span>
                  )}
                </motion.span>
                {/* Add space between sentences */}
                {index < texts.length - 1 && <span> </span>}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
        
        {/* Instructions - Compact for Mobile */}
        <div className="p-4 bg-gray-900/40 border-t border-gray-600/30">
          <div className="text-xs md:text-sm text-gray-400 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Fraud detected ⚠️</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>Wrong guess ❌</span>
              </div>
            </div>
            <div className="text-center text-gray-500">
              Tap sentences with subtle borders to select them
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextGameArea
