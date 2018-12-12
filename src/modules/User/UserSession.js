/*
  Purpose: module holds functions for getting, setting and clearing session storage
*/

const userSession = {
  logInUser(id) {
    return window.sessionStorage.setItem("id", id)
  },

  getUser() {
    return parseInt(window.sessionStorage.getItem("id"))
  },

  logOutUser() {
    window.sessionStorage.clear().then(()=> window.location.reload())
  }
}

export default userSession
