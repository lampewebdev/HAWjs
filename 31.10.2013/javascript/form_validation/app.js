// dollar Fn again
var $ = function(args){
	return document.querySelectorAll(args);
};

// or like this
var _ = document.querySelectorAll.bind(document);

var form = $('form')[0];

// on form submit event handler
form.addEventListener('submit', function(event){

	var $username = $('input[name="username"]')[0];
	var $password = $('input[name="password"]')[0];
	var $tnbdsb = $('input[name="tnbdsb"]')[0];

	if($username.value && $password.value && $tnbdsb.checked){
		// yey, its valid.
		// do not prevent the submission
	}
	else
	{
		if(!$username.value)
		{
			$username.className = 'error';
		}
		if(!$password.value)
		{
			$password.className = 'error';
		}
		if(!$tnbdsb.checked)
		{

			$tnbdsb.previousSibling.className = 'error';
		}
		
		event.preventDefault();
	}
});

