// NAVIGATION
function showScreen(screenId){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if(screenId==='game' && cards.length===0) initGame();
}

// LETTER
function openLetter(){
    const envelope = document.querySelector('.envelope');
    const letter = document.getElementById('letterCard');
    envelope.classList.add('open');
    setTimeout(()=>{letter.classList.add('show');},600);
}

// MEMORY GAME
let cards=[];
let flippedCards=[];
let matchedPairs=0;
let moves=0;
let canFlip=true;
const emojis=['💕','💖','💗','💓','💝','💘','💞','❤️'];

function initGame(){
    const gameBoard=document.getElementById('gameBoard');
    gameBoard.innerHTML='';
    cards=[]; flippedCards=[]; matchedPairs=0; moves=0; canFlip=true;
    const cardEmojis=[...emojis,...emojis].sort(()=>Math.random()-0.5);
    cardEmojis.forEach((emoji,index)=>{
        const card=document.createElement('div');
        card.className='game-card';
        card.dataset.emoji=emoji;
        card.innerHTML=`<div class="card-back">❓</div><div class="card-front">${emoji}</div>`;
        card.onclick=()=>flipCard(card);
        gameBoard.appendChild(card);
        cards.push(card);
    });
    updateStats();
    document.getElementById('winMessage').classList.remove('show');
}

function flipCard(card){
    if(!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    flippedCards.push(card);
    if(flippedCards.length===2){
        canFlip=false; moves++; updateStats();
        setTimeout(checkMatch,600);
    }
}

function checkMatch(){
    const [c1,c2]=flippedCards;
    if(c1.dataset.emoji===c2.dataset.emoji){
        c1.classList.add('matched'); c2.classList.add('matched');
        matchedPairs++; updateStats();
        if(matchedPairs===emojis.length) setTimeout(()=>document.getElementById('winMessage').classList.add('show'),500);
    }else{
        setTimeout(()=>{c1.classList.remove('flipped'); c2.classList.remove('flipped');},400);
    }
    flippedCards=[]; canFlip=true;
}

function updateStats(){
    document.getElementById('moves').textContent=moves;
    document.getElementById('matches').textContent=`${matchedPairs}/${emojis.length}`;
}

function resetGame(){initGame();}
