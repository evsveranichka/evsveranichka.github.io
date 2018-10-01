//--------Codewars 6q-------//
/*The function 'fibonacci' should return an array of fibonacci numbers. The function takes a number as an argument to decide how many № of elements
to produce. If the argument is less than or equal to 0 then return empty array*/
function fibonacci(n) {
    //return fibonacci array of n elements
    var resArr = [];
    if (n>0){
        resArr.splice(0, 0, 0, 1);
        for (var i=2; i<n; i++){
            resArr.push(resArr[i-2]+resArr[i-1]);
        }
    }
    return console.log(resArr);
}
fibonacci(5);

/*A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence
"The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).
Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.*/
function isPangram(string){
    var arr = string.toLowerCase().match(/[a-z]/ig).sort();
    console.log(arr);
    var arrRes = [];
    var j=0;
    for (var i=0; i<arr.length; i++){
        if(arr[i]!==arrRes[j-1]){
            arrRes.push(arr[i]);
            j++;
        }
    }
    if (arrRes.length == 26){
        return true;
    } else return false;
}
/** !!!!!!!!!!!!SMART SOLUTION!!!!!!!!!
 function isPangram(string){
  string = string.toLowerCase();
  return "abcdefghijklmnopqrstuvwxyz".split("").every(function(x){
    return string.indexOf(x) !== -1;
  });
} */


/*If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in.
Note: If the number is a multiple of both 3 and 5, only count it once.*/
function solution(number){
    var sum = 0;
    for(var i = 1; i< number; i++){
        if(i % 3 == 0 || i % 5 == 0){
            sum += i
        }
    }
    return sum;
}
console.log(solution(10));

/*The main idea is to count all the occuring characters(UTF-8) in string. If you have string like this aba then the result should be { 'a': 2, 'b': 1 }
What if the string is empty ? Then the result should be empty object literal { }*/
function countLetters (string) {
    var obj = {};
    if (string.length>0){
        var arr = string.match(/[A-Za-z]/ig);
        for (let i=0; i<arr.length; i++){
            (arr[i] in obj) ? obj[arr[i]] += 1 : obj[arr[i]] = 1;
        }
    }
    return console.log(obj);
}
countLetters("aba");

/*Type checking in JavaScript
Create a basic type-checker "framework/api" for JavaScript typer.js. Your API must contain the following methods*/
var typer = (function() {
    return {
        isUndefined: function (x) { return typeof x == "undefined" },
        isFunction:  function (x) { return typeof x == "function" },
        isNumber:    function (x) { return typeof x != "undefined" && typeof x.valueOf() == "number" && !isNaN(x.valueOf()) },
        isString:    function (x) { return typeof x != "undefined" && typeof x.valueOf() == "string" },
        isBoolean:   function (x) { return typeof x != "undefined" && typeof x.valueOf() == "boolean" },
        isArray:     function (x) { return x instanceof Array },
        isDate:      function (x) { return x instanceof Date },
        isRegExp:    function (x) { return x instanceof RegExp },
        isError:     function (x) { return x instanceof Error },
        isNull:      function (x) { return x === null }
    };
}());
console.log(typer.isString('that\'s a string'));
console.log(typer.isRegExp('/\w+/'));



//--------Codewars 7q-------//
/*Write a single function that can be invoked by either*/
function sum (a, b){
    if (b==undefined){
        return function (b) {
            return a+b;
        }
    } else return a+b;
}
console.log(sum(2,3));
console.log(sum(2)(3));

/*Given a string, swap the case for each of the letters.*/
function swap(str){
    var arr = str.split('');
    var resArr = [];
    for (i=0; i<arr.length; i++){
        var uniOfEll = arr[i].charCodeAt(0);
        if(65 <= uniOfEll &&  uniOfEll <= 90){
            resArr.push(arr[i].toLowerCase());
        } else if (97 <= uniOfEll &&  uniOfEll <= 122){
            resArr.push(arr[i].toUpperCase());
        } else {
            resArr.push(arr[i]);
        }
        str = resArr.join('');
    }
    return str;
    /** !!!!!!!!!!!!SMART SOLUTION!!!!!!!!!
     function swap(str){
  return str.replace(/[a-zA-Z]/g, function(c) {
    return c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase();
  });
}
     */
}
swap('ZodeWars');
swap('abc');
swap('123');
swap('ABC');

