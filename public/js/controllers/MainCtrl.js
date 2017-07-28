angular.module('MainCtrl', []).controller('MainController', function($scope) {
	var timerStarted = false;
	var begin = true;

	$scope.saved = localStorage.getItem('solveTimes');
	$scope.times = (localStorage.getItem('solveTimes') !== null) ? JSON.parse($scope.saved) : [];
	localStorage.setItem('solveTimes', JSON.stringify($scope.times));

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

	$scope.$watch('times', function(newValue, oldValue) {
		var sum = 0;
		var best = Number.MAX_SAFE_INTEGER;
		for (var i = 0; i < newValue.length; i++) {
			if (newValue[i].time) {
				if (typeof newValue[i].time === 'string') {
					console.log(newValue[i].time);
				}
				if (newValue[i].time < best) {
					best = newValue[i].time;
				}
				sum += newValue[i].time;
			}
		}

		if (sum) {
			var average = sum / $scope.times.length;

			$scope.stats.average.value = formatTime(average);
		}

		if (best < Number.MAX_SAFE_INTEGER) {
			$scope.stats.best.value = formatTime(best);
		}
		
	}, true);

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
			time: parseInt($scope.currentMinutes)*60*100 + 
				parseInt($scope.currentSeconds)*100 + parseInt($scope.currentHundredths),
			formatted: $scope.currentMinutes + ":" + $scope.currentSeconds + "." + $scope.currentHundredths
		});
		localStorage.setItem('solveTimes', JSON.stringify($scope.times));

		$scope.$apply();
	}

	var formatTime = function(time) {
		var temp = time;
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
