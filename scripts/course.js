const copyRight = document.querySelector("#currentyear");
const modification = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navbar");
const status = document.querySelector(".status");
const currentYear = new Date().getFullYear();

copyRight.innerHTML = `&copy;<span>${currentYear}</span> 🌹 Victor Ekpenyong Asuquo 🌹 Nigeria`;
const modiDate = new Date(document.lastModified);
let Seconds;

if (modiDate.getSeconds() < 10) {
  Seconds = `0${modiDate.getSeconds()}`;
} else {
  Seconds = modiDate.getSeconds();
}

const CurTime = `${modiDate.getHours()}:${modiDate.getMinutes()}:${Seconds}`;
const showDateTime = `${modiDate.getDate()}/${
  modiDate.getMonth() + 1
}/${modiDate.getFullYear()} ${CurTime}`;

modification.innerHTML = `Last modification: ${showDateTime}`;

const coursesElement = document.querySelector(".courses");
const creditElement = document.querySelector(".credit");
const allBtn = document.querySelector(".all");
const cseBtn = document.querySelector(".cse");
const wddBtn = document.querySelector(".wdd");
const links = document.querySelectorAll(".navbar a");
const h1tag = document.querySelector("#h1tag");


/* displayCourses Function */
const displayCourses = (courseList) => {
    reset();
    creditElement.innerHTML = `Total Credits : ${courseList.reduce((a, c) => a + c.credits, 0)}`;
    courseList.forEach((course) => {
      let courseBox = document.createElement("div");

      
      courseBox.classList.add("box");

      if (course.completed) {
        courseBox.innerHTML = `✔️ ${course.subject}${course.number} `;
        courseBox.classList.add("box1");
      } else {
        courseBox.innerHTML = `✖️ ${course.subject}${course.number} `;
        courseBox.classList.add("box2");
      }
        
      coursesElement.appendChild(courseBox);
  
    });
    
    
};

/* EventListener for anchor elements */
links.forEach((a) => {
  a.addEventListener("click", () => {
    h1tag.textContent = a.textContent;
  });
});


/* reset Function */
const reset = () => {
    coursesElement.innerHTML = "";
    creditElement.innerHTML = "";
};

  

  /* Event Listener for course buttons  */
  allBtn.addEventListener("click", () => {
      displayCourses(courses);  
  });

  cseBtn.addEventListener("click", () => {
    displayCourses(courses.filter((course) => course.subject === "CSE"));
  });

  wddBtn.addEventListener("click", () => {
    displayCourses(courses.filter((course) => course.subject === "WDD"));
  });

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});
  
if (links.length) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((link) => {
          link.classList.remove('active');
      });
      e.preventDefault();
      link.classList.add('active');
//      if (!link.href.includes('index.html') || !link.href.includes('github')) {
//         window.open(link.href, '_blank').focus();
//      }
    });
  });
}

displayCourses(courses); 