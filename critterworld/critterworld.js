const apiEndpoint = "hannahfantasia.com/critterworld/critters/000.00_Mason/000.00_Mason.json";
const display = document.querySelector("#display-data");
const input = document.querySelector("#input");


function check(str){
  if(str.match(/(\w*)\.json$/) == null){
      console.log('false');
      return false;
  }
  else {
      console.log('true');
      return true;
  }
}


// FUNCTION TO FETCH A JSON FILE  
const getData = async () => {
  const res = await fetch(entries);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await res.json();
  console.log(data)
  return data;
}

// FUNCTION TO VISUALISE THE DATA
const displayUsers = async () => {
  let query = input.value;

  const payload = await getData();

  let dataDisplay = payload.map((object) => {
    const {name, species, age, occupation, personality, description} = object; // LIST YOUR JSON DATA HERE

    return `
    <div class="container">
    <p>Name: ${name}</p>
    <p>Species: ${species}</p>
    <p>Age: ${age}</p>
    <p>Occupation: ${occupation}</p>
    <p>Personality: ${personality}</p>
    <p>Description: ${description}</p>
    </div>
    `/////AND HERE ABOVE DIV^////
  }).join("");

  display.innerHTML = dataDisplay;
}

displayUsers();