let data = [];
var time = 0;
let path = [];  

var cv,ctx,w,h,points,cx,cy
 
var BG_COLOR ='#000000';
var LINE_COLOR='255,255,255';
var distance_threshold=150;
var FPS=30;


for (point of horse){
	data.push(new Complex(point[0],point[1]));
}


let dfts=dft(data); 
dfts.sort((a,b)=>b.amp-a.amp);
console.log(dfts);

function createCanvas(){
	cv=document.getElementById('canvas');
	cv.width=document.body.clientWidth;
	cv.height=window.innerHeight;

	if(cv.getContext){
		ctx=cv.getContext('2d');
		ctx.strokeStyle='white';
		w=cv.width;
		h=cv.height;
		cx=w/2;
		cy=h/2;
	}	else alert('This browser doesn\'t support canvas'); 
}

function clearCanvas(){
	ctx.fillStyle=BG_COLOR;
	ctx.fillRect(0,0,2*w,2*h);
} 

function freeformDraw(){

}

function drawEpicycles(x,y,time,fourier){ 
	clearCanvas(); 
	for (i=1;i<precision;i++){
		let prevx=x;
		let prevy=y;
		let freq=fourier[i].freq;
		let radius=fourier[i].amp;
		let phase=fourier[i].phase;
		x+=radius*Math.cos(freq*time+phase);
		y+=radius*Math.sin(freq*time+phase);

		ctx.lineWidth=1;
		ctx.strokeStyle="#69e8ff";
		ctx.beginPath();
		ctx.arc(prevx,prevy,radius,0,2*Math.PI);
		ctx.stroke();
		ctx.lineWidth=2;
		ctx.strokeStyle="white";
		ctx.beginPath();
		ctx.moveTo(prevx,prevy);
		ctx.lineTo(x,y);
		ctx.stroke();
	}
	result=[];
	result.push(x);
	result.push(y);
	return result;
}

createCanvas();

let animationId;

function draw(){
	let v=drawEpicycles(w/2,h/2,time,dfts); 
	path.unshift(v);

	ctx.strokeStyle="#fac934";
	ctx.lineWidth=3;
	ctx.beginPath();
	ctx.moveTo(path[0][0],path[0][1]);
	for (i in path){
		ctx.lineTo(path[i][0],path[i][1]);
	}
	ctx.stroke();
	ctx.lineWidth=1;

	const dt = 2*Math.PI/(dfts.length);
	time+=dt;

	animationId=requestAnimationFrame(draw,5000/FPS);
}

function start(){
	draw();
}


var slider = document.getElementById("myRange");

let precision_percent=100;
let precision=Math.round(dfts.length*precision_percent/100);


slider.oninput = function() {
	let precision_percent=this.value;
	precision=Math.round(dfts.length*precision_percent/100);
	console.log(precision);
	cancelAnimationFrame(animationId);
	path=[];
	start();
}

start();