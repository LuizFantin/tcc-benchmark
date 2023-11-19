package br.ufes.tcc.benchmarktcc.service;

import br.ufes.tcc.benchmarktcc.aop.Timer;
import br.ufes.tcc.benchmarktcc.factory.AlgorithmEnum;
import br.ufes.tcc.benchmarktcc.factory.AlgorithmSolver;
import org.springframework.stereotype.Service;

@Service
public class LinearMultiplySolver implements AlgorithmSolver {


    @Override
    public AlgorithmEnum getType() {
        return AlgorithmEnum.LINEAR;
    }

    @Timer
    public int[][] execute(int[][] m1, int[][] m2) {
        int rowsA = m1.length;
        int colsA = m1[0].length;
        int rowsB = m2.length;
        int colsB = m2[0].length;

        if (colsA != rowsB) {
            throw new IllegalArgumentException("Matrix dimensions are not compatible for multiplication.");
        }

        int[][] result = new int[rowsA][colsB];

        for (int i = 0; i < rowsA; i++) {
            for (int j = 0; j < colsB; j++) {
                for (int k = 0; k < colsA; k++) {
                    result[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }

        return result;
    }
}
