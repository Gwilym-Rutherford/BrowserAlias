let searchBox = document.getElementById("searchBox");

fetch("config.json")
  .then(response => response.json())
  .then(config => {

    searchBox.addEventListener("input", () => {
      let instantAlias = config.instantAliasInfo;
      instantAlias.forEach((item) => {
        if (item.alias === searchBox.value) {
          window.location.href = item.url;
        }
      });
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


// searchBox.addEventListener("input", ()=>{
//     console.log("test");
//     let instantAlias = config.instantAliasInfo;
//     console.log("test");
//     instantAlias.forEach((item)=>{
//         if(item.alias == searchBox.textContent){
//             window.location.href = item.url;
//         }
//     });
// });