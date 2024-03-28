// src/lib/session.ts
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

export function startSession() {
  // Generate a unique session ID
  const sessionId = uuidv4();

  // Encrypt the session ID
  const encryptedSessionId = CryptoJS.AES.encrypt(sessionId, SECRET_KEY).toString();

  // Store the encrypted session ID in local storage
  localStorage.setItem('sessionId', encryptedSessionId);

  return sessionId;
}

export function getSessionId() {
  // Retrieve the encrypted session ID from local storage
  const encryptedSessionId = localStorage.getItem('sessionId');

  if (!encryptedSessionId) {
    return null;
  }

  // Decrypt the session ID
  const bytes = CryptoJS.AES.decrypt(encryptedSessionId, SECRET_KEY);
  const sessionId = bytes.toString(CryptoJS.enc.Utf8);

  return sessionId;
}

export function endSession() {
  // Remove the session ID from local storage
  localStorage.removeItem('sessionId');
}

export function storeSessionData(sessionId: string, data: any) {
  // Convert the data to a JSON string
  const dataString = JSON.stringify(data);

  // Encrypt the data string
  const encryptedData = CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();

  // Store the encrypted data in local storage
  localStorage.setItem(`sessionData-${sessionId}`, encryptedData);
}

export function getSessionData(sessionId: string) {
  // Retrieve the encrypted data from local storage
  const encryptedData = localStorage.getItem(`sessionData-${sessionId}`);

  if (!encryptedData) {
    return null;
  }

  // Decrypt the data
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const dataString = bytes.toString(CryptoJS.enc.Utf8);

  // Convert the data string back to an object
  const data = JSON.parse(dataString);

  return data;
}

export function clearSessionData(sessionId: string) {
  // Remove the data from local storage
  localStorage.removeItem(`sessionData-${sessionId}`);
}

// Usage:

// import { startSession, endSession, storeSessionData, getSessionData } from './session';

// // Start a new session when the user visits the site
// const sessionId = startSession();

// // Store some data in the session
// storeSessionData(sessionId, { pageViews: 1 });

// // Retrieve the data later
// const data = getSessionData(sessionId);
// console.log(data); // { pageViews: 1 }

// // End the session when the user leaves the site
// endSession();