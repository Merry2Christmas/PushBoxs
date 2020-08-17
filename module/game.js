// 完成整个游戏
import { playMove, isWin } from "./play.js"
import UI from "./ui.js"

UI();
var over = false;

window.onkeydown = function(e){
    if(over){
        return;
    }
    var result = false;
    if(e.key == "ArrowUp"){
        result = playMove("up");
    }else if(e.key == "ArrowDown"){
        result = playMove("down");
    }else if(e.key == "ArrowLeft"){
        result = playMove("left");
    }else if(e.key == "ArrowRight"){
        result = playMove("right");
    }

    // if(result){
    //     UI();
    //     if(isWin()){
    //         setTimeout(function (){alert("胜利！！！");},0);
    //         console.log("胜利！！！");
    //         over = true;
    //     }
    // }
    if(result){
        UI();
        if(isWin()){
            setTimeout(function(){ alert("游戏胜利！！！"); }, 0);
            over = true;
        }
    }
}