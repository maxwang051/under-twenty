angular.module('MainCtrl', []).controller('MainController', function($scope) {
	var timerStarted = false;
	var begin = true;

	$scope.times = [];

	$scope.$on('space up', function(e, args) {
		if (begin) {
			timerStart();
			begin = false;
		} else if (!begin) {
			begin = true;
		}
	})	

	$scope.$on('space down', function(e, args) {
		begin ? null : timerStop();
	})

	$scope.removeTime = function(time) {
		var index = $scope.times.indexOf(time);
		$scope.times.splice(index, 1);
	}

	var timerStart = function() {
		$scope.$broadcast('timer-start');
		timerStarted = true;
	}

	var timerStop = function() {
		$scope.$broadcast('timer-stop');
		timerStarted = false;

		$scope.times.unshift({
			time: $scope.currentHundredths,
			formatted: $scope.currentMinutes + ":" + $scope.currentSeconds + "." + $scope.currentHundredths
		});
		$scope.$apply();
	}

});
