import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Box, CardHeader, Card, Typography } from '@mui/material';

export default function AppPerformanceSummary({ title, subheader, sx, ...other }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestStationInfo, setBestStationInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

// Inside the fetchData function
const fetchData = async () => {
  try {
    const response = await fetch('/api/realm/lowWQI');
    const data = await response.json();

    const maxLowWQIStation = data.maxLowWQIStation; // Fetching the maxLowWQIStation value from the response data

    setBestStationInfo({
      stationId: maxLowWQIStation, // Using maxLowWQIStation as the stationId
      wqi: Math.min(...data.wqiValuesOfIdentifiedStation) // Calculating the lowest WQI directly from the response data
    });

    const chartData = data.wqiValuesOfIdentifiedStation.map((value, index) => ({
      label: `Station ${String.fromCharCode(65 + index)}`,
      [title]: parseFloat(value.toFixed(2)),
    }));

    setChartData(chartData);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};


  let interpretation = '';
  if (bestStationInfo) {
    const wqi = bestStationInfo.wqi;
    if (wqi >= 0 && wqi <= 25) {
      interpretation = 'Excellent';
    } else if (wqi > 25 && wqi <= 50) {
      interpretation = 'Good';
    } else if (wqi > 50 && wqi <= 75) {
      interpretation = 'Fair';
    } else if (wqi > 75 && wqi <= 100) {
      interpretation = 'Poor';
    } else if (wqi > 100 && wqi <= 150) {
      interpretation = 'Very Poor';
    }
  }

  const subheaderText = bestStationInfo ? `${bestStationInfo.stationId} has the lowest WQI` : '';
  const yAxisTicks = [0, 20, 40, 60, 80];

  return (
    <Card
      spacing={3}
      sx={{
        px: 4,
        py: 2,
        borderRadius: 10,
        ...sx,
      }}
      {...other}
    >
      <CardHeader
        title={
          <Typography 
             variant="h6" 
             style={{ color: 'white', 
                      fontFamily: "Archivo, 'sans-serif'", 
                      fontWeight: 500, 
                      fontSize: 23, 
                      textTransform: 'uppercase', 
                      lineHeight: 1 }}>
            {title}
          </Typography>
        }
        subheader={
          <Typography 
             variant="subtitle1" 
             style={{ color: 'white', 
                      fontFamily: "Poppins", 
                      fontWeight: 100, 
                      fontSize: 13, 
                      lineHeight: 1, 
                      color: '#8cacff', 
                      marginTop: '1.5px' }}>
            
            {subheaderText}
          </Typography>
        }
      />

      <Box mt={2} sx={{ mx: 3 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} width={80} height={100}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8CACFF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8CACFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis
                orientation="right"
                tick={{ fontSize: 10, fontFamily: "Poppins", fill: '#ffff', fontWeight: '300' }}
                axisLine={false}
                tickLine={false}
                width={20}
                ticks={yAxisTicks}
                interval="preserveStartEnd" 
              />
              <CartesianGrid
              strokeDasharray="1 0"
              horizontal={true}
              vertical={false}
              stroke="rgba(100, 100, 100, 0.7)"
            />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: 'rgba(13, 33, 53, 0.32)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  color: 'white',
                  fontSize: 13,
                  fontFamily: "'Archivo', sans-serif",
                  borderRadius: '0.5rem',
                  border: 'none',
                }}
              />
              <Area
                type="monotone"
                dataKey={title}
                stroke="#8CACFF"
                fill="url(#colorUv)"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        <Box mt={3} mb={2} sx={{ mx: 1 }}>
          {bestStationInfo && (
            <Typography variant="subheader" 
                        style={{ marginTop: '1rem', 
                        color: 'white', fontSize: 
                        13, fontWeight: '300', 
                        fontFamily: "Poppins" }}>
              According to the collected water quality data, the 
              "<strong>{bestStationInfo.stationId}</strong>" exhibits the
               lowest WQI readings compared to all other stations,
              indicating a better water quality at this specific location.

            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  )
}

AppPerformanceSummary.propTypes = {
  title: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

