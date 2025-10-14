import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const lines = [
    { color: 'gold', name: 'Gold Line' },
    { color: 'red', name: 'Red Line' },
    { color: 'green', name: 'Green Line' },
    { color: 'blue', name: 'Blue Line' }
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>MARTA Interface</h1>
        <button onClick={() => navigate('/about')} className="nav-link">
          About MARTA
        </button>
      </div>

      <div>
        <h2>Select a Line</h2>
        <div className="line-selector">
          {lines.map((line) => (
            <button
              key={line.color}
              onClick={() => navigate(`/lines/${line.color}`)}
              className={`line-button ${line.color}`}
            >
              {line.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
