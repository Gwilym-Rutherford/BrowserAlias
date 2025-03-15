import { showAliasInfo } from "./aliasInfo.js";

let searchBox = document.getElementById("searchBox");
let popup = document.getElementById("aliasPopUp");

fetch("config.json")
  .then(response => response.json())
  .then(config => {
	searchBox.addEventListener("input", ()=>{
		if(searchBox.value.charAt(0) != '!'){
			searchDescription(config)
		}
	});
    searchBox.addEventListener("input", ()=>{
		if(searchBox.value.charAt(0) != '!'){
			instantAlias(config)
		}
	});
	searchBox.addEventListener("keyup", (event)=>{
		if (event.key === 'Enter'){
			if(searchBox.value.charAt(0) === '!'){
				showAliasInfo(config, searchBox.value);
			}else{
				alias(config);
			}
		}
	});

  }).catch(error => {
    console.error("Error loading config.json:", error);
  });

document.addEventListener("keydown", (event) => {
    if(searchBox != document.activeElement){
        searchBox.focus();
    }

	if(event.key === "Escape"){
		popup.style.display = "none";
	}
}); 

function instantAlias(config){
  let instantAlias = config.instantAliasInfo;
  instantAlias.forEach((item) => {
    if (item.alias === searchBox.value) {
		document.activeElement.blur();
      	window.location.href = item.url;
    }
  });
}

function alias(config){
	let url = getQueryInfo(config);

	window.location.href = url.url;

}


function getQueryInfo(config){
	let info = {
		url: null, 
		website: null,
		searchTerm: null
	}

	let query = searchBox.value;
	let tokens = query.split(" ");
	let alias = [tokens[0], tokens[tokens.length - 1]];

	config.aliasInfo.forEach((item)=>{
		if(alias.includes(item.alias)){
			let index = alias.indexOf(item.alias);
			tokens.splice(index, 1);

			info.website = item.name;
			info.searchTerm = tokens.join(" ");
			
			if (tokens.length === 0){
				info.url = item.baseURL
			}else{
				info.url = item.baseURL + item.searchURL + tokens.join("+");
			}

		}
	});

	if(info.url == null){
		info.website = "google";
		info.url = config.defaultURL + tokens.join("+");
		info.searchTerm = searchBox.value;
	}

	return info;

}

function getFirstAlias(arr, item){
	arr.forEach((arrItem)=>{
		if(arrItem.name == item){
			console.log(arrItem);
			return arrItem
		}
	});
}

function searchDescription(config){
	let website = document.getElementById("website");
	let searchTerm = document.getElementById("searchTerm");

	let queryInfo = getQueryInfo(config);

	website.innerText = queryInfo.website;
	searchTerm.innerText = queryInfo.url;

}