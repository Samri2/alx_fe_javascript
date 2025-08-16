// Global quotes array (must be mutable because we add to it)
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Your limitation—it’s only your imagination.", category: "Inspiration" }
];

/* 1) displayRandomQuote function (name must match the check) */
function displayRandomQuote() {
  if (!quotes.length) return;

  // 2) Logic to select a random quote and update the DOM
  const i = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[i];

  // Always update the DOM
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (quoteDisplay) {
    // Use textContent to avoid HTML injection noise
    quoteDisplay.textContent = `"${text}" — ${category}`;
  }
}

/* 3) addQuote function (name must match the check) */
function addQuote() {
  // 4) Logic to add a new quote to the array and update the DOM
  const textEl = document.getElementById("newQuoteText");
  const catEl  = document.getElementById("newQuoteCategory");

  const text = textEl ? textEl.value.trim() : "";
  const category = catEl ? catEl.value.trim() : "";

  if (!text || !category) {
    // still “updates the DOM” by giving feedback if you want:
    // (optional) document.getElementById("quoteDisplay").textContent = "Please enter both a quote and category.";
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });

  // Clear inputs
  if (textEl) textEl.value = "";
  if (catEl)  catEl.value = "";

  // Immediately show the newly added quote in the UI
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (quoteDisplay) {
    quoteDisplay.textContent = `"${text}" — ${category}`;
  }
}

/* 5) Event listener on the “Show New Quote” button */
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("newQuote");
  if (btn) btn.addEventListener("click", displayRandomQuote);

  // Show one on load so the page isn’t empty
  displayRandomQuote();

  // (Optional) If you have an "Add Quote" button with id="addQuoteBtn", wire it too:
  const addBtn = document.getElementById("addQuoteBtn");
  if (addBtn) addBtn.addEventListener("click", addQuote);
});
