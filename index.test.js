const Parser = require('.');

describe('Emoji parser', () => {
  it('should save path parameter', () => {
    const path = '/images/';
    const parser = new Parser(path);
    expect(parser.path).toBe(path);
  });

  it('should parse emoji', () => {
    const parser = new Parser('/images/');
    const result = parser.parse('Text 🙂 text');
    expect(result).toBe('Text <img draggable="false" class="emoji" src="/images/1f642.png"> text');
  });

  it('should not crash for null', () => {
    const parser = new Parser('/images/');
    const result = parser.parse(null);
    expect(result).toBe(null);
  });

  it('should not crash for undefined', () => {
    const parser = new Parser('/images/');
    const result = parser.parse(undefined);
    expect(result).toBe(undefined);
  });

  it('should not crash for empty string', () => {
    const parser = new Parser('/images/');
    const result = parser.parse('');
    expect(result).toBe('');
  });
});
