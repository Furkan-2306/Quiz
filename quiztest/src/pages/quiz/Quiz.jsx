import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [results, setResults] = useState({});
    const [timer, setTimer] = useState(15);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/options/getall`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data.success && data.data.length > 0) { 
                    const groupedQuestions = groupOptionsByQuestion(data.data);
                    console.log('Grouped Questions:', groupedQuestions); 
                    setQuestions(groupedQuestions);
                } else {
                    console.error('No data or unsuccessful response:', data);
                }
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        if (questions.length === 0) {
            return; 
        }
        
        if (currentQuestionIndex >= questions.length) {
            navigate('/results', { state: { results, questions } });
            return;
        }

        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 1) {
                    handleNextQuestion();
                    return 10;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentQuestionIndex, questions]);

    const groupOptionsByQuestion = (options) => {
        const questionsMap = new Map();
        options.forEach(option => {
            const questionId = option.question.questionId;
            if (!questionsMap.has(questionId)) {
                questionsMap.set(questionId, {
                    id: questionId,
                    questionText: option.question.questionText,
                    options: []
                });
            }
            questionsMap.get(questionId).options.push({
                id: option.id,
                optionText: option.optionText,
                isCorrect: option.isCorrect
            });
        });
        return Array.from(questionsMap.values());
    };

    const handleAnswerSelect = (questionId, optionId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: optionId
        });

        const question = questions.find(q => q.id === questionId);
        const isCorrect = question.options.find(opt => opt.id === optionId).isCorrect;

        setResults(prevResults => ({
            ...prevResults,
            [questionId]: isCorrect
        }));

        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setTimer(15);
        } else {
            navigate('/results', { state: { results, questions } });
        }
    };

    if (questions.length === 0) {
        return <div className="quiz">Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz">
          <div className="quiz-text">
            <div className="timer-question-container">
                <h3>{`${currentQuestionIndex + 1}/${questions.length} - ${currentQuestion.questionText}`}</h3>
                <div className="timer">{timer}</div>
            </div>
            <div className="options-container">
                {currentQuestion.options.map(option => (
                    <button
                        key={option.id}
                        onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                        className={`answer-button ${
                            selectedAnswers[currentQuestion.id] === option.id
                                ? (option.isCorrect ? "correct" : "incorrect")
                                : ""
                        }`}
                    >
                        {option.optionText}
                    </button>
                ))}
            </div>
          </div>
        </div>
    );
};

export default Quiz;
