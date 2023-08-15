import { DisplayRecipes, GetRecipesFromJson } from "../pages/index.js";
import { tagFactory } from "../factories/tags.js";
import { resultMainSearch } from "./inputManager.js";

let btnIngredientCancelHidden = false;
let btnApplianceCancelHidden = false;
let btnUstensilCancelHidden = false;
let listOfFiltersIngredient = [];
let listOfFiltersAppliance = [];
let listOfFiltersUstensils = [];
let listOfTagsIngredient = [];
let tagAppliance = "";
let listOfTagsUstensils = [];

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function ShowIngredientsDropDown() {
    document.getElementById("ingredients-dropdown").classList.toggle("show");
    document.getElementById("ingredients-chevron-down").classList.toggle("hide");
    document.getElementById("ingredients-chevron-up").classList.toggle("show-inline");
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function ShowApplianceDropDown() {
    document.getElementById("appliance-dropdown").classList.toggle("show");
    document.getElementById("appliance-chevron-down").classList.toggle("hide");
    document.getElementById("appliance-chevron-up").classList.toggle("show-inline");
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function ShowUstensilsDropDown() {
    document.getElementById("ustensils-dropdown").classList.toggle("show");
    document.getElementById("ustensils-chevron-down").classList.toggle("hide");
    document.getElementById("ustensils-chevron-up").classList.toggle("show-inline");
}

/**
 * ajout d'EventListeners
 */
function EventListenersFilters() {
    const ingredientsDropbtn = document.getElementById("ingredients-dropbtn");
    ingredientsDropbtn.addEventListener("click", ShowIngredientsDropDown);
    const applianceDropbtn = document.getElementById("appliance-dropbtn");
    applianceDropbtn.addEventListener("click", ShowApplianceDropDown);
    const ustensilsDropbtn = document.getElementById("ustensils-dropbtn");
    ustensilsDropbtn.addEventListener("click", ShowUstensilsDropDown);

    const cancel_btn = document.getElementById("cancel-ingredient");
    cancel_btn.addEventListener("click", CancelIngredients);
    const cancel_btn_appliance = document.getElementById("cancel-appliance");
    cancel_btn_appliance.addEventListener("click", CancelAppliances);
    const cancel_btn_ustensil = document.getElementById("cancel-ustensils");
    cancel_btn_ustensil.addEventListener("click", CancelUstensils);

    const search_ingredient_input = document.getElementById("ingredient-search");
    search_ingredient_input.addEventListener("keyup", SearchIngredients);
    const search_appliance_input = document.getElementById("appliance-search");
    search_appliance_input.addEventListener("keyup", SearchAppliance);
    const search_ustensils_input = document.getElementById("ustensils-search");
    search_ustensils_input.addEventListener("keyup", SearchUstensil);
}

/**
 * click sur btn annuler ingredients
 */
function CancelIngredients() {
    const search_input = document.getElementById("ingredient-search");
    search_input.value = "";

    SearchIngredients();
}

/**
 * click sur btn annuler appareils
 */
function CancelAppliances() {
    const search_input = document.getElementById("appliance-search");
    search_input.value = "";

    SearchAppliance();
}

/**
 * click sur btn annuler ustensiles
 */
function CancelUstensils() {
    const search_input = document.getElementById("ustensils-search");
    search_input.value = "";

    SearchUstensil();
}

/**
 * apparition du btn annuler
 */
function ApparitionBtnAnnulerIngredients() {
    const cancel_btn = document.getElementById("cancel-ingredient");
    cancel_btn.style["display"] = "block";
    btnIngredientCancelHidden = false;
    document.getElementById("mag-ingredient").classList.toggle("mag-big");
}

/**
 * apparition du btn annuler
 */
function ApparitionBtnAnnulerAppliance() {
    const cancel_btn = document.getElementById("cancel-appliance");
    cancel_btn.style["display"] = "block";
    btnApplianceCancelHidden = false;
    document.getElementById("mag-appliance").classList.toggle("mag-big");
}

/**
 * apparition du btn annuler
 */
function ApparitionBtnAnnulerUstensils() {
    const cancel_btn = document.getElementById("cancel-ustensils");
    cancel_btn.style["display"] = "block";
    btnUstensilCancelHidden = false;
    document.getElementById("mag-ustensils").classList.toggle("mag-big");
}

/**
 * Disparition du btn annuler
 */
function DisparitionBtnCancelIngredients() {
    const cancel_btn = document.getElementById("cancel-ingredient");
    cancel_btn.style["display"] = "none";
    btnIngredientCancelHidden = true;
    document.getElementById("mag-ingredient").classList.toggle("mag-big");
}

/**
 * Disparition du btn annuler
 */
function DisparitionBtnCancelAppliance() {
    const cancel_btn = document.getElementById("cancel-appliance");
    cancel_btn.style["display"] = "none";
    btnApplianceCancelHidden = true;
    document.getElementById("mag-appliance").classList.toggle("mag-big");
}

/**
 * Disparition du btn annuler
 */
function DisparitionBtnCancelUstensils() {
    const cancel_btn = document.getElementById("cancel-ustensils");
    cancel_btn.style["display"] = "none";
    btnUstensilCancelHidden = true;
    document.getElementById("mag-ustensils").classList.toggle("mag-big");
}

/**
 * fonction de recherche d'ingredients
 */
function SearchIngredients() {
    var input, filter, btn, i;
    input = document.getElementById("ingredient-search");
    if (input.value == "") {
        DisparitionBtnCancelIngredients();
    } else {
        if (btnIngredientCancelHidden) {
            ApparitionBtnAnnulerIngredients();
        }
    }
    filter = input.value.toUpperCase();
    let div = document.getElementById("dropdown-list-ingredients");
    btn = div.getElementsByTagName("button");
    for (i = 0; i < btn.length; i++) {
        let txtValue = btn[i].textContent || btn[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            btn[i].style.display = "";
        } else {
            btn[i].style.display = "none";
        }
    }
}

/**
 * fonction de recherche d'appareils
 */
function SearchAppliance() {
    var input, filter, btn, i;
    input = document.getElementById("appliance-search");
    if (input.value == "") {
        DisparitionBtnCancelAppliance();
    } else {
        if (btnApplianceCancelHidden) {
            ApparitionBtnAnnulerAppliance();
        }
    }
    filter = input.value.toUpperCase();
    let div = document.getElementById("dropdown-list-appliance");
    btn = div.getElementsByTagName("button");
    for (i = 0; i < btn.length; i++) {
        let txtValue = btn[i].textContent || btn[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            btn[i].style.display = "";
        } else {
            btn[i].style.display = "none";
        }
    }
}

/**
 * fonction de recherche d'ustensiles
 */
function SearchUstensil() {
    var input, filter, btn, i;
    input = document.getElementById("ustensils-search");
    if (input.value == "") {
        DisparitionBtnCancelUstensils();
    } else {
        if (btnUstensilCancelHidden) {
            ApparitionBtnAnnulerUstensils();
        }
    }
    filter = input.value.toUpperCase();
    let div = document.getElementById("dropdown-list-ustensils");
    btn = div.getElementsByTagName("button");
    for (i = 0; i < btn.length; i++) {
        let txtValue = btn[i].textContent || btn[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            btn[i].style.display = "";
        } else {
            btn[i].style.display = "none";
        }
    }
}

/**
 * remplie les listes de filtres dispo
 */
export function PopulateFilters(recipes) {
    PopulateListOfIngredientsFilters(recipes);
    PopulateListOfAppliancesFilters(recipes);
    PopulateListOfUstensilsFilters(recipes);
}

/**
 * remplissage de la liste des tag ingrédients 
 */
function PopulateListOfIngredientsFilters(recipes) {
    listOfFiltersIngredient = [];
    recipes.forEach((recipe) => {
        const length = recipe.ingredients.length;
        for (let index = 0; index < length; index++) {
            AddToListOfIngredientsFilters(recipe.ingredients[index].ingredient);
        }
    });
    listOfFiltersIngredient.sort();
    DisplayIngredientsFilters();
}

/**
 * remplissage de la liste des tag appareils 
 */
function PopulateListOfAppliancesFilters(recipes) {
    listOfFiltersAppliance = [];
    recipes.forEach((recipe) => {
        AddToListOfAppliancesFilters(recipe.appliance);
    });
    listOfFiltersAppliance.sort();
    DisplayApplianceFilters();
}

/**
 * remplissage de la liste des tag ustensils 
 */
function PopulateListOfUstensilsFilters(recipes) {
    listOfFiltersUstensils = [];
    recipes.forEach((recipe) => {
        const length = recipe.ustensils.length;
        for (let index = 0; index < length; index++) {
            AddToListOfUstensilsFilters(recipe.ustensils[index]);
        }
    });
    listOfFiltersUstensils.sort();
    DisplayUstensilsFilters();
}

/**
 * ajout des ingredients à la liste des tag ingrédients
 */
function AddToListOfIngredientsFilters(ingredient) {
    if (!listOfFiltersIngredient.includes(ingredient)) {
        listOfFiltersIngredient.push(ingredient);
    }
}

/**
 * ajout des appliance à la liste des tag appliance
 */
function AddToListOfAppliancesFilters(appliance) {
    if (!listOfFiltersAppliance.includes(appliance)) {
        listOfFiltersAppliance.push(appliance);
    }
}

/**
 * ajout des appliance à la liste des tag ustensiles
 */
function AddToListOfUstensilsFilters(ustensil) {
    if (!listOfFiltersUstensils.includes(ustensil)) {
        listOfFiltersUstensils.push(ustensil);
    }
}

/**
 * affichage des ingredients de la liste des tag ingrédients
 */
function DisplayIngredientsFilters() {
    const filtersIngredients = document.getElementById("dropdown-list-ingredients");
    filtersIngredients.innerHTML = "";
    const ul = document.createElement("ul");

    listOfFiltersIngredient.forEach(ingredient => {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerText = ingredient;
        btn.addEventListener("click", ClickOnFilter);
        btn.name = ingredient;
        btn.codeTag = "ingredient";
        li.appendChild(btn);
        ul.appendChild(li);
    });
    filtersIngredients.appendChild(ul);
}

/**
 * affichage des appareils de la liste des tag appareils
 */
function DisplayApplianceFilters() {
    const filtersAppliance = document.getElementById("dropdown-list-appliance");
    filtersAppliance.innerHTML = "";
    const ul = document.createElement("ul");

    listOfFiltersAppliance.forEach(appliance => {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerText = appliance;
        btn.addEventListener("click", ClickOnFilter);
        btn.name = appliance;
        btn.codeTag = "appliance";
        li.appendChild(btn);
        ul.appendChild(li);
    });
    filtersAppliance.appendChild(ul);
}

/**
 * affichage des appareils de la liste des tag ustensiles
 */
function DisplayUstensilsFilters() {
    const filtersUstensils = document.getElementById("dropdown-list-ustensils");
    filtersUstensils.innerHTML = "";
    const ul = document.createElement("ul");

    listOfFiltersUstensils.forEach(ustensil => {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerText = ustensil;
        btn.addEventListener("click", ClickOnFilter);
        btn.name = ustensil;
        btn.codeTag = "ustensil";
        li.appendChild(btn);
        ul.appendChild(li);
    });
    filtersUstensils.appendChild(ul);
}

/**
 * click ajout tags (ingredient, ustensile, appliance)
 */
async function ClickOnFilter(event) {
    let name = event.currentTarget.name;
    switch (event.currentTarget.codeTag) {
        // ingredients
        case "ingredient":
            // rech si tag est pas dejà dans la liste
            if (!listOfTagsIngredient.includes(name)) {
                // ajout à la liste des tags
                listOfTagsIngredient.push(name);
                // affichage du tag
                DisplayTag(event);
            }
            break;
        // appareil
        case "appliance":
            // rech si il y a pas de tag appliance
            if (tagAppliance == "") {
                // ajout à la liste des tags
                tagAppliance = name;
                // affichage du tag
                DisplayTag(event);
            }
            break;
        // ustensile
        case "ustensil":
            // rech si tag est pas dejà dans la liste
            if (!listOfTagsUstensils.includes(name)) {
                // ajout à la liste des tags ustensiles
                listOfTagsUstensils.push(name);
                // affichage du tag
                DisplayTag(event);
            }
            break;
        default:
            break;
    }
    // lancement de la recherche
    if (resultMainSearch.length == 0) {
        // si une recherche principale est dejà lancée
        const recipesJson = await GetRecipesFromJson();
        ApplyFilters(recipesJson.recipes, name);
    } else {
        ApplyFilters(resultMainSearch, name);
    }
}

/**
 * Affichage de tag
 */
function DisplayTag(event) {
    const sectionTags = document.getElementById("tags");
    const tagModel = tagFactory(event.currentTarget.name, event.currentTarget.codeTag);
    const tagDOM = tagModel.getTagDOM();
    sectionTags.appendChild(tagDOM);
}

/**
 * Applique les filtres à la recherche
 */
export async function ApplyFilters(recipes, lastFilterApplied) {
    const recipesIngredientFiltered = recipes.filter(FilterIngredients);
    let recipesApplianceFiltered;
    if (tagAppliance != "") {
        recipesApplianceFiltered = recipesIngredientFiltered.filter(FilterAppliances);
    } else {
        recipesApplianceFiltered = recipesIngredientFiltered;
    }
    const recipesUstensilsFiltered = recipesApplianceFiltered.filter(FilterUstensils);
    listOfTagsUstensils

    DisplayRecipes(recipesUstensilsFiltered, lastFilterApplied);
    PopulateFilters(recipesUstensilsFiltered);
}

/**
 * si un tag n'est pas présent dans la liste des ingredients de la recette on renvoie false
 */
function FilterIngredients(recipe) {
    // si tous les tags sont dans la recette 
    let argTrouve = listOfTagsIngredient.every(tag => {
        let tagDansRecette = false;
        let indexIngredient = 0;
        while (tagDansRecette == false & indexIngredient < recipe.ingredients.length) {
            if (recipe.ingredients[indexIngredient].ingredient == tag) {
                tagDansRecette = true;
            }
            indexIngredient++;
        }
        return tagDansRecette;
    });

    return argTrouve;
}

/**
 * si le tag n'est pas présent dans la liste des appliances on renvoie false
 */
function FilterAppliances(recipe) {
    return recipe.appliance == tagAppliance;
}

/**
 * si un tag n'est pas présent dans la liste des ingredients de la recette on renvoie false
 */
function FilterUstensils(recipe) {
    // si tous les tags sont dans la recette 
    let argTrouve = listOfTagsUstensils.every(tag => {
        let tagDansRecette = false;
        let indexUstensil = 0;
        while (tagDansRecette == false & indexUstensil < recipe.ustensils.length) {
            if (recipe.ustensils[indexUstensil] == tag) {
                tagDansRecette = true;
            }
            indexUstensil++;
        }
        return tagDansRecette;
    });

    return argTrouve;
}

/**
 * click sur btn cancel du tag
 */
export async function ClickCancelTag(event) {
    let name = event.currentTarget.name;
    switch (event.currentTarget.codeTag) {
        case "ingredient":
            // retrait de la liste des tags ingredients
            const indexToRemove = listOfTagsIngredient.indexOf(event.currentTarget.name);
            listOfTagsIngredient.splice(indexToRemove, 1);
            break;
        case "appliance":
            // retrait du tag
            tagAppliance = "";
            break;
        case "ustensil":
            // retrait de la liste des tags ustensiles
            const indexUstensilToRemove = listOfTagsUstensils.indexOf(event.currentTarget.name);
            listOfTagsUstensils.splice(indexUstensilToRemove, 1);
            break;
        default:
            break;
    }
    // lancement de la recherche
    if (resultMainSearch.length == 0) {
        // si une recherche principale est dejà lancée
        const recipesJson = await GetRecipesFromJson();
        ApplyFilters(recipesJson.recipes, name);
    } else {
        ApplyFilters(resultMainSearch, name);
    }
    DisplayAllTags();
}

/**
 * affichage de tous les tags
 */
function DisplayAllTags() {
    const tagsSection = document.getElementById("tags");
    tagsSection.innerHTML = "";
    // pour chaque ingredient
    listOfTagsIngredient.forEach(ingredient => {
        const tagModel = tagFactory(ingredient, "ingredient");
        const tagDOM = tagModel.getTagDOM();
        tagsSection.appendChild(tagDOM);
    });
    // pour chaque appareil
    if (tagAppliance != "") {
        const tagModel = tagFactory(tagAppliance, "appliance");
        const tagDOM = tagModel.getTagDOM();
        tagsSection.appendChild(tagDOM);
    }
    // pour chaque ustensil
    listOfTagsUstensils.forEach(ustensil => {
        const tagModel = tagFactory(ustensil, "ustensil");
        const tagDOM = tagModel.getTagDOM();
        tagsSection.appendChild(tagDOM);
    });
}

/**
 * initialisation des filtres
 */
export function InitFilters(recipes) {
    EventListenersFilters();
    DisparitionBtnCancelIngredients();
    DisparitionBtnCancelAppliance();
    DisparitionBtnCancelUstensils();
    PopulateFilters(recipes);
}