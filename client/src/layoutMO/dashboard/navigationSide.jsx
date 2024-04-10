import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

const sideConfig = [
    {
        title: 'dashboard',
        path: '/dashboard',
        icon: <DashboardRoundedIcon />,
    },
    {
        title: 'log entries',
        path: '/logentries',
        icon: <FolderRoundedIcon />
    }
];

export default sideConfig;
