import React from 'react';
import { Box } from 'rebass';

export default ({ n, children, ...rest }) => (
  <Box
    height={`${n * 10}px`}
    width={`${n * 10}px`}
    sx={{
      position: 'relative',
    }}
    {...rest}
  >
    <Box
      height="100%"
      width="8px"
      bg="brown"
      sx={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 0,
      }}
    />
    {children}
  </Box>
);
