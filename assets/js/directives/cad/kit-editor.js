module.exports = ['d3Service', '$q', '$window', '$compile',
  function(d3Service, $q, $window, $scompile) {

    //DDO - Directive Definition Object
    return {
      scope: true,
      restrict: 'A',
      controller: ['$scope', function($scope){

      }],

      link: function($scope, $element, $attrs) {
        d3Service.d3().then(function(d3) {
          $scope.editor = {};
          $scope.editor.behavior = {};
          $scope.editor.behavior.dragging = false;

          $scope.editor.grid = {};
          $scope.editor.grid.visibility = true;
          $scope.editor.grid.sizeXmm = 5;
          $scope.editor.grid.sizeYmm = 5;

          $scope.editor.position = {};
          $scope.editor.position.x = 0;
          $scope.editor.position.y = 0;

          $scope.editor.pageProperties = {};
          $scope.editor.pageProperties.widthMm = 297;
          $scope.editor.pageProperties.heightMm = 210;

          var svg = d3.select($element[0]).append('svg')
            .attr('id', 'svg-editor')
            .style('width', '100%')
            .style('height', '100%');

          var margin = {top: -5, right: -5, bottom: -5, left: -5};

          $scope.editor.behavior.d3 = {};
          $scope.editor.behavior.d3.zoom = d3.behavior.zoom()
            .scale(1)
            .scaleExtent([.2, 10])
            .on('zoom', zoomed);

          var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')')
            .call($scope.editor.behavior.d3.zoom);

          $scope.editor.svg = {};
          $scope.editor.svg.rootNode = svg;

          $scope.editor.svg.underlay = g.append('rect')
            .attr('class', 'underlay')
            .attr('width', '100%')
            .attr('height', '100%')
            .style('fill', 'none')
            .style('pointer-events', 'all');

          var container = g.append('g');

          container.attr('id', 'svg-container');
          $scope.editor.svg.container = container;
          $scope.editor.behavior.d3.zoom.event(container);

          function zoomed() {
            var t = d3.event.translate;
            container.attr('transform', 'translate(' +
              d3.event.translate + ')scale(' +
              d3.event.scale + ')');

            t = t.toString().split(',');

            $scope.editor.position.x = t[0];
            $scope.editor.position.y = t[1];
          }

          $scope.editor.features = {};
          $scope.editor.features.pixelsPerMmX = 1 / $scope.editor.svg.rootNode.node().screenPixelToMillimeterX;
          $scope.editor.features.pixelsPerMmY = 1 / $scope.editor.svg.rootNode.node().screenPixelToMillimeterY;

          var gGridX = container.append('g')
            .attr('class', 'x axis')
            .style('pointer-events', 'none');

          var gGridY = container.append('g')
            .attr('class', 'y axis')
            .style('pointer-events', 'none');

          var borderFrame = container.append('rect')
            .attr('class', 'svg-border')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 0)
            .attr('height', 0);

          if ($scope.editor.grid.visibility) {

            var DURATION = 800;

            var pageWidth = $scope.editor.pageProperties.widthMm * $scope.editor.features.pixelsPerMmX;
            var pageHeight = $scope.editor.pageProperties.heightMm * $scope.editor.features.pixelsPerMmY;

            borderFrame
              .transition()
              .duration(DURATION)
              .attr('width', pageWidth)
              .attr('height', pageHeight);

            var linesX = gGridX.selectAll('line')
              .data(d3.range(0, pageHeight, $scope.editor.grid.sizeXmm * $scope.editor.features.pixelsPerMmX));

            var linesY = gGridY.selectAll('line')
              .data(d3.range(0, pageWidth, $scope.editor.grid.sizeYmm * $scope.editor.features.pixelsPerMmY));

            linesY.enter().append('line')
              .attr('x1', function(d) {return d;})
              .attr('y1', 0)
              .attr('y2', 0)
              .transition()
              .duration(DURATION)
              .attr('x2', function(d) {return d;})
              .attr('y2', pageHeight);

            linesX.enter().append('line')
              .attr('x1', 0)
              .attr('y1', function(d) {return d;})
              .attr('x2', 0)
              .transition()
              .duration(DURATION)
              .attr('y2', function(d) {return d;})
              .attr('x2', pageWidth);
          }
        });
      }
    }

  }
];
