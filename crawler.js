
window.addEventListener('DOMContentLoaded', (event) =>{


    let worldtiles = []


    let move = 1
    let yek = ""


    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
   setTimeout(function(){ 
        if(move == 1){
            move = 0
            players(doug)
        }
    }, 20);
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });




    let tutorial_canvas = document.getElementById("tutorial");


    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

 //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas
    tutorial_canvas.style.background = "#000000"




 const flex = tutorial_canvas.getBoundingClientRect();

 // Add the event listeners for mousedown, mousemove, and mouseup
 let tip = {}
 let xs
 let ys
 let tap = {}
 let xz
 let yz


 
 window.addEventListener('mousedown', e => {

    displayer = new Rectangle(0,0,0,0,"red")


    xs = e.clientX - flex.left;
    ys = e.clientY - flex.top;
      tip.x = xs
      tip.y = ys

      tip.body = tip


   window.addEventListener('mousemove', beamdrag);
 });



 window.addEventListener('mouseup', e => {
 window.removeEventListener("mousemove", beamdrag);
 })

function beamdrag(e) {

    xz = e.clientX - flex.left;
    yz = e.clientY - flex.top;
      tap.x = xz
      tap.y = yz


  }





    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){

            tutorial_canvas_context.strokeStyle = "black"
            tutorial_canvas_context.strokeRect(this.x, this.y, this.width, this.height)
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    class Tile{
        constructor(x,y){
            this.body = new Rectangle(x,y, 20, 20, "gray")
            this.occupied = 0
            this.occupant = {}
            worldtiles.push(this)
        }
        draw(){
            this.body.draw()
        }
    }
    class Room{
        constructor(){
            this.tiles = []
        }
        draw(){
            for(let r = 0;r<this.tiles.length;r++){
                this.tiles[r].draw()
            }
        }
        push(tile){
            this.tiles.push(tile)
        }
    }

    class Dungeon{
        constructor(){  
            this.rooms = []
        }
        push(room){
            this.rooms.push(room)
        }
        draw(){
            for(let r = 0;r<this.rooms.length;r++){
                this.rooms[r].draw()
            }
        }
    }
    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){

            this.xmom*=.9999
            this.ymom*=.9999   //friction

            this.x += this.xmom
            this.y += this.ymom

            if(this.x+this.radius > tutorial_canvas.width){

                if(this.xmom > 0){
                this.xmom *= -1
                }

            }
            if(this.y+this.radius > tutorial_canvas.height){
                if(this.ymom > 0){
                this.ymom *= -1
                }

            }
            if(this.x-this.radius < 0){
                if(this.xmom < 0){
                    this.xmom *= -1
                }

            }
            if(this.y-this.radius < 0){

                if(this.ymom < 0){
                    this.ymom *= -1
                }
        
            }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }


    class Walker{
        constructor(body){
            this.body = body
            this.mana = 15
            this.maxmana = 15
            this.health = 10
            this.maxhealth = 10
            this.tile = dungus.rooms[0].tiles[0]

            this.healthbar = new Rectangle (335, 300, 2, this.body.radius*2, "#00FF00") 
            this.manabar = new Rectangle (335, 300, 2, this.body.radius*2, "#00FFFF") 
            this.tile.occupied = 1
        }
        draw(){
            this.body.x = this.tile.body.x + this.tile.body.width/2
            this.body.y = this.tile.body.y + this.tile.body.height/2
            this.body.draw()
            this.tile.occupant = this
            this.healthbar.x = this.body.x- this.body.radius*1.9
            this.healthbar.y = this.body.y - 10
            this.manabar.x = this.body.x- this.body.radius*1.9
            this.manabar.y = this.body.y + 7
            if(this.mana <= 0){
                this.mana = 0
            }
            if(this.health <= 0){
                this.health = 0
            }
            this.healthbar.width = (this.health/this.maxhealth)*19
            this.manabar.width = (this.mana/this.maxmana)*19
            this.manabar.draw()
            this.healthbar.draw()
        }
        attack(){
            if(this.mana >= 5){
                this.mana -=5
            // let radcirc = new Circle(this.body.x, this.body.y, 40, "orange")
            let radbox = new Rectangle(this.body.x-30, this.body.y-30, 60, 60, "orange")
            dungus.draw()
            radbox.draw()

            this.draw()

            for(let r = 0; r<enemies.length; r++){
                enemies[r].draw()
                if(Math.abs(enemies[r].body.x-this.body.x) < 40){
                    if(Math.abs(enemies[r].body.y-this.body.y) < 40){
                        enemies[r].health -= 1
                    }
                 }
                }
            }
            }
            heal(){

            if(this.mana >= 15){
                this.mana -=15
            // let radcirc = new Circle(this.body.x, this.body.y, 40, "orange")
            let radbox = new Rectangle(this.body.x-10, this.body.y-10, 20, 20, "#00FF00")
            dungus.draw()
            radbox.draw()
            this.draw()
            for(let r = 0; r<enemies.length; r++){
                enemies[r].draw()
                }
                this.health+=5
                if(this.health >= this.maxhealth){
                    this.health=this.maxhealth
                }
            }
            
        }
    }

    class Enemy{
        constructor(){
            this.health = 3
            this.maxhealth = 3
            this.body = new Circle(125, 200, 5, "black") 
            let fungus = Math.floor(Math.random()*dungus.rooms.length)
            this.tile = dungus.rooms[fungus].tiles[[Math.floor(Math.random()*dungus.rooms[fungus].tiles.length)]]
            this.healthbar = new Rectangle (335, 300, 2, this.body.radius*2, "#00FF00") 
            this.tile.occupied = 1
        }
        draw(){
            this.body.x = this.tile.body.x + this.tile.body.width/2
            this.body.y = this.tile.body.y + this.tile.body.height/2
            this.body.draw()
            if(this.health <= 0){
                this.health = 0
            }
            this.healthbar.x = this.body.x- this.body.radius*1.9
            this.healthbar.y = this.body.y + 7
            this.healthbar.width = (this.health/this.maxhealth)*19
            this.healthbar.draw()
        }
        move(){
            playersx(this)
            this.tile.occupant = this
        }
    }

    class Pointer{
        constructor(x,y, color, length=80, r = 255, g = 0, b = 0){
            this.dir = -1
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.radius = length*2.5
            this.r = r
            this.g = g
            this.b = b
            this. a = 1
            this.cor1 = this.x+this.length
            this.cor2 = this.x-this.length
            this.cor3 = this.x
        }
        draw(){
 
            tutorial_canvas_context.strokeStyle ="black"
    
            tutorial_canvas_context.beginPath(); 
            tutorial_canvas_context.moveTo(this.cor1, this.y); 
            
            tutorial_canvas_context.lineTo(this.cor3,this.y+this.length*3.41); 
            
            tutorial_canvas_context.lineTo(this.cor2, this.y); 
            tutorial_canvas_context.stroke();  
            tutorial_canvas_context.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`
            tutorial_canvas_context.fill()
 
 
        }
 
 }

    class Pointerx{
        constructor(x,y, color, length=80){
            this.dir = -1
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.radius = length*2.5
            this.r = 255
            this.g = 0
            this.b = 0
            this. a = 1
            this.cor1 = this.x+this.length
            this.cor2 = this.x-this.length
            this.cor3 = this.x

        }
        draw(){
 
            tutorial_canvas_context.strokeStyle ="black"
    
            tutorial_canvas_context.beginPath(); 
            tutorial_canvas_context.moveTo(this.cor1, this.y); 
            
            tutorial_canvas_context.lineTo(this.cor3,this.y-this.length*3.41); 
            
            tutorial_canvas_context.lineTo(this.cor2, this.y); 

 
            tutorial_canvas_context.stroke();  
            tutorial_canvas_context.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`
            tutorial_canvas_context.fill()
 
 
        }
 
 }


 class Phimond{
     constructor(bod1, bod2, bod3, bod4, bod5, bod6, bod7, bod8){

     this.bod1 = bod1
     this.bod2 = bod2
     this.bod3 = bod3
     this.bod4 = bod4
     this.bod5 = bod5
     this.bod6 = bod6
     this.bod7 = bod7
     this.bod8 = bod8
     this.bods = [bod1,bod2,bod3,bod4,bod5,bod6,bod7,bod8]

     this.counter = 0
     }


     draw(){
        // this.bod1.draw()
        // this.bod2.draw()
        // this.bod3.draw()
        // this.bod4.draw()
        // this.bod5.draw()
        // this.bod6.draw()
        this.bod7.draw()
        this.bod8.draw() 
     }
     spin(){
         this.counter+=1

         for(let b= 0;b<this.bods.length; b++){
            this.bods[b].a-= b/1000
            if(this.bods[b].a < 0){
                this.bods[b].a = 1
            }
            }
         
        //  if(counter)
        // if(this.bod1.dir == 0){
        //     if(this.bod1.cor1 > 270){
        //        this.bod1.cor1-=1
        //     }
        //     if(this.bod1.cor2 > 270){
        //        this.bod1.cor2-=1
        //     }
   
   
        //    }
        //    if(this.bod2.dir == 0){
            // if(this.bod2.cor1 > 270){
                if(this.bod1.dir == -1){

                    if(this.bod1.cor1 > 270){
                        this.bod1.cor1-=1
                    }else{
                      this.bod1.dir *= -1
                    }
    
                    }else{
                        if(this.bod1.cor1 < 430){
                            this.bod1.cor1+=1
                        }else{
                          this.bod1.dir *= -1
                        }
                    }
                    if(this.bod1.dir == -1){
    
                    if(this.bod1.cor2 > 270){
                        this.bod1.cor2-=1
                    }else{
                      this.bod1.dir *= -1
                    }
    
                    }else{
                        if(this.bod1.cor2 < 430){
                            this.bod1.cor2+=1
                        }else{
                          this.bod1.dir *= -1
                        }
                    }
        //     }
        //     if(this.bod2.cor2 > 270){
        //        this.bod2.cor2-=1
        //     }
   
   
        //    }

           this.bod2.cor1 = this.bod1.cor1 
           this.bod2.cor2 = this.bod1.cor2

           this.bod3.cor1 = this.bod1.cor2
           this.bod4.cor1 = this.bod2.cor1


           this.bod5.cor1 = this.bod3.cor2
           this.bod6.cor1 = this.bod4.cor1
           if(this.bod1.cor2 < 350){
            this.bod7.cor1 = 350+Math.abs(350-this.bod1.cor2)
           }else{
            this.bod7.cor1 = 350+(350-this.bod1.cor2)
           }

           this.bod8.cor2 = Math.max(Math.min((this.bod8.cor1+80), 430), 270)
           if(this.bod2.cor2 < 350){
            this.bod8.cor1 = 350+Math.abs(350-this.bod2.cor2)
           }else{
            this.bod8.cor1 = 350+(350-this.bod2.cor2)
           }

           this.bod7.cor2 = Math.max(Math.min((this.bod7.cor1-80), 430), 270)
        
           this.bod8.cor2 = Math.max(Math.min((this.bod8.cor1-80), 430), 270)
        









     }
 }



    // let x = 0
    // let y = 0

     let circ = new Circle(125, 200, 5, "red")  // starts with ramndom velocities and color
     let rect = new Rectangle ( 200, 200, 50, 80, getRandomLightColor())
    // rect.ymom = 1

    let pointy1 = new Pointer(350, 350, "blue", 80, 0, 0 , 255)
    let pointy2 = new Pointerx(350, 350, "red", 80, 255, 0 , 0)
    let pointy3 = new Pointer(350, 350, "yellow", 80, 255, 255, 0)
    let pointy4 = new Pointerx(350, 350, "green", 80, 0, 255, 0)
    let pointy5 = new Pointer(350, 350, "purple", 80, 255, 0, 255)
    let pointy6 = new Pointer(350, 350, "pink", 80, 255, 200, 200)
    let pointy7 = new Pointer(350, 350, "orange", 80 , 255, 180, 0)
    let pointy8 = new Pointer(350, 350, "black", 80, 0, 0 ,0 )


    let dime = new Phimond(pointy1, pointy2, pointy3, pointy4, pointy5, pointy6, pointy7, pointy8)

    // example objects

    let dungus = new Dungeon()
    let entry = new Room()
    let nextroom = new Room()
    let nextroom2 = new Room()
    let nextroom3 = new Room()
    let nextroom4 = new Room()
    let nextroom5 = new Room()
    let hall1 = new Room()
    let hall2 = new Room()
    let hall3 = new Room()


    let xu = 100
    let yu = 100

    for(let t = 0; t< 100; t++){

        let firsttile = new Tile(xu,yu)
        xu+=20
        if(xu>=300){
            yu+=20
            xu = 100
        }
        entry.push(firsttile)
    }
    xu = 300
    yu = 199.5

    for(let t = 0; t< 5; t++){

        let firsttile = new Tile(xu,yu)
        xu+=20
        hall1.push(firsttile)
    }
    xu = 460
    yu = 240

    for(let t = 0; t< 18; t++){

        let firsttile = new Tile(xu,yu)
        yu+=20
        hall2.push(firsttile)
    }
    xu = 480
    yu = 340

    for(let t = 0; t< 4; t++){

        let firsttile = new Tile(xu,yu)
        xu+=20
        hall3.push(firsttile)
    }
    xu = 560
    yu = 240

    for(let t = 0; t< 50; t++){

        let firsttile = new Tile(xu,yu)
        xu+=20
        if(xu>= 660){
            xu = 560
            yu+= 20
        }
        nextroom5.push(firsttile)
    }
    xu = 400
    yu = 100

    for(let t = 0; t< 30; t++){

        let firsttile = new Tile(xu,yu)
        xu+=20
        if(xu>=460){
            yu+=20
            xu = 400
        }
        nextroom.push(firsttile)
    }

    xu = 100
    yu = 400

    for(let t = 0; t< 30; t++){

        let firsttile = new Tile(xu,yu)
        xu+=20
        if(xu>=460){
            yu+=20
            xu = 400
        }
        nextroom2.push(firsttile)
    }

    xu = 100
    yu = 420

    for(let t = 0; t< 30; t++){

        let firsttile = new Tile(xu,yu)
        xu+=20
        if(xu>=300){
            yu+=20
            xu = 100
        }
        nextroom3.push(firsttile)
    }

    xu = 480
    yu = 540

    for(let t = 0; t< 49; t++){

        let firsttile = new Tile(xu,yu)
        xu+=20
        if(xu>=620){
            yu+=20
            xu = 480
        }
        nextroom4.push(firsttile)
    }


    dungus.push(entry)

    dungus.push(hall1)

    dungus.push(hall2)
    dungus.push(hall3)

    dungus.push(nextroom5)
    dungus.push(nextroom4)
    dungus.push(nextroom2)
    dungus.push(nextroom3)
    dungus.push(nextroom)

    let enemies = []
        let greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)
        greyson = new Enemy()

        enemies.push(greyson)

        // enemies = []

    let doug = new Walker(circ)
// interval, fill this with game logic 
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)  // refreshes the image

        move = 1
        dungus.draw()
        
        for(let e = 0; e<enemies.length; e++){
           if(enemies[e].health <= 0){
            enemies[e].tile.occupied = 0
            enemies[e].tile.occupant = {}
               enemies.splice(e,1)
           }
        }
        for(let e = 0; e<enemies.length; e++){
            enemies[e].draw()
        }

        if(doug.health > 0){

        doug.draw()

        // if (keysPressed['w'] || keysPressed['a'] || keysPressed['s'] || keysPressed['d'] || keysPressed[' '] || keysPressed['m'] ) {
     
        // // players(doug)
        // }
        }
    }, 100) // length of refresh interval




    // run on any object with x/y attributes in the timer to give them wasd controls
    function players(racer){
        doug.mana += 1
        if(doug.mana >= doug.maxmana ){
            doug.mana = doug.maxmana
        }

        for(let e = 0; e<enemies.length; e++){
            enemies[e].move()
        }
        if (keysPressed[' ']) {
            doug.attack()

        }
        if (keysPressed['m']) {
            doug.heal()

        }
        if (keysPressed['w']) {
            racer.body.y -= 20
            
            for(let f = 0; f<worldtiles.length; f++){
                if(squarecircle(worldtiles[f].body, racer.body)){
                    if(worldtiles[f].occupied == 0){
                        racer.tile.occupied =  0
                        racer.tile.occupant = {}
                        worldtiles[f].occupied =  1
                        racer.tile = worldtiles[f]
                    }
                    f = worldtiles.length
                }
            }




        }
        if (keysPressed['a']) {       
            
            racer.body.x -= 20
            
            for(let f = 0; f<worldtiles.length; f++){
                if(squarecircle(worldtiles[f].body, racer.body)){
                     if(worldtiles[f].occupied == 0){
                    racer.tile.occupied =  0
                    racer.tile.occupant = {}
                    worldtiles[f].occupied =  1
                    racer.tile = worldtiles[f]
                }else{
                }
                    f = worldtiles.length
                }
            }

        }
        if (keysPressed['s']) {
            racer.body.y += 20
            
            for(let f = 0; f<worldtiles.length; f++){
                if(squarecircle(worldtiles[f].body, racer.body)){
                    if(worldtiles[f].occupied == 0){
                        racer.tile.occupied =  0
                        racer.tile.occupant = {}
                        worldtiles[f].occupied =  1
                        racer.tile = worldtiles[f]
                    }
                    f = worldtiles.length
                }
            }
        }
        if (keysPressed['d']) {
            racer.body.x += 20
            
            for(let f = 0; f<worldtiles.length; f++){
                if(squarecircle(worldtiles[f].body, racer.body)){
                    if(worldtiles[f].occupied == 0){
                        racer.tile.occupied =  0
                        racer.tile.occupant = {}
                        worldtiles[f].occupied =  1
                        racer.tile = worldtiles[f]
                    }
                    f = worldtiles.length
                }
            }
        }
        if (keysPressed['f']) {
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }
    function playersx(racer){

        if(Math.random()<.95){

            if(doug.body.x < racer.body.x){

                if(Math.random() < .5){
                    // racer.body.x += 20
                }
                if(Math.random() < .5){
                    racer.body.x -= 20
                }
            }else{
            if(Math.random() < .5){
                racer.body.x += 20
            }
            if(Math.random() < .5){
                // racer.body.x -= 20
            }
        }
            if(doug.body.y < racer.body.y){
    
                if(Math.random() < .5){
                    // racer.body.y += 20
                }
                if(Math.random() < .5){
                    racer.body.y -= 20
                }
            }else{
                if(Math.random() < .5){
                    racer.body.y += 20
                }
                if(Math.random() < .5){
                    // racer.body.y -= 20
                }
            }
                
    
        }else{


            if(Math.random() < .5){
                racer.body.x += 20
            }
            if(Math.random() < .5){
                racer.body.x -= 20
            }
        if(Math.random() < .5){
            racer.body.x += 20
        }
        if(Math.random() < .5){
            racer.body.x -= 20
        }
            if(Math.random() < .5){
                racer.body.y += 20
            }
            if(Math.random() < .5){
                racer.body.y -= 20
            }
            if(Math.random() < .5){
                racer.body.y += 20
            }
            if(Math.random() < .5){
                racer.body.y -= 20
            }
    
            

        }

            for(let f = 0; f<worldtiles.length; f++){
                if(squarecircle(worldtiles[f].body, racer.body)){
                    if(worldtiles[f].occupied == 0){
                        racer.tile.occupied =  0
                        racer.tile.occupant = {}
                        worldtiles[f].occupied =  1
                        racer.tile = worldtiles[f]
                    }else{

                    if(worldtiles[f].occupant == doug){
                        doug.health -= 1
                    }
                    }
                    f = worldtiles.length
                }
            }

    }





// can check if one circle contains the cneter of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
}

// random color that will be visible on  blac backgroung
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching cnange the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}





})