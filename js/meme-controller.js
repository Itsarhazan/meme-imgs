'use strict';

var gCanvas;
var gCtx;
// var gInputTxt;
// var gPageEditor = document.querySelector('.meme-editor')
// var gElImgs = document.querySelector('.meme-gallery')
var gStartPos;

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    addMouseListeners();
}

function renderMeme(id) {
    gMeme.selectedImgId = id;
    renderCanvas()
}

function onSearchByFilter(word) {
    setFilterBy(word)

    if (word === 'all') {
        var elFunny = document.querySelector('.all')
        elFunny.style.fontSize = '25' + 'px';
        elFunny.style.color = 'red';
    }
    if (word === 'political') {
        var elFunny = document.querySelector('.political')
        elFunny.style.fontSize = '22' + 'px';
        elFunny.style.color = 'red';
    }
    if (word === 'funny') {
        var elFunny = document.querySelector('.funny');
        elFunny.style.fontSize = '22' + 'px';
        var a = parseInt(elFunny.style.fontSize)
        console.log(a);
        a += 10;
        console.log(a);
        elFunny.style.color = 'red';
    }
    if (word === 'priorities') {
        var elFunny = document.querySelector('.priorities')
        elFunny.style.fontSize = '22' + 'px';
        elFunny.style.color = 'red';
    }
    if (word === 'person') {
        var elPriorities = document.querySelector('.person')
        elPriorities.style.fontSize = '22' + 'px';
        elPriorities.style.color = 'red';
    }
    if (word === 'baby') {
        var elIronic = document.querySelector('.baby')
        elIronic.style.fontSize = '22' + 'px';
        elIronic.style.color = 'red';
    }
    renderGallery()
}

function renderCanvas(id) {
    id = gMeme.selectedImgId;
    var img = document.querySelector(`.img-${id}`)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

    var elTxt = document.querySelector('.txt-img')
    if (elTxt.value)
        elTxt.value = gMeme.lines[gMeme.selectedLineIdx].txt;
    gMeme.lines.forEach(line => {
        drawText(line);
    })
}

function btnImg(id) {
    renderMeme(id);
    gMeme.selectedImgId = id;
    document.querySelector('.main-gallery').classList.add('hide');
    document.querySelector('.meme-editor').classList.remove('hide');
}

function onAddTxt(txt) {
    setLineTxt(txt);
    renderCanvas();
}

function drawText(line) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.font = `${line.size}px ${line.font}`;;
    gCtx.fillText(line.txt, line.location.x, line.location.y);
    gCtx.strokeText(line.txt, line.location.x, line.location.y);
}

function onAddLine() {
    if (gMeme.selectedLineIdx === 0 || gMeme.selectedLineIdx === 1)
        gMeme.selectedLineIdx++
        else gMeme.selectedLineIdx = 0;
}

function onClearLine() {
    clearLine()
    renderCanvas()
}

function onSwitchLine() {
    if (gMeme.lines[0].location.y === 350) {
        gMeme.lines[0].location.y = 50;
        gMeme.lines[1].location.y = 350;
    } else {
        gMeme.lines[0].location.y = 350;
        gMeme.lines[1].location.y = 50;
    }
    renderCanvas()
}

function onChangeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
    renderCanvas()
}

function onChangeFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
    renderCanvas()
}

function onSetFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
    renderCanvas()
}

function increaseSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++
        renderCanvas()
}

function decreaseSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--
        renderCanvas()
}

function alignToLeft() {
    gMeme.lines[gMeme.selectedLineIdx].location.x = 0;
    renderCanvas()
}

function alignToCenter() {
    gMeme.lines[gMeme.selectedLineIdx].location.x = 150;
    renderCanvas()
}

function alignToRight() {
    gMeme.lines[gMeme.selectedLineIdx].location.x = 300;
    renderCanvas()
}

function onDownloadMeme(downLodeMeme) {
    downloadMeme(downLodeMeme);
}

function clearCanvas() {
    gMeme.lines[0].txt = ''
    gMeme.lines[1].txt = ''
    gMeme.lines[2].txt = ''
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function getTxtBox() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev);
    console.log('onDown()');

    if (!isTxtClicked(pos)) return;
    setBoxDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
    renderCanvas();
}

function onMove(ev) {
    console.log('onMove()');
    const txt = getTxtBox();
    if (txt.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveTxtBox(dx, dy);
        gStartPos = pos;
        renderCanvas()
    }
}

function onUp() {
    console.log('onUp()');

    setBoxDrag(false)
    document.body.style.cursor = 'grab'

}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}

function toggleMenu(el) {
    console.log('hi');
}