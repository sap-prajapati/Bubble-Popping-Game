const output = document.querySelector('.output');
const scoreBoard = makeElement('div', output, 'scoreBoard', 'Score');
const gameBoard = makeElement('div', output, 'gameBoard', 'Game');
const message = makeElement('div', output, 'message', 'Hover on bubbles');
const btn = makeElement('button', output, 'btn', 'ClicktoStart');

const game = {
    score : 0,
    ani : {},
    total : 0,
    counter : 0,
    ready : 0
}

btn.addEventListener('click',startGame);

function startGame(){
    btn.style.display = 'none';
    game.score =0;
    game.total = 20;
    game.counter =0;
    game.ready = 0;
    gameBoard.innerHTML = '';
    message.innerHTML = 'Click the Bubble';
    scoreaupdator();
    game.ani = requestAnimationFrame(mover);

}

function scoreaupdator(){
    scoreBoard.innerHTML = `Your score is ${game.score}`;
    message.innerHTML = `Bubble left ${game.ready - game.counter}`;
}

function getBubbles(){
   
        scoreaupdator();
        const bubble = makeElement('div', output, 'bubble', 'B');
        const cSize = gameBoard.getBoundingClientRect();
        gameBoard.append(bubble);
        bubble.speed = ran(1,5);
        bubble.style.backgroundColor = `rgba(${ran(0,225)}, ${ran(0,225)}, ${ran(0,225)}, ${ran(0,225)})`;
        bubble.style.transform = `scale(${ran(0.5,3)})`;
        bubble.style.left = ran(0, (cSize.width-30)) + 'px';
        bubble.style.top = ran(0, 500) + 500 + 'px';
        bubble.addEventListener('mouseover',(e)=>{
         game.score += 1;
         game.counter++;
         scoreaupdator();
         bubble.remove();
         if((game.ready - game.counter ) ==0){
            message.innerHTML = `Game over`;
            cancelAnimationFrame(game.ani);
            btn.style.display = 'block';
         }
        });

}

function mover(){
    if(game.ready < game.total){
        game.ready++;    
        getBubbles();
    }
    const allBubbles = document.querySelectorAll('.bubble');
    allBubbles.forEach((bubble) =>{
        const pos = [bubble.offsetLeft, bubble.offsetTop];
       // console.log(pos);
        const speed = bubble.speed;
        pos[1]-=speed;
        if(pos[1]<-100)
        {
            bubble.remove();
            game.score--;
            getBubbles();
            scoreaupdator();
        }
        bubble.style.top = pos[1] + 'px';
        bubble.style.left = pos[0] + 'px';
    })
    game.ani = requestAnimationFrame(mover);

}

function ran(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

function makeElement(elType, elParent, elClass, elHtml){
    const ele = document.createElement(elType);
    elParent.appendChild(ele);
    ele.classList.add(elClass);
    ele.innerHTML = elHtml;
    return ele;
}
