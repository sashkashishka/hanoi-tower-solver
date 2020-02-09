import React, { Fragment } from 'react';
import { Box, Flex } from 'rebass';

import Disk from 'Components/disk';
import Torch from 'Components/torch';

export default ({ playground, height }) => (
  <Fragment>
    <Flex
      alignItems="flex-end"
      minHeight="200px"
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
              disks.map(size => (
                <Disk
                  key={size}
                  size={size}
                />
              ))
            }
          </Torch>
        ))
      }
    </Flex>

    {/*<Box*/}
    {/*  height="15px"*/}
    {/*  width="85%"*/}
    {/*  m="auto"*/}
    {/*  bg="brown"*/}
    {/*/>*/}
  </Fragment>
);
