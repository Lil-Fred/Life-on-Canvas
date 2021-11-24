const showCanvas = document.querySelector('.showCanvas')
const enableFillCanvas = document.querySelector('.enableFillCanvas')
const enableTexture = document.querySelector('.enableTexture')
const fillCanvasinput = document.querySelector('#fillCanvasinput')
const imgtexture = document.querySelector('#imgtexture')

//Download
document.querySelector("a").addEventListener('click', (event)=>
    event.target.href = canvas.toDataURL()

    )

//Show Cnavas
showCanvas.addEventListener('click', function () {
    canvas.classList.toggle('off')
})

//enable Fill Canvas
enableFillCanvas.addEventListener('click', function () {
    fillCanvasinput.classList.toggle('tranasCanvaso')

})

//enable Texture
enableTexture.addEventListener('click', function () {
    imgtexture.classList.toggle('tranasCanvaso')

})

//Texture images
let textureImgs = document.querySelector('.textures')

textureImgs.querySelectorAll('img').forEach((img, i) => {
    img.onclick = (e) => {
        var imgdisp = new Image();
        imgdisp.src = img.src;

        function TextureFunc() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var pat = ctx.createPattern(imgdisp, 'repeat');
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = pat;
            ctx.fill();
        }

        TextureFunc()
    }
})


setTimeout(()=>(
document.querySelector('.loading').classList.add('off')
    ),6000)

// var head = new Image();
// head.src = "http://www.jawad.pk/images/head.png";
// ctx.drawImage(head, 0, 0, 300, 300);
