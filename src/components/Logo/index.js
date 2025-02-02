import React from 'react';
import { Box } from '@mui/material';
import OdaaLogo from '../../assets/images/Odaa Transportation - Logo-01.svg';

// Logo component with size variants
const Logo = ({ variant = 'default', sx }) => {
  const logoSizes = {
    icon: { width: 32, height: 32 },
    small: { width: 100, height: 60 },
    default: { width: 150, height: 90 },
    large: { width: 200, height: 120 }
  };

  return (
    <Box
      component="img"
      src={OdaaLogo}
      alt="Company Logo"
      sx={{
        ...logoSizes[variant],
        objectFit: 'contain',
        ...sx
      }}
    />
  );
};

export default Logo; 