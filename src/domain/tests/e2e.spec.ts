import { fileContentSchema } from '../parser';
import { executeCommands } from '../commands';

describe('E2E Test', () => {
  it('should return the correct final positions for the mowers', () => {
    const fileContent = '55\\n1 2 N\\nLFLFLFLFF\\n3 3 E\\nFFRFFRFRRF';
    const parsedData = fileContentSchema.parse(fileContent);

    const finalMowers = parsedData.mowersAndCommands.map(({ mower, commands }) =>
      executeCommands(mower, commands, parsedData.lawn)
    );

    expect(finalMowers).toHaveLength(2);
    expect(finalMowers[0]).toEqual({ x: 1, y: 3, orientation: 'N' });
    expect(finalMowers[1]).toEqual({ x: 5, y: 1, orientation: 'E' });
  });
}); 