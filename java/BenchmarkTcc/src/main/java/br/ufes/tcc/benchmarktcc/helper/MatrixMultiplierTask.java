package br.ufes.tcc.benchmarktcc.helper;

import java.util.List;

public class MatrixMultiplierTask implements Runnable {
    private List<List<Integer>> matrix1;
    private List<List<Integer>> matrix2;
    private List<List<Integer>> result;
    private int startRow;
    private int endRow;

    public MatrixMultiplierTask(List<List<Integer>> matrix1, List<List<Integer>> matrix2, List<List<Integer>> result, int startRow, int endRow) {
        this.matrix1 = matrix1;
        this.matrix2 = matrix2;
        this.result = result;
        this.startRow = startRow;
        this.endRow = endRow;
    }

    @Override
    public void run() {
        for (int i = startRow; i < endRow; i++) {
            for (int j = 0; j < matrix2.get(0).size(); j++) {
                for (int k = 0; k < matrix1.get(0).size(); k++) {
                    result.get(i).set(j, result.get(i).get(j) + matrix1.get(i).get(k) * matrix2.get(k).get(j));
                }
            }
        }
    }
}
