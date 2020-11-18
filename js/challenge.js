
let counterNum = 0;
let timer;
let likes = [];
let comments = [];

// Constants
const counterElement = document.querySelector("#counter");
const likesElement = document.querySelector(".likes");
const commentDiv = document.querySelector("#list");
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");
const heart = document.querySelector("#heart");
const pause = document.querySelector("#pause");

// Counter Functions
function startCounter(){
  counterNum = 0;
  startEvents();
  timer = setInterval(function(){
    counterNum += 1;
    displayCounterAndLikes();
  }, 1000);
}

function stopCounter(){
  clearInterval(timer);
  endEvents();
}

function pauseCounter(){
  if(pause.innerText === "pause"){
    stopCounter();
    pause.innerText = "resume";
  }else{
    startCounter();
    pause.innerText = "pause";
  }
}

function incrementCounter(){
  counterNum += 1;
  displayCounterAndLikes()
}

function decrementCounter(){
  if (counterNum > 0){
    counterNum -= 1;
  }
  displayCounterAndLikes();
}

// Helper Functions
function changeText(element, text){
  element.innerText = text;
}

function displayCounterAndLikes(){
  changeText(counterElement, counterNum);
  displayLikes(counterNum);
}

function likeNumber(){
  let number = counterElement.innerText;

  if (likes[number] > 0){
    likes[number] += 1;
  }else {
    likes[number] = 1;
  }

  displayLikes(number)
}

function displayLikes(number){
  let likeNumber;
  if (likes[number] > 0){
    likeNumber = likes[number];
  }else {
    likeNumber = 0;
  }

  changeText(likesElement, likeNumber);
}


// Comments

function listComments(){
  comments.forEach((comment, i) => {
    let p = document.createElement("p")
  //  p.appendChild(commentDiv);
    commentDiv.insertAdjacentElement('beforeEnd', p)
    changeText(p, comment);
  });

}

function parseComments(){
  const urlParams = new URLSearchParams(window.location.search);
  let comment = urlParams.get("comment");
  comments.push(comment);
}

// Events

function startEvents(){
  minus.addEventListener("click", decrementCounter);
  plus.addEventListener("click", incrementCounter);
  heart.addEventListener("click", likeNumber);
}

function endEvents(){
  minus.removeEventListener("click", decrementCounter);
  plus.removeEventListener("click", incrementCounter);
  heart.removeEventListener("click", likeNumber);
}

startEvents();
pause.addEventListener("click", pauseCounter);
parseComments();
listComments();
startCounter();
