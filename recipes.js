// recipes.js

// Filter Recipes Dynamically
const searchBar = document.getElementById("search-bar");
const recipeCards = document.querySelectorAll(".recipe-card");

searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    
    recipeCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        
        if (title.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// Surprise Me Button
const surpriseMeBtn = document.getElementById("surprise-me-btn");

surpriseMeBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * recipeCards.length);
    
    // Highlight the random recipe
    recipeCards.forEach((card) => card.classList.remove("highlight"));
    
    const randomCard = recipeCards[randomIndex];
    
    randomCard.classList.add("highlight");
    
    // Scroll to the highlighted card
    randomCard.scrollIntoView({ behavior: "smooth", block: "center" });
});
