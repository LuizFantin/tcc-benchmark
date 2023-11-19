package br.ufes.tcc.benchmarktcc.service;

import br.ufes.tcc.benchmarktcc.aop.Timer;
import br.ufes.tcc.benchmarktcc.factory.AlgorithmEnum;
import br.ufes.tcc.benchmarktcc.factory.AlgorithmSolver;
import br.ufes.tcc.benchmarktcc.helper.CreateMatrix;
import br.ufes.tcc.benchmarktcc.helper.MatrixMultiplierTask;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;

@Service
@RequiredArgsConstructor
public class MultiLinearMultiplySolver implements AlgorithmSolver {

    private final ExecutorService pools;

    @Override
    public AlgorithmEnum getType() {
        return AlgorithmEnum.MULTI;
    }

    @Timer
    public int[][] execute(int[][] m1, int[][] m2) {
        int numThreads = Runtime.getRuntime().availableProcessors();

        int numRows1 = m1.length;
        int numCols1 = m1[0].length;
        int numCols2 = m2[0].length;

        int[][] result = CreateMatrix.run(numRows1, numCols2, true);

        int rowsPerThread = numRows1 / numThreads;

        List<CompletableFuture<Void>> futuresList = new ArrayList<>();

        for (int i = 0; i < numThreads; i++) {
            int startRow = i * rowsPerThread;
            int endRow = (i == numThreads - 1) ? numRows1 : startRow + rowsPerThread;
            var future = CompletableFuture.runAsync(new MatrixMultiplierTask(m1, m2, result, startRow, endRow), pools);
            futuresList.add(future);
        }

        CompletableFuture<Void>[] futures = futuresList.toArray(new CompletableFuture[0]);

        // ESPERANDO TODAS AS TASKS COMPLETAREM
        CompletableFuture.allOf(futures);

        return result;
    }

}