function handleClick(action) {
  console.log(`${action} button clicked.`);
  alert(`${action} button clicked.`);
}
function handleClick(action) {
  if (action === "Login") {
    // Redirect to the login page
    window.location.href = "login.html";
  }
}


//pincode addition
const pincodeInput = document.getElementById("pincode");
pincodeInput.addEventListener("change", () => {
  const enteredPincode = pincodeInput.value;
  alert(`Pincode entered: ${enteredPincode}`);
});


document.addEventListener("scroll", () => {
    const searchBar = document.getElementById("searchBar");
    const scrollPosition = window.scrollY;

    // Adjust this threshold as needed
    if (scrollPosition > 100) {
        searchBar.classList.remove("hidden");
        searchBar.classList.add("visible");
    } else {
        searchBar.classList.remove("visible");
        searchBar.classList.add("hidden");
    }
});




