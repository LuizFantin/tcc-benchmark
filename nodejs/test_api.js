const axios = require('axios');
const { performance } = require('perf_hooks');
const fs = require('fs');

// Replace these URLs with your API endpoints
const apiUrls = [
  'http://localhost:8000/matrix?N=1024&algorithm=multi',
//   'http://localhost:3000/matrix?N=1024&algorithm=linear',
//   'http://localhost:3000/matrix?N=1024&algorithm=strassen',
];

const language = "Golang"
// const language = "Node.js"
// const language = "Node.js"

const numParallelRequests = 10; // Number of parallel requests to make

function extractParamsFromUrl(apiUrl) {
  const parsedUrl = new URL(apiUrl);
  return {
    N: parsedUrl.searchParams.get('N'),
    algorithm: parsedUrl.searchParams.get('algorithm'),
  };
}

async function makeRequest(apiUrl, isParallel, numRequests) {
  try {
    const startTimes = Array.from({ length: numRequests }, () => performance.now());

    const response = await axios.get(apiUrl);

    const endTime = performance.now();
    const responseTime = endTime - Math.min(...startTimes);

    return {
      responseTime,
      isParallel,
      numParallelRequests: isParallel ? numParallelRequests : 1,
      ...extractParamsFromUrl(apiUrl),
      memoryUsage: response.data.memoryUsage,
      isSuccess: true
    };
  } catch (error) {
    console.error(`Error making request to ${apiUrl}: ${error.message}`);
    return {
      responseTime: null,
      isParallel,
      numParallelRequests: isParallel ? numParallelRequests : undefined,
      ...extractParamsFromUrl(apiUrl),
      isSuccess: false
    };
  }
}

async function testAPIs() {
  const results = [];
  const totalTests = apiUrls.length * (1 + numParallelRequests); // Single request + numParallelRequests in parallel

  let completedTests = 0;

  for (const apiUrl of apiUrls) {
    // Test for a single request
    const singleRequestResult = await makeRequest(apiUrl, false, 1);
    results.push(singleRequestResult);
    completedTests++;

    // Print percentage completion
    console.log(`Progress: ${(completedTests / totalTests * 100).toFixed(2)}%`);

    // Test for multiple requests in parallel
    const parallelRequests = Array.from({ length: numParallelRequests }, () =>
      makeRequest(apiUrl, true, 1)
    );
    const parallelResults = await Promise.all(parallelRequests);
    results.push(...parallelResults);
    completedTests += numParallelRequests;

    // Print percentage completion
    console.log(`Progress: ${(completedTests / totalTests * 100).toFixed(2)}%`);
  }

  return results;
}

async function saveToJSON(data) {
    const filename = 'api_test_results.json';
  
    try {
      let existingData = [];
  
      // Read existing data from the file if it exists
      if (fs.existsSync(filename)) {
        const existingContent = fs.readFileSync(filename, 'utf-8');
        existingData = JSON.parse(existingContent);
      }

      // Calculate the next index based on the last index found in the existing data
        const lastIndex = existingData.length > 0 ? existingData[existingData.length - 1].index : 0;
        const nextIndex = lastIndex + 1;
  
      // Add a timestamp or unique identifier to distinguish between test rounds
      const timestamp = new Date().toISOString();
      const newData = {
        index: nextIndex,
        timestamp,
        language,
        results: data,
      };
  
      // Append the new results to the existing data
      existingData.push(newData);
  
      // Write the updated data back to the file
      fs.writeFileSync(filename, JSON.stringify(existingData, null, 2));
  
      console.log(`Results for round ${nextIndex} appended to api_test_results.json`);
    } catch (error) {
      console.error('Error saving results to JSON:', error.message);
    }
  }

// Run the test and save the results to JSON
testAPIs()
  .then((results) => saveToJSON(results))
  .catch((error) => console.error('Error testing APIs:', error));
