import { useState } from "react";
import PropTypes from 'prop-types';

import {Box} from '@mui/material';

import Sidebar from "./sidebar";
import Main from "./main";
import Header from "./header";

export default function DashboardLayout({ children }) {
    const [openNav, setOpenNav] = useState(false);

    return(
        <>
         <Header onOpenNav={() => setOpenNav(true)}/>

         <Box
            sx={{
                minHeight: 1,
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
            }}
            >
                <Sidebar openNav={openNav} onCloseNav={() => setOpenNav(false)} />

                <Main>{children}</Main>
         </Box>
        
        </>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node,
};