/*Your task is to make a function that can take any non-negative integer as a argument and return it with its digits in descending order.
Essentially, rearrange the digits to create the highest possible number.*/
function descendingOrder(n){
    n = ''+n;
    return +n.split('').sort(function (a, b) {return b-a;}).join('');
}
console.log(descendingOrder(2354968));

/*You have to write a function pattern which returns the following Pattern(See Examples) up to n rows, where n is parameter.
####Rules/Note:
If the Argument is 0 or a Negative Integer then it should return "" i.e. empty string.
The length of each line = (2n-1).
Range of n is (-∞,100]*/
/** !!!!!!!!!!!!SMART SOLUTION!!!!!!!!!
 function pattern(n) {
  var i, line = '', lines = [];
  for (i=1;i<=n;i++) line += i%10;
  for (i=0;i<n;i++) lines.push(Array(n-i).join(' ')+line+Array(i+1).join(' '));
  return lines.join("\n");
}
 */
function pattern(n){
    var output='';
    if (n <= 0){
        output = '';
    } else {
        for (let i=1; i<=n; i++){
            let temp = '';
            var spaces = n-i;
            for (let j=1; j<=spaces; j++){
                temp += 'a';
            };
            for (let j=1; j<=n; j++){
                temp += j%10;
            }
            if (temp.length < (2*n-1)){
                var rest = 2*n-1-temp.length;
                for (let j=0; j<rest; j++){
                    temp += 'a';
                }
            }
            output += temp + '\n'
        }
    }
    return output.slice(0, -1);
}
console.log(pattern(21));

/*Given an array, find the duplicates in that array, and return a new array of those duplicates.
The elements of the returned array should appear in the order when they first appeared as duplicates.
Note: numbers and their corresponding string representations should not be treated as duplicates (i.e., '1' !== 1).*/
function duplicates(arr) {
    var arr1 = arr.sort();
    var arrRes = [];
    var j=0;
    for (var i=0; i<arr1.length-1; i++){
        console.log(arrRes[j-1])
        if(arr1[i]===arr1[i+1] && arr1[i]!==arrRes[j-1]){
            arrRes.push(arr1[i]);
            j++;
        }
    }
    return console.log(arrRes);
}
duplicates([1, 1, 2, 4, 4, 3, 3, 1, 5, 3, '5', '5']);

/*Create a function named add. This function will return the sum of all the arguments.
The inputs will gradually increase with their index as parameter to the function.*/
function add() {
    return [].reduce.call(arguments, function (sum, item, i) {
        return sum + item*(i+1);
    }, 0)
};
add(); //=> 0
console.log(add(1,2,3)); //=> 14
add(1,4,-5,5); //=> 14
add(3,4,5);

/*Write your function so that in the case a string or a number is passed in as the data , you will return the data in reverse order.
If the data is any other type, return it as it is.*/
function reverseIt(data){
    if (typeof data == "string" || typeof data == "number"){
        data = +(''+data).split('').reverse().join('');
    }
    return data;
}

/*Build a calculator that can calculate the average for an arbitrary number of arguments. It expects Calculator.average(3,4,5) to return 4.
*The test also expects that when you pass no arguments, it returns 0. The arguments are expected to be integers.*/
var Calculator = {
    average: function() {
        var temp=0;
        var result = [].reduce.call(arguments, function (sum, item) {
            return sum + item;
        }, 0);
        return console.log(result/arguments.length);
        /*-----------OR--------------------
        if (arguments.length > 0){
            for (i=0; i<arguments.length; i++){
                temp += arguments[i];
            }
            temp = temp/arguments.length
        }
        return temp;*/
    }
};
Calculator.average(3,4,5);

