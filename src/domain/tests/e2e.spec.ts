import { fileContentSchema } from '../parser';
import { executeCommands } from '../commands';

describe('E2E Test', () => {
  it('should return the correct final positions for the mowers from the initial test case', () => {
    const fileContent = '55\n12 N\nLFLFLFLFF\n33 E\nFFRFFRFRRF';
    const parsedData = fileContentSchema.parse(fileContent);

    const mowerHistories = parsedData.mowersAndCommands.map(({ mower, commands }) =>
      executeCommands(mower, commands, parsedData.lawn)
    );

    const finalMowers = mowerHistories.map(
      (history) => history[history.length - 1]
    );

    expect(finalMowers).toHaveLength(2);
    expect(finalMowers[0]).toEqual({ x: 1, y: 3, orientation: 'N' });
    expect(finalMowers[1]).toEqual({ x: 5, y: 1, orientation: 'E' });
  });

  it('should return the correct final positions for the mowers from the new test case', () => {
    const fileContent = '55\n44 S\nLFRRFFLFRFF\n22 N\nFFRLLRFRLF';
    const parsedData = fileContentSchema.parse(fileContent);

    const mowerHistories = parsedData.mowersAndCommands.map(({ mower, commands }) =>
      executeCommands(mower, commands, parsedData.lawn)
    );

    const finalMowers = mowerHistories.map(
      (history) => history[history.length - 1]
    );

    expect(finalMowers).toHaveLength(2);
    expect(finalMowers[0]).toEqual({ x: 1, y: 3, orientation: 'W' });
    expect(finalMowers[1]).toEqual({ x: 2, y: 5, orientation: 'N' });
  });
}); 