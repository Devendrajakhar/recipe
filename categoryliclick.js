const Recipecontainer = document.querySelector('.recipe_container');
// Function to fetch and display recipes by category
const fetchCategoryByName = async (query) => {
  try {
    Recipecontainer.innerHTML = '<div class="spinner"></div>'; // Show loading spinner

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
    if (!response.ok) throw new Error(`Failed to fetch recipes for category "${query}".`);

    const datas = await response.json();
    Recipecontainer.innerHTML = ''; // Clear container after fetching

    if (!datas.meals || datas.meals.length === 0) {
      Recipecontainer.innerHTML = `<h2>No recipes found for category "${query}".</h2>`;
      return;
    }

    datas.meals.forEach((meal) => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');

      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h2>${meal.strMeal}</h2>
        <p>Category : <span>${query}</span></p>
      <button class="showbtn">show</button>
      `;

      // Add click event for details
      recipeDiv.addEventListener('click', () => {
        console.log(`Recipe clicked: ${meal.strMeal}`);
        // openrecipepopup(meal.idMeal); // Function to open recipe details
      });

      Recipecontainer.appendChild(recipeDiv);
    });
  } catch (error) {
    Recipecontainer.innerHTML = '<h2>Error fetching recipes. Please try again later.</h2>';
    console.error('Error fetching category recipes:', error.message);
  }
};

// Delegate event listener to parent container
document.querySelector('.category').addEventListener('click', (e) => {
  if (e.target.classList.contains('categoryName')) {
    const value = e.target.textContent.trim(); 
    fetchCategoryByName(value);
  }
});
