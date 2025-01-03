// Selecting DOM elements
const recipecontainer = document.querySelector('.recipe_container');
const recipedetailscontent = document.querySelector('.recipe_details_content');
const closebtn = document.querySelector('.closebtn');
const alphabetscontainer = document.querySelector('.alphabates_container');

// Function to fetch recipes from API
const fetchrecipes = async (query) => {
    recipecontainer.innerHTML = `<h2>Loading recipe...</h2>`;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
        const data = await response.json();

        recipecontainer.innerHTML = ""; // Clear previous content

        if (!data.meals) {
            recipecontainer.innerHTML = '<h2>No recipes found. Try a different letter.</h2>';
            return;
        }

        data.meals.forEach(meal => {
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
            viewButton.addEventListener('click', () => openrecipePopup(meal));

            recipeDiv.appendChild(viewButton);
            recipecontainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipecontainer.innerHTML = '<h2>Error fetching recipes. Please try again later.</h2>';
        console.error('Error:', error);
    }
};

// Function to generate the ingredients list for a recipe
const fetchingredients = (meal) => {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};

// Function to open the recipe popup
const openrecipePopup = (meal) => {
    recipedetailscontent.innerHTML = `
        <h2 class="recipe-name">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredient-list">${fetchingredients(meal)}</ul>
        <div>
            <h3>Instructions:</h3>
            <p class="instructions">${meal.strInstructions}</p>
        </div>
    `;
    recipedetailscontent.parentElement.style.display = 'block';
    recipedetailscontent.parentElement.focus(); // Move focus to the modal for accessibility
};

// Close the recipe popup when the close button is clicked
closebtn.addEventListener('click', () => {
    recipedetailscontent.parentElement.style.display = 'none';
});

// Generate buttons for each letter of the alphabet
const generateAlphabetButtons = () => {
    const alphabetContainer = document.querySelector('.alphabates_container');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let selectedButton = null;

    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.classList.add('alpha');
        button.textContent = letter;
        button.addEventListener('click', () => {
            fetchrecipes(letter.toLowerCase());

            // Highlight the selected button
            if (selectedButton) selectedButton.classList.remove('active');
            button.classList.add('active');
            selectedButton = button;
        });
        alphabetContainer.appendChild(button);
    });
};

// Initialize the alphabet buttons
generateAlphabetButtons();
