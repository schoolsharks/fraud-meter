import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import BlindSpots from './pages/BlindSpots'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D0D0D] text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/blind-spots" element={<BlindSpots />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
