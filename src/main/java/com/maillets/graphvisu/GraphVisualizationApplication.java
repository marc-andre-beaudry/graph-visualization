package com.maillets.graphvisu;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class GraphVisualizationApplication {

	private static final Logger logger = LoggerFactory.getLogger(GraphVisualizationApplication.class);

	@Bean
	CommandLineRunner init() {

		return arg -> {

			logger.info("Init done!");
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(GraphVisualizationApplication.class, args);
	}
}