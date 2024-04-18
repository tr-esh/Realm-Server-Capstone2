import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, 
  Grid, 
  Typography, 
  Button, 
  Avatar,  Paper, Table, TableHead, TableCell, TableBody, TableRow} from "@mui/material";

import StationRecoCard from '../../station/stationRecoCard';
import NewsCard from './newsCard';
import newsInfo from '../../../components/elements/Newsdata'
import Headline from '../../../components/elements/Headline';
import GuestHeaderCard from './guestHeaderCard';
import waterConsume from '../../../img/excellent.png';
import poorWater from '../../../img/veryPoor.png';
import badWater from '../../../img/badWater.png';
import fair from '../../../img/fair.png';
import drinkWater from '../../../img/glass-of-water.png';
import monitorWater from '../../../img/monitorWater.png';
import minorPurification from '../../../img/minorPurification.png';
import waterTreatment from '../../../img/waterTreatment.png';
import professional from '../../../img/professional.png';
import Poor from '../../../img/Poor.png';
import Water from '../../../img/water.png';



export default function GuestView() {

    const location = useLocation();
    const { state: { title } } = location;

    const stationDetails = {
        title: 'Optimal Water Source',  // Use the title from the URL or a default title
        info: 'Station HO2',
        subtitle: 'The quality of water in terms of physicochemical is stable',
    };

    const statusColors = {
      'Excellent': '#A1E6A6',
      'Good': '#FFFF80',
      'Fair': '#EEFF51',
      'Poor': '#F5B748',
      'Very Poor': '#FF6551',
     
  };

  const suggestions = {
    'Excellent': {
        suggestionImages: [drinkWater, fair, waterConsume], // Example images for each suggestion
        suggestionSubheader: [
            'Suitable for drinking.',
            'No further treatment or action is necessary.',
            'The water is safe to consume.'
        ]
    },
    'Good': {
        suggestionImages: [drinkWater, monitorWater],
        suggestionSubheader: [
            'Water that is suitable for drinking.',
            'Continue monitoring the water quality.'
        ]
    },
    'Fair': {
        suggestionImages: [poorWater, minorPurification, Poor ],
        suggestionSubheader: [
            'Water in this range is modestly suitable for drinking.',
            'It may not meet the highest standards of cleanliness, so it\'s advisable to take some precautions.',
            'You can consider using a water filter or purifier to further enhance the quality before consumption.'
        ]
    },
    'Poor': {
        suggestionImages: [Water, minorPurification, waterTreatment],
        suggestionSubheader: [
            'Water in this range is unsuitable for drinking without treatment.',
            'Minor purification is required before usage.',
            'It is recommended to use a water treatment method like boiling, chlorination, or filtration to eliminate any potential contaminants.'
        ]
    },
    'Very Poor': {
        suggestionImages: [poorWater, badWater, professional],
        suggestionSubheader: [
            'Water in this range is unsuitable for drinking without appropriate treatment.',
            'It is crucial to seek alternative sources of water supply or implement a comprehensive water treatment system.',
            'Consulting with water quality professionals or local authorities can help determine the best course of action.'
        ]
    },
    'Unknown': {
        suggestionImages: [], // No images for unknown status
        suggestionSubheader: [
            'Unknown status',
        ]
    }
};


    const navigate = useNavigate();
    const [stationdetail, setStationDetail] = useState('Station HO1');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);
    const [stationOptions, setStationOptions] = useState([]);
    const [stations, setStations] = useState([]);
    const [optimalStation, setOptimalStation] = useState(null);
    const [stationSuggestions, setStationSuggestions] = useState(suggestions['Excellent']);
    const [defaultStation, setDefaultStation] = useState(null);







    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
      
    const handleClose = (value) => {
        setAnchorEl(null);
        if (value) {
            setStationDetail(value);
        }
    };


    const getStatus = (value) => {
        if (value >= 0 && value <= 25) return 'Excellent';
        if (value > 25 && value <= 50) return 'Good';
        if (value > 50 && value <= 75) return 'Fair';
        if (value > 75 && value <= 100) return 'Poor';
        if (value > 100) return 'Very Poor';
        return value;
    };

    const handleClickStation = (station) => {
        console.log("Clicked station:", station);
        setSelectedStation(station);
    
        // Get the status of the clicked station
        const stationStatus = station.status;
    
        // Check if the station status exists in the suggestions object
        if (suggestions.hasOwnProperty(stationStatus)) {
            // Update the station suggestions based on the status
            setStationSuggestions({
                suggestionImages: suggestions[stationStatus].suggestionImages,
                suggestionSubheader: suggestions[stationStatus].suggestionSubheader
            });
        } else {
            // Handle the case when the status is not found in suggestions
            setStationSuggestions({
                suggestionImages: [], // Set empty images array
                suggestionSubheader: ['Status suggestions not available'] // Provide a default message
            });
        }
    
        console.log("Selected station:", selectedStation);
    };
    
    


    


    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch('/api/realm/provideStation');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched stations:', data); 
                    setStations(data);

                    // Find the station with the lowest WQI
                    let lowestWQIStation = data[0];
                    data.forEach(station => {
                        if (station.wqi < lowestWQIStation.wqi) {
                            lowestWQIStation = station;
                        }
                    });
                    setDefaultStation(lowestWQIStation);
                    setSelectedStation(lowestWQIStation); // Set default and selected station to the one with lowest WQI
                } else {
                    console.error('Failed to fetch station data');
                }
            } catch (error) {
                console.error('Error fetching station data', error);
            }
        };

        fetchStations();
    }, []); // Run the effect only once on component mount






    return(
        <Container maxWidth="lg">
            <Grid container spacing={4} mt={1}>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                <GuestHeaderCard
                        title={selectedStation ? `Status: ${selectedStation.status}` : 'Status: Unknown'}
                        info={selectedStation ? selectedStation.stationName : (defaultStation ? defaultStation.stationName : 'Unknown Station')}
                        subtitle={selectedStation ? `The ${selectedStation.stationName} has a Water Quality Index of ${parseFloat(selectedStation.wqi).toFixed(2)}, which is interpreted as ${selectedStation.status}` : 'No station selected'}
                        progress={selectedStation ? parseFloat(selectedStation.wqi).toFixed(2) : (defaultStation ? parseFloat(defaultStation.wqi).toFixed(2) : 0)}
                        color={selectedStation ? statusColors[selectedStation.status] : (defaultStation ? statusColors[defaultStation.status] : '#A1E6A6')} // Assuming statusColors is defined
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ order: { xs: 2, sm: 2, md: 3, lg: 3 }}}>
                   <div style={{ backgroundColor: '#001227', padding: '3ch', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                   <Typography variant="h7" sx={{ color: '#8cacff', fontFamily: "Poppins", fontWeight: 700, textTransform: 'uppercase'}}>
                        Recommended for you today!
                    </Typography>
                   </div>
                   <Grid spacing={4} py={4}
                        sx={{ 
                            backgroundColor: '#03182f', 
                            borderBottomLeftRadius: '30px', 
                            borderBottomRightRadius: '30px',
                            fontFamily: 'Poppins',
                            display: 'flex', // Setting display to flex
                            flexDirection: 'row' // Setting flex-direction to row
                        }}
                    >
                    {stationSuggestions.suggestionImages.map((imageSrc, index) => (
                        <Grid key={index} item xs={4} sm={4} md={12} lg={12}>
                        <StationRecoCard
                            suggestionImageSrc={imageSrc}
                            suggestionSubheader={stationSuggestions.suggestionSubheader[index]}
                            sx={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            }}
                        />
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
              
                <Grid item xs={12} sm={12} md={12} lg={8} sx={{ order: { xs: 3, sm: 3, md: 2, lg: 2 }}}>  
                    <Paper sx={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <div >
                            <Table>
                                <TableHead sx={{ backgroundColor: '#001227', borderBottom: 'none' }}>
                                    <TableRow>
                                        <TableCell align="left" sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none' }}>Station Image</TableCell>
                                        <TableCell align="left" sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none' }}>Station Details</TableCell>
                                        <TableCell align="center" sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none' }}>Station Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stations.filter(station => station.status).map((station, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left" sx={{ borderBottom: '1px solid #03324e' }}>
                                                <Avatar alt="Station Image" src={station.stationImage && station.stationImage.url} sx={{ width: 80, height: 80, borderRadius: '15px' }} />
                                            </TableCell>
                                            <TableCell align="left" sx={{ borderBottom: '1px solid #03324e', color: '#8cacff', fontFamily: 'Poppins', paddingTop: '2.5rem' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '700', color: '#8cacff',  fontFamily: 'Poppins' }}>{station.stationName}</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: '500', fontFamily: 'Poppins' }} >{station.siteLocation}</Typography> 
                                                <Typography variant="subtitle2" sx={{ fontFamily: 'Poppins' , fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.5rem'}} >{station.address}</Typography>
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #03324e' }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 600,
                                                    fontSize: '0.7rem',
                                                    borderRadius: '2rem',
                                                    textTransform: 'none',
                                                    backgroundColor: statusColors[station.status], // Assuming status always exists now
                                                    color: '#000000', // Set text color
                                                    width: '100%',
                                                    height: '2rem',
                                                    boxShadow: 'none',
                                                    lineHeight: 1,
                                                }}
                                                onClick={() => handleClickStation(station)} // Pass the station object to the event handler
                                                >
                                                {station.status}
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </div>
                    </Paper>
                </Grid>

            <Grid item xs={12} sm={12} md={12} mt={6} sx={{ order: { xs: 4, sm: 4, md: 4, lg: 4}}}>
                    <Typography variant="h7" sx={{ color: '#8cacff', fontFamily: "Poppins", fontWeight: 700, textTransform: 'uppercase' }}>
                    Gain Insights 💭
                    </Typography>
            </Grid>

            <Grid container spacing={4} margin={1} sx={{ order: { xs: 4, sm: 4, md: 4, lg: 4}}}>
              {Headline.map((news, index) => (
                <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
                    <NewsCard key={index} {...news} sx={{ backgroundColor: '#0A1929' }} />
                </Grid>
               ))}
               {newsInfo.map((news, index) => (
                 <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                    <NewsCard key={index} {...news} sx={{ backgroundColor: '#0A1929' }} />
                 </Grid>
                ))}
            </Grid>


            </Grid>
        </Container>
    )
}

