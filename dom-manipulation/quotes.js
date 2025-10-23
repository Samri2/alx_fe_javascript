// Initial Quotes Array (could be fetched from JSON)
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
    { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt", category: "Courage" }
];

// Load saved quotes from localStorage
if (localStorage.getItem('quotes')) {
    quotes = JSON.parse(localStorage.getItem('quotes'));
}

// Load last selected category
let lastCategory = localStorage.getItem('lastCategory') || 'all';

// DOM Elements
const quoteContainer = document.getElementById('quoteContainer');
const categoryFilter = document.getElementById('categoryFilter');
const addQuoteForm = document.getElementById('addQuoteForm');

// Display Quotes
function displayQuotes(filteredQuotes) {
    quoteContainer.innerHTML = '';
    filteredQuotes.forEach(q => {
        const div = document.createElement('div');
        div.innerHTML = `<p>"${q.text}" - <strong>${q.author}</strong> [${q.category}]</p>`;
        quoteContainer.appendChild(div);
    });
}

// Populate Categories
function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
    categoryFilter.value = lastCategory;
}

// Filter Quotes
function filterQuotes() {
    const selected = categoryFilter.value;
    lastCategory = selected;
    localStorage.setItem('lastCategory', selected);

    if (selected === 'all') {
        displayQuotes(quotes);
    } else {
        displayQuotes(quotes.filter(q => q.category === selected));
    }
}

// Add New Quote
addQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newQuote = {
        text: document.getElementById('quoteText').value,
        author: document.getElementById('quoteAuthor').value,
        category: document.getElementById('quoteCategory').value
    };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    filterQuotes();

    addQuoteForm.reset();
});

// Initial Population
populateCategories();
filterQuotes();
