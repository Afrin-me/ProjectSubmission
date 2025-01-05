

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-container");

  // Retrieve cart from LocalStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

 if (cart.length === 0) {
   cartContainer.innerHTML = `
    <div style="text-align: center;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzibBVD9w_go7Ofo5BK44_ufJf_y7qQAoPKg&s" alt="Empty Cart" style="width: 450px; height: 200px;  margin-left:200px;     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
" />
    </div>
  `;
 } else {
   cart.forEach((product) => {
     const productCard = document.createElement("div");
     productCard.classList.add("product-card");
     productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <div class="quantity-container">
          <button class="decrement" data-product-id="${product.id}">-</button>
          <span class="quantity">${product.quantity || 1}</span>
          <button class="increment" data-product-id="${product.id}">+</button>
        </div>
        <div>
          <button class="remove-from-cart" data-product-id="${
            product.id
          }">Remove</button>
        </div>
      `;
     cartContainer.appendChild(productCard);

     // Add event listeners for increment, decrement, and remove
     productCard
       .querySelector(".increment")
       .addEventListener("click", function () {
         updateQuantity(product.id, 1);
       });

     productCard
       .querySelector(".decrement")
       .addEventListener("click", function () {
         updateQuantity(product.id, -1);
       });

     productCard
       .querySelector(".remove-from-cart")
       .addEventListener("click", function () {
         removeFromCart(product.id);
       });
   });
 }

  function updateQuantity(productId, change) {
    cart = cart.map((product) => {
      if (product.id === productId) {
        product.quantity = (product.quantity || 1) + change;
        if (product.quantity < 1) product.quantity = 1; // Minimum quantity is 1
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // Reload the page to reflect updates
  }

  function removeFromCart(productId) {
    cart = cart.filter((product) => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product removed from cart!");
    location.reload(); // Reload the page to update the cart
  }
});
