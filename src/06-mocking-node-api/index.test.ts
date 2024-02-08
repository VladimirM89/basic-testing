import path from 'path';
import fs from 'fs';
import promises from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

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

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  const pathToFile = 'mock.js';

  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(spyJoin).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const spyExist = jest.spyOn(fs, 'existsSync');

    spyExist.mockReturnValueOnce(false);

    const files = await readFileAsynchronously(pathToFile);

    expect(files).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const inputContent = 'test case';
    const spyExist = jest.spyOn(fs, 'existsSync');
    spyExist.mockReturnValueOnce(true);

    const spyReadFile = jest.spyOn(promises, 'readFile');
    spyReadFile.mockResolvedValueOnce(inputContent);

    const returnedContent = await readFileAsynchronously(pathToFile);

    expect(returnedContent).toBe(inputContent);
  });
});
