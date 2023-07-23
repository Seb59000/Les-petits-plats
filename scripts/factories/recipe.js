/** pattern factory */
function recipeFactory(data) {
    const { image, name, servings, ingredients, time, description, appliance, ustensils } = data;

    // recettes constructor
    function getRecipeDOM() {
        const cardContainer = document.createElement("div");
        cardContainer.setAttribute("class", "col");

        const card = document.createElement("figure");
        card.setAttribute("class", "card");

        const timeHtml = document.createElement("div");
        timeHtml.setAttribute("class", "card-time");
        timeHtml.innerText = time + "min";

        let img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("alt", name);
        let picture = `assets/images/photos/${image}`;
        img.setAttribute("src", picture);

        const figcaption = document.createElement("figcaption");
        figcaption.setAttribute("class", "card-body");

        const h2 = document.createElement("h2");
        h2.setAttribute("class", "card-title");
        h2.innerText = name;

        const h3 = document.createElement("h3");
        h3.setAttribute("class", "card-title");
        h3.innerText = "RECETTE";

        const p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerText = description;

        const h3_2 = document.createElement("h3");
        h3_2.setAttribute("class", "card-title");
        h3_2.innerText = "INGRÉDIENTS";

        const ingredientsHtml1 = document.createElement("div");
        ingredientsHtml1.setAttribute("class", "row");

        const ingredientsHtml2 = document.createElement("div");
        ingredientsHtml2.setAttribute("class", "row");

        const ingredientsHtml3 = document.createElement("div");
        ingredientsHtml3.setAttribute("class", "row");

        let row = 0;
        let endOfRow = true;
        ingredients.forEach(ingredient => {
            const div = document.createElement("div");
            div.setAttribute("class", "col-6");

            const p = document.createElement("p");
            p.setAttribute("class", "card-text");
            p.innerText = ingredient.ingredient;

            const p2 = document.createElement("p");
            p2.setAttribute("class", "card-text");
            p2.setAttribute("class", "text-muted");
            if (ingredient.quantity == null) {
                p2.innerText = "-";
            } else {
                p2.innerText = ingredient.quantity;
                if (ingredient.unit != null) {
                    p2.innerText += " " + ingredient.unit;
                }
            }

            div.appendChild(p);
            div.appendChild(p2);

            if (endOfRow) {
                row++;
            }
            endOfRow = !endOfRow;

            switch (row) {
                case 1:
                    ingredientsHtml1.appendChild(div);
                    break;
                case 2:
                    ingredientsHtml2.appendChild(div);
                    break;
                case 3:
                    ingredientsHtml3.appendChild(div);
                    break;
                default:
                    break;
            }
        });

        cardContainer.appendChild(card);
        card.appendChild(timeHtml);
        card.appendChild(img);
        card.appendChild(figcaption);
        figcaption.appendChild(h2);
        figcaption.appendChild(h3);
        figcaption.appendChild(p);
        figcaption.appendChild(h3_2);
        figcaption.appendChild(ingredientsHtml1);
        figcaption.appendChild(ingredientsHtml2);
        figcaption.appendChild(ingredientsHtml3);

        return (cardContainer);
    }
    return { getRecipeDOM };
}