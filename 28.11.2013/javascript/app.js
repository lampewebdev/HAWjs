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
	this.leftButton = this.cfg.leftButton || this.wrapperElement.find('.leftBtn');
	this.rightButton = this.cfg.rightButton || this.wrapperElement.find('.rightBtn');
	this.transitionTime = this.cfg.transitionTime || 400;
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
	this.viewportElement.css("left", 0);
};

mySlideshow.prototype.initBindings = function()
{
	this.leftButton.click(this.slideLeft.bind(this));
	this.rightButton.click(this.slideRight.bind(this));
};

mySlideshow.prototype.slideLeft = function()
{
	var leftValue = parseInt( this.viewportElement.css('left'), 10 );
	
	if(leftValue < 0 )
	{
		this.animate( leftValue + this.slideWidth );
	}
};

mySlideshow.prototype.slideRight = function()
{
	var leftValue = parseInt( this.viewportElement.css('left'), 10 );
	
	if(leftValue > - (this.slideCount - 1) * this.slideWidth  )
	{
		this.animate( leftValue - this.slideWidth );
	}
};

mySlideshow.prototype.animate = function( leftValue )
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
	//	left: leftValue + "px",
	//}, this.transitionTime, this.resetAnimationState.bind(this));
	
	this.viewportElement.css('left', leftValue + "px");
	setTimeout(this.resetAnimationState.bind(this), this.transitionTime);
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
	transitionTime: 400
};

var slideshowInstance = new mySlideshow( config );

var slideshowInstance2 = new mySlideshow({
	wrapperElement: $('.slideshow.second'),
});