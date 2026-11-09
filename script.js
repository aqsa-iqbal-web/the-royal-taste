// ==================================
// 1. RESTAURANT CONFIGURATION
// ==================================

// Replace these with actual restaurant details.
// Use country code without +, spaces or dashes.
// Example format: 923001234567

const RESTAURANT = {
  whatsapp: "",
  address: "",
  googleMapsUrl: ""
};

// ==================================
// 2. FOOD MENU DATABASE
// ==================================

const foodItems = [

  {
    id: 1,
    name: "Crispy Chicken Wings",
    category: "Starters",
    price: 650,
    description: "Crispy wings served with a delicious dip.",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600"
  },

  {
    id: 2,
    name: "Loaded Fries",
    category: "Starters",
    price: 450,
    description: "Golden fries with cheese and special sauce.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600"
  },

  {
    id: 3,
    name: "Chicken Sandwich",
    category: "Fast Food",
    price: 550,
    description: "Fresh chicken sandwich with creamy dressing.",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=600"
  },

  {
    id: 4,
    name: "Zinger Burger",
    category: "Burgers",
    price: 650,
    description: "Crispy chicken fillet with fresh vegetables.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },

  {
    id: 5,
    name: "Beef Cheese Burger",
    category: "Burgers",
    price: 850,
    description: "Juicy beef patty topped with melted cheese.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },

  {
    id: 6,
    name: "Chicken Tikka Pizza",
    category: "Pizza",
    price: 1450,
    description: "Chicken tikka, cheese and fresh toppings.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  },

  {
    id: 7,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 1650,
    description: "Classic pizza with cheese and pepperoni.",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600"
  },

  {
    id: 8,
    name: "Chicken Malai Boti",
    category: "BBQ",
    price: 1100,
    description: "Tender grilled chicken with creamy spices.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600"
  },

  {
    id: 9,
    name: "Chicken Seekh Kebab",
    category: "BBQ",
    price: 850,
    description: "Traditional grilled kebabs with spices.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600"
  },

  {
    id: 10,
    name: "Chicken Karahi",
    category: "Pakistani Cuisine",
    price: 1800,
    description: "Traditional chicken karahi with rich spices.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600"
  },

  {
    id: 11,
    name: "Chicken Biryani",
    category: "Pakistani Cuisine",
    price: 450,
    description: "Aromatic rice cooked with chicken and spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600"
  },

  {
    id: 12,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 400,
    description: "Rich chocolate brownie for dessert lovers.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
  },

  {
    id: 13,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 500,
    description: "Soft chocolate cake with creamy layers.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
  },

  {
    id: 14,
    name: "Fresh Lemonade",
    category: "Drinks",
    price: 200,
    description: "Refreshing fresh lemon drink.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=600"
  },

  {
    id: 15,
    name: "Cold Coffee",
    category: "Drinks",
    price: 350,
    description: "Chilled coffee with a creamy finish.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
  }

];

// ==================================
// 3. SHOPPING CART
// ==================================

let cart = [];

// ==================================
// 4. DISPLAY FOOD ITEMS
// ==================================

const foodGrid = document.getElementById("foodGrid");

function displayFood(category = "All") {

  const filteredItems = category === "All"
    ? foodItems
    : foodItems.filter(item => item.category === category);

  foodGrid.innerHTML = filteredItems.map(item => `

    <article class="food-card">

      <img
        src="${item.image}"
        alt="${item.name}"
        loading="lazy">

      <div class="food-info">

        <h3>${item.name}</h3>

        <p>${item.description}</p>

        <div class="food-bottom">

          <span class="food-price">
            Rs. ${item.price.toLocaleString("en-PK")}
          </span>

          <button
            class="add-btn"
            data-add="${item.id}"
            aria-label="Add ${item.name} to cart">
            + Add
          </button>

        </div>

      </div>

    </article>

  `).join("");

}

// Display all food when website loads.

displayFood();

// ==================================
// 5. MENU CATEGORY FILTER
// ==================================

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    categoryButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.category;

    displayFood(category);

  });

});

// ==================================
// 6. ADD FOOD TO CART
// ==================================

foodGrid.addEventListener("click", event => {

  const button = event.target.closest("[data-add]");

  if (!button) return;

  const foodId = Number(button.dataset.add);

  const selectedFood = foodItems.find(
    item => item.id === foodId
  );

  const existingItem = cart.find(
    item => item.id === foodId
  );

  if (existingItem) {

    existingItem.quantity++;

  } else {

    cart.push({
      ...selectedFood,
      quantity: 1
    });

  }

  displayCart();

});

