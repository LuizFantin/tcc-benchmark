package br.ufes.tcc.benchmarktcc.controller;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufes.tcc.benchmarktcc.helper.CreateMatrix;
import br.ufes.tcc.benchmarktcc.service.MultiplyMatrixService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/matrix")
@RequiredArgsConstructor
public class RestControllerApi {
	
	
	private final MultiplyMatrixService multiplyMatrixService;
	
	@GetMapping
	public ResponseEntity<Object> multiplyMatrix(@RequestParam String algorithm, @RequestParam Integer N) {
		
		List<List<Integer>> m1 = CreateMatrix.run(N,N,false);
		List<List<Integer>> m2 = CreateMatrix.run(N,N,false);
		List<List<Integer>> result = new ArrayList<>();
		
		MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();
		
		System.gc();
	    System.runFinalization();

        // Get the heap memory usage
        MemoryUsage heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
        long beforeUsedMemory = heapMemoryUsage.getUsed();
     
		
		if(algorithm.equals("linear")) {
			result = multiplyMatrixService.linearMultiply(m1, m2);			
		}
		
		if(algorithm.equals("multi")) {
			result = multiplyMatrixService.multiLinearMultiply(m1, m2);			
		}
		
		if(algorithm.equals("strassen")) {
			result = multiplyMatrixService.strassenMatrixMultiply(m1, m2);			
		}
		
		System.gc();
	    System.runFinalization();
		
		// Get the heap memory usage again
        heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
        long afterUsedMemory = heapMemoryUsage.getUsed();
        long memoryUsed = afterUsedMemory - beforeUsedMemory;
		
		Map<String, String> dataToReturn = new HashMap<>();
		dataToReturn.put("result", String.valueOf(result.get(0).get(0)));
		dataToReturn.put("m1", String.valueOf(m1.get(0).get(0)));
		dataToReturn.put("m2", String.valueOf(m2.get(0).get(0)));
		dataToReturn.put("memoryUsage", String.valueOf(memoryUsed / (1024 * 1024)) + " MB");
		return ResponseEntity.ok(dataToReturn);
	}
	
}
