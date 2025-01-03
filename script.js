// DOM Elements
const recipeSearch = document.querySelector('.input');
const searchBtn = document.querySelector('.search_btn');
const recipeContainer = document.querySelector('.recipe_container');
const recipeDetailsContent = document.querySelector('.recipe_details_content');
const closeBtn = document.querySelector('.closebtn');
const darkModeBtn = document.getElementById('btn');

// Apply saved theme
const applyTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme) document.body.classList.add(`${theme}_theme`);
};
applyTheme();

// Theme Toggle
darkModeBtn.onclick = () => {
    document.body.classList.toggle('dark_theme');
    document.body.classList.remove('blue_theme');
    localStorage.setItem('theme', document.body.classList.contains('dark_theme') ? 'dark' : 'default');
};
darkModeBtn.ondblclick = () => {
    document.body.classList.toggle('blue_theme');
    document.body.classList.remove('dark_theme');
    localStorage.setItem('theme', document.body.classList.contains('blue_theme') ? 'blue' : 'default');
};

// Fetch Recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = '<h2>Loading recipes...</h2>';
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
        const data = await response.json();
        if (!data.meals) {
            recipeContainer.innerHTML = `<h2>No recipes found for "${query}"</h2>`;
            return;
        }

        recipeContainer.innerHTML = "";
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
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = `<h2>Error fetching recipes. ${error.message}</h2>`;
    }
};

// Fetch Ingredients
const fetchIngredients = (meal) => {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (!ingredient) break;
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`;
    }
    return ingredientsList;
};

// Open Recipe Popup
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipe-name">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instructions:</h3>
            <p class="instructions">${meal.strInstructions}</p>
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = 'block';
};

// Close Popup
closeBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
});

// Search Button Click
// searchBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const searchValue = recipeSearch.value.trim();
//     if (!searchValue) {
//         recipeContainer.innerHTML = `<h2>Please type a meal name in the search box.</h2>`;
//         return;
//     }
//     fetchRecipes(searchValue);
// });
