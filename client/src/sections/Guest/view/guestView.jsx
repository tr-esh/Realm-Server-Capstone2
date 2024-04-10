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
            'Continue monitoring the water quality.',
            ''
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
            '', // Add empty strings for unused lines
            '' // Add empty strings for unused lines
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
        setOptimalStation(station);
    
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
    
        console.log("Optimal station:", optimalStation);
    };
    
    


    


    useEffect(() => {
        // Fetch station data from the API
        const fetchStations = async () => {
            try {
                const response = await fetch('/api/realm/provideStation');
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
    }, []); // Run the effect only once on component mount




    return(
        <Container maxWidth="lg">
            <Grid container spacing={4} mt={1}>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    <GuestHeaderCard
                        title={stationDetails.title}
                        info={stationDetails.info}
                    />
                </Grid>


              
                <Grid item xs={12} sm={12} md={12} lg={8}>  
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
                                                <Typography variant="body1" sx={{ fontWeight: '700', color: '#8cacff',  fontFamily: 'Poppins' }}>{station.stationName}</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: '500', fontFamily: 'Poppins' }} >{station.siteLocation}</Typography> 
                                                <Typography variant="body2" sx={{ fontFamily: 'Poppins' , fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.5rem'}} >{station.address}</Typography>
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #03324e' }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 500,
                                                    fontSize: '0.9rem',
                                                    borderRadius: '2rem',
                                                    textTransform: 'none',
                                                    backgroundColor: statusColors[station.status], // Assuming status always exists now
                                                    color: '#000000', // Set text color
                                                    width: '7rem',
                                                    height: '2rem',
                                                    boxShadow: 'none'
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

              
                <Grid container spacing={4} mt={5} sx={{ borderRadius: '15px', overflow: 'hidden', boxShadow: 'none' , marginLeft: 5}}>
                <Grid item xs={12} sx={{ backgroundColor: '#001227', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', borderBottomLeftRadius: '0', borderBottomRightRadius: '0', padding: '1rem' }}>
                    <Typography variant="h6" sx={{ color: '#8cacff', fontFamily: "Poppins", fontWeight: 700, textTransform: 'uppercase' }}>
                        Recommended for you today!
                    </Typography>
                </Grid>
                <Grid container spacing={4} 
                    sx={{ backgroundColor: '#03182f', 
                        borderBottomLeftRadius: '30px', 
                        borderBottomRightRadius: '30px', 
                        borderTopLeftRadius: '0', 
                        borderTopRightRadius: '0', 
                        padding: '1rem',  
                        marginTop: '3px', 
                        fontFamily: 'Poppins' }}>
                    {stationSuggestions.suggestionSubheader && stationSuggestions.suggestionSubheader.map((suggestion, index) => (
    <Grid key={index} item xs={12} sm={4} md={4}>
        <StationRecoCard
            suggestionImageSrc={stationSuggestions.suggestionImages[index]} // Use corresponding image for each suggestion
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }}
            suggestionSubheader={suggestion}
        />
    </Grid>
))}

                </Grid>
            </Grid>


           

            <Grid item xs={12} sm={12} md={12} mt={6} sx={{marginLeft: 4}}>
                <span style={{ color: 'white', 
                               fontFamily: "Poppins", 
                               fontWeight: 700,
                               fontSize: 22, 
                               textTransform: 'uppercase',
                               color: '#8cacff', 

                               
                    }}
                    >
                        Gain Insights 💭
                    </span>
            </Grid>

            <Grid container spacing={4} margin={1}>
              {Headline.map((news, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                    <NewsCard key={index} {...news} sx={{ backgroundColor: '#0A1929' }} />
                </Grid>
               ))}
               {newsInfo.map((news, index) => (
                 <Grid key={index} item xs={12} sm={6} md={3}>
                    <NewsCard key={index} {...news} sx={{ backgroundColor: '#0A1929' }} />
                 </Grid>
                ))}
            </Grid>


            </Grid>
        </Container>
    )
}
