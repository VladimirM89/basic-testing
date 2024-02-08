import { doStuffByInterval, doStuffByTimeout } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    const timeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 100);

    expect(timeoutSpy).toBeCalledWith(callback, 100);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    expect(callback).not.toHaveBeenCalled();

    doStuffByTimeout(callback, 50);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();

    const timeoutSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 100);

    expect(timeoutSpy).toBeCalledWith(callback, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    expect(callback).not.toHaveBeenCalled();

    doStuffByInterval(callback, 50);

    jest.advanceTimersByTime(49);
    expect(callback).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(5);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
