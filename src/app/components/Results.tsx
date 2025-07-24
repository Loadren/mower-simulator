import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import type { Mower } from '../../domain/mower';

interface ResultsProps {
  mowers: Mower[] | null;
}

export const Results: React.FC<ResultsProps> = ({ mowers }) => {
  if (!mowers) {
    return null;
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', dropShadow: 'none' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: '1px solid rgb(66, 72, 77)' }}>Mower</TableCell>
            <TableCell align="right" sx={{ borderBottom: '1px solid rgb(66, 72, 77)' }}>Final X</TableCell>
            <TableCell align="right" sx={{ borderBottom: '1px solid rgb(66, 72, 77)' }}>Final Y</TableCell>
            <TableCell align="right" sx={{ borderBottom: '1px solid rgb(66, 72, 77)' }}>Orientation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mowers.map((mower, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" sx={{ borderBottom: '1px solid rgb(66, 72, 77)' }}>
                Mower {index + 1}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: '1px solid rgb(66, 72, 77)' }}>{mower.x}</TableCell>
              <TableCell align="right" sx={{ borderBottom: '1px solid rgb(66, 72, 77)' }}>{mower.y}</TableCell>
              <TableCell align="right" sx={{ borderBottom: '1px solid rgb(66, 72, 77)' }}>{mower.orientation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 