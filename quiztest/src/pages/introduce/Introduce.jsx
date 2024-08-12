    import React, { useState, useEffect } from "react";
    import './Introduce.css';
    import Dropdown from "../../components/dropdown/Dropdown";
    import { useNavigate } from "react-router-dom";

    const Introduce = () => {
        const [questionType, setQuestionType] = useState([]); 
        const [questionTypeChange, setQuestionTypeChange] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/options/getall'); // Buraya gerçek API URL'inizi yazın
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log('API response:', data); // API yanıtını konsola yazdırıyoruz
                    if (data.success && Array.isArray(data.data)) { // Verinin doğru formatta olduğundan emin olun
                        const questionTypes = data.data
                            .map(item  => {
                                console.log('item:', item);
                                return item.question?.questionType;
                            }) // Optional chaining kullanarak questionType'a erişiyoruz
                            .filter(Boolean); // null veya undefined değerleri filtreliyoruz
        
                        console.log('questionTypes:', questionTypes);
                        const uniqueQuestionTypes = [...new Set(questionTypes)]; // Benzersiz değerleri almak için Set kullanıyoruz
                        setQuestionType(uniqueQuestionTypes);
                    } else {
                        console.error('Received data is not in the expected format:', data);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
        
            fetchData();
        }, []);
        
        

        const startQuiz = () => {
            if (questionTypeChange) {
                navigate(`/quiz/${questionTypeChange}`);
            }
        }

        return (
            <div className="introduce">
                <div className="introduce-container">
                    <img src="https://png.pngtree.com/png-vector/20230503/ourmid/pngtree-quiz-time-bubble-speech-banner-vector-design-png-image_7078139.png" alt="" />
                    <Dropdown data={questionType} setQuestion_typeChange={setQuestionTypeChange} />
                    <div onClick={startQuiz} className="introduce-btn">Quiz Başla</div>
                </div>
            </div>
        );
    }

    export default Introduce;
