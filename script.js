const buttons = document.querySelectorAll(".buttons .value-btns");
const drinkBtn = document.querySelector("#drink-btn");
const drinkedSpan = document.querySelector(".drinked-span");
const progress = document.querySelector(".progress-bar .progress");
const goalBtn = document.querySelector("#set-goal");
const goalInput = document.querySelector("#goal-number");
const goalSpan = document.querySelector(".goal-span");
const main = document.querySelector(".main-content");
const progressSpandrinked = document.querySelector(".progress-spandrinked")
const progressSpangoal = document.querySelector(".progress-spangoal")


let drink = 0;
let drinked = 0;
let goalDay = 0;

buttons.forEach(el => {
    el.addEventListener("click", () => {
        drink = Number(el.value);
        changeClass()
        el.classList.add("pressed");
    })
});

function addDrinked(){
    if(goalDay > 0){
        drinked += drink;
        drinkedSpan.innerText = drinked < 1000 ? `${drinked}ML` : `${drinked/1000}L`
        goalSpan.innerText = `${goalInput.value}L`;
        progress.style.width = `${Math.floor((drinked * 100)/goalDay)}%`
    };
    progressSpandrinked.innerText = drinked+"L";
}

function changeClass(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains("pressed")){
            buttons[i].classList.remove("pressed")
        }
    }
}

function setGoal(){
    main.style.opacity = "1"
    drinkedSpan.innerText = drinked < 1000 ? `${drinked}ML` : `${drinked/1000}L`
    goalSpan.innerText = `${goalInput.value}L`;
    goalDay = goalInput.value * 1000;
    progressSpandrinked.innerText = drinked+"L";
    progressSpangoal.innerText = goalDay+"L"
    
}

goalBtn.addEventListener("click", setGoal)
drinkBtn.addEventListener("click", addDrinked)