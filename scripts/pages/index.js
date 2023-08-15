// import { recipeFactory } from "../factories/recipe.js";
// import { FindRecipesFromInputSearch, resultMainSearch } from "../utils/recipesFinder.js";
// import { ApplyFilters, PopulateListOfIngredientsFilters, PopulateListOfAppliancesFilters, PopulateListOfUstensilsFilters } from "../utils/tagManager.js";

/**
 * Récupération des recettes depuis le fichier JSON
 */
async function GetRecipesFromJson() {
    const reponse = await fetch("data/recipes.json");
    const recipes = await reponse.json();

    return recipes;
}

/** 
 * Affichage des recettes 
*/
function DisplayRecipes(recipes, value) {
    DisplayNbOfRescipes(recipes);

    const recipesSection = document.getElementById("recipes-container");
    recipesSection.innerHTML = "";

    if (recipes.length == 0) {
        recipesSection.innerHTML =
            "<h2> Aucune recette ne contient «" + value + "» vous pouvez chercher «tarte aux pommes », « poisson », etc.</h2>";
    } else {
        recipes.forEach((recipe) => {
            const recipeModel = recipeFactory(recipe);
            const recipeDOM = recipeModel.getRecipeDOM();
            recipesSection.appendChild(recipeDOM);
        });
    }
}

/**
 * affiche nb de recettes
 */
function DisplayNbOfRescipes(recipes) {
    const nbRecettesHtml = document.getElementById("nb-recipes");

    const nbRecettes = recipes.length;
    if (nbRecettes == 1) {
        nbRecettesHtml.innerText = nbRecettes + " recette";
    } else if (nbRecettes > 1) {
        nbRecettesHtml.innerText = nbRecettes + " recettes";
    } else {
        nbRecettesHtml.innerText = nbRecettes + " recettes";
    }
}

/**
 * ajout d'EventListeners
 */
function EventListeners() {
    const cancel_btn = document.getElementById("cancel");
    cancel_btn.addEventListener("click", CancelMainSearchInput);

    const search_bar_input = document.getElementById("search_bar_input");

    search_bar_input.addEventListener("keyup", Search);

    DisparitionBtnCancel();
}

/**
 * Récupère toutes les recettes et les affiche
 */
async function init() {
    EventListeners();
    const recipesJson = await GetRecipesFromJson();
    DisplayRecipes(recipesJson.recipes, "");
    PopulateFilters(recipesJson);
}

init();

/**
 * remplie les listes de filtres dispo
 */
function PopulateFilters(recipesJson) {
    PopulateListOfIngredientsFilters(recipesJson.recipes);
    PopulateListOfAppliancesFilters(recipesJson.recipes);
    PopulateListOfUstensilsFilters(recipesJson.recipes);
}
