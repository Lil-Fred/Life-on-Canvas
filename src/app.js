const canvas =document.querySelector('canvas')
const markerTool = document.querySelector('.markerTool')
const dotTool = document.querySelector('.dotTool')
const activeTool = document.getElementById("activeTool")
const undoBtn = document.getElementById("undo-btn");

 canvas.width = 950;
 canvas.height= 450;

let ctx = canvas.getContext('2d');
let startBackgroundColor = 'white';
ctx.fillStyle= startBackgroundColor
ctx.fillRect(0, 0, canvas.width, canvas.height)

let draw_color = "black";
 let draw_width = "2";
let is_drawing = false;

let restoreArray = [];
let index = -1;



function change_color(element) {
    draw_color = element.style.background;
}


//normal paint
function normalPaint() {
    
  activeTool.textContent = `${'Maker Tool'}`
//   activeTool.classList.add('toolAnim')

    function start(e) {
        is_drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft , 
                e.clientY - canvas.offsetTop );
                e.preventDefault();
    }


    function draw(e) {
        if (is_drawing) {
            ctx.lineTo(e.clientX - canvas.offsetLeft , 
                e.clientY - canvas.offsetTop);

            ctx.strokeStyle = draw_color;
            ctx.lineWidth = draw_width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke()
        }
        e.preventDefault();
    }
    console.log("clicked2")
    canvas.addEventListener('touchstart', start,false);
    canvas.addEventListener('touchmove', draw,false);
    canvas.addEventListener('mousedown', start,false);
    canvas.addEventListener('mousemove',draw,false);

    canvas.addEventListener('touchend',stop,false);
    canvas.addEventListener('mouseout',stop,false);
    canvas.addEventListener('mouseup',stop,false);

    //  eraserTool.classList.remove('active')
    markerTool.classList.add('active')
    dotTool.classList.remove('active')

}
normalPaint()


//Dooted Paint
function dotPaint() {

    activeTool.textContent = `${'Dot Tool'}`
    activeTool.classList.add('toolAnim')
       //variables
       let painting = false;
           
       function startPosition(e) {
           painting =true
           draw(e);
       }
 
       function finishPosition() {
           painting =false
           ctx.beginPath()
       }
       
       function draw(e) {
           if (!painting) return;
           ctx.lineWidth = draw_width;
           ctx.lineCap = "round";
 
           ctx.moveTo(e.clientX,e.clientY);
           ctx.stroke();
           ctx.beginPath();
     
           
         }
 
       //EventListener
       canvas.addEventListener('mousedown', startPosition)
       canvas.addEventListener('mousemove', draw)
       canvas.addEventListener('mouseup', finishPosition)
       markerTool.classList.remove('active')
       dotTool.classList.add('active')
 
}



function stop(e) {
    if (is_drawing) {
        ctx.closePath();
        is_drawing = false;
    }
    e.preventDefault();

    if (e.type != 'mouseout') {
        addDrawHistory()     
    }
    //  console.log(restoreArray)
}




////
// Function to add drawing action to history array
////
function addDrawHistory() {
    restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
    index+=1;    
}



// Undo Button event listener - will undo last drawing or clear action.
undoBtn.addEventListener("click", undoLast);


function clearCanvas() {
    ctx.fillStyle= startBackgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    restoreArray = []
    index =- 1
}

////
// Undo function to revert to last snapshot of canvas.
////
function undoLast() {
    if (index <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        restoreArray.pop();
        index = -1;
    } else {
        ctx.putImageData(restoreArray[index - 1], 0, 0);
        restoreArray.pop();
        index--;
    }
}


function changeBackgroundColor() {
    ctx.save();
    ctx.fillStyle = document.getElementById("backgroundColor").value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}
var  canvasColor = document.getElementById("backgroundColor");

canvasColor.addEventListener("input", changeBackgroundColor, false);

// export { draw_width };