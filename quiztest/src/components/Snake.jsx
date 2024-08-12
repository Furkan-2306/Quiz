import React from 'react';

const Snake = ({ snakeDots }) => {
  return (
    <>
      {snakeDots.map((dot, i) => (
        <div
          className="snake-dot"
          key={i}
          style={{
            top: `${dot[1]}%`,
            left: `${dot[0]}%`
          }}
        />
      ))}
    </>
  );
};

export default Snake;
