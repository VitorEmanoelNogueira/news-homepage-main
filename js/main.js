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

// State
const desktopQuery = window.matchMedia("(min-width: 34.375rem)");
let isMenuOpen = false;

// Event Listeners / Initialization
updateNavSemantics();
desktopQuery.addEventListener("change", updateNavSemantics);

openNavButton.addEventListener("click", openMenu);
closeNavButton.addEventListener("click", closeMenu);
navMenu.addEventListener("keydown", (e) =>{
    if (!isMenuOpen){
        return
    }
    trapMenuFocus(e);
})
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
function updateNavSemantics() {
    if (desktopQuery.matches) {
        if (isMenuOpen){
            closeMenu();
        }

        navMenu.removeAttribute("role");
        navMenu.removeAttribute("aria-modal");
    } else {
        navMenu.setAttribute("role", "dialog");
        navMenu.setAttribute("aria-modal", "false");
    }
}

function openMenu(){
    isMenuOpen = true;

    navMenu.classList.add("is-open");
    navMenu.setAttribute("aria-modal", "true");
    backdrop.classList.add("is-active");
    openNavButton.setAttribute("aria-expanded", "true");
    togglePageInert();

    closeNavButton.focus();
}

function closeMenu() {
    isMenuOpen = false;

    navMenu.classList.remove("is-open");
    navMenu.classList.add("is-closing");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        navMenu.addEventListener("transitionend", handleNavClose);
    } else {
        // Keep the drawer rendered briefly for screen reader processing.
        setTimeout(() => {
            navMenu.classList.remove("is-closing");
        }, 50)
    }

    navMenu.setAttribute("aria-modal", "false");
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

function handleNavClose(e) {
    if (e.propertyName !== "transform") {
        return;
    }

    navMenu.classList.remove("is-closing");
    navMenu.removeEventListener("transitionend", handleNavClose);
}

function trapMenuFocus(e){
    if (e.key !== "Tab"){
        return
    }

    const lastNavLink = navLinks[navLinks.length - 1];

    if (closeNavButton === document.activeElement && e.shiftKey){
        e.preventDefault();
        lastNavLink.focus();
        return
    }

    if (lastNavLink === document.activeElement && !e.shiftKey){
        e.preventDefault();
        closeNavButton.focus();
    }
}