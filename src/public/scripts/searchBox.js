let searchBox = document.getElementById("searchBox");

fetch("config.json")
  .then(response => response.json())
  .then(config => {
	searchBox.addEventListener("input", ()=>searchDescription(config));
    searchBox.addEventListener("input", ()=>instantAlias(config));
	searchBox.addEventListener("keyup", (event)=>{
		if (event.key === 'Enter'){
			console.log("triggered");
			alias(config);
		}
	});

  })
  .catch(error => {
    console.error("Error loading config.json:", error);
  });

document.addEventListener("keydown", () => {
    if(searchBox != document.activeElement){
        searchBox.focus();
    }
}); 

function instantAlias(config){
  let instantAlias = config.instantAliasInfo;
  instantAlias.forEach((item) => {
    if (item.alias === searchBox.value) {
      window.location.href = item.url;
    }
  });
}

function alias(config){
	let url = splitAliasQuery(config);

	window.location.href = url.url;

}

function splitAliasQuery(config){
	let query = searchBox.value;
	let tokens = query.split(" ");
	let tokenLength = tokens.length;
	let alias = [tokens[0], tokens[tokenLength - 1]];

	let found = false;
	let website;
	let url;
	let aliasInfo = config.aliasInfo;
	
	for(let item of aliasInfo){
		if (item.alias === alias[0]){
			url = item.url + tokens.slice(1).join(" ");
			website = item.name;
			found = true;
			break;
		}else if (item.alias == alias[1]){
			url = item.url + tokens.slice(0, tokenLength - 1).join(" ");
			website = item.name;
			found = true;
			break;
		}
	}

	if(found){
		url = encodeString(url)
	}else{
		url= config.defaultURL + encodeString(query);
		website = "google";
	}

	return {
		url: url,
		website: website
	};

}


function encodeString(query) {
    if(typeof query === "string"){
        return query.split(" ").join("+");
    } else {
        return "";
    }
}

function searchDescription(config){
	let website = document.getElementById("website");
	let searchTerm = document.getElementById("searchTerm");

	let queryInfo = splitAliasQuery(config);

	website.innerText = queryInfo.website;
	searchTerm.innerText = queryInfo.url;

}