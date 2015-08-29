App.factory('graphService', function($http) {
	return {
		getNodes : function() {
			return $http.get('/api/graph/nodes');
		},
		getLinks : function() {
			return $http.get('/api/graph/links');
		}
	};
});

App.controller('homeController', function($scope, $http, $location,
		$routeParams, graphService) {

	$scope.nodes = [];
	$scope.links = [];
	$scope.receivedNodes = false;
	$scope.receivedLinks = false;
	$scope.charge = -1000;
	$scope.linkDistance = 100;
	$scope.linkStrength = 0.5;
	$scope.width = 800;
	$scope.height = 600;
	$scope.attributes = [];
	$scope.name = "";

	var color = d3.scale.category20();

	var force = d3.layout.force().charge($scope.charge).linkDistance(
			$scope.linkDistance).linkStrength($scope.linkStrength).size(
			[ $scope.width, $scope.height ]);

	var svg = d3.select("#graph").append("svg").attr("width", $scope.width)
			.attr("height", $scope.height).attr("pointer-events", "all").call(
					d3.behavior.zoom().on("zoom", redraw)).append('g');

	function resize() {
		var parent = d3.select("#graph")[0][0];
		var width = parent.clientWidth;
		var height = parent.clientHeight;

		d3.select("svg").attr("width", width).attr("height", height);
	}
	d3.select(window).on('resize', resize);

	function redraw() {
		svg.attr("transform", "translate(" + d3.event.translate + ")"
				+ " scale(" + d3.event.scale + ")");
	}

	var drag = force.stop().drag().on("dragstart", function(d) {
		d3.event.sourceEvent.stopPropagation(); // to prevent pan functionality
		// from
		// overriding node drag functionality.
		// put any other 'dragstart' actions here
	});

	var handleClick = function(d, i) {
		$scope.$apply(function() {
			$scope.name = d.name;
			$scope.attributes = d.attributes;
		});
	};

	$scope.init = function() {

		var graph = {
			nodes : $scope.nodes,
			links : $scope.links
		};

		force.nodes(graph.nodes).links(graph.links).start();

		var texts = svg.selectAll("text.label").data(graph.nodes).enter()
				.append("text").attr("class", "label").attr("fill", "white")
				.text(function(d) {
					return d.name;
				});

		var link = svg.selectAll(".link").data(graph.links).enter().append(
				"line").attr("class", "link").style("stroke-width",
				function(d) {
					return Math.sqrt(d.value);
				});

		var node = svg.selectAll(".node").data(graph.nodes).enter().append(
				"circle").attr("class", "node").attr("r", 10).style("fill",
				function(d) {
					return color(d.group);
				}).on("click", handleClick).call(force.drag);

		node.append("title").text(function(d) {
			return d.name;
		});

		node.append("text").attr("dx", 12).attr("dy", ".35em").text(
				function(d) {
					return d.name
				});

		force.on("tick", function() {
			link.attr("x1", function(d) {
				return d.source.x;
			}).attr("y1", function(d) {
				return d.source.y;
			}).attr("x2", function(d) {
				return d.target.x;
			}).attr("y2", function(d) {
				return d.target.y;
			});

			node.attr("cx", function(d) {
				return d.x;
			}).attr("cy", function(d) {
				return d.y;
			});
			texts.attr("transform", function(d) {
				return "translate(" + (d.x + 15) + "," + d.y + ")";
			});
		});
	};

	var handleGetNodesSuccess = function(data, status) {
		$scope.receivedNodes = true;
		$scope.nodes = data;

		if ($scope.receivedNodes && $scope.receivedLinks) {
			$scope.init();
			resize();
		}
	};

	var handleGetLinksSuccess = function(data, status) {
		$scope.receivedLinks = true;
		$scope.links = data;

		if ($scope.receivedNodes && $scope.receivedLinks) {
			$scope.init();
			resize();
		}
	};
	graphService.getLinks().success(handleGetLinksSuccess);
	graphService.getNodes().success(handleGetNodesSuccess);
});