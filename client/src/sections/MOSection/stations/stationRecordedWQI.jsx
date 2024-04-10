import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
  CartesianGrid,
  YAxis
} from 'recharts';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';

export default function StationRecordedWQI({ title, subheader, chart, sx, ...other }) {
  const { series } = chart;

  // Prepare chart data
  const chartData = series.map((item) => ({ label: item.label, [title]: item.value }));

  // Filter chart data to include only months with data
  const filteredChartData = chartData.filter(item => item[title] !== null && item[title] !== undefined);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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


      <div>
        <IconButton
          onClick={handlePopoverOpen}
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
        <Popover
          id="info-popover"
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              backgroundColor: '#0d2135', // Set the background color you want
              borderRadius: '1rem',
              color: 'white'
            },
          }}
        >
          <Typography sx={{ p: 4, maxWidth: 250, fontFamily: "Poppins" }}>
            When the line on the graph rises, it indicates a decline,
            such as a drop in quality or performance falling short.
            Conversely, when the line descends, it's a positive sign,
            signaling improvement and performance meeting expectations.
          </Typography>
        </Popover>
      </div>


      <Box mt={2} sx={{ mx: 3 }}>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={filteredChartData} width={80} height={100}>
            <CartesianGrid
              strokeDasharray="1 0"
              horizontal={true}
              vertical={false}
              stroke="rgba(100, 100, 100, 0.7)"
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8CACFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8CACFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis
              tick={{ fontSize: 10, fontFamily: "Poppins", fill: '#ffff', fontWeight: '300' }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fontFamily: "Poppins", fill: '#ffff', fontWeight: '300' }}
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
                fontFamily: "Poppins",
                borderRadius: '0.5rem',
                border: 'none',
              }}
              formatter={(value, name, props) => {
                let additionalText = '';

                // Add additional text based on the value of the data point
                if (value >= 51) {
                  additionalText = 'The quality of the water is less desirable';
                } else if (value >= 31) {
                  additionalText = 'Water quality is good but needs minor precaution';
                } else if (value >= 0 && value <= 30) {
                  additionalText = 'The physicochemical properties of water is good';
                }

                return (
                  <div>
                    {additionalText && <div style={{ marginTop: '4px', fontSize: '1rem' }}>{additionalText}</div>}
                  </div>
                );
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
            <Label value="2024" position="top" offset={5} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}

StationRecordedWQI.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};
