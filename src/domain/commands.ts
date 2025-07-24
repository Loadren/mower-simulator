import { z } from 'zod';
import type { Mower } from './mower';
import { moveForward, turnLeft, turnRight } from './mower';
import type { Lawn } from './lawn';

export const CommandSchema = z.enum(['L', 'R', 'F']);
export type Command = z.infer<typeof CommandSchema>;

export const CommandsSchema = z.array(CommandSchema);
export type Commands = z.infer<typeof CommandsSchema>;

export const executeCommands = (
  mower: Mower,
  commands: Commands,
  lawn: Lawn
): Mower => {
  return commands.reduce((currentMower, command) => {
    switch (command) {
      case 'L':
        return turnLeft(currentMower);
      case 'R':
        return turnRight(currentMower);
      case 'F':
        return moveForward(currentMower, lawn);
    }
  }, mower);
}; 