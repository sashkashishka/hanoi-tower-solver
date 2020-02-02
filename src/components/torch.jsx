import React from 'react';
import { Flex } from 'rebass';

export default ({ n, ...rest }) => (
  <Flex
    flexDirection="column"
    justifyContent="flex-end"
    alignItems="center"
    height={`${(n + 1) * 10}px`}
    width={`${n * 10}px`}
    sx={{
      position: 'relative',
      background: 'linear-gradient(90deg, brown 10px, white 2px)',
      backgroundPosition: '100% 0',
      backgroundRepeat: 'repeat-y',
      backgroundSize: '57%',
    }}
    {...rest}
  />
);
