import React, { useState, useEffect } from 'react';
import { Container, Grid, Stack } from "@mui/material";
import MonthHeaderCard from "../monthHeaderCard";
import MonthlyCard from "../monthlyCard";
import YearSort from '../yearSort';
import StationSort from '../stationSort';
import { useNavigate, Link } from 'react-router-dom';

// Other imports needed for your specific implementation

export default function MonthView() {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState({ value: 'Station HO1', label: 'Station HO1' });
  const [selectedYear, setSelectedYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stationOptions, setStationOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [monthlyData, setMonthlyData] = useState([
    { monthName: 'January', dataCount: 0, entries: '0' },
    { monthName: 'February', dataCount: 0, entries: '0' },
    { monthName: 'March', dataCount: 0, entries: '0' },
    { monthName: 'April', dataCount: 0, entries: '0' },
    { monthName: 'May', dataCount: 0, entries: '0' },
    { monthName: 'June', dataCount: 0, entries: '0' },
    { monthName: 'July', dataCount: 0, entries: '0' },
    { monthName: 'August', dataCount: 0, entries: '0' },
    { monthName: 'September', dataCount: 0, entries: '0' },
    { monthName: 'October', dataCount: 0, entries: '0' },
    { monthName: 'November', dataCount: 0, entries: '0' },
    { monthName: 'December', dataCount: 0, entries: '0' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching data for station:', selectedStation?.value);
        console.log('Fetching data for year:', selectedYear);
        const response = await fetch(`/api/realm/monthlyEntry/${selectedStation?.value || ''}/${selectedYear.value}`);
        const data = await response.json();
        console.log('Fetched Monthly Data:', data);
    
        // Convert data object to array of objects
        const dataArray = Object.entries(data).map(([month, count]) => ({
          monthName: getMonthName(parseInt(month)),
          dataCount: count,
          entries: count.toString(),
        }));
        
    
        // Reset data for all months to default values if no data is available
        const updatedData = monthlyData.map((monthData) => {
          const newData = dataArray.find((data) => data.monthName === monthData.monthName);
          return newData || { ...monthData, dataCount: 0, entries: '0' };
        });
    
        // Update the specific month data in the array
        setMonthlyData(updatedData);
      } catch (error) {
        setError('Error fetching monthly data');
        console.error('Error fetching monthly data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();  // Fetch data initially
    
    // Fetch data whenever selectedStation or selectedYear changes
  }, [selectedStation, selectedYear]);
  

  // Function to get month names
  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1] || ''; // Adjust for zero-based index
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption); // Update selected year
  };


  return (
    <Container maxWidth="lg">
      <Grid container mt={5}>
        <Grid item xs={12} sm={12} md={12}>
          <MonthHeaderCard
            sx={{
              backgroundColor: '#8CACFF'
            }}
            title={'LOGS'}
            subtitle={'ENTRIES'}
          />
        </Grid>

        <Grid container mt={5} spacing={2}>
          <Grid item xs={6}>
            <StationSort
              options={stationOptions}
              onSort={(selected) => setSelectedStation(selected)}
            />
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
            >
              <YearSort
                options={yearOptions}
                onSort={handleYearChange}
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={4} mt={1}>
          {/* Map MonthlyCard components */}
          {monthlyData.map((monthData, index) => (
            <Grid item key={index} xs={12} sm={12} md={6} lg={4}>
              {monthData.dataCount > 0 ? (
                <Link
                to={`/logentries/${selectedStation?.value}/${monthData.monthName}/${selectedYear.value}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <MonthlyCard
                    sx={{
                      backgroundColor: '#10273d',
                    }}
                    monthName={monthData.monthName}
                    dataCount={monthData.dataCount || 0}
                    entries={monthData.entries}
                  />
                </Link>
              ) : (
                <MonthlyCard
                  sx={{
                    backgroundColor: '#10273d',
                    pointerEvents: 'none', // Disable pointer events for the card
                  }}
                  monthName={monthData.monthName}
                  dataCount={monthData.dataCount || 0}
                  entries={monthData.entries || '0'}
                />
              )}
            </Grid>
          ))}
        </Grid>

      </Grid>
    </Container>
  );
}