import { z } from 'zod';
import type { Lawn } from './lawn';
import { isPositionInsideLawn } from './lawn';

export const OrientationSchema = z.enum(['N', 'E', 'W', 'S']);
export type Orientation = z.infer<typeof OrientationSchema>;

export const MowerSchema = z.object({
  x: z.number().int(),
  y: z.number().int(),
  orientation: OrientationSchema,
});
export type Mower = z.infer<typeof MowerSchema>;

const orientationMapping: Record<Orientation, number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

const degreeToOrientation = (degree: number): Orientation => {
  switch (degree) {
    case 0:
      return 'N';
    case 90:
      return 'E';
    case 180:
      return 'S';
    case 270:
      return 'W';
    default:
      throw new Error(`Invalid degree: ${degree}`);
  }
};

export const turnLeft = (mower: Mower): Mower => {
  const currentDegree = orientationMapping[mower.orientation];
  const newDegree = (currentDegree - 90 + 360) % 360;
  return { ...mower, orientation: degreeToOrientation(newDegree) };
};

export const turnRight = (mower: Mower): Mower => {
  const currentDegree = orientationMapping[mower.orientation];
  const newDegree = (currentDegree + 90) % 360;
  return { ...mower, orientation: degreeToOrientation(newDegree) };
};

export const moveForward = (mower: Mower, lawn: Lawn): Mower => {
  let { x, y } = mower;
  switch (mower.orientation) {
    case 'N':
      y += 1;
      break;
    case 'E':
      x += 1;
      break;
    case 'S':
      y -= 1;
      break;
    case 'W':
      x -= 1;
      break;
  }

  if (isPositionInsideLawn(lawn, { x, y })) {
    return { ...mower, x, y };
  }

  return mower;
}; 