var waypoint = new Waypoint({
	element: document.querySelector("#gs-heading"),
	handler: function(direction){
		if(direction == "down")
			{
				 $('#gs-heading').addClass('animated fadeInUp');
			}
	
	},

	offset:'30%'
});