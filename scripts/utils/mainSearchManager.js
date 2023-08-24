import { ApplyFilters } from "./tagManager.js";
import { GetRecipesFromJson } from "../pages/index.js";

let btnCancelHidden = false;
export let resultMainSearch = [];

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

/**
 * ajout d'EventListeners
 */
export function EventListenersMainSearch() {
    const cancel_btn = document.getElementById("cancel");
    cancel_btn.addEventListener("click", CancelMainSearchInput);

    const search_bar_input = document.getElementById("search_bar_input");
    search_bar_input.addEventListener("keyup", Search);

    DisparitionBtnCancel();
}