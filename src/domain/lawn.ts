import { z } from 'zod';

export const LawnSchema = z.object({
  width: z.number().int().min(0),
  height: z.number().int().min(0),
});

export type Lawn = z.infer<typeof LawnSchema>;

export const isPositionInsideLawn = (
  lawn: Lawn,
  position: { x: number; y: number }
) => {
  // We do "<=" here because lawn.width and lawn.height represent the coordinates of the top right corner
  // This is NOT a mistake
  return (
    position.x >= 0 &&
    position.x <= lawn.width &&
    position.y >= 0 &&
    position.y <= lawn.height
  );
}; 