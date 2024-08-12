import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Results.css';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { results, questions } = location.state;

    const calculateScore = () => {
        let correctCount = 0;
        let incorrectCount = 0;

        for (const questionId in results) {
            if (results[questionId]) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        }

        return {
            correctCount,
            incorrectCount,
            totalQuestions: questions.length
        };
    };

    const score = calculateScore();

    const handleGoToHtml = () => {
        navigate('/yilan');
    };

    return (
        <div className="result">
            <div className="quiz-results">
                <h2>Quiz Completed!</h2>
                <p>Puan : {score.correctCount * 10 + 10}</p>
                <p>Doğru Cevaplar : {score.correctCount + 1}</p>
                <p>Yanlış Cevaplar : {score.incorrectCount}</p>
                <p>! Her Soru 10 Puandır !</p>
                <button onClick={handleGoToHtml}>Yılan Oyununa Git</button>
            </div>
        </div>
    );
};

export default Results;
