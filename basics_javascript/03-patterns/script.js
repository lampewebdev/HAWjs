/////////////////////////////////////////////
// constructor pattern for Functions
/////////////////////////////////////////////

function Counter( cfg )
{
	var config = cfg || {};
	this.counter = config.counter || 0;

	this.increment = function()
	{
		this.counter++;
		return this.counter;
	};
}

// or implement increment with a prototype
Counter.prototype.increment = function()
{
	this.counter++;
	return this.counter;
};

var counter = new Counter();

///////////////////////////////////////////////
// using public and private functions
///////////////////////////////////////////////
function fooCounter()
{
	// we need "that" because the functions will be called from another context
	var that = this;
	// private counter attribute
	this.counter = 0;

	// private function...
	this.increment = function()
	{
		that.counter++;
		return this;
	};

	// private function...
	this.decrement = function()
	{
		that.counter--;
		return this;
	};

	// private function...
	this.get = function()
	{
		return that.counter;
	};

	// private functions getting revealed by returning a object
	return {
		inc: this.increment,
		dec: this.decrement,
		get: this.get
	};
}

var foocounter = new fooCounter();

// awesome method chaining YEY!
foocounter.inc().inc().inc().dec().get();

/////////////////////////////////////////////
// function inheritance
/////////////////////////////////////////////
function superCounter()
{
	// inherit Counter from calling it with other context
	Counter.call(this);
	this.supercount = 0;
	this.increment = function(sup)
	{
		if(sup)
		{
			this.supercount++;
		}
		this.counter++;
		return this;
	};
}

var s = new superCounter();

/////////////////////////////////////////////
// Object constructor
/////////////////////////////////////////////

var Person = {
	firstname: "",
	lastname: "",
	email: ""
};

// inherit from Person Object
var Driver = new Object(Person);


/////////////////////////////////////////////
// module pattern
/////////////////////////////////////////////



/////////////////////////////////////////////
// revealing module pattern
/////////////////////////////////////////////