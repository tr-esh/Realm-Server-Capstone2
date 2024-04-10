import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SensorsRoundedIcon from '@mui/icons-material/SensorsRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

const sideConfig = [
    {
        title: 'dashboard',
        path: '/dashboard',
        icon: <DashboardRoundedIcon />,
    },
    {
        title: 'stations',
        path: '/stations',
        icon: <SensorsRoundedIcon />
    },
    {
        title: 'log entries',
        path: '/logentries',
        icon: <FolderRoundedIcon />
    }
];

export default sideConfig;