// ==================================
// 7. DISPLAY CART
// ==================================

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function displayCart() {

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty. Add something delicious!
      </p>
    `;

  } else {

    cartItems.innerHTML = cart.map(item => `

      <div class="cart-item">

        <div class="cart-item-info">

          <strong>${item.name}</strong>

          <small>
            Rs. ${item.price.toLocaleString("en-PK")}
            × ${item.quantity}
          </small>

        </div>

        <div class="quantity-controls">

          <button
            data-action="decrease"
            data-id="${item.id}"
            aria-label="Decrease ${item.name}">
            −
          </button>

          <span>${item.quantity}</span>

          <button
            data-action="increase"
            data-id="${item.id}"
            aria-label="Increase ${item.name}">
            +
          </button>

          <button
            class="remove-btn"
            data-action="remove"
            data-id="${item.id}"
            aria-label="Remove ${item.name}">
            ✕
          </button>

        </div>

      </div>

    `).join("");

  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartTotal.textContent =
    "Rs. " + total.toLocaleString("en-PK");

}

// ==================================
// 8. QUANTITY CONTROLS
// ==================================

cartItems.addEventListener("click", event => {

  const button = event.target.closest("[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);

  const action = button.dataset.action;

  const item = cart.find(food => food.id === id);

  if (!item) return;

  if (action === "increase") {

    item.quantity++;

  }

  else if (action === "decrease") {

    item.quantity--;

    if (item.quantity <= 0) {

      cart = cart.filter(food => food.id !== id);

    }

  }

  else if (action === "remove") {

    cart = cart.filter(food => food.id !== id);

  }

  displayCart();

});

// ==================================
// 9. WHATSAPP ORDERING
// ==================================

function sendWhatsAppOrder() {

  if (cart.length === 0) {

    alert("Please add food to your cart first!");

    return;

  }

  if (!/^\d{10,15}$/.test(RESTAURANT.whatsapp)) {

    alert(
      "Restaurant WhatsApp number is not configured yet. " +
      "Please add the real number in script.js."
    );

    return;

  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let message = "Hello The Royal Taste! I would like to place an order:\n\n";

  cart.forEach(item => {

    message +=
      `${item.name} × ${item.quantity} = Rs. ${item.price * item.quantity}\n`;

  });

  message += `\nTotal: Rs. ${total}\n`;

  message += "\nPlease confirm availability, delivery charges and payment details.";

  const whatsappURL =
    "https://wa.me/" +
    RESTAURANT.whatsapp +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank", "noopener,noreferrer");

}

document.getElementById("whatsappOrder")
  .addEventListener("click", sendWhatsAppOrder);

// ==================================
// 10. FLOATING WHATSAPP BUTTON
// ==================================

document.getElementById("whatsappFloat")
  .addEventListener("click", event => {

    event.preventDefault();

    if (!/^\d{10,15}$/.test(RESTAURANT.whatsapp)) {

      alert("Please configure the restaurant WhatsApp number first.");

      return;

    }

    const url =
      "https://wa.me/" + RESTAURANT.whatsapp +
      "?text=" +
      encodeURIComponent(
        "Hello The Royal Taste! I would like to know more about your menu."
      );

    window.open(url, "_blank", "noopener,noreferrer");

  });

// ==================================
// 11. CONTACT FORM VALIDATION
// ==================================

const contactForm = document.getElementById("contactForm");

const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", event => {

  event.preventDefault();

  if (!contactForm.checkValidity()) {

    contactForm.reportValidity();

    return;

  }

  formFeedback.textContent =
    "Your details are valid! This demo does not send messages yet. Connect a form service to receive them.";

  formFeedback.style.color = "#247344";

  contactForm.reset();

});

// ==================================
// 12. MOBILE NAVIGATION
// ==================================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";

});

// Close navigation after selecting a link.

navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation");

    menuToggle.textContent = "☰";

  });

});

// ==================================
// 13. GOOGLE MAPS DIRECTIONS
// ==================================

const directionsLink = document.getElementById("directionsLink");

directionsLink.addEventListener("click", event => {

  if (!RESTAURANT.googleMapsUrl) {

    event.preventDefault();

    alert("Please add the real Google Maps directions link in script.js.");

    return;

  }

  if (!/^https:\/\/(www\.)?google\.[a-z.]+\/maps\//i.test(
    RESTAURANT.googleMapsUrl
  )) {

    event.preventDefault();

    alert("Please enter a valid Google Maps link.");

    return;

  }

  event.preventDefault();

  window.open(
    RESTAURANT.googleMapsUrl,
    "_blank",
    "noopener,noreferrer"
  );

});

// ==================================
// 14. AUTOMATIC COPYRIGHT YEAR
// ==================================

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// ==================================
// 15. INITIAL CART DISPLAY
// ==================================

displayCart();