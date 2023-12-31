const axios = require('axios');
const { performance } = require('perf_hooks');
const fs = require('fs');



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

async function testAPIs(apiUrls, isSingleTest, language, numParallelRequests) {
  const results = [];
  const totalTests = isSingleTest? 10 : apiUrls.length * (numParallelRequests); // Single request + numParallelRequests in parallel

  let completedTests = 0;

  for (const apiUrl of apiUrls) {
    // Test for a single request
    
    if(isSingleTest){
        for (let index = 0; index < 10; index++) {
            const singleRequestResult = await makeRequest(apiUrl, false, 1);
            results.push(singleRequestResult);
            completedTests++;
    
            // Print percentage completion
            console.log(`Progress: ${(completedTests / totalTests * 100).toFixed(2)}%`);
        }
        return results;
    }


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

async function saveToJSON(data, language) {
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

  module.exports = {testAPIs, saveToJSON}