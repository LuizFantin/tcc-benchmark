package br.ufes.tcc.benchmarktcc.helper;

import br.ufes.tcc.benchmarktcc.aop.Timer;

import java.util.Random;

public class CreateMatrix {

    private CreateMatrix() {
        throw new UnsupportedOperationException("Classe de utilidades não instanciavel");
    }

    private static final Random random = new Random();

    @Timer
    public static int[][] run(int numRows, int numCols, boolean fillZeros) {
        int[][] matrix = new int[numRows][numCols];

        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                if (fillZeros) {
                    matrix[i][j] = 0;
                } else {
                    matrix[i][j] = random.nextInt(10);
                }
            }
        }

        return matrix;
    }

}
