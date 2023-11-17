package br.ufes.tcc.benchmarktcc.helper;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class CreateMatrix {

	
	public static List<List<Integer>> run(int numRows, int numCols, boolean fillZeros){
		 List<List<Integer>> matrix = new ArrayList<>();
	        Random random = new Random();

	        for (int i = 0; i < numRows; i++) {
	            List<Integer> row = new ArrayList<>();
	            for (int j = 0; j < numCols; j++) {
	                if (fillZeros) {
	                    row.add(0);
	                } else {
	                    row.add(random.nextInt(10));
	                }
	            }
	            matrix.add(row);
	        }

	        return matrix;
	}
}
