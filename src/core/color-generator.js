/**
 * get number from 0 to 255
 * @return {number}
 */
const random = () => Math.round(Math.random() * 255);

/**
 * @return {string}
 */
const generateColor = () => `rgb(${random()}, ${random()}, ${random()})`;

export default generateColor;
