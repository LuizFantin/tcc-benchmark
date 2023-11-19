package br.ufes.tcc.benchmarktcc.helper;

public class MatrixHelper {

    private MatrixHelper() {
        throw new UnsupportedOperationException("Classe de utilidades não instanciavel");
    }

    public static int[][] standardMatrixMultiply(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int sum = 0;
                for (int k = 0; k < n; k++) {
                    sum += A[i][k] * B[k][j];
                }
                C[i][j] = sum;
            }
        }

        return C;
    }

    public static int[][] addMatrices(int[][] A, int[][] B) {
        int n = A.length;
        int[][] result = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                result[i][j] = A[i][j] + B[i][j];
            }
        }

        return result;
    }

    public static int[][] subtractMatrices(int[][] A, int[][] B) {
        int n = A.length;
        int[][] result = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                result[i][j] = A[i][j] - B[i][j];
            }
        }

        return result;
    }

    public static int[][] submatrix(int[][] matrix, int rowStart, int colStart, int size) {
        int[][] submat = new int[size][size];

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                submat[i][j] = matrix[rowStart + i][colStart + j];
            }
        }

        return submat;
    }

    public static int[][] combineMatrices(int[][] C11, int[][] C12, int[][] C21, int[][] C22) {
        int size = C11.length * 2;
        int[][] result = new int[size][size];

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (i < C11.length && j < C11.length) {
                    result[i][j] = C11[i][j];
                } else if (i < C11.length) {
                    result[i][j] = C12[i][j - C11.length];
                } else if (j < C11.length) {
                    result[i][j] = C21[i - C11.length][j];
                } else {
                    result[i][j] = C22[i - C11.length][j - C11.length];
                }
            }
        }

        return result;
    }

}
