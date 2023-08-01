/** pattern factory */
function tagFactory(tagName, type) {
    // tag constructor
    function getTagDOM() {
        const tag = document.createElement("div");
        tag.setAttribute("class", "tag");
        tag.innerText = tagName;
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn-tag");
        btn.addEventListener("click", ClickCancelTag);
        btn.name = tagName;
        btn.codeTag = type;

        const srOnly = document.createElement("div");
        srOnly.setAttribute("class", "sr-only");
        srOnly.innerText = "annuler";
        const icon = document.createElement("span");
        icon.setAttribute("class", "bi bi-x-lg");

        tag.appendChild(btn);
        btn.appendChild(srOnly);
        btn.appendChild(icon);

        return (tag);
    }
    return { getTagDOM };
}