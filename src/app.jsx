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
  diskProps,
} from 'Core/index';

import Torch from 'Components/torch';
import Disk from 'Components/disk';

let solution = [];

const HanoiTowerResolver = () => {
  const [n, setN] = useState(8);
  const [playground, updatePlayground] = useState(generatePlayground(n, diskProps));
  const [isSolving, setSolving] = useState(false);

  const getMove = useCallback((sol) => {
    solution.push(sol);
    return sol;
  }, [solution]);

  useEffect(() => {
    updatePlayground(generatePlayground(n, diskProps));
    solution = [];
  }, [n]);

  useEffect(() => {
    if (isSolving) {
      solver({
        height: n,
        playground,
        move: compose(getMove, moveDisk),
      });

      setSolving(false);
    }
  }, [isSolving]);

  console.log(solution)

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
              onClick={() => setSolving(true)}
            >
              Get solution
            </Button>
          </Box>
        </Flex>

        <Flex
          pt={3}
          justifyContent="space-around"
        >
          {
            Object.keys(playground).map((key) => {
              const disks = playground[key];

              return (
                <Torch
                  key={key}
                  n={n}
                >
                  {
                    disks.map((options) => (
                      <Disk
                        key={options.color}
                        {...options}
                      />
                    ))
                  }
                </Torch>
              );
            })
          }
        </Flex>

        <br />
        <br />

        <Text>
          Solution
        </Text>

        <Box>
          {
            solution.map((step, i) => (
              <Flex
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                pt={3}
                justifyContent="space-around"
              >
                {
                  Object.keys(step).map((key) => {
                    const disks = step[key];

                    return (
                      <Torch
                        key={key}
                        n={n}
                      >
                        {
                          disks.map((options) => (
                            <Disk
                              key={options.color}
                              {...options}
                            />
                          ))
                        }
                      </Torch>
                    );
                  })
                }
              </Flex>
            ))
          }
        </Box>
      </Fragment>
    </ThemeProvider>
  );
};

export default hot(HanoiTowerResolver);
