document.addEventListener("DOMContentLoaded", (event) => {
  displayCritters();
});

const display = document.querySelector("#display-data");

const name_list = [
  "000.00_Mason",
  "001.00_Jube",
];

const fetchSingle = async (url) => {
  const fetch_data = fetch(url);
  const result = (await fetch_data).json().catch((error) => { throw error });
  return result;
};

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
};

const setHTMLCollectionCSS = (collection, css) => {
  Array.from(collection).forEach((element) => {
    element.style.cssText = css;
  });
};

const refreshCSS = (critters) => {
  display.style.display = "flex";
  display.style.flexWrap = "wrap";
  critters.forEach((critter) => {
    const current_class = `container_${critter.Id}`;
    const Containers = document.getElementsByClassName(current_class);
    Array.from(Containers).forEach((Container) => {
      const { Color } = critter.Attributes;

      Container.style.cssText = `
        background: ${Color};
        border: 10px ridge #ccc; /* Geocities-like border */
        padding: 20px; /* Increased padding for retro feel */
        width: 20em;
        height: 25em;
        border-radius: 10px; /* Rounded corners for a softer look */
        transition: transform 0.1s, background 0.5s;
        position: relative;
        cursor: pointer;
      `;

      Container.addEventListener("mouseover", () => {
        Container.style.transform = "rotate(5deg)";
      });

      Container.addEventListener("mouseout", () => {
        Container.style.transform = "rotate(0deg)";
      });

      const Avatars = Container.getElementsByClassName("avatar");
      setHTMLCollectionCSS(Avatars, `
        border-collapse: separate;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 5%;
        overflow: hidden;
      `);

      const textElements = Container.querySelectorAll(".name, .species, .age, .occupation, .personality");
      setHTMLCollectionCSS(textElements, `
        font-family: 'Press Start 2P', cursive;
        color: #fff;
        margin: 5px 0;
        font-size: 12px;
        text-align: center;
      `);

      // Add click event listener to show modal
      Container.addEventListener("click", () => {
        showModal(critter, Color);
      });
    });
  });
};

const showModal = (critter, color) => {
  const modal = document.createElement("div");
  modal.style.cssText = `
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  `;

  const modalContent = document.createElement("div");
  modalContent.style.cssText = `
    background-color: ${color};
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px; /* Rounded corners for a softer look */
  `;

  const closeBtn = document.createElement("span");
  closeBtn.style.cssText = `
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  `;

  modal.appendChild(modalContent);
  modalContent.appendChild(closeBtn);

  // Add critter details to modal content
  const { Name, Age, Attributes, ImageInfo } = critter;
  const { Species, Occupation, Personality, Description } = Attributes;
  const { Portrait } = ImageInfo;

  modalContent.innerHTML += `
    <img src="${Portrait}" alt="A pose of a ${Species}">
    <p>Name: ${Name}</p>
    <p>Species: ${Species}</p>
    <p>Age: ${Age}</p>
    <p>Occupation: ${Occupation}</p>
    <p>Personality: ${Personality}</p>
    <p>Description: ${Description}</p>
  `;

  // Add click event listener to close modal if clicked outside modal content
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  document.body.appendChild(modal);
};

const displayCritters = async () => {
  const critters = await fetchCritters();
  let dataDisplay = critters
    .map((critter) => {
      const { Name, Id, Age, Attributes, ImageInfo } = critter;
      const { Species, Occupation, Personality, Description } = Attributes;
      const { Avatar } = ImageInfo;
      return `
        <div class=container_${Id}>
          <ul style="list-style-type: none; padding: 0; margin: 0;">
            <li class=name style="font-family: 'Press Start 2P', cursive; color: #fff; font-size: 14px; margin-bottom: 5px;">${Name}</li>
            <li class=avatar><img src="${Avatar}" alt="They are a ${Species}"></li>
            <li class=species>Species: ${Species}</li>
            <li class=age>Age: ${Age}</li>
            <li class=occupation>Occupation: ${Occupation}</li>
            <li class=personality>Personality: ${Personality}</li>
            <li class=personality>Description: ${Description}</li>
          </ul>
        </div>
      `;
    })
    .join("");

  display.innerHTML = dataDisplay;
  refreshCSS(critters);
};
