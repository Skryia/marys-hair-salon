/* =========================================================
   Mary's Hair Salon — static site JS
   Edit SALON below to update contact details site-wide.
   ========================================================= */

const SALON = {
  // TODO: replace with real phone number (E.164, e.g. +442380000000)
  phone: "+44 0000 000000",
  phoneDisplay: "+44 (0) 0000 000000",

  // WhatsApp uses digits only, no + or spaces
  whatsapp: "447700900000",
  whatsappDisplay: "+44 7700 900000",
  whatsappMessage: "Hi Mary's Hair Salon, I'd like to book an appointment.",

  address: "Shirley Road, Southampton, United Kingdom",
  instagram: "https://www.instagram.com/marys_hair_salon__/",
  facebook: "https://www.facebook.com/MandMsouthampton/",

  hours: [
    ["Monday",    "9:00 – 19:00", { open: 9,   close: 19 }],
    ["Tuesday",   "9:00 – 19:00", { open: 9,   close: 19 }],
    ["Wednesday", "9:00 – 19:00", { open: 9,   close: 19 }],
    ["Thursday",  "9:00 – 19:00", { open: 9,   close: 19 }],
    ["Friday",    "9:00 – 19:00", { open: 9,   close: 19 }],
    ["Saturday",  "8:30 – 18:30", { open: 8.5, close: 18.5 }],
    ["Sunday",    "10:00 – 17:00",{ open: 10,  close: 17 }],
  ],
};

/* ---------- Services (edit to adjust menu / prices) ---------- */
const SERVICES = [
  { icon: "✂",  name: "Ladies Cut & Finish",     price: "£35",       desc: "Precision cut with a polished blow-dry finish." },
  { icon: "❦",  name: "Wash, Cut & Blow Dry",    price: "£40",       desc: "Full cleanse, tailored cut and styled blow-dry." },
  { icon: "❋",  name: "Hair Colouring",          price: "From £55",  desc: "Rich, long-lasting colour to suit your style." },
  { icon: "✧",  name: "Highlights",              price: "From £65",  desc: "Hand-placed highlights for dimension and glow." },
  { icon: "☀",  name: "Balayage",                price: "From £85",  desc: "Sun-kissed, freehand painted colour." },
  { icon: "♥",  name: "Hair Treatment",          price: "£25",       desc: "Nourishing salon-grade repair treatment." },
  { icon: "✦",  name: "Human Hair Extensions",   price: "From £150", desc: "100% real hair, professionally fitted." },
  { icon: "❉",  name: "Extension Colour Matching", price: "£35",     desc: "Bespoke colour blending to your natural shade." },
  { icon: "♛",  name: "Bridal Hair Styling",     price: "From £95",  desc: "Elegant looks for your special day." },
  { icon: "✽",  name: "Hair Consultation",       price: "Free",      desc: "Sit down with a stylist to plan your look." },
];

/* ---------- Gallery (REPLACE files in /images/gallery to swap) ---------- */
const GALLERY = [
  { src: "images/gallery/m1.jpg", alt: "Intricate freestyle cornrow pattern" },
  { src: "images/gallery/m2.jpg", alt: "Long platinum blonde box braids" },
  { src: "images/gallery/m3.jpg", alt: "Neat side-swept cornrows with length" },
  { src: "images/gallery/m4.jpg", alt: "Chunky black twist braids" },
  { src: "images/gallery/m5.jpg", alt: "Sculpted quiff with tapered fade" },
  { src: "images/gallery/m6.jpg", alt: "Straight-back stitch cornrows" },
  { src: "images/gallery/m7.jpg", alt: "Locs styled into a high ponytail" },
  { src: "images/gallery/m8.jpg", alt: "Bleached blonde natural curls" },
  { src: "images/gallery/m9.jpg", alt: "Glossy caramel highlighted curls" },
];

/* Wire up */
function tel(n)  { return "tel:" + n.replace(/\s+/g, ""); }
function wa()    {
  const msg = encodeURIComponent(SALON.whatsappMessage);
  return `https://wa.me/${SALON.whatsapp}?text=${msg}`;
}

document.querySelectorAll("[data-call]").forEach(a => {
  a.setAttribute("href", tel(SALON.phone));
});
document.querySelectorAll("[data-whatsapp]").forEach(a => {
  a.setAttribute("href", wa());
  a.setAttribute("target", "_blank");
  a.setAttribute("rel", "noopener");
});

const phoneLink = document.getElementById("phoneLink");
if (phoneLink) phoneLink.textContent = SALON.phoneDisplay;
const waLink = document.getElementById("waLink");
if (waLink) waLink.textContent = SALON.whatsappDisplay;
const addressText = document.getElementById("addressText");
if (addressText) addressText.textContent = SALON.address;

const hoursTable = document.getElementById("hoursTable");
if (hoursTable) {
  hoursTable.innerHTML = SALON.hours
    .map(([d, h]) => `<tr><td>${d}</td><td>${h}</td></tr>`)
    .join("");
}
const footerHours = document.getElementById("footerHours");
if (footerHours) {
  footerHours.innerHTML = SALON.hours
    .map(([d, h]) => `<li><span>${d.slice(0, 3)}</span><span>${h}</span></li>`)
    .join("");
}

const todayHours = document.getElementById("todayHours");
if (todayHours) {
  const idx = (new Date().getDay() + 6) % 7;
  todayHours.textContent = SALON.hours[idx][1];
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const servicesGrid = document.getElementById("servicesGrid");
if (servicesGrid) {
  servicesGrid.innerHTML = SERVICES.map(s => `
    <article class="service reveal">
      <div class="service__icon" aria-hidden="true">${s.icon}</div>
      <div class="service__head">
        <h3 class="service__name">${s.name}</h3>
        <span class="service__price">${s.price}</span>
      </div>
      <p class="service__desc">${s.desc}</p>
    </article>
  `).join("");
}

const galleryEl = document.getElementById("galleryGrid");
if (galleryEl) {
  galleryEl.innerHTML = GALLERY.map((g, i) => `
    <button class="gallery__item reveal" data-index="${i}" aria-label="Open image ${i + 1}">
      <img src="${g.src}" alt="${g.alt}" loading="lazy" />
    </button>
  `).join("");
}

/* Lightbox */
const lightbox = document.getElementById("lightbox");
const lbImg    = lightbox && lightbox.querySelector(".lightbox__img");
let lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  lbImg.src = GALLERY[lbIndex].src;
  lbImg.alt = GALLERY[lbIndex].alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function step(delta) {
  lbIndex = (lbIndex + delta + GALLERY.length) % GALLERY.length;
  lbImg.src = GALLERY[lbIndex].src;
  lbImg.alt = GALLERY[lbIndex].alt;
}

if (galleryEl && lightbox) {
  galleryEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery__item");
    if (!btn) return;
    openLightbox(Number(btn.dataset.index));
  });
  lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", () => step(-1));
  lightbox.querySelector(".lightbox__nav--next").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  let touchX = null;
  lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  });
}

/* Mobile nav */
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));