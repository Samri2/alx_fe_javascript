// Array of quotes
let quotes = [
    { text: "C is fun", category: "Programming" },
    { text: "Python is cool", category: "Programming" },
    { text: "JavaScript is amazing", category: "Programming" },
    { text: "Never stop learning", category: "Motivation" },
    { text: "Keep pushing forward", category: "Motivation" }
];

// Show a random quote based on selected category
function showRandomQuote() {
    const category = document.getElementById('categoryFilter').value;
    let filteredQuotes = quotes;

    if (category !== "all") {
        filteredQuotes = quotes.filter(q => q.category === category);
    }

    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        document.getElementById('quoteDisplay').textContent = filteredQuotes[randomIndex].text;
    } else {
        document.getElementById('quoteDisplay').textContent = "No quotes available for this category.";
    }
}

// Populate categories dropdown dynamically
function populateCategories() {
    const select = document.getElementById('categoryFilter');
    const existingCategories = Array.from(select.options).map(opt => opt.value);
    const uniqueCategories = [...new Set(quotes.map(q => q.category))];

    uniqueCategories.forEach(cat => {
        if (!existingCategories.includes(cat)) {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            select.appendChild(option);
        }
    });

    // Restore last selected category
    const savedCategory = localStorage.getItem('selectedCategory') || "all";
    select.value = savedCategory;
}

// Save category on change and update quotes
function filterQuotes() {
    const category = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', category);
    showRandomQuote();
}

// Add a new quote to the array
function addQuote() {
    const textInput = document.getElementById('newQuoteText').value.trim();
    const categoryInput = document.getElementById('newQuoteCategory').value.trim();

    if (textInput && categoryInput) {
        quotes.push({ text: textInput, category: categoryInput });
        populateCategories(); // update dropdown if new category
        showRandomQuote();    // show a random quote including the new one
        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";
    }
}

// Dynamically create form to add quotes
function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button type="button" onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formDiv);
}

// Initialize app
function init() {
    createAddQuoteForm();
    populateCategories();
    showRandomQuote();
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
}

// Run initialization after DOM loads
window.onload = init;
