import { useEffect, useState } from 'react';
import { Container, 
         Grid, 
         Stack, 
         useMediaQuery, 
         Modal, 
         Box, 
         Typography, 
         List, 
         ListItem, 
         ListItemAvatar, 
         Avatar, 
         ListItemText, 
         Tooltip, 
         IconButton, 
         TextField, 
         Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import '../../../components/styles/StationCardMainStyle.css'
import StationCard from '../stationCard';
import PendingRequestView from './pendingRequestView';
import TrashBin from '../trashBin';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function StationView() {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState('');
  const isLargeScreen = useMediaQuery('(min-width: 960px)'); // Check if screen size is large


  useEffect(() => {
      // Fetch station data from the API
      const fetchStations = async () => {
        try {
          const response = await fetch('/api/realm/setStation');
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched stations:', data); 
            setStations(data);
          } else {
            console.error('Failed to fetch station data');
          }
        } catch (error) {
          console.error('Error fetching station data', error);
        }
      };

      fetchStations();

      // Set up interval to fetch stations periodically (every 5 seconds in this example)
      const intervalId = setInterval(fetchStations, 5000);
  
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }, []); 

    useEffect(() => {
      // Function to fetch first document and total count
      const fetchData = async () => {
        try {
          const response = await fetch('api/realm/getDeletedStation');
          const data = await response.json();
          // Calculate remaining days and merge with existing data
          const documentsWithRemainingDays = data.allDocuments.map(document => {
            const deletionTimestamp = new Date(document.deletionTimestamp).getTime();
            const currentTimestamp = new Date().getTime();
            const remainingDays = Math.ceil((deletionTimestamp - currentTimestamp) / (1000 * 3600 * 24));
            return { ...document, remainingDays };
          });
          setDocuments(documentsWithRemainingDays);
          setTotalCount(data.totalCount);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

        fetchData();
    }, []);
  

  const handleStationClick = (stationName) => {
    // Navigate to the station details page or perform any other action
    navigate(`/stations/${stationName}`, { state: { title: stationName } });
  };

  const handleStationDelete = async (stationName) => {
    try {
      // Make a DELETE request to delete the station
      const response = await fetch(`/deleteStation/${stationName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        // Optionally, you can handle UI updates here after successful deletion
      } else {
        throw new Error('Failed to delete station');
      }
    } catch (error) {
      console.error('Error deleting station:', error);
      // Optionally, you can show an error message to the user
    }
  };

  const handleModalOpen = (deleted) => {
    setSelectedRequest(deleted);
    setModalOpen(true);
};

  const handleModalClose = () => {
      setModalOpen(false);
      setSelectedRequest(null);
  };

  const handleAction = async (action, deleted) => {
      try {
          // Make sure there is a selected request
          if (!deleted) {
              console.error('No request selected.');
              return;
          }

          if (action === 'restore') {
              const url = `api/realm/restoreStation/${deleted.stationName}`;
              const method = 'POST';
              const response = await fetchAction(url, method);
              handleResponse(response, action);
          } else if (action === 'delete') {
              // Open confirmation dialog when denying
              setConfirmationOpen(true);
              setSelectedRequest(deleted);
          } else {
              console.error('Invalid action.');
          }
      } catch (error) {
          console.error(`Error ${action}:`, error);
      }
  };

  const fetchAction = async (url, method) => {
      const response = await fetch(url, {
          method: method,
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return response;
  };

  const handleResponse = (response, action) => {
      if (response.ok) {
          setModalOpen(false);
          console.log(`Request ${action === 'restore' ? 'restored' : 'deny'} successfully.`);
          // Update UI or take further actions
      } else {
          console.error(`Failed to ${action}:`, response.statusText);
          // Show an error message to the user or take further actions
      }
  };

  const handleDelete = (stationName) => {
    // Open confirmation modal when deleting
    setSelectedRequest(stationName);
    setConfirmationOpen(true);
};

const handleConfirmationInputChange = (event) => {
    setConfirmationInput(event.target.value);
};

const handleDeleteConfirmation = async () => {
  if (confirmationInput === selectedRequest) {
    try {
      const response = await fetch(`/api/realm/deleteStationDB/${selectedRequest}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Handle UI updates here after successful deletion
        console.log('Station deleted successfully');
        setConfirmationOpen(false);
        setModalOpen(false); // Close the deletion modal
        setConfirmationInput(''); // Reset confirmation input
        // Refresh the list of stations/documents if necessary
      } else {
        throw new Error('Failed to delete station');
      }
    } catch (error) {
      console.error('Error deleting station:', error);
      // Optionally, show an error message to the user
    }
  } else {
    console.error('Confirmation input does not match station name');
    // Optionally, show an error message to the user
  }
};


  return (
    <Container maxWidth="lg" className="station-card-main">
      <Grid container spacing={5} mt={2}>

      <Grid container item spacing={2} justifyContent="space-between">
          {isLargeScreen ? (
            <>
              <Grid item xs={12} md={6}>
                <span style={{ color: 'white', 
                            borderRadius: 30, 
                            padding: '10px 20px', 
                            backgroundColor: 'transparent', 
                            border: '2px solid #1976d2',
                            color: '#1976d2', 
                            fontFamily: "'Arimo', sans-serif",
                            fontWeight: '700',
                            fontSize: 15, 
                            textTransform: 'uppercase',
                            marginLeft: isLargeScreen ? '20px' : '0',
                            display: isLargeScreen ? 'inline-block' : 'block'
                }}>
                  Select Station to View
                </span>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack
                  sx={{
                    marginLeft: '200px',
                  }}
                >
                  <PendingRequestView
                    sx={{
                      backgroundColor: '#0d2135',
                      boxShadow: 'none',
                    }}
                  />
                </Stack>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <PendingRequestView
                  sx={{
                    backgroundColor: '#0d2135',
                    boxShadow: 'none',
                    marginBottom: '20px'
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <span style={{ borderRadius: 30, 
                                padding: '10px 20px', 
                                backgroundColor: 'transparent', 
                                border: '2px solid #1976d2', 
                                color: '#1976d2', 
                                fontFamily: "Poppins",
                                fontWeight: '700',
                                fontSize: 15, 
                                textTransform: 'uppercase',
                }}>
                  Select Station to View
                </span>
              </Grid>
            </>
          )}
        </Grid>

        {stations.map((station) => (
          <Grid item mb={2} xs={12} sm={12} md={6} lg={6} key={station._id}>
            <StationCard
              sx={{ height: 300 }}
              onClick={() => handleStationClick(station.stationName)}
              station={{
                subtitle: `${station.siteLocation} | ${station.address}`,
                cover: station.stationImage.url,
                createdAt: station.createdAt,
                title: station.stationName,
              }}
              onDelete={handleStationDelete}
            />
          </Grid>
        ))}

        <Grid container mt={3} spacing={4} mb={2}>
                      <Grid item xs={12}>
                          <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-end"
                          spacing={2}
                          >
                            <TrashBin totalCount={totalCount} onClick={() => setModalOpen(true)} />
                          </Stack>
                      </Grid>
                  </Grid>
        </Grid>

        <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins' }}
            >
                <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, borderRadius: 8, p: 4, maxWidth: 400, fontFamily: 'Poppins' }}>
                    <Typography variant="h6" id="modal-title" component="h2" sx={{ fontFamily: 'Poppins', fontWeight: '700' }}> 
                        TRASH <span style={{ color: '#8CACFF' }}> BIN </span>  
                    </Typography>

                    <Typography variant="subtitle" id="modal-title" component="subtitle" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}> 
                        Recently deleted stations will be kept in cloud for 30 days, after
                        which they will be automatically and permanently deleted.
                    </Typography>
                    {totalCount === 0 ? (
                            <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#A9A9A9', margin: '20px 0 20px 120px'}}>No deleted station</Typography>
                        ) : (
                            <List>
                                {documents.map(deleted => (
                                    <ListItem key={deleted._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', position: 'relative' }}>
                                        <ListItemAvatar>
                                          <Avatar alt="Station Image" src={deleted.stationImage && deleted.stationImage.url} sx={{ width: 70, height: 70, marginRight: '8px' }} />
                                            <Typography variant="body2" sx={{ position: 'absolute', top: '50px', bottom: '0.3', left: '27px', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontSize: '11px', color: '#fff', padding: '4px 4px', borderRadius: '20px' }}>
                                              {deleted.remainingDays} days
                                            </Typography>
                                         </ListItemAvatar>
                                        <ListItemText
                                            primary={deleted.stationName}
                                            secondary={deleted.siteLocation + '  ' + '| ' + deleted.address}
                                            sx={{ fontFamily: 'Poppins', '& .MuiTypography-root': { fontFamily: 'Poppins' } }}
                                        />

                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Tooltip title="Restore" style={{ fontFamily: 'Poppins', color: '#333333', backgroundColor: '#c0c0c0' }}>
                                                <IconButton>
                                                    <RestoreOutlinedIcon onClick={() => handleAction('restore', deleted)} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete" style={{ fontFamily: 'Poppins', color: '#C16262', backgroundColor: '#FFE4E4' }}>
                                                <IconButton>
                                                    <DeleteOutlinedIcon onClick={() => handleDelete(deleted.stationName)} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                </Box>
         </Modal>

            <Modal
                open={confirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                aria-labelledby="confirmation-modal-title"
                aria-describedby="confirmation-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins' }}
            >
                <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, borderRadius: 8, p: 4, maxWidth: 400, padding: '3rem' }}>
                    <Typography variant="h6" id="confirmation-modal-title" component="h2" sx={{ fontFamily: 'Poppins', fontWeight: '700' }}>
                        DELETE STATION
                    </Typography>
                    <Typography variant="subtitle1" id="confirmation-modal-description" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                        Are you sure you want to delete this station?
                        Please type <span style={{ fontWeight: '700', color: '#C16262' }}> {selectedRequest} </span> to confirm deletion.
                    </Typography>
                    <TextField
                        label="Station Name"
                        variant="outlined"
                        fullWidth
                        value={confirmationInput}
                        onChange={handleConfirmationInputChange}
                        sx={{ mt: 2 }}
                    />
                    <Button 
                          variant="contained"
                          onClick={handleDeleteConfirmation}
                          disabled={!confirmationInput || confirmationInput !== selectedRequest}
                          sx={{ 
                              mt: 2,
                              borderRadius: 10,
                              fontFamily: 'Poppins',
                              fontWeight: '600',
                              boxShadow: 'none',
                              backgroundColor: (!confirmationInput || confirmationInput !== selectedRequest) ? '#F5F5F5' : '#FFE4E4',
                              color: (!confirmationInput || confirmationInput !== selectedRequest) ? '#BDBDBD' : '#C16262',
                              '&:hover': {
                                  backgroundColor: '#FFCFCF', 
                                  color: '#C16262',
                              },
                              '&:active': {
                                  backgroundColor: '#C16262', 
                                  color: '#FFFFFF',
                              }
                          }}
                      >
                        Delete
                    </Button>
                </Box>
            </Modal>

    </Container>
  );
}
