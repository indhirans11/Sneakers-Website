// ---------- Your shoes (edit names, prices and details here) ----------
const shoes = [
    { id: "s01", name: "Gucci Ace White",        category: "Classics", price: 899, desc: "A clean white court sneaker with a gold eyelet and a warm gum sole.", features: ["Smooth leather finish", "Gold eyelet detail", "Gum rubber sole"] },
    { id: "s02", name: "Bacca Bucci BB Street",  category: "Street",   price: 949, desc: "A high-top built for the street, with tan and brown panels.", features: ["High-top ankle support", "Two-tone panels", "Thick grip sole"] },
    { id: "s03", name: "Armani Trail Brown",     category: "Casual",   price: 799, desc: "Breathable mesh and soft suede-feel brown for all-day wear.", features: ["Breathable mesh sides", "Light white sole", "Metal eyelets"] },
    { id: "s04", name: "Campus Cloud",           category: "Sports",   price: 699, desc: "A chunky trainer with a soft, wavy sole made for comfort.", features: ["Cushioned wave sole", "Colour-block upper", "Easy-fit laces"] },
    { id: "s05", name: "Jordan 1 Court Purple",  category: "Limited",  price: 999, desc: "The classic high-top in purple, black and cream. A collector favourite.", features: ["Premium leather", "High-top fit", "Iconic colour mix"] },
    { id: "s06", name: "Prada Terra",            category: "Street",   price: 969, desc: "A thick-soled sneaker in earthy tan with a rugged, sculpted sole.", features: ["Chunky sculpted sole", "Soft leather feel", "Pull-tab heel"] },
    { id: "s07", name: "Balenciaga Airwave",     category: "Limited",  price: 989, desc: "An all-white runner with a bold, bubbly sole that looks like it floats.", features: ["Oversized cloud sole", "Textured knit upper", "Lightweight feel"] },
    { id: "s08", name: "Hugo Boss Slate",        category: "Casual",   price: 729, desc: "A grey suede-look sneaker with navy laces and a clean white sole.", features: ["Perforated side panel", "Navy contrast laces", "Flat court sole"] },
    { id: "s09", name: "Redtape Lion Court",     category: "Classics", price: 759, desc: "Cream leather with teal details and a soft, foam-style sole.", features: ["Teal accent trim", "Cushioned foam sole", "Gum rubber outsole"] },
    { id: "s10", name: "Versace Duo",            category: "Street",   price: 849, desc: "Black and grey panels with white laces, sold as a matching pair.", features: ["Bold colour-block", "White contrast laces", "Flat grip sole"] },
    { id: "s11", name: "Campus Peak Mid",        category: "Street",   price: 879, desc: "A mid-top with brown overlays, cream mesh and a chunky sole.", features: ["Mid-top support", "Mesh and leather mix", "Heel pull loop"] },
    { id: "s12", name: "Nike Air Force Amber",   category: "Classics", price: 929, desc: "The Air Force look in white and grey with an amber swoosh.", features: ["Amber swoosh", "Air-style sole", "Teal tongue detail"] },
    { id: "s13", name: "Levi's x Air Force Denim", category: "Limited", price: 979, desc: "Soft washed denim in light blue on the classic low-top shape.", features: ["Washed denim upper", "Red tab detail", "White rubber sole"] },
    { id: "s14", name: "Dior Sand Low",          category: "Casual",   price: 819, desc: "A minimal sand-coloured low-top that goes with everything.", features: ["Soft suede finish", "Slim low profile", "White cupsole"] },
    { id: "s15", name: "Polo Navy Court",        category: "Classics", price: 889, desc: "Navy leather with tan heel tabs and the signature pony logo.", features: ["Navy leather upper", "Tan heel tab", "Clean white sole"] },
    { id: "s16", name: "Adidas Forum Low",       category: "Classics", price: 919, desc: "Cream and black with the three stripes and a bold toe cap.", features: ["Three-stripe design", "Black toe cap", "Padded collar"] },
    { id: "s17", name: "Nike SB Dunk Denim",     category: "Limited",  price: 995, desc: "A grey denim-look high-top with a gum sole and red lining.", features: ["Denim-look upper", "Gum rubber sole", "Padded high-top"] }
];

// ---------- Build the product grid ----------
const list = document.getElementById("product-list");
list.innerHTML = shoes.map(s => `
    <div class="product" data-shoe="${s.id}" tabindex="0" role="button" aria-label="View ${s.name} details">
        <img src="images/${s.id}.jpg" alt="${s.name}" loading="lazy">
        <div class="pinfo"><b>${s.name}</b><span>${s.price} rs</span></div>
    </div>`).join("");

// ---------- Pop-up ----------
const modal = document.getElementById("modal");
const stage = document.getElementById("stage");
const mImg = document.getElementById("m-img");
const sizesBox = document.getElementById("m-sizes");
const msg = document.getElementById("m-msg");
const addBtn = document.getElementById("m-add");
const cartLink = document.getElementById("cart");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let selectedSize = null;
let cartCount = 0;
let lastClicked = null;
let cartItems = [];
let currentshoe = null;

