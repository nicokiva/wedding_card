app.controller('cardCtrl', ['$scope', 'NgMap', 'animatedScroll', '$timeout', function($scope, NgMap, animatedScroll, $timeout) {

	$scope.mapHeight = '500px';

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
    	'resources/img/slider1.jpg',
    	'resources/img/slider2.jpg', 
    	'resources/img/slider3.jpg',
    	'resources/img/slider4.jpg',
    	'resources/img/slider5.jpg',
    	'resources/img/slider6.jpg'
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
    		notParsedCoordinates: {
    			lat: selectedLocation.location.lat,
    			lng: selectedLocation.location.lng
    		},
    		coordinates: selectedLocation.location.lat + ', ' + selectedLocation.location.lng,
    		title: selectedLocation.title
    	};
    };

    $scope.changeLocation = function(key) {
    	$scope.selectedLocation = $scope.getPlaceByKey(key);
    	$scope.scrollTo('map');
    	
    	NgMap.getMap('map').then(map => {
    		var coordinates = $scope.selectedLocation.notParsedCoordinates;
    		map.setCenter(new google.maps.LatLng(coordinates.lat, coordinates.lng));
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