
const app = {
  init: () => {
    //based on the current page...
    let page = document.body.id;

    switch (page) {
      case "home":        
        app.loadGallery();
        app.toggleMenu();
        app.toggleLinks();
        app.getWeather();
        app.getSpotLight();
        break;
      case "directory":
        let dirType;
        app.getMembers("Grid");
        app.toggleMenu();
        app.toggleLinks();
        app.toggleDirectory();
        break;
      case "add":
        app.toggleMenu();
        app.toggleLinks();
        app.membershipInfo();
        break;
        case "summary":
          app.toggleMenu();
          app.toggleLinks();
          app.getSummary();
          break;
      case "discover":
        app.toggleMenu();
        app.toggleLinks();
        break;      
      default:
    }
    app.getCopyRight();
  },
  getMembers: async (option) => {
    try {
      let dirListing = document.querySelector("#dir");
      let response = await fetch('data/members.json');
      let data = await response.json();
      if (option === "List") {
        dirListing.innerHTML = `⏹️Grid`;
        dirType = "Grid";
        app.showList(data.mymem);      
      } else if (option === "Grid") {
        dirListing.innerHTML = `📄List`;
        dirType = "List";
        app.showGrid(data.mymem);      
      }
        
    } catch (error) {
      console.log(error);
    }

  },

  toggleMenu: () => {
    let menuButton = document.querySelector("#menu");
    let navigation = document.querySelector(".navbar");

    /* Event Listener for mobile menu  */
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("open");
      menuButton.classList.toggle("open");
    });
    
  },
  toggleLinks: () => {
    let links = document.querySelectorAll(".navbar a");

    /* Event Listener for mobile menu  */
    if (links.length) {
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          links.forEach((link) => {
              link.classList.remove('active');
          });
    //      e.preventDefault();
          link.classList.add('active');
    //      if (!link.href.includes('index.html') || !link.href.includes('github')) {
    //         window.open(link.href, '_blank').focus();
    //      }
        });
      });
    }
    
  },
  toggleDirectory: () => {
    let cards = document.querySelector(".cards");
    let display = document.querySelector("article");
    let dirListing = document.querySelector("#dir");
    dirListing.addEventListener("click", () => {   
      cards.innerHTML = "";
      display.innerHTML = "";
      app.getMembers(dirType);
    });
    
  },
  /* showGrid function displays member details in grid format  */
  showGrid: (members) => {
    let cards = document.querySelector(".cards");    
    cards.innerHTML = "";
    if (members) {
      members.forEach((member) => {
      let card = document.createElement("div");
      card.classList.add("card");
      let cardheader = document.createElement("div");
      cardheader.classList.add("card-header");
      let name = document.createElement("h2");
      name.textContent = member.name;
      let address = document.createElement("h3");
      address.textContent = member.address;
      
  
      cardheader.appendChild(name);
      cardheader.appendChild(address);
  
      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      let cardImg = document.createElement("img");
      cardImg.setAttribute("src", member.imageFile);
      cardImg.setAttribute("alt", member.name);
      
      let cardDetail = document.createElement("div");
      cardDetail.classList.add("card-detail");

      let cardDetail1 = document.createElement("p");
      let cardDetail2 = document.createElement("p");
      let cardDetail3 = document.createElement("p");  
      let cardDetail4 = document.createElement("p");      

      let status;

      switch (member.membershipLevel) {
        case "1":
          status = "Gold";
          break;
        case "2":
            status = "Silver";
            break;
        case "3":
            status = "Bronze";
            break;
        default:
          break;
      }
            
      cardDetail1.innerHTML = `<strong>Email:</strong> ${member.email}`;
      cardDetail2.innerHTML = `<strong>Phone:</strong> ${member.phone[0]}`;
      cardDetail3.innerHTML = `<strong>URL:</strong> ${member.website}`;
      cardDetail4.innerHTML = `<strong>Status:</strong> ${status}`;

      cardDetail.appendChild(cardDetail1);
      cardDetail.appendChild(cardDetail2);
      cardDetail.appendChild(cardDetail3);
      cardDetail.appendChild(cardDetail4);

      cardBody.appendChild(cardImg);
      cardBody.appendChild(cardDetail); 
            
      card.appendChild(cardheader);
      card.appendChild(cardBody); 
      cards.appendChild(card);   
    });
  }
    
  },

  showList: (members) => {
    let display = document.querySelector("article");
    display.innerHTML = "";

    if (members) {
      members.forEach((member) => {
        let logo = document.createElement("img");
        logo.classList.add("listing");
        logo.setAttribute("src", member.imageFile);
        logo.setAttribute("alt", member.name);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "55");
        logo.setAttribute("height", "55");        
        let section = document.createElement("section");
        section.classList.add("listing");
        let name = document.createElement("p");
        name.classList.add("decorate");
        name.textContent = member.name;
        let address = document.createElement("p");
        address.textContent = member.address;
        let phone = document.createElement("p");
        phone.textContent = member.phone[0];
        let email = document.createElement("p");      
        email.textContent = member.email;
        let website = document.createElement("a");
        website.setAttribute("href",member.website);
        website.innerHTML = member.website;

        section.appendChild(logo);
        section.appendChild(name);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(email);
        section.appendChild(website);

        display.appendChild(section);
      });
    }
  },
  
  loadGallery: () => {
    let slider = document.querySelector('.slider');
    let images = document.querySelectorAll('.slider img');
    let index = 0; 
    
    function swapImages() {
      index = (index + 1) % images.length;
      slider.style.transform = `translateX(${-index * 600}px)`;
    }

    setInterval(swapImages, 3000);
    
  },

  getWeather: () => {
    let lat = 7.38;
    let lon = 3.95;
    let url;
    let days = 3;
    const appid = "1ffd377f92f6b3a42caed1a63b316572";
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`;
    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`;    
    app.apiFetch(currentUrl,"current");
    app.apiFetch(forcastUrl,"forecast");
  },

  apiFetch: async (url,wtype) => {

    try {
      const response = await fetch(url);
      if (response.ok) {
          const data = await response.json();            
          app.displayResults(data,wtype);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
      console.log(error);
    }

  },

  displayResults: (data,wtype) => {
    let currentTemp = document.querySelector('#current-temp');
    let weatherCondition = document.querySelector('.weather-condition');
    let weatherDesc = document.createElement("p");
    let forecastTemp = document.querySelector('#forecast-temp');
    let weatherIcon = document.createElement("img");


    let desc;
    let icon;
    let temp;
    let iconsrc;
    let temp2;

    if (wtype === "current") {
      desc = data.weather[0].description;
      icon = data.weather[0].icon;
      temp = data.main.temp;
      iconsrc = `https://openweathermap.org/img/w/${icon}.png`;
      currentTemp.innerHTML = `  ${temp}&deg;C`;
      weatherIcon.setAttribute('src', iconsrc);
      weatherIcon.setAttribute('alt', desc);
      weatherDesc.textContent = `Weather Condition is ${desc}`;
      weatherCondition.appendChild( weatherIcon);
      weatherCondition.appendChild(weatherDesc);
    }
    if (wtype === "forecast") {
       temp2 = data.list[0].main.temp;
       forecastTemp.innerHTML = `  ${temp2}&deg;C`;
    }

    
  },

  getSpotLight: async () => {
    try {
      let response = await fetch('data/members.json');
      let data = await response.json();
      let spotLight = [];
      let randomList = [];
      let index = 0;
      data.mymem.forEach((member) => {
        if (member.membershipLevel === "1" || member.membershipLevel === "2") {
           spotLight.push(member);
        }           
      });

      let currentIndex = spotLight.length;

      for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        randomList[i] = spotLight[randomIndex];
        currentIndex--;        
      }
      app.showGrid(randomList);                    
    } catch (error) {
      console.log(error);
    }

  },
  membershipInfo: () => {
      document.getElementById("timestamp").value = new Date().getTime();      
      let levelDialog = document.querySelector("#levelDialog");
      let closeButton = document.querySelector("#levelDialog button");
      let memberBenefit = document.querySelector("#levelDialog p");
      let levelDesc = document.querySelector("#levelDialog h2");
      let benefits = [
         "Get access to business leaders and local influencers who can become partners, donors, or sponsors,Facilite collaborations with local businesses on shared goals like fundraising, or events,Help NGOs forster community integration and build  stronger roots locally. Cost: Non",
         "Access to business mixersvents, Business Directory Listing, Use the chamber logo to build trust, Free or discounted entry to business training sessions. Annual suscription: 250,000.00.",
         "Feature in chamber newsletters & website,Get business referrals from the chamber, Lower rates on chamber-sponsored ads, Access to deals from partner businesses, Join special interest groups or industry councils. Annual suscription: 500,000.00.",
         "Get featured at major chamber events, Direct engagement with policymakers, Present at chamber events & conferences, Premium placement in directories & promotions, Invite-only roundtables & executive meetups. Annual suscription: 1,500,000.00."
        ]

      closeButton.addEventListener("click", () => {
        levelDialog.close();
      });
    
      let mButton = document.querySelectorAll(".cards-container .card button");
      let mDesc = document.querySelectorAll(".cards-container .card p");

      for (let index = 0; index < mDesc.length; index++) {
         mButton[index].addEventListener("click", () => {
           levelDesc.innerHTML = mDesc[index].innerHTML;
           memberBenefit.innerHTML = benefits[index];
           levelDialog.showModal();
         });        
      }
          
      
  },
  getSummary: () => {
      let newMember = new URLSearchParams(window.location.search);

      let summaryTable = document.querySelector("#summaryTable");
      let status;
      let fname = newMember.get("fname");
      let lname = newMember.get("lname");
      let orgtitle = newMember.get("orgtitle");
      let email = newMember.get("email");
      let phone = newMember.get("phone");
      let business = newMember.get("business");
      let mlevel = newMember.get("mlevel");
      let bdesc = newMember.get("bdesc");      
      let timestamp = newMember.get("timestamp"); 
      
      let tableRow = summaryTable.insertRow(1);
      let cell1 = tableRow.insertCell(0);
      let cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "First Name";
      cell2.innerHTML = fname;

      tableRow = summaryTable.insertRow(2);
      cell1 = tableRow.insertCell(0);
      cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "Last Name";
      cell2.innerHTML = lname;

      tableRow = summaryTable.insertRow(3);
      cell1 = tableRow.insertCell(0);
      cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "Organizational Title";
      cell2.innerHTML = orgtitle;
      
      tableRow = summaryTable.insertRow(4);
      cell1 = tableRow.insertCell(0);
      cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "Email";
      cell2.innerHTML = email;

      tableRow = summaryTable.insertRow(5);
      cell1 = tableRow.insertCell(0);
      cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "Phone Number";
      cell2.innerHTML = phone;
      
      tableRow = summaryTable.insertRow(6);
      cell1 = tableRow.insertCell(0);
      cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "Business Name";
      cell2.innerHTML = business;

      if (mlevel === "1")
         status = "Non Profit Membershp";
      else if (mlevel === "2")
         status = "Bronze Membership";
      else if (mlevel === "3")
         status = "Silver Membership";
      else if (mlevel === "4")
         status = "Gold Membership";

      tableRow = summaryTable.insertRow(7);
      cell1 = tableRow.insertCell(0);
      cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "Membership Level";
      cell2.innerHTML = status;

      tableRow = summaryTable.insertRow(8);
      cell1 = tableRow.insertCell(0);
      cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "Business Description";
      cell2.innerHTML = bdesc;


      tableRow = summaryTable.insertRow(9);
      cell1 = tableRow.insertCell(0);
      cell2 = tableRow.insertCell(1);

      cell1.innerHTML = "Current Date";
      cell2.innerHTML = timestamp;
            
  },
                                                                                                    
  /* Copyright function */
  getCopyRight: () => {
    let projectName = document.querySelector("#projectName");
    let copyRight = document.querySelector("#copyRight");
    let modification = document.querySelector("#lastModified");
    let currentYear = new Date().getFullYear();
    projectName.innerHTML = `WDD231 Class Project <br>Victor E. Asuquo`;        
    copyRight.innerHTML = `&copy; <span>${currentYear}</span> Ifelodun Chamber of Commerce`;    
    modification.innerHTML = `Last Modification: ${app.getLastModifiedDate()}`;

  },

  /* Last modification function    */
  getLastModifiedDate: () => {
    let modiDate = new Date(document.lastModified);
    let Seconds;

    if (modiDate.getSeconds() < 10) {
        Seconds = `0${modiDate.getSeconds()}`;
      } else {
        Seconds = modiDate.getSeconds();
    }

    let curTime = `${modiDate.getHours()}:${modiDate.getMinutes()}:${Seconds}`;
    let showDateTime = `${modiDate.getDate()}/${modiDate.getMonth() + 1}/${modiDate.getFullYear()} ${curTime}`;
    return showDateTime;
  },

  
};

app.init();