import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Login from './auth/login';
import Signup from './auth/signup';
import quizData from './data/quizData.json';
import './styles/main.css';
import './styles/quiz.css';
import './styles/auth.css';
import './styles/background.css';
import './styles/animations.css';

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setQuizCompleted(false);
    setScore(0);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/quiz" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/signup" element={
          user ? <Navigate to="/quiz" /> : <Signup onSignup={handleSignup} />
        } />
        <Route path="/quiz" element={
          user ? (
            !quizCompleted ? (
              <Quiz 
                questions={quizData} 
                onComplete={(finalScore) => {
                  setScore(finalScore);
                  setQuizCompleted(true);
                }} 
                onLogout={handleLogout}
              />
            ) : (
              <Result 
                score={score} 
                totalQuestions={quizData.length} 
                onRestart={() => {
                  setQuizCompleted(false);
                  setScore(0);
                }}
                onLogout={handleLogout}
              />
            )
          ) : <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to={user ? "/quiz" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App; 