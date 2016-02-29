console.log($)
console.log('howdy buddy')


// ---------- The URLs we are using ------------//

//var apiKey = '&38f5cc6257a6b39c836ca5e937e993a1e82f1ca5'

// ---------- Search ------------//
// search input function that takes in search value and changes location.hash to that value

// searchjQuery function that takes base url and adds user name as input and makes that into a promise 
//that promise is then given the .then(whatever of the two functions from above) 


//controller function that reads the hashtag and takes out hash (make it into a var)
//then runs seachjQuery function (the var from above)

var inputEl = document.querySelector('.searchBox')
inputEl.value = " "
  
var searchBaseUrl = "https://api.github.com/users/"
  
var doSearchRequest = function(userName) {
 	var profileUrl = searchBaseUrl + userName //+ access key?
 	var userNamePromise = $.getJSON(profileUrl)  
  	
  	userNamePromise.then(handleProfileData)

  	var repoUrl = searchBaseUrl + userName + "/repos" // + access key?
  	var userRepoPromise = $.getJSON(repoUrl)

  	userRepoPromise.then(repoData)
} 
  
var inputToUrl = function(keyEvent) {
    var inputEl = keyEvent.target
    if (keyEvent.keyCode === 13) {
        var userName = inputEl.value
        inputEl.value = ""
        location.hash = userName
    }
}

var controller = function() {
    var userName = location.hash.substring(1)
    doSearchRequest(userName)
}
  
// inputVar . addEventListener('keypress',search input)
//window.addEventListener('hashchange',searchjQuery)  
inputEl.addEventListener("keypress", inputToUrl)
window.addEventListener('hashchange', controller)


// ---------- Profile Column ------------//

var profileUrl = "https://api.github.com/users/wcaillet"
//var fullProfileUrl = profileUrl + apiKey 

var profilePromise = $.getJSON(profileUrl)

var profileEl = document.querySelector(".leftCol")

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

var repoBaseUrl= "https://api.github.com/users/wcaillet/repos"
var repoUrl = repoBaseUrl

var repoPromise = $.getJSON(repoUrl)

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

profilePromise.then(handleProfileData)

repoPromise.then(repoData)















