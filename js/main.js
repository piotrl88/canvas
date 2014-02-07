
$(document).ready(function() {
    var gameCanvas = document.createElement('canvas');
    gameCanvas.width = 500;
    gameCanvas.height = 500;
    document.body.appendChild(gameCanvas);

    var ctx = gameCanvas.getContext('2d');
    var fps = 60,
        lastTime = 0;

    var allSquares = [];


    animationLoop();
    function animationLoop(time) {
        requestAnimationFrame(animationLoop);
        if(time - lastTime >= 1000/fps) {

            allSquares.push({
                x : gameCanvas.width/ 2,
                y : gameCanvas.height/2,
                h : rand(10, 50),
                r : rand(0, 240),
                g : rand(0, 240),
                b : rand(0, 240),
                speedX : rand(-1000, 1000)/100,
                speedY : rand(-1000, 1000)/100
            });

            if(allSquares[allSquares.length-1].speedX==0 && allSquares[allSquares.length-1].speedY==0) {
                allSquares[allSquares.length-1].speedX = rand(-1000, 1000)/100;
            }

            lastTime = time;
            //ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            ctx.fillStyle = 'rgba(255,255,255, 0.2)';
            ctx.fillRect(0,0, gameCanvas.width, gameCanvas.height);

            for(var i=0; i<allSquares.length; i++) {
                ctx.fillStyle = 'rgb('+allSquares[i].r+','+allSquares[i].g+','+allSquares[i].b+')';
                allSquares[i].x = allSquares[i].x + allSquares[i].speedX;
                allSquares[i].y = allSquares[i].y + allSquares[i].speedY;
                ctx.fillRect(allSquares[i].x-allSquares[i].h/2, allSquares[i].y-allSquares[i].h/2, allSquares[i].h, allSquares[i].h);
            }

        }
    }
    function rand(min, max) {
        return Math.floor(Math.random()*(max-min+1) + min);
    }





   /* ctx.fillRect(0, 0, 100, 100);
    ctx.strokeRect(100, 100, 40, 300);
    ctx.clearRect(50, 50, 200, 200);

    ctx.beginPath();
    ctx.moveTo(30, 140);
    ctx.lineTo(100, 140);
    ctx.lineTo(50, 250);
    ctx.lineTo(10, 150);
    //ctx.fill();
    ctx.closePath();
    ctx.stroke();


    //var radian = Math.PI/180*45
    ctx.beginPath();
    ctx.arc(330, 100, 100, Math.PI/180*45, Math.PI/180*-120, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 250);
    ctx.bezierCurveTo(200, 100, 400, 400, 400, 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(30, 300);
    ctx.lineTo(300, 320);
    ctx.lineTo(400, 380);
    ctx.bezierCurveTo(400, 500, 60, 500, 40, 300);


    ctx.moveTo(150, 350);
    ctx.lineTo(175, 400);
    ctx.lineTo(200, 350);
    ctx.lineTo(150, 350);

    ctx.fill();

    ctx.globalAlpha = 0.6;
    ctx.lineJoin = 'round';
    ctx.fillStyle = '#ff0000';
    ctx.strokeRect(10, 10, 50, 50);

    var gradient = ctx.createLinearGradient(11, 400, 110, 320);
    gradient.addColorStop(0, '#dcf225');
    gradient.addColorStop(0.32, '#0ce0ff');
    gradient.addColorStop(1, '#ff4992');
    ctx.fillStyle = gradient;
    ctx.fillRect(10, 300, 100, 100);
*/

});

