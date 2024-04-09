import decode from "jwt-decode";

class Auth {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  isAdmin() {
    if (!this.loggedIn()) {
      return false;
    }
    const profile = this.getProfile();
    //console.log("Profile:", profile.data.role.name);
    // Check if the 'role' exists and if 'name' is 'Admin'
    return profile.data.role && profile.data.role.name === "Admin";
  }

  login(idToken, callback) {
    // console.log("login called");
    localStorage.setItem("id_token", idToken);

    if (callback) callback();
    //window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Auth();
