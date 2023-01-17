const buttons = document.querySelectorAll(".buttons .value-btns");
const drinkBtn = document.querySelector("#drink-btn");
const drinkedSpan = document.querySelector(".drinked-span");
const progress = document.querySelector(".progress-bar .progress");
const goalBtn = document.querySelector("#set-goal");
const goalInput = document.querySelector("#goal-number");
const goalSpan = document.querySelector(".goal-span");
const main = document.querySelector(".main-content");
const progressSpandrinked = document.querySelector(".progress-span-drinked");
const progressSpangoal = document.querySelector(".progress-span-goal");

let drink = 0;
let drinked = 0;
let goalDay = 0;
let formatedDrink = 0;
let now = new Date();

function removeLS(goal, drink){
    if(goal !== null && goal[1] !== now.getDate()){
        localStorage.removeItem("goal-day")
    }else{
        return;
    }
    if(drink !== null && drink[1] !== now.getDate()){
        localStorage.removeItem("drinked-day")
    }else{
        return;
    }
};

onload = () =>{
    let goalStorage = JSON.parse(localStorage.getItem("goal-day"));
    let drinkStorage = JSON.parse(localStorage.getItem("drinked-day")); 
    removeLS(goalStorage, drinkStorage);
    if(goalStorage[0] > 0){  
        goalDay = goalStorage[0];
        appearMain(goalStorage[0]);
        drinked = drinkStorage[0];
        formatedDrink = drinkStorage[0] < 1000 ? `${drinkStorage[0]} ML` : `${drinkStorage[0]/1000} L`
        progress.style.width = `${Math.floor((drinkStorage[0] * 100)/goalDay)}%`;
        drinkedSpan.innerText = formatedDrink;
        progressSpandrinked.innerText = formatedDrink;
    }
    
    if(drinkStorage == null){
        progressSpandrinked.innerText = `${drink} L`;
        drinkedSpan.innerText = `${drink} L`;
    }
};

buttons.forEach(el => {
    el.addEventListener("click", () => {
        drink = Number(el.value);
        changeClass()
        el.classList.add("pressed");
    });
});

function addDrinked(){
    if(goalDay > 0){
        drinked += drink;
        addDrinkLS(drinked, now.getDate());
        let drinkStorage = JSON.parse(localStorage.getItem("drinked-day"));
        formatedDrink = drinkStorage[0] < 1000 ? `${drinkStorage[0]} ML` : `${drinkStorage[0]/1000} L`;
        drinkedSpan.innerText = formatedDrink
        goalSpan.innerText = `${goalDay/1000} L`;
        progress.style.width = `${Math.floor((drinkStorage[0] * 100)/goalDay)}%`
    };

    progressSpandrinked.innerText = formatedDrink;
};

function changeClass(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains("pressed")){
            buttons[i].classList.remove("pressed");
        }
    }
};

function setGoal(){  
    goalDay = goalInput.value * 1000; 
    addGoalLS(goalDay, now.getDate())
    appearMain(goalInput.value*1000)
};

function appearMain(span){
    main.style.opacity = "1"
    drinkedSpan.innerText = formatedDrink;
    goalSpan.innerText = `${span/1000} L`;
    progressSpandrinked.innerText = formatedDrink;
    progressSpangoal.innerText = goalDay/1000 + "L";
};

function addGoalLS(add, day){
    let objStorage = [];
    objStorage.push(add)
    objStorage.push(day)
    localStorage.setItem("goal-day", JSON.stringify(objStorage));
    
};
function addDrinkLS(add, day){
    let arrayDrink = [];
    arrayDrink.push(add)
    arrayDrink.push(day)
    localStorage.setItem("drinked-day", JSON.stringify(arrayDrink))
};

goalBtn.addEventListener("click", setGoal);
drinkBtn.addEventListener("click", addDrinked);
drinkBtn.addEventListener("click", changeClass);