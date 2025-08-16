// -------------------------
// GLOBAL VARIABLES
// -------------------------
let quotes = [];
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// -------------------------
// LOCAL STORAGE FUNCTIONS
// -------------------------
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "Stay hungry, stay foolish.", category: "Motivation" },
      { text: "Knowledge is power.", category: "Wisdom" },
      { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" }
    ];
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// -------------------------
// CATEGORY FILTERING
// -------------------------
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");

  const savedCategory = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = savedCategory;

  filterQuotes(); // display quotes based on saved filter
}

function filterQuotes() {
  const category = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", category);
  showRandomQuote();
}

// -------------------------
// DISPLAY RANDOM QUOTE
// -------------------------
function showRandomQuote() {
  const category = document.getElementById("categoryFilter").value;
  let filteredQuotes = category === "all" ? quotes : quotes.filter(q => q.category === category);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = `<p>No quotes found for "${category}"</p>`;
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${quote.text}"</p>
    <small>- ${quote.category}</small>
  `;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// -------------------------
// ADD NEW QUOTE
// -------------------------
function createAddQuoteForm() {
  const textInput = document.getElementById("newQuoteText").value.trim();
  const categoryInput = document.getElementById("newQuoteCategory").value.trim();

  if (textInput && categoryInput) {
    const newQuote = { text: textInput, category: categoryInput };

    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    showRandomQuote();

    postQuoteToServer(newQuote); // send new quote to server

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    notifyUser("Quote added successfully!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// -------------------------
// JSON IMPORT / EXPORT
// -------------------------
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        notifyUser("Quotes imported successfully!");
        showRandomQuote();
      } else {
        alert("Invalid JSON format. Must be an array of quotes.");
      }
    } catch (e) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// -------------------------
// SERVER SYNC + CONFLICT RESOLUTION
// -------------------------
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();
    return serverData.map(item => ({ text: item.title, category: "Server" }));
  } catch (error) {
    console.error("Error fetching server data:", error);
    return [];
  }
}

async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();
  let updated = false;

  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(q => q.text === serverQuote.text);
    if (!exists) {
      quotes.push(serverQuote);
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    populateCategories();
    showRandomQuote();
    notifyUser("Quotes updated from server!");
  }
}

// -------------------------
// POST NEW QUOTE TO SERVER
// -------------------------
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });

    if (!response.ok) throw new Error("Failed to post quote");

    const data = await response.json();
    console.log("Quote posted to server:", data);
    notifyUser("Quote synced to server!");
  } catch (error) {
    console.error("Error posting quote:", error);
  }
}

// -------------------------
// NOTIFICATIONS
// -------------------------
function notifyUser(message) {
  alert(message); // can replace with toast notifications later
}

// -------------------------
// EVENT LISTENERS
// -------------------------
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", createAddQuoteForm);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);
document.getElementById("syncBtn")?.addEventListener("click", syncWithServer);

// -------------------------
// INIT
// -------------------------
loadQuotes();
populateCategories();

const lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) {
  const quote = JSON.parse(lastQuote);
  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${quote.text}"</p>
    <small>- ${quote.category}</small>
  `;
} else {
  showRandomQuote();
}

// Periodic server sync every 60 seconds
setInterval(syncWithServer, 60000);
