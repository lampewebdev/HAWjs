// oke. lets get our hands dirty
// superagent is our AJAX lib

/**
 * load HTML on button click event
 */
var myButton = document.querySelector('#loadHTML');

myButton.addEventListener('click', loadHTML);

function loadHTML()
{
	superagent
		.get('http://localhost/haw/server/foo.html')
		.end(function(data){
			document.querySelector('#foo').innerHTML = data.text;
		});
}

/**
 * load DATA from serverside script on button click event
 */
var myButton = document.querySelector('#loadPHP');

myButton.addEventListener('click', loadPHP);

function loadPHP()
{
	superagent
		.get('http://localhost/haw/server/procedure.php')
		.end(function(data){
			document.querySelector('#bar').innerHTML = data.text;
		});
}