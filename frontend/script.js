// ---------- Splash Screen Handling ----------
const splash = document.getElementById("splash");

function hideSplash() {
  if (!splash) return;
  splash.style.opacity = "0";
  setTimeout(() => {
    splash.classList.add("hidden");
    splash.style.display = "none";
  }, 610);
}


if (splash) {
  splash.addEventListener("click", hideSplash);
}


const API_BASE_URL = "http://localhost:5000";

const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");
const skillFilter = document.getElementById("skillFilter");
const locationFilter = document.getElementById("locationFilter");
const memberGrid = document.getElementById("memberGrid");
const statusMessage = document.getElementById("statusMessage");
const themeToggle = document.getElementById("themeToggle");
const themeThumb = document.getElementById("themeThumb");
const themeLabel = document.getElementById("themeLabel");

let allMembers = [];
let filteredMembers = [];


function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeThumb.textContent = "🌙";
    themeLabel.textContent = "Dark mode";
  } else {
    document.body.classList.remove("dark");
    themeThumb.textContent = "☀️";
    themeLabel.textContent = "Light mode";
  }
  localStorage.setItem("gdgc-theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("gdgc-theme");
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";
    applyTheme(newTheme);
  });
}

// ---------- Data Fetching ----------
async function getMembers() {
  try {
    if (statusMessage) {
      statusMessage.style.display = "block";
      statusMessage.innerHTML =
        "<strong>Loading members...</strong> Fetching data from the GDGC API.";
    }

    const minWait = new Promise((resolve) => setTimeout(resolve, 800));
    const [res] = await Promise.all([
      fetch(`${API_BASE_URL}/members`),
      minWait,
    ]);

    if (!res.ok) throw new Error("Failed to fetch members");

    const data = await res.json();
    allMembers = data;
    filteredMembers = data.slice();

    makeFilterOptions(data);
    renderMembers(filteredMembers);
  } catch (err) {
    console.error("Data load failed:", err);
    if (statusMessage) {
      statusMessage.style.display = "block";
      statusMessage.innerHTML =
        "<strong>Connection issue.</strong> Couldn't reach the member database.";
    }
    if (memberGrid) {
      memberGrid.style.display = "none";
    }
  } finally {
    setTimeout(() => {
    hideSplash();
  }, 2500);
  }
}


function makeFilterOptions(members) {
  const roles = new Set();
  const skills = new Set();
  const locations = new Set();

  members.forEach((m) => {
    if (m.role) roles.add(m.role);
    (m.skills || []).forEach((s) => skills.add(s));
    if (m.location) locations.add(m.location);
  });

  function fillSelect(selectEl, values, label) {
    if (!selectEl) return;
    selectEl.innerHTML = `<option value="">${label}: All</option>`;
    Array.from(values)
      .sort()
      .forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        selectEl.appendChild(opt);
      });
  }

  fillSelect(roleFilter, roles, "Role");
  fillSelect(skillFilter, skills, "Skill");
  fillSelect(locationFilter, locations, "Location");
}


function renderMembers(members) {
  if (!memberGrid || !statusMessage) return;

  memberGrid.innerHTML = "";

  if (!members.length) {
    statusMessage.style.display = "block";
    statusMessage.innerHTML =
      "<strong>No members found in search.</strong> Try without any filters.";
    memberGrid.style.display = "none";
    return;
  }

  memberGrid.style.display = "grid";
  statusMessage.style.display = "none";

  members.forEach((m) => {
  const card = document.createElement("article");
  card.className = "member-card";

  const name = m.name || "Member";
  const fallbackPhoto =
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(name) +
    "&background=111827&color=ffffff";
  const photo = m.photo || fallbackPhoto;

  card.innerHTML = `
    <div class="card-header">
      <div class="avatar-wrap">
        <img src="${photo}" alt="${name}"
             onerror="this.onerror=null;this.src='${fallbackPhoto}';" />
        <span class="status-dot"></span>
      </div>
      <div class="card-main">
        <div class="name-row">
          <h2>${name}</h2>
          <span class="role-pill">${m.role || "Member"}</span>
        </div>
        <div class="location">
          📍 <span>${m.location || "Unknown"}</span>
        </div>
        <div class="skills">
          ${(m.skills || [])
            .map((s) => `<span class="skill-chip">${s}</span>`)
            .join("")}
        </div>
      </div>
    </div>
    <p class="bio">${m.bio || ""}</p>
    <div class="card-footer">
      <span class="tag">#GDGC Member</span>
      <span>ID: ${m.id ?? "N/A"}</span>
    </div>
  `;
  memberGrid.appendChild(card);
});
}

function applyFilter() {
  const query = (searchInput?.value || "").toLowerCase().trim();
  const roleVal = roleFilter?.value || "";
  const skillVal = skillFilter?.value || "";
  const locationVal = locationFilter?.value || "";

  filteredMembers = allMembers.filter((m) => {
    const name = (m.name || "").toLowerCase();
    const bio = (m.bio || "").toLowerCase();

    const matchesSearch =
      !query || name.includes(query) || bio.includes(query);

    const matchesRole = !roleVal || m.role === roleVal;
    const matchesLocation = !locationVal || m.location === locationVal;
    const matchesSkill =
      !skillVal || (m.skills || []).some((s) => s === skillVal);

    return (
      matchesSearch && matchesRole && matchesLocation && matchesSkill
    );
  });

  renderMembers(filteredMembers);
}


if (searchInput) searchInput.addEventListener("input", applyFilter);
if (roleFilter) roleFilter.addEventListener("change", applyFilter);
if (skillFilter) skillFilter.addEventListener("change", applyFilter);
if (locationFilter) locationFilter.addEventListener("change", applyFilter);


initTheme();
getMembers();
