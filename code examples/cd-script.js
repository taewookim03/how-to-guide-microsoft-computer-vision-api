document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("submit").addEventListener("click", function(event){
		var req = new XMLHttpRequest();
		var imageURL = document.getElementById("imgURL").value;
		//var imageURL = encodeURIComponent(document.getElementById("imgURL").value);

		//https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags&subscription-key=<Your subscription key>
		var reqURL = "https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?";
		var apikey = "5fe3911888324f3a93c349d028981387";
		var visualFeatures = "Categories";
		req.open("POST", reqURL + "visualFeatures=" + visualFeatures + "&subscription-key=" + apikey, true);
		req.setRequestHeader("Content-Type", "application/json");
		var payload = { "url" : imageURL };
		
		req.addEventListener("load", function(){
			if (req.status >= 200 && req.status < 400) {
				var response = JSON.parse(req.responseText);
				var res;
				//document.getElementById("category").textContent = response.categories[0].name;
				//document.getElementById("score").textContent = response.categories[0].score;
				if (response.categories[0].name === "animal_cat" && response.categories[0].score > 0.90)
					res = "Yes, it's a cat";
				else{
					res = "No, it's not a cat";
				}
				document.getElementById("result").textContent = res;
			} 
			else {
				console.log("Error in network request" + req.statusText);
			}
		});
	req.send(JSON.stringify(payload));
	event.preventDefault();
	});
});