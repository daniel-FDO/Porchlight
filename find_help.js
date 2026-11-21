document.addEventListener("DOMContentLoaded", () => {
  const services = {
    canterbury: [
      {
        name: "Canterbury Food Bank",
        type: "Food Bank",
        postcode: "CT1 2CC",
        lat: 51.2798,
        lng: 1.0830,
        distance: "Canterbury",
        status: "Closed",
        hours: "Opens at 10am · Mon–Fri"
      },
      {
        name: "Salvation Army Canterbury",
        type: "Food Bank + Shower",
        postcode: "CT1 3DD",
        lat: 51.2802,
        lng: 1.0785,
        distance: "Canterbury",
        status: "Open now",
        hours: "Open until 4pm · Mon–Sat"
      },
      {
        name: "Canterbury Night Shelter",
        type: "Shelter",
        postcode: "CT1 1YW",
        lat: 51.2815,
        lng: 1.0750,
        distance: "Canterbury",
        status: "Open now",
        hours: "24/7 emergency access"
      },
      {
        name: "Kent Wellbeing Hub",
        type: "Mental Health",
        postcode: "CT1 2BD",
        lat: 51.2778,
        lng: 1.0875,
        distance: "Canterbury",
        status: "Open now",
        hours: "Open until 5pm · Mon–Fri"
      }
    ],

    dover: [
      {
        name: "Dover Shelter Centre",
        type: "Shelter",
        postcode: "CT16 1AA",
        lat: 51.1290,
        lng: 1.3080,
        distance: "Dover",
        status: "Open now",
        hours: "24/7 emergency access"
      },
      {
        name: "Dover Food Bank",
        type: "Food Bank",
        postcode: "CT16 2BB",
        lat: 51.1245,
        lng: 1.3135,
        distance: "Dover",
        status: "Closed",
        hours: "Opens at 9am · Mon–Fri"
      },
      {
        name: "Dover Outreach Showers",
        type: "Shower",
        postcode: "CT17 9BZ",
        lat: 51.1272,
        lng: 1.3110,
        distance: "Dover",
        status: "Open now",
        hours: "Open until 3pm · Tue–Sat"
      },
      {
        name: "Dover Mental Health Support Point",
        type: "Mental Health",
        postcode: "CT16 1DH",
        lat: 51.1310,
        lng: 1.3060,
        distance: "Dover",
        status: "Open now",
        hours: "Open until 5pm · Mon–Fri"
      }
    ],

    folkestone: [
      {
        name: "Rainbow Food Bank",
        type: "Food Bank",
        postcode: "CT20 2AF",
        lat: 51.0813,
        lng: 1.1794,
        distance: "Folkestone",
        status: "Open now",
        hours: "Open until 2pm · Wed–Sat"
      },
      {
        name: "Folkestone Safe Shelter",
        type: "Shelter",
        postcode: "CT20 1QJ",
        lat: 51.0798,
        lng: 1.1825,
        distance: "Folkestone",
        status: "Open now",
        hours: "24/7 emergency access"
      },
      {
        name: "Community Shower Point",
        type: "Shower",
        postcode: "CT20 1SD",
        lat: 51.0785,
        lng: 1.1758,
        distance: "Folkestone",
        status: "Closed",
        hours: "Opens at 8am · Mon–Fri"
      }

    ],

    deal: [
      {
        name: "Deal Food Bank",
        type: "Food Bank",
        postcode: "CT14 6PY",
        lat: 51.2236,
        lng: 1.4015,
        distance: "Deal",
        status: "Open now",
        hours: "Open until 2pm · Tue–Fri"
      },
      {
        name: "Deal Salvation Army Support",
        type: "Food Bank",
        postcode: "CT14 7QH",
        lat: 51.2229,
        lng: 1.3990,
        distance: "Deal",
        status: "Closed",
        hours: "Opens at 9am · Mon–Fri"
      },
      {
        name: "Deal Community Outreach",
        type: "Mental Health",
        postcode: "CT14 9HG",
        lat: 51.2250,
        lng: 1.4050,
        distance: "Deal",
        status: "Open now",
        hours: "Open until 5pm · Mon–Fri"
      },
      {
        name: "Deal Homeless Support Hub",
        type: "Shelter",
        postcode: "CT14 6JA",
        lat: 51.2215,
        lng: 1.3975,
        distance: "Deal",
        status: "Open now",
        hours: "24/7 emergency support"
      },
      {
        name: "Deal Community Shower Point",
        type: "Shower",
        postcode: "CT14 6HY",
        lat: 51.2240,
        lng: 1.4035,
        distance: "Deal",
        status: "Closed",
        hours: "Opens at 8am · Mon–Sat"
      }
    ]
  };

  const btn = document.getElementById("helpSearchBtn");
  const inputEl = document.getElementById("helpLocationInput");
  const resultsDiv = document.getElementById("helpResults");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const categoryBtns = document.querySelectorAll(".chip");

  let activeTown = "canterbury";
  let activeFilter = "all";
  let activeCategory = null;
  let markers = [];

  const map = L.map("map").setView([51.2798, 1.0830], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  function getStatusClass(status) {
    return status.toLowerCase().includes("open") ? "status-open" : "status-closed";
  }

  function getTypeEmoji(type) {
    if (type.includes("Shelter")) return "🏠";
    if (type.includes("Food Bank")) return "🍲";
    if (type.includes("Shower")) return "🚿";
    if (type.includes("Mental Health")) return "🧠";
    return "📍";
  }

  function getMarkerColor(type) {
    if (type.includes("Shelter")) return "red";
    if (type.includes("Food Bank")) return "orange";
    if (type.includes("Shower")) return "blue";
    if (type.includes("Mental Health")) return "green";
    return "violet";
  }

  function createColoredIcon(color) {
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }

  function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
  }

  function addMarkers(list) {
    clearMarkers();
    if (!list.length) return;

    const bounds = [];

    list.forEach(place => {
      const markerColor = getMarkerColor(place.type);
      const markerIcon = createColoredIcon(markerColor);

      const marker = L.marker([place.lat, place.lng], { icon: markerIcon }).addTo(map)
        .bindPopup(`
          <strong>${getTypeEmoji(place.type)} ${place.name}</strong><br>
          ${place.type}<br>
          ${place.postcode}<br>
          ${place.hours}
        `);

      markers.push(marker);
      bounds.push([place.lat, place.lng]);
    });

    map.fitBounds(bounds, { padding: [40, 40] });
  }

  function renderList(list) {
    resultsDiv.innerHTML = "";

    if (!list.length) {
      resultsDiv.innerHTML = `<p class="no-results">No services found for this filter.</p>`;
      return;
    }

    list.forEach((place, index) => {
      const card = document.createElement("div");
      card.className = "service-card";

          card.classList.add(
      place.type.includes("Shelter") ? "card-shelter" :
      place.type.includes("Food Bank") ? "card-food" :
      place.type.includes("Shower") ? "card-shower" :
      place.type.includes("Mental Health") ? "card-mental" :
      ""
    );

      card.innerHTML = `
        <div class="service-status ${getStatusClass(place.status)}">${place.status}</div>
        <h3>${place.name}</h3>
        <p class="service-meta">${getTypeEmoji(place.type)} ${place.distance} · ${place.type}</p>
        <p class="service-hours">⏰ ${place.hours}</p>
        <a href="https://www.google.com/maps?q=${place.lat},${place.lng}" 
        target="_blank" 
        class="map-link"
        >
        📍 Open in Google Maps
        </a>
      `;

      card.addEventListener("click", () => {
        map.setView([place.lat, place.lng], 15);
        if (markers[index]) markers[index].openPopup();
      });

      resultsDiv.appendChild(card);
    });
  }

  function applyFilters() {
    let list = services[activeTown] || [];

    if (activeFilter === "open") {
      list = list.filter(place => place.status.toLowerCase().includes("open"));
    }

    if (activeCategory) {
      list = list.filter(place => place.type.includes(activeCategory));
    }

    renderList(list);
    addMarkers(list);
  }

  function searchTown() {
    const input = inputEl.value.toLowerCase().trim();

    if (!input) {
      activeTown = "canterbury";
    } else if (services[input]) {
      activeTown = input;
    } else {
      resultsDiv.innerHTML = `<p class="no-results">No services found for "${input}". Try Canterbury, Dover or Folkestone.</p>`;
      clearMarkers();
      return;
    }

    applyFilters();
  }

  btn.addEventListener("click", searchTown);

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchTown();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (activeCategory === btn.dataset.category) {
        activeCategory = null;
        btn.classList.remove("active");
      } else {
        categoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.category;
      }
      applyFilters();
    });
  });

  applyFilters();
});