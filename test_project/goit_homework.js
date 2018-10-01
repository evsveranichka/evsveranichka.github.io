/*-----------LESSON 3------------*/
// Task3-1
function enterOver100() {
    do {
        var over100 = prompt('Введите число более 100');
        if (over100===null) break;
    } while ( +over100 <= 100 );
    console.log(+over100);
}

//Task 3-2
function genPrimeNums(){
    var primeNum = '';
    var countPrime;
    for(var i=1; i<=10; i++)
    {
        countPrime = 0;
        for (var j=1; j<=10; j++)
        {
            if (i % j == 0)
            {
                countPrime++;
            }
        }
        if (i>1 && countPrime <= 2){
           primeNum += i + ' ';
        }
    }
    alert(primeNum);
}

//Task 3-3

function FizzBuzz() {
    for (var i = 1; i<101; i++){
           if (i % 3 == 0 && i % 5 != 0) {
                console.log('Fizz');
           }
            else if (i % 5 == 0){
               if (i % 3 != 0) {
                   console.log('Buzz');
               }
               else {
                   console.log('FizzBuzz');
               }
           }
           else console.log(i);
    }
}

//Task 3-4
function showChessBoard() {
    var boardSize = prompt('Enter board size', 8)
    var chessB = '', chessBoard = '';
    for (var i=0; i <boardSize; i++){
        if (i%2==0){
            for (var j=0; j<boardSize; j++){
                if (j%2==0){
                    chessBoard += '#';
                }
                else {chessBoard += ' ';}
            }
        }
        else{
            for (var j=0; j<boardSize; j++){
                if (j%2==0){
                    chessBoard += ' ';
                }
                else {chessBoard += '#';}
            }
        }
       // console.log(chessBoard);
        chessB += chessBoard + '\n';
        chessBoard = '';
    }
    alert(chessB);
}
//Task 3-5

function pow(x,n) {
    var result = 1;
    for (var i=0; i<n; i++){
        result *= x;
    }

    alert('Итого ' + x + ' в степени ' + n + ' равно ' + result);
    return result;
}


/*-----------LESSON 2------------*/
// Task2-1
function whatYear(){
    var year = prompt ('Какой сейчас год?');
    if (year=='2015'){
        alert ('Вы правы!');
    }
    else{
        alert ('С луны свалился?');
    }
}
// Task2-2
function intNumberToBinary(){
    var result;
    var intNumber = +prompt('Введите любое целое число');
    if (intNumber > 0){
        result = 1;
    }
    else if (intNumber<0){
        result=-1;
    }
    else {result=0;}
    alert(result);
}
// Task2-3
function loginBox() {
    var result=0;
    var loginName = prompt('Введите логин');
    if(loginName=='admin'){
        var passName = prompt('Введите пароль');
        if (passName == 'passw0rd'){
            result = 'Welcome home!';
        } else {
            result = (passName===null)? 'Canceled' : 'Wrong password';
        }
    } else {
        result = (loginName === null) ? 'Canceled' : 'Access denied';
    }
    alert(result);
}
// Task2-4
var a = 1, b = 2;
if (a + b >= 3) {
    result = 'Yep!';
} else {
    result = 'Noup!';
}
var result = (a+b >= 3) ? 'Yep!' : 'Noup!';

// Task2-5
/*var name = 'admin', text;

if (name == 'admin') {
    text = 'Hi';
} else if (name == 'manager') {
    text = 'Hello';
} else if (name == '') {
    text = 'No login';
} else {
    text = '';
}
text = (name == 'admin') ? ('Hi') : ((name == 'manager')? ('Hello') : ((name == '')? 'No login' : '' ));
alert (text);*/
