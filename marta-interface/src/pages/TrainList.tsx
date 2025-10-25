import React from 'react';
import Train from '../components/Train';

interface TrainData {
  DESTINATION: string;
  DIRECTION: string;
  EVENT_TIME: string;
  LINE: string;
  NEXT_ARR: string;
  STATION: string;
  TRAIN_ID: string;
  WAITING_SECONDS: string;
  WAITING_TIME: string;
  DELAY: string;
}

interface TrainListProps {
  color: string;
  data: TrainData[] | null;
  selectedStation: string | null;
  filters: {
    arriving: boolean;
    scheduled: boolean;
    direction: string | null;
  };
}

export default function TrainList({ color, data, selectedStation, filters }: TrainListProps) {
  if (!data) {
    return <div className="loading">Loading train data...</div>;
  }

  // Filter trains by line color
  let filteredTrains = data.filter(train => train.LINE.toLowerCase() === color.toLowerCase());

  // Filter by selected station
  if (selectedStation) {
    filteredTrains = filteredTrains.filter(train => train.STATION === selectedStation);
  }

  // Filter by arriving/scheduled
  if (filters.arriving) {
    filteredTrains = filteredTrains.filter(train => train.DELAY === "T0S");
  }
  
  if (filters.scheduled) {
    filteredTrains = filteredTrains.filter(train => train.DELAY !== "T0S");
  }

  // Filter by direction
  if (filters.direction) {
    const isGreenOrBlue = color.toLowerCase() === 'green' || color.toLowerCase() === 'blue';
    let directionValue = filters.direction;
    
    if (isGreenOrBlue) {
      directionValue = filters.direction === 'Eastbound' ? 'E' : 'W';
    } else {
      directionValue = filters.direction === 'Northbound' ? 'N' : 'S';
    }
    
    filteredTrains = filteredTrains.filter(train => train.DIRECTION === directionValue);
  }

  return (
    <div>
      <h2>{color.toUpperCase()} Line Trains ({filteredTrains.length} trains)</h2>

      {filteredTrains.length === 0 ? (
        <div className="no-trains">
          No Current Trains Match Filters
        </div>
      ) : (
        <div className="train-list">
          {filteredTrains.map((train, index) => (
            <Train key={`${train.TRAIN_ID}-${index}`} {...train} />
          ))}
        </div>
      )}
    </div>
  );
}
