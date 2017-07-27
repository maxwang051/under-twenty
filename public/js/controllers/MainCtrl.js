angular.module('MainCtrl', []).controller('MainController', function($scope) {
	var timerStarted = false;
	var begin = true;

	$scope.times = [];
	$scope.stats = {
		average: {
			label: 'avg',
			value: '00:00.00'
		},
		best: {
			label: 'best',
			value: '00:00.00'
		}
	};
	$scope.viewingStats = false;

	$scope.getAverage = function() {
		var sum = 0;
		for (var i = 0; i < $scope.times.length; i++) {
			console.log($scope.times[i].time);
			sum += parseInt($scope.times[i].time);
		}

		var average = sum / $scope.times.length;

		if (average) {
			$scope.stats.average.value = formatTime(average);
		}
	}

	$scope.toggleTab = function() {
		$scope.viewingStats = !$scope.viewingStats;
	}

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
			time: $scope.currentMinutes*60*100 + $scope.currentSeconds*100 + $scope.currentHundredths,
			formatted: $scope.currentMinutes + ":" + $scope.currentSeconds + "." + $scope.currentHundredths
		});

		$scope.getAverage();
		$scope.$apply();
	}

	var formatTime = function(time) {
		var temp = time;
		console.log(time);
		var minutes = Math.floor(temp / 6000);
		temp = temp % 6000;
		var seconds = Math.floor(temp / 100);
		temp = temp % 100;
		var hundredths = Math.floor(temp);

		var mString = minutes < 10 ? '0'+minutes : ''+minutes;
		var sString = seconds < 10 ? '0'+seconds : ''+seconds;
		var hString = hundredths < 10 ? '0'+hundredths : ''+hundredths;

		return mString + ':' + sString + '.' + hString;
	}

});
