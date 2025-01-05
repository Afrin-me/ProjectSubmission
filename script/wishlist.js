

document.addEventListener("DOMContentLoaded", function () {
  const wishlistContainer = document.getElementById("wishlist-container");

  // Retrieve wishlist from LocalStorage
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `
    <div style="text-align: center;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTBTru3zzMP2LxAjxxjVq0u1WPZfmG_ZZhxg&s" alt="Empty Cart" style="width: 400px; height: 200px;  margin-left:200px;     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
" />
<p>Your wishlist is empty</p>
    </div>
  `;
  } else {
    wishlist.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <div>
          <button class="remove-from-wishlist" data-product-id="${product.id}">Remove</button>
        </div>
      `;
      wishlistContainer.appendChild(productCard);

      // Add event listener to remove from wishlist
      productCard
        .querySelector(".remove-from-wishlist")
        .addEventListener("click", function () {
          removeFromWishlist(product.id);
        });
    });
  }
});

function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((product) => product.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Product removed from wishlist!");
  location.reload(); // Reload the page to update the wishlist
}
