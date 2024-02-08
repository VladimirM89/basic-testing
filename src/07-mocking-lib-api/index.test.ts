// Uncomment the code below and write your tests
import axios from 'axios';
// import { throttle } from 'lodash';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((func) => func),
}));

describe('throttledGetDataFromApi', () => {
  const url = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/user';

  const response = {
    data: {
      id: 1,
      name: 'test',
    },
  };

  beforeEach(() => {
    axios.create = jest.fn().mockReturnThis();
    axios.get = jest.fn().mockResolvedValue(response);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenLastCalledWith({
      baseURL: url,
    });
  });

  test('should perform request to correct provided url', async () => {
    expect(axios.get).not.toHaveBeenCalled();

    await throttledGetDataFromApi(relativePath);

    expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const resultData = await throttledGetDataFromApi(relativePath);

    expect(resultData).toEqual(response.data);
  });
});
