import React, { useState, useEffect } from 'react';
import Snake from '../../components/Snake';
import './Game.css';

const Game = () => {
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0]
  ]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState(getRandomCoordinates());
  const [speed, setSpeed] = useState(100); // Hızı artırmak için 200'den 100'e düşürdük
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);


  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];

      switch (direction) {
        case 'RIGHT':
          head = [head[0] + 2, head[1]];
          break;
        case 'LEFT':
          head = [head[0] - 2, head[1]];
          break;
        case 'DOWN':
          head = [head[0], head[1] + 2];
          break;
        case 'UP':
          head = [head[0], head[1] - 2];
          break;
        default:
          break;
      }

      dots.push(head);
      dots.shift();
      setSnakeDots(dots);
    };

    const checkIfOutOfBorders = () => {
      let head = snakeDots[snakeDots.length - 1];
      if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
        setGameOver(true);
      }
    };

    const checkIfCollapsed = () => {
      let snake = [...snakeDots];
      let head = snake[snake.length - 1];
      snake.pop();
      snake.forEach(dot => {
        if (head[0] === dot[0] && head[1] === dot[1]) {
          setGameOver(true);
        }
      });
    };


    const checkIfEat = () => {
      let head = snakeDots[snakeDots.length - 1];
      if (head[0] === food[0] && head[1] === food[1]) {
        setFood(getRandomCoordinates());
        enlargeSnake();
        increaseSpeed();
        setScore(score + 10); // Skoru artır
      }
    };
    

    const gameLoop = setInterval(() => {
      moveSnake();
      checkIfOutOfBorders();
      checkIfCollapsed();
      checkIfEat();
    }, speed);

    return () => clearInterval(gameLoop);
  }, [snakeDots, direction, food, speed, gameOver]);

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 30) {
      setSpeed(speed - 5);
    }
  };

  return (
    <div className="game-container">
      <div className="game-area">
        {gameOver ? (
          <div className="game-over">
            <h1>Game Over</h1>
            <p>Your Score: {score}</p> {/* Skor gösterimi */}
            <button className="but" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <>
            <Snake snakeDots={snakeDots} />
            <div className="food" style={{ top: `${food[1]}%`, left: `${food[0]}%` }}></div>
          </>
        )}
      </div>
    </div>
  );}
  

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

export default Game;
