/*-----------LESSON 6------------*/
// Task6-1 Напишите функцию removeClass(obj, cls), которая удаляет класс cls, если он есть:
function removeClass(obj, cls) {
    var clsName = Object.keys(obj);
    var clsArr = obj[clsName[0]].split(' ');
    clsArr.forEach (function (item, index, arr) {
        if (item === cls){
            arr.splice(index, 1);
        }
    });
    obj[clsName[0]] = clsArr.join(' ');
    return obj;
}
var obj = {
    className: 'open menu me menu'
};
console.log(removeClass(obj, 'menu'));

// Task6-2 Есть массив строк arr. Создайте массив arrSorted — из тех же элементов, но отсортированный.
//Исходный массив не должен меняться.
function sortByAlphabeth(arr, arrSort) {
    arrSort = arr.slice();
    return arrSort.sort();
}
var arr = ['HTML', 'JavaScript', 'CSS'];
var arrSorted = sortByAlphabeth(arr, arrSorted);
console.log( arrSorted ); // CSS, HTML, JavaScript
console.log( arr ); // HTML, JavaScript, CSS (без изменений)

// Task6-3 Необходимо отсортировать массив в случайном порядке используя метод sort.
var arr = [1, 2, 3, 4, 5];
function randomSort() {
    return Math.random - 0.5;
}
console.log(arr.sort(randomSort));

//Task6-4 Напишите код, который отсортирует массив объектов people по полю age
var vasya = { name: 'Вася', age: 23 };
var masha = { name: 'Маша', age: 18 };
var vovochka = { name: 'Вовочка', age: 6 };
var people = [ vasya , masha , vovochka ];
function sortByAge(personA, personB) {
    return personA.age - personB.age;
}
console.log(people.sort(sortByAge));

//Task6-5 Необходимо написать функцию isPal(string) которая возвращает true или false
// в зависимости от того является ли строка палиндромом или нет.
function isPal(str) {
    var strNew = str.split(' ').join('').toLowerCase();
    for (var i=0; i < Math.floor(strNew.length/2); i++){
        if (strNew[i] != strNew[strNew.length-1-i]){
            return false;
        }
    }
    return true;
}
console.log(isPal('Anna')); // true
console.log(isPal('А роза упала на лапу Азора')); //true
console.log(isPal('Вася')); //false
console.log(isPal('12321')); //true
console.log(isPal('123212')); //false

//Task6-6 Напишите функцию unique(arr), которая возвращает массив, содержащий только
// уникальные элементы arr (arr — массив строк).
function returnUniqueElements(arr) {
    var uniqueArr = [];
    uniqueArr.push(arr[0]);
    console.log(uniqueArr);
    nextItem:
        for (var i=1; i<arr.length; i++){
            console.log(i+'i');
            for (var j=0; j<uniqueArr.length; j++){
                console.log(j+'j');
                if (arr[i] === uniqueArr[j]){
                    console.log('Iteracia'+ j);
                    continue nextItem;
                }
            }
            uniqueArr.push(arr[i]);
        }
    return uniqueArr;
}
var strings = ['кришна', 'кришна', 'харе', 'харе', 'харе', 'харе', 'кришна', 'кришна', '8-()' ];
console.log( returnUniqueElements(strings) ); // кришна, харе, 8-()
/* или Решение ниже создаёт объект obj = {} и записывает в него все строки как имена свойств.
А затем собирает свойства из объекта в массив через Object.keys(). Дубликатов уже не будет.

function unique(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true; // запомнить строку в виде свойства объекта
  }

  return Object.keys(obj); // или собрать ключи перебором для IE8-
}
 */


//Task6-7 Напишите функцию anClean(arr), которая возвращает массив слов, очищенный от анаграмм.
function cleanOfAnagrams(arr) {
    var clearArr = [];
    clearArr.push(arr[0]);
    nextItem:
        for (var i=1; i<arr.length; i++){
            for (var j=0; j<clearArr.length; j++){
                var sortedArr = arr[i].split('').sort().join('').toLowerCase();
                var sortedClear = clearArr[j].split('').sort().join('').toLowerCase();
                if(sortedArr == sortedClear){
                    continue nextItem;
                }
            }
            clearArr.push(arr[i]);
        }
    return clearArr;
}
var arr = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];
console.log( cleanOfAnagrams(arr) ); // 'воз,киборг,корсет' или 'ЗОВ,гробик,сектор'


    /*-----------LESSON 5------------*/
// Task5-1 Напиште код который выведет сотрудника который выполнил больше всех задач.
function findBestWorker(workers) {
    var workerResult=0, bestIndex='';
    var cnt = 0;
    for (var key in workers){
        if (cnt === 0){
            cnt++;
            bestIndex = key;
            workerResult = +workers[key];
        }
        else if(+workers[key] > workerResult) {
            bestIndex = key;
            workerResult = +workers[key];
        }
    }
    if (cnt===0) return 'Error';
    else return bestIndex;
}
var tasksCompleted = {
    'Anna': '50',
    'Serg': '35',
    'Elena': '100',
    'Anton': '99'
};
console.log(findBestWorker(tasksCompleted));

// Task5-2 Напишите функцию multiplyNumeric которая принимает на вход объект
// и возвращает объект в котором все числовые значения у свойств умножены на 2.
function multiplyNumeric(obj) {
    for (var key in obj){
        if (!isNaN(parseFloat(obj[key]) && isFinite(obj[key]))){
            obj[key] *= 2;
        }
    }
    return obj;
}
var image = {
    width: 100,
    height: 400,
    title: 'Cool image'
};
console.log(multiplyNumeric(image));

/* Task5-3 Напишите код, который:
•	Запрашивает по очереди значения при помощи prompt и сохраняет их в массиве.
•	Заканчивает ввод, как только посетитель введёт пустую строку, не число или нажмёт «Отмена».
•	При этом ноль 0 не должен заканчивать ввод, это разрешённое число.
•	Выводит сумму всех значений массива когда ввод прекращен.
*/
    function calcSumNumbers() {
    var numberArr = [];
    var sumOfNumbers = 0;
    do {
        var getNumPrompt = prompt('Enter your next number');
        console.log(getNumPrompt);
        numberArr.push(+getNumPrompt);
        if (getNumPrompt === null) break;
    }
    while (!(getNumPrompt === null || getNumPrompt === ''));
    console.log(numberArr);
    for (var i=0; i<numberArr.length; i++){
        sumOfNumbers += numberArr[i];
    }
    console.log(sumOfNumbers);
}

/*-----------LESSON 4------------*/
// Task4-1
function fib(n) {

    if(n>2){
        return fib(n-1) + fib(n-2);
    }
    else return 1;
}
//console.log(fib(12));

// Task4-2
function checkSpam(str) {
    str = str.toLowerCase();
    var spam =  str.indexOf('spam') + str.indexOf('sex');
    return spam >= -1 ? 'true' : 'false';
}
//console.log(checkSpam('get new Sex videos'));

// Task4-3
function trimTo20(str) {
    if (str.length > 20){
        return str.substr(0, 20) + '...';
    }
    else return str;
}
//console.log(trimTo20('Ffgjknf8 dsj14 dsf20 gfj'));

// Task4-4 http://www.codewars.com/kata/a-function-within-a-function/train/javascript
// return a function that returns n
function always (n) {
    return function(){
        return n;
    };
}
