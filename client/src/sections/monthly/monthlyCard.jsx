import PropTypes from 'prop-types';

import { Card, Stack, Typography, Divider } from '@mui/material';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';

export default function MonthlyCard({ monthName, dataCount, entries, sx, ...other }) {
  return (
    <Card
      spacing={3}
      sx={{
        px: 4,
        py: 4,
        borderRadius: 10,
        ...sx,
        // Adjust alpha value based on dataCount
        ...(dataCount ? {} : { opacity: 0.5 }),
      }}
      {...other}
    >
      <Stack direction="column" alignItems="center">
       
        <Typography variant="h4"
                    sx={{ color: 'white',
                        fontFamily: "Archivo, 'sans-serif'", 
                        fontWeight: '700',
                        textTransform: 'uppercase'
                    }}
        >
          {monthName}
        </Typography>

        <Divider sx={{ my: 2, backgroundColor: '#10273d', width: '100%' }} />

        <Typography variant="subtitle1"
                    sx={{ color: '#8cacff',
                        fontSize: 50,
                        fontFamily: "Archivo, 'sans-serif'", 
                        fontWeight: '500',
                        textTransform: 'uppercase'
                    }}
        >
          {dataCount ? (
            `${dataCount}`
          ) : (
            // If no data, show DonutLargeRoundedIcon
            <Stack direction="column" alignItems="center">
              <DonutLargeRoundedIcon sx={{ fontSize: 20, mt: 4.5, mr: 1, mb: 4 }} />
            </Stack>
          )}
        </Typography>

        {/* Entries always displayed */}
        <Typography variant="subtitle1"
                    sx={{ color: 'white',
                        fontSize: 17,
                        fontFamily: "Archivo, 'sans-serif'", 
                        fontWeight: '300',
                        lineHeight: 0.9
                    }}
        >
            entries
        </Typography>
      </Stack>
    </Card>
  );
}

MonthlyCard.propTypes = {
  monthName: PropTypes.string.isRequired,
  dataCount: PropTypes.number,
  entries: PropTypes.string,
  sx: PropTypes.object,
};
