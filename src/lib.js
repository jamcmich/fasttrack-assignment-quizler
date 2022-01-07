import fs from 'fs'
import { prompts } from 'inquirer';

/**
 * 
 * @param {*} arr 
 * @param {*} numItems 
 * 
 * [ x ] Implement 'chooseRandom' function
 * [ x ] Should take 2 parameters, 'array' and 'number'
 * [ x ] 'array' should default to an empty array
 * [ x ] If 'array' has length 0 or 1, then simply return it
 * [ x ] 'numItems' must be checked to ensure it is a number in the range 1 to 'array.length' (inclusive)
 * [ x ] If 'numItems' is outside of the correct range, then it should be set to a random number within the correct range
 * [ x ] Should always return an array
 * [ x ] Should not mutate the array passed in
 * [ x ] Should return a random array if possible (size > 1)
 * [ x ] Should return an array of the passed in length
 * [ x ] Run command 'npm test' and ensure all tests for chooseRandom pass successfully
 * 
 */
export const chooseRandom = (arr = [], numItems) => {
  // console.log("");
  // console.log("Questions: ", arr, " Items: ", numItems);

  // base cases
  if (numItems < 1 || numItems > arr.length || numItems === undefined) {
    numItems = Math.floor(Math.random() * (arr.length) + 1);
    // console.log("Re-Items: ", numItems);
  }
  // console.log("Min: ", 1, "Max: ", arr.length);
  if (arr.length <= 1) return arr;

  // non-mutated array assignment
  let questions = [...arr];

  // Fisher Yates method for random sorting
  for (let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = questions[i]
    questions[i] = questions[j]
    questions[j] = k
  }
  // console.log("Sorted Questions: ", questions);
  // console.log("Result: ", questions.slice(0, numItems));

  // return array of specified length
  return questions.slice(0, numItems);
}

/**
 * 
 * @param {*} numQuestions
 * @param {*} numChoices
 * 
 * [ x ] Implement 'createPrompt' using the given format below and the given test cases
 * [ x ] Ensure all tests for 'createPrompt' & 'createQuestions' are passing when you run the npm test command
 * 
 */
export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  let result = [];

  for (let q = 1; q <= numQuestions; q++) {
    result.push(
      {
        type: 'input',
        name: `question-${q}`,
        message: `Enter question ${q}`
      }
    );

    for (let c = 1; c <= numChoices; c++) {
      result.push(
        {
          type: 'input',
          name: `question-${q}-choice-${c}`,
          message: `Enter answer choice ${c} for question ${q}`
        }
      );
    }
  }
  return result;
}

/**
 * 
 * @param {*} obj 
 * 
 * [ x ] Implement the 'createQuestions' function based on the format below and provided tests
 * [ x ] Ensure all tests for 'createPrompt' & 'createQuestions' are passing when you run the npm test command
 * 
 */
export const createQuestions = (obj = {}) => {
  // console.log('\n', 'INPUT: ', obj);

  let questions = { ...obj };
  let result = [];

  let temp;
  let getName;
  let getMessage;
  let getChoices = [];

  for (let key in questions) {
    if (!key.includes("choice") || !key.includes(temp)) {
      temp = key // 'question-#'

      getName = key;
      getMessage = questions[key];
    }

    if (key.includes("choice") && key.includes(temp)) {
      getChoices.push(questions[key]);
    }

    let keys = Object.keys(questions);
    let nextIndex = keys.indexOf(key) + 1;
    let nextItem = keys[nextIndex];

    if (nextItem === undefined || !nextItem.includes(temp)) { // look-ahead
      result.push(
        {
          type: 'list',
          name: getName,
          message: getMessage,
          choices: getChoices
        }
      );
      getChoices = [];
    }
  }
  // console.log('\n', 'OUTPUT: ', result);
  return result;
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
