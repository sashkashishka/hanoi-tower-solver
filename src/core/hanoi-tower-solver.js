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
 * Calc minimum quantity of turns to move pyramid from torch A to torch C
 * @param {number} n
 * @return {number}
 */
function turnsQty(n) {
  return 2 ** n + 1;
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
function* ht(options) {
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
    const result = yield move(from, to, playground);

    return result;
  }

  const firstIteration = yield* ht({
    from,
    to: middle,
    middle: to,
    height: height - 1,
    playground,
    move,
  });

  const secondIteration = yield* ht({
    from,
    to,
    middle,
    height: 1,
    playground: firstIteration,
    move,
  });

  return yield* ht({
    from: middle,
    to,
    middle: from,
    height: height - 1,
    playground: secondIteration,
    move,
  });
}

window.ht = ht;

function* solver(n) {
  let moveNum = 1;
  const cache = [generatePlayground(n)];
  const lazyHt = ht({ height: n });
  let prev = cache[0];


  while (true) {
    // TODO to jump on desired step => wrap into while (step !== moveNum) and cache intermediate results
    // TODO cache as JSON.stringify
    if (cache[moveNum]) {
      prev = cache[moveNum];
    } else {
      prev = lazyHt.next(prev).value;
      cache[moveNum] = prev;
    }

    moveNum = yield cache[moveNum];
  }
}

window.solver = solver;

export default ht;
