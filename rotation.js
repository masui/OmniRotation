//
// 回転ダイヤルとかの操作速度で動きを変える
//

const RIGHT = 0
const LEFT = 1
var direction = RIGHT

const RESETSTATE = 0 // リセット状態
const CHECKSTATE = 1 // fast/slow判定前状態
const SLOWSTATE = 2
const FASTSTATE = 3
var state = RESETSTATE;

function slowState(){
    if(state == CHECKSTATE){
	// fast/slow 判断前だったとき
	slow(direction)
    }
    state = SLOWSTATE
}
function resetState(){
    state = RESETSTATE
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
    if(state == RESETSTATE){
	state = CHECKSTATE
	slowModeTimeout = setTimeout(slowState,500)
    }
    else if(state == CHECKSTATE){
	state = FASTSTATE
	fast(dir)
	fast(dir)
    }
    else if(state == SLOWSTATE){ // 低速
	slow(dir)
    }
    else if(state == FASTSTATE){ // 高速
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
