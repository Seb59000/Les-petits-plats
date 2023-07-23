let inputTxt = "";

function FindRecipeFromInputSearch(input) {
    inputTxt = input;
    const result = recipes.filter(RecipeContains);
    return result;
}

function RecipeContains(recipe) {
    let argTrouve = false;
    let inputTxtUpper = inputTxt.toUpperCase();

    // recherche dans titre
    let nameMaj = recipe.name.toUpperCase();
    if (nameMaj.includes(inputTxtUpper)) {
        argTrouve = true;
    }

    // recherche dans description
    let descriptionMaj = recipe.description.toUpperCase();
    if (descriptionMaj.includes(inputTxtUpper)) {
        argTrouve = true;
    }

    // recherche dans ingredients
    recipe.ingredients.forEach((ingredient) => {
        let ingredientUpper = ingredient.ingredient.toUpperCase();
        if (ingredientUpper.includes(inputTxtUpper)) {
            argTrouve = true;
        }
    });
    return argTrouve;
}