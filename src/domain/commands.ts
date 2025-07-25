import { z } from 'zod';
import type { Mower } from './mower';
import { moveForward, turnLeft, turnRight } from './mower';
import type { Lawn } from './lawn';

export const CommandSchema = z.enum(['L', 'R', 'F']);
export type Command = z.infer<typeof CommandSchema>;

export const CommandsSchema = z.array(CommandSchema);
export type Commands = z.infer<typeof CommandsSchema>;

export type MowerState = Mower;

// Map commands to their corresponding functions for clarity
const commandActions: Record<Command, (mower: Mower, lawn: Lawn) => Mower> = {
  L: (mower) => turnLeft(mower),
  R: (mower) => turnRight(mower),
  F: (mower, lawn) => moveForward(mower, lawn),
};

export const executeCommands = (
  initialMower: Mower,
  commands: Commands,
  lawn: Lawn
): MowerState[] => {
  // We use "reduce" to build the history array in a functional way
  // The accumulator "history" starts as an array with just the initial state, and on each step, 
  // we compute the next state and append it to the history
  return commands.reduce(
    (history, command) => {
      const currentMower = history[history.length - 1];
      const nextMower = commandActions[command](currentMower, lawn);
      return [...history, nextMower];
    },
    [initialMower]
  );
}; 