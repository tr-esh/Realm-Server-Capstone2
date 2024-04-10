import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Card, Dialog, DialogContent, Grid, InputAdornment, Button, TextField, Typography, FormControl, MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import '../../../components/styles/StationForm.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useSnackbar } from '../../../context/SnackbarContext';

const CssFilledInput = styled(TextField)({
  '& .MuiFilledInput-root': {
    borderBottom: "none",
    borderRadius: "10px",
  },
  '& .MuiFilledInput-input': {
    paddingLeft: "20px",
    paddingBottom: "10px",
    paddingTop: "30px"
  },
  '& .MuiFilledInput-root:before': {
    borderBottom: "none",
  },
  '& .MuiFilledInput-root:after': {
    borderBottom: "none",
  },
  '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
    borderBottom: "none",
  },
});

export default function StationAdd({ sx, ...other }) {

  const { user } = useAuthContext(); // Destructure user from the context
  const { openSnackbar } = useSnackbar(); // Use the useSnackbar hook


  const [openModal, setOpenModal] = useState(false);
  const [siteLocation, setSiteLocation] = useState('');
  const [address, setAddress] = useState('');
  const [tester, setTester] = useState(user.username);
  const [stationImage, setStationImage] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  


  const [predefinedAddresses, setPredefinedAddresses] = useState([
    'Hiluctugan, Carigara Leyte',
    'Canlampay, Carigara Leyte',
    'Otap, Carigara Leyte',
    'Canal, Carigara Leyte',
    'Ponong (Pob), Carigara Leyte',
    'Sawang (Pob), Carigara Leyte'
    // Add more predefined addresses as needed
  ]);


  const originalPredefinedAddresses = [
    'Hiluctugan, Carigara Leyte',
    'Canlampay, Carigara Leyte',
    'Otap, Carigara Leyte',
    'Canal, Carigara Leyte',
    'Ponong (Pob), Carigara Leyte',
    'Sawang (Pob), Carigara Leyte'
    // Add more predefined addresses as needed
  ];


  const handleOpenModal = () => {
    // Reset form fields and set predefinedAddresses to the original values
    setSiteLocation('');
    setTester(user.username);
    setStationImage(null);
    setSelectedAddress('Hiluctugan, Carigara Leyte');
    setPredefinedAddresses(originalPredefinedAddresses);
    setOpenModal(true);
  };


  const handleCloseModal = () => {
    // Reset form fields and clear selectedAddress
    setSiteLocation('');
    setTester(null);
    setStationImage(null);
    setSelectedAddress('');
    setImagePreview(null)
    setOpenModal(false);
  };
    
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setStationImage(file); // Store the file directly, not the preview URL
      setImagePreview(previewURL);

    }
  };
  

  const handleSave = async () => {
    try {
      if (!stationImage) {
        console.error('Please select an image');
        return;
      }
  
      const formData = new FormData();
      formData.append('tester', tester);
      formData.append('siteLocation', siteLocation);
      formData.append('address', selectedAddress);
      formData.append('stationImage', stationImage); 
  
      const response = await fetch('/api/realm/createStation', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        const result = await response.json();
        console.log('Data sent successfully:', result);
        openSnackbar('Station Successfully Created!'); // Use openSnackbar from the context
        setSiteLocation('');
        setTester(null);
        setStationImage(null);
        setOpenModal(false);
      } else {
        console.error('Failed to send data:', response.statusText);
      }
    } catch (error) {
      console.error('Error while sending data:', error);
    }
  };
  
  
  
  

  return (
    <Card
      spacing={4}
      sx={{
        px: 4,
        py: 4,
        borderRadius: 10,
        backgroundColor: '#0A1929',
        position: 'relative',
        transition: 'background-color 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: '#8CACFF',
          cursor: 'pointer',
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        onClick={handleOpenModal}
      >
        <AddCircleRoundedIcon
          sx={{
            fontSize: 100,
            color: '#10273d',
            margin: '6rem',
            transition: 'background-color 0.3s ease-in-out',
            '&:hover': {
              color: '#0A1929',
              cursor: 'pointer',
            },
          }}
        />
        <Typography
            sx={{
              fontSize: '15px',
              fontFamily: 'Poppins',
              color: '#1976d2',
              marginTop: '-90px',
              marginBottom: '73px',
              transition: 'background-color 0.3s ease-in-out',
              '&:hover': {
                color: '#0A1929',
                cursor: 'pointer',
              },
            }}
          >
          Add new station
        </Typography>
      </Box>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} classes={{ paper: 'custom-dialog' }}>
        <DialogContent>
          <Box sx={{margin: '2rem'}}>

          <ClearRoundedIcon
              sx={{
                position: 'absolute',
                top: '1rem',
                right: '2rem',
                cursor: 'pointer',
                fontSize: 30,
                color: '#808080',
                '&:hover': {
                  color: '#0A1929',
                },
              }}
              onClick={handleCloseModal}
            />

          <h2>
        ADD <span> WATER</span> STATION
        </h2>

      <FormControl sx={{ mt: 0}}>
        <Grid container spacing={1}>

        <Grid item xs={12} md={6}>
        <FormControl fullWidth> 
        <CssFilledInput 
              label="Tester"
              variant="filled"
              fullWidth
              sx={{fontFamily: "'Arimo', sans-serif", marginBottom: 1}}
              InputLabelProps={{
                style: {
                  fontFamily: "'Arimo', sans-serif",
                  paddingLeft: "13px",
                  paddingTop: "4px",
                  paddingBottom: "15px"
                }
              }}
              InputProps={{
                style: {
                  fontFamily: "'Arimo', sans-serif",
                  fontSize: "0.9rem"
                }
               }}
               value={tester}
               readOnly  
            />
            </FormControl>
            </Grid>

        <Grid item xs={12} md={6}>
        <FormControl fullWidth> 
          <CssFilledInput 
              label="Site Location"
              variant="filled"
              fullWidth
              sx={{fontFamily: "'Arimo', sans-serif", marginBottom: 1}}
              InputLabelProps={{
                style: {
                  fontFamily: "'Arimo', sans-serif",
                  paddingLeft: "13px",
                  paddingTop: "4px",
                  paddingBottom: "15px"
                }
              }}
              InputProps={{
                style: {
                  fontFamily: "'Arimo', sans-serif",
                  fontSize: "0.9rem"
                }
               }}
              value={siteLocation}
              onChange={(e) => setSiteLocation(e.target.value)}
            />
            </FormControl>
            </Grid>
        
            <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <CssFilledInput
              label="Address"
              variant="filled"
              fullWidth
              sx={{ fontFamily: "'Arimo', sans-serif", marginBottom: 1 }}
              InputLabelProps={{
                style: {
                  fontFamily: "'Arimo', sans-serif",
                  paddingLeft: "13px",
                  paddingTop: "4px",
                  paddingBottom: "15px",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "'Arimo', sans-serif",
                  fontSize: "0.9rem",
                },
              }}
              // Use a Select component for the dropdown
              select
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              {/* Map through predefined addresses to create options */}
              {predefinedAddresses.map((addressOption) => (
                <MenuItem key={addressOption} value={addressOption}>
                  {addressOption}
                </MenuItem>
              ))}
            </CssFilledInput>
          </FormControl>
        </Grid>
            </Grid>
             </FormControl>

              {/* Move the AddCircleRoundedIcon inside the card */}
              <Box
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ border: '2px dashed #808080',
                borderRadius: '10px', position: 'relative' }}
                >
                <label htmlFor="stationImage">
                {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
                    />
                  )}

                {!imagePreview && (
                    <Box
                      sx={{
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.3s ease-in-out',
                        '&:hover': {
                          borderColor: '#0A1929',
                        },
                      }}
                    >
                      <ImageRoundedIcon
                        sx={{
                          fontSize: 70,
                          color: '#808080',
                        }}
                      />
                    </Box>
                  )}
                </label>
                {!imagePreview && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontFamily="'Arimo', sans-serif"
                      marginTop="-1rem"
                      marginBottom="1rem"
                    >
                      Insert Station Image
                    </Typography>
                  )}

                  {/* Input for file upload, hidden and triggered by the icon click */}
                  <input
                    type="file"
                    id="stationImage"
                    accept="image/jpeg, image/png"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />

                </Box>



            <Box mt={2} display="flex" justifyContent="space-between">
              <Button 
               disableElevation={true}
               type="submit"
               sx={ { 
                fontFamily: "'Arimo', sans-serif",
                fontSize: '0.9rem', 
                borderRadius: 4, 
                height:'6ch', 
                fontWeight:'500',
                hover:'#004d40',
                backgroundColor: '#8cacff', // Set the background color here
               '&:hover': {
                 backgroundColor: '#0d2135', // Change hover color if needed
               },
                 } } 
                margin= "normal"
                variant="contained"  
                size="large"
                color="secondary"
                 onClick={handleCloseModal}>
                Cancel
              </Button>

              <Button 
               disableElevation={true}
               type="submit"
               sx={ { 
                fontFamily: "'Arimo', sans-serif",
                fontSize: '0.9rem', 
                borderRadius: 4, 
                height:'6ch', 
                fontWeight:'500',
                hover:'#004d40',
                backgroundColor: '#8cacff', // Set the background color here
               '&:hover': {
                 backgroundColor: '#0d2135', // Change hover color if needed
               },
                 } } 
                margin= "normal"
                variant="contained"  
                size="large"
                color="secondary"
                onClick={handleSave}
                > 
                Save
              </Button>
             </Box>
            
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

StationAdd.propTypes = {
  sx: PropTypes.object,
};
