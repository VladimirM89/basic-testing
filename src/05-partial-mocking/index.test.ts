import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => null),
    mockTwo: jest.fn(() => null),
    mockThree: jest.fn(() => null),
  };
});

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();

    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    unmockedFunction();
    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});
