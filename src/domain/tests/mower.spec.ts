import { turnLeft, turnRight, moveForward } from '../mower';
import type { Mower } from '../mower';
import type { Lawn } from '../lawn';

describe('Mower movements', () => {
  const lawn: Lawn = { width: 5, height: 5 };

  it('should turn left correctly', () => {
    const mower: Mower = { x: 0, y: 0, orientation: 'N' };
    const newMower = turnLeft(mower);
    expect(newMower.orientation).toBe('W');
  });

  it('should turn right correctly', () => {
    const mower: Mower = { x: 0, y: 0, orientation: 'N' };
    const newMower = turnRight(mower);
    expect(newMower.orientation).toBe('E');
  });

  it('should move forward correctly', () => {
    const mower: Mower = { x: 1, y: 1, orientation: 'N' };
    const newMower = moveForward(mower, lawn);
    expect(newMower.x).toBe(1);
    expect(newMower.y).toBe(2);
  });

  it('should not move outside the lawn', () => {
    const mower: Mower = { x: 5, y: 5, orientation: 'N' };
    const newMower = moveForward(mower, lawn);
    expect(newMower.x).toBe(5);
    expect(newMower.y).toBe(5);
  });
}); 