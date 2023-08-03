let inputTxt = "";
let resultMainSearch = [];

async function FindRecipesFromInputSearch(input) {
    inputTxt = input;
    const recipesJson = await GetRecipesFromJson();
    resultMainSearch = recipesJson.recipes.filter(RecipeContains);
    return resultMainSearch;
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
    else if (recipe.description.toUpperCase().includes(inputTxtUpper)) {
        argTrouve = true;
    } else {
        // recherche dans ingredients
        recipe.ingredients.forEach((ingredient) => {
            let ingredientUpper = ingredient.ingredient.toUpperCase();
            if (ingredientUpper.includes(inputTxtUpper)) {
                argTrouve = true;
            }
        });
    }

    return argTrouve;
}