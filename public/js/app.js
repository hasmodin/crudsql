
//for loop used when you know how many times you need to repeat a certain block of a code.
//for loop takes three statements 
//inistilize statement
//condition statement
//increament statement

//syntax :

for(let i=0; i<5; i++) {
    //code to be execute
}

//while loop used when you don't know how many times you need to repeat a certain block of a code. 
//but you know the condition that will end the loop

// let i=0;
// while(i<5) {
//     console.log(i);
//     i++;

// }

// let i = 0;
// do {
//     console.log(i);
//     i++
// }while(i<6);

//for-in-loop used loop through properties of an object

const obj = {
    a: 1,
    b: 4,
    c : 10
}

for(let prop in obj) {
    console.log( prop + ":" + obj[prop]);
   
}

let arr = [1, 2, 3,4 ];

let newarr = arr.map(function(element) {
     return element * 2;
    
});
console.log(newarr);