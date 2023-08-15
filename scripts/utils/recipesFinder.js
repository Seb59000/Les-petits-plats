// import { GetRecipesFromJson } from "../pages/index.js";
let btnCancelHidden = false;
let inputTxt = "";
let resultMainSearch = [];

async function FindRecipesFromInputSearch(input) {
    inputTxt = input;
    const recipesJson = await GetRecipesFromJson();
    const result = recipesJson.recipes.filter(RecipeContains);
    resultMainSearch = result;
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

/**
 * fonction de recherche
 */
async function Search() {
    const search_input = document.getElementById("search_bar_input");
    if (search_input.value == "") {
        DisparitionBtnCancel();
    } else {
        if (btnCancelHidden) {
            // apparition du btn annuler
            const cancel_btn = document.getElementById("cancel");
            cancel_btn.style["display"] = "block";
            btnCancelHidden = false;
        }
        if (search_input.value.length > 2) {
            // lancement de la recherche
            const filteredRecipes = await FindRecipesFromInputSearch(search_input.value);
            ApplyFilters(filteredRecipes, search_input.value);
        }
    }
}

/**
 * click sur btn annuler main search_bar
 */
async function CancelMainSearchInput() {
    const search_input = document.getElementById("search_bar_input");
    search_input.value = "";
    resultMainSearch = [];
    DisparitionBtnCancel();

    const recipesJson = await GetRecipesFromJson();
    ApplyFilters(recipesJson.recipes, search_input.value);
}

/**
 * Disparition du btn annuler
 */
function DisparitionBtnCancel() {
    const cancel_btn = document.getElementById("cancel");
    cancel_btn.style["display"] = "none";
    btnCancelHidden = true;
}

