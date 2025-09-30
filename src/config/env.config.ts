export const ENV_CONFIG = {
  local: {
    baseURL: 'https://www.saucedemo.com/',
    credentials: {
      username: 'standard_user',
      password: 'secret_sauce',
      account: 'standard_user',
    },
  },
  stage: {
    baseURL: 'https://www.saucedemo.com/',
    credentials: {
      username: 'standard_user',
      password: 'secret_sauce',
      account: 'standard_user',
    },
  },
  production: {
    baseURL: 'https://www.saucedemo.com/',
    credentials: {
      username: 'standard_user',
      password: 'secret_sauce',
      account: 'standard_user',
    },
  },
};

export function getBaseURL() {
  const env = process.env.TEST_ENV || 'production';
  return ENV_CONFIG[env as keyof typeof ENV_CONFIG].baseURL;
}

export function getCredentials() {
  const env = process.env.TEST_ENV || 'production';
  return ENV_CONFIG[env as keyof typeof ENV_CONFIG].credentials;
}
