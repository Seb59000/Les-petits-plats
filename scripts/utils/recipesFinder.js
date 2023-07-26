/**
 * Renvoie les recettes qui contiennent l'input dans leur titre, recette ou ingrédients
 */
async function FindRecipesFromInputSearch(input) {
    let inputTxtUpper = input.toUpperCase();
    let recipesSelection = [];

    const recipesJson = await GetRecipesFromJson();

    const length = recipesJson.recipes.length;

    // pour chaque recette
    for (let indexRecipe = 0; indexRecipe < length; indexRecipe++) {
        // si le titre contient l'input
        if (recipesJson.recipes[indexRecipe].name.toUpperCase().includes(inputTxtUpper)) {
            // on l'ajoute à notre selection
            recipesSelection.push(recipesJson.recipes[indexRecipe]);
            // si la description contient l'input
        } else if (recipesJson.recipes[indexRecipe].description.toUpperCase().includes(inputTxtUpper)) {
            // on l'ajoute à notre selection
            recipesSelection.push(recipesJson.recipes[indexRecipe]);
            // sinon recherche dans ingredients
        } else {
            const ingredientsLength = recipesJson.recipes[indexRecipe].ingredients.length;
            // pour chaque ingredient
            for (let indexIngredient = 0; indexIngredient < ingredientsLength; indexIngredient++) {
                // si l'ingredient contient l'input
                if (recipesJson.recipes[indexRecipe].ingredients[indexIngredient].ingredient.toUpperCase().includes(inputTxtUpper)) {
                    // on l'ajoute à notre selection
                    recipesSelection.push(recipesJson.recipes[indexRecipe]);
                    // et on sort de la boucle
                    indexIngredient = ingredientsLength;
                }
            }
        }
    }

    return recipesSelection;
}