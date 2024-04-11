import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function AppUserSelect({
  title,
  imageSource,
  icon,
  subheader, // New prop for Subheader
  sx,
  imageSize,
  ...other
}) {
  return (
    <Card
      component={Stack}
      spacing={2}
      direction="row"
      sx={{
        borderRadius: 10,
        backgroundColor: '#10273d',
        boxShadow: 'none',
        ...sx,
      }}
      {...other}
    >
      {icon && <Stack>{icon}</Stack>}

      <Stack>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>

        {imageSource && (
          <img
            src={imageSource}
            alt="Widget Image"
            style={{ width: imageSize, height: 'auto', marginTop: '1rem' }}
          />
        )}

        {subheader && (
          <Typography variant="h6" 
                      sx={{ color: 'white', 
                            textAlign: 'center', 
                            marginBottom: '2rem',
                            fontWeight: '600'}}>
            {subheader}
          </Typography>
        )}
      </Stack>
    </Card>
  );
}

AppUserSelect.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subheader: PropTypes.string, // New prop for Subheader
  sx: PropTypes.object,
  title: PropTypes.string,
};
