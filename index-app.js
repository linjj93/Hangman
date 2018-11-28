const introButton = document.getElementById("desc-btn");
const schoolButton = document.getElementById("school-btn");
const workButton = document.getElementById("work-btn");

const introP = document.getElementsByClassName("desc")[0];
const schoolP = document.getElementsByClassName("school")[0];
const workP = document.getElementsByClassName("work")[0];

introButton.addEventListener("click", () => {
    introButton.style.backgroundColor = "white";
    introButton.style.color = "black";
    introP.style.display = "block";
    schoolP.style.display = "none";
    workP.style.display = "none";
    schoolButton.style = "initial";
    workButton.style = "initial";
});

schoolButton.addEventListener("click", () => {
    schoolButton.style.backgroundColor = "white";
    schoolButton.style.color = "black";
    introP.style.display = "none";
    schoolP.style.display = "block";
    workP.style.display = "none";
    introButton.style = "initial";
    workButton.style = "initial";    
});

workButton.addEventListener("click", () => {
    workButton.style.backgroundColor = "white";
    workButton.style.color = "black";
    introP.style.display = "none";
    schoolP.style.display = "none";
    workP.style.display = "block";    
    introButton.style = "initial";
    schoolButton.style = "initial";
})

