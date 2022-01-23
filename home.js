console.log('hello');
// alert('hello this is jw');

// How to write a comment inline

// Variables
var b = 'smoothie';

console.log(b);

var someNumber = 45;

console.log(someNumber);

// var age = prompt('What is your age?');

// document.getElementById('someText').innerHTML = age;


// Stinrgs in Javascript (common methods)
let fruit = 'banana,apple,orange,blackberry';
let moreFruits = 'banana\napple'; //new line

console.log(fruit.length);
console.log(fruit.indexOf('nan'));
console.log(fruit.slice(2,6));
console.log(fruit.replace('ban','123'));
console.log(fruit.toUpperCase());
console.log(fruit.toLowerCase());
console.log(fruit.charAt(2));
console.log(fruit[2]);
console.log(fruit.split(','));
console.log(fruit.split(''));

// Arrays in Javascript

let fruits = ['banana','apple', 'orange','pineapples'];
fruits = new Array('banana','apple', 'orange','pineapples');

console.log(fruits[1]); // access value at index 1st

fruits[0] = 'pear';
console.log(fruits);

for(let i =0; i< fruits.length; i ++){
    console.log(fruits[i]);
}

// array common methods
console.log('to string',fruits.toString());
console.log(fruits.join('-'));
console.log(fruits.pop(),fruits); // removes last item
console.log(fruits.push('blackberries'),fruits); // appends
console.log(fruits[4]);
fruits[fruits.length] = 'new fruit'; // same as push
console.log(fruits);
fruits.shift(); // remove first element from a array
console.log(fruits);
fruits.unshift('kiwi'); // add first element to an array
console.log(fruits);

let vegetables = ['asparagus', 'tomato', 'broccoli'];
let allGroceries = fruits.concat(vegetables); // combine arrays
console.log(allGroceries);
console.log(allGroceries.slice(1,4));
console.log(allGroceries.reverse());
console.log(allGroceries.sort());

let someNumbers = [5, 10, 2, 25, 3, 255 ,1, 2, 5, 334, 321, 2];
console.log(someNumbers.sort(function(a,b){return a-b})); //sorted in ascending order
console.log(someNumbers.sort(function(a,b){return b-a})); //sorted in descending order

let emptyArray = new Array();
for(let num = 0; num < 10; num++){
    emptyArray.push(num);
}
console.log(emptyArray);

// Objects in Javascript

let student = {
    first: 'J', 
    last: 'JW',
    studentInfo: function(){
        return this.first + '\n' + this.last;
    }
};

console.log(student.first);
console.log(student.studentInfo());