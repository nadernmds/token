import decode from "jwt-decode";
import dec from "jsonwebtoken";
export default class AuthService {
  // Initializing important variables
  constructor() {
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }
  tokenName = "pep";
  login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch("api/token", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      this.setToken(res); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  getUsername(decoded) {
    return decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    ];
  }
  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem(this.tokenName, idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem(this.tokenName);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem(this.tokenName);
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
