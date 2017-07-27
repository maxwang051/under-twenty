angular.module('appDirectives', []).directive('keyPress', [
	'$document',
	'$rootScope', 
	function($document, $rootScope) {
		return {
			restrict: 'A',
			link: function() {
				$document.bind('keyup', function(e) {
					if (e.which === 32) {
			        	$rootScope.$broadcast('space up', e)
		        	}
		        });

		        $document.bind('keydown', function(e) {
		        	if (e.which === 32) {
			        	$rootScope.$broadcast('space down', e)
		        	}
		        })
			}
		};
	}
]);