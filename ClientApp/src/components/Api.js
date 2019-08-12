export default class Api {
  constructor() {
    this.get.bind(this);
    this.post.bind(this);
    this.put.bind(this);
    this.delete.bind(this);
  }
  tokenName = "pep";
  _getToken=()=>{
    // Retrieves the user token from localStorage
    return localStorage.getItem(this.tokenName);
  }
  get(url, options) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._getToken()
      }
    };
    console.log(options);
    return fetch(url, options);
  }
  post(url, options) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._getToken()
      }
    };
    return fetch(url, options);
  }
  put(url, options) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._getToken()
      }
    };
    return fetch(url, options);
  }
  delete(url, options) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._getToken()
      }
    };
    return fetch(url, options);
  }
}
