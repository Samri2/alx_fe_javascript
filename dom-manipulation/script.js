// Array of quotes with categories
const quotes = [
  { text: "C is fun", category: "Programming" },
  { text: "Python is cool", category: "Programming" },
  { text: "JavaScript is amazing", category: "Programming" },
  { text: "Stay positive!", category: "Motivation" },
  { text: "Never give up!", category: "Motivation" }
];

// Get DOM element to display quotes
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");

// Populate category dropdown dynamically
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes based on selected category and display a random one
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all" 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  quoteDisplay.textContent = randomQuote.text;
}

// On page load, populate categories, restore last selected category, and show a quote
window.onload = () => {
  populateCategories();
  const savedCategory = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = savedCategory;
  filterQuotes();
};

// Attach event listener to filter dropdown
categoryFilter.addEventListener("change", filterQuotes);
