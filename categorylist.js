const categorybox = document.querySelector('.category');
const recipecontainercategory = document.querySelector('.recipe_container');

const fetchCategorylist = async () => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
            const ulcategory = document.createElement('ul');
            ulcategory.classList.add('category-list');

            data.meals.forEach(meal => {
                const listItem = document.createElement('li');
                listItem.classList.add('categoryName');
                listItem.textContent = meal.strCategory;

                // Add click event to fetch recipes by category
                listItem.addEventListener('click', () => {
                    fetchRecipesByCategory(meal.strCategory);
                });

                ulcategory.appendChild(listItem);
            });

            categorybox.appendChild(ulcategory);
        } else {
            categorybox.innerHTML = '<p>No categories available.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        categorybox.innerHTML = '<p>Error loading categories.</p>';
    }
};

const fetchRecipesByCategory = async (category) => {
    recipecontainercategory.innerHTML = '<h2>Loading recipes...</h2>';
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();

        if (data.meals) {
            recipecontainercategory.innerHTML = '';
            data.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');

                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <h2>${meal.strMeal}</h2>
                `;

                recipecontainercategory.appendChild(recipeDiv);
            });
        } else {
            recipecontainercategory.innerHTML = `<h2>No recipes found for "${category}"</h2>`;
        }
    } catch (error) {
        recipecontainercategory.innerHTML = '<h2>Error fetching recipes. Please try again later.</h2>';
        console.error('Error:', error);
    }
};

// Fetch the category list on page load
fetchCategorylist();
