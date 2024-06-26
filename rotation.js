//
// 回転ダイヤルとかの操作速度で動きを変える
//

// 0 リセット状態
// 1 最初に押された状態、1000msたってない状態
// 2 低速キー
// 3 高速キー

const RIGHT = 0
const LEFT = 1
var state = 0;
var direction = RIGHT

function state1to2(){
    if(state == 1){ // 低速
	slow(direction)
    }
    state = 2
}
function resetState(){
    state = 0
}
var resetTimeout = null
var timeout1 = null

var fastrep = 0
var slowrep = 0

function fast(dir){
    direction = dir
    fastrep += (direction == RIGHT ? 1 : -1)
    $('#fast').text(fastrep)
}
function slow(dir){
    direction = dir
    slowrep += (direction == RIGHT ? 1 : -1)
    $('#slow').text(slowrep)
}

function move(dir){
    direction = dir
    clearTimeout(timeout1)
    clearTimeout(resetTimeout)
    if(state == 0){
	state = 1
	timeout1 = setTimeout(state1to2,500)
    }
    else if(state == 1){
	state = 3
	fast(dir)
	fast(dir)
    }
    else if(state == 2){ // 低速
	slow(dir)
    }
    else if(state == 3){ // 高速
	fast(dir)
    }
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(resetState,1000)
}
/*
function right(){
    move(RIGHT)
}
function left(){
    move(LEFT)
}
*/

document.addEventListener('keydown', event => {
    if(event.key == 'ArrowRight'){
	move(RIGHT)
	//right();
    }
    if(event.key == 'ArrowLeft'){
	move(LEFT)
	//left();
    }
});

document.addEventListener('keyup', event => {
});
