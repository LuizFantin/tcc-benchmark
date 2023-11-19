package br.ufes.tcc.benchmarktcc.factory;

public interface AlgorithmSolver {

    AlgorithmEnum getType();

    int[][] execute(int[][] m1, int[][] m2);

}
