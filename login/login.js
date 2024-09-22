import { loginUser } from "../RESTAPI_module.mjs";

/**
 * Attempts to log in a user. If the API response is successful, stores user information in local storage and redirects to the profile page.
 * @param {Object} user - The user information from the login page
 */
async function login(user) {
  try {
    const response = await loginUser(user);
    const jsonReturn = await response.json();
    console.log(jsonReturn);

    if (response.ok) {
      const { name, email, credits, accessToken, avatar } = jsonReturn;
      Object.assign(localStorage, { username: name, email, credits, accessToken, avatar });
      console.log(document.location.href);
      document.location.href = "../index.html";
      console.log(document.location.href);
    } else {
      const message = document.getElementById("userFeedback");
      message.textContent = jsonReturn.errors[0].message;
      message.style.color = "red";
    }
  } catch (error) {
    console.error("Login error:", error);
  }
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    email: document.getElementById("InputEmail").value,
    password: document.getElementById("InputPassword").value,
  };

  login(user);
});
