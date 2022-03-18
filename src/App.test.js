import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitFor, render, screen } from '@testing-library/react'
import App from './App';

const spy = jest.fn();
const server = setupServer(
  rest.get('/api/shoe-price/:id', (req, res, ctx) => {
    spy()
    return res(ctx.status(200), ctx.json({ shoePrice: Math.floor(Math.random() * 450) + 50}))
  }),
)

beforeEach(() => {
  spy.mockClear();
})

afterEach(() => {
  server.resetHandlers()
  jest.useRealTimers();
})

beforeAll(() => {
  server.listen()
})

afterAll(() => server.close())

test('refresh every 5 seconds', async () => {
  jest.useFakeTimers()
  render(<App />);
  await waitFor(() => expect(spy).toHaveBeenCalledTimes(6))
  jest.advanceTimersByTime(5000)
  await waitFor(() => expect(spy).toHaveBeenCalledTimes(12))
  jest.advanceTimersByTime(5000)
  await waitFor(() => expect(spy).toHaveBeenCalledTimes(18))
});

test('render headers', () => {
  render(<App />);
  const modelHeader = screen.getByText('Model');
  const priceHeader = screen.getByText('Price');
  const stateHeader = screen.getByText('State');
  expect(modelHeader).toBeInTheDocument();
  expect(priceHeader).toBeInTheDocument();
  expect(stateHeader).toBeInTheDocument();
});

test('render model, price, state', async () => {
  render(<App />);
  const models = await screen.findAllByTestId(/model-/)
  const prices = await screen.findAllByTestId(/price-/)
  const states = await screen.findAllByTestId(/state-/)
  
  expect(models.length).toBeGreaterThan(0);
  expect(prices.length).toBeGreaterThan(0);
  expect(states.length).toBeGreaterThan(0);
});
