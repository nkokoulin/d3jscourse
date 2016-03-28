angular.module('d3', []).factory('d3Service',
  ['$document', '$q', '$rootScope', '$window', function($document, $q, $rootScope, $window) {

    function onScriptLoad() {
      // window.d3
      $rootScope.$apply(function() {d.resolve($window.d3)});
    }

    var d = $q.defer();

    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = '../../vendor/d3/d3.js';
    scriptTag.onload = onScriptLoad;

    scriptTag.onreadystatechange = function() {
      if (this.readyState = 'complete') onScriptLoad();
    }

    var b = $document[0].getElementsByTagName('body')[0];
    b.appendChild(scriptTag);

    return {
      d3: function() {return d.promise;}
    }

  }]
);
