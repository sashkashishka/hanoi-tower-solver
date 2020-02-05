import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { hot } from 'react-hot-loader/root';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import {
  Box,
  Text,
  Button,
  Flex,
} from 'rebass';
import { compose } from 'ramda';

import theme from 'Constants/theme';

import {
  solver,
  moveDisk,
  generatePlayground,
} from 'Core/index';

import Playground from 'Components/playground';

// let solution = new Map();
const getMove = (step) => console.log(step) || step;

const HanoiTowerResolver = () => {
  const [n, setN] = useState(8);

  const playground = generatePlayground(n);


  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Global
          styles={css`
            body {
              margin: 0;
              padding: 0;
            }
          `}
        />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          p={3}
          sx={{
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
          }}
        >
          <Box>
            <Text
              mb={2}
            >
              Number of disks
            </Text>

            <Box
              as="input"
              placeholder="Number of disks"
              value={n}
              onInput={(e) => setN(e.target.value)}
              onChange={(e) => setN(e.target.value)}
            />
          </Box>

          <Box>
            <Button
              bg="orange"
              mr={2}
              onClick={() => setN(8)}
            >
              Reset
            </Button>

            <Button
              onClick={() => solver({
                height: n,
                playground,
                move: compose(getMove, moveDisk),
              })}
            >
              Get solution
            </Button>
          </Box>
        </Flex>

        <Playground
          playground={playground}
          height={n}
        />

        <br />
        <br />

        <Text>
          Solution
        </Text>

      </Fragment>
    </ThemeProvider>
  );
};

export default hot(HanoiTowerResolver);
