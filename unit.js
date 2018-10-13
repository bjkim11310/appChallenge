class Unit {
    constructor (canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;

        this.x = this.canvas.width/2;
        this.y = this.canvas.height/2;
        

        this.r = 5;
        this.isDead = false;

        this.speed = 4.25;

        let angle = Math.random()*(Math.PI*2); 

        this.vx = this.speed*Math.cos(angle);
        this.vy = this.speed*Math.sin(angle);

        let colors = ["skyblue", "orange", "red", "yellow", "hotpink", "lightgreen"];

        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw (){
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    move (){
        if(this.x+this.r >= this.canvas.width){
            this.vx = -Math.abs(this.vx+1.2);
        }
        else if(this.x-this.r <= 0){
            this.vx = Math.abs(this.vx+1.2);
        }
        if(this.y+this.r >= this.canvas.height){
            this.vy = -Math.abs(this.vy+1.2);
        }
        else if(this.y-this.r <= 0){
            this.vy = Math.abs(this.vy+1.2);
        }

        this.x+=this.vx;
        this.y+=this.vy;
    }

    didCollide(unit) {
        let actualD = Math.pow(this.y-unit.y, 2) + Math.pow(this.x-unit.x, 2);
        let minD = Math.pow(this.r + unit.r, 2);

        return actualD <= minD;
    }
}

class Player extends Unit{
    constructor(canvas, ctx){
        super(canvas, ctx);

        this.color = "grey";
        this.r = 10;
        this.x = this.canvas.width/2;
        this.y = this.canvas.height/2;
        this.speed = 1.2;
        
        this.mouseX = this.x;
        this.mouseY = this.y;
        document.addEventListener('mousemove', (event)=>{
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
    }

    move() {
        let dx = this.mouseX-this.x;
        let dy = this.mouseY-this.y;

        let angle = Math.atan2(dy, dx);

        this.x += this.speed*5 * Math.cos(angle);
        this.y += this.speed*5 * Math.sin(angle);
    }
}