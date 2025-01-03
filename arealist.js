const Areabox = document.querySelector('.area');
const recipecontainerArea = document.querySelector('.recipe_container');

// Function to fetch and display the list of areas
const fetchArealist = async () => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const data = await response.json();

    if (data.meals) {
      const areaListContainer = document.createElement('div'); // Container for area list
      const ulArea = document.createElement('ul'); // Unordered list for areas

      data.meals.forEach(meal => {
        const listItem = document.createElement('li');
        listItem.classList.add('areaName'); // Correctly add class
        listItem.textContent = meal.strArea; // Set area name
        ulArea.appendChild(listItem); // Append list item to the unordered list
      });

      areaListContainer.appendChild(ulArea);
      Areabox.appendChild(areaListContainer); // Append the area list to the Areabox
    } else {
      Areabox.innerHTML = '<p>No areas found.</p>'; // Handle case with no areas
    }
  } catch (error) {
    Areabox.innerHTML = '<p>Error fetching areas. Please try again later.</p>';
    console.error('Error fetching area list:', error);
  }
};

// Add event delegation to handle clicks on dynamically added area items
Areabox.addEventListener('click', (e) => {
  if (e.target.classList.contains('areaName')) {
    const area = e.target.textContent.trim(); // Get the selected area name
    console.log(`Selected area: ${area}`);
    fetchRecipesByArea(area); // Fetch recipes for the selected area
  }
});

// Function to fetch recipes by area
const fetchRecipesByArea = async (area) => {
  recipecontainerArea.innerHTML = '<div class="spinner"></div>'; // Show loading spinner
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await response.json();

    recipecontainerArea.innerHTML = ''; // Clear container after fetching

    if (!data.meals || data.meals.length === 0) {
      recipecontainerArea.innerHTML = `<p>No recipes found for "${area}".</p>`;
      return;
    }

    data.meals.forEach(meal => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');

      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h2>${meal.strMeal}</h2>
        <p>Area:<span>${area}</span></p>
         <button class="showbtn">show</button>
      `;

      recipeDiv.addEventListener('click', () => {
        openRecipeDetails(meal.idMeal); // Implement this function to show recipe details
      });

      recipecontainerArea.appendChild(recipeDiv);
    });
  } catch (error) {
    recipecontainerArea.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    console.error('Error fetching recipes by area:', error);
  }
};

// Fetch area list on page load
fetchArealist();
