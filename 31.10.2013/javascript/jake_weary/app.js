// get by ID
var c = document.getElementById('content');

// change inner html
c.innerHTML = "SAME H4x0r CHANGeD THE TEXT. LULZ >.<";

var l = document.getElementById('list');

var changeContent = function( newText ){
	var node = document.getElementById('content');
	node.innerHTML = newText;
};

var changeColor = function(){
	
	var list = document.querySelectorAll('#list')[0].childNodes;
	var listLength = list.length;

	// loop over elements
	while(listLength > 0){
		var element = list[listLength - 1],
		margin = 0;

		// be sure that we do not have a text node
		if(element.nodeType === 3)
		{
			listLength--;
			continue;
		}

		// finally change BG color
		if(!element.style.backgroundColor)
		{
			element.style.backgroundColor = "rgb(255, 123, 23)";
		}
		else
		{
			element.style.backgroundColor = "";
		}
		
		listLength--;
	}
};


var changeMargin = function(){

	var list = document.querySelectorAll('#list')[0].childNodes;
	var listLength = list.length;

	while(listLength > 0){
		var element = list[listLength - 1],
		margin = 0;

		if(element.nodeType === 3)
		{
			listLength--;
			continue;
		}
		
		// push margin + 10px each click
		// margin = parseInt( element.style.marginLeft || margin, 10);
		// element.style.marginLeft = (margin + 10) + "px";
		
		// create closure to have own scope for each Element after the loop has finished.
		(function(element){

			// we need a reference for that interval to clear it later
			var interval = setInterval(function(){
				var margin = parseInt( element.style.marginLeft || 0, 10);
				element.style.marginLeft = (margin + Math.random() * 10) + "px";

			}, 1000/60);

			// clear that interval in 1s
			setTimeout(function(){
				clearInterval(interval);
				var i, el,
					largest = largest || {
						offsetLeft: 0
					};
				for(i = list.length - 1; i >= 0; i--){
					el = list[i];
					if(el.offsetLeft > largest.offsetLeft)
					{
						largest = el;
					}
				}

				largest.style.backgroundColor = "green";
			}, 2000);

		}(element));

		// the clean way is to put the function generator outside the loop
		// because on every iteration this function gets instanciated unneccessarily
		// this is much cleaner
		myLoopHandler(element);
		listLength--;
	}
};

var myLoopHandler = function(element){
	console.log(element);
};

var button = document.querySelector('button');

button.addEventListener('click', changeMargin);

document.addEventListener('scroll', function(){
	console.log('scrolling');
});

var $ = function(arg){
	return document.querySelectorAll(arg);
};