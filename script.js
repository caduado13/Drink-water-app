const buttons = document.querySelectorAll(".buttons .value-btns");
const drinkBtn = document.querySelector("#drink-btn");
const drinkedSpan = document.querySelector(".drinked-span");
const progress = document.querySelector(".progress-bar .progress");
const goalBtn = document.querySelector("#set-goal");
const goalInput = document.querySelector("#goal-number");
const goalSpan = document.querySelector(".goal-span");
const main = document.querySelector(".main-content");
const progressSpandrinked = document.querySelector(".progress-span-drinked")
const progressSpangoal = document.querySelector(".progress-span-goal")

let drink = 0;
let drinked = 0;
let goalDay = 0;
let formatedDrink = 0;

let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
if(hour == 0 && minute == 0){
    localStorage.removeItem("goal-day")
    localStorage.removeItem("drinked-day")
    window.alert("it's midnight now, the page will reload reseting all values!")
    location.reload();
}
console.log(hour, minute)
onload = () =>{
    let goalStorage = JSON.parse(localStorage.getItem("goal-day"));
    let drinkStorage = JSON.parse(localStorage.getItem("drinked-day"));
    
    if(goalStorage > 0){
        goalDay = goalStorage;
        drinked = drinkStorage;
        formatedDrink = drinkStorage < 1000 ? `${drinkStorage} ML` : `${drinkStorage/1000} L`
        progress.style.width = `${Math.floor((drinkStorage * 100)/goalDay)}%`
        appearMain(goalStorage);
    }
    if(drinkStorage == null){
        progressSpandrinked.innerText = `${drink} L`;
        drinkedSpan.innerText = `${drink} L`;
    }
}

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
        addDrinkLS(drinked);
        let drinkStorage = JSON.parse(localStorage.getItem("drinked-day"));
        formatedDrink = drinkStorage < 1000 ? `${drinkStorage} ML` : `${drinkStorage/1000} L`;
        drinkedSpan.innerText = formatedDrink
        goalSpan.innerText = `${goalDay/1000} L`;
        progress.style.width = `${Math.floor((drinkStorage * 100)/goalDay)}%`
    };

    progressSpandrinked.innerText = formatedDrink;
}

function changeClass(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains("pressed")){
            buttons[i].classList.remove("pressed")
        }
    }
}

function setGoal(){  
    goalDay = goalInput.value * 1000; 
    addGoalLS(goalDay)
    appearMain(goalInput.value*1000)
}

function appearMain(span){
    main.style.opacity = "1"
    drinkedSpan.innerText = formatedDrink;
    goalSpan.innerText = `${span/1000} L`;
    progressSpandrinked.innerText = formatedDrink;
    progressSpangoal.innerText = goalDay/1000 + "L";
}

function addGoalLS(add){
    localStorage.setItem("goal-day", JSON.stringify(add))
}
function addDrinkLS(add){
    localStorage.setItem("drinked-day", JSON.stringify(add))
}

goalBtn.addEventListener("click", setGoal)
drinkBtn.addEventListener("click", addDrinked)