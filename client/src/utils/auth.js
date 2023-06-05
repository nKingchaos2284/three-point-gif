import decode from 'jwt-decode';

class AuthService {
  login(token) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getDecodedToken() {
    const token = this.getToken();
    return token ? decode(token) : null;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (!decoded.exp) {
      return false;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);
    return expirationDate < new Date();
  }

  getTokenExpiration() {
    const token = this.getToken();
    if (token) {
      const decoded = decode(token);
      return decoded.exp ? new Date(decoded.exp * 1000) : null;
    }
    return null;
  }
}

export default new AuthService();
