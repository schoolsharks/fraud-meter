import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { gameTexts } from "../data/gameTexts";

const BlindSpots = () => {
  const blindSpotsData = gameTexts.filter(
    (item) => item.isFraud && item.percentage
  );
  const navigate = useNavigate();
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Fraud Meter",
          url: window.location.origin,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Copy link to clipboard when sharing is not supported
      navigator.clipboard
        .writeText(window.location.origin)
        .then(() => {
          alert("Link copied to clipboard! Share it with your friends.");
        })
        .catch(() => {
          alert("Unable to copy link. Please copy the URL manually.");
        });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#0D0D0D] min-h-screen p-6">
      <div className="flex items-center mb-8 justify-between">
        <Link to="/">
          <motion.button
            className="p-3 rounded-full hover:bg-[#252525]/10 text-white hover:text-white"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#252525",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
          </motion.button>
        </Link>
        <h1 className="text-3xl font-bold text-white text-center">
          Blind Spots
        </h1>
        <motion.button
          onClick={() => navigate("/game")}
          className="p-3 rounded-full hover:bg-[#252525]/10 text-white hover:text-white"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#252525",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        </motion.button>
      </div>

      <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
        These are common scenarios that people often miss when detecting fraud.
        See how you compare with others!
      </p>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {blindSpotsData.map((blindSpot, index) => (
          <div
            key={index}
            className="p-6 bg-[#252525] hover:bg-[#2a2a2a] transition-colors"
          >
            <div className="mb-4">
              <p className="text-white text-lg leading-relaxed">
                {blindSpot.content}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm font-medium">
                  Detection Rate
                </span>
                <span className="text-white font-bold text-lg">
                  {blindSpot.percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#464646]  h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out bg-[#96FF43]`}
                  style={{ width: `${blindSpot.percentage}%` }}
                ></div>
              </div>

              {blindSpot.percentage && (
                <div className="mt-2 text-xs text-gray-400">
                  {blindSpot.percentage >= 70
                    ? "Most people caught this fraud attempt"
                    : blindSpot.percentage >= 40
                    ? "Some people missed this warning sign"
                    : "This is a common blind spot - many people miss this"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          * Percentages based on user performance data
        </p>
      </div>
      <button
        onClick={handleShare}
        className="p-2 text-xl font-medium cursor-pointer mt-4 w-full bg-[#96FF43] text-black"
      >
        Share
      </button>
    </div>
  );
};

export default BlindSpots;
