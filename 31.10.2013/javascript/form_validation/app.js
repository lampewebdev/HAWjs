// dollar Fn again
var $ = function(args){
	return document.querySelectorAll(args);
};

// or like this
var _ = document.querySelectorAll.bind(document);

////////////////////////////////////
//  Validate on Form submit event
////////////////////////////////////

var form = $('form')[0];

// on form submit event handler
form.addEventListener('submit', function(event){

	var $username = $('input[name="username"]')[0];
	var $password = $('input[name="password"]')[0];
	var $firstname = $('input[name="firstname"]')[0];
	var $lastname = $('input[name="lastname"]')[0];
	var $tnbdsb = $('input[name="tnbdsb"]')[0];

	if($username.value && $password.value && $tnbdsb.checked){
		// yey, its valid.
		// do not prevent the submission
	}else{
		highlightOnError($username.value, $username);
		highlightOnError($password.value, $password);
		highlightOnError($firstname.value, $firstname);
		highlightOnError($lastname.value, $lastname);
		highlightOnError($tnbdsb.checked, $tnbdsb.previousSibling);
		event.preventDefault();
	}
});

function highlightOnError(value, element, filterFn){
	if(!value){
		element.className = 'error';
	}
	else
	{
		if(typeof filterFn === 'function' && !filterFn(value))
		{
			element.className = 'error';
		}else{
			element.className = '';
		}
	}
}

///////////////////////////////////////////////
//  Validate on keydown event @input element
///////////////////////////////////////////////

var elements = $('input[type="text"], input[type="password"]'),
	elementsLength = elements.length;

var validateString = function(string, minLength){
	minLength = minLength || 2;

	if(string.length < minLength)
	{
		return false;
	}else{
		return true;
	}
};

var validatePassword = function(string){
	if(string.length < 5)
	{
		return false;
	}else{
		return true;
	}
};

// keyup handler
var onInputKeyup = function(event){
	var validationFunction = null;

	if( this.attributes.name.value === 'password' ){
		validationFunction = validatePassword;
	}else{
		validationFunction = validateString;
	}
	highlightOnError(this.value, this, validationFunction);
};

// iterate over elements and assign event handler
while(elementsLength > 0)
{
	var element = elements[elementsLength - 1];
	element.addEventListener('keyup', onInputKeyup);
	elementsLength--;
}