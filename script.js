let rooms = [
  {
    serial: 1,
    location: "रामपुर, पटना",
    rent: 5000,
    type: "Single Room",
    photo: ""
  },
  {
    serial: 2,
    location: "राम रतन हॉस्पिटल, पटना",
    rent: 6000,
    type: "Family Room",
    photo: ""
  }
];

// पहले से पोस्ट किए कमरे लोड करें
const savedRooms = JSON.parse(
  localStorage.getItem("patnaRooms") || "[]"
);

rooms = [...rooms, ...savedRooms];

const roomList = document.getElementById("room-list");
const form = document.getElementById("room-form");

function showRooms() {
  roomList.innerHTML = "";

  rooms.forEach(room => {
    const card = document.createElement("div");
    card.className = "profile";

    const heading = document.createElement("h3");
    heading.textContent = "कमरा नंबर: " + room.serial;
    card.appendChild(heading);

    if (room.photo) {
      const img = document.createElement("img");
      img.src = room.photo;
      img.style.width = "200px";
      img.style.height = "140px";
      img.style.objectFit = "cover";
      card.appendChild(img);
    }

    const details = document.createElement("p");
    details.textContent =
      "स्थान: " + room.location +
      " | किराया: ₹" + room.rent +
      " | प्रकार: " + room.type;

    card.appendChild(details);

    const button = document.createElement("button");
    button.textContent = "संपर्क करें";
    button.onclick = () => {
      window.location.href = "tel:9204197497";
    };

    card.appendChild(button);
    const whatsapp = document.createElement("button");
whatsapp.textContent = "WhatsApp पर संपर्क करें";

whatsapp.onclick = () => {
  const message = encodeURIComponent(
    "नमस्ते Vicky जी, मुझे कमरा नंबर " + room.serial + " के बारे में जानकारी चाहिए।"
  );

  window.open(
    "https://wa.me/919204197497?text=" + message,
    "_blank"
  );
};

card.appendChild(whatsapp);
    roomList.appendChild(card);
  });
}

// नया कमरा पोस्ट करें
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const location = document.getElementById("location").value;
  const rent = document.getElementById("rent").value;
  const type = document.getElementById("room-type").value;
  const file = document.getElementById("room-photo").files[0];

  if (!file || !file.type.startsWith("image/")) {
    alert("कृपया कमरे की सही फोटो चुनें।");
    return;
  }

  if (file.size > 1024 * 1024) {
    alert("फोटो 1 MB से छोटी रखें।");
    return;
  }

  const reader = new FileReader();

  reader.onload = function() {
    const newRoom = {
      serial: rooms.length + 1,
      location: location,
      rent: Number(rent),
      type: type,
      photo: reader.result
    };

    rooms.push(newRoom);

    const newSavedRooms = [
      ...savedRooms,
      newRoom
    ];

    try {
      localStorage.setItem(
        "patnaRooms",
        JSON.stringify(newSavedRooms)
      );

      savedRooms.push(newRoom);
      showRooms();
      form.reset();

      alert("आपका कमरा सफलतापूर्वक पोस्ट हो गया!");
    } catch (error) {
      rooms.pop();
      alert("स्टोरेज भर गया है। छोटी फोटो इस्तेमाल करें।");
    }
  };

  reader.readAsDataURL(file);
});

showRooms();
const ownerLogin = document.getElementById("owner-login");
const adminPanel = document.querySelector(".admin-panel:not(#owner-login)");

adminPanel.style.display = "none";

document.getElementById("login-form")
.addEventListener("submit", function(event) {
  event.preventDefault();

  const pin = document.getElementById("owner-pin").value;

  if (pin === "2468") {
    ownerLogin.style.display = "none";
    adminPanel.style.display = "block";
    alert("Welcome Vicky Kumar!");
  } else {
    document.getElementById("login-message")
      .textContent = "गलत PIN! दोबारा कोशिश करें।";
  }
});