// http://www.codewars.com/kata/unpacking-arguments
/*You must create a function, spread, that takes a function and a list of arguments to be applied to that function.
You must make this function return the result of calling the given function/lambda with the given arguments.*/
function spread(func, args) {
    return func.apply(this, args);
}

// http://www.codewars.com/kata/closures-and-scopes/
//------------- Объяснение https://learn.javascript.ru/task/make-army --------------
/* We want to create a function, which returns an array of functions, which return their index in the array.
For better understanding, here an example:
var callbacks = createFunctions(5); // create an array, containing 5 functions
callbacks[0](); // must return 0
callbacks[3](); // must return 3
We already implemented that function, but when we actually run the code, the result doesn't look like what we expected.
Can you spot, what's wrong with it? A test fixture is also available
    function createFunctions(n) {
      var callbacks = [];

      for (var i=0; i<n; i++) {
        callbacks.push(function() {
          return i;
        });
      }

      return callbacks;
    }*/
function createFunctions(n) {
    var callbacks = [];
    var func = function(x) {
        return function() {return x;}
    };
    for (var i=0; i<n; i++) {
        callbacks.push(func(i));
    }
    return callbacks;
}
var callbacks = createFunctions(5); // create an array, containing 5 functions
console.log(callbacks[0]()); // must return 0
console.log(callbacks[3]()); // must return 3
