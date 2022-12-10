let toggleBar = document.querySelector(".toggle__house");
let toggleX = document.querySelector(".new__house");
let topNavigation = document.querySelector(".top__navigation ");

toggleBar.addEventListener("click", () => {
    document.body.style.overflowY = 'hidden';
    topNavigation.style.display = "grid";
})
toggleX.addEventListener("click", () => {
    document.body.style.overflowY = 'scroll';
    topNavigation.style.display = "none";
})