let quotes = [
  { text: "C is fun", category: "Programming" },
  { text: "Python is cool", category: "Programming" },
  { text: "JavaScript is amazing", category: "Programming" },
  { text: "Stay positive!", category: "Motivation" },
  { text: "Never give up!", category: "Motivation" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");
const newQuoteBtn = document.getElementById("newQuote");

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

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) return;

  quotes.push({ text, category });
  populateCategories();
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

newQuoteBtn.addEventListener("click", filterQuotes);

window.onload = () => {
  populateCategories();
  const savedCategory = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = savedCategory;
  filterQuotes();
};
