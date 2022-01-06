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
 * [ ] Run command 'npm test' and ensure all tests for chooseRandom pass successfully
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
 * @param {*} obj 
 * 
 * [ ] Implement 'createPrompt' using the given format below and the given test cases
 * [ ] Ensure all tests for 'createPrompt' & 'createQuestions' are passing when you run the npm test command
 * 
 */
export const createPrompt = (obj = { numQuestions: 1, numChoices: 2 }) => {
  let questions = { ...obj };
  let result = [];

  // console.log("ORIGINAL_OBJECT: ", obj);
  // console.log("ORIGINAL_QUESTIONS: ", questions);

  // base cases
  if (obj["numQuestions"] < 1) questions["numQuestions"] = 1;
  if (obj["numChoices"] < 2) questions["numChoices"] = 2;
  if (obj["numQuestions"] === undefined || obj["numChoices"] < 2 === undefined) {
    questions = {
      numQuestions: 1,
      numChoices: 2
    }
  }
  // console.log('CHANGES', questions);

  for (let q = 1; q <= questions["numQuestions"]; q++) {
    result.push(
      {
        type: 'input',
        name: `question-${q}`,
        message: `Enter question ${q}`
      }
    );

    for (let c = 1; c <= questions["numChoices"]; c++) {
      result.push(
        {
          type: 'input',
          name: `question-${q}-choice-${c}`,
          message: `Enter answer choice ${c} for question ${q}`
        }
      );
    }
  }
  // console.log("Result: ", result, '\n', result.length);
  // console.log("ACTUAL: ", result.length);
  // console.log("TARGET: ", questions["numQuestions"] + (questions["numQuestions"] * questions["numChoices"]));
  return result;
}

/**
 * 
 * @param {*} obj 
 * 
 * [ ] Implement the 'createQuestions' function based on the format below and provided tests
 * [ ] Ensure all tests for 'createPrompt' & 'createQuestions' are passing when you run the npm test command
 * 
 */
export const createQuestions = (obj = {}) => {
  /**
   *      let obj = { 
   *          question: 'some-text', 
   *          choice: 'some-choice'
   *      }
   */

  console.log('\n', 'INPUT: ', obj);

  let questions = { ...obj };
  let result = [];

  for (let q in questions) {
    let choicesArr = [];
    if (/choice/gi.test(q)) { // if key contains 'choice'
      choicesArr.push(questions[q]);
    }

    result.push(
      {
        type: 'list',
        name: q,
        message: questions[q],
        choices: choicesArr
      }
    )
  }
  console.log("OUTPUT: ", result);
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
