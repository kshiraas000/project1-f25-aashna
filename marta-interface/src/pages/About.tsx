import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <h1>About MARTA</h1>
        <button onClick={() => navigate('/')} className="nav-link">
          Back to Home
        </button>
      </div>

      <div>
        <h2>MARTA System Map</h2>
        <p>🗺️ Interactive MARTA system map showing all four rail lines and their connections.</p>
        
        <h2>About MARTA</h2>
        <p>
          The Metropolitan Atlanta Rapid Transit Authority (MARTA) is the principal public transport operator 
          in the Atlanta metropolitan area. MARTA operates a network of bus routes linked to a rapid transit 
          system consisting of 48 miles (77 km) of rail track with 38 train stations.
        </p>
        
        <p>
          MARTA's rail system consists of four lines: the Red Line, Gold Line, Blue Line, and Green Line. 
          The system provides convenient access to Hartsfield-Jackson Atlanta International Airport, 
          downtown Atlanta, and many other key destinations throughout the metropolitan area.
        </p>

        <h3>System Statistics</h3>
        <ul>
          <li>4 Rail Lines</li>
          <li>38 Stations</li>
          <li>48 Miles of Track</li>
          <li>Opened in 1979</li>
        </ul>
      </div>
    </div>
  );
}
