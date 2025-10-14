import React from 'react';

interface TrainProps {
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

export default function Train({ 
  DESTINATION, 
  DIRECTION, 
  EVENT_TIME, 
  LINE, 
  NEXT_ARR, 
  STATION, 
  TRAIN_ID, 
  WAITING_SECONDS, 
  WAITING_TIME, 
  DELAY 
}: TrainProps) {
  const isOnTime = DELAY === "T0S";
  const statusClass = isOnTime ? "status on-time" : "status delayed";
  const statusText = isOnTime ? "On Time" : "Delayed";

  return (
    <div className="train-card">
      <h3>{DESTINATION}</h3>
      <span className={statusClass}>{statusText}</span>
      
      <div className="train-info">
        <div><strong>Train ID:</strong> {TRAIN_ID}</div>
        <div><strong>Direction:</strong> {DIRECTION}</div>
        <div><strong>Next Arrival:</strong> {NEXT_ARR}</div>
        <div><strong>Waiting Time:</strong> {WAITING_TIME}</div>
        <div><strong>Station:</strong> {STATION}</div>
        <div><strong>Waiting Seconds:</strong> {WAITING_SECONDS}</div>
      </div>
    </div>
  );
}
