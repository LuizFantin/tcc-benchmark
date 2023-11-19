package br.ufes.tcc.benchmarktcc.service;

import br.ufes.tcc.benchmarktcc.aop.Timer;
import br.ufes.tcc.benchmarktcc.factory.AlgorithmEnum;
import br.ufes.tcc.benchmarktcc.factory.AlgorithmSolver;
import org.springframework.stereotype.Service;

import static br.ufes.tcc.benchmarktcc.helper.MatrixHelper.*;

@Service
public class StrassenMatrixMultiplySolver implements AlgorithmSolver {

    @Override
    public AlgorithmEnum getType() {
        return AlgorithmEnum.STRASSEN;
    }

    @Timer
    public int[][] execute(int[][] A, int[][] B) {
        int n = A.length;

        if (n <= 2) {
            return standardMatrixMultiply(A, B);
        }

        int newSize = n / 2;

        int[][] A11 = submatrix(A, 0, 0, newSize);
        int[][] A12 = submatrix(A, 0, newSize, newSize);
        int[][] A21 = submatrix(A, newSize, 0, newSize);
        int[][] A22 = submatrix(A, newSize, newSize, newSize);

        int[][] B11 = submatrix(B, 0, 0, newSize);
        int[][] B12 = submatrix(B, 0, newSize, newSize);
        int[][] B21 = submatrix(B, newSize, 0, newSize);
        int[][] B22 = submatrix(B, newSize, newSize, newSize);

        int[][] P1 = this.execute(addMatrices(A11, A22), addMatrices(B11, B22));
        int[][] P2 = this.execute(addMatrices(A21, A22), B11);
        int[][] P3 = this.execute(A11, subtractMatrices(B12, B22));
        int[][] P4 = this.execute(A22, subtractMatrices(B21, B11));
        int[][] P5 = this.execute(addMatrices(A11, A12), B22);
        int[][] P6 = this.execute(subtractMatrices(A21, A11), addMatrices(B11, B12));
        int[][] P7 = this.execute(subtractMatrices(A12, A22), addMatrices(B21, B22));

        int[][] C11 = subtractMatrices(addMatrices(addMatrices(P1, P4), P7), P5);
        int[][] C12 = addMatrices(P3, P5);
        int[][] C21 = addMatrices(P2, P4);
        int[][] C22 = subtractMatrices(addMatrices(P1, P3), addMatrices(P2, P6));

        return combineMatrices(C11, C12, C21, C22);
    }
}