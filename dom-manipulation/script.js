// Step 1: Quotes data structure
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Your limitation—it’s only your imagination.", category: "Inspiration" }
];

// Step 2: Function to display a random quote
function displayRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let quoteDisplay = document.getElementById("quoteDisplay");
  
  quoteDisplay.innerHTML = `
    <p><strong>${quotes[randomIndex].category}:</strong> "${quotes[randomIndex].text}"</p>
  `;
}

// Step 3: Function to add a new quote dynamically
function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category!");
    return;
  }

  // Add new quote to the array
  quotes.push({
    text: newQuoteText,
    category: newQuoteCategory
  });

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Show confirmation
  alert("New quote added successfully!");
}

// Step 4: Event listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Show a random quote when the page loads
window.onload = displayRandomQuote;
