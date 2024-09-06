async function searchrecipes() {
    const searchInput = document.getElementById('searchInput').value;
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = "";

    try {
        const response = await fetch(`https://api.edamam.com/search?q=${searchInput}&app_id=1aaa002f&app_key=27032b1544161e7bf224cde3af70dae0`);
        if (!response.ok) {
            throw new Error(`Http error! status : ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        data.hits.forEach(recipe => {
            const recipeHTML = `
            <div class = "recipe">
            <h2>${recipe.recipe.label}</h2>
            <img src = "${recipe.recipe.image}" alt="{recipe.recipe.label}">
            <p>Calories: ${Math.round(recipe.recipe.calories)}</p>
            <p>Servings: ${recipe.recipe.yield}</p>
            <a href = "${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div>
            `;
            recipesContainer.innerHTML += recipeHTML;
        })
    } catch (error) {
        console.log('Error fetching recipes:', error);
    }
}