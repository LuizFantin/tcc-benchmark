package br.ufes.tcc.benchmarktcc.factory;

import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;


@Service
public class AlgorithmFactory {
    private final Map<AlgorithmEnum, AlgorithmSolver> servicesEnum = new EnumMap<>(AlgorithmEnum.class);

    public AlgorithmFactory(List<AlgorithmSolver> services) {
        for (AlgorithmSolver service : services) {
            servicesEnum.put(service.getType(), service);
        }
    }

    public AlgorithmSolver getAlgorithmSolver(AlgorithmEnum type) {
        AlgorithmSolver service = servicesEnum.get(type);
        if (service == null) {
            throw new UnsupportedOperationException(String.format("Algoritmo desconhecido: %s", type));
        }
        return service;
    }
}
