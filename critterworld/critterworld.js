document.addEventListener("DOMContentLoaded", (event) => {
  displayCritters()
});

const display = document.querySelector("#display-data");

const fetchSingle = async (url) => {
  const strdata = fetch(url)
  const result = (await strdata).json()
  return result
}

const fetchCritters = async () => {
  const base_url = "https://raw.githubusercontent.com/HannahFantasia/HannahFantasia-Site/main/critterworld/critters/"
  const name_list = [
    "000.00_Mason",
    "001.00_Jube"]

  let critter_objects = []
  name_list.forEach((name) => {
    const cur_url = `${base_url}${name}/${name}.json`

    fetchSingle(cur_url).then((critter) => {
      critter_objects.push(critter)
    })
    .catch((error) => {
      console.log(error)
    })

  })

  return critter_objects
}

const displayCritters = async () => {
  const critters = await fetchCritters();
  
  let dataDisplay = critters.map((critter) => {
    const {Name, Age, Attributes} = critter; // LIST YOUR JSON DATA HERE
    const {Species, Occupation, Personality, Description} = Attributes;
    const {Avatar, Banner} = ImageInfo;
    
    return `
    <div class="container">
    <img>src=${Avatar}</img>
    <img>src=${Banner}</img>
    <p>Name: ${Name}</p>
    <p>Species: ${Species}</p>
    <p>Age: ${Age}</p>
    <p>Occupation: ${Occupation}</p>
    <p>Personality: ${Personality}</p>
    <p>Description: ${Description}</p>
    </div>
    `/////AND HERE ABOVE DIV^////
  }).join("");
  
  display.innerHTML = dataDisplay;
}