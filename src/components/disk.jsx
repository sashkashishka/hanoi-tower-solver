import React from 'react';
import { Box } from 'rebass';


export default ({ size, color }) => (
  <Box
    display="inline-block"
    height="10px"
    width={`${10 * size}px`}
    bg={color}
  />
);
