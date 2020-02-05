/**
 * @typedef {Object} Playground
 * @param {Array<number>} Playground.A
 * @param {Array<number>} Playground.B
 * @param {Array<number>} Playground.C
 */

/**
 * @param {number} n
 * @returns {Playground}
 */
export function generatePlayground(n) {
  return {
    A: Array(n).fill(1).map((item, i, arr) => arr.length - i).join(''),
    B: '',
    C: '',
  };
}


/**
 * @param {string} from
 * @param {string} to
 * @param {Playground} playground
 * @param {function} cb
 * @return {Playground}
 */
export function moveDisk(from, to, playground) {
  return {
    ...playground,
    [from]: playground[from].slice(0, -1),
    [to]: playground[to] + playground[from].slice(-1),
  };
}


/**
 * @param {object} options
 * @param {string} options.from
 * @param {string} options.to
 * @param {string} options.middle
 * @param {number} options.height
 * @param {Playground} options.playground
 * @return {Playground}
 */
function ht(options) {
  const {
    from = 'A',
    to = 'C',
    middle = 'B',
    height,
    playground = generatePlayground(height),
    move = moveDisk,
  } = options;

  if (height === undefined) {
    throw new Error('Provide tower height (number of disks)');
  }

  if (height === 1) {
    return move(from, to, playground);
  }

  const firstMovePlayground = ht({
    from,
    to: middle,
    middle: to,
    height: height - 1,
    playground,
    move,
  });

  const moveLargestDiskPlayground = move(from, to, firstMovePlayground);

  return ht({
    from: middle,
    to,
    middle: from,
    height: height - 1,
    playground: moveLargestDiskPlayground,
    move,
  });
}

export default ht;
