import React from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography, Link } from '@mui/material';

// Function to get a random 'Abstract water' image from Unsplash
const getRandomImage = () => {
  // Replace 'YOUR_UNSPLASH_ACCESS_KEY' with your actual Unsplash access key
  const accessKey = '3TIZ7fotd0nPXcEnFCKNxqa6zgTfzJ-67RuDeJXMOYM';
  const endpoint = `https://api.unsplash.com/photos/random?query=abstract water&orientation=landscape&client_id=${accessKey}`;

  return fetch(endpoint)
    .then(response => response.json())
    .then(data => data.urls.regular)
    .catch(error => {
      console.error('Error fetching image from Unsplash:', error);
      // Provide a default image URL in case of an error
      return 'https://images.unsplash.com/photo-1532423622396-10a3f979251a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    });
};

export default function NewsCard({
  title,
  dateCreated,
  publisher,
  link,
  sx,
  ...other
}) {
  const [backgroundImage, setBackgroundImage] = React.useState('');

  React.useEffect(() => {
    // Fetch a random 'Abstract water' image from Unsplash
    getRandomImage().then(imageUrl => setBackgroundImage(imageUrl));
  }, []);

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      color="inherit"
    >
      <Card
        spacing={3}
        sx={{
          px: 4,
          py: 4,
          borderRadius: 10,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '250px', // Set a fixed height for the card
          transition: 'background-color 0.3s', // Add transition for smooth effect
          ...sx,
        }}
        {...other}
      >
        <Stack direction="column" >

          {/* Additional Information */}
          <Typography
            variant="subtitle2"
            sx={{
              color: 'white',
              fontFamily: "Archivo, 'sans-serif'",
              fontWeight: '300',
              lineHeight: 0.9,
              margin: '1rem',
            }}
          >
            <div style={{
              marginBottom: '1rem'
            }}>
              {dateCreated}
            </div>
            <div style={{
              color: 'white',
              fontSize: 20,
              fontFamily: "Poppins",
              fontWeight: '700',
              textTransform: 'uppercase',
              // Underline title on hover
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}>
              {title}
            </div>

            <div style={{
              color: 'rgba(140, 172, 255, 1)',
              fontFamily: 'rgba(140, 172, 255, 1)',
              fontSize: 14,
              marginTop: '0.7rem',
            }}>
              {publisher}
            </div>

          </Typography>
        </Stack>
      </Card>
    </Link>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
