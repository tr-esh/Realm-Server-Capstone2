import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
  Cell,
  CartesianGrid,
  YAxis,
} from 'recharts';
import '../../../components/styles/WQIStyle.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Typography, Dialog, DialogContent } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';

export default function StationPredictedWQI({ title, subheader, chart, sx, ...other }) {
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

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Card
      spacing={3}
      sx={{
        px: 4,
        py: 4,
        borderRadius: 10,
        position: 'relative',
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
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 500,
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
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              lineHeight: 0.8,
            }}
          >
            {subheader}
          </Typography>
        }
      />

      <div>
        <IconButton
          onClick={handleDialogOpen}
          aria-label="info"
          sx={{
            color: '#8CACFF',
            position: 'absolute',
            top: 35,
            right: 35,
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 31 }} />
        </IconButton>
        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth 
        PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderRadius: '1rem',
          color: 'white',
          padding: '2rem',
        },
      }}>
          <DialogContent
            sx={{
              backgroundColor: '#0d2135',
              borderRadius: '1rem',
              color: 'white',
              padding: '2rem',
            }}
          >
            <div className='Qi-container'>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins",
                marginBottom: '1rem',
                fontSize: '1rem',
                textAlign: 'justify'
              }}
            >
              The bar chart employs different colors to indicate distinct levels of water
              classification based on quality. As the size of the chart increases, it reflects
              a diminishing appeal of the water concerning its physicochemical properties.
            </Typography>
            
            <Typography variant="h4" sx={{ fontFamily: "Poppins", fontWeight: '700', textAlign: 'center', color: '#8CACFF'}}>
              Classification of Water Level:
            </Typography>
            
            <div className='class-holder'>
            <div className="interpretation-holder">
              <div className='point-holder'>
                <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#A1E6A6' }}>
                  0-25
                </Typography>
              </div>
              <div className='interpretation'>
                <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700' , color: '#A1E6A6'}}>Excellent
                <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Clean water, excellently suitable for drinking</Typography>
                </Typography>
              </div>
           </div>


              <div className="interpretation-holder">
              <div className='point-holder'>
                <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#FFFF80' }}>
                  26-50
                </Typography>
              </div>
              <div className='interpretation'>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#FFFF80' }}>Good
                <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Suitable for drinking</Typography>
                </Typography>
              </div>
           </div>

           <div className="interpretation-holder">
              <div className='point-holder'>
                <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#EEFF51' }}>
                  51-75
                </Typography>
              </div>
              <div className='interpretation'>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#EEFF51'}}>Fair
                <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Modestly suitable for drinking</Typography>
                </Typography>              
                </div>
           </div>


           <div className="interpretation-holder">
              <div className='point-holder'>
                <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#F5B748' }}>
                  76-100
                </Typography>
              </div>
              <div className='interpretation'>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700' , color: '#F5B748'}}>Poor
                <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Unsuitable for drinking, minor treatment (purification) required before usage</Typography>
                </Typography>                
                </div>
           </div>

           <div className="interpretation-holder">
              <div className='point-holder'>
                <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#FF6551' }}>
                &gt; 100
                </Typography>
              </div>
              <div className='interpretation'>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#FF6551' }}>Very Poor
                <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Unsuitable for drinking, Appropriate treatment required before usage or seek alternative sources of supply</Typography>
                </Typography>               
                </div>
           </div>
           </div>
                    </div>
          </DialogContent>
        </Dialog>
      </div>

      <Box mt={2} sx={{ mx: 3 }}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="1 0"
              horizontal={true}
              vertical={false}
              stroke="rgba(100, 100, 100, 0.7)"
            />
            <YAxis
              tick={{ fontSize: 10, fontFamily: "'Arimo', sans-serif", fill: '#ffff', fontWeight: '300' }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fontFamily: "'Arimo', sans-serif", fill: '#ffff', fontWeight: '300' }}
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

            <Bar dataKey={title} barSize={30} radius={10}>
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
              style={{
                width: 10,
                height: 10,
                backgroundColor: legendItem.color,
                marginRight: 5,
                borderRadius: '2rem',
              }}
            />
            <Typography variant="body2" sx={{ color: 'white', fontFamily: "'Archivo', sans-serif", fontWeight: '300' }}>
              {legendItem.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

StationPredictedWQI.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};
