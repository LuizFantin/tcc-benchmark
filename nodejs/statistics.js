const _ = require('lodash');
const fs = require('fs');

// Lê os dados do arquivo JSON de entrada
const inputFile = 'api_test_results.json';
const data = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

function calculateStatistics(results) {
    const responseTimes = results.map(result => result.responseTime);
    const memoryUsages = results.map(result => parseFloat(result.memoryUsage.replace(' MB', '')));
  
    return {
      meanResponseTime: _.mean(responseTimes),
      medianResponseTime: calculateMedian(responseTimes),
      maxResponseTime: _.max(responseTimes),
      minResponseTime: _.min(responseTimes),
      stdDevResponseTime: standardDeviation(responseTimes),
      meanMemoryUsage: _.mean(memoryUsages),
      medianMemoryUsage: calculateMedian(memoryUsages),
      maxMemoryUsage: _.max(memoryUsages),
      minMemoryUsage: _.min(memoryUsages),
      stdDevMemoryUsage: standardDeviation(memoryUsages),
    };
  }

  // Função para calcular a mediana
function calculateMedian(data) {
    const sortedData = _.sortBy(data);
    const middle = Math.floor(sortedData.length / 2);
  
    if (sortedData.length % 2 === 0) {
      return _.mean([sortedData[middle - 1], sortedData[middle]]);
    } else {
      return sortedData[middle];
    }
}

// Função para calcular o desvio padrão
function standardDeviation(values) {
    const mean = _.mean(values);
    const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
    const variance = _.mean(squaredDifferences);
    return Math.sqrt(variance);
  }

// Agrupamento por Language e Algorithm
const groupedData = _.groupBy(data, item => `${item.language}_${item.results[0].algorithm}`);

// Cálculo das estatísticas para cada grupo
const statisticsByGroup = _.mapValues(groupedData, items => {
  const results = _.flatMap(items, item => item.results);
  return calculateStatistics(results);
});

// Caminho para o arquivo de saída JSON
const outputFile = 'statistics_result.json';

// Escrever o resultado no arquivo JSON
fs.writeFileSync(outputFile, JSON.stringify(statisticsByGroup, null, 2));

console.log(`Resultados salvos em ${outputFile}`);
