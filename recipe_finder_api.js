
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "ebb9145ca4d542a4a8d172eb06305dc3"; 
    const form = document.getElementById("search-form");
    const recipesDiv = document.querySelector(".recipes");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const ingredients = document.getElementById("search").value;
        fetchRecpies(ingredients);
    });

    function fetchRecpies(ingredients) {
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                displayRecipes(data);
            })
            .catch((error) => {
                console.error("Error fetching recipes", error);
            });
    }

    function displayRecipes(recipes) {
        recipesDiv.innerHTML = '';

        recipes.forEach(recipe => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipes-item");

            recipeDiv.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
                <p>Missed Ingredients: ${recipe.missedIngredientCount}</p>
                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s/g, '-')}-${recipe.id}" target="_blank">View Recipe</a>
            `;

            recipesDiv.appendChild(recipeDiv);
        });
    }
});