//-------------1------------//
/*Есть объект из чисел, строк и прочих данных. Необходимо его превратить в массив состоящий только из чисел или строк.
Написать метод extractNumber или extractString, который будет возвращать массив.*/
var obj = {
    person1Age: 20,
    person1Name: 'Ivanov',
    person2Age: 30,
    person2Name: 'Petrov',
    person3Age: 40,
    person3Name: 'Sidorov',
    extractArray: function (obj, agesArr, namesArr) {
        parseObj:
            for (var key in obj){
                if (!isNaN(+obj[key])){
                    agesArr.push(obj[key]);
                    //console.log(agesArr);
                } else if (isNaN(+obj[key])){
                    namesArr.push(obj[key]);
                    //console.log(namesArr);
                } else continue parseObj;
            }
        return console.log(agesArr+'\n'+namesArr);
    }
};
var ages = [];
var names = [];
obj.extractArray(obj, ages, names);

//-------------2------------//
/*написать функцию, которая будет принимать на вход массив чисел и возвращать самое большое*/
function getMaxNumber(arr) {
    var max = arr[0];
    for (i=1; i<arr.length; i++){
        (arr[i] > max) ? max = arr[i] : max;
    }
    /*var max = Math.max.apply(this, arr)*/
    return console.log(max);
}
getMaxNumber([1,30,40,2,7]); // 40
getMaxNumber([1,15,-20,2,-7]); // 15

//-------------3------------//
/*Write a JavaScript function that returns a passed string with letters in alphabetical order.*/
function strinsSorter(str) {
    return console.log(str.split('').sort().join(''));
}
strinsSorter('webmaster');

//-------------4------------//
/*Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word
of the string in upper case*/
function wordsUpper(str) {
    var arr = str.split(' ');
    arr.forEach(function (item, i) {
        arr[i] = item[0].toUpperCase() + item.substring(1);
    });
    return console.log(str = arr.join(' '));
    /*return console.log(arr.map(function (arr1) {
        return arr1[0].toUpperCase() + arr1.slice(1);
    }).join(' '));*/
}
wordsUpper('the quick brown fox');

//-------------5------------//
/*Write a JavaScript function that accepts a string as a parameter and find the longest word within the string.*/
function findLongest(str) {
    var max = 0;
    var arr = str.split(' ');
    for(var i=0; i<arr.length-1; i++) {
        (arr[i].length > arr[i+1].length) ? max = i : max = i+1;
    };
    return console.log(arr[max]);
}
findLongest('Web Development Tutorial');

//-------------6------------//
/*Write a JavaScript function which accepts an argument and returns the type.
Note: There are six possible values that typeof returns: object, boolean, function, number, string, and undefined*/
function returnType(arg) {
    return console.log(typeof arg);
}
returnType(false);

//-------------7------------//
/*Write a function suffle(arr) to shuffle an array.*/
function shuffleArray(arr){
    var rand; var resultArr = [];
    var arrArgs = arr.length;
    for (var i=0; i<arrArgs; i++){
        rand = Math.floor(Math.random()*arr.length);
        resultArr.push(arr[rand]);
        arr.splice(rand, 1);
    }
    return console.log(resultArr);
}
shuffleArray([1,2,3,4,5,6,7,8,9,10]);

//-------------8------------//
/*Имеется массив css классов со старницы. Необходимо из этого массива получить массив с уникальными именами классов
(без повторений) отсортированный по частоте использования (наиболее часто используемые - впереди).*/
var arr = ['link', 'menu', 'menu__item', 'menu__item', 'header', 'link', 'footer', 'sidebar', 'link'];
function cssCounter(arr) {
    var obj = {};
    var result = [];
    for (var i=0; i<arr.length; i++){
        var index = arr[i];
        (index in obj) ? obj[index] +=1 : obj[index]=1;
        //console.log(obj[index] in obj);
    }
    console.log(obj);
    //obj.sort();
    for (var key in obj){
        result.push(key);
    }
    result.sort(function (a, b) {
        return obj[b]-obj[a];
    });
    return result;
}
var arr2 = cssCounter(arr);
console.log(arr2);
