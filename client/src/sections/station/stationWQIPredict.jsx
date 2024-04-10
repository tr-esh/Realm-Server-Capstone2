import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Label, Cell
} from 'recharts';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';

export default function StationWQIPredict({ title, subheader, chart, sx, ...other }) {
  const { series } = chart;

  // Function to determine bar fill color based on value ranges
  const getBarColor = (value) => {
    if (value >= 0 && value <= 25) return '#A1E6A6'; // Green
    if (value > 25 && value <= 50) return '#FFFF80'; // Faded Green
    if (value > 50 && value <= 75) return '#EEFF51'; // Almost Yellow
    if (value > 75 && value <= 100) return '#F5B748'; // Almost Orange
    if (value > 100 && value <= 150) return '#FF6551'; // Red
    return '#8CACFF'; // Default color
  };


  const legendData = [
    { label: 'Excellent', color: '#A1E6A6' },
    { label: 'Good', color: '#FFFF80' },
    { label: 'Fair', color: '#EEFF51' },
    { label: 'Poor', color: '#F5B748' },
    { label: 'Very Poor', color: '#FF6551' },
  ];

  const chartData = series.map((item) => ({ label: item.label, [title]: item.value }));


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
          <Typography
            variant="h6"
            style={{
              color: 'white',
              fontFamily: "Archivo, 'sans-serif'",
              fontWeight: 600,
              fontSize: 26,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle1"
            style={{
              color: 'white',
              fontFamily: "Archivo, 'sans-serif'",
              fontWeight: 100,
              fontSize: 13,
              lineHeight: 0.8,
            }}
          >
            {subheader}
          </Typography>
        }
      />

      <Box mt={2} sx={{ mx: 3 }}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fill: '#ffff', fontWeight: '300' }}
              axisLine={false}
              tickLine={false}
              interval={0}
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
            <Bar
              dataKey={title}
              barSize={30}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry[title])} />
              ))}
            </Bar>
            <Label value="2024" position="top" offset={5} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        {legendData.map((legendItem, index) => (
          <Box key={`legend-${index}`} sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            <div
              style={{ width: 10, height: 10, backgroundColor: legendItem.color, marginRight: 5, borderRadius: '2rem' }}
            />
            <Typography variant="body2" sx={{color: 'white', fontFamily: "'Archivo', sans-serif", fontWeight: '300'}}>
              {legendItem.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

StationWQIPredict.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};