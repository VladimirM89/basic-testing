import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = ['a', 'b', 'c'];
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expectedResult = {
      next: {
        next: { next: { next: null, value: null }, value: 'c' },
        value: 'b',
      },
      value: 'a',
    };
    const result = generateLinkedList(elements);

    expect(result).toStrictEqual(expectedResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
