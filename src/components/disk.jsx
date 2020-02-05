import React from 'react';
import { Box } from 'rebass';


export default ({ size, color }) => (
  <Box
    height="10px"
    width={`${10 * size}px`}
    margin="auto"
    bg="#f8f800"
    fontSize="10px"
    lineHeight="10px"
    textAlign="center"
    sx={{
      position: 'relative',
      zIndex: 1,
    }}
  >
    {size}
  </Box>
);
