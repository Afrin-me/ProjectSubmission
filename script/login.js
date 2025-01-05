// Get elements
const drawer = document.getElementById("drawer");
const openDrawerBtn = document.getElementById("openDrawerBtn");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showPasswordCheckbox = document.getElementById("showPassword");
const loginText = openDrawerBtn.querySelector("h4"); // Get the "Hi, Login" text element

// Open drawer function
openDrawerBtn.addEventListener("click", () => {
  drawer.classList.add("active");
});

// Close drawer function
closeDrawerBtn.addEventListener("click", () => {
  drawer.classList.remove("active");
});

// Handle Show Password toggle
showPasswordCheckbox.addEventListener("change", () => {
  passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
});

// Handle form submission
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  const apiEndpoint = "http://localhost:3000/loginUsers";
  const requestData = { email, password };

  fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }
      return response.json();
    })
    .then((data) => {
      alert("Login successful!");
      console.log("Server response:", data);

      // Assume the server responds with user details including a `username` field
      const username = data.username || "User";

      // Update the text in the login section
      loginText.textContent = `Hi, ${username}`;

      // Optional: Close the drawer
      drawer.classList.remove("active");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    });
});
