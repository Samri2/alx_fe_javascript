// 1. Quotes array exists with objects containing text + category
let quotes = [
  { text: "Stay hungry, stay foolish.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Wisdom" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" }
];

// 2. Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${quote.text}"</p>
    <small>- ${quote.category}</small>
  `;
}

// 3. Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText").value.trim();
  const categoryInput = document.getElementById("newQuoteCategory").value.trim();

  if (textInput && categoryInput) {
    quotes.push({ text: textInput, category: categoryInput });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// 4. Event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Display a random quote on first load
displayRandomQuote();
