import * as map from "./map.js"

function exchange(point1,point2){
    [map.content[point1.row][point1.col],map.content[point2.row][point2.col]] = [map.content[point2.row][point2.col],map.content[point1.row][point1.col]];
}

//让玩家操作主人公移动
export function playMove(direction){

    //首先找到玩家的位置
    var playerPoint = getPlayer();
    console.log(playerPoint);

    //得到玩家下一个位置的信息
    var nextInfo = getNextInfo(direction,playerPoint.row,playerPoint.col);
    console.log(nextInfo);

    //移动
    if(nextInfo.value == map.WALL){
        return false;
    }
    if(nextInfo.value == map.SPACE){
        exchange(playerPoint,nextInfo);
        return true;
    }else{
        //下一个位置是箱子
        var nextNextInfo = getNextInfo(direction,nextInfo.row,nextInfo.col);
        if(nextNextInfo.value == map.SPACE){
            exchange(nextInfo,nextNextInfo);
            exchange(playerPoint,nextInfo);
            return true;
        }else{
            return false;
        }
        
    }
}

function getPlayer(){
    for(var row = 0; row < map.rowNumber; row++){
        for(var col = 0; col < map.colNumber; col++){
            if(map.content[row][col] == map.PLAYER){
                return{
                    row: row,
                    col: col
                }
            }
        }
    }
    throw new Error("地图上玩家消失");
}

//得到玩家在指定的方向上，下一步的位置
function getNextInfo(direction,row,col){
    if(direction == "left"){
        return {
            row: row,
            col: col - 1,
            value:map.content[row][col - 1]
        }
    }else if(direction == "right"){
        return {
            row: row,
            col: col + 1,
            value:map.content[row][col + 1]
        }
    }else if(direction == "up"){
        return {
            row: row - 1,
            col: col,
            value:map.content[row - 1][col]
        }
    }else if(direction == "down"){
        return {
            row: row + 1,
            col: col,
            value:map.content[row + 1][col]
        }
    }
}

//判断游戏是否胜利
export function isWin(){
    //是否每个正确位置都有箱子
    for(var i = 0; i < map.correct.length; i++){
        var point = map.correct[i];
        if(map.content[point.row][point.col] != map.BOX){
            return false;
        }
    }
    return true;
}