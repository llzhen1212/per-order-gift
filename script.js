const cardContainer = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const storeFilter = document.getElementById("storeFilter");
const versionFilter = document.getElementById("versionFilter");

function initFilters() {
  const stores = [...new Set(benefits.map(item => item.store))];
  const versions = [...new Set(benefits.map(item => item.version))];

  stores.forEach(store => {
    const option = document.createElement("option");
    option.value = store;
    option.textContent = store;
    storeFilter.appendChild(option);
  });

  versions.forEach(version => {
    const option = document.createElement("option");
    option.value = version;
    option.textContent = version;
    versionFilter.appendChild(option);
  });
}

function renderCards(list) {
  cardContainer.innerHTML = "";

  if (list.length === 0) {
    cardContainer.innerHTML = `<p>找不到符合條件的特典。</p>`;
    return;
  }

  list.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.group} ${item.album} ${item.store} 特典圖">

      <div class="card-body">
        <h2>${item.group}</h2>

        <div class="info">
          <div>專輯：${item.album}</div>
          <div>版本：${item.version}</div>
          <div>通路：${item.store}</div>
        </div>

        <span class="tag">${item.type}</span>

        <p class="note">${item.note}</p>

        <a href="${item.link}" target="_blank">前往通路</a>
      </div>
    `;

    cardContainer.appendChild(card);
  });
}

function filterCards() {
  const keyword = searchInput.value.toLowerCase();
  const selectedStore = storeFilter.value;
  const selectedVersion = versionFilter.value;

  const filtered = benefits.filter(item => {
    const text = `
      ${item.group}
      ${item.album}
      ${item.version}
      ${item.store}
      ${item.type}
      ${item.note}
    `.toLowerCase();

    const matchKeyword = text.includes(keyword);
    const matchStore = selectedStore === "" || item.store === selectedStore;
    const matchVersion = selectedVersion === "" || item.version === selectedVersion;

    return matchKeyword && matchStore && matchVersion;
  });

  renderCards(filtered);
}

searchInput.addEventListener("input", filterCards);
storeFilter.addEventListener("change", filterCards);
versionFilter.addEventListener("change", filterCards);

initFilters();
renderCards(benefits);
