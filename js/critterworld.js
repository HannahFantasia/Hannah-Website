document.addEventListener("DOMContentLoaded", (event) => {
    displayCritters()
});

const display = document.querySelector("#display-data");

const name_list = [
    "000.00_Mason",
    "001.00_Jube",
    "002.00_Jason"
  ];

const fetchSingle = async (url) => {
  const fetch_data = fetch(url)
  const result = (await fetch_data).json()
                                   .catch((error) => {throw error})
  return result
}

const fetchCritters = async () => {
  const base_url = "https://raw.githubusercontent.com/HannahFantasia/HannahFantasia-Site/main/critterworld/critters/";

  results = name_list.map((name) => {
    const cur_url = `${base_url}${name}/${name}.json`;

    return fetchSingle(cur_url)
      .catch((error) => {
        console.log(`${name} was not found`);
      });
  });

  critter_objects = await Promise.all(results);
  critter_objects_valid = critter_objects.filter((critter) => typeof critter !== "undefined");
  return critter_objects_valid;
}

const displayCritters = async () => {
    const critters = await fetchCritters();
    let dataDisplay = critters.map((critter) => {

      const { Name, Age, Attributes, ImageInfo } = critter;
      const { Species, Occupation, Personality, Description } = Attributes;
      const { Avatar, Banner } = ImageInfo;
  
      return `
      <div class="container">
        <img src="${Avatar}" alt="They are a ${Species}">
        <img src="${Banner}" alt="${Description}">
        <p>Name: ${Name}</p>
        <p>Species: ${Species}</p>
        <p>Age: ${Age}</p>
        <p>Occupation: ${Occupation}</p>
        <p>Personality: ${Personality}</p>
        <p>Description: ${Description}</p>
      </div>`;
    }).join("");
  
    display.innerHTML = dataDisplay;
}