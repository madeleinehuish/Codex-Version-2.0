/* eslint-disable camelcase, max-len */

'use strict';

exports.seed = function(knex) {
  return knex('snippets').del()
    .then(() => {
      return knex('snippets').insert([{
        id: 1,
        user_id: 1,
        title: 'Fibonacci Function',
        code_snippet: `function fibonacci(indexNumber) {
	if (indexNumber === 0 || indexNumber === 1) {
		return 1;
	} else {
		return (fibonacci(indexNumber-1) + fibonacci(indexNumber-2));
	}
}

fibonacci();`,
        notes: 'This code uses recursive functions to arrive at any Fibonacci number, given its index in the sequence.',
        language: 'JavaScript',
        keywords: 'recursive functions, fibonacci',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        user_id: 2,
        title: 'Reduce Function',
        code_snippet: `var sum = [0, 1, 2, 3].reduce(function(a, b) {
    return a + b;
    }, 0);
    // sum is 6

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
    return a.concat(b);
    }, []);
    // flattened is [0, 1, 2, 3, 4, 5]`,
        notes: '2 examples of the reduce function from MDN',
        language: 'JavaScript',
        keywords: 'summing, flattened array',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        user_id: 2,
        title: 'merging objects with same properties',
        code_snippet: `var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };

var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }`,
        notes: 'example of object.assign from MDN',
        language: 'JavaScript',
        keywords: 'object.assign',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 4,
        user_id: 2,
        title: 'binary search',
        code_snippet: `const binarySearch = function(array, value) {
  let low  = 0,
      high = array.length - 1,
      mid;
  while (low <= high) {
    mid = Math.floor(low + (high - low) / 2);
    if (array[mid] === value) {
      return mid;
    } else if (array[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return - 1;
}`,
        notes: 'from CS exercises',
        language: 'JavaScript',
        keywords: 'algorithms',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 5,
        user_id: 2,
        title: 'calculate average of an array',
        code_snippet: `/*
        Calculate Average value of Array elements using Java Example
        This Java Example shows how to calculate average value of array
        elements.
*/
public class CalculateArrayAverageExample {

        public static void main(String[] args) {

                //define an array
                int[] numbers = new int[]{10,20,15,25,16,60,100};

                /*
                 * Average value of array elements would be
                 * sum of all elements/total number of elements
                 */

                //calculate sum of all array elements
                int sum = 0;

                for(int i=0; i < numbers.length ; i++)
                        sum = sum + numbers[i];

                //calculate average value
                double average = sum / numbers.length;

                System.out.println("Average value of array elements is : " + average);
        }
}

/*
Output of Calculate Average value of Array elements using Java Example would be
Average value of array elements is : 35.0
*/`,
        notes: 'an example from the internet',
        language: 'Java',
        keywords: 'average',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 6,
        user_id: 2,
        title: 'linear search',
        code_snippet: `const linearSearch = function(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }


}`,
        notes: 'from CS exercises',
        language: 'JavaScript',
        keywords: 'algorithms',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 7,
        user_id: 2,
        title: 'Loop through a collection and return a deeply-nested property from each item',
        code_snippet: `// Fetch the name of the first pet from each owner
var ownerArr = [{
    "owner": "Colin",
    "pets": [{"name":"dog1"}, {"name": "dog2"}]
}, {
    "owner": "John",
    "pets": [{"name":"dog3"}, {"name": "dog4"}]
}];

// Array's map method.
ownerArr.map(function(owner){
   return owner.pets[0].name;
});

// Lodash
_.map(ownerArr, 'pets[0].name');
`,
        notes: `Lodash's map method works exactly like Javascript native array method except that it has a sweet upgrade. It's able to navigate deeply-nested property by just providing a string instead of a callback function.`,
        language: 'JavaScript',
        keywords: 'Lodash',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 8,
        user_id: 2,
        title: 'Loop for N times',
        code_snippet: `// 1. Basic for loop.
for(var i = 0; i < 5; i++) {
    // ....
}

// 2. Using Array's join and split methods
Array.apply(null, Array(5)).forEach(function(){
    // ...
});

// Lodash
_.times(5, function(){
    // ...
});
`,
        notes: `The for loop is the classic workhorse for such a use-case but it pollutes the scope with an additional variable. With array and the apply method, we can achieve the N loop without creating an additional variable. However, it is still a tad lengthy for my taste. Lodash's _.times method is self-explanatory. Easy on the eyes and my fingers.`,
        language: 'JavaScript',
        keywords: 'Lodash',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 9,
        user_id: 2,
        title: 'Create an array of N size and populate them with unique values of the same prefix',
        code_snippet: `// Create an array of length 6 and populate them with unique values. The value must be prefix with "ball_".
// eg. [ball_0, ball_1, ball_2, ball_3, ball_4, ball_5]

// Array's map method.
Array.apply(null, Array(6)).map(function(item, index){
    return "ball_" + index;
});


// Lodash
_.times(6, _.uniqueId.bind(null, 'ball_'));
_.times(6, _.partial(_.uniqueId, 'ball_'));`,
        notes: `We already know how useful _.times is from the previous example. By using it in combination with the _.uniqueId method, we are able to come up with a more concise solution. If you don't want to repeatedly state the context, Lodash have a method for that too. The _.partial method basically does the same thing as the native bind method except it assumes the context to this. Hence, no need to specify the additional context parameter.`,
        language: 'JavaScript',
        keywords: 'Lodash',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 10,
        user_id: 2,
        title: 'get random number between a range',
        code_snippet: `// Get a random number between 15 and 20.

// Naive utility method
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(15, 20);

// Lodash
_.random(15, 20);
_.random(20); // Return random number between 0 to 20
_.random(15, 20, true); // Return random floating numbers between 15 and 20`,
        notes: `The _.random method is pretty dynamic and is able to achieve results that the above naive method can't. Returning random floating number and taking in single parameter as maximum value will add substantial amount of code to our custom utility method.`,
        language: 'JavaScript',
        keywords: 'Lodash',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 11,
        user_id: 2,
        title: 'Select properties from another object to form new object',
        code_snippet: `// Naive method: Returning a new object with selected properties
Object.prototype.pick = function(arr) {
    var _this = this;
    var obj = {};
    arr.forEach(function(key){
        obj[key] = _this[key];
    });

    return obj;
};

var objA = {"name": "colin", "car": "suzuki", "age": 17};

var objB = objA.pick(['car', 'age']);
// {"car": "suzuki", "age": 17}

// Lodash
var objB = _.pick(objA, ['car', 'age']);
// {"car": "suzuki", "age": 17}`,
        notes: `The _.pick method is the opposite of _.omit where you get to pick the selected properties of another object. _.pick comes with all the benefits that _.omit provides too - New object creation and ability to take in single string, array and comparator functions.`,
        language: 'JavaScript',
        keywords: 'Lodash',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('snippets_id_seq', (SELECT MAX(id) FROM snippets));"
      );
    });
};
