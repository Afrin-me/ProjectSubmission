

document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://pewter-trusting-agreement.glitch.me/categories";

  // Function to fetch products from the JSON Server and display them
  async function loadProducts() {
    try {
      const response = await fetch(apiUrl);
      const categories = await response.json();
      const productsContainer = document.getElementById("products-container");

      // Loop through each category and display products
      categories.forEach((category) => {
        // Create a category title
        const categoryTitle = document.createElement("h2");
        categoryTitle.id = category.name.toLowerCase().replace(" ", "-");
        categoryTitle.textContent = category.name;

        productsContainer.appendChild(categoryTitle);

        // Loop through each product in the category
        category.products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          // Create product card content
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            
            <p class="price">₹${product.price}</p>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            <button class="add-to-wishlist" data-product-id="${product.id}">Add to Wishlist</button>
          `;

          // Append the product card to the container
          productsContainer.appendChild(productCard);
        });
      });

      // Attach event listeners after products are loaded
      setupEventListeners();
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  // Function to set up event listeners for Add to Cart and Add to Wishlist buttons
  function setupEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", async function () {
        const productId = this.getAttribute("data-product-id");
        await toggleCart(productId);
      });
    });

    document.querySelectorAll(".add-to-wishlist").forEach((button) => {
      button.addEventListener("click", async function () {
        const productId = this.getAttribute("data-product-id");
        await toggleWishlist(productId);
      });
    });
  }

  // Function to fetch product by ID
  async function getProductById(productId) {
    try {
      const response = await fetch(apiUrl);
      const categories = await response.json();
      for (const category of categories) {
        const product = category.products.find((p) => p.id == productId);
        if (product) return product;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    return null;
  }

  // Function to toggle product in cart
  async function toggleCart(productId) {
    const product = await getProductById(productId);
    if (product) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = cart.findIndex((p) => p.id == productId);
      if (index === -1) {
        cart.push(product);
        alert(`${product.name} added to cart!`);
      } else {
        cart.splice(index, 1);
        alert(`${product.name} removed from cart!`);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  // Function to toggle product in wishlist
  async function toggleWishlist(productId) {
    const product = await getProductById(productId);
    if (product) {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const index = wishlist.findIndex((p) => p.id == productId);
      if (index === -1) {
        wishlist.push(product);
        alert(`${product.name} added to wishlist!`);
      } else {
        wishlist.splice(index, 1);
        alert(`${product.name} removed from wishlist!`);
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }

  // Load products when the page is ready
  loadProducts();
});
