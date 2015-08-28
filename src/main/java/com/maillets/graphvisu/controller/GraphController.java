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

	private String[] seedNodes = { "Server", "Rack", "CommRoom", "Floor", "Building", "City", "Country", "Region",
			"Database", "Application", "Switch" };

	private int[][] seedLinks = { { 0, 1 }, { 0, 8 }, { 0, 9 }, { 0, 10 }, { 1, 2 }, { 2, 3 }, { 3, 4 }, { 4, 5 },
			{ 5, 6 }, { 6, 7 }

	};

	private List<Node> seedNodes() {
		List<Node> nodes = new ArrayList<>();

		for (int i = 0; i < seedNodes.length; i++) {
			Node node = new Node();
			node.setName(seedNodes[i]);
			node.setId(i);
			node.setGroup(0);
			node.setAttributes(seedAttributes());
			nodes.add(node);
		}
		return nodes;
	}

	private List<Link> seedLinks() {
		List<Link> links = new ArrayList<>();
		for (int i = 0; i < seedLinks.length; i++) {
			Link link = new Link();
			link.setSource(seedLinks[i][0]);
			link.setTarget(seedLinks[i][1]);
			links.add(link);
		}
		return links;
	}

	private List<Attribute> seedAttributes() {
		List<Attribute> attributes = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			Attribute attribute = new Attribute();
			attribute.setName("Attribute" + i);
			attribute.setValue("Value" + i);
			attributes.add(attribute);
		}
		return attributes;
	}
}
