import React from 'react';
import { Flex, Box } from 'rebass';

export default ({ n, children, ...rest }) => (
  <Flex
    alignItems="center"
    flexDirection="column-reverse"
    height={`${n * 10}px`}
    width={`${n * 10}px`}
    sx={{
      position: 'relative',
    }}
    {...rest}
  >
    <Box
      height="100%"
      width="2px"
      bg="brown"
      sx={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 0,
      }}
    />
    {children}

    <Box
      height="4px"
      width="110%"
      bg="brown"
      sx={{
        position: 'absolute',
        bottom: '0',
        transform: 'translateY(100%)',
        zIndex: 0,
      }}
    />
  </Flex>
);
