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
        title: 'test',
        code_snippet: 'test',
        notes: 'test',
        language: 'test',
        keywords: 'test',
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
