import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 0, action: Action.Add, expected: 3 },
  { a: -3, b: 3, action: Action.Add, expected: 0 },
  { a: -3, b: -2, action: Action.Add, expected: -5 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: -3, b: -3, action: Action.Subtract, expected: 0 },
  { a: 0, b: 3, action: Action.Subtract, expected: -3 },
  { a: -3, b: -2, action: Action.Subtract, expected: -1 },
  { a: 3, b: 0, action: Action.Subtract, expected: 3 },

  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: 0, b: 3, action: Action.Multiply, expected: 0 },
  { a: 0, b: 0, action: Action.Multiply, expected: 0 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },
  { a: -1, b: 10, action: Action.Multiply, expected: -10 },
  { a: 10, b: -1, action: Action.Multiply, expected: -10 },
  { a: -5, b: -1, action: Action.Multiply, expected: 5 },
  { a: 0.5, b: 10, action: Action.Multiply, expected: 5 },
  { a: 0.5, b: 0.5, action: Action.Multiply, expected: 0.25 },

  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 0, b: 5, action: Action.Divide, expected: 0 },
  { a: -5, b: 5, action: Action.Divide, expected: -1 },
  { a: 5, b: -5, action: Action.Divide, expected: -1 },
  { a: -5, b: -5, action: Action.Divide, expected: 1 },
  { a: 5, b: 10, action: Action.Divide, expected: 0.5 },

  { a: 10, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 10, b: 1, action: Action.Exponentiate, expected: 10 },
  { a: -10, b: 1, action: Action.Exponentiate, expected: -10 },
  { a: -10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 10, b: -1, action: Action.Exponentiate, expected: 0.1 },
  { a: 100, b: 0.5, action: Action.Exponentiate, expected: 10 },

  { a: 10, b: 5, action: '&', expected: null },
  { a: 10, b: 5, action: '?', expected: null },
  { a: 10, b: 5, action: '\\', expected: null },
  { a: 10, b: 5, action: '|', expected: null },
  { a: 10, b: 5, action: '88', expected: null },

  { a: '10', b: 5, action: Action.Add, expected: null },
  { a: 10, b: '5', action: Action.Divide, expected: null },
  { a: '//', b: 5, action: Action.Exponentiate, expected: null },
  { a: '10', b: '5', action: Action.Multiply, expected: null },
  { a: null, b: 5, action: Action.Subtract, expected: null },
];

describe('simpleCalculator table tests', () => {
  test.each(testCases)(
    'Test action $action with $a and $b, ',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
