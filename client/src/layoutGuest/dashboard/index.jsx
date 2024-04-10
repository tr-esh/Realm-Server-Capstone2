import { useState } from "react";
import PropTypes from 'prop-types';

import {Box} from '@mui/material';

import Main from "../../layouts/dashboard/main";
import Header from "./header"; 

export default function DashboardGuestLayout({ children }) {
    const [openNav, setOpenNav] = useState(false);

    return(
        <>
         <Header onOpenNav={() => setOpenNav(true)}/>

         <Box>
                <Main>{children}</Main>
         </Box>
        
        </>
    );
}

DashboardGuestLayout.propTypes = {
    children: PropTypes.node,
};