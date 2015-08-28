package com.maillets.graphvisu.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/graph")
public class GraphController {

	private static final Logger logger = LoggerFactory.getLogger(GraphController.class);

	@RequestMapping(value = "/nodes", method = { RequestMethod.GET })
	public List<Node> getNodes() {
		logger.debug("GET /");
		return seedNodes();
	}

	@RequestMapping(value = "/links", method = { RequestMethod.GET })
	public List<Link> getLinks() {
		logger.debug("GET /");
		return seedLinks();
	}

	private List<Node> seedNodes() {
		List<Node> nodes = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			Node node = new Node();
			node.setName("Node" + i);
			node.setId(i);
			node.setGroup(0);
			nodes.add(node);
		}
		return nodes;
	}

	private List<Link> seedLinks() {
		List<Link> links = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			Link link = new Link();
			link.setSource(i);
			link.setTarget((i + 1) % 10);
			links.add(link);
		}
		return links;
	}
}