function openShoe(el) {
    const shoe = shoes.find(s => s.id === el.dataset.shoe);
    currentshoe = shoe;
    const cardImg = el.querySelector("img");
    lastClicked = el;


    mImg.src = "images/" + shoe.id + ".jpg";   // pop-up always uses the full photo
    mImg.alt = shoe.name;
    document.getElementById("m-cat").textContent = shoe.category;
    document.getElementById("m-name").textContent = shoe.name;
    document.getElementById("m-price").textContent = shoe.price + " rs";
    document.getElementById("m-desc").textContent = shoe.desc;
    document.getElementById("m-features").innerHTML = shoe.features.map(f => "<li>" + f + "</li>").join("");

    selectedSize = null;
    msg.textContent = "";
    addBtn.textContent = "Add to cart";
    sizesBox.innerHTML = [6, 7, 8, 9, 10].map(n => "<button>" + n + "</button>").join("");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.getElementById("m-close").focus();
    if (!reduceMotion) flyOut(cardImg);
}

// The shoe flies from its card to the centre while spinning in 3D
function flyOut(cardImg) {
    const start = cardImg.getBoundingClientRect();
    const go = () => {
        const end = mImg.getBoundingClientRect();
        const dx = (start.left + start.width / 2) - (end.left + end.width / 2);
        const dy = (start.top + start.height / 2) - (end.top + end.height / 2);
        const scale = Math.min(start.width / end.width, 1.5);
        mImg.animate([
            { transform: `translate(${dx}px, ${dy}px) scale(${scale}) rotateY(-200deg)` },
            { transform: "translate(0, 0) scale(1) rotateY(0deg)" }
        ], { duration: 800, easing: "cubic-bezier(0.2, 0.9, 0.25, 1.05)" });
    };
    mImg.decode().then(go).catch(go);
}

function closeShoe() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (lastClicked) lastClicked.focus();
}

document.getElementById("m-close").addEventListener("click", closeShoe);
modal.addEventListener("click", e => { if (e.target === modal) closeShoe(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeShoe(); });

// one listener handles every shoe, including the cards built above
document.addEventListener("click", e => {
    const el = e.target.closest("[data-shoe]");
    if (el) openShoe(el);
});
document.addEventListener("keydown", e => {
    const el = e.target.closest && e.target.closest("[data-shoe]");
    if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openShoe(el); }
});

// 3D tilt inside the pop-up
stage.addEventListener("pointermove", e => {
    const r = stage.getBoundingClientRect();
    mImg.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 30 + "deg");
    mImg.style.setProperty("--rx", -((e.clientY - r.top) / r.height - 0.5) * 20 + "deg");
});
stage.addEventListener("pointerleave", () => {
    mImg.style.setProperty("--ry", "0deg");
    mImg.style.setProperty("--rx", "0deg");
});

sizesBox.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    sizesBox.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
    e.target.classList.add("selected");
    selectedSize = e.target.textContent;
    msg.textContent = "";
});

addBtn.addEventListener("click", () => {
    if (!selectedSize) { msg.textContent = "Choose a size first."; return; }
    cartCount++;
    cartLink.textContent = "Cart(" + cartCount + ")";
    addBtn.textContent = "Added to cart";
});

cartLink.addEventListener("click", (e) =>{
    e.preventDefault();
    if (cartCount === 0) {
        alert("your cart is empty.");
    } else {
        alert("ou have" + cartCount + " item(s) in your cart.");
    }
});

// ---------- 3D floating cubes in the background ----------
const scene = document.getElementById("scene");
const cubes = [
    // left%, top%, size px, spin seconds, bob seconds, dark?
    [6, 12, 70, 22, 6, false], [88, 8, 110, 30, 8, false], [78, 38, 50, 18, 5, true],
    [12, 46, 100, 26, 7, false], [92, 62, 70, 20, 6, false], [4, 78, 60, 24, 9, true],
    [50, 70, 90, 28, 8, false], [30, 90, 55, 18, 5, false], [68, 92, 80, 25, 7, true]
];
scene.innerHTML = cubes.map(([l, t, s, d, b, dark]) => `
    <div class="bob" style="left:${l}%;top:${t}%;--bd:${b}s">
        <div class="cube ${dark ? "dark" : ""}" style="--s:${s}px;--d:${d}s"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    </div>`).join("");

if (!reduceMotion) {
    // the cubes lean toward the mouse and drift as you scroll
    window.addEventListener("pointermove", e => {
        scene.style.setProperty("--mx", (e.clientX / innerWidth - 0.5) * 14 + "deg");
        scene.style.setProperty("--my", -(e.clientY / innerHeight - 0.5) * 10 + "deg");
    });
    window.addEventListener("scroll", () => {
        scene.style.setProperty("--sy", -(window.scrollY * 0.15) + "px");
    }, { passive: true });
}
