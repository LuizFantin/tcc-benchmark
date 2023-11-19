package br.ufes.tcc.benchmarktcc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class BenchmarkTccApplication {

	public static void main(String[] args) {
		SpringApplication.run(BenchmarkTccApplication.class, args);
	}

}
