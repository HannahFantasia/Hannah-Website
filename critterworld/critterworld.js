let critter_objects = []
const base_url = "https://raw.githubusercontent.com/HannahFantasia/HannahFantasia-Site/main/critterworld/critters/"

const name_list = [
  "000.00_Mason",
  "001.00_Jube"
];

document.addEventListener("DOMContentLoaded", (event) => {
  displayCritters();
});

const display = document.querySelector("#display-data");

const fetchSingle = async (url) => {
  const strdata = await fetch(url);
  const result = await strdata.json();
  return result;
}

const fetchCritters = async () => {
  const promises = name_list.map((name) => {
    const cur_url = `${base_url}${name}/${name}.json`;
    return fetchSingle(cur_url);
  });

  critter_objects = await Promise.all(promises);
  return critter_objects;
}

const displayCritters = async () => {
  const critters = await fetchCritters();
  console.log(critters);
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
