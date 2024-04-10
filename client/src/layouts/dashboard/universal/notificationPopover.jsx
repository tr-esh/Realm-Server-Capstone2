import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, List, Badge, Button, Avatar, Divider, Tooltip, Popover, Typography, IconButton, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';
import { fToNow } from '../../../utils/formatTme';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { useNavigate } from 'react-router-dom';

const NotificationsPopover = () => {
    const [notifications, setNotifications] = useState([]);
    const [totalUnRead, setTotalUnRead] = useState(0);

    const [open, setOpen] = useState(null);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const response = await fetch('/api/realm/getRequest');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { allDocuments } = await response.json();
                
                const newNotifications = allDocuments.map(document => ({
                    id: document._id,
                    title: 'Pending Station',
                    description: `${document.tester} requests for the creation of new station. Click to review`,
                    avatar: document.stationImage && document.stationImage.url,
                    type: 'station_approval',
                    createdAt: new Date(document.createdAt),
                    isUnRead: !localStorage.getItem(`notification_${document._id}`),
                }));
                
                setNotifications([...newNotifications.reverse(), ...notifications]);

                const unreadCount = newNotifications.filter(notification => notification.isUnRead).length;
                setTotalUnRead(unreadCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchWQIData = async () => {
            try {
                const response = await fetch('/api/realm/getPoorWQI');
                if (!response.ok) {
                    throw new Error('Failed to fetch WQI data');
                }
                const { latestWQIValuesAbove51 } = await response.json();
        
                const newNotifications = latestWQIValuesAbove51.map(document => ({
                    id: document._id,
                    title: 'WQI Notification',
                    description: `Water quality index from ${document.stationId} is above fair range value detected. Click to view details.`,
                    type: 'wqi_notification',
                    createdAt: new Date(document.date),
                    isUnRead: !localStorage.getItem(`notification_${document._id}`),
                    stationId: document.stationId, // Assuming stationId is available in WQI data
                }));
        
                setNotifications([...newNotifications.reverse(), ...notifications]);
        
                const unreadCount = newNotifications.filter(notification => notification.isUnRead).length;
                setTotalUnRead(unreadCount);
            } catch (error) {
                console.error('Error fetching WQI data:', error);
            }
        };

        const requestIntervalId = setInterval(fetchRequestData, 60000);
        fetchRequestData();

        const wqiIntervalId = setInterval(fetchWQIData, 60000);
        fetchWQIData();

        return () => {
            clearInterval(requestIntervalId);
            clearInterval(wqiIntervalId);
        };
    }, [fetchTrigger]);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
        setTotalUnRead(0);
        localStorage.setItem('allNotificationsRead', 'true');
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleMarkAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => {
            localStorage.setItem(`notification_${notification.id}`, 'read');
            return {
                ...notification,
                isUnRead: false,
            };
        });
        setNotifications(updatedNotifications);

        localStorage.setItem('allNotificationsRead', 'true');

        setTotalUnRead(0);
    };

    const handleNotificationClick = (id, type, stationId) => {
        localStorage.setItem(`notification_${id}`, 'read');
    
        if (type === 'wqi_notification') {
            // Redirect to the station page associated with the clicked notification
            navigate(`/stations/${stationId}`);
        } else {
            // Redirect to another page for other types of notifications
            navigate('/stations');
        }
    };

    return (
        <>
             <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
                <Badge badgeContent={totalUnRead} color="error">
                    <NotificationsRoundedIcon sx={{ color: '#6990f5', fontSize: 30 }} />
                </Badge>
            </IconButton>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        ml: 0.75,
                        width: 360,
                    },
                }}
            >
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1"
                            sx={{ fontFamily: 'Poppins', fontWeight: '500', }}>
                            Notifications
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Poppins', fontWeight: '400' }}>
                            You have {totalUnRead} unread messages
                        </Typography>
                    </Box>

                    {totalUnRead > 0 && (
                        <Tooltip title=" Mark all as read">
                            <IconButton color="primary" onClick={handleMarkAllAsRead}>
                                <DoneAllRoundedIcon sx={{ fontSize: 25 }} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <List disablePadding>
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onClick={() => handleNotificationClick(notification.id)}
                        />
                    ))}
                </List>


                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ p: 1, fontFamily: 'Poppins', fontWeight: '400', }}>
                    <Button fullWidth disableRipple onClick={() => navigate('/stations')}>
                        View All
                    </Button>
                </Box>
            </Popover>
        </>
    );
};

NotificationsPopover.propTypes = {
    notifications: PropTypes.array,
    totalUnRead: PropTypes.number,
};

const NotificationItem = ({ notification, onClick }) => {
    const { avatar, title } = renderContent(notification);

    return (
        <ListItemButton
            onClick={onClick}
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                    bgcolor: 'action.selected',
                }),
            }}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="subtitle2" sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
                        {title}
                    </Typography>
                }
                secondary={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.disabled',
                            fontFamily: 'Poppins',
                        }}
                    >
                        {fToNow(notification.createdAt)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
};

NotificationItem.propTypes = {
    notification: PropTypes.shape({
        createdAt: PropTypes.instanceOf(Date),
        id: PropTypes.string,
        isUnRead: PropTypes.bool,
        title: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
        avatar: PropTypes.any,
    }),
    onClick: PropTypes.func,
};

const renderContent = (notification) => {
    const title = (
        <Typography variant="subtitle2" sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
            {notification.title}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Poppins'}}>
                &nbsp; {notification.description}
            </Typography>
        </Typography>
    );

    return {
        avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
        title,
    };
};



export default NotificationsPopover;
