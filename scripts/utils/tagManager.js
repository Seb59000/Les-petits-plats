let btnIngredientCancelHidden = false;
let listOfTagIngredient = [];

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
    listOfTagIngredient = [];
    recipes.forEach((recipe) => {
        const length = recipe.ingredients.length;
        for (let index = 0; index < length; index++) {
            AddToListOfIngredientsFilters(recipe.ingredients[index].ingredient);
        }
    });
    listOfTagIngredient.sort();
    DisplayIngredientsFilters();
}

/**
 * ajout des ingredients à la liste des tag ingrédients
 */
function AddToListOfIngredientsFilters(ingredient) {
    if (!listOfTagIngredient.includes(ingredient)) {
        listOfTagIngredient.push(ingredient);
    }
}

/**
 * affichage des ingredients de la liste des tag ingrédients
 */
function DisplayIngredientsFilters() {
    const filtersIngredients = document.getElementById("dropdown-list-ingredients");
    filtersIngredients.innerHTML = "";
    const ul = document.createElement("ul");

    listOfTagIngredient.forEach(ingredient => {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerText = ingredient;
        li.appendChild(btn);
        ul.appendChild(li);
    });
    filtersIngredients.appendChild(ul);
}

/**
 * initialisation des filtres
 */
function Init() {
    EventListeners();
    DisparitionBtnCancelIngredients();
}

Init();