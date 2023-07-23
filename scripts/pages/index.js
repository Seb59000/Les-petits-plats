let btnCancelHidden = false;
/** 
 * Affichage de toutes les recettes 
*/
function DisplayAllRecipes() {
    const recipesSection = document.getElementById("recipes-container");

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
    const search_btn = document.getElementById("search-btn");
    search_btn.addEventListener("click", ClickSearch);

    const cancel_btn = document.getElementById("cancel");
    cancel_btn.addEventListener("click", Cancel);

    const search_bar_input = document.getElementById("search_bar_input");
    search_bar_input.addEventListener("keyup", ApparitionBtnCancel);

    DisparitionBtnCancel();
}

/**
 * click sur btn recherche
 */
function ClickSearch() {
    const search_input = document.getElementById("search_bar_input");
    if (search_input.value != "" && search_input.value.length > 2) {
        DisplayRecipes(FindRecipeFromInputSearch(search_input.value), search_input.value);
    }
}

/**
 * click sur btn annuler
 */
function Cancel() {
    const search_input = document.getElementById("search_bar_input");
    search_input.value = "";

    DisparitionBtnCancel();
    DisplayAllRecipes();
}

/**
 * apparition du btn annuler
 */
function ApparitionBtnCancel() {
    const search_bar_input = document.getElementById("search_bar_input");
    if (search_bar_input.value == "") {
        DisparitionBtnCancel();
    } else if (btnCancelHidden) {
        const cancel_btn = document.getElementById("cancel");
        cancel_btn.style["display"] = "block";
        btnCancelHidden = false;
    }
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
function init() {
    DisplayNbOfRescipes(recipes);
    DisplayAllRecipes();
    EventListeners();
}

init();