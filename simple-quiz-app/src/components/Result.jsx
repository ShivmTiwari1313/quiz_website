import { useEffect, useRef } from 'react';
import '../styles/quiz.css';
import '../styles/animations.css';

const Result = ({ score, totalQuestions, onRestart }) => {
  const circleRef = useRef(null);
  const percentage = Math.round((score / totalQuestions) * 100);
  const circumference = 2 * Math.PI * 70; // Radius of 70

  useEffect(() => {
    if (circleRef.current) {
      const offset = circumference - (percentage / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset;
    }
  }, [percentage, circumference]);

  return (
    <div className="quiz-card result-card slide-up">
      <div className="score-circle">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" stroke="#ecf0f1" strokeWidth="10" />
          <circle 
            ref={circleRef}
            cx="80" 
            cy="80" 
            r="70" 
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>
        <div className="score-circle-inner">{percentage}%</div>
      </div>

      <h2 className="result-title">
        {percentage >= 70 ? 'Excellent!' : percentage >= 50 ? 'Good Job!' : 'Keep Practicing!'}
      </h2>
      <p className="result-score">
        You scored {score} out of {totalQuestions}
      </p>

      <button 
        className="btn btn-primary"
        onClick={onRestart}
      >
        Try Again
      </button>
    </div>
  );
};

export default Result;