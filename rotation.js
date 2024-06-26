//
// 回転ダイヤルとかの操作速度で動きを変える
//

const RIGHT = 0
const LEFT = 1
var direction = RIGHT

var state = 0;
// 0 リセット状態
// 1 最初に押された状態、1000msたってない状態
// 2 低速キー
// 3 高速キー

function state2(){
    if(state == 1){ // 低速
	slow(direction)
    }
    state = 2
}
function resetState(){
    state = 0
}
var resetTimeout = null // 初期状態にもどる
var slowModeTimeout = null // 速さチェック

var fastval = 0
var slowval = 0

function fast(dir){
    direction = dir
    fastval += (direction == RIGHT ? 1 : -1)
    document.getElementById('fast').textContent = fastval;
}
function slow(dir){
    direction = dir
    slowval += (direction == RIGHT ? 1 : -1)
    document.getElementById('slow').textContent = slowval;
}

function move(dir){
    direction = dir
    clearTimeout(slowModeTimeout)
    clearTimeout(resetTimeout)
    if(state == 0){
	state = 1
	slowModeTimeout = setTimeout(state2,500)
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

document.addEventListener('keydown', event => {
    if(event.key == 'ArrowRight'){
	move(RIGHT)
    }
    if(event.key == 'ArrowLeft'){
	move(LEFT)
    }
});

document.addEventListener('keyup', event => {
});
