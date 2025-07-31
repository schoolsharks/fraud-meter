import React from "react";
import { motion } from "framer-motion";
import type { TextItem } from "../data/gameTexts";

interface TextGameAreaProps {
  texts: TextItem[];
  selectedTexts: number[];
  onTextClick: (textId: number, isFraud: boolean) => void;
  onFinish: () => void;
}

const TextGameArea: React.FC<TextGameAreaProps> = ({
  texts,
  selectedTexts,
  onTextClick,
  onFinish,
}) => {
  const getTextStyle = (text: TextItem) => {
    const isSelected = selectedTexts.includes(text.id);

    if (!text.clickable) {
      return "text-gray-400";
    }

    if (isSelected) {
      return text.isFraud
        ? "bg-gray-800/60 text-white   px-2 py-1"
        : "bg-gray-800/40 text-gray-300 border border-gray-700/60  px-2 py-1";
    }

    return "text-gray-300 hover:text-white hover:bg-gray-800/30 cursor-pointer border border-gray-700/30 hover:border-gray-600/60  px-2 py-1 transition-all duration-200";
  };

  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-300 px-2">
        Read the text and spot the fraud. Tap on anything that
        doesn’t feel right.
      </h3>

      {/* Scrollable Text Container */}
      <div className="bg-[#252525] backdrop-blur-sm shadow-xl mx-2">
        <div className={`overflow-y-auto p-4 md:p-6`} style={{maxHeight:`${window.innerHeight - 360}px`}}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-base md:text-lg leading-relaxed text-justify space-y-1"
          >
            {texts.map((text, index) => (
              <React.Fragment key={text.id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className={`
                    ${getTextStyle(text)}
                    ${text.clickable ? "py-1" : ""}
                    ${
                      selectedTexts.includes(text.id) && text.isFraud
                        ? "bg-red-500/10"
                        : ""
                    }
                  `}
                  onClick={() => {
                    if (text.clickable && !selectedTexts.includes(text.id)) {
                      onTextClick(text.id, text.isFraud);
                    }
                  }}
                  style={{
                    cursor:
                      text.clickable && !selectedTexts.includes(text.id)
                        ? "pointer"
                        : "default",
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
                        <span className="text-white">⚠️</span>
                      ) : (
                        <span className="text-gray-400">❌</span>
                      )}
                    </motion.span>
                  )}
                </motion.div>
                {/* Add space between sentences */}
                {index < texts.length - 1 && <span> </span>}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Instructions - Compact for Mobile */}
        <div className="p-4 bg-gray-900/40 backdrop-blur-sm border-t">
          <div className="text-xs md:text-sm text-gray-500 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-white"></span>
                <span>Fraud detected ⚠️</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-600"></span>
                <span>Wrong guess ❌</span>
              </div>
            </div>
            <div className="text-center text-gray-600">
              Tap sentences with subtle borders to select them
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <button
          onClick={onFinish}
          className="p-2 text-xl font-medium cursor-pointer mt-4 w-full bg-[#96FF43] text-black"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default TextGameArea;
