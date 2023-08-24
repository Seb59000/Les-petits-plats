let btnCancelHidden = false;

/**
 * Récupération des recettes depuis le fichier JSON
 */
export async function GetRecipesFromJson() {
    const reponse = await fetch("data/recipes.json");
    const recipes = await reponse.json();

    return recipes;
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
 * Récupère toutes les recettes et les affiche
 */
async function init() {
    EventListenersMainSearch();
    const recipesJson = await GetRecipesFromJson();
    DisplayRecipes(recipesJson.recipes, "");
    InitFilters(recipesJson.recipes);
}

init();
