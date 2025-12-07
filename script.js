// Game data
const games = [
    { title: "FNF Hatsune Miku", description: "Music battle with Miku", color: "#ff6b6b", imageSrc: "1.webp" },
    { title: "FNF Vs. Huggy Wuggy", description: "Smoky showdown", color: "#4ecdc4" , imageSrc: "22.webp" },
    { title: "FNF vs Minus Garcello", description: "Five Nights crossover", color: "#45b7d1", imageSrc: "6.jpg" },
    // { title: "FNF vs Minus Garcello", description: "Catch the stars", color: "#f093fb", imageSrc: "4.jpg" },
    { title: "FNF Vs. Mommy Long Legs", description: "Bullet hell beats", color: "#4facfe", imageSrc: "5.jpg" },
    { title: "FNF vs Zardy Phase 2 in HD", description: "Madness combat", color: "#43e97b", imageSrc: "2.jpg" },
    { title: "FNF Vs. Lobotomy Dash: Fire in The Hole", description: "Dance battle", color: "#38f9d7", imageSrc: "7.jpg" },
    { title: "FNF Vs. Spinel", description: "Mario joins the battle", color: "#667eea", imageSrc: "8.jpg" },
    { title: "FNF Vs. Ben Drowned Terrible Fate", description: "Dreamy encounter", color: "#764ba2", imageSrc: "9.jpg" },
    { title: "FNF Vs CatNap v2", description: "Mobile exclusive", color: "#f093fb", imageSrc: "10.jpg" },
    { title: "FNF Touhou Mod", description: "Original game", color: "#ff6b6b", imageSrc: "11.jpg" },
    { title: "FNF Twiddle Finger", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "12.jpg" },
    { title: "FNF vs Garcello", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "27.webp" },
    { title: "FNF vs Whitty", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "26.webp" },
    { title: "FNF vs Tabi Ex Boyfriend", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "25.webp" },
    { title: "FNF Darkness Takeover vs Pibby Family Guy", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "24.webp" },


    // { title: "FNF Silly Billy Mod vs YourSelf - Hit Single Real", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "14.jpg" },
    // { title: "FNF Silly Billy Mod vs YourSelf - Hit Single Real", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "15.jpg" },
    // { title: "FNF Silly Billy Mod vs YourSelf - Hit Single Real", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "16.jpg" },
    // { title: "FNF Silly Billy Mod vs YourSelf - Hit Single Real", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "17.jpg" },
    // { title: "FNF Silly Billy Mod vs YourSelf - Hit Single Real", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "18.jpg" },
    // { title: "FNF Silly Billy Mod vs YourSelf - Hit Single Real", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "19.jpg" },
    { title: "FNF 2 Player MOD - FNF for two", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "20.jpg" },
    // { title: "FNF Silly Billy Mod vs YourSelf - Hit Single Real", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "21.webp" },
    // { title: "FNF Silly Billy Mod vs YourSelf - Hit Single Real", description: "Remixed tracks", color: "#4ecdc4", imageSrc: "22.webp" },


];

let currentPage = 1;
const gamesPerPage = 12;

// Initialize the pages
document.addEventListener('DOMContentLoaded', function() {
    renderGames();
    setupPagination();
    setupSearch();
});

// Render games for current page
function renderGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const currentGames = games.slice(startIndex, endIndex);
    
    gamesGrid.innerHTML = '';
    
    currentGames.forEach((game, index) => {
        const gameCard = createGameCard(game, startIndex + index);
        gamesGrid.appendChild(gameCard);
    });
}

// Create individual game card
function createGameCard(game, index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    card.innerHTML = `
        <div class="game-image" style="background-image: url('./images/${game.imageSrc}');">
        </div>
        <div class="game-info">
            <div class="game-title">${game.title}</div>
            <div class="game-description">${game.description}</div>
            <button id="download-btn" onclick="og_load()">Download Now</button>
        </div>
    `;    
    return card;
}

// Adjust color brightness
function adjustColor(color, amount) {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = (num >> 8 & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

// Setup pagination
function setupPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.dataset.page;
            
            if (page === 'next') {
                if (currentPage < Math.ceil(games.length / gamesPerPage)) {
                    currentPage++;
                }
            } else {
                currentPage = parseInt(page);
            }
            
            updatePagination();
            renderGames();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Update pagination active state
function updatePagination() {
    const pageButtons = document.querySelectorAll('.page-btn:not(.next-btn)');
    
    pageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.page) === currentPage) {
            btn.classList.add('active');
        }
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query) {
            const filteredGames = games.filter(game => 
                game.title.toLowerCase().includes(query) || 
                game.description.toLowerCase().includes(query)
            );
            
            renderFilteredGames(filteredGames);
        } else {
            renderGames();
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Render filtered games
function renderFilteredGames(filteredGames) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No games found matching your search.</div>';
        return;
    }
    
    filteredGames.forEach((game, index) => {
        const gameCard = createGameCard(game, index);
        gamesGrid.appendChild(gameCard);
    });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to stars in rating section
    const stars = document.querySelectorAll('.stars i');
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            stars.forEach((s, i) => {
                s.style.color = i <= index ? '#ffd700' : '#ccc';
            });
        });
    });
    
    // Reset stars on mouse leave
    document.querySelector('.stars').addEventListener('mouseleave', function() {
        stars.forEach(star => {
            star.style.color = '#ffd700';
        });
    });
});