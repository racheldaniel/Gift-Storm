/*
  Purpose: module holds functions for getting, setting and clearing session storage
*/

const userSession = {
  logInUser(id) {
    window.sessionStorage.setItem("id", id)
  },

  getUser() {
    return parseInt(window.sessionStorage.getItem("id"))
  },

  logOutUser() {
    window.sessionStorage.clear()
  }
}

export default userSession