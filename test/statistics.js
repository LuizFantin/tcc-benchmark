const _ = require('lodash');
const fs = require('fs');

const inputFile = 'api_test_results.json';
const data = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

function calculateStatistics(results) {
  const responseTimes = results.map(result => result.responseTime);
  const memoryUsages = results.map(result => parseFloat(result.memoryUsage.replace(' MB', '')));


  return {
    meanResponseTime: round(_.mean(responseTimes)),
    medianResponseTime: round(calculateMedian(responseTimes)),
    maxResponseTime: round(_.max(responseTimes)),
    minResponseTime: round(_.min(responseTimes)),
    stdDevResponseTime: round(standardDeviation(responseTimes)),
    meanMemoryUsage: round(_.mean(memoryUsages)),
    medianMemoryUsage: round(calculateMedian(memoryUsages)),
    maxMemoryUsage: round(_.max(memoryUsages)),
    minMemoryUsage: round(_.min(memoryUsages)),
    stdDevMemoryUsage: round(standardDeviation(memoryUsages)),
  };
}

function round(value) {
    return Number(value.toFixed(2));
}

function calculateMedian(data) {
  const sortedData = _.sortBy(data);
  const middle = Math.floor(sortedData.length / 2);

  if (sortedData.length % 2 === 0) {
    return round(_.mean([sortedData[middle - 1], sortedData[middle]]));
  } else {
    return round(sortedData[middle]);
  }
}

function standardDeviation(values) {
  const mean = _.mean(values);
  const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
  const variance = _.mean(squaredDifferences);
  return round(Math.sqrt(variance));
}

const groupedData = _.groupBy(data, item => `${item.language}_${item.results[0].algorithm}`);

const statisticsByGroup = _.mapValues(groupedData, items => {
  const results = _.flatMap(items, item => item.results);
  return calculateStatistics(results);
});

const outputFile = 'statistics_result.json';

fs.writeFileSync(outputFile, JSON.stringify(statisticsByGroup, null, 2));

console.log(`Resultados salvos em ${outputFile}`);
