import React from 'react';
import { Box } from '@mui/material';
import { MowerIcon } from './MowerIcon';
import type { MowerState } from '../../domain/commands';
import type { Lawn } from '../../domain/lawn';

interface LawnGridProps {
  lawn: Lawn;
  mowers: MowerState[];
  isFinished: boolean;
}

export const LawnGrid: React.FC<LawnGridProps> = ({ lawn, mowers, isFinished }) => {
  const gridTemplateColumns = `repeat(${lawn.width + 1}, 1fr)`;
  const gridTemplateRows = `repeat(${lawn.height + 1}, 1fr)`;

  return (
    <Box
      display="grid"
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateRows={gridTemplateRows}
      border="1px solid #444"
      bgcolor="#2c2f33"
      position="relative"
      width="100%"
      // Use aspect ratio to maintain a square grid that fits the container
      sx={{
        aspectRatio: `${lawn.width + 1} / ${lawn.height + 1}`,
        maxHeight: '70vh',
      }}
    >
      {/* Create grid cells for visualization */}
      {Array.from({ length: (lawn.width + 1) * (lawn.height + 1) }).map(
        (_, i) => (
          <Box key={i} border="1px solid #444" />
        )
      )}
      {/* Position mowers on the grid */}
      {mowers.map((mower, index) => (
        <Box
          key={index}
          gridColumn={`${mower.x + 1} / span 1`}
          gridRow={`${lawn.height - mower.y + 1} / span 1`}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          sx={{
            transition: 'all 0.5s ease-in-out',
          }}
        >
          <MowerIcon orientation={mower.orientation} />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: 'translate(-50%, -50%)' }}
            bgcolor="rgba(0, 0, 0, 0.75)"
            color="white"
            fontSize="0.7rem"
            fontWeight="bold"
            padding="0.2rem 0.5rem"
            borderRadius="8px"
            whiteSpace="nowrap"
            visibility={isFinished ? 'visible' : 'hidden'}
          >
            {`(${mower.x}, ${mower.y}, ${mower.orientation})`}
          </Box>
          <Box
            component="span"
            position="absolute"
            top="-0rem"
            color="white"
            fontSize="0.8rem"
            fontWeight="bold"
          >
            {`M${index + 1}`}
          </Box>
        </Box>
      ))}
    </Box>
  );
}; 