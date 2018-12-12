/*
  Purpose: this module is responsible for validating the user login and register data before storing the session. It imports api.js for fetches.
*/
import API from "../API/API"
import SessionStorage from "./UserSession"

const validate = {
  newUser(entryObject) {
    return API.getData(`users?email=${entryObject.email}`)
      .then((user) => {
        if (user.length === 0) {

          return API.saveData("users", entryObject)

            .then((user) => {
              alert("Registration successful! Please log in")
              SessionStorage.logInUser(user.id)
            })
        } else {
          alert("Oops! This email is already in use. Please use a different email, or return to the login page if you already have an account with us.")
        }
      })
  },
  existingUser(entryObject) {
    return API.getData(`users?email=${entryObject.email}`)
      .then((user) => {
        if (user[0] && user[0].password === entryObject.password) {
          SessionStorage.logInUser(user[0].id)
        } else {
          alert("Incorrect email/password-- please try again. If you're new here, please Register. ")
        }
      })
  }
}

export default validate

