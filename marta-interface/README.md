# MARTA Interface

A React-based frontend application for displaying real-time MARTA (Metropolitan Atlanta Rapid Transit Authority) train information with filtering capabilities.

## Features

- **Real-time Train Data**: Fetches live train information from the MARTA API
- **Line Selection**: View trains for Gold, Red, Green, and Blue lines
- **Station Filtering**: Filter trains by specific stations
- **Advanced Filters**: Filter by arrival status (On Time/Delayed) and direction
- **Responsive Design**: Modern UI with Tailwind CSS
- **Routing**: Navigation between Home, About, and individual line pages

## Pages

### Home Page (`/`)
- Welcome screen with MARTA branding
- Line selection cards for each MARTA line
- System overview statistics
- Navigation to About page

### About Page (`/about`)
- MARTA system information
- Line descriptions and statistics
- System map representation
- Mission statement

### Lines Page (`/lines/:lineColor`)
- Real-time train data for selected line
- Station navigation bar
- Filter buttons (Arriving, Scheduled, Direction)
- Individual train cards with status information

## Components

### Train Component
Displays individual train information including:
- Destination and Train ID
- On-time/Delayed status
- Direction and next arrival time
- Waiting time in minutes and seconds

### NavBar Component
- Station selection interface
- Visual line color indicators
- Selected station highlighting

### TrainList Component
- Filters trains by line, station, and other criteria
- Displays filtered results or "No trains" message
- Handles empty state gracefully

## API Integration

The application fetches data from:
- **Train Data**: `https://midsem-bootcamp-api.onrender.com/arrivals/{LINE_COLOR}`
- **Station Data**: `https://midsem-bootcamp-api.onrender.com/stations/{LINE_COLOR}`

## Technologies Used

- **React 19** with TypeScript
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Vite** for build tooling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Train.tsx          # Individual train display
│   └── NavBar.tsx         # Station navigation
├── pages/
│   ├── Home.tsx           # Home page
│   ├── About.tsx          # About page
│   ├── LinesPage.tsx      # Line-specific train view
│   └── TrainList.tsx      # Train filtering and display
├── App.tsx                # Main app with routing
└── index.css              # Tailwind CSS imports
```

## Features Implemented

✅ Real-time API integration with useEffect  
✅ State management for filters and selections  
✅ Responsive design with Tailwind CSS  
✅ React Router navigation  
✅ Station-based filtering  
✅ Direction-based filtering (North/South vs East/West)  
✅ Arrival status filtering  
✅ Empty state handling  
✅ Loading states  
✅ TypeScript interfaces for type safety  

## Filtering Logic

- **Line Filtering**: Automatically filters by selected line color
- **Station Filtering**: Click stations to filter trains approaching that station
- **Status Filtering**: Toggle between "Arriving" (on-time) and "Scheduled" (delayed)
- **Direction Filtering**: 
  - Gold/Red lines: Northbound/Southbound
  - Green/Blue lines: Eastbound/Westbound

Multiple filters can be applied simultaneously, and clicking an active filter will deactivate it.