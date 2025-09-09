1) Difference between var, let, and const:

var: Function-scoped, can be re-declared & updated, hoisted with undefined.

let: Block-scoped, can be updated but not re-declared in same scope.

const: Block-scoped, cannot be re-assigned (but objects/arrays can be mutated).


2) Difference between map(), forEach(), and filter():

map(): Returns a new array with transformed values.

forEach(): Executes a function on each element, does not return anything.

filter(): Returns a new array with elements that pass a condition.

3) Arrow functions in ES6:

A shorter syntax for writing functions (()=>{}).

Do not bind their own this, arguments, or super.

Great for callbacks and simple functions.


4) Destructuring assignment in ES6:

A way to unpack values from arrays/objects into variables.

const [a, b] = [1, 2];  // a=1, b=2
const {name, age} = {name:"Rysul", age:25};

5) Template literals in ES6:

Strings wrapped in backticks (`).

Allow multi-line strings and interpolation with ${expression}.

Easier than + concatenation.

let name = "Rysul";
console.log(`Hello, ${name}!`);
