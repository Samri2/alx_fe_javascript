// Quotes array: each quote is an object with text + category
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Inspiration" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" }
];

// Grab elements from DOM
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteCategory = document.getElementById("quoteCategory");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");

// Function to show random quote
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  // Update DOM
  quoteDisplay.textContent = `"${randomQuote.text}"`;
  quoteCategory.textContent = `— ${randomQuote.category}`;
}

// Function to add new quote
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText && newCategory) {
    // Push new quote into array
    quotes.push({ text: newText, category: newCategory });

    // Clear inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully! 🎉");
  } else {
    alert("Please enter both a quote and category.");
  }
}

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Show one quote on page load
showRandomQuote();
