app.controller('cardCtrl', ['$scope', 'NgMap', 'animatedScroll', '$timeout', function($scope, NgMap, animatedScroll, $timeout) {

/* Scrolling */
	$scope.scrollTo = function(targetId) {
		var elementIWantToScrollTo = document.getElementById(targetId);
  		animatedScroll.scroll(elementIWantToScrollTo);
	};
/* /Scrolling */

/* Images */
	$scope.activeSlide = 0;
	$scope.interval = 3000;
	$scope.noWrapSlides = false;
    $scope.urls = [
    	'https://www.racingclub.com.ar/img/futbol/plantel/434_acuna.jpg', 
    	'http://staticf5a.diaadia.info/sites/default/files/nota_periodistica/timthumb_6.jpg', 
    	'http://www.expedientepolitico.com.ar/wp-content/uploads/saja.jpg'
    ];
/* /Images */

/* Geolocalization */
	$scope.getPlaceByKey = function(key) {
    	var selectedLocation = $scope.locations.filter(l => l.key === key);
    	if (!selectedLocation || selectedLocation.length === 0) {
    		return;
    	}

    	selectedLocation = selectedLocation[0];
    	return { 
    		coordinates: selectedLocation.location.lat + ', ' + selectedLocation.location.lng,
    		title: selectedLocation.title
    	};
    };

    $scope.changeLocation = function(key) {
    	$scope.selectedLocation = $scope.getPlaceByKey(key);
    	$scope.scrollTo('map');
    	
    	NgMap.getMap('map').then(map => {
    		map.setZoom(16);
    	});
    }

    $scope.locations = [
	    {
	    	key: 'temple',
	    	title: 'Centro Hebreo Iona',
	    	location: {
	    		lat: -34.599188,
	    		lng: -58.442116
	    	}
	    },
	    {
	    	key: 'civil',
	    	title: 'Comuna 6',
	    	location: {
	    		lat: -34.6058668,
	    		lng: -58.4328278
	    	}
	    },
	    {
	    	key: 'party',
	    	title: 'Rodizio Costanera Norte',
	    	location: {
	    		lat: -34.5487275,
	    		lng: -58.4308805
	    	}
	    }
    ];
	
	$scope.changeLocation('civil');
/* /Geolocalization */

	$timeout(function() {
		animatedScroll.scroll(document.getElementById('menu'));
	}, 500);
}]);