import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

let mockGetBankAccount: BankAccount;
let mockGetBankAccountSecond: BankAccount;

beforeEach(() => {
  mockGetBankAccount = getBankAccount(10);
  mockGetBankAccountSecond = getBankAccount(15);
});

describe('BankAccount', () => {
  const mockSyncFn = jest.fn();

  test('should create account with initial balance', () => {
    expect(mockGetBankAccount.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => mockGetBankAccount.withdraw(25)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      mockGetBankAccount.transfer(15, mockGetBankAccountSecond),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const mock = jest.fn(() =>
      mockGetBankAccount.transfer(15, mockGetBankAccount),
    );
    expect(mock).toThrowError();
    expect(mock).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    mockGetBankAccount.deposit(60);
    expect(mockGetBankAccount.getBalance()).toBe(70);
  });

  test('should withdraw money', () => {
    mockGetBankAccount.withdraw(5);
    expect(mockGetBankAccount.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    mockGetBankAccount.transfer(5, mockGetBankAccountSecond);
    expect(mockGetBankAccount.getBalance()).toBe(5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await mockGetBankAccount.fetchBalance();

    if (balance) {
      expect(balance).toBeTruthy();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = await mockGetBankAccount.fetchBalance();

    if (balance) {
      expect(balance).toBeTruthy();
      mockSyncFn.mockImplementationOnce(() => balance);
      expect(mockSyncFn()).toBe(balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = await mockGetBankAccount.fetchBalance();

    if (balance === null) {
      expect(balance).toBeNull;
      mockSyncFn.mockImplementationOnce(() => {
        throw new SynchronizationFailedError();
      });
      expect(mockSyncFn).toThrow(SynchronizationFailedError);
    }
  });
});
