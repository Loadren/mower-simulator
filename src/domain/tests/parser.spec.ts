import { fileContentSchema } from '../parser';

describe('fileContentSchema', () => {
  it('should parse a valid file content', () => {
    const content = '5 5\\n1 2 N\\nLFLFLFLFF';
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
    const content = '5\\n1 2 N\\nLFLFLFLFF';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });

  it('should fail with invalid mower position', () => {
    const content = '5 5\\n1 N\\nLFLFLFLFF';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });

  it('should fail with invalid commands', () => {
    const content = '5 5\\n1 2 N\\nLFLFLFLFX';
    const result = fileContentSchema.safeParse(content);
    expect(result.success).toBe(false);
  });
}); 