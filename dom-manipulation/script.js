// ===== Quotes Array & Local Storage Setup =====
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "C is fun", category: "Programming" },
    { text: "Python is cool", category: "Programming" },
    { text: "JavaScript is amazing", category: "Programming" }
];

// ===== DOM Elements =====
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');

// ===== Populate Categories Dropdown =====
function populateCategories() {
    const categories = ['All', ...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category
    const savedCategory = localStorage.getItem('selectedCategory') || 'All';
    categoryFilter.value = savedCategory;
}
populateCategories();

// ===== Display Random Quote =====
function showRandomQuote() {
    let filteredQuotes = quotes;
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory);

    if (selectedCategory !== 'All') {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = 'No quotes in this category.';
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.textContent = filteredQuotes[randomIndex].text;
}

// ===== Add Quote Dynamically =====
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (!text || !category) return alert('Please enter both text and category.');

    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));

    textInput.value = '';
    categoryInput.value = '';

    populateCategories(); // Update dropdown if new category added
    showRandomQuote();
}

// ===== Create Add Quote Form =====
function createAddQuoteForm() {
    const formContainer = document.getElementById('addQuoteContainer');
    if (formContainer.children.length > 0) return; // prevent multiple forms

    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter category" />
        <button id="addQuoteBtn">Add Quote</button>
    `;

    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}
createAddQuoteForm();

// ===== Event Listeners =====
newQuoteBtn.addEventListener('click', showRandomQuote);
categoryFilter.addEventListener('change', showRandomQuote);

// ===== Server Sync & Conflict Resolution =====
async function fetchServerQuotes() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data.slice(0, 5).map(post => ({
            text: post.title,
            category: post.body || 'General'
        }));
    } catch (error) {
        console.error('Failed to fetch server quotes:', error);
        return [];
    }
}

function notifyUser(message) {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.position = 'fixed';
    notif.style.top = '20px';
    notif.style.right = '20px';
    notif.style.background = '#f8d7da';
    notif.style.padding = '10px';
    notif.style.borderRadius = '5px';
    notif.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 5000);
}

async function syncQuotes() {
    const serverQuotes = await fetchServerQuotes();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    let changed = false;

    // Merge server quotes (server takes precedence)
    serverQuotes.forEach(sq => {
        if (!localQuotes.some(lq => lq.text === sq.text && lq.category === sq.category)) {
            localQuotes.push(sq);
            changed = true;
        }
    });

    if (changed) {
        localStorage.setItem('quotes', JSON.stringify(localQuotes));
        quotes = localQuotes;
        populateCategories();
        showRandomQuote();
        notifyUser('Quotes updated from server.');
    }
}

// Auto-sync every 30 seconds
setInterval(syncQuotes, 30000);

// Initial display
showRandomQuote();
