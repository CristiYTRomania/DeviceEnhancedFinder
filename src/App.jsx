import Home from './components/Home.jsx'
import LogIn from './components/LogIn.jsx'
import SignUp from './components/Register.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}