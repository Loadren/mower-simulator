import { z } from 'zod';
import { LawnSchema } from './lawn';
import { MowerSchema } from './mower';
import { CommandSchema } from './commands';

export const fileContentSchema = z
  .string()
  .transform((content, ctx) => {
    let lines = content.trim().split('\r\n');

    // If the lines are still one line, it means either the file is empty or there is no \r
    if (lines.length === 1) {
      lines = lines[0].split('\n');
    }

    // If there is less than 3 lines, it means the file is invalid
    if (lines.length < 3) {
      ctx.addIssue({
        message: 'Invalid file format',
      });
      return z.NEVER;
    }

    const lawnLine = lines[0];
    const [width, height] = lawnLine.split('').map(Number);
    const lawn = LawnSchema.safeParse({ width, height });
    if (!lawn.success) {
      ctx.addIssue({
        message: 'Invalid lawn dimensions',
      });
      return z.NEVER;
    }

    const mowersAndCommands = [];
    for (let i = 1; i < lines.length; i += 2) {
      const mowerLine = lines[i];
      const commandsLine = lines[i + 1];
      const [xy, orientation] = mowerLine.split(" ");
      const [x, y] = xy.split("");
      const mower = MowerSchema.safeParse({
        x: Number(x),
        y: Number(y),
        orientation,
      });

      if (!mower.success) {
        ctx.addIssue({
          message: `Invalid mower data on line ${i + 1}`,
        });
        return z.NEVER;
      }

      const commands = z.array(CommandSchema).safeParse(commandsLine.split(''));
      if (!commands.success) {
        ctx.addIssue({
          message: `Invalid commands on line ${i + 2}`,
        });
        return z.NEVER;
      }
      mowersAndCommands.push({ mower: mower.data, commands: commands.data });
    }

    return {
      lawn: lawn.data,
      mowersAndCommands,
    };
  });

export type ParsedFile = {
  lawn: {
    width: number;
    height: number;
  };
  mowersAndCommands: {
    mower: {
      x: number;
      y: number;
      orientation: "N" | "E" | "W" | "S";
    };
    commands: ("L" | "R" | "F")[];
  }[];
}