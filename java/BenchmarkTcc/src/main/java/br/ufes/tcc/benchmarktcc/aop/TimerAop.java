package br.ufes.tcc.benchmarktcc.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Slf4j
@Component
public class TimerAop {

    @Around("@annotation(timerAnnotation)")
    public Object aroundTimerMethod(ProceedingJoinPoint joinPoint, Timer timerAnnotation) throws Throwable {
        long startTime = System.currentTimeMillis();
        String method = joinPoint.getSignature().getDeclaringTypeName();
        try {
            return joinPoint.proceed();

        } finally {

            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;

            String message = timerAnnotation.message();

            log.trace(message, method, executionTime + " ms");
        }

    }
}
