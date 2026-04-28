let reviews = [];
let index = 0;

fetch('./reviews.json')
  .then(res => {
    if (!res.ok) throw new Error("reviews.json não encontrado");
    return res.json();
  })
  .then(data => {
    reviews = data;
    showReview();
  })
  .catch(err => {
    document.getElementById('review-box').innerHTML =
      "<p>Erro ao carregar avaliações</p>";
    console.error(err);
  });

function showReview() {
  const r = reviews[index];

  document.getElementById('review-box').innerHTML = `
    <div>
      <h2>${'⭐'.repeat(r.rating)}</h2>
      <p>"${r.texto}"</p>
      <strong>— ${r.nome}</strong>
    </div>
  `;
}

document.getElementById('nextBtn').onclick = () => {
  index = (index + 1) % reviews.length;
  showReview();
};

document.getElementById('prevBtn').onclick = () => {
  index = (index - 1 + reviews.length) % reviews.length;
  showReview();
};

function checkOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  let openHour = 7;
  let closeHour = (day === 0) ? 13 : 19;

  let isOpen = hour >= openHour && hour < closeHour;

  const dot = document.getElementById('status-dot');
  const text = document.getElementById('status-text');

  if (isOpen) {
    dot.style.background = "#16a34a";
    text.textContent = `Aberto agora • Fecha às ${closeHour}:00`;
    text.className = "open";
  } else {
    dot.style.background = "#dc2626";

    let nextOpen = (hour < 7) ? "07:00" : "07:00 amanhã";

    text.textContent = `Fechado agora • Abre às ${nextOpen}`;
    text.className = "closed";
  }
}

checkOpenStatus();
setInterval(checkOpenStatus, 60000);
