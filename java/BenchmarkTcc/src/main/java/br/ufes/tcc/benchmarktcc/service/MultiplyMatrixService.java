package br.ufes.tcc.benchmarktcc.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import br.ufes.tcc.benchmarktcc.helper.CreateMatrix;
import br.ufes.tcc.benchmarktcc.helper.MatrixMultiplierTask;

@Service
public class MultiplyMatrixService {
	
//	// Quantidade de threads para execucao. Rever quando for testar concorrencia.
//	private Integer numThreads = Runtime.getRuntime().availableProcessors();
//	private final ExecutorService pools = Executors.newFixedThreadPool(numThreads);
	
	public List<List<Integer>> linearMultiply(List<List<Integer>> m1, List<List<Integer>> m2) {
		int rowsA = m1.size();
        int colsA = m1.get(0).size();
        int rowsB = m2.size();
        int colsB = m2.get(0).size();

        if (colsA != rowsB) {
            throw new IllegalArgumentException("Matrix dimensions are not compatible for multiplication.");
        }

        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < rowsA; i++) {
            result.add(new ArrayList<>());
            for (int j = 0; j < colsB; j++) {
                result.get(i).add(0);
                for (int k = 0; k < colsA; k++) {
                    int product = m1.get(i).get(k) * m2.get(k).get(j);
                    result.get(i).set(j, result.get(i).get(j) + product);
                }
            }
        }

        return result;
	}
	
	public List<List<Integer>> multiLinearMultiply(List<List<Integer>> m1, List<List<Integer>> m2) {
	
		 Integer numThreads = Runtime.getRuntime().availableProcessors();
	     ExecutorService pools = Executors.newFixedThreadPool(numThreads);
		
		int numRows1 = m1.size();
        int numCols1 = m1.get(0).size();
        int numCols2 = m2.get(0).size();

        List<List<Integer>> result = CreateMatrix.run(numRows1, numCols2, true);


        // Calculate the number of rows each thread will process
        int rowsPerThread = numRows1 / numThreads;

        for (int i = 0; i < numThreads; i++) {
            int startRow = i * rowsPerThread;
            int endRow = (i == numThreads - 1) ? numRows1 : startRow + rowsPerThread;
            pools.execute(new MatrixMultiplierTask(m1, m2, result, startRow, endRow));
        }

        pools.shutdown();
        try {
        	pools.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return result;
	}
	
	public List<List<Integer>> strassenMatrixMultiply(List<List<Integer>> A, List<List<Integer>> B) {
        int n = A.size();

        if (n <= 2) {
            return standardMatrixMultiply(A, B);
        }

        int newSize = n / 2;

        List<List<Integer>> A11 = submatrix(A, 0, 0, newSize);
        List<List<Integer>> A12 = submatrix(A, 0, newSize, newSize);
        List<List<Integer>> A21 = submatrix(A, newSize, 0, newSize);
        List<List<Integer>> A22 = submatrix(A, newSize, newSize, newSize);

        List<List<Integer>> B11 = submatrix(B, 0, 0, newSize);
        List<List<Integer>> B12 = submatrix(B, 0, newSize, newSize);
        List<List<Integer>> B21 = submatrix(B, newSize, 0, newSize);
        List<List<Integer>> B22 = submatrix(B, newSize, newSize, newSize);

        List<List<Integer>> P1 = strassenMatrixMultiply(addMatrices(A11, A22), addMatrices(B11, B22));
        List<List<Integer>> P2 = strassenMatrixMultiply(addMatrices(A21, A22), B11);
        List<List<Integer>> P3 = strassenMatrixMultiply(A11, subtractMatrices(B12, B22));
        List<List<Integer>> P4 = strassenMatrixMultiply(A22, subtractMatrices(B21, B11));
        List<List<Integer>> P5 = strassenMatrixMultiply(addMatrices(A11, A12), B22);
        List<List<Integer>> P6 = strassenMatrixMultiply(subtractMatrices(A21, A11), addMatrices(B11, B12));
        List<List<Integer>> P7 = strassenMatrixMultiply(subtractMatrices(A12, A22), addMatrices(B21, B22));

        List<List<Integer>> C11 = subtractMatrices(addMatrices(addMatrices(P1, P4), P7), P5);
        List<List<Integer>> C12 = addMatrices(P3, P5);
        List<List<Integer>> C21 = addMatrices(P2, P4);
        List<List<Integer>> C22 = subtractMatrices(addMatrices(P1, P3), addMatrices(P2, P6));

        return combineMatrices(C11, C12, C21, C22);
    }

    private static List<List<Integer>> standardMatrixMultiply(List<List<Integer>> A, List<List<Integer>> B) {
        int n = A.size();
        List<List<Integer>> C = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                int sum = 0;
                for (int k = 0; k < n; k++) {
                    sum += A.get(i).get(k) * B.get(k).get(j);
                }
                row.add(sum);
            }
            C.add(row);
        }

        return C;
    }

    private static List<List<Integer>> addMatrices(List<List<Integer>> A, List<List<Integer>> B) {
        int n = A.size();
        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                row.add(A.get(i).get(j) + B.get(i).get(j));
            }
            result.add(row);
        }

        return result;
    }

    private static List<List<Integer>> subtractMatrices(List<List<Integer>> A, List<List<Integer>> B) {
        int n = A.size();
        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                row.add(A.get(i).get(j) - B.get(i).get(j));
            }
            result.add(row);
        }

        return result;
    }

    private static List<List<Integer>> submatrix(List<List<Integer>> matrix, int rowStart, int colStart, int size) {
        List<List<Integer>> submat = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < size; j++) {
                row.add(matrix.get(rowStart + i).get(colStart + j));
            }
            submat.add(row);
        }

        return submat;
    }

    private static List<List<Integer>> combineMatrices(List<List<Integer>> C11, List<List<Integer>> C12, List<List<Integer>> C21, List<List<Integer>> C22) {
        List<List<Integer>> result = new ArrayList<>();
        int size = C11.size() * 2;

        for (int i = 0; i < size; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < size; j++) {
                if (i < C11.size() && j < C11.size()) {
                    row.add(C11.get(i).get(j));
                } else if (i < C11.size() && j >= C11.size()) {
                    row.add(C12.get(i).get(j - C11.size()));
                } else if (i >= C11.size() && j < C11.size()) {
                    row.add(C21.get(i - C11.size()).get(j));
                } else {
                    row.add(C22.get(i - C11.size()).get(j - C11.size()));
                }
            }
            result.add(row);
        }

        return result;
    }
}
