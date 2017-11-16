const emojis = require('./emojis');

let regxArr = [];
const noExtra = s => s.replace(/\ufe0f|\u200d/gm, '');
const toSurrogatePairs = (r) => {
  let t;
  let n;
  /* eslint-disable no-plusplus */
  for (t = '', n = 0; n < r.length; n++) {
    t += `\\u${`000${r[n].charCodeAt(0).toString(16)}`.substr(-4)}`;
  }
  return t;
};

const toCodePoint = (t) => {
  let n;
  let r;
  let o;
  let h;
  // TODO: make this part human readable
  /* eslint-disable */
  for (n = [], r = 0, o = 0, h = 0; h < t.length;) {
    (r = t.charCodeAt(h++)),
    o
      ? (n.push((65536 + ((o - 55296) << 10) + (r - 56320)).toString(16)), (o = 0))
      : r >= 55296 && r <= 56319 ? (o = r) : n.push(r.toString(16));
  }
  /* eslint-enable */
  return n.join('-');
};

regxArr = emojis.map(el => toSurrogatePairs(el));
const re = new RegExp(`(${regxArr.join('|')})`, 'g');
regxArr = null;

class Parser {
  constructor(path) {
    if (!path) {
      throw new Error('You should pass images path as the parameter to the constructor');
    }
    this.path = path;
  }

  parse(string) {
    if (!string) {
      return string;
    }
    return string.replace(
      re,
      (a, b) =>
        `<img draggable="false" class="emoji" src="${this.path + toCodePoint(noExtra(b))}.png">`);
  }
}

module.exports = Parser;
module.exports.default = Parser;
