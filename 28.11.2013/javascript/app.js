/**
 * Slideshow library recommendation:
 * -------------
 * ---- SLY ----
 * -------------
 * (the one and only)
 * 
 * http://darsa.in/sly/
 * https://github.com/Darsain/sly
 */


// declare our Slideshow
function mySlideshow( config )
{
	// set defaults
	this.cfg = config || {};
	this.wrapperElement = this.cfg.wrapperElement || $('.slideshow');
	this.viewportElement = this.cfg.viewportElement || this.cfg.wrapperElement.find('.slider');
	this.leftButton = this.cfg.leftButton || this.wrapperelement.find('.leftBtn');
	this.rightButton = this.cfg.rightButton || this.wrapperelement.find('.rightBtn');
	this.transitionTime = this.cfg.transitionTime || 700;
	this.slideCount = this.viewportElement.children().length;
	this.slideWidth = this.viewportElement.children().first().width();
	this.isAnimating = false;

	this.setInitialState();

	this.initBindings();
}

mySlideshow.prototype.setInitialState = function()
{
	// the slider element
	this.viewportElement.css("width", this.slideCount * this.slideWidth +"px");
	this.viewportElement.css("position", "relative");
	this.viewportElement.css("right", 0);
};

mySlideshow.prototype.initBindings = function()
{
	this.leftButton.click(this.slideRight.bind(this));
	this.rightButton.click(this.slideLeft.bind(this));
};

mySlideshow.prototype.slideLeft = function()
{
	// get current Position
	var rightValue = parseInt( this.viewportElement.css('right'), 10 );
	
	// if its not the last element...
	if(rightValue < (this.slideCount - 1) * this.slideWidth  )
	{
		// ...start animation
		this.animate( rightValue + 1024 );
	}
};

mySlideshow.prototype.slideRight = function()
{
	// get current Position
	var rightValue = parseInt( this.viewportElement.css('right'), 10 );
	
	// if its not the last element...
	if(rightValue > 0  )
	{
		// ...start animation
		this.animate( rightValue - 1024 );
	}
	this.animate();
};

mySlideshow.prototype.animate = function( rightValue )
{
	// check if we are currently running an animation
	if( this.isAnimating )
	{
		// ...then dont animate.
		return false;
	}

	// now we are animating
	this.isAnimating = true;

	// javascript timeticker-based animation
	// 
	//this.viewportElement.animate({
	//	right: rightValue + "px",
	//}, this.transitionTime, this.resetAnimationState.bind(this));
	
	this.viewportElement.css('right', rightValue + "px");
	setTimeout(this.resetAnimationState.bind(this), 1000);
};

mySlideshow.prototype.resetAnimationState = function()
{
	this.isAnimating = false;
};

// use our slideshow

// optional configuration object
var config = {
	wrapperElement: $('.slideshow.first'),
	leftButton: $('.slideshow.first .leftBtn'),
	rightButton: $('.slideshow.first .rightBtn'),
	transitionTime: 900
};

var slideshowInstance = new mySlideshow( config );