const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

//timer
let time = 0;
let timer = setInterval(()=>time+=0.1, 100);

let units = [];

units[0] = new Player(canvas, ctx)

for(let i=1; i<71; i++){
    units[i] = new Unit(canvas, ctx);
}

function frame() {
    //background
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //cricle
    units.forEach((unit) =>{
        if (unit.isDead) return;
        unit.move();
        unit.draw();
    });
    
    //coliisioin detect
    units.forEach(unit =>{
        if(units[0].isDead) return;

        if(time>=0.12 && unit != units[0] && unit.didCollide(units[0])){
            units[0].isDead = true;
        }

    });

    //game over
    if(units[0].isDead){
        window.alert("Game Over: " + time + " seconds");
        clearInterval(timer);

        exit;
    }

    requestAnimationFrame(frame);
}
frame();