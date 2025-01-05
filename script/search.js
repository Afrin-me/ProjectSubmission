

// Function to search items
function searchItems() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const items = document.querySelectorAll("h4"); // Adjust this selector to your items' class

  items.forEach(item => {
    const itemName = item.querySelector("h4").textContent.toLowerCase(); // Assumes items have <h4> with names
    if (itemName.includes(searchInput)) {
      item.style.display = "block"; // Show item if it matches search
    } else {
      item.style.display = "none"; // Hide item if it doesn't match
    }
  });
}

// Attach the search functionality to the button
document.getElementById("searchButton").addEventListener("click", searchItems);

// Optionally: Enable search on pressing 'Enter'
document.getElementById("searchInput").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchItems();
  }
});
