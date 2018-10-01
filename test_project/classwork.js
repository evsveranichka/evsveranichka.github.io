//Lesson 13
function User() {
    var firstName = '',
        surname = '';
    this.setFirstName = function(first) {
        firstName = first;
    }
    this.setSurname = function(sur) {
        surname = sur;
    }
    this.getFullName = function () {
        return firstName +' '+ surname;
    }
}
var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");
console.log( user.getFullName() ); // Петя Иванов

//Lesson 6
//Функция сортировки по возрастанию чисел
//Функция сортировки по возрастанию чисел
var arr = [1,6,'gfj',45,32,15,15];
var arr2 = arr.sort(function (a, b) {
    console.log(a + 'a', b);
    if(+a && +b) return a-b;
    else if (+b) return 1;
    else return -1;
});
console.log(arr2);

/*В объекте есть свойство className, которое содержит
список «классов» – слов, разделенных пробелом.
    Создайте функцию addClass(obj, cls), которая добавляет в
список класс cls, но только если его там еще нет.
    Ваша функция не должна добавлять лишних пробелов.
*/
var obj = {
    className: 'open menu'
};
function addClass(obj, cls) {
    var classes = obj.className ? obj.className.split(' ') : [];
    if (classes.indexOf(cls) === -1) {
        classes.push(cls); // добавить
    }
    obj.className = classes.join(' '); // и обновить свойство
}
addClass(obj, 'new'); // obj.className='open menu new'
addClass(obj, 'open'); // без изменений
addClass(obj, 'me'); // obj.className='open menu new me'
console.log( obj.className ); // "open menu new me"

/*Напишите функцию toCamelCase(str), которая преобразует
строки вида «my-short-string» в «myShortString».
Вам пригодятся методы строк charAt, split и toUpperCase.*/
function toCamelCase(str) {
    var arr = str.split('');
    for (var i=0; i<arr.length; i++){
        var index = arr.indexOf('-');
        if (index >= 0){
            arr.splice(index, 1);
            arr[index] = arr[index].toUpperCase();
        }
    }
    str = arr.join('');
    return str;
}
//------------Решение преподавателя-------------
/*function toCamelCase(str) {
    var arr = str.split('-');
    for (var i = 1; i < arr.length; i++) {
// преобразовать: первый символ с большой буквы
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join('');
}*/
console.log(toCamelCase('background-color'));
console.log(toCamelCase('list-style-image'));
console.log(toCamelCase('-webkit-transition'));




// Lesson 5
function returnLastOfArr(arr){
    var numElement = arr.length;
    return arr [numElement-1];
}
var arr = [1,5,8,15];
console.log(returnLastOfArr([1,5,8,15]));

function addElementToArr(arr, element){
    arr.push(element);
    return arr;
}
var arr = [1,5,8,15], element = 'addfgd';
console.log(addElementToArr(arr, element));

function editFruitArray(){
    var fruits = ['apple', 'orange'];
    fruits.push('kiwi');
    fruits[fruits.length-2] = 'pear';
    console.log(fruits.shift());
    fruits.unshift('apricot', 'peach');
    console.log(fruits);
}
editFruitArray();

function randomOfArray(arr){
    var max = arr.length-1;
    var rand = Math.floor(Math.random()*(max+1));
    console.log(rand);
    return arr[rand];
}
console.log(randomOfArray([1,2,3,4,5,6,7,8,9,10]));

function findElementInArr(arr, value){
    var key = -2;
    for (var i=0; i < arr.length; i++){
        if (arr[i] === value) return i;
    }
    return -1;
}
console.log(findElementInArr([1,2,3,4,5,6,7,8,9,10],'5'));

function findRangeInArr(arr, a, b){
    var filtered = [];
    for (var i=0; i < arr.length; i++){
        if (a <= arr[i] && arr[i] <= b ) {
            filtered.push(arr[i]);
        }
    }
    return filtered;
}
console.log(findRangeInArr([8,3,6,2,9,3,4,9], 2, 7));
//--------------------------------------------------------------------------------------//
function random0toMax(max) {
        /*var maxLength = (max.toFixed()).length;
        var randNum = Math.random()*Math.pow(10, maxLength);
        while (max < randNum){
            randNum -= max;
        }
        console.log(randNum);
        return randNum;*/
        var rand = Math.random()*max;
        //console.log(rand);
        return rand;

}

function randomMinToMax(min, max) {
    /*var delta = max - min;
    var maxLength = (max.toFixed()).length;
    var randNum = Math.random()*Math.pow(10, maxLength);
    if (randNum > max){
        while (randNum > max){randNum - delta;};
    }
    else if (randNum < min){
        while (randNum < min) {randNum +delta;}
    }
    else {
        alert(randNum);
        return randNum;

    }
    alert(randNum);
    return randNum;*/
    var rand = min + Math.random()*(max-min);
    //console.log(rand);
    return rand;

}