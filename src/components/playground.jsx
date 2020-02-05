import React from 'react';
import { Flex } from 'rebass';

import Disk from 'Components/disk';
import Torch from 'Components/torch';

export default ({ playground, height }) => (
  <Flex
    pt={3}
    justifyContent="space-around"
  >
    {
      Object.entries(playground).map(([torch, disks]) => (
        <Torch
          key={torch}
          n={height}
        >
          {
            disks.split('').map((size, i, arr) => (
              <Disk
                key={size}
                size={arr.length - size + 1}
              />
            ))
          }
        </Torch>
      ))
    }
  </Flex>
);
