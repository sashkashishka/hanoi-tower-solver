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
  Heading,
} from 'rebass';
import {
  Select,
  Slider,
  Input,
} from '@rebass/forms';

import Playground from 'Components/playground';
import RenderCalc from 'Components/render-calc';

import {
  solver,
  getTurnsQty,
} from 'Core/index';

import { debounce } from 'Utils/index';
import theme from 'Constants/theme';


const HanoiTowerResolver = () => {
  const [n, setN] = useState(8);
  const [turn, setTurn] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [start, setStart] = useState(false);

  const solverGen = useCallback(solver(n), [n]);
  const debounceCb = useCallback(debounce(setSpeed, 100), []);

  const turnsQty = getTurnsQty(n);
  const playground = JSON.parse(solverGen.next(turn).value);

  useEffect(() => {
    let timer = 0;

    if (start) {
      timer = setTimeout(() => {
        setTurn(Math.min(turnsQty, turn + 1));

        if (turnsQty < turn + 1) {
          setStart(false);
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [start, speed, turn]);

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
          <Heading
            as="h1"
          >
            Tower of Hanoi solver
          </Heading>

          <Box>
            <Text>
              Best solution: <b>{turnsQty}</b> {`move${turnsQty > 1 ? 's' : ''}`}
            </Text>
          </Box>


          <Box
            flexShrink={0}
          >
            <Text
              mb={2}
            >
              Number of disks
            </Text>

            <Select
              value={n}
              onChange={(e) => {
                setN(Number(e.target.value));
                setTurn(0);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
            </Select>
          </Box>
        </Flex>

        <Playground
          playground={playground}
          height={n}
        />

        <br />
        <br />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={3}
        >
          <Button
            bg="secondary"
            mr={2}
            onClick={() => {
              setN(8);
              setTurn(0);
              setStart(false);
            }}
          >
            Reset
          </Button>

          <Flex>
            <Button
              flexShrink={0}
              onClick={() => setTurn(Math.max(0, turn - 1))}
            >
              Prev
            </Button>

            <Input
              mx={1}
              value={turn}
              type="number"
              min={0}
              max={turnsQty}
              onChange={(e) => setTurn(Number(e.target.value))}
            />

            <Button
              flexShrink={0}
              onClick={() => setTurn(Math.min(turn + 1, turnsQty))}
            >
              Next
            </Button>
          </Flex>

          <Box>
            Animation speed:
            <Slider
              min={50}
              max={2000}
              value={speed}
              onChange={(e) => debounceCb(e.target.value)}
            />
          </Box>

          <Box>
            <Button
              bg="secondary"
              mr={2}
              onClick={() => {
                setStart(false);
              }}
            >
              Stop
            </Button>

            <Button
              disabled={start}
              onClick={() => setStart(true)}
            >
              Solve
            </Button>
          </Box>
        </Flex>
      </Fragment>
    </ThemeProvider>
  );
};

export default hot(HanoiTowerResolver);
