export function showAliasInfo(config, query){

    let popup = document.getElementById("aliasPopUp");

    if(query.substring(1) === 'help'){
        popup.style.display = "block";
    }
}