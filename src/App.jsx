import './App.css'
import LatexEditor from './components/LatexEditor'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<LatexEditor />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
