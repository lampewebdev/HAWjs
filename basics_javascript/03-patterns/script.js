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

// for objects:

var Product = {

	attributes: {
		title: "",
		price: 0,
		description: ""
	},

	setPrice: function(value)
	{
		this.attributes.price = value;
	},

	setTitle: function(title)
	{
		this.attributes.title = title;
	},
	counter: new Counter()
};

// for functions

///////////////////////////////////////////////
// using public and private functions / variables
///////////////////////////////////////////////

function fooCounter()
{
	// private counter attribute
	var counter = 0;

	// public functions returned as object
	return {
		inc: function(){
			counter++;
			return this;
		},
		dec: function(){
			counter--;
			return this;
		},
		get: function(){
			return counter;
		}
	};
}

var foocounter = new fooCounter();

// awesome method chaining YEY!
foocounter.inc().inc().inc().dec().get();

/////////////////////////////////////////////
// revealing module pattern
/////////////////////////////////////////////

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

var foo = new fooCounter();

// awesome method chaining YEY!
foo.inc().inc().inc().dec().get();

/////////////////////////////////////////////
// Pub/Sub
/////////////////////////////////////////////

var pubsub = (function(){
	
	var topics = {};
	var pubsub = {};

	var	id = -1;

	pubsub.publish = function( topic, args ){
		
		if( !topics[topic] )
		{
			return false;
		}

		var subscribers = topics[topic],
			len = subscribers ? subscribers.length : 0;

		while(len--)
		{
			subscribers[len].func( topic, args );
		}

		return this;
	};

	pubsub.subscribe = function( topic, func )
	{
		if( !topics[topic] )
		{
			topics[topic] = [];
		}

		// create id token
		var token =  (++id).toString();
		
		topics[topic].push({
			token: token,
			func: func
		});

		return token;

	};

	pubsub.unsubscribe = function( token )
	{
		for( var key in topics )
		{
			if( topics[key] )
			{
				for( var i = 0, j = topics[key].length; i < j; i++)
				{
					if(topics[key][i].token === token)
					{
						topics[key].splice(i, 1);
						return token;
					}
				}
			}
		}
	};

	return pubsub;

})();

// notify me when a new book is published
pubsub.subscribe("books", function(topic, book){
	// what to do with the book?
	console.log(book);
});

// publish my new book
pubsub.publish("books", { title: "myBook", content: "foo!" });