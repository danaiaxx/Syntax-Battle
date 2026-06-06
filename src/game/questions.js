export const QUESTIONS = [
  {
    id: 1,
    snippetBefore: 'const nums = [1, 2, 3];\nnums.',
    snippetAfter: '(4);',
    correctAnswer: 'push',
    hint: 'Adds an element to the end of an array.',
  },
  {
    id: 2,
    snippetBefore: 'const nums = [1, 2, 3];\nnums.',
    snippetAfter: '();',
    correctAnswer: 'pop',
    hint: 'Removes the last element from an array.',
  },
  {
    id: 3,
    snippetBefore: 'const nums = [2, 4, 6];\nconst doubled = nums.',
    snippetAfter: '(n => n * 2);',
    correctAnswer: 'map',
    hint: 'Creates a new array by transforming each element.',
  },
  {
    id: 4,
    snippetBefore: 'const nums = [1, 2, 3, 4];\nconst evens = nums.',
    snippetAfter: '(n => n % 2 === 0);',
    correctAnswer: 'filter',
    hint: 'Keeps only elements that pass a test.',
  },
  {
    id: 5,
    snippetBefore: 'const nums = [1, 2, 3];\nconst sum = nums.',
    snippetAfter: '((a, b) => a + b, 0);',
    correctAnswer: 'reduce',
    hint: 'Reduces an array to a single value.',
  },
  {
    id: 6,
    snippetBefore: 'const nums = [1, 2, 3];\nnums.',
    snippetAfter: '(0, 0, 99);',
    correctAnswer: 'splice',
    hint: 'Adds or removes elements at a given index.',
  },
  {
    id: 7,
    snippetBefore: 'const arr = [1, 2, 3];\nconst last = arr.',
    snippetAfter: '(-1);',
    correctAnswer: 'at',
    hint: 'Gets an element at an index, including negative indices.',
  },
  {
    id: 8,
    snippetBefore: 'const arr = [1, 2, 3];\nconst found = arr.',
    snippetAfter: '(n => n === 2);',
    correctAnswer: 'find',
    hint: 'Returns the first element that matches a condition.',
  },
  {
    id: 9,
    snippetBefore: 'const arr = [1, 2, 3];\nconst hasTwo = arr.',
    snippetAfter: '(n => n === 2);',
    correctAnswer: 'some',
    hint: 'Checks if at least one element passes a test.',
  },
  {
    id: 10,
    snippetBefore: 'const arr = [2, 4, 6];\nconst allEven = arr.',
    snippetAfter: '(n => n % 2 === 0);',
    correctAnswer: 'every',
    hint: 'Checks if all elements pass a test.',
  },
  {
    id: 11,
    snippetBefore: 'const age = 18;\n',
    snippetAfter: ' (age >= 18) {\n  console.log("adult");\n}',
    correctAnswer: 'if',
    hint: 'Runs code when a condition is true.',
  },
  {
    id: 12,
    snippetBefore: 'const score = 50;\n',
    snippetAfter: ' (score >= 60) {\n  console.log("pass");\n} else {\n  console.log("fail");\n}',
    correctAnswer: 'if',
    hint: 'Conditional branch with an optional else.',
  },
  {
    id: 13,
    snippetBefore: 'let i = 0;\n',
    snippetAfter: ' (i < 5) {\n  console.log(i);\n  i++;\n}',
    correctAnswer: 'while',
    hint: 'Repeats while a condition is true.',
  },
  {
    id: 14,
    snippetBefore: 'for (',
    snippetAfter: ') {\n  console.log(i);\n}',
    correctAnswer: 'let i = 0; i < 3; i++',
    hint: 'Classic for-loop header with init, condition, and increment.',
  },
  {
    id: 15,
    snippetBefore: 'const day = 6;\n',
    snippetAfter: ' (day) {\n  case 6: console.log("Saturday"); break;\n}',
    correctAnswer: 'switch',
    hint: 'Matches a value against multiple cases.',
  },
  {
    id: 16,
    snippetBefore: 'const loggedIn = true;\nif (',
    snippetAfter: ') {\n  showDashboard();\n}',
    correctAnswer: 'loggedIn',
    hint: 'Use the boolean variable directly as the condition.',
  },
  {
    id: 17,
    snippetBefore: 'let count = 0;\ndo {\n  count++;\n} ',
    snippetAfter: ' (count < 3);',
    correctAnswer: 'while',
    hint: 'do-while loops check the condition after each iteration.',
  },
  {
    id: 18,
    snippetBefore: 'const items = ["a", "b"];\nfor (const item ',
    snippetAfter: ' items) {\n  console.log(item);\n}',
    correctAnswer: 'of',
    hint: 'for...of iterates over iterable values.',
  },
  {
    id: 19,
    snippetBefore: '',
    snippetAfter: ' name = "Syntax";\nconsole.log(name);',
    correctAnswer: 'let',
    hint: 'Declares a block-scoped variable that can be reassigned.',
  },
  {
    id: 20,
    snippetBefore: '',
    snippetAfter: ' PI = 3.14;\nconsole.log(PI);',
    correctAnswer: 'const',
    hint: 'Declares a block-scoped constant.',
  },
  {
    id: 21,
    snippetBefore: '',
    snippetAfter: ' counter = 0;\ncounter++;',
    correctAnswer: 'var',
    hint: 'Function-scoped variable declaration (legacy style).',
  },
  {
    id: 22,
    snippetBefore: 'const user = { name: "Ada" };\nconst { name } = ',
    snippetAfter: ';\nconsole.log(name);',
    correctAnswer: 'user',
    hint: 'Destructuring pulls properties from an object.',
  },
  {
    id: 23,
    snippetBefore: 'const a = 1;\nconst b = 2;\nconst nums = [',
    snippetAfter: '];\nconsole.log(nums);',
    correctAnswer: 'a, b',
    hint: 'Array literal containing two variables.',
  },
  {
    id: 24,
    snippetBefore: 'function greet(name) {\n  ',
    snippetAfter: ' `Hello, ${name}`;\n}',
    correctAnswer: 'return',
    hint: 'Sends a value back from a function.',
  },
  {
    id: 25,
    snippetBefore: 'const add = (a, b) => a ',
    snippetAfter: ' b;',
    correctAnswer: '+',
    hint: 'Arrow function returning the sum of a and b.',
  },
  {
    id: 26,
    snippetBefore: 'const values = [10, 20];\nconst [first] = ',
    snippetAfter: ';\nconsole.log(first);',
    correctAnswer: 'values',
    hint: 'Array destructuring assigns the first element.',
  },
  {
    id: 27,
    snippetBefore: 'const msg = null;\nconst text = msg ',
    snippetAfter: ' "default";\nconsole.log(text);',
    correctAnswer: '??',
    hint: 'Nullish coalescing picks the right side only for null/undefined.',
  },
  {
    id: 28,
    snippetBefore: 'const arr = [1, 2, 3];\nconst copy = [',
    snippetAfter: ', 4];',
    correctAnswer: '...arr',
    hint: 'Spread copies all elements from arr into a new array.',
  },
  {
    id: 29,
    snippetBefore: 'const str = "hello";\nconst upper = str.',
    snippetAfter: '();',
    correctAnswer: 'toUpperCase',
    hint: 'Converts a string to uppercase.',
  },
  {
    id: 30,
    snippetBefore: 'const str = "  code  ";\nconst trimmed = str.',
    snippetAfter: '();',
    correctAnswer: 'trim',
    hint: 'Removes whitespace from both ends of a string.',
  },
];

export function assembleQuestion({ snippetBefore, correctAnswer, snippetAfter }) {
  return `${snippetBefore}${correctAnswer}${snippetAfter}`;
}

function validateQuestions() {
  const errors = [];

  for (const question of QUESTIONS) {
    const code = assembleQuestion(question);

    try {
      // eslint-disable-next-line no-new-func
      new Function(code);
    } catch (error) {
      errors.push({ id: question.id, code, message: error.message });
    }
  }

  return errors;
}

if (import.meta.env?.DEV) {
  const errors = validateQuestions();
  if (errors.length > 0) {
    console.error('[questions] Invalid assembled syntax:', errors);
  }
}

export function getRandomQuestion(excludeId = null) {
  const pool = excludeId
    ? QUESTIONS.filter((q) => q.id !== excludeId)
    : QUESTIONS;
  return pool[Math.floor(Math.random() * pool.length)];
}
