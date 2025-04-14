/* Declare array variable for cart items */
let cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const app = {
  init: () => {
    //based on the current page...
    let page = document.body.id;

    switch (page) {
      case "Home":
        app.showPage();
        app.toggleMenu();
        app.getUser();
        app.showBadge();    
        break;
      case "Product":
        app.getProduct();
        app.toggleMenu();
        app.getUser();
        app.showBadge();    
        break;
      case "Products":
        app.showProducts();
        app.toggleMenu();
        app.getUser();
        app.showBadge();    
        break;
      case "Cart":
        app.getCart();
        app.toggleCart();
        app.getUser();
        app.showBadge();    
        break;
      case "Accounts":
        app.toggleForm();
        app.getForm();
        app.toggleMenu();
        app.getUser();
        app.showBadge();    
        break;
      default:
    }

    app.getCopyRight();
    app.getDateModified();
  },
  getData: async (ptype) => {    
    try {
      let response = await fetch('data/products.json');
      let data = await response.json();
      let categories = [
        "mens",
        "womens",
        "jewelries",
        "electronics",
        "shoes",
        "watches",
      ];
      if (ptype == "all") {
        return data.prod;
      } else if (ptype == "featured" || ptype == "latest") {
        return data.prod.filter((product) => product.productType == ptype);
      } else if (categories.find((x) => x === ptype)) {
        return data.prod.filter((product) => product.category === ptype);
      } else {
        return data.prod.find((product) => product.id === ptype);
      }
      
    } catch (error) {
      console.log(error);
    }
        
  },

  toggleMenu: () => {
    let navigation = document.querySelector(".navigation");
    let menuButton = document.querySelector("#menu");
    let caption = document.querySelector(".caption");

    /* Event Listener for mobile menu  */
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("open");
      caption.classList.toggle("open");
    });
  },
  toggleCart: () => {
    let navigation = document.querySelector(".navigation");
    let menuButton = document.querySelector("#menu");
    let cart = document.querySelector(".cart-page");

    /* Event Listener for mobile menu  */
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("open");
      cart.classList.toggle("open");
    });
  },
  getProduct_new: async (id) => {
    let product = await app.getData(id);
    let productDialog = document.querySelector("#productDialog");
    let closeButton = document.querySelector("#productDialog button");
    let productImg = document.querySelector(".product-img");
    let img = document.createElement("img");
    let h1 = document.querySelector("h1");
    let h3 = document.querySelector("h3");
    let h4 = document.querySelector("h4");
    let p = document.querySelector("p");
    let aTag = document.querySelector(".btn");
    let qty = document.querySelector("#qty");
    h1.textContent = product.name;
    h3.innerHTML = `Price:  ${app.formatCurrency(product.price)}`;
    h4.innerHTML = `Rating: ${app.starRatings(product.ratings)}`;
    p.textContent = product.description;
    img.setAttribute("src", product.srcImage);
    img.setAttribute("alt", product.name);
    img.setAttribute("loading", "lazy");
    productImg.appendChild(img);

    closeButton.addEventListener("click", () => {
      productDialog.close();
    });

    productDialog.showModal();

  },

  /* getProduct function to get a single product details    */
  getProduct: async () => {
    let change = false;
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let product = await app.getData(id);
    let productImg = document.querySelector(".product-img");
    let img = document.createElement("img");
    let h1 = document.querySelector("h1");
    let h3 = document.querySelector("h3");
    let h4 = document.querySelector("h4");
    let p = document.querySelector("p");
    let aTag = document.querySelector(".btn");
    let qty = document.querySelector("#qty");
    h1.textContent = product.name;
    h3.innerHTML = `Price:  ${app.formatCurrency(product.price)}`;
    h4.innerHTML = `Rating: ${app.starRatings(product.ratings)}`;
    p.textContent = product.description;
    img.setAttribute("src", product.srcImage);
    img.setAttribute("alt", product.name);
    img.setAttribute("loading", "lazy");
    productImg.appendChild(img);
    qty.addEventListener("change", () => {
      aTag.href = `cart.html?id=${product.id}&qty=${qty.value}`;
      change = true;
    });

    if (!change) {
      aTag.href = `cart.html?id=${product.id}&qty=1`;
    }
  },
  displayProducts_new: async (nodeElement, ptype) => {
    let products = await app.getData(ptype);
    nodeElement.innerHTML = "";

    products.forEach((product) => {
      let ratings = app.starRatings(parseInt(product.ratings));
      let card = document.createElement("div");
      card.classList.add("card");
      card.addEventListener("click", () => app.getProduct_new(product.id));
      let cardImage = document.createElement("img");
      cardImage.setAttribute("src", product.srcImage);
      cardImage.setAttribute("alt", product.id);
      cardImage.setAttribute("loading", "lazy");
      cardImage.classList.add("medium");

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let name = document.createElement("h2");
      name.textContent = product.name;

      let ratingDiv = document.createElement("div");
      ratingDiv.classList.add("rating");
      ratingDiv.innerHTML = ratings;

      let priceDiv = document.createElement("div");
      priceDiv.innerHTML = `${app.formatCurrency(product.price)}`;

      card.appendChild(cardImage);
      cardBody.appendChild(name);
      cardBody.appendChild(ratingDiv);
      cardBody.appendChild(priceDiv);

      card.appendChild(cardBody);
      nodeElement.appendChild(card);

    });

  },

  displayProducts: async (nodeElement, ptype) => {
    let products = await app.getData(ptype);
    nodeElement.innerHTML = "";

    products.forEach((product) => {
      let ratings = app.starRatings(parseInt(product.ratings));
      let card = document.createElement("div");
      card.classList.add("card");

      let cardTag = `
        <a href="product.html?id=${product.id}">     
        <img class="medium" src="${product.srcImage}" alt="${
        product.id
      }" loading="lazy" />
        </a>
        <div class="card-body">
        <a href="product.html?id=${product.id}">
        <h2>${product.name}</h2>
        </a>
        <div class="rating">${ratings}</div>
        <div class="price">${app.formatCurrency(product.price)}</div>
        </div>
      `;
      card.innerHTML = cardTag;
      nodeElement.appendChild(card);
    });
  },

  showProducts: () => {
    let category = document.querySelector("#category");
    let aProducts = document.querySelector(".a-products");
    app.displayProducts(aProducts, "all");
    category.addEventListener("change", () => {
      console.log(category.value);
      app.displayProducts(aProducts, category.value);
    });
  },

  showPage: () => {
    let fProducts = document.querySelector(".f-products");
    let lProducts = document.querySelector(".l-products");
    app.displayProducts(fProducts, "featured");
    app.displayProducts(lProducts, "latest");
  },

  showBadge: () => {
    /* Declare array variable for cart items */
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    let badge = document.querySelector(".badge");
    if (cartItems.length > 0) {
        badge.style.display = "normal";
        badge.innerHTML = `${cartItems.length}`;
    } else {
      badge.style.display = "none";
    }
    
  },

  starRatings: (rating) => {
    let ratingString = "";
    let ratingPoints = [
      {
        full: 1,
        half: 0.5,
      },
      {
        full: 2,
        half: 1.5,
      },
      {
        full: 3,
        half: 2.5,
      },
      {
        full: 4,
        half: 3.5,
      },
      {
        full: 5,
        half: 4.5,
      },
    ];

    ratingPoints.forEach((point) => {
      ratingString +=
        rating >= point.full
          ? `<span class="fa fa-star"></span>`
          : rating >= point.half
          ? `<span class="fa fa-star-half-o"></span>`
          : `<span class="fa fa-star-o"></span>`;
    });

    return ratingString;
  },

  /* getCart function initializes Cart process */
  getCart: () => {
    let queryString = window.location.search;
    let url = new URL(location.href);
    let id = "";
    let qty = 0;
    if (queryString.length < 10) {
      app.displayCart();
    } else {
      id = url.searchParams.get("id");
      qty = url.searchParams.get("qty");
      app.addToCart(id, qty);
    }
  },

  addToCart: async (id, qty) => {
    /* Declare array variable for cart items */
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    let alreadyInCart = false;
    let product = await app.getData(id);

    if (cartItems.length === 0) {
      alreadyInCart = false;
    } else {
      cartItems.forEach((item) => {
        if (item.id === id) {
          item.qty = qty;
          alreadyInCart = true;
        }
      });
    }

    if (!alreadyInCart) {
      cartItems.push({
        id: id,
        name: product.name,
        price: product.price,
        image: product.srcImage,
        qty: qty,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    app.displayCart();
    app.showBadge();
  },

  addMore: (id) => {
    /* Declare array variable for cart items */
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    cartItems.forEach((item) => {
      if (item.id === id) {
        item.qty++;
      }
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    app.displayCart();
    app.showBadge();
  },

  removeFromCart: (id) => {
    /* Declare array variable for cart items */
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    let i = 0;

    while (i < cartItems.length) {
      if (cartItems[i].id === id) {
        cartItems.splice(i, 1);
      } else {
        ++i;
      }
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    app.displayCart();
    app.showBadge();
  },

  displayCart: () => {
    /* Declare array variable for cart items */
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    let userLogin = localStorage.getItem("userLogin")
      ? JSON.parse(localStorage.getItem("userLogin"))
      : "";

    let table = document.querySelector("table");
    let totalPrice = document.querySelector(".total-price table");
    table.innerHTML = "";
    totalPrice.innerHTML = "";
    //empty.innerHTML = "";

    if (cartItems.length == 0) {
      let tr1 = document.createElement("tr");
      tr1.innerHTML = `<td class="empty">Your cart is empty. Kindly go shopping!!</td>`;
      table.appendChild(tr1);
    } else {
      let tr1 = document.createElement("tr");
      tr1.innerHTML = `
    <th>Product</th>
    <th>Quantity</th>
    <th>Subtotal</th>    
    `;
      table.appendChild(tr1);
      cartItems.forEach((item) => {
        let tr2 = document.createElement("tr");
        tr2.innerHTML = `
          <td>
            <div class="cart-info">
              <img src=${item.image} alt="product">
              <div>
                <p>${item.name}</p>
                <small>Price: ${app.formatCurrency(item.price)}</small><br>
                <a href="#" onclick="app.removeFromCart('${
                  item.id
                }'); return false;">Remove</a>
              </div>
            </div>          
          </td>
          <td> 
          <div class="more">
             ${item.qty}
              <a href="#" onclick="app.addMore('${
                item.id
              }'); return false;">Add More</a>
              </div>
          </td>
          
          <td>${app.formatCurrency(item.price * item.qty)}</td>
        
        `;
        table.appendChild(tr2);
      });

      let tr3 = document.createElement("tr");
      tr3.innerHTML = `
      <td>Total</td>
      <td>${app.formatCurrency(
        cartItems.reduce((a, c) => a + c.price * c.qty, 0)
      )} 
      </td>`;
      totalPrice.appendChild(tr3);
      if (userLogin) {
        let tr4 = document.createElement("tr");
        tr4.innerHTML = `
        <td colspan="2"><a href="" class="btn">Proceed to Checkout</a></td>
        `;
        totalPrice.appendChild(tr4);
      }
    }
  },

  getForm: () => {
    let loginForm = document.getElementById("LoginForm");
    let regForm = document.getElementById("RegForm");
    let output = document.getElementById("output");
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : [];

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();


      let params = app.getParameters(output.value);
      let username = params[0];
      let password = params[1];
      let user = userInfo.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        localStorage.setItem("userLogin", JSON.stringify(user));
        location.reload();
      } else {
        alert("Your username/password is incorrect. Please try again.");
        loginForm.username.focus();
      }
    });

    loginForm.addEventListener("input", (e) => {
      e.preventDefault();
      output.value = "";

      let data = new FormData(loginForm);
      let url = new URL(loginForm.action, window.location.href);
      url.search = new URLSearchParams(data).toString();
      output.value = url.search;
    });

    regForm.addEventListener("input", (e) => {
      e.preventDefault();
      output.value = "";

      let data = new FormData(regForm);
      let url = new URL(regForm.action, window.location.href);
      url.search = new URLSearchParams(data).toString();
      output.value = url.search;
    });

    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let user = {};
      let params = app.getParameters(output.value);
      let username = params[0];
      let email = params[1];
      let password = params[2];
      email = email.replace("%40", "@");

      if (userInfo.find((user) => user.username === username)) {
        alert("Username already registered.");
        regForm.username.focus();
      } else {
        user = {
          username: username,
          password: password,
          email: email,
        };

        userInfo.push(user);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        regForm.reset();

        loginForm.username.focus();
      }
    });
  },

  getParameters: (queryString) => {
    let params = queryString.split("&");
    let result = [];

    params.forEach((token) => {
      let actuals = token.split("=");
      result.push(actuals[1]);
    });

    return result;
  },

  getUser: () => {
    let user = document.querySelector(".user");
    let userLogin = localStorage.getItem("userLogin")
      ? JSON.parse(localStorage.getItem("userLogin"))
      : "";

    if (userLogin) {
      user.innerHTML = `<a href="">${userLogin.username}  <i class="fa fa-caret-down"></i></a>
      <ul class="user-content"><a href="#" onClick="app.logOut(); return false;">Logout</a></ul>      
      `;
    }
  },

  logOut: () => {
    //localStorage.removeItem("cartItems");
    localStorage.removeItem("userLogin");
    location.reload();
  },

  initStorage: () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("userInfo");
  },

  /* Copyright function */
  getCopyRight: () => {
    let copyRight = document.querySelector("#copyright");
    let currentYear = new Date().getFullYear();
    copyRight.innerHTML = `&copy;<span>${currentYear}</span> 🌹 Victor Asuquo 🌹 Nigeria`;
  },

  /* Last modification function    */
  getDateModified: () => {
    let = modification = document.querySelector("#modification");
    let modiDate = new Date(document.lastModified);
    let Seconds;

    if (modiDate.getSeconds() < 10) {
      Seconds = `0${modiDate.getSeconds()}`;
    } else {
      Seconds = modiDate.getSeconds();
    }

    let CurTime = `${modiDate.getHours()}:
          ${modiDate.getMinutes()}:${Seconds}`;

    let showDateTime = `${modiDate.getDate()}/
       ${modiDate.getMonth() + 1}/
       ${modiDate.getFullYear()} ${CurTime}`;

    modification.innerHTML = `Last modification: ${showDateTime}`;
  },
  /* Currency format function to format item price */
  formatCurrency: (num) => {
    const convNum = Number(num.toFixed(2)).toLocaleString();
    return `\u20A6${convNum} `;
  },

  /* Function to toggle Login / Registration form  */
  toggleForm: () => {
    let loginForm = document.querySelector("#LoginForm");
    let regForm = document.querySelector("#RegForm");
    let indicator = document.querySelector("#indicator");

    let login = document.querySelector("#login");
    let register = document.querySelector("#register");

    login.addEventListener("click", () => {
      regForm.style.transform = "translateX(300px)";
      loginForm.style.transform = "translateX(300px)";
      indicator.style.transform = "translateX(0px)";
    });

    register.addEventListener("click", () => {
      regForm.style.transform = "translateX(0px)";
      loginForm.style.transform = "translateX(0px)";
      indicator.style.transform = "translateX(130px)";
    });
  },
  toggleLinks: () => {
    let links = document.querySelectorAll(".navigation li a");

    /* Event Listener for mobile menu  */
    if (links.length) {
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          let curr = e.target.textContent;
          links.forEach((link) => {
            if (link.textContent === curr) {
              link.className = 'current';
              console.log(link);
          } else {
              link.className = '';
          }
          });
         e.preventDefault();
         window.open(link.href);

        });
      });
    }
    
  },  
};

app.init();