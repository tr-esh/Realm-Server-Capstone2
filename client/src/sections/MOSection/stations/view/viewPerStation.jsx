import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container, Grid, Button, Typography } from "@mui/material";
import StationViewHeader from "../stationViewHeader";

import StationParameterCard from '../stationParameterCard';
import StationActivityTable from '../stationActivityTable';
import { useAuthContext } from '../../../../hooks/useAuthContext';

export default function ViewPerStation () {
    const location = useLocation();
    const { state: { title, stationName }} = location;
    const { user } = useAuthContext();
    const { stationId } = useParams();
    console.log('Params:', stationId );

    
    const [stationDetails, setStationDetails] = useState({
        title: title || 'Default Title',
        info: '',
        subtitle: '',
        progress: 0
    });

    const [selectedStation, setSelectedStation] = useState(stationName);
    const [tester, setTester] = useState(user.username);
    const [parameterData, setParameterData] = useState([]);

    const [activityStationLogs, setActivityStationLogs] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

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

    useEffect(() => {
        const fetchStationData = async () => {
          try {
            const response = await fetch(`/api/realm/calculateWQI`);
            if (!response.ok) throw new Error('Failed to fetch station data');
            const data = await response.json();
            if (data[stationId]) {
              
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
              // If no latest data available, trigger fetching initial data
              setIsInitialized(true);
            }
          } catch (error) {
            console.error('Error fetching station data:', error);
          }
        };
    
        fetchStationData();
      }, [stationId]); // Fetch data whenever stationId changes
      
      useEffect(() => {
        const fetchInitialData = async () => {
            if (isInitialized) {
                try {
                    const response = await fetch(`/api/realm/wqiResult`);
                    if (!response.ok) throw new Error('Failed to fetch station data');
                    const data = await response.json();
                    
                    if (data[stationId]) {
                        const latestEntry = data[stationId];
                        const { wqi, status, createdAt } = latestEntry;

                        // Update station details state
                        setStationDetails({
                            ...stationDetails,
                            info: status,
                            subtitle: `${stationId} is interpreted as ${status} with a WQI result ${wqi.toFixed(2)} since ${new Date(createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
                            progress: parseFloat(wqi.toFixed(2))
                        });

                    } else {
                        console.error('Station data not found');
                    }
                } catch (error) {
                    console.error('Error fetching station data:', error);
                }
            }
        };

        fetchInitialData();
    }, [isInitialized, stationId]);
      

    useEffect(() => {
        const fetchParameterData = async () => {
            try {
                const response = await fetch(`/api/realm/latestStationReadings/${encodeURIComponent(selectedStation)}`);
                const data = await response.json();
    
                console.log('Fetched data:', data); // Log the data received from the API
    
                if (response.status === 200) {
                    setParameterData(data);
                } else {
                    console.error('Failed to fetch parameter data:', data.error);
                }
            } catch (error) {
                console.error('Error during parameter data fetch:', error.message);
            }
        };
    
        fetchParameterData();

        // Setup interval to fetch data periodically (every 5 seconds in this example)
        const intervalId = setInterval(fetchParameterData, 5000);
    
        return () => clearInterval(intervalId);
    }, [selectedStation]);

    let lastUserId;
    const handleInitializeData = async () => {
      try {
        // Check if both station and tester are selected
        if (!selectedStation || !tester) {
          console.error('Please select Station Name and Tester Name');
          return;
        }
    
        // Send initialization request to the backend
        const response = await fetch('/api/realm/startMonitoring', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            stationName: selectedStation,
            tester: tester,
          }),
        });
    
        const data = await response.json();
        console.log(data.message);
    
        // If the startMonitoring operation was successful, store the user ID
        if (response.status === 201) {
          lastUserId = data.userId; // Assuming your server returns the created user ID
          setIsInitialized(true); // Set initialization status to true if successful
        }
      } catch (error) {
        // Handle errors during initialization
        console.error('Error during initialization:', error.message);
      }
    };    

    const handleTerminateData = async () => {
      try {
        const response = await fetch('/api/realm/deleteUserData', {
          method: 'DELETE'
        });
    
        const data = await response.json();
        console.log(data.message); // log the response message
    
      } catch (error) {
        console.error('Error:', error.message);
      }
      setIsInitialized(false);
    };

    const progressData = [
        { name: 'progress', value: 42.4 }, // Replace with the actual progress value
    ];

    return(
        <Container maxWidth="lg">
            <Grid container spacing={5} mt={2}>
                
                <Grid item xs={12} sm={12} md={12}>
                    <StationViewHeader
                        title={stationDetails.info}
                        info={stationDetails.title}
                        subtitle={stationDetails.subtitle}
                        progress={stationDetails.progress}
                     />
                </Grid>

                <Grid item container xs={12} sm={12} md={12} justifyContent="flex-start" alignItems="center" ml={1}>
                    <Grid item xs={12} sm={12} md={6} mb={3}>
                        <div>
                            <span style={{
                                color: 'white',
                                fontFamily: "'Arimo', sans-serif",
                                fontWeight: 500,
                                fontSize: 20,
                                textTransform: 'uppercase',
                                marginLeft: 2
                            }}>
                                Monitored
                            </span>
                            <span style={{
                                color: '#8cacff',
                                fontFamily: "'Arimo', sans-serif",
                                fontWeight: 500,
                                fontSize: 20,
                                textTransform: 'uppercase',
                                marginLeft: 4
                            }}>
                                Physicochemical Parameters
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} container justifyContent="flex-end">
                        <Button variant="contained"
                            onClick={handleInitializeData}
                            sx={{
                                borderRadius: 5,
                                padding: '1ch',
                                backgroundColor: '#8cacff',
                                marginRight: 1,
                                fontFamily: "Poppins", 
                                color: '#001227',
                                fontsize: '0.9rem'
                            }}
                        >
                            Start Monitoring
                        </Button>
                        <Button variant="contained"
                            onClick={handleTerminateData}
                            sx={{
                                borderRadius: 5,
                                backgroundColor: '#8cacff',
                                fontFamily: "Poppins",
                                color: '#001227',
                                fontsize: '0.9rem'
                            }}
                        >
                            Terminate
                        </Button>
                    </Grid>
                </Grid>

                {parameterData && Object.keys(parameterData).length > 0 ? (
                    Object.entries(parameterData).map(([parameterName, parameter]) => (
                        <Grid item key={parameterName} xs={12} sm={4} md={4}>
                            <StationParameterCard
                            sx={{ backgroundColor: '#001227' }}
                            parameterName={parameter.paramName}
                            parameterScript={parameter.parameterScript}
                            parameterValue={parameter.paramValue}
                            unit={parameter.unit}
                            />
                        </Grid>
                        ))
                    ) : (
                        <Grid item xs={12} sm={12} md={12} mt={5} height={150}>
                            <Typography variant="h6" 
                                        color="textSecondary" 
                                        align="center"
                                        sx={{ fontFamily: 'Poppins',
                                              fontWeight: '200',
                                              color: '#8cacff',
                                              opacity: '75%' }}>
                                No parameter data available
                            </Typography>
                        </Grid>
                    )}

                <Grid item xs={12} sm={12} md={12} mt={4}
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

                <Grid item xs={12} sm={12} md={12}>
                    <StationActivityTable
                        sx={{
                        backgroundColor: '#0d2135',
                        boxShadow: 'none',
                        margin: 0,
                        padding: 0
                        }}
                        list={activityStationLogs.map(log => ({
                            id: log._id,
                            tester: log.tester,
                            dateAdded: log.dateAdded,
                            status: log.status,
                        }))}  
                    />
                </Grid>

            </Grid>
        </Container>
    )
}