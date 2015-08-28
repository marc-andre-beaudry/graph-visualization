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

	$scope.init = function() {

		var graph = {
			nodes : $scope.nodes,
			links : $scope.links
		};
		var width = 960, height = 500;

		var color = d3.scale.category20();

		var force = d3.layout.force().charge(-120).linkDistance(30).size(
				[ width, height ]);

		var svg = d3.select("#graph").append("svg").attr("width", width).attr(
				"height", height);

		force.nodes(graph.nodes).links(graph.links).start();

		var link = svg.selectAll(".link").data(graph.links).enter().append(
				"line").attr("class", "link").style("stroke-width",
				function(d) {
					return Math.sqrt(d.value);
				});

		var node = svg.selectAll(".node").data(graph.nodes).enter().append(
				"circle").attr("class", "node").attr("r", 5).style("fill",
				function(d) {
					return color(d.group);
				}).call(force.drag);

		node.append("title").text(function(d) {
			return d.name;
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
		});
	};

	var handleGetNodesSuccess = function(data, status) {
		$scope.receivedNodes = true;
		$scope.nodes = data;

		if ($scope.receivedNodes && $scope.receivedLinks) {
			$scope.init();
		}

	};

	var handleGetLinksSuccess = function(data, status) {
		$scope.receivedLinks = true;
		$scope.links = data;

		if ($scope.receivedNodes && $scope.receivedLinks) {
			$scope.init();
		}
	};
	graphService.getLinks().success(handleGetLinksSuccess);
	graphService.getNodes().success(handleGetNodesSuccess);
});