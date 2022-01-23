// Challenge 1: Your Age in Days
function ageInDays(){
    var birthYear = prompt('What year were you born... Good friend?');
    var ageInDay = (2022 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDay + ' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "static/images/big-mouth-cat.gif";
    image.style = "height: 130px; width: 180px";
    div.appendChild(image);
}