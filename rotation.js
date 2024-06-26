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
	execSlow(direction)
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

function execFast(dir){
    direction = dir
    fastrep += (direction == RIGHT ? 1 : -1)
    $('#fast').text(fastrep)
}
function execSlow(dir){
    direction = dir
    slowrep += (direction == RIGHT ? 1 : -1)
    $('#slow').text(slowrep)
}

function move(dir){
    direction = dir
    if(state == 0){
	state = 1
	clearTimeout(timeout1)
	timeout1 = setTimeout(state1to2,500)
    }
    else if(state == 1){
	state = 3
	clearTimeout(timeout1)
	execFast(dir)
	execFast(dir)
    }
    else if(state == 2){ // 低速
	clearTimeout(timeout1)
	execSlow(dir)
    }
    else if(state == 3){ // 高速
	clearTimeout(timeout1)
	execFast(dir)
    }
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(resetState,800)
}
function right(){
    move(RIGHT)
}
function left(){
    move(LEFT)
}

document.addEventListener('keydown', event => {
    // 変数eventの中身はKeyboardEventオブジェクト
    if(event.key == 'ArrowRight'){
	right();
    }
    if(event.key == 'ArrowLeft'){
	left();
    }
});
