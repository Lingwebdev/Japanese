let vocab=[];

let index=0;

let autoplay=false;

fetch("data/vocabulary.json")

.then(res=>res.json())

.then(data=>{

vocab=data;

showWord();

});

function showWord(){

let item=vocab[index];

document.getElementById("word").innerHTML=item.word;

document.getElementById("hiragana").innerHTML=item.hiragana;

document.getElementById("romaji").innerHTML=item.romaji;

document.getElementById("english").innerHTML=item.english;

playSounds(item);

}

function playSounds(item){

let jp=new Audio("japanese/"+item.word+".mp3");

let en=new Audio("english/"+item.word+".mp3");

jp.play();

jp.onended=function(){

en.play();

}

en.onended=function(){

if(autoplay){

setTimeout(nextWord,1000);

}

}

}

function nextWord(){

index++;

if(index>=vocab.length)

index=0;

showWord();

}

function previousWord(){

index--;

if(index<0)

index=vocab.length-1;

showWord();

}

document.getElementById("next").onclick=nextWord;

document.getElementById("prev").onclick=previousWord;

document.getElementById("play").onclick=function(){

showWord();

};

document.getElementById("auto").onclick=function(){

autoplay=!autoplay;

this.innerHTML=autoplay?"Stop Auto":"Auto Play";

if(autoplay){

showWord();

}

};