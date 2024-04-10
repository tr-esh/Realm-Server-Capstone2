import React from 'react';
import UserSelect from "../sections/view/UserSelect";
import { useResponsive } from '../hooks/useResponsive';

export default function UserPage() {
  const isSmallScreen = useResponsive('down', 'sm'); // Adjust the breakpoint as needed

  return (
    <div className={`userpage ${isSmallScreen ? 'small-screen' : ''}`}>
      <UserSelect />
    </div>
  );
}
