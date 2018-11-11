const introButton = document.getElementById("desc-btn");
const schoolButton = document.getElementById("school-btn");
const workButton = document.getElementById("work-btn");

const introP = document.getElementsByClassName("desc")[0];
const schoolP = document.getElementsByClassName("school")[0];
const workP = document.getElementsByClassName("work")[0];

introButton.addEventListener("click", () => {
    introP.style.display = "block";
    schoolP.style.display = "none";
    workP.style.display = "none";
});

schoolButton.addEventListener("click", () => {
    introP.style.display = "none";
    schoolP.style.display = "block";
    workP.style.display = "none";    
});

workButton.addEventListener("click", () => {
    introP.style.display = "none";
    schoolP.style.display = "none";
    workP.style.display = "block";    
})