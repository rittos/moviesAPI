import AuthenticationService from '../AuthenticationService';
  // A simple/nieve Authentication service. WILL BE UPDATED TO USE ENCRYPTION LATER
  export default class extends AuthenticationService {
    async compare(password, encryptedPassword) {
      try {
        // Compare password
        const result = password == encryptedPassword;
        return Promise.resolve(result);
      } catch (error) {
        return Promise.resolve(false);
      }
    }
  }