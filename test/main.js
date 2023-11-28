const { testAPIs, saveToJSON } = require("./test_api");

//? Node
const apiUrls = [
    'http://localhost:3000/matrix?N=1024&algorithm=multi',
  //   'http://localhost:3000/matrix?N=1024&algorithm=linear',
    // 'http://localhost:3000/matrix?N=1024&algorithm=strassen',
  ];

// //? Java
// const apiUrls = [
//     'http://localhost:8080/matrix?N=1024&algorithm=multi',
//   //   'http://localhost:8080/matrix?N=1024&algorithm=linear',
//     // 'http://localhost:8080/matrix?N=1024&algorithm=strassen',
//   ];

// //? Golang
// const apiUrls = [
//     'http://localhost:8000/matrix?N=1024&algorithm=multi',
//   //   'http://localhost:8000/matrix?N=1024&algorithm=linear',
//     // 'http://localhost:8000/matrix?N=1024&algorithm=strassen',
//   ];

const language = "Node.js"
// const language = "Java"
// const language = "Golang"

const numParallelRequests = 10; // Number of parallel requests to make

const isSingleTest = true;

testAPIs(apiUrls, isSingleTest, language, numParallelRequests)
  .then((results) => saveToJSON(results, language))
  .catch((error) => console.error('Error testing APIs:', error));