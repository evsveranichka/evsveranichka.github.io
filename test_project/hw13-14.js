function Machine() {
    this._enabled = false; // вместо var enabled
    this.enable = function() {
        this._enabled = true;
    };
    this.disable = function() {
        this._enabled = false;
    };
}
//////Холодильник

function Fridge(power) {
    Machine.call(this);
    var food = []; //массив еды
    var MAX_FOOD = power/100;
    this.addFood = function () {
        if (!this._enabled){
            console.log('ошибка, холодильник выключен');
            return;
        }
        var item = [].slice.call(arguments);
        if ((food.length + item.length) > MAX_FOOD){
            console.log('ошибка, слишком много еды! ' + item + ' не влазит');
            return;
        }
        item.forEach(function (elem) {
            food.push(elem);
        })

    }
    this.getFood = function () {
        return food.slice();
    }
    this.filterFood = function(filter) {
        return food.filter(filter);
    };
    this.removeFood = function (str) {
        console.log(str);
        var foodTitles = [];
        food.forEach(function (elem) {
            foodTitles.push(elem.title);
        });
        var index = foodTitles.indexOf(str);
        console.log(index);
        if (index != -1){
            food.splice(index, 1);
        }
    }
    var parentDisabled = this.disable;
    this.disable = function () {
        parentDisabled.call(arguments);
        if (food.length > 0) {
            console.log('ошибка, в холодильнике есть еда');
        }
    }
}

var fridge = new Fridge(500);
fridge.enable();
fridge.enable();
fridge.addFood({
    title: "котлета",
    calories: 100
});
fridge.addFood({
    title: "сок",
    calories: 30
});
fridge.addFood({
    title: "зелень",
    calories: 10
});
fridge.addFood({
    title: "варенье",
    calories: 150
});
//console.log( fridge.getFood() ); // внутри по-прежнему: котлета, сок, варенье
fridge.removeFood('варенье');

//console.log( fridge.getFood() );
var dietItems = fridge.filterFood(function(item) {
    return item.calories < 50;
});
//console.log(dietItems);
//console.log( fridge.getFood() );
dietItems.forEach(function(item) {
    //console.log( item.title ); // сок, зелень
    fridge.removeFood(item.title);
});
fridge.removeFood('котлета');
console.log( fridge.getFood() );
fridge.disable();



////Кофеварка
function CoffeeMachine(power, capacity) { // capacity - ёмкость кофеварки
    Machine.apply(this, arguments);
    var waterAmount = 0;
    var WATER_HEAT_CAPACITY = 4200;
    var self = this;
    var timerId;
    var isWorking = false;
    function getTimeToBoil() {
        //console.log(self.waterAmount);
        return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }
// "умная" установка свойства
    this.setWaterAmount = function(amount) {
        if (amount < 0) {
            throw new Error("Значение должно быть положительным");
        }
        if (amount > capacity) {
            throw new Error("Нельзя залить больше, чем " + capacity);
        }

        waterAmount = amount;
    };
    this.getWaterAmount = function(amount) {
        return waterAmount;
    };
    this.getPower = function () {
        return console.log('Мощность: '+ power +'Вт');
    }
    function onReady() {
        console.log('Кофе готов!' );
    }
    this.setOnReady = function (func) {
        onReady = func;
    }
    this.run = function() {
        if (!this._enabled){
            console.log('ошибка, кофеварка выключена!');
            return;
        }
        timerId = setTimeout(function(){onReady(); isWorking = false;}, getTimeToBoil());
        isWorking = true;
        console.log('Start');

    };
    this.stop = function () {
        clearTimeout(timerId);
        isWorking = false;
        console.log('Stopped');
    }
    this.addWater = function(amount) {
        this.setWaterAmount(waterAmount + amount);
    };
    this.isRunning = function () {
        if (isWorking){
            console.log('В процессе');
        } else {
            console.log('Off');
        }
    }
    var parentDisable = this.disable;
    this.disable = function () {
        parentDisable.call(this);
        this.stop();
    }
}
var coffeeMachine = new CoffeeMachine(50000, 400);
coffeeMachine.addWater(200);
coffeeMachine.enable();
coffeeMachine.run();
coffeeMachine.disable();
console.log(coffeeMachine._enabled);
//coffeeMachine.isRunning();
/*coffeeMachine.setOnReady(function() {
    //coffeeMachine.stop();
    var amount = coffeeMachine.getWaterAmount();
    console.log( 'Готов кофе: ' + amount + 'мл' ); // Готов кофе: 150 мл
});*/
//setTimeout(function(){coffeeMachine.isRunning()}, 2000);
//coffeeMachine.run();
//coffeeMachine.stop(); // кофе приготовлен не будет
//coffeeMachine.isRunning();