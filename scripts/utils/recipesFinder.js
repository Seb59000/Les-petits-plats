function FindRecipeFromInputSearch(input) {
    let inputTxtUpper = input.toUpperCase();
    let recipesSelection = [];
    const length = recipes.length;

    // pour chaque recette
    for (let indexRecipe = 0; indexRecipe < length; indexRecipe++) {
        // si le titre contient l'input
        if (recipes[indexRecipe].name.toUpperCase().includes(inputTxtUpper)) {
            // on l'ajoute à notre selection
            recipesSelection.push(recipes[indexRecipe]);
            // si la description contient l'input
        } else if (recipes[indexRecipe].description.toUpperCase().includes(inputTxtUpper)) {
            // on l'ajoute à notre selection
            recipesSelection.push(recipes[indexRecipe]);
            // sinon recherche dans ingredients
        } else {
            const ingredientsLength = recipes[indexRecipe].ingredients.length;
            // pour chaque ingredient
            for (let indexIngredient = 0; indexIngredient < ingredientsLength; indexIngredient++) {
                // si l'ingredient contient l'input
                if (recipes[indexRecipe].ingredients[indexIngredient].ingredient.toUpperCase().includes(inputTxtUpper)) {
                    // on l'ajoute à notre selection
                    recipesSelection.push(recipes[indexRecipe]);
                    // et on sort de la boucle
                    indexIngredient = ingredientsLength;
                }
            }
        }
    }

    return recipesSelection;
}