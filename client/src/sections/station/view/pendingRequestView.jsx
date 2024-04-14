import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { 
    Card, 
    Box, 
    Grid, 
    Typography, 
    IconButton, 
    Modal, 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function PendingRequestView({ title, subtitle, icon, color = 'primary', sx, ...other }) {
    const [documents, setDocuments] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);


     useEffect(() => {
        // Function to fetch first document and total count
        const fetchData = async () => {
            try {
                const response = await fetch('api/realm/getRequest');
                const data = await response.json();
                setDocuments(data.allDocuments);
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set up interval for polling
        const intervalId = setInterval(fetchData, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Run only once on component mount

    const handleModalOpen = (request) => {
        setSelectedRequest(request);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRequest(null);
    };

    const handleAction = async (action, request) => {
        try {
            // Make sure there is a selected request
            if (!request) {
                console.error('No request selected.');
                return;
            }
    
            if (action === 'approve') {
                const url = `api/realm/approvePending/${request._id}`;
                const method = 'POST';
                const response = await fetchAction(url, method);
                handleResponse(response, action);
            } else if (action === 'deny') {
                // Open confirmation dialog when denying
                setConfirmationOpen(true);
                setSelectedRequest(request);
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
            console.log(`Request ${action === 'approve' ? 'approved' : 'deny'} successfully.`);
            // Update UI or take further actions
        } else {
            console.error(`Failed to ${action}:`, response.statusText);
            // Show an error message to the user or take further actions
        }
    };

    const handleConfirmationClose = () => {
        setConfirmationOpen(false);
    };

    const handleConfirmationConfirm = async () => {
        setConfirmationOpen(false);
        const url = `api/realm/deletePending/${selectedRequest._id}`;
        const method = 'DELETE';
        const response = await fetchAction(url, method);
        handleResponse(response, 'deny');
    };


    return (
        <>
            {totalCount > 0 || documents.length > 0 ? (
                <Card
                    component={Grid}
                    container  
                    sx={sx}
                    {...other}
                >
                    <Grid item xs={12} md={12}>
                        <Box>
                            <Typography variant="h4" sx={{ fontSize: 50, fontFamily: "'Arimo', sans-serif", fontWeight: '700', color: 'white', textTransform: 'uppercase' }}>
                                {title}
                            </Typography>
    
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setModalOpen(true)}
                                sx={{
                                    borderRadius: 30, // Rounded border
                                    padding: '10px 20px', // Adjust padding as needed
                                    backgroundColor: 'transparent', // Transparent background
                                    border: '2px solid #1976d2', // Blue outline
                                    color: '#1976d2', // Blue text color
                                    fontFamily: "Poppins",
                                    fontWeight: '600', // Bold text
                                    textTransform: 'uppercase', // Uppercase text
                                    '&:hover': {
                                        backgroundColor: '#1976d2', // Blue background on hover
                                        color: '#fff', // White text on hover
                                    },
                                }}
                            >
                                <Box sx={{  borderRadius: '50%', width: 30, height: 30, backgroundColor: '#1976d2', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 2 }}>
                                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold' , fontFamily: "Poppins"}}>{totalCount}</Typography>
                                </Box>
                                Pending Requests
                            </Button>
                        </Box>
                    </Grid>
                </Card>
            ) : null}

            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins' }}
            >
                <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, borderRadius: 8, p: 4, maxWidth: 400, fontFamily: 'Poppins' }}>
                    <Typography variant="h6" id="modal-title" component="h2" sx={{ fontFamily: "Poppins", fontWeight: '700' }}> 
                        PENDING <span style={{ color: '#8CACFF' }}> REQUESTS</span>  
                    </Typography>

                    <Typography variant="subtitle4" id="modal-title" component="subtitle" sx={{ fontFamily: 'Poppins' }}> 
                        Requests for the approval of new station
                    </Typography>
                    <List>
                        {documents.map(request => (
                            <ListItem key={request._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , marginTop: '2rem'}}>
                                <ListItemAvatar>
                                    <Avatar alt="Station Image" src={request.stationImage && request.stationImage.url} sx={{ width: 70, height: 70, marginRight: '8px'}} />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={request.stationName} 
                                    secondary={request.siteLocation + '  ' + '| ' + request.address} 
                                    sx={{ fontFamily: 'Poppins', '& .MuiTypography-root': { fontFamily: 'Poppins' } }}
                                />

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Tooltip title="Approve" style={{ fontFamily: 'Poppins', color: '#a4c2aa', backgroundColor: '#e8f4ea' }}>
                                        <IconButton onClick={() => handleAction('approve', request)}>
                                            <CheckIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Deny" style={{ fontFamily: 'Poppins', color: '#C16262', backgroundColor: '#FFE4E4' }}>
                                        <IconButton onClick={() => handleAction('deny', request)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>

            <Dialog
                    open={confirmationOpen}
                    onClose={handleConfirmationClose}
                    aria-labelledby="confirmation-dialog-title"
                    aria-describedby="confirmation-dialog-description"
                    PaperProps={{
                        style: {
                            borderRadius: 20 // Adjust the border radius as needed
                        }
                    }}
                >
                    <DialogTitle style={{fontFamily: 'Poppins', fontWeight: '700'}}  id="confirmation-dialog-title">Decline Request?</DialogTitle>
                    <DialogContent>
                        <DialogContentText  style={{fontFamily: 'Poppins', fontWeight: '500'}} id="confirmation-dialog-description">
                            Are you sure you want to decline {selectedRequest && selectedRequest.stationName}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{justifyContent: 'space-between'}}>
                        <Button
                            onClick={handleConfirmationClose}
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
                            onClick={handleConfirmationConfirm}
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


        </>
    );
}

PendingRequestView.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};
