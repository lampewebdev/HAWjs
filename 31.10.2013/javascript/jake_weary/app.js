// get by ID
var c = document.getElementById('content');

// change inner html
c.innerHTML = "foo";

var l = document.getElementById('list');

var changeContent = function( newText ){
	var node = document.getElementById('content');
	node.innerHTML = newText;
};

var changeColor = function(){
	
	var list = document.querySelectorAll('#list li');
	var listLength = list.length;
	
	while(listLength > 0){
		var element = list[listLength - 1];
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

var button = document.querySelector('button');

button.addEventListener('click', changeColor);

document.addEventListener('scroll', function(){
	console.log('scrolling');
});

var $ = function(arg){
	return document.querySelectorAll(arg);
};