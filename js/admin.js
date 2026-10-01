document.addEventListener('DOMContentLoaded', () => {
  renderList();
  const form = document.getElementById('houseForm');
  form.addEventListener('submit', handleSubmit);
  document.getElementById('cancelEdit').addEventListener('click', resetForm);
  document.getElementById('resetData').addEventListener('click', () => {
    if (confirm('Ҳамаи маълумотҳои ҷорӣ нест карда шуда, ба ҳолати аслӣ бармегардад. Давом диҳед?')) {
      localStorage.removeItem('aether_houses');
      renderList();
      resetForm();
      alert('Маълумотҳо бозсозӣ шуданд.');
    }
  });
});

function renderList() {
  const houses = getHouses();
  document.getElementById('houseCount').textContent = houses.length;
  const list = document.getElementById('housesList');
  if (houses.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted)">Ҳеҷ хонае нест.</p>';
    return;
  }
  list.innerHTML = houses.map(h => `
    <div class="admin-list-item">
      <img src="${h.image}" alt="${h.title}">
      <div class="admin-list-info">
        <strong>${h.title}</strong>
        <span>${h.area} м² · ${h.rooms} ҳуҷра · ${formatPriceSimple(h.price)} · ${h.status}</span>
      </div>
      <div class="admin-actions">
        <button class="btn-sm btn-edit" onclick="editHouse(${h.id})">Таҳрир</button>
        <button class="btn-sm btn-delete" onclick="deleteHouse(${h.id})">Нест</button>
      </div>
    </div>
  `).join('');
}

function handleSubmit(e) {
  e.preventDefault();
  const houses = getHouses();
  const editId = document.getElementById('editId').value;
  const featuresRaw = document.getElementById('features').value.trim();
  const features = featuresRaw ? featuresRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];

  const house = {
    id: editId ? parseInt(editId) : Date.now(),
    title: document.getElementById('title').value.trim(),
    category: document.getElementById('category').value,
    type: document.getElementById('type').value,
    image: document.getElementById('image').value.trim(),
    area: parseInt(document.getElementById('area').value),
    rooms: parseInt(document.getElementById('rooms').value),
    floors: parseInt(document.getElementById('floors').value),
    price: parseInt(document.getElementById('price').value),
    description: document.getElementById('description').value.trim(),
    features,
    status: document.getElementById('type').value === 'built' ? 'Сохташуда' : 'Лоиҳа'
  };

  if (editId) {
    const idx = houses.findIndex(h => h.id === parseInt(editId));
    if (idx !== -1) houses[idx] = house;
  } else {
    houses.push(house);
  }

  saveHouses(houses);
  renderList();
  resetForm();
  alert(editId ? 'Хона навсозӣ шуд!' : 'Хонаи нав илова шуд!');
}

function editHouse(id) {
  const houses = getHouses();
  const h = houses.find(x => x.id === id);
  if (!h) return;
  document.getElementById('editId').value = h.id;
  document.getElementById('title').value = h.title;
  document.getElementById('category').value = h.category;
  document.getElementById('type').value = h.type;
  document.getElementById('image').value = h.image;
  document.getElementById('area').value = h.area;
  document.getElementById('rooms').value = h.rooms;
  document.getElementById('floors').value = h.floors;
  document.getElementById('price').value = h.price;
  document.getElementById('description').value = h.description;
  document.getElementById('features').value = h.features.join('\n');
  document.getElementById('formTitle').textContent = 'Таҳрири хона';
  document.getElementById('submitBtn').textContent = 'Нигоҳ доштан';
  document.getElementById('cancelEdit').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteHouse(id) {
  if (!confirm('Ин хонаро нест кардан мехоҳед?')) return;
  let houses = getHouses();
  houses = houses.filter(h => h.id !== id);
  saveHouses(houses);
  renderList();
  resetForm();
}

function resetForm() {
  document.getElementById('houseForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('formTitle').textContent = 'Иловаи хонаи нав';
  document.getElementById('submitBtn').textContent = 'Илова кардан';
  document.getElementById('cancelEdit').style.display = 'none';
}

window.editHouse = editHouse;
window.deleteHouse = deleteHouse;
