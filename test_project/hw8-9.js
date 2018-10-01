/*-----------LESSON 9------------*/
// Task9-1 Создайте функцию sumArgs(), которая будет суммировать все свои аргументы:
function sumArgs() {
    return [].reduce.call(arguments, function (a, b) {
        return a+b;
    }, 0);
}
console.log(sumArgs(1, 2, 3) ); // 6, аргументы переданы через запятую, без массива

// Task9-2 Напишите функцию applyAll(func, arg1, arg2...), которая получает функцию func и произвольное количество аргументов.
//Она должна вызвать func(arg1, arg2...), то есть передать в func все аргументы, начиная со второго, и возвратить результат.
function applyAll(func) {
    var inArgs = [].slice.call(arguments);
    inArgs.splice(0,1);
    return func.apply(this, inArgs);
}

console.log( applyAll(Math.max, 2, -2, 3) ); // 3
console.log( applyAll(Math.min, 2, -2, 3) ); // -2
function sum() { // суммирует аргументы: sum(1,2,3) = 6
    return [].reduce.call(arguments, function(a, b) {
        return a + b;
    });
}
function mul() { // перемножает аргументы: mul(2,3,4) = 24
    return [].reduce.call(arguments, function(a, b) {
        return a * b;
    });
}
console.log( applyAll(sum, 1, 2, 3) ); // -> sum(1, 2, 3) = 6
console.log( applyAll(mul, 2, 3, 4) ); // -> mul(2, 3, 4) = 24

// Task9-3 Создайте декоратор makeLogging(func, log), для функции func возвращающий обёртку,
// которая при каждом вызове добавляет её аргументы в массив log. func допускается с любым количеством аргументов.
function work(a, b) {
    console.log( a + b ); // work - произвольная функция
}
function makeLogging(f, log) {
    return function () {
        var args = [].slice.call(arguments);
        log.push(args);
        return f.apply(this, arguments);
    }
}
var log = [];
work = makeLogging(work, log);

work(1, 9); // 3
work(4, 5); // 9
console.log(log);
for (var i = 0; i < log.length; i++) {
    var args = log[i]; // массив из аргументов i-го вызова
    console.log( 'Лог:' + args.join() ); // "Лог:1,2", "Лог:4,5"
}






/*-----------LESSON 8------------*/
// Task8-1 Модифицируйте код методов объекта, чтобы вызовы можно было делать цепочкой
//!!!!!!!!Маетод, который используется для цепочки должен возвращать this, чтоб можно было после него использовать следующий
var ladder = {
    step: 0,
    up: function() { // вверх по лестнице
        this.step++;
        return this; //
    },
    down: function() { // вниз по лестнице
        this.step--;
        return this;
    },
    showStep: function() { // вывести текущую ступеньку
        console.log( this.step );
    }
};
ladder.up().up().down().up().showStep();

// Task8-2 Напишите конструктор Calculator, который создаёт расширяемые объекты-калькуляторы
function Calculator() {
    var newFunc = {};
    this.name = null;
    this.func = null;
    this.a = null;
    this.b = null;
    this.calculate = function(str) {
        var arr = str.split(' ');
        this.name = arr[1];
        this.a = +arr[0];
        this.b = +arr[2];
        this.func = newFunc[this.name];
        if (this.name in newFunc) {
            return this.func(this.a, this.b);
        } else {
            return 'This operation is not defined yet';
        }
    };
    this.addMethod = function (name, func) {
        newFunc[name] = func;
        //console.log(newFunc);
    };
}
var calc = new Calculator();
calc.addMethod('*', function(a, b) {
    return a * b;
});
calc.addMethod('+', function(a, b) {
    return a + b;
});
var result = calc.calculate('18 / 3');
console.log( result ); // 8

calc.addMethod('/', function(a, b) {
    return a / b;
});
calc.addMethod('**', function(a, b) {
    return Math.pow(a, b);
});
var result = calc.calculate('18 / 3');
console.log( result ); // 8

/* Task8-3  есть объект User, который хранит имя и фамилию в свойстве this.fullName.
Сделайте, чтобы были доступны свойства firstName и lastName, причём не только на чтение, но и на запись.
fullName должно остаться свойством, а firstName/lastName — реализованы через get/set.  */
function User(fullName) {
    this.fullName = fullName;
    var nameSep = fullName.split(' ');

    Object.defineProperties(this, {
        firstName: {
            get: function (fullName) {
                return nameSep[0];
            },
            set: function (firstName) {
                nameSep[0] = firstName;
                this.fullName = nameSep.join(' ');
            }
        },
        lastName: {
            get: function (fullName) {
                return nameSep[1];
            },
            set: function (lastName) {
                nameSep[1] = lastName;
                this.fullName = nameSep.join(' ');
            }
        }
    })
}
var vasya = new User('Александр Пушкин');

// чтение firstName/lastName
console.log( vasya.firstName ); // Александр
console.log( vasya.lastName ); // Пушкин

// запись в lastName
vasya.lastName = 'Brown';
console.log( vasya.fullName ); // Александр Толстой

//Task8-4 Добавить в конструктор Article:
//•	Подсчёт общего количества созданных объектов.
//•	Запоминание даты последнего созданного объекта.
//•	Используйте для этого статические свойства.
//    Пусть вызов Article.showStats() выводит то и другое.
function Article() {
    Article.created = new Date().getTime();
    console.log('Текущий: ' + Article.created);
    Article.counter++;
    Article.showStats = function () {
        return console.log('Всего вызвано: ' + this.counter + '\nПоследний: ' + Article.created);
    };
};
Article.counter = 0;

new Article();
Article.showStats(); // Всего: 1, Последняя: (дата)
new Article();
new Article();
Article.showStats(); // Всего: 3, Последняя: (дата)