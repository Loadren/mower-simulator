import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { LawnGrid } from './LawnGrid';
import type { MowerState } from '../../domain/commands';
import type { Lawn } from '../../domain/lawn';
import type { ParsedFile } from '../../domain/parser';

interface MowerAnimationProps {
  mowerHistories: MowerState[][];
  lawn: Lawn;
  parsedData: ParsedFile | null;
}

export const MowerAnimation: React.FC<MowerAnimationProps> = ({
  mowerHistories,
  lawn,
  parsedData,
}) => {
  // Holds the current state of all mowers being displayed on the grid
  const [mowerStates, setMowerStates] = useState<MowerState[]>(() =>
    mowerHistories.map((history) => history[0])
  );

  // Tracks which mower is currently animating
  const [currentMowerIndex, setCurrentMowerIndex] = useState(0);

  // Tracks the current command for the active mower
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Flags to control the animation flow
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Only run the animation loop if it's active and not yet finished
    if (!isAnimating || isFinished) return;

    // Use setInterval for the animation timer
    const interval = setInterval(() => {
      const currentMowerHistory = mowerHistories[currentMowerIndex];
      const nextStepIndex = currentStepIndex + 1;

      // Check if there are more commands for the current mower
      if (nextStepIndex < currentMowerHistory.length) {

        // Update the state for only the active mower
        setMowerStates((prevStates) =>
          prevStates.map((state, index) =>
            index === currentMowerIndex
              ? currentMowerHistory[nextStepIndex]
              : state
          )
        );
        setCurrentStepIndex(nextStepIndex);
      } else {
        // If the current mower is done, try to move to the next one
        const nextMowerIndex = currentMowerIndex + 1;
        if (nextMowerIndex < mowerHistories.length) {
          setCurrentMowerIndex(nextMowerIndex);
          setCurrentStepIndex(0); // Reset step index for the new mower
        } else {
          // All mowers have finished their sequences
          setIsFinished(true);
          clearInterval(interval);
        }
      }
    }, 500);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [
    isAnimating,
    isFinished,
    currentMowerIndex,
    currentStepIndex,
    mowerHistories,
  ]);

  useEffect(() => {
    if (isFinished) {
      setIsAnimating(false);


    }
  }, [isFinished]);

  // Starts the animation
  const handleStart = () => setIsAnimating(true);

  // Resets the animation to its initial state
  const handleReset = () => {
    setMowerStates(mowerHistories.map((history) => history[0]));
    setCurrentMowerIndex(0);
    setCurrentStepIndex(0);
    setIsAnimating(false);
    setIsFinished(false);
  };

  // Get the current command character to display on the UI
  const command =
    isAnimating &&
    !isFinished &&
    parsedData?.mowersAndCommands[currentMowerIndex]?.commands[currentStepIndex];

  return (
    <Box textAlign="center">
      <Typography variant="h5" gutterBottom>
        Mower Simulation
      </Typography>
      <Box display="flex" justifyContent="center" paddingTop="2rem">
        <LawnGrid lawn={lawn} mowers={mowerStates} isFinished={isFinished} />
      </Box>

      <Box mt={2}>
        {!isAnimating && !isFinished && (
          <Button variant="contained" onClick={handleStart}>
            Start Animation
          </Button>
        )}
        {isAnimating && !isFinished && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress size={24} sx={{ mr: 1 }} />
            <Typography>
              Animating Mower {currentMowerIndex + 1}
            </Typography>
          </Box>
        )}
        {isFinished && (
          <Box>
            <Typography variant="h6" color="success.main">
              Simulation Complete!
            </Typography>
            <Button variant="outlined" onClick={handleReset} sx={{ mt: 1 }}>
              Reset
            </Button>
          </Box>
        )}
      </Box>

      <Box mt={1} height="2rem">
        {command && (
          <Typography variant="body1" fontFamily="monospace">
            Command: {command}
          </Typography>
        )}
      </Box>
    </Box>
  );
}; 