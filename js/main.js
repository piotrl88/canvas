
$(document).ready(function() {
    var gameCanvas = document.createElement('canvas');
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    document.body.appendChild(gameCanvas);

    var ctx = gameCanvas.getContext('2d');
    var fps = 60,
        lastTime = 0,
        ease = 'easeInOutQuart',
        t = 0,
        d = 1000,
        forward = true;
        allSquares = [],
        visibleSquares = [];

    //squareAnimationLoop();
    function squareAnimationLoop(time) {
        requestAnimationFrame(squareAnimationLoop);
        if(time-lastTime >= 1000/fps) {
            lastTime = time;

            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            ctx.fillRect(x,y, h, h);

            //x = (forward)? x+15 : x-15;
            x = Easing.get('easeInOutQuad', (forward ? gameCanvas.width*0.1 : gameCanvas.width*0.9-h),  (!forward ? gameCanvas.width*0.1 : gameCanvas.width*0.9-h), t, d);
            t += 1000/fps;

            if(t>=d){
                forward = !forward;
                t = 0;
            }
        }
    }


    animationLoop();
    function animationLoop(time) {
        requestAnimationFrame(animationLoop);
        if(time - lastTime >= 1000/fps) {

            for(var i=0; i<25; i++) {
                allSquares.push({
                    start_x : gameCanvas.width/2,
                    start_y : gameCanvas.height/2,
                    target_r : Math.round(gameCanvas.height*0.4),
                    start_a : rand(0, 360),
                    /*target_x : rand(0, Math.round(gameCanvas.width)),
                    target_y : rand(0, Math.round(gameCanvas.height)),*/
                    t : 0,
                    duration : 1000,
                    h : rand(2, 5),
                    start_r : rand(100, 240),
                    start_g : rand(100, 240),
                    start_b : rand(100, 240)
                    /*speedX : rand(-1000, 1000)/100,
                    speedY : rand(-1000, 1000)/100*/
                });

                /*if(allSquares[allSquares.length-1].speedX==0 && allSquares[allSquares.length-1].speedY==0) {
                    allSquares[allSquares.length-1].speedX = rand(-1000, 1000)/100;
                }*/
            }

            lastTime = time;
            //ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            ctx.fillStyle = 'rgba(255,255,255, 0.2)';
            ctx.fillRect(0,0, gameCanvas.width, gameCanvas.height);

            visibleSquares.length = 0;
            for(var i=0; i<allSquares.length; i++) {
                var square = allSquares[i];

                square.t += 1000/fps;
                ctx.fillStyle = 'rgb('+square.start_r+','+square.start_g+','+square.start_b+')';

                square.r = Easing.get(ease, 0, square.target_r, square.t, square.duration);
                square.a = Easing.get(ease, square.start_a, square.start_a+180, square.t, square.duration);

                //square.x + square.speedX;
                //Easing.get(ease, square.start_x, square.target_x, square.t, square.duration);
                square.x = Math.sin(Math.PI/180*square.a)*square.r + square.start_x;

                //square.y + square.speedY;
                //Easing.get(ease, square.start_y, square.target_y, square.t, square.duration);
                square.y = Math.cos(Math.PI/180*square.a)*square.r + square.start_y;

/*
                square.speedY += 0.1;
                square.r = Math.min(255, square.r+2);
                square.g = Math.min(255, square.g+2);
                square.b = Math.min(255, square.b+2);
*/

                ctx.fillRect(square.x-square.h/2, square.y-square.h/2, square.h, square.h);

                if(square.t < square.duration) {
                    visibleSquares.push(square);
                }

                /*if(square.x + square.h/2 > 0 && square.x - square.h/2 < gameCanvas.width
                    && square.y + square.h/2 > 0 && square.y + square.h/2 < gameCanvas.height
                    && (square.r != 255 || square.g !=255 || square.b !=255)) {

                }*/
            }
            allSquares = visibleSquares.concat();

        }
    }
    function rand(min, max) {
        return Math.floor(Math.random()*(max-min+1) + min);
    }

});


