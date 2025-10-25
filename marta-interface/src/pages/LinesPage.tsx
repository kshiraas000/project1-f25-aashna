import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TrainList from './TrainList';

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

interface StationData {
  STATION: string;
  [key: string]: any;
}

export default function LinesPage() {
  const { lineColor } = useParams<{ lineColor: string }>();
  const navigate = useNavigate();
  
  // State management
  const [currColor, setCurrColor] = useState<string>(lineColor || 'gold');
  const [trainData, setTrainData] = useState<TrainData[] | null>(null);
  const [stationData, setStationData] = useState<StationData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    arriving: false,
    scheduled: false,
    direction: null as string | null,
  });

  // Update color when URL params change
  useEffect(() => {
    if (lineColor) {
      setCurrColor(lineColor);
    }
  }, [lineColor]);

  // Fetch both train and station data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch both train and station data in parallel
        const [trainResponse, stationResponse] = await Promise.all([
          fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currColor}`),
          fetch(`https://midsem-bootcamp-api.onrender.com/stations/${currColor}`)
        ]);

        if (!trainResponse.ok || !stationResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [trainData, stationData] = await Promise.all([
          trainResponse.json(),
          stationResponse.json()
        ]);

        setTrainData(trainData);
        setStationData(stationData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setTrainData(null);
        setStationData(null);
      }
      setLoading(false);
    };

    fetchData();
  }, [currColor]);

  const handleStationSelect = (station: string) => {
    setSelectedStation(selectedStation === station ? null : station);
  };

  const handleFilterToggle = (filterType: 'arriving' | 'scheduled') => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleDirectionFilter = (direction: string) => {
    setFilters(prev => ({
      ...prev,
      direction: prev.direction === direction ? null : direction
    }));
  };

  const getDirectionButtons = () => {
    const isGreenOrBlue = currColor.toLowerCase() === 'green' || currColor.toLowerCase() === 'blue';
    return isGreenOrBlue ? ['Eastbound', 'Westbound'] : ['Northbound', 'Southbound'];
  };

  const getDirectionValue = (direction: string) => {
    const isGreenOrBlue = currColor.toLowerCase() === 'green' || currColor.toLowerCase() === 'blue';
    if (isGreenOrBlue) {
      return direction === 'Eastbound' ? 'E' : 'W';
    } else {
      return direction === 'Northbound' ? 'N' : 'S';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading MARTA Data...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{currColor.toUpperCase()} LINE</h1>
        <button onClick={() => navigate('/')} className="nav-link">
          Back to Home
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="filters">
        <button
          onClick={() => handleFilterToggle('arriving')}
          className={`filter-button ${filters.arriving ? 'active' : ''}`}
        >
          Arriving
        </button>
        <button
          onClick={() => handleFilterToggle('scheduled')}
          className={`filter-button ${filters.scheduled ? 'active' : ''}`}
        >
          Scheduled
        </button>
        {getDirectionButtons().map((direction) => (
          <button
            key={direction}
            onClick={() => handleDirectionFilter(direction)}
            className={`filter-button ${filters.direction === direction ? 'active' : ''}`}
          >
            {direction}
          </button>
        ))}
      </div>

      {/* NavBar and TrainList */}
      <NavBar 
        color={currColor} 
        data={stationData} 
        selectedStation={selectedStation}
        onStationSelect={handleStationSelect}
      />
      <TrainList 
        color={currColor} 
        data={trainData} 
        selectedStation={selectedStation}
        filters={filters}
      />
    </div>
  );
}