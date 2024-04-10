import React, { useState, useEffect } from 'react';
import { Container, Grid, Stack } from "@mui/material";
import SelectedMonthHeader from '../selectedMonthHeader';
import { useParams } from 'react-router-dom';
import LogTable from '../logTable';
import ExportButton from '../exportButton';
import ParameterSort from '../parameterSort';
import * as writeXLSX from 'xlsx';

export default function SelectedMonthView() {
    const { stationId, month, year } = useParams();
    console.log('Params:', stationId, month, year);

    const [loading, setLoading] = useState(false);
    const [monthlyData, setMonthlyData] = useState([]);
    const [selectedParam, setSelectedParam] = useState('temperature');
    const [filteredDataForTable, setFilteredDataForTable] = useState([]);
    const [error, setError] = useState('');

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/realm/monthlyData/${stationId}`);
                const data = await response.json();
    
                console.log('Fetched data:', data);
    
                // Convert month string to numeric format
                let monthNumeric = 0; // Default value if month is not recognized
                const monthIndex = monthNames.indexOf(month);
                if (monthIndex !== -1) {
                    monthNumeric = monthIndex + 1;
                } else {
                    console.error('Invalid month parameter:', month);
                }
    
                // Filter data based on the selected month and year
                const filteredData = data.filter(entry => {
                    const entryDate = new Date(entry.createdAt);
                    const entryMonth = entryDate.getUTCMonth() + 1;
                    const entryYear = entryDate.getUTCFullYear();
                    return entryMonth === monthNumeric && entryYear === parseInt(year);
                });
    
                console.log('Filtered data:', filteredData);
    
                // Update state with the filtered data
                setMonthlyData(data);
            } catch (error) {
                setError('Error fetching monthly data');
                console.error('Error fetching monthly data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [stationId, month, year]);

    useEffect(() => {
        if (monthlyData.length > 0) { // Ensure monthlyData is available
            const filteredData = monthlyData.filter(data => data.paramName === selectedParam);
            setFilteredDataForTable(filteredData);
        }
    }, [monthlyData, selectedParam]);

    const handleSortChange = (param) => {
        setSelectedParam(param);
    };

    const handleExport = (monthName) => {
        console.log('Monthly Data:', monthlyData);
        console.log('Month Name:', monthName);
    
        const mappedData = monthlyData.map(({ tester, paramName, paramValue, createdAt }) => ({
            stationId: stationId,
            tester,
            paramName,
            paramValue,
            createdAt: new Date(createdAt).toLocaleString('en-PH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
        }));
    
        console.log('Mapped Data:', mappedData);
    
        const wb = writeXLSX.utils.book_new();
    
        // No need to filter by paramName here as we're exporting all data
        const tempSheet = writeXLSX.utils.json_to_sheet(mappedData.filter(({ paramName }) => paramName === 'temperature'));
        const turbidSheet = writeXLSX.utils.json_to_sheet(mappedData.filter(({ paramName }) => paramName === 'turbidity'));
        const phSheet = writeXLSX.utils.json_to_sheet(mappedData.filter(({ paramName }) => paramName === 'pH'));
    
        writeXLSX.utils.book_append_sheet(wb, tempSheet, 'Temperature');
        writeXLSX.utils.book_append_sheet(wb, turbidSheet, 'Turbidity');
        writeXLSX.utils.book_append_sheet(wb, phSheet, 'pH');
    
        const wbout = writeXLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    
        const fileName = `${monthName.toLowerCase()}_logs.xlsx`;
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };
    
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }
    

    return (
        <Container maxWidth="lg">
            <Grid container mt={5}>
                <Grid item xs={12} sm={12} md={12} ml={3}>
                    <SelectedMonthHeader
                        sx={{
                        backgroundColor: '#0A1929'
                        }}
                        title={`${month.charAt(0).toUpperCase() + month.slice(1)} Logs`}
                        subtitle="Never miss a beat with our log tracking solution."
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} mt={6} mb={2} ml={1}>   
                    <ParameterSort 
                        options={[
                            { value: 'turbidity', label: 'Turbidity' },
                            { value: 'temperature', label: 'Temperature' },
                            { value: 'pH', label: 'pH' },
                        ]}
                        onSort={handleSortChange} // Passing the handler to ParameterSort
                    />
                </Grid>

                <Grid container spacing={4} mb={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <LogTable 
                            sx={{
                                backgroundColor: '#10273d',
                                borderRadius: 10,
                            }}
                            list={filteredDataForTable}
                        />
                    </Grid>
                </Grid>

                <Grid container mt={3} spacing={4} mb={2}>
                    <Grid item xs={12}>
                        <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={2}
                        >
                          <ExportButton onClick={() => handleExport(month.charAt(0).toUpperCase() + month.slice(1))} />
                        </Stack>
                    </Grid>
                </Grid>
    
            </Grid>
        </Container>
    )
}