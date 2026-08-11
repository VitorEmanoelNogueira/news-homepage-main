// DOM Elements
const skipLink = document.querySelector(".c-skip-link");
const logoBrand = document.querySelector(".c-header__brand");
const openNavButton = document.querySelector("[data-nav-open]");
const closeNavButton = document.querySelector("[data-nav-close]");
const navMenu = document.getElementById("nav-menu");
const navLinks = navMenu.querySelectorAll("a");
const backdrop = document.querySelector(".c-backdrop");
const main = document.getElementById("main-content");
const footer = document.querySelector(".attribution");

let isMenuOpen = false;

// EVENT LISTENERS
openNavButton.addEventListener("click", () => openMenu());
closeNavButton.addEventListener("click", () => closeMenu());
navLinks.forEach((link) => {
    link.addEventListener("click", () =>{
        if(isMenuOpen){
            closeMenu();
        }
    })
})
backdrop.addEventListener("click", () => closeMenu());
document.addEventListener("keydown", (e) =>{
    if(e.key === "Escape" && isMenuOpen){
        closeMenu();
    }
} );

// DOM HANDLERS
function openMenu(){
    isMenuOpen = true;

    navMenu.classList.add("is-open");
    backdrop.classList.add("is-active");
    openNavButton.setAttribute("aria-expanded", "true");
    togglePageInert();

    closeNavButton.focus();
}

function closeMenu() {
    isMenuOpen = false;

    navMenu.classList.remove("is-open");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        navMenu.classList.add("is-closing");
        navMenu.addEventListener("transitionend", handleTransitionEnd);
    }

    backdrop.classList.remove("is-active");
    openNavButton.setAttribute("aria-expanded", "false");
    togglePageInert();
    openNavButton.focus();
}

function togglePageInert(){
    skipLink.toggleAttribute("inert");
    logoBrand.toggleAttribute("inert");
    openNavButton.toggleAttribute("inert");
    main.toggleAttribute("inert");
    footer.toggleAttribute("inert");
}

function handleTransitionEnd(e){
    if(e.propertyName === "transform"){
        navMenu.classList.remove("is-closing");
        navMenu.removeEventListener("transitionend", handleTransitionEnd);
    }
}