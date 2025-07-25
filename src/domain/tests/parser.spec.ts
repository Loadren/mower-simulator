import { fileContentSchema } from '../parser';

describe('fileContentSchema', () => {
  it('should parse a valid file content', () => {
    const content = '66\n12 N\nLFLFLFLFF';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.lawn).toEqual({ width: 6, height: 6 });
      expect(result.data.mowersAndCommands).toHaveLength(1);
      expect(result.data.mowersAndCommands[0].mower).toEqual({
        x: 1,
        y: 2,
        orientation: 'N',
      });
      expect(result.data.mowersAndCommands[0].commands).toEqual([
        'L',
        'F',
        'L',
        'F',
        'L',
        'F',
        'L',
        'F',
        'F',
      ]);
    }
  });

  it('should parse a valid file content with multiple mowers', () => {
    const content = '55\n12 N\nLFLFLFLFF\n33 E\nFFRFFRFRRF';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.lawn).toEqual({ width: 5, height: 5 });
      expect(result.data.mowersAndCommands).toHaveLength(2);
      expect(result.data.mowersAndCommands[0].mower).toEqual({
        x: 1,
        y: 2,
        orientation: 'N',
      });
      expect(result.data.mowersAndCommands[0].commands).toEqual([
        'L',
        'F',
        'L',
        'F',
        'L',
        'F',
        'L',
        'F',
        'F',
      ]);
      expect(result.data.mowersAndCommands[1].mower).toEqual({
        x: 3,
        y: 3,
        orientation: 'E',
      });
      expect(result.data.mowersAndCommands[1].commands).toEqual([
        'F',
        'F',
        'R',
        'F',
        'F',
        'R',
        'F',
        'R',
        'R',
        'F',
      ]);
    }
  });

  it('should parse a valid file content with \\r\\n', () => {
    const content = '55\r\n12 N\r\nLFLFLFLFF\r\n';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.lawn).toEqual({ width: 5, height: 5 });
      expect(result.data.mowersAndCommands).toHaveLength(1);
      expect(result.data.mowersAndCommands[0].mower).toEqual({
        x: 1,
        y: 2,
        orientation: 'N',
      });
      expect(result.data.mowersAndCommands[0].commands).toEqual([
        'L',
        'F',
        'L',
        'F',
        'L',
        'F',
        'L',
        'F',
        'F',
      ]);
    }
  });
  
  it('should fail with invalid lawn dimensions', () => {
    const content = '5\n1 2 N\nLFLFLFLFF';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });

  it('should fail with invalid mower position', () => {
    const content = '55\n1 N\nLFLFLFLFF';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });

  it('should fail with invalid commands', () => {
    const content = '55\n1 2 N\nLFLFLFLFX';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });

  it('should fail if the file has fewer than 3 lines', () => {
    const content = '55\n12 N';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });

  it('should fail with non-numeric lawn dimensions', () => {
    const content = 'A5\n12 N\nLFRF';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });

  it('should fail with invalid mower orientation', () => {
    const content = '55\n12 X\nLFRF';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });

  it('should fail for an empty file', () => {
    const content = '';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });
}); 