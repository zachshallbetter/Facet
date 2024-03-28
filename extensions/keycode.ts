import crypto from 'crypto';

type SessionVariables = {
  userAgent: string;
  cookiesEnabled: boolean;
  localStorage: string;
  sessionStorage: string;
  notifications: string;
  dom: string;
  webWorkers: boolean;
  geolocation: string;
};

export function createKeyCode(variables: SessionVariables): string {
  // Concatenate all the variables into a single string
  const data = Object.values(variables).join('');

  // Create a SHA-256 hash of the data
  const hash = crypto.createHash('sha256');
  hash.update(data);

  // Return the hash as a hexadecimal string
  return hash.digest('hex');
}

    