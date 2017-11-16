const Parser = require('.');

describe('Emoji parser', () => {
  it('should save path parameter', () => {
    const path = '/images/';
    const parser = new Parser(path);
    expect(parser.path).toBe(path);
  });

  it('should parse emoji', () => {
    const parser = new Parser('/images/');
    const result = parser.parse('Text 🙂');
    expect(result).toBe('Text <img draggable="false" class="emoji" src="/images/1f642.png">');
  });
});
