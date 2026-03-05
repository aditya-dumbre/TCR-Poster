const canvas = document.getElementById("ai-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let particleCount = 60;

class Particle{

constructor(){
this.x = Math.random()*canvas.width;
this.y = Math.random()*canvas.height;

this.vx = (Math.random()-0.5)*0.6;
this.vy = (Math.random()-0.5)*0.6;

this.radius = 2;
}

move(){

this.x += this.vx;
this.y += this.vy;

if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
if(this.y < 0 || this.y > canvas.height) this.vy *= -1;

}

draw(){

ctx.beginPath();
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
ctx.fillStyle="rgba(99,102,241,0.7)";
ctx.fill();

}

}

for(let i=0;i<particleCount;i++){
particles.push(new Particle());
}

function connect(){

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx = particles[a].x - particles[b].x;
let dy = particles[a].y - particles[b].y;

let distance = dx*dx + dy*dy;

if(distance < 15000){

ctx.beginPath();

ctx.strokeStyle="rgba(99,102,241,0.1)";
ctx.lineWidth=1;

ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);

ctx.stroke();

}

}

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.move();
p.draw();
});

connect();

requestAnimationFrame(animate);

}

animate();

window.addEventListener("resize",()=>{

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

});