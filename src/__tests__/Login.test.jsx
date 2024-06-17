import { login, can } from '../Context/LoginContext';
import { jwtDecode } from 'jwt-decode';

jest.mock('jwt-decode');

const testUsers = {
  Administrator: {
    name: 'Administrator',
    role: 'admin',
    capabilities: ['create', 'read', 'update', 'delete'],
    iat: 1516239022,
  },
  Editor: {
    name: 'Editor',
    role: 'editor',
    capabilities: ['read', 'update'],
    iat: 1516239022,
  },
  Writer: {
    name: 'Writer',
    role: 'writer',
    capabilities: ['create'],
    iat: 1516239022,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIl0sImlhdCI6MTUxNjIzOTAyMn0.3JQVVAZQJsWGi0GrnVJvqTsC4USjE0MUrORr8VCYh5U"
  },
  User: {
    name: 'User',
    role: 'user',
    capabilities: ['read'],
    iat: 1516239022,
  },
};

describe('Auth Utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login should return a token for valid credentials', () => {
    const username = 'Writer';
    const password = 'writer';
    const token = login(username, password);
    expect(token).toBe(testUsers.Writer.token);
  });

  test('login should throw an error for invalid credentials', () => {
    const username = 'Writer';
    const password = 'wrongpassword';
    expect(() => login(username, password)).toThrow('Invalid credentials');
  });

  test('can should return true if the user has the capability', () => {
    const user = testUsers.Administrator;
    const capability = 'create';
    expect(can(user, capability)).toBe(true);
  });

  test('can should return false if the user does not have the capability', () => {
    const user = testUsers.Writer;
    const capability = 'delete';
    expect(can(user, capability)).toBe(false);
  });
});
