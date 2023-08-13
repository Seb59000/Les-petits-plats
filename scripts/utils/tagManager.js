let btnIngredientCancelHidden = false;
let listOfFiltersIngredient = [];
let listOfTagsIngredient = [];

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function ShowIngredientsDropDown() {
    document.getElementById("ingredients-dropdown").classList.toggle("show");
    document.getElementById("ingredients-chevron-down").classList.toggle("hide");
    document.getElementById("ingredients-chevron-up").classList.toggle("show-inline");
}

/**
 * ajout d'EventListeners
 */
function EventListeners() {
    const ingredientsDropbtn = document.getElementById("ingredients-dropbtn");
    ingredientsDropbtn.addEventListener("click", ShowIngredientsDropDown);

    const cancel_btn = document.getElementById("cancel-ingredient");
    cancel_btn.addEventListener("click", CancelIngredients);

    const search_ingredient_input = document.getElementById("ingredientTag");
    search_ingredient_input.addEventListener("keyup", SearchIngredients);
}

/**
 * click sur btn annuler ingredients
 */
function CancelIngredients() {
    const search_input = document.getElementById("ingredientTag");
    search_input.value = "";

    SearchIngredients();
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
 * Disparition du btn annuler
 */
function DisparitionBtnCancelIngredients() {
    const cancel_btn = document.getElementById("cancel-ingredient");
    cancel_btn.style["display"] = "none";
    btnIngredientCancelHidden = true;
    document.getElementById("mag-ingredient").classList.toggle("mag-big");
}

/**
 * fonction de recherche d'ingredients
 */
function SearchIngredients() {
    var input, filter, btn, i;
    input = document.getElementById("ingredientTag");
    if (input.value == "") {
        DisparitionBtnCancelIngredients();
    } else {
        if (btnIngredientCancelHidden) {
            ApparitionBtnAnnulerIngredients();
        }
    }
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdown-list-ingredients");
    btn = div.getElementsByTagName("button");
    for (i = 0; i < btn.length; i++) {
        txtValue = btn[i].textContent || btn[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            btn[i].style.display = "";
        } else {
            btn[i].style.display = "none";
        }
    }
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
 * ajout des ingredients à la liste des tag ingrédients
 */
function AddToListOfIngredientsFilters(ingredient) {
    if (!listOfFiltersIngredient.includes(ingredient)) {
        listOfFiltersIngredient.push(ingredient);
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
 * click ajout tags (ingredient, ustensile, appliance)
 */
function ClickOnFilter(event) {
    switch (event.currentTarget.codeTag) {
        // ingredients
        case "ingredient":
            // rech si tag est pas dejà dans la liste
            if (!listOfTagsIngredient.includes(event.currentTarget.name)) {
                listOfTagsIngredient.push(event.currentTarget.name);
                const sectionTags = document.getElementById("tags");
                const tagModel = tagFactory(event.currentTarget.name, event.currentTarget.codeTag);
                const tagDOM = tagModel.getTagDOM();
                sectionTags.appendChild(tagDOM);

            }
            break;

        default:
            break;
    }

}

/**
 * click sur btn cancel du tag
 */
function ClickCancelTag(event) {
    switch (event.currentTarget.codeTag) {
        case "ingredient":
            const indexToRemove = listOfTagsIngredient.indexOf(event.currentTarget.name);
            listOfTagsIngredient.splice(indexToRemove, 1);
            break;

        default:
            break;
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
}

/**
 * initialisation des filtres
 */
function Init() {
    EventListeners();
    DisparitionBtnCancelIngredients();
}

Init();