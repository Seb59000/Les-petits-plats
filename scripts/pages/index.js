let btnCancelHidden = false;

/**
 * Récupération des recettes depuis le fichier JSON
 */
async function GetRecipesFromJson() {
    const reponse = await fetch("data/recipes.json");
    const recipes = await reponse.json();

    return recipes;
}

/** 
 * Affichage de toutes les recettes 
*/
function DisplayAllRecipes(recipes) {
    const recipesSection = document.getElementById("recipes-container");
    recipesSection.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipesSection.appendChild(recipeDOM);
    });
}

/** 
 * Affichage les recettes 
*/
function DisplayRecipes(recipes, value) {
    DisplayNbOfRescipes(recipes);

    const recipesSection = document.getElementById("recipes-container");
    recipesSection.innerHTML = "";

    if (recipes.length == 0) {
        recipesSection.innerHTML =
            "<h2> Aucune recette ne contient «" + value + "» vous pouvez chercher «tarte aux pommes », « poisson », etc.</h2>"
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
            DisplayRecipes(filteredRecipes, search_input.value);
            PopulateListOfIngredientsFilters(filteredRecipes);
        }
    }
}

/**
 * click sur btn annuler main search_bar
 */
async function CancelMainSearchInput() {
    const search_input = document.getElementById("search_bar_input");
    search_input.value = "";

    const recipesJson = await GetRecipesFromJson();

    DisparitionBtnCancel();
    DisplayNbOfRescipes(recipesJson.recipes);
    DisplayAllRecipes(recipesJson.recipes);
    PopulateListOfIngredientsFilters(recipesJson.recipes);
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
 * Récupère toutes les recettes
 */
async function init() {
    EventListeners();
    const recipesJson = await GetRecipesFromJson();
    DisplayNbOfRescipes(recipesJson.recipes);
    DisplayAllRecipes(recipesJson.recipes);
    PopulateListOfIngredientsFilters(recipesJson.recipes);
}

init();