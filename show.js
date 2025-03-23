const RecipeContainer = document.querySelector('.recipe_container');
const RecipeDetailsContent = document.querySelector('.recipe_details_content');
const closeBtns = document.querySelectorAll('.closebtn');

// Fetch Recipes
const fetchRecipe = async (query) => {
    RecipeContainer.innerHTML = '<h2>Loading recipes...</h2>';
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
        const data = await response.json();
        if (!data.meals) {
            RecipeContainer.innerHTML = `<h2>No recipes found for "${query}"</h2>`;
            return;
        }

        RecipeContainer.innerHTML = "";
        data.meals.forEach((meal) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <h2>${meal.strMeal}</h2>
                <p>Category: <span>${meal.strCategory}</span></p>
                <p>Area: <span>${meal.strArea}</span> Dish</p>
            `;
            const viewButton = document.createElement('button');
            viewButton.textContent = 'View Recipe';
            viewButton.addEventListener('click', () => openRecipePopup(meal));
            recipeDiv.appendChild(viewButton);
            RecipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        RecipeContainer.innerHTML = `<h2>Error fetching recipes. ${error.message}</h2>`;
    }
};
// Event listener for recipe buttons
RecipeContainer.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('showbtn')) {
        const mealName = e.target.closest('.recipe').querySelector('h2').textContent.trim();
        fetchRecipe(mealName);
    }
});

// Close the recipe popup when the close button is clicked
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        RecipeDetailsContent.parentElement.style.display = 'none';
    });
});
