package br.ufes.tcc.benchmarktcc.helper;

public class MatrixMultiplierTask implements Runnable {
    private final int[][] matrix1;
    private final int[][] matrix2;
    private final int[][] result;
    private final int startRow;
    private final int endRow;

    public MatrixMultiplierTask(int[][] matrix1, int[][] matrix2, int[][] result, int startRow, int endRow) {
        this.matrix1 = matrix1;
        this.matrix2 = matrix2;
        this.result = result;
        this.startRow = startRow;
        this.endRow = endRow;
    }

    @Override
    public void run() {
        for (int i = startRow; i < endRow; i++) {
            for (int j = 0; j < matrix2[0].length; j++) {
                for (int k = 0; k < matrix1[0].length; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
    }
}

