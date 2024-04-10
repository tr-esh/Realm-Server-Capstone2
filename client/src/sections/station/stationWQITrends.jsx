import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';

export default function StationWQITrends({ title, subheader, chart, sx, ...other }) {
  const { series } = chart;

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
          <AreaChart data={chartData} width={80} height={100}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8CACFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8CACFF" stopOpacity={0} />
              </linearGradient>
            </defs>
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

StationWQITrends.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};
