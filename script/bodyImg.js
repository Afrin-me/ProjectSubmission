function scrollLeft() {
  const scrollRow = document.querySelector(".scrollable-row");
  if (scrollRow) {
    scrollRow.scrollBy({ left: -250, behavior: "smooth" });
  } else {
    console.error("Scrollable row not found!");
  }
}

function scrollRight() {
  const scrollRow = document.querySelector(".scrollable-row");
  if (scrollRow) {
    scrollRow.scrollBy({ left: 250, behavior: "smooth" });
  } else {
    console.error("Scrollable row not found!");
  }
}
