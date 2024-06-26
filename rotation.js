// 0 リセット状態
// 1 最初に押された状態、1000msたってない状態
// 2 低速キー
// 3 高速キー

var state = 0;

function state1to2(){
    if(state == 1){ // 低速
	execRightSlow()
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

function execRightFast(){
    fastrep += 1
    $('#fast').text(fastrep)
}
function execRightSlow(){
    slowrep += 1
    $('#slow').text(slowrep)
}

function right(){
    console.log("Right")
    if(state == 0){
	state = 1
	clearTimeout(timeout1)
	timeout1 = setTimeout(state1to2,500)
    }
    else if(state == 1){
	state = 3
	clearTimeout(timeout1)
	console.log('state=1')
	console.log(fastrep)
	execRightFast()
	execRightFast()
	console.log(fastrep)
    }
    else if(state == 2){
	// 低速
	clearTimeout(timeout1)
	execRightSlow()
    }
    else if(state == 3){
	clearTimeout(timeout1)
	execRightFast()
    }
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(resetState,1000)
}
function left(){
    console.log("Left")
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
