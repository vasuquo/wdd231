const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const utahBorn = document.querySelector('.btn1');
const outsideBorn = document.querySelector('.btn2');
const age = document.querySelector('.btn3');
const children = document.querySelector('.btn4');
const served = document.querySelector('.btn5');

const displayAll = async (filter="all") => {
    let prophets = await getProphetData();
    switch(filter) {
        case "all":
          break;
        case "Utah":
          prophets = prophets.filter((prophet) => prophet.birthplace === "Utah");
          break;
        case "Outside":
            prophets = prophets.filter((prophet) => prophet.birthplace === "England");
            break;
        case "Age":
                prophets = prophets.filter((prophet) => ageAtDeath(prophet.birthdate,prophet.death) >= 95);
                break;
        case "Child":
            prophets = prophets.filter((prophet) => prophet.numofchildren >= 10);
            break;
        case "Served":
            prophets = prophets.filter((prophet) => prophet.length >= 15);
            break;
        default:
          break;
    }
    displayProphets(prophets);
}

const getProphetData = async () => {
  const response = await fetch(url);
  const data = await response.json();
//  console.table(data.prophets); 
  return data.prophets;
}

const ageAtDeath = (bornDate, deathDate) => {
    let birthYear = bornDate.substr(bornDate.length - 4);
    let deathYear;
    if (deathDate !== null)
       deathYear = deathDate.substr(deathDate.length - 4);
    else
       deathYear = 2025;
    let age = (deathYear - birthYear);
    return age;
}


const displayProphets = (prophets) => {
    cards.innerHTML = "";
    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let portrait = document.createElement("img");
        let ialt = `Portrait of ${prophet.name} ${prophet.lastname} – ${prophet.order}th Latter-day President`
        fullName.innerHTML = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", ialt);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "240");
        portrait.setAttribute("height", "340");        
        card.appendChild(portrait);
        card.appendChild(fullName);
        cards.appendChild(card);
    });
}

utahBorn.addEventListener("click", () => {   
    displayAll("Utah");
 });
 
 outsideBorn.addEventListener("click", () => {   
    displayAll("Outside");
});

age.addEventListener("click", () => {   
    displayAll("Age");
});

children.addEventListener("click", () => {   
    displayAll("Child");
});

served.addEventListener("click", () => {   
    displayAll("Served");
});

 



displayAll();
