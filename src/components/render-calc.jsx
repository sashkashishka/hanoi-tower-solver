import React from 'react';
import { Box } from 'rebass';

let count = 0;

export default () => (
  <Box>
    {count++}
  </Box>
);
