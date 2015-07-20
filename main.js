$(document).ready(function() {
	var mapValues = [
		{latLng:[37.790554,-122.432198], data:"Vic Narurkar", id: 183, options:{ icon: "img/NotSelected.png"}},
		{latLng:[32.781895, -96.781097], data:"Justin Smith", id: 240, options:{ icon: "img/NotSelected.png"}},
		{latLng:[37.784111, -122.439072], data:"Kathleen Walsh", id: 154, options:{ icon: "img/NotSelected.png"}},
		{latLng:[37.784111, -122.439072], data:"Alexander Rivkin", id: 192, options:{ icon: "img/NotSelected.png"}},
		{latLng:[34.448441, -118.579079], data:"Bernard Raskin", id: 157, options:{ icon: "img/NotSelected.png"}},
		{latLng:[33.875973, -118.395607], data:"Ashley Magovern", id: 161, options:{ icon: "img/NotSelected.png"}},
		{latLng:[34.066654, -118.401001], data:"Dat Le", id: 267, options:{ icon: "img/NotSelected.png"}},
		{latLng:[34.065224, -118.412178], data:"Ava Shamban", id: 160, options:{ icon: "img/NotSelected.png"}},
		{latLng:[34.067265, -118.407417], data:"Kavis Nguyen", id: 171, options:{ icon: "img/NotSelected.png"}},
	],
	oldMap = 0;

	var html = '';

	for( var i = 0; i < mapValues.length; i ++) {
		html += "<li data-id='" +mapValues[i].id +"'>"+mapValues[i].data +"</li>";
	}

	$('.list-items').append(html)


	$('.list-items li').click(function() {
		event.preventDefault();
		changeMap('.map-content',  $(this).attr('data-id'));
	});

	$(".map-content").gmap3({
		map: {
			options:{
			      center:[46.578498,2.457275],
			      zoom: 5
			}
		},
		marker:{
		    values:mapValues,
		    options:{
		      draggable: false
		},
		events:{
			click: function(marker, event, context) {
		        var map = $(this).gmap3("get"),
		          infowindow = $(this).gmap3({get:{name:"infowindow"}});
				if (oldMap) {
					clearMap('.map-content', oldMap );
				}
				oldMap = context.id;
		        if (infowindow){
		          infowindow.open(map, marker);
		          infowindow.setContent(context.data);
		        } else {
		          $(this).gmap3({
		            infowindow:{
		              anchor:marker,
					  options:{
						content: context.data
					  }
		            },
		          });
		        }
				console.log('===========>',infowindow );
				marker.setOptions({icon: "img/Selected.png"});
			}
		}
	}
	
	});


	function clearMap(map, id) {
		var marker = $(map).gmap3({get: {id: id}});
		if( marker && id ) {
			marker.setIcon("img/NotSelected.png");
		}
		var infowindow = $(map).gmap3({get:{name:"infowindow"}});
		if (infowindow ) {
			infowindow.close();
		};
	}

	function changeMap(map,id) {
		if(oldMap) {
			clearMap( map, oldMap );
		}
		oldMap = id;
		var marker = $(map).gmap3({get: {id: id}});
		marker.setOptions({icon: "img/Selected.png"});
		var content = "";
		mapValues.forEach(function( item ) {
			if ( id == item.id ) {
				content = item.data;
			}
		})
		var infowindow = $(map).gmap3({get:{name:"infowindow"}});
		if ( infowindow ) {
			infowindow.setContent(content);
			infowindow.open( $(map).gmap3("get"), marker);
		} else {
			$(map).gmap3({
				infowindow:{
	              anchor:marker,
				  options: {
				  	content: content
				  }
	            },
			});
		}
	}


	function addMarker() {
		
	}
});