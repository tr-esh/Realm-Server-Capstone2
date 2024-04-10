import { useEffect, useState } from 'react';
import { Container, Grid } from "@mui/material";
import StationCardMO from "../stationCardMO";
import { useNavigate } from 'react-router-dom';
import '../../../../components/styles/Stations.css';
import StationAdd from "../stationAdd";

export default function StationSelectView() {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // Fetch station data from the API
    const fetchStations = async () => {
      try {
        const response = await fetch('/api/realm/setStation');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched stations:', data); // Add this line to log the fetched data
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

  const handleStationClick = (stationName) => {
    // Navigate to the station details page or perform any other action
    navigate(`/mo-stations/${stationName}`, { state: { title: stationName, stationName } });
  };

  return (
    <div className="station-main">
      <Container maxWidth="lg" className="main-container">
        <Grid container spacing={3}>

          {stations.length > 0 && (
              <Grid item xs={12} sm={12} md={12}>
                <span style={{
                  color: 'white',
                  fontFamily: "Arimo, 'sans-serif'",
                  fontWeight: 600,
                  fontSize: 25,
                  textTransform: 'uppercase',
                  marginLeft: 10
                }}>
                  Select A <span style={{color: '#8cacff'}}>Station</span>
                </span>
              </Grid>
            )}

          {stations.map((station) => (
            <Grid item mb={2} xs={12} sm={6} key={station._id}>
              <StationCardMO
                sx={{ height: 300 }}
                onClick={() => handleStationClick(station.stationName)}
                station={{
                  subtitle: `${station.siteLocation} | ${station.address}`,
                  cover: station.stationImage.url,
                  createdAt: station.createdAt,
                  title: station.stationName,
                }}
              />
            </Grid>
          ))}

          <Grid item mb={2} xs={12} sm={6}>
            <StationAdd />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
