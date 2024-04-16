import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Label } from 'recharts'; // Import Label from 'recharts'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function AppWQISummary({ title, subheader, chart, sx, ...other }) {
  const [stationData, setStationData] = useState([]);
  const [lowestStation, setLowestStation] = useState(null);
  const [highestStation, setHighestStation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/realm/calculateWQI');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
  
        // Initialize an empty array to store the latest data for each station
        const newData = [];
  
        // Iterate over each station
        Object.keys(data).forEach(stationId => {
          // Find the entry with the latest date
          const latestDate = Object.keys(data[stationId]).reduce((prev, current) => {
            return (new Date(current) > new Date(prev)) ? current : prev;
          });
  
          // Get the latest entry for the station
          const latestEntry = data[stationId][latestDate];
  
          // Add the latest entry to the newData array
          newData.push({
            stationId,
            ...latestEntry
          });
        });
  
        setStationData(newData);
  
        // Find the station with the lowest and highest WQI values
        const lowest = newData.reduce((prev, current) => (prev.wqi < current.wqi) ? prev : current);
        const highest = newData.reduce((prev, current) => (prev.wqi > current.wqi) ? prev : current);
        setLowestStation({ ...lowest, date: Object.keys(data[lowest.stationId]).reduce((prev, current) => (new Date(current) > new Date(prev)) ? current : prev) });
        setHighestStation({ ...highest, date: new Date(Object.keys(data[highest.stationId]).reduce((prev, current) => (new Date(current) > new Date(prev)) ? current : prev)).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) });
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    }
  
    fetchData();
  }, []);
  
  
  

  // Function to determine color based on WQI value
  const getColor = (value) => {
    if (value >= 0 && value <= 25) return '#A1E6A6'; // Green
    if (value > 25 && value <= 50) return '#FFFF80'; // Faded Green
    if (value > 50 && value <= 75) return '#EEFF51'; // Almost Yellow
    if (value > 75 && value <= 100) return '#F5B748'; // Almost Orange
    if (value > 100 && value <= 150) return '#FF6551'; // Red
    return '#8CACFF'; // Default color
  };

  // Legend data remains the same
  const legendData = [
    { label: 'Excellent', color: '#A1E6A6' },
    { label: 'Good', color: '#FFFF80' },
    { label: 'Fair', color: '#EEFF51' },
    { label: 'Poor', color: '#F5B748' },
    { label: 'Very Poor', color: '#FF6551' },
  ];

  // Chart data will now be based on convertedData
  const chartData = stationData.map(station => ({
    label: station.stationId,
    value: parseFloat(station.wqi.toFixed(2)),
    fill: getColor(station.wqi)
  }));

  return (
    <Card 
      spacing={3}
      sx={{
        px: 4,
        py: 4,
        borderRadius: 10,
        ...sx,
      }}
      {...other}
    >
      <CardHeader
        title={
          <Typography variant="h6" 
                      style={{ color: 'white', 
                               fontFamily: "Archivo, 'sans-serif'", 
                               fontWeight: 500,
                               fontSize: 25, 
                               textTransform: 'uppercase',
                            }}
            >
            {title}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle1" 
                      style={{ color: '#8cacff', 
                              fontFamily: "Poppins", 
                              fontWeight: 100,
                              fontSize: 13,
                              lineHeight: 1,
                              }}
            >
            The gathered data are summarized here with active stations being monitored. {lowestStation && highestStation && 
              <>According to the readings, the <span style={{fontWeight: 'bold'}}>{lowestStation.stationId}</span> results have the best quality among all stations, while <span style={{fontWeight: 'bold'}}>{highestStation.stationId}</span> has the poorest quality as of <span style={{fontWeight: 'bold'}}>{highestStation.date}</span>.</>}
          </Typography>
        }
        
        
      />

      <Box mt={2} sx={{ mx: 1 }}>
      <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="1 0"
              horizontal={true}
              vertical={false}
              stroke="rgba(100, 100, 100, 0.7)"
            />
            <XAxis
              dataKey="label"
              type="category"
              tick={{ fontSize: 10, fontFamily: "Poppins", fill: '#ffff', fontWeight: '300' }}
              axisLine={false}
              tickLine={false}
              width={30} // Adjust the width as needed
            >
              {/* Add X-axis title */}
              <Label value="Recorded Stations" offset={-8} position="bottom" style={{ fontSize: 12, fontFamily: "Poppins", fill: '#8cacff', fontWeight: '700' }} />
            </XAxis>
            <YAxis // YAxis becomes horizontal
              dataKey="value"
              tick={{ fontSize: 10, fontFamily: "Poppins", fill: '#ffff', fontWeight: '300' }}
              axisLine={false}
              tickLine={false}
              interval={0}
            >
              {/* Add Y-axis title */}
              <Label value="WQI Values" angle={-90} position="insideLeft" style={{ fontSize: 12, fontFamily: "Poppins", fill: '#8cacff', fontWeight: '700' }} />
            </YAxis>
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: 'rgba(13, 33, 53, 0.32)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                color: 'white',
                fontSize: '1rem',
                fontFamily: "'Archivo', sans-serif",
                borderRadius: '0.5rem',
                border: 'none'
              }}
            />
            <Bar barSize={30} radius={10}
              dataKey="value"
              fill="#A1E6A6"
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <Box mt={5}>
        <Grid container justifyContent="center" spacing={0.8}>
          {legendData.map((item, index) => (
            <Grid item xs={2.5} sm={2.5} md={2.5} lg={1.9} key={index}>
              <Button variant="contained" sx={{ borderRadius: 20, fontSize: 3, padding: '5px 8px', backgroundColor: '#0d2135', boxShadow: 'none' }}>
                <div style={{ width: 8, height: 8, backgroundColor: item.color, borderRadius: '50%', marginRight: 5 }}></div>
                <Typography variant="body2" style={{ fontSize: 10, fontFamily: 'Poppins' }}>{item.label}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

AppWQISummary.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};

