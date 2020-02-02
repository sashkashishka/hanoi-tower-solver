import { generateColor } from 'Core/index';

/**
 * this is a callback for map functino
 * @param {number} item
 * @param {number} i
 * @return {{color: string, size: number}}
 */
export default (item, i) => ({
  color: generateColor(),
  size: i + 1,
});
