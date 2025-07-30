import React from 'react'
import { motion } from 'framer-motion'

interface FraudMeterProps {
  fraudLevel: number // 0-100
}

const FraudMeter: React.FC<FraudMeterProps> = ({ fraudLevel }) => {
  // Convert fraud level (0-100) to angle (-90 to 90 degrees)
  const needleAngle = (fraudLevel / 100) * 180 - 90

  const getColorByLevel = (level: number) => {
    if (level <= 30) return 'text-green-400'
    if (level <= 60) return 'text-yellow-400'
    if (level <= 80) return 'text-orange-400'
    return 'text-red-400'
  }

  const getMeterColor = (level: number) => {
    if (level <= 30) return '#10B981'
    if (level <= 60) return '#F59E0B'
    if (level <= 80) return '#F97316'
    return '#EF4444'
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Compact Mobile Meter */}
      <div className="relative w-48 h-24 md:w-80 md:h-40">
        {/* Background Semicircle */}
        <svg
          width="192"
          height="96"
          viewBox="0 0 192 96"
          className="absolute inset-0 md:hidden"
        >
          {/* Mobile version - smaller */}
          <path
            d="M 24 96 A 72 72 0 0 1 168 96"
            fill="none"
            stroke="#374151"
            strokeWidth="6"
          />
          
          <defs>
            <linearGradient id="meterGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="33%" stopColor="#F59E0B" />
              <stop offset="66%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          
          <path
            d="M 24 96 A 72 72 0 0 1 168 96"
            fill="none"
            stroke="url(#meterGradientMobile)"
            strokeWidth="4"
            strokeDasharray={`${(fraudLevel / 100) * 226} 226`}
            className="transition-all duration-1000 ease-out"
          />

          {/* Meter markings - mobile */}
          {[0, 50, 100].map((mark) => {
            const angle = (mark / 100) * 180 - 90
            const radian = (angle * Math.PI) / 180
            const x1 = 96 + 66 * Math.cos(radian)
            const y1 = 96 + 66 * Math.sin(radian)
            const x2 = 96 + 72 * Math.cos(radian)
            const y2 = 96 + 72 * Math.sin(radian)
            
            return (
              <g key={mark}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <text
                  x={96 + 80 * Math.cos(radian)}
                  y={96 + 80 * Math.sin(radian) + 3}
                  textAnchor="middle"
                  className="fill-gray-400 text-xs font-semibold"
                >
                  {mark}
                </text>
              </g>
            )
          })}

          {/* Needle - mobile */}
          <motion.g
            animate={{ rotate: needleAngle }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformOrigin: "96px 96px" }}
          >
            <line
              x1="96"
              y1="96"
              x2="96"
              y2="36"
              stroke={getMeterColor(fraudLevel)}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="96"
              cy="36"
              r="3"
              fill={getMeterColor(fraudLevel)}
            />
          </motion.g>

          {/* Center pivot - mobile */}
          <circle
            cx="96"
            cy="96"
            r="8"
            fill="#1F2937"
            stroke="#374151"
            strokeWidth="2"
          />
          <circle
            cx="96"
            cy="96"
            r="4"
            fill={getMeterColor(fraudLevel)}
            className="transition-colors duration-500"
          />
        </svg>

        {/* Desktop version */}
        <svg
          width="320"
          height="160"
          viewBox="0 0 320 160"
          className="absolute inset-0 hidden md:block"
        >
          {/* Desktop version - original size */}
          <path
            d="M 40 160 A 120 120 0 0 1 280 160"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            className="drop-shadow-lg"
          />
          
          <defs>
            <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="33%" stopColor="#F59E0B" />
              <stop offset="66%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          
          <path
            d="M 40 160 A 120 120 0 0 1 280 160"
            fill="none"
            stroke="url(#meterGradient)"
            strokeWidth="6"
            strokeDasharray={`${(fraudLevel / 100) * 377} 377`}
            className="transition-all duration-1000 ease-out drop-shadow-md"
          />

          {/* Meter markings - desktop */}
          {[0, 25, 50, 75, 100].map((mark) => {
            const angle = (mark / 100) * 180 - 90
            const radian = (angle * Math.PI) / 180
            const x1 = 160 + 110 * Math.cos(radian)
            const y1 = 160 + 110 * Math.sin(radian)
            const x2 = 160 + 120 * Math.cos(radian)
            const y2 = 160 + 120 * Math.sin(radian)
            
            return (
              <g key={mark}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <text
                  x={160 + 135 * Math.cos(radian)}
                  y={160 + 135 * Math.sin(radian) + 5}
                  textAnchor="middle"
                  className="fill-gray-400 text-sm font-semibold"
                >
                  {mark}
                </text>
              </g>
            )
          })}

          {/* Needle - desktop */}
          <motion.g
            animate={{ rotate: needleAngle }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformOrigin: "160px 160px" }}
          >
            <line
              x1="160"
              y1="160"
              x2="160"
              y2="60"
              stroke={getMeterColor(fraudLevel)}
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-lg"
            />
            <circle
              cx="160"
              cy="60"
              r="4"
              fill={getMeterColor(fraudLevel)}
              className="drop-shadow-lg"
            />
          </motion.g>

          {/* Center pivot - desktop */}
          <circle
            cx="160"
            cy="160"
            r="12"
            fill="#1F2937"
            stroke="#374151"
            strokeWidth="2"
            className="drop-shadow-lg"
          />
          <circle
            cx="160"
            cy="160"
            r="6"
            fill={getMeterColor(fraudLevel)}
            className="transition-colors duration-500"
          />
        </svg>

        {/* Digital Display */}
        <div className="absolute bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-gray-800 border border-gray-600 rounded px-2 py-1 md:px-4 md:py-2 shadow-xl">
            <div className={`text-lg md:text-2xl font-mono font-bold ${getColorByLevel(fraudLevel)} text-center`}>
              {fraudLevel.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400 text-center hidden md:block">
              FRAUD LEVEL
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-0 -left-4 text-green-400 text-xs md:text-sm font-semibold">
          SAFE
        </div>
        <div className="absolute bottom-0 -right-10 text-red-400 text-xs md:text-sm font-semibold">
          FRAUD
        </div>
      </div>

      {/* Status indicator - hidden on mobile to save space */}
      <div className="mt-4 px-3 py-1 rounded-full bg-gray-800 border border-gray-600 hidden md:block">
        <div className={`flex items-center space-x-2 ${getColorByLevel(fraudLevel)}`}>
          <div className={`w-2 h-2 rounded-full bg-current animate-pulse`}></div>
          <span className="text-xs font-semibold">
            {fraudLevel <= 30 ? 'Low Risk' : 
             fraudLevel <= 60 ? 'Medium Risk' : 
             fraudLevel <= 80 ? 'High Risk' : 'Critical Risk'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default FraudMeter
