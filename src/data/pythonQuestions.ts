import type { Test, MultipleChoiceQuestion, CodeChallengeQuestion } from '../types'

const basicsQuestions: (MultipleChoiceQuestion | CodeChallengeQuestion)[] = [
  {
    id: 'basics-1',
    type: 'multiple-choice',
    topic: 'Variables',
    difficulty: 'beginner',
    question: 'Which of the following is a valid variable name in Python?',
    options: ['2variable', 'variable-name', 'variable_name', 'variable name'],
    correctAnswer: 2,
    explanation: 'Variable names can contain letters, numbers, and underscores, but cannot start with a number or contain hyphens/spaces.',
    points: 10
  },
  {
    id: 'basics-2',
    type: 'multiple-choice',
    topic: 'Data Types',
    difficulty: 'beginner',
    question: 'What is the data type of the value: 3.14?',
    options: ['int', 'float', 'str', 'bool'],
    correctAnswer: 1,
    explanation: 'Numbers with decimal points are floating-point numbers (float) in Python.',
    points: 10
  },
  {
    id: 'basics-3',
    type: 'code-challenge',
    topic: 'Variables',
    difficulty: 'beginner',
    question: 'Create a variable named "age" and assign it the value 25',
    starterCode: '# Write your code here\n',
    correctAnswer: 'age = 25',
    explanation: 'In Python, you assign values to variables using the = operator.',
    points: 15
  },
  {
    id: 'basics-4',
    type: 'multiple-choice',
    topic: 'Operators',
    difficulty: 'beginner',
    question: 'What is the result of: 10 // 3?',
    options: ['3.33', '3', '4', '3.0'],
    correctAnswer: 1,
    explanation: 'The // operator performs floor division, returning the integer part of the division result.',
    points: 10
  },
  {
    id: 'basics-5',
    type: 'multiple-choice',
    topic: 'Operators',
    difficulty: 'beginner',
    question: 'What does the % operator do?',
    options: ['Percentage', 'Modulo (remainder)', 'Division', 'Multiplication'],
    correctAnswer: 1,
    explanation: 'The % operator returns the remainder after division. For example, 10 % 3 returns 1.',
    points: 10
  },
  {
    id: 'basics-6',
    type: 'code-challenge',
    topic: 'Strings',
    difficulty: 'easy',
    question: 'Create a variable "greeting" with the value "Hello, World!"',
    starterCode: '# Write your code here\n',
    correctAnswer: 'greeting = "Hello, World!"',
    explanation: 'Strings in Python can be enclosed in single or double quotes.',
    points: 15
  },
  {
    id: 'basics-7',
    type: 'multiple-choice',
    topic: 'Data Types',
    difficulty: 'beginner',
    question: 'Which method converts a string to lowercase?',
    options: ['toLower()', 'lowercase()', 'lower()', 'downcase()'],
    correctAnswer: 2,
    explanation: 'The lower() method converts all characters in a string to lowercase.',
    points: 10
  },
  {
    id: 'basics-8',
    type: 'multiple-choice',
    topic: 'Boolean',
    difficulty: 'beginner',
    question: 'What is the result of: 5 > 3 and 2 < 1?',
    options: ['True', 'False', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'The "and" operator requires both conditions to be True. Since 2 < 1 is False, the entire expression is False.',
    points: 10
  }
]

const controlFlowQuestions: (MultipleChoiceQuestion | CodeChallengeQuestion)[] = [
  {
    id: 'control-1',
    type: 'multiple-choice',
    topic: 'Conditionals',
    difficulty: 'beginner',
    question: 'Which keyword is used for conditional statements in Python?',
    options: ['switch', 'if', 'when', 'case'],
    correctAnswer: 1,
    explanation: 'Python uses "if" for conditional statements, followed by "elif" for additional conditions and "else" for the default case.',
    points: 10
  },
  {
    id: 'control-2',
    type: 'code-challenge',
    topic: 'Conditionals',
    difficulty: 'easy',
    question: 'Write an if statement that prints "Adult" if age is 18 or greater',
    starterCode: 'age = 20\n# Write your code here\n',
    correctAnswer: 'if age >= 18:\n    print("Adult")',
    explanation: 'Use the >= operator to check if age is greater than or equal to 18. Remember to indent the print statement.',
    points: 15
  },
  {
    id: 'control-3',
    type: 'multiple-choice',
    topic: 'Loops',
    difficulty: 'beginner',
    question: 'Which loop is used to iterate over a sequence in Python?',
    options: ['while loop only', 'for loop only', 'Both for and while loops', 'foreach loop'],
    correctAnswer: 2,
    explanation: 'Python supports both for loops (for iterating over sequences) and while loops (for conditional iteration).',
    points: 10
  },
  {
    id: 'control-4',
    type: 'multiple-choice',
    topic: 'Loops',
    difficulty: 'easy',
    question: 'What does the "break" statement do in a loop?',
    options: ['Pauses the loop', 'Exits the loop entirely', 'Skips to the next iteration', 'Restarts the loop'],
    correctAnswer: 1,
    explanation: 'The "break" statement immediately exits the loop, regardless of the loop condition.',
    points: 10
  },
  {
    id: 'control-5',
    type: 'code-challenge',
    topic: 'Loops',
    difficulty: 'easy',
    question: 'Write a for loop that prints numbers from 1 to 5',
    starterCode: '# Write your code here\n',
    correctAnswer: 'for i in range(1, 6):\n    print(i)',
    explanation: 'Use range(1, 6) to generate numbers 1 through 5. The range function stops before the second argument.',
    points: 15
  },
  {
    id: 'control-6',
    type: 'multiple-choice',
    topic: 'Conditionals',
    difficulty: 'easy',
    question: 'What keyword is used for "else if" in Python?',
    options: ['elseif', 'else if', 'elif', 'elsif'],
    correctAnswer: 2,
    explanation: 'Python uses "elif" as shorthand for "else if" in conditional statements.',
    points: 10
  },
  {
    id: 'control-7',
    type: 'multiple-choice',
    topic: 'Loops',
    difficulty: 'easy',
    question: 'What does the "continue" statement do?',
    options: ['Exits the loop', 'Skips the rest of the current iteration', 'Restarts the loop', 'Does nothing'],
    correctAnswer: 1,
    explanation: 'The "continue" statement skips the remaining code in the current iteration and moves to the next iteration.',
    points: 10
  },
  {
    id: 'control-8',
    type: 'multiple-choice',
    topic: 'Loops',
    difficulty: 'beginner',
    question: 'What does range(5) generate?',
    options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'],
    correctAnswer: 1,
    explanation: 'range(5) generates numbers from 0 up to (but not including) 5: 0, 1, 2, 3, 4.',
    points: 10
  }
]

const functionsDataQuestions: (MultipleChoiceQuestion | CodeChallengeQuestion)[] = [
  {
    id: 'func-1',
    type: 'multiple-choice',
    topic: 'Functions',
    difficulty: 'beginner',
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'def', 'func', 'define'],
    correctAnswer: 1,
    explanation: 'The "def" keyword is used to define functions in Python.',
    points: 10
  },
  {
    id: 'func-2',
    type: 'code-challenge',
    topic: 'Functions',
    difficulty: 'easy',
    question: 'Define a function named "greet" that takes no parameters and returns "Hello"',
    starterCode: '# Write your code here\n',
    correctAnswer: 'def greet():\n    return "Hello"',
    explanation: 'Use the def keyword, followed by the function name and parentheses. Use return to send back a value.',
    points: 15
  },
  {
    id: 'func-3',
    type: 'multiple-choice',
    topic: 'Lists',
    difficulty: 'beginner',
    question: 'How do you access the first element of a list named "fruits"?',
    options: ['fruits[1]', 'fruits[0]', 'fruits.first()', 'fruits(0)'],
    correctAnswer: 1,
    explanation: 'Python uses zero-based indexing, so the first element is at index 0.',
    points: 10
  },
  {
    id: 'func-4',
    type: 'multiple-choice',
    topic: 'Lists',
    difficulty: 'easy',
    question: 'Which method adds an item to the end of a list?',
    options: ['add()', 'push()', 'append()', 'insert()'],
    correctAnswer: 2,
    explanation: 'The append() method adds an item to the end of a list.',
    points: 10
  },
  {
    id: 'func-5',
    type: 'code-challenge',
    topic: 'Lists',
    difficulty: 'easy',
    question: 'Create a list named "colors" with three elements: "red", "green", "blue"',
    starterCode: '# Write your code here\n',
    correctAnswer: 'colors = ["red", "green", "blue"]',
    explanation: 'Lists are created using square brackets with comma-separated values.',
    points: 15
  },
  {
    id: 'func-6',
    type: 'multiple-choice',
    topic: 'Dictionaries',
    difficulty: 'beginner',
    question: 'What data structure uses key-value pairs?',
    options: ['List', 'Tuple', 'Dictionary', 'Set'],
    correctAnswer: 2,
    explanation: 'Dictionaries store data as key-value pairs, allowing fast lookup by key.',
    points: 10
  },
  {
    id: 'func-7',
    type: 'multiple-choice',
    topic: 'Dictionaries',
    difficulty: 'easy',
    question: 'How do you access the value associated with key "name" in a dictionary "person"?',
    options: ['person.name', 'person["name"]', 'person("name")', 'person->name'],
    correctAnswer: 1,
    explanation: 'Dictionary values are accessed using square brackets with the key inside.',
    points: 10
  },
  {
    id: 'func-8',
    type: 'code-challenge',
    topic: 'Dictionaries',
    difficulty: 'medium',
    question: 'Create a dictionary "student" with keys "name" (value: "Alice") and "age" (value: 20)',
    starterCode: '# Write your code here\n',
    correctAnswer: 'student = {"name": "Alice", "age": 20}',
    explanation: 'Dictionaries use curly braces with key:value pairs separated by commas.',
    points: 15
  },
  {
    id: 'func-9',
    type: 'multiple-choice',
    topic: 'Functions',
    difficulty: 'easy',
    question: 'What keyword is used to exit a function and return a value?',
    options: ['exit', 'return', 'break', 'yield'],
    correctAnswer: 1,
    explanation: 'The "return" keyword exits a function and optionally returns a value to the caller.',
    points: 10
  }
]

export const pythonTests: Test[] = [
  {
    id: 'test-1',
    title: 'Python Basics',
    description: 'Test your knowledge of Python fundamentals: variables, data types, and basic operators.',
    questions: basicsQuestions
  },
  {
    id: 'test-2',
    title: 'Control Flow',
    description: 'Master conditionals and loops: if/elif/else statements, for loops, and while loops.',
    questions: controlFlowQuestions
  },
  {
    id: 'test-3',
    title: 'Functions & Data Structures',
    description: 'Explore functions, lists, and dictionaries in Python.',
    questions: functionsDataQuestions
  }
]
