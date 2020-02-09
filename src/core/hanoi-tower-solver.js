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
    A: Array(n).fill(1).map((item, i, arr) => arr.length - i),
    B: [],
    C: [],
  };
}


/**
 * @param {string} from
 * @param {string} to
 * @param {Playground} playground
 * @return {Playground}
 */
export function moveDisk(from, to, playground) {
  return {
    ...playground,
    [from]: playground[from].slice(0, -1),
    [to]: playground[to].concat(playground[from].slice(-1)),
  };
}

/**
 * Calc minimum quantity of turns to move pyramid from torch A to torch C
 * @param {number} n
 * @return {number}
 */
export function getTurnsQty(n) {
  return 2 ** n - 1;
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
    return yield move(from, to, playground);
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

export function* solver(n) {
  let prevStep = 0;
  let currStep = 0;
  let nextStep = 0;
  const cache = [JSON.stringify(generatePlayground(n))];
  const lazyHt = ht({ height: n });
  const TURNS = getTurnsQty(n);

  while (true) {
    if (nextStep < 0) {
      nextStep = Math.max(nextStep, 0);
    }

    if (nextStep > TURNS) {
      nextStep = Math.min(nextStep, TURNS);
    }


    while (currStep !== nextStep) {
      prevStep = currStep;
      currStep += nextStep > currStep ? 1 : -1;


      if (!cache[currStep]) {
        const prev = JSON.parse(cache[prevStep]);
        cache[currStep] = JSON.stringify(lazyHt.next(prev).value);
      }
    }

    nextStep = yield cache[currStep];
  }
}
