import Home from './components/Home.jsx'
import LogIn from './components/LogIn.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}