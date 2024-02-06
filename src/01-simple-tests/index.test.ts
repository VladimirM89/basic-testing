// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const resultWithPositiveNumber = simpleCalculator({
      a: 5,
      b: 10,
      action: Action.Add,
    });
    expect(resultWithPositiveNumber).toBe(15);

    const resultWithNegativeNumber = simpleCalculator({
      a: -5,
      b: 10,
      action: Action.Add,
    });
    expect(resultWithNegativeNumber).toBe(5);
  });

  test('should subtract two numbers', () => {
    const resultNegative = simpleCalculator({
      a: 5,
      b: 10,
      action: Action.Subtract,
    });
    expect(resultNegative).toBe(-5);

    const resultPositive = simpleCalculator({
      a: 10,
      b: 5,
      action: Action.Subtract,
    });
    expect(resultPositive).toBe(5);

    const resultZero = simpleCalculator({
      a: 5,
      b: 5,
      action: Action.Subtract,
    });
    expect(resultZero).toBe(0);
  });

  test('should multiply two numbers', () => {
    const resultWithNegativeNumbers = simpleCalculator({
      a: -5,
      b: 10,
      action: Action.Multiply,
    });
    expect(resultWithNegativeNumbers).toBe(-50);

    const resultWithPositiveNumbers = simpleCalculator({
      a: 10,
      b: 5,
      action: Action.Multiply,
    });
    expect(resultWithPositiveNumbers).toBe(50);

    const resultWithZero = simpleCalculator({
      a: 55,
      b: 0,
      action: Action.Multiply,
    });
    expect(resultWithZero).toBe(0);
  });

  test('should divide two numbers', () => {
    const resultWithNegativeNumbers = simpleCalculator({
      a: -5,
      b: 10,
      action: Action.Divide,
    });
    expect(resultWithNegativeNumbers).toBe(-0.5);

    const resultWithPositiveNumbers = simpleCalculator({
      a: 10,
      b: 5,
      action: Action.Divide,
    });
    expect(resultWithPositiveNumbers).toBe(2);

    const resultWithZero = simpleCalculator({
      a: 0,
      b: 10,
      action: Action.Divide,
    });
    expect(resultWithZero).toBe(0);
  });

  test('should exponentiate two numbers', () => {
    const resultWithNegativeNumbers = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(resultWithNegativeNumbers).toBe(8);

    const resultWithPositiveNumbers = simpleCalculator({
      a: -5,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(resultWithPositiveNumbers).toBe(25);

    const resultWithZero = simpleCalculator({
      a: 100,
      b: 0.5,
      action: Action.Exponentiate,
    });
    expect(resultWithZero).toBe(10);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: '7',
    });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'string',
      b: 3,
      action: Action.Add,
    });
    expect(result).toBe(null);
  });
});
