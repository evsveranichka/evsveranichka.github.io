//Task12-4 Напишите функцию throttle(f, ms) – «тормозилку», которая возвращает обёртку, передающую вызов f не чаще,
// чем раз в ms миллисекунд.
//У этой функции должно быть важное существенное отличие от debounce: если игнорируемый вызов оказался последним,
// т.е. после него до окончания задержки ничего нет – то он выполнится.

var f = function(a) {
    console.log(a)
};

function throttle(func, ms) {
    var isThrottled = false,
        savedArgs,
        savedThis;
    function wrapper() {
        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        func.apply(this, arguments); // (1)
        isThrottled = true;
        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
}
// затормозить функцию до одного раза в 1000 мс
var f1000 = throttle(f, 1000);

f1000(1); // выведет 1
f1000(2); // (тормозим, не прошло 1000 мс)
setTimeout(function () {f1000(3)
}, 100); // (тормозим, не прошло 1000 мс)
// когда пройдёт 1000 мс...
// выведет 3, промежуточное значение 2 игнорируется

/*Шаги работы этой функции:
    Декоратор throttle возвращает функцию-обёртку wrapper, которая при первом вызове запускает func и переходит в
    состояние «паузы» (isThrottled = true).
    В этом состоянии все новые вызовы запоминаются в замыкании через savedArgs/savedThis.
    Обратим внимание, что и контекст вызова и аргументы для нас одинаково важны и запоминаются одновременно.
    Только зная и то и другое, можно воспроизвести вызов правильно.
    Далее, когда пройдёт таймаут ms миллисекунд – пауза будет снята, а wrapper – запущен с последними аргументами и
    контекстом (если во время паузы были вызовы).
Шаг (3) запускает именно не саму функцию, а снова wrapper, так как необходимо не только выполнить func, но и снова
поставить выполнение на паузу. Получается последовательность «вызов – пауза… вызов – пауза … вызов – пауза …»,
каждое выполнение в обязательном порядке сопровождается паузой после него. Это удобно описывается рекурсией.*/


//Task12-3 Напишите функцию printNumbersInterval(), которая последовательно выводит в консоль числа от 1 до 20,
// с интервалом между числами 100 мс. То есть, весь вывод должен занимать 2000 мс, в течение которых каждые 100 мс
// в консоли появляется очередное число. Функция должна использовать setInterval
function printNumbersInterval(){
    var i=1;
    var intervalId = setInterval(function go() {
        console.log(i);
        i++;
        if (i>5){clearInterval(intervalId);}
    }, 1000);
}
printNumbersInterval();

//Это же, через setTimeout
function printNumbersTimeout(){
    var i=1;
    setTimeout(function go() {
        console.log(i);
        if (i<21){
            setTimeout(go, 1000);
        }
        i++;
    }, 1000);
}
printNumbersTimeout();

//Task12-2 Напишите функцию debounce(f, ms), которая возвращает обёртку, которая откладывает вызов f на ms миллисекунд.
//«Лишние» вызовы перезаписывают предыдущие отложенные задания. Все аргументы и контекст – передаются.
function f(x) {
    console.log(x);
}
function debounce(func, time) {
    var busy = true;
    return function () {
        if (!busy) return;
        func.apply(this, arguments);
        busy = false;
        setTimeout(function () {
            busy = true;
        }, time);
    }
}

var f1 = debounce(f, 1000);
f1(1); // вызов отложен на 1000 мс
f1(2); // предыдущий отложенный вызов игнорируется, текущий (2) откладывается на 1000 мс
// через 1 секунду будет выполнен вызов f(1)
setTimeout( function() { f1(3) }, 1100); // через 1100 мс отложим вызов еще на 1000 мс
setTimeout( function() { f1(4) }, 1900); // игнорируем вызов (3)

//Task12-1 Напишите функцию delay(f, ms), которая возвращает обёртку вокруг f, задерживающую вызов на ms миллисекунд.
function f(x) {
    console.log(x);
}
function delay(func, time) {
    return function () {
        var args = arguments;
        var context = this;
        setTimeout(function () {
            func.apply(context, args);
        }, time);
    }
}
var f1000 = delay(f, 1000);
var f1500 = delay(f, 1500);
f1000("тест"); // выведет "тест" через 1000 миллисекунд
f1500("тест2"); // выведет "тест2" через 1500 миллисекунд

