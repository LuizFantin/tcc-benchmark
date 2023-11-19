package br.ufes.tcc.benchmarktcc.controller;

import br.ufes.tcc.benchmarktcc.factory.AlgorithmEnum;
import br.ufes.tcc.benchmarktcc.factory.AlgorithmFactory;
import br.ufes.tcc.benchmarktcc.factory.AlgorithmSolver;
import br.ufes.tcc.benchmarktcc.helper.CreateMatrix;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/matrix")
@RequiredArgsConstructor
public class RestControllerApi {


    private final AlgorithmFactory factory;

    @GetMapping
    public ResponseEntity<Object> multiplyMatrix(@RequestParam String algorithm, @RequestParam Integer N) {

        int[][] m1 = CreateMatrix.run(N, N, false);

        int[][] m2 = CreateMatrix.run(N, N, false);


        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();

        System.gc();
        System.runFinalization();

        // Get the heap memory usage
        MemoryUsage heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
        long beforeUsedMemory = heapMemoryUsage.getUsed();


        AlgorithmSolver solver = factory.getAlgorithmSolver(AlgorithmEnum.valueOf(algorithm.toUpperCase()));

        int[][] result = solver.execute(m1, m2);


        System.gc();
        System.runFinalization();

        // Get the heap memory usage again
        heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
        long afterUsedMemory = heapMemoryUsage.getUsed();
        long memoryUsed = afterUsedMemory - beforeUsedMemory;

        Map<String, Object> dataToReturn = new HashMap<>();
        dataToReturn.put("result", result[0][0]);
        dataToReturn.put("m1", m1[0][0]);
        dataToReturn.put("m2", m2[0][0]);
        dataToReturn.put("memoryUsage", memoryUsed / (1024 * 1024) + " MB");
        return ResponseEntity.ok(dataToReturn);
    }

}
