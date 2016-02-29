console.log($)
console.log('howdy buddy')


// ---------- The URLs we are using ------------//

// var apiKey = "?access_token=40541236a1882f4a5bb94aed45e4e1c3d30b7520"
var searchBaseUrl = "https://api.github.com/users/"

var profileUrl = "https://api.github.com/users/wcaillet"
//var fullProfileUrl = profileUrl + apiKey 
var profileEl = document.querySelector(".leftCol")

var repoBaseUrl= "https://api.github.com/users/wcaillet/repos"
var repoUrl = repoBaseUrl


// ---------- Search ------------//
// search input function that takes in search value and changes location.hash to that value

// searchjQuery function that takes base url and adds user name as input and makes that into a promise 
//that promise is then given the .then(whatever of the two functions from above) 


//controller function that reads the hashtag and takes out hash (make it into a var)
//then runs seachjQuery function (the var from above)

var inputEl = document.querySelector('.searchBox')
inputEl.value = ""
  
var doSearchRequest = function(userName) {
 	var profileUrl = searchBaseUrl + userName //+ apiKey
 	var userNamePromise = $.getJSON(profileUrl)  
  	
  	userNamePromise.then(handleProfileData)

  	var repoUrl = searchBaseUrl + userName + "/repos" //+ apiKey
  	var userRepoPromise = $.getJSON(repoUrl)

  	userRepoPromise.then(repoData)
} 

//http://api.github.com/users/wcaillet/repos
  
var inputToUrl = function(keyEvent) {
    var inputEl = keyEvent.target
    if (keyEvent.keyCode === 13) {
        var userName = inputEl.value
        inputEl.value = ''
        location.hash = userName
    }
}

// Original code:
// var controller = function() {
//     var userName = location.hash.substring(1)
//     doSearchRequest(userName)
// }

var controller = function() {
	var routeName = location.hash.substring(1)
	if(routeName === "home") {
		showHomeScreen()
	}
	else if(routeName === "settings") {
		profileEl.innerHTML = "Welcome to the Settings page"
	}
	else doSearchRequest(routeName)
}

var showHomeScreen = function() {
	profileEl.innerHTML = "Home on the profile page"
	repoEl.innerHTML = "Repos will appear here"
}
  
// inputVar . addEventListener('keypress',search input)
//window.addEventListener('hashchange',searchjQuery)  
inputEl.addEventListener("keypress", inputToUrl)
window.addEventListener('hashchange', controller)

//location.hash = "wcaillet"


// ---------- Profile Column ------------//

var profileData = function(jsonData) {
	console.log(jsonData)
	var profileString  = '<div class="photo">'+ '<img src="'+jsonData.avatar_url+' " '+'</div>' +'<hr>'
		profileString += '<div class="name">' + '<h1>' + jsonData.name + '</h1>' + '</div>'
		profileString += '<div class="name login">'+ '<p>' + jsonData.login + '</p>' + '</div>' +'<hr>'
		profileString += '<div class="otherInfo">'
		profileString += '<ul class="infoList">' 
		profileString +=     '<li>' + '<span class="iconSpan">' + '<i class="fa fa-home"></i>'+ '</span>' + jsonData.company +'</li>' 
		profileString +=     '<li>' + '<span class="iconSpan">' + '<i class="fa fa-map-marker"></i>'+ '</span>' +jsonData.location + '</li>' 
		profileString +=     '<li>' + '<span class="iconSpan">' + '<i class="fa fa-envelope-o"></i>'+ '</span>' 
		profileString +=        '<a href="mailto:' +jsonData.email+' ">' + jsonData.email + '</a>' +'</li>'
		profileString += '</ul>' 
		profileString += '</div>' +'<hr>'
		profileString += '<div class="statsContainer">' 
		profileString += 	'<div class="stats">'+ '<h3>'+jsonData.followers+'</h3>'+ '<span class="statsText">Followers</span>' +'</div>' 
		profileString += 	'<div class="stats">'+ '<h3>'+jsonData.public_gists+'</h3>'+ '<span class="statsText">Starred</span>' +'</div>' 
		profileString += 	'<div class="stats">'+ '<h3>'+jsonData.following+'</h3>'+ '<span class="statsText">Following</span>' +'</div>'
		profileString += '</div>'
//	console.log(profileString)
	return profileString
}  

var handleProfileData = function(jsonProfileObject) {
	console.log(jsonProfileObject)
	profileEl.innerHTML = profileData(jsonProfileObject)
}


// ---------- Repo Column ------------//

var repoEl = document.querySelector(".repoListContainer")

var repoData = function(jsonRepo){
//	console.log(jsonRepo)
	var htmlString = ''

	for(var i=0; i<jsonRepo.length; i++){
		var repoObj = jsonRepo[i]
		htmlString += arrToHtml(repoObj)
	}

	repoEl.innerHTML = htmlString
}

var arrToHtml = function(repoObj) {
	var repoString  = '<div class="repoList">'
		repoString +=   '<h3 class="repoName">' + '<a href="' + repoObj.html_url + '">' + repoObj.name + '</a>' + '</h3>'
		repoString +=   '<p class="repoDescription">' + repoObj.description + '</p>'	
		repoString +=   '<p class="repoDate">Updated: <time datetime="'+ repoObj.updated_at +' ">' +'</p>' 
		repoString += '</div>' 
 	return repoString
}


// ---------- Declarations ------------//

// var profilePromise = $.getJSON(profileUrl)
// profilePromise.then(handleProfileData)

// var repoPromise = $.getJSON(repoUrl)
// repoPromise.then(repoData)

if (location.hash === ""){
	location.hash = "home"
} 
else {
 controller()
}













