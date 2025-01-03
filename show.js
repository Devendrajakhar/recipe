// const RecipeContainer = document.querySelector('.recipe_container');
// const RecipeDetailsContent = document.querySelector('.recipe_details_content');
// const closeBtns = document.querySelectorAll('.closebtn');

// // Function to fetch recipes from API
// const fetchrecipe = async (query) => {
//     RecipeContainer.innerHTML = `<h2>Loading recipe...</h2>`;
//     try {
//         const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
//         const data = await response.json();

//         RecipeContainer.innerHTML = ""; // Clear previous content

//         if (!data.meals) {
//             RecipeContainer.innerHTML = '<h2>No recipes found. Try a different letter.</h2>';
//             return;
//         }

//         data.meals.forEach(meal => {
//             const recipeDiv = document.createElement('div');
//             recipeDiv.classList.add('recipe');

//             recipeDiv.innerHTML = `
//                 <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
//                 <h2>${meal.strMeal}</h2>
//                 <p>Category: <span>${meal.strCategory}</span></p>
//                 <p>Area: <span>${meal.strArea}</span> Dish</p>
//             `;

//             const viewButton = document.createElement('button');
//             viewButton.textContent = 'View Recipe';
//             viewButton.classList.add('showbtn');
//             viewButton.addEventListener('click', () => openrecipepopup(meal));

//             recipeDiv.appendChild(viewButton);
//             RecipeContainer.appendChild(recipeDiv);
//         });
//     } catch (error) {
//         RecipeContainer.innerHTML = '<h2>Error fetching recipes. Please try again later.</h2>';
//         console.error('Error:', error);
//     }
// };

// // // Function to generate the ingredients list for a recipe
// // const fetchingredient = (meal) => {
// //     let ingredientsList = '';
// //     for (let i = 1; i <= 20; i++) {
// //         const ingredient = meal[`strIngredient${i}`];
// //         if (ingredient) {
// //             const measure = meal[`strMeasure${i}`];
// //             ingredientsList += `<li>${measure} ${ingredient}</li>`;
// //         } else {
// //             break;
// //         }
// //     }
// //     return ingredientsList;
// // };

// // // Function to open the recipe popup
// // const openrecipepopup = (meal) => {
// //     RecipeDetailsContent.innerHTML = `
// //         <h2 class="recipe-name">${meal.strMeal}</h2>
// //         <h3>Ingredients:</h3>
// //         <ul class="ingredient-list">${fetchingredient(meal)}</ul>
// //         <div>
// //             <h3>Instructions:</h3>
// //             <p class="instructions">${meal.strInstructions}</p>
// //         </div>
// //     `;
// //     RecipeDetailsContent.parentElement.style.display = 'block';
// //     RecipeDetailsContent.parentElement.focus(); // Move focus to the modal for accessibility
// // };

// // // Close the recipe popup when the close button is clicked
// // closeBtns.forEach(btn => {
// //     btn.addEventListener('click', () => {
// //         RecipeDetailsContent.parentElement.style.display = 'none';
// //     });
// // });
// // Search Button Click
// // searchBtn.addEventListener('click', (e) => {
// //     e.preventDefault();
// //     const searchValue = recipeSearch.value.trim();
// //     if (!searchValue) {
// //         recipeContainer.innerHTML = `<h2>Please type a meal name in the search box.</h2>`;
// //         return;
// //     }
// //     fetchRecipes(searchValue);
// // });

// // Event listener for recipe buttons
// RecipeContainer.addEventListener('click', (e) => {
//     if (e.target && e.target.classList.contains('showbtn')) {
//         const recipename = e.target.closest('.recipe').querySelector('h2').textContent.trim();
//         fetchrecipe(recipename);
//     }
// });

const RecipeContainer = document.querySelector('.recipe_container');
const RecipeDetailsContent = document.querySelector('.recipe_details_content');
const closeBtns = document.querySelectorAll('.closebtn');

// Fetch Recipes
const fetchRecipe = async (query) => {
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

// // Function to fetch and display recipe details
// const fetchRecipeDetails = async (mealName) => {
//     RecipeDetailsContent.innerHTML = `<h2>Loading details...</h2>`;
//     try {
//         const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
//         const data = await response.json();

//         if (!data.meals || data.meals.length === 0) {
//             RecipeDetailsContent.innerHTML = `<h2>No details found for "${mealName}".</h2>`;
//             return;
//         }

//         const meal = data.meals[0]; // Assuming the first match is the correct one
//         RecipeDetailsContent.innerHTML = `
//             <h2 class="recipe-name">${meal.strMeal}</h2>
//             <h3>Ingredients:</h3>
//             <ul>
//                 ${Array.from({ length: 20 }, (_, i) => {
//                     const ingredient = meal[`strIngredient${i + 1}`];
//                     const measure = meal[`strMeasure${i + 1}`];
//                     return ingredient ? `<li>${measure} ${ingredient}</li>` : '';
//                 }).join('')}
//             </ul>
//             <h3>Instructions:</h3>
//             <p>${meal.strInstructions}</p>
//         `;
//         RecipeDetailsContent.parentElement.style.display = 'block';
//     } catch (error) {
//         RecipeDetailsContent.innerHTML = '<h2>Error loading recipe details. Please try again later.</h2>';
//         console.error('Error:', error);
//     }
// };

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
