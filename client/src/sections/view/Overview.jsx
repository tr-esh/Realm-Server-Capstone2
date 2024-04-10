import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Greeting from '../../components/elements/Greetings';
import AppWidgetSummary from '../app-widget-summary';
import AppWQISummary from '../appWQISummary';
import imageSource from '../../img/dashboard-illustration.png';
import AppPerformanceSummary from '../appPerformanceSummary';
import AppLogTimeline from '../appLogTimeline';
import AppTimeDisplay from '../appTimeDisplay';

export default function Overview() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    fetchDataAndUpdate();
  }, []);

  const fetchDataAndUpdate = async () => {
    try {
      const [activityLogsData, otherData] = await Promise.all([fetchActivityLogs(), fetchOtherData()]);
      const newCombinedData = combineAndSortData([...combinedData, ...activityLogsData, ...otherData]);
      setCombinedData(newCombinedData);
    } catch (error) {
      console.error('Error fetching and updating data:', error);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const response = await fetch('/api/realm/activityLog'); 
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw error;
    }
  };

  const fetchOtherData = async () => {
    try {
      const response = await fetch('/api/realm/stationActivity'); 
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching other data:', error);
      throw error;
    }
  };

  const combineAndSortData = (data) => {
    return data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  };

  const filterDataWithinTwoWeeks = (data) => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    return data.filter(item => new Date(item.dateAdded) > twoWeeksAgo);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <AppWidgetSummary
              sx={{
                backgroundColor: '#8CACFF',
                px: 4,
                py: 4,
              }}
              title={<Greeting />}
              imageSource={imageSource}
              imageSize="35%"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={5}>
            <AppTimeDisplay
              sx={{
                backgroundColor: '#0A1929'
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={7}>
            <AppWQISummary 
              title="Latest WQI Records per Station"
              subheader
              sx={{
                backgroundColor: '#10273d'
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={5}> 
            <AppPerformanceSummary 
              title="Optimal Water Source" 
              sx={{
                backgroundColor: '#10273d',
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} mt={2} style={{ display:'flex', flexDirection: 'column' }}>
            <span 
              style={{ color: 'white', 
                       fontFamily: "Archivo, 'sans-serif'", 
                       fontWeight: 500, 
                       fontSize: 25, 
                       textTransform: 'uppercase', 
                       marginLeft: '3rem' }}>
              Station Activity Logs
            </span>
            <span 
            style={{ color: '#8CACFF', 
                     fontFamily: "Poppins", 
                     fontWeight: 300, 
                     fontSize: 13, 
                     marginLeft: '3rem' }}>
              Catch up on the activities from the last two weeks
            </span>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <AppLogTimeline
              sx={{
                backgroundColor: '#0d2135',
                boxShadow: 'none',
                margin: 0,
                padding: 0,
                maxHeight: '300px', 
                overflowY: 'hidden',
                '&:hover': {
                  overflowY: 'auto',
                },
              }}
              list={filterDataWithinTwoWeeks(combinedData)}
            />
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}
