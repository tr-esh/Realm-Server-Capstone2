import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Typography, IconButton, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import StationHeaderCard from '../stationHeaderCard';
import StationRecordedWQI from '../../MOSection/stations/stationRecordedWQI';
import StationPredictedWQI from '../../MOSection/stations/stationPredictedWQI';
import StationActivityTable from '../../MOSection/stations/stationActivityTable';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link } from 'react-router-dom';
import DeleteButton from '../deleteButton';

export default function StationSectionView() {
  const location = useLocation();
  const { state: { title } } = location;
  const { stationId } = useParams();
  const [stationDetails, setStationDetails] = useState({
    title: title || 'Default Title',
    info: '',
    subtitle: '',
    progress: 0
  });
  const [wqiTrends, setWQITrends] = useState([]);
  const [activityStationLogs, setActivityStationLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const response = await fetch(`/api/realm/getWQIPredictions/${stationId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Data received:", data);
        
        // Assuming the response structure is consistent with your example and you're interested in the first station's data only.
        const stationData = data[0]?.data; // Safely accessing the first station's data
        
        if (stationData) {
          const chartDataFormatted = stationData.map(item => ({
            // You might need to format the date as per your chart requirements
            label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: parseFloat(item.wqi.toFixed(2))
          }));
          
          setChartData(chartDataFormatted);
        } else {
          console.error('No data available for this station');
          setChartData([]);
        }
      } catch (error) {
        console.error('Error fetching prediction data:', error);
      }
    };
  
    fetchPredictionData();
  }, [stationId]); 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [activityLogsResponse, stationLogsResponse] = await Promise.all([
                fetch(`/api/realm/activityLogs/${stationId}`),
                fetch(`/api/realm/stationLogs/${stationId}`)
            ]);

            if (!activityLogsResponse.ok || !stationLogsResponse.ok) {
                throw new Error('Failed to fetch logs');
            }

            const activityLogsData = await activityLogsResponse.json();
            const stationLogsData = await stationLogsResponse.json();

            // Combine activity logs and station logs
            const combinedLogs = [...activityLogsData.logs, ...stationLogsData.logs];

            // Sort the combined logs by date in descending order
            combinedLogs.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

            setActivityStationLogs(combinedLogs);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    fetchData();
}, [stationId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await fetch(`/api/realm/calculateWQI`);
        if (!response.ok) throw new Error('Failed to fetch station data');
        const data = await response.json();
        if (data[stationId]) {
          const allMonths = Array.from({ length: 12 }, (_, index) => {
            const month = index + 1;
            return {
              label: new Date(Date.UTC(2024, month - 1)).toLocaleDateString('en-US', { month: 'short' }),
              value: null
            };
          });
          const presentMonthsData = Object.entries(data[stationId]).map(([date, entry]) => {
            const monthIndex = new Date(date).getMonth();
            return {
              label: new Date(date).toLocaleDateString('en-US', { month: 'short' }),
              value: parseFloat(entry.wqi.toFixed(2))
            };
          });
          const mergedData = allMonths.map(month => {
            const existingMonthData = presentMonthsData.find(data => data.label === month.label);
            return existingMonthData ? existingMonthData : month;
          });
          setWQITrends(mergedData);
          // Assuming you still want to calculate and update station details based on the latest entry
          const latestEntry = Object.values(data[stationId]).pop();
          const percentageChange = ((latestEntry.wqi - data[stationId][Object.keys(data[stationId])[0]].wqi) / data[stationId][Object.keys(data[stationId])[0]].wqi) * 100;
          const changeType = percentageChange > 0 ? 'increased' : 'decreased';
          setStationDetails({
            ...stationDetails,
            info: latestEntry.status,
            subtitle: ` ${stationId} is interpreted as ${latestEntry.status} with a WQI result ${latestEntry.wqi.toFixed(2)} ${changeType} by ${Math.abs(percentageChange).toFixed(2)}% since ${new Date(latestEntry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
            progress: parseFloat(latestEntry.wqi.toFixed(2))
          });
        } else {
          console.error('Station data not found');
        }
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };

    fetchStationData();
  }, [stationId]); // Fetch data whenever stationId changes

  
  const handleDelete = async () => {
    handleClose(); // Close the confirmation dialog

    try {
      const response = await fetch(`/deleteStation/${encodeURIComponent(stationId)}`, {
        method: 'POST', // Assuming the delete operation is performed via a POST request
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the station');
      }

      // If delete is successful, redirect to a certain route
      navigate("/stations");
    } catch (error) {
      console.error('Error deleting station:', error);
      
    }
  };
    
      return (
        <Container maxWidth="lg">
          <Grid container spacing={4} mt={4}>

          <Grid item xs={12} sm={12} md={12} mb={-3} ml={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-8px' }}>
              <IconButton
                  component={Link}
                  to="/stations"
                  sx={{
                    borderRadius: 3,
                    borderRadius: 30, // Rounded border
                                      padding: '10px 20px', // Adjust padding as needed
                                      backgroundColor: 'transparent', // Transparent background
                                      border: '2px solid #1976d2', // Blue outline
                                      color: '#1976d2', // Blue text color
                                      fontWeight: 'bold', // Bold text
                                      textTransform: 'uppercase', // Uppercase text
                    marginBottom: '0.5rem'
                  }}
                >
                  <ArrowBackRoundedIcon sx={{ fontSize: 25, color: '#1976d2' }} />
                <Typography sx={{
                  marginLeft: '8px',
                  fontFamily: "Poppins",
                  fontWeight: '700',
                  fontSize: 18,
                 
                }}>
                  Back
                </Typography>
             </IconButton>
            </Box>
          </Grid>
    
          <Grid item xs={12} sm={12} md={12} lg={12}>
                    <StationHeaderCard
                        title={stationDetails.info}
                        info={stationDetails.title}
                        subtitle={stationDetails.subtitle}
                        progress={stationDetails.progress}
                        
                    />
                </Grid>

    
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {chartData.length > 0 ? (
                  <StationRecordedWQI
                    title="WQI TRENDS OVER THE MONTH"
                    subheader="(+43%) status quality than last month" 
                      chart={{
                        series: wqiTrends,
                      }}
                    sx={{
                      backgroundColor: '#10273d'
                    }}
                  />
                ) : (
                  <Grid item xs={12} sm={12} md={12} mt={10} mb={5} height={150}>
                    <Typography variant="h6" 
                                color="textSecondary" 
                                align="center"
                                sx={{ fontFamily: 'Poppins',
                                      fontWeight: '200',
                                      color: '#8cacff',
                                      opacity: '75%' }}>
                        No recorded data at the moment.
                    </Typography>
                </Grid>
                )}
            </Grid>


            <Grid item xs={12} sm={12} md={12} lg={12}>
              {chartData.length > 0 ? (
                  <StationPredictedWQI
                    title="PREDICTED WQI"
                    subheader="for the next month" 
                    chart={{
                      series: chartData,
                    }}
                    sx={{
                      backgroundColor: '#10273d'
                    }}
                  />
                ) : (
                  <Grid item xs={12} sm={12} md={12} mt={10} mb={5} height={150}>
                    <Typography variant="h6" 
                                color="textSecondary" 
                                align="center"
                                sx={{ fontFamily: 'Poppins',
                                      fontWeight: '200',
                                      color: '#8cacff',
                                      opacity: '75%' }}>
                        Prediction is not yet available.
                    </Typography>
                </Grid>
                )}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} mt={2}
                style={{ display:'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'white', 
                                        fontFamily: "'Arimo', sans-serif", 
                                        fontWeight: 500,
                                        fontSize: 25, 
                                        textTransform: 'uppercase',
                                        marginLeft: 8
                              }}
                          >
                            Latest Station Activity
                        </span>
                        <span style={{ color: '#8CACFF', 
                                        fontFamily: "Poppins", 
                                        fontWeight: 300,
                                        fontSize: 13, 
                                        marginLeft: 8
                            }}
                          >
                            Review the recent station activities that have taken place
                        </span>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
                    <StationActivityTable
                        sx={{
                        backgroundColor: '#0d2135',
                        boxShadow: 'none',
                        margin: 0,
                        padding: 0,
                        maxHeight: '300px', 
                        overflowY: 'hidden', // Initially hide the scrollbar
                          '&:hover': {
                            overflowY: 'auto', // Show scrollbar on hover
                          },
                      }}
                        list={activityStationLogs.map(log => ({
                            id: log._id,
                            tester: log.tester,
                            dateAdded: log.dateAdded,
                            status: log.status,
                        }))}                    
                    />
                </Grid>

                <Grid container mt={8} spacing={4} mb={2}>
                    <Grid item xs={12} ml={5}>
                        <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        spacing={2}
                        >
                          <DeleteButton onClick={handleClickOpen} />
                        </Stack>
                    </Grid>
                </Grid>

                <Dialog open={open} 
                        onClose={handleClose}
                        aria-labelledby="confirmation-dialog-title"
                        aria-describedby="confirmation-dialog-description"
                        PaperProps={{
                            style: {
                                borderRadius: 20 // Adjust the border radius as needed
                            }
                        }}
                    >
                  <DialogTitle style={{fontFamily: 'Poppins', fontWeight: '700'}}>Delete Station</DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{fontFamily: 'Poppins', fontWeight: '500'}} >
                      Are you sure you want to delete this station?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions style={{justifyContent: 'space-between'}}>
                    <Button 
                        onClick={handleClose}
                        style={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 20,
                          background: '#C16262', // Red color for No
                          color: 'white', // Text color
                          flexGrow: 1
                      }}
                      >
                        No
                      </Button>
                    <Button 
                        onClick={handleDelete} 
                        style={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 20,
                            background: '#a4c2aa', // Green color for Yes
                            color: 'white', // Text color
                            flexGrow: 1
                        }}
                        autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
    
          </Grid>
        </Container>
      );
    }

