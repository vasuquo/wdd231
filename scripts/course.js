const copyRight = document.querySelector("#currentyear");
const modification = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navbar");
const currentYear = new Date().getFullYear();

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


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

/* displayCourses Function */
const displayCourses = (courseList) => {
    reset();
    creditElement.innerHTML = `Total Credits : ${courseList.reduce((a, c) => a + c.credits, 0)}`;
    courseList.forEach((course) => {
      let courseBox = document.createElement("div");

      courseBox.innerHTML = `${course.subject}${course.number} `;
      courseBox.classList.add("box");

      if (course.completed) {
        courseBox.classList.add("box1");
      } else {
        courseBox.classList.add("box2");
      }
        
      coursesElement.appendChild(courseBox);
  
    });
    
    
};

/* reset Function */
const reset = () => {
    coursesElement.innerHTML = "";
    creditElement.innerHTML = "";
    //creditElement.style.backgroundColor = "transparent";
    //rgba(57, 100, 117, 0.977)
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
      if (!link.href.includes('index.html') || !link.href.includes('github')) {
         window.open(link.href, '_blank').focus();
      }
    });
  });
}