import fs from 'fs'
import { prompts } from 'inquirer';

/**
 * 
 * @param {*} questions 
 * @param {*} rand 
 * 
 * [ x ] Implement 'chooseRandom' function
 * [ x ] Should take 2 parameters, 'array' and 'number'
 * [ ] 'array' should default to an empty array
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
export const chooseRandom = (questions = [], numItems) => {
  console.log("");
  console.log("Questions: ", questions, " Items: ", numItems);

  // base cases
  if (questions.length <= 1) return questions;
  if (numItems < 1 || numItems >= questions.length || numItems === undefined) numItems = Math.floor(Math.random() * (questions.length) + 1);
  console.log("Min: ", 1, "Max: ", questions.length);
  console.log("Re-Items: ", numItems);

  // non-mutated array assignment
  let shuffled = [...questions];

  // Fisher Yates method for random sorting
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = k
  }
  console.log("Shuffled: ", shuffled);
  console.log("Result: ", shuffled.slice(0, numItems));

  // return array of specified length
  return shuffled.slice(0, numItems);
}

/**
 * 
 * @param {*} questions 
 * @param {*} numItems 
 * 
 * [ ] Implement createPrompt using the given format below and the given test cases
 * [ ] Implement the createQuestions function based on the format below and provided tests
 * [ ] Ensure all tests for createPrompt & createQuestions are passing when you run the npm test command
 * 
 */
export const createPrompt = (obj = { numQuestions: 1, numChoices: 2 }) => {
  let questions = [];

  for (let q in obj["numQuestions"]) {
    questions.push(
      {
        type: 'input',
        name: `question-${obj["numQuestions"][q]}`,
        message: `Enter question ${obj["numQuestions"][q]}`
      }
    );

    for (let c in obj["numChoices"]) {
      obj.push(
        {
          type: 'input',
          name: `question-${obj["numQuestions"][q]}-choice-${obj["numChoices"][c]}`,
          message: `Enter answer choice ${obj["numChoices"][c]} 1 for question ${obj["numQuestions"][q]}`
        }
      );
    }
  }
  console.log(questions);
  return questions;
}

export const createQuestions = () => {
  // TODO implement createQuestions
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
