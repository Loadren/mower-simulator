import React from 'react';
import NavigationIcon from '@mui/icons-material/Navigation';
import { type Orientation } from '../../domain/mower';

interface MowerIconProps {
  orientation: Orientation;
}

const orientationToRotation: Record<Orientation, number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

export const MowerIcon: React.FC<MowerIconProps> = ({ orientation }) => {
  const rotation = orientationToRotation[orientation];
  return (
    <NavigationIcon
      sx={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease-in-out',
        fontSize: '2rem',
      }}
      color="primary"
    />
  );
}; 