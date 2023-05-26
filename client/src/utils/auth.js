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
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  }
}

export default new AuthService();
