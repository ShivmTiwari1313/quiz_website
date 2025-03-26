import { useState } from 'react';
import '../styles/quiz.css';
import '../styles/animations.css';

const Quiz = ({ questions, onComplete, onLogout})=>{
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    // Check if answer is correct
    const isCorrect = currentQuestion.options[selectedOption] === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowFeedback(true);

    // Move to next question or complete quiz after delay
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onComplete(score + (isCorrect ? 1 : 0));
      }
    }, 1500);
  };

  const getOptionClass = (index) => {
    let className = 'option';
    if (selectedOption === index) className += ' selected';
    if (showFeedback) {
      if (currentQuestion.options[index] === currentQuestion.correctAnswer) {
        className += ' correct';
      } else if (selectedOption === index) {
        className += ' incorrect';
      }
    }
    return className;
  };

  return (
    <div className="quiz-container">
    <div className="quiz-card fade-in">
    <button 
        onClick={onLogout}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'none',
          border: 'none',
          color: '#3498db',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        Logout
      </button>
      <div className="question-counter">
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <h2 className="question-text">{currentQuestion.question}</h2>

      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleOptionSelect(index)}
          >
            <div className="option-label">
              <div className="option-radio"></div>
              {option}
            </div>
          </div>
        ))}
      </div>

      <button
        className={`btn btn-primary btn-block ${selectedOption !== null ? 'pulse' : ''}`}
        onClick={handleNextQuestion}
        disabled={selectedOption === null}
      >
        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
      </button>
    </div>
    </div>
  );
};

export default Quiz;