import React from 'react';

interface Station {
  STATION: string;
  [key: string]: any;
}

interface NavBarProps {
  color: string;
  data: Station[] | null;
  selectedStation: string | null;
  onStationSelect: (station: string) => void;
}

export default function NavBar({ color, data, selectedStation, onStationSelect }: NavBarProps) {
  if (!data) {
    return <div className="loading">Loading stations...</div>;
  }

  return (
    <div>
      <h2>{color.toUpperCase()} Line Stations</h2>
      <div className="stations">
        {data.map((station, index) => (
          <button
            key={index}
            onClick={() => onStationSelect(station.STATION)}
            className={`station-button ${selectedStation === station.STATION ? 'active' : ''}`}
          >
            {station.STATION}
          </button>
        ))}
      </div>
      
      {selectedStation && (
        <p>Showing trains for: <strong>{selectedStation}</strong></p>
      )}
    </div>
  );
}
