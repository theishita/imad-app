console.log('Loaded!');

//change value of main text
var element = document.getElementById('main-txt');
element.innerHTML = 'New value';

//move image on clicking
var img=document.getElementById('cat');
img.onclick = function() {
    img.style.marginleft = '100px';
};
