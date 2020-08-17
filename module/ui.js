import * as map from "./map.js"

//显示游戏地图中的信息
var divContainer = document.getElementById("game");
var pieceWidth = 35;//小块的宽度
var pieceHeight = 35;//小块的高度

function isCorrect(row,col){
    for(var i = 0; i < map.correct.length; i++){
        var point = map.correct[i];
        if(row == point.row && col == point.col){
            return true;
        }
    }
    return false;
}

function setLocation(row,col){
    var value = map.content[row][col]; //对应的位置

        var div = document.createElement("div");
        div.className = "item";
        divContainer.appendChild(div);

        div.style.left = pieceWidth * col + "px";
        div.style.top = pieceHeight * row + "px";

        var correct = isCorrect(row,col);
        if(value == map.PLAYER){
            div.classList.add("player");
        }else if(value == map.WALL){
            div.classList.add("wall");
        }else if(value == map.BOX){
            // if(value == isCorrect(row,col)){
            if(correct){
                div.classList.add("correct-box");
            }else{
                div.classList.add("box");
            }
        }else{
            if(isCorrect(row,col)){
                div.classList.add("correct");
            }
        }
}


export default function (){//该函数用于显示地图

    // 1.设置div宽高
    divContainer.style.width = pieceWidth * map.colNumber + "px";
    divContainer.style.height = pieceHeight * map.rowNumber + "px";
    // console.log(divContainer.style.width);

    // 2.显示地图中的内容
    divContainer.innerHTML = "";//刷新游戏页面，清空
    for(var row = 0; row < map.rowNumber; row++){
        for(var col = 0; col < map.colNumber; col++){
            setLocation(row,col);
        }
    }
} 
