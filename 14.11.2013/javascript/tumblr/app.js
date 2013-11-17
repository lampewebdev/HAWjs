
// ask tumlr API for GIFS!
var api_url = "http://api.tumblr.com/v2/";
var api_key = "jGMdatp61F3DRBx6UPBL4PQX38vrEcvhmVA7eHowomPZ728yby";

$.ajax({
	dataType: "jsonp",
	url: api_url + "tagged?tag=gif&api_key="+api_key,
	success: function(data){
		console.log(data);
		if(data.meta.status === 200)
		{
			appendPhotos(data);
		}
	}
});

function appendPhotos(photos)
{
	var html = "";

	photos.response.forEach(function(photo){
		if(photo.photos && photo.photos.length > 0)
		{
			html += '<img src="'+photo.photos[0].original_size.url+'">';
		}
	});

	$('#photoList').append(html);
}