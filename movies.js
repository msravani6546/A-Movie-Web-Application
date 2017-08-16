
function initialize () {
}
function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
		  var text=new Array(); 
		  document.getElementById("demo").innerHTML = "<pre>"+str+"</pre>";
		  document.getElementById("demo").innerHTML = "";
		 for (i = 0, len = json.results.length; i < len; i++) {
				var d= new Date(json.results[i].release_date);
				  document.getElementById("demo").innerHTML = document.getElementById("demo").innerHTML + 
																"<a href=\"#\" data-id=\"" + json.results[i].id +"\" onclick=\"loadMovieData(this.getAttribute('data-id'));\">"+ json.results[i].original_title +","+d.getFullYear() + "</a>" + "<br>";
			}
		}
   };
   xhr.send(null);
}

function loadMovieData (id) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", "proxy.php?method=/3/movie/" + id);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
			document.getElementById("poster").src = "https://image.tmdb.org/t/p/w150" + json.poster_path;
			document.getElementById("title").innerHTML = json.title;
			var genres = "";
			for(i=0, len=json.genres.length; i<len; i++){
				genres += json.genres[i].name;
				if(i!=len-1)
					genres += ", ";
			}
			document.getElementById("genres").innerHTML = "<strong>Genres</strong><br>"+genres;
			document.getElementById("summary").innerHTML = "<strong>Summary</strong><br>" + json.overview;
			loadCastData(id);
		}
   };
   xhr.send(null);
}

function loadCastData (id) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", "proxy.php?method=/3/movie/" + id+"/credits");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
			var cast = "";
			for(i=0, len=json.cast.length; i<5; i++){
				cast += json.cast[i].name + "<br>";
			}
			document.getElementById("cast").innerHTML = "<strong>Cast</strong><br>" + cast;
		}
   };
   xhr.send(null);
}
