alert("TES!!"); 
var mod_one = "https://api.modrinth.com/v2/search?facets=[[%22downloads%20%3E=%20200%22],[%22project_type:mod%22]]&index=follows&offset=1&limit=1";
const userAction = async () => {
  const mod_one_response = await fetch(mod_one);
  const mod_one_json = await response.mod_one_response(); 
    console.log(mod_one_json);
}
userAction();