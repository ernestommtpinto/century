const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("show");
    });
}

/* LIGHTBOX IMÓVEIS */

let currentCasa = 1;
let currentPhoto = 0;
const totalPhotos = 21;

function getPhotoPath(casa, photo) {
    if (photo === 0) {
        return `assets/casa${casa}foto.jpg`;
    }

    return `assets/casa${casa}foto${photo}.jpg`;
}

function openLightbox(casa, photo) {
    currentCasa = casa;
    currentPhoto = photo;

    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightboxImage");
    const counter = document.getElementById("lightboxCounter");

    if (!lightbox || !image || !counter) return;

    image.src = getPhotoPath(currentCasa, currentPhoto);
    counter.textContent = `${currentPhoto + 1} / ${totalPhotos}`;
    lightbox.classList.add("show");
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");

    if (lightbox) {
        lightbox.classList.remove("show");
    }
}

function changePhoto(direction) {
    currentPhoto += direction;

    if (currentPhoto < 0) {
        currentPhoto = totalPhotos - 1;
    }

    if (currentPhoto >= totalPhotos) {
        currentPhoto = 0;
    }

    const image = document.getElementById("lightboxImage");
    const counter = document.getElementById("lightboxCounter");

    if (!image || !counter) return;

    image.src = getPhotoPath(currentCasa, currentPhoto);
    counter.textContent = `${currentPhoto + 1} / ${totalPhotos}`;
}

document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("lightbox");

    if (!lightbox || !lightbox.classList.contains("show")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") changePhoto(1);
    if (e.key === "ArrowLeft") changePhoto(-1);
});

/* SWIPE MOBILE LIGHTBOX */

let touchStartX = 0;

document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    const lightbox = document.getElementById("lightbox");

    if (!lightbox || !lightbox.classList.contains("show")) return;

    const touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 50) {
        changePhoto(1);
    }

    if (touchEndX > touchStartX + 50) {
        changePhoto(-1);
    }
});

/* MODAL SABER MAIS */

const propertyDetailsData = {
    1: {
        titulo: "Moradia T3",
        local: "Lisboa",
        tipo: "Venda",
        area: "180 m²",
        quartos: "3 quartos",
        wc: "2 casas de banho",
        descricao: "Moradia T3 em excelente localização, ideal para famílias que procuram conforto, espaço e proximidade aos principais serviços."
    },
    2: {
        titulo: "Apartamento T2",
        local: "Cascais",
        tipo: "Arrendamento",
        area: "95 m²",
        quartos: "2 quartos",
        wc: "1 casa de banho",
        descricao: "Apartamento T2 moderno, próximo de zonas comerciais, transportes e com excelente exposição solar."
    },
    3: {
        titulo: "Vivenda T4",
        local: "Sintra",
        tipo: "Venda",
        area: "240 m²",
        quartos: "4 quartos",
        wc: "3 casas de banho",
        descricao: "Vivenda espaçosa com áreas generosas, perfeita para quem procura tranquilidade e qualidade de vida."
    },
    4: {
        titulo: "Apartamento T1",
        local: "Oeiras",
        tipo: "Arrendamento",
        area: "70 m²",
        quartos: "1 quarto",
        wc: "1 casa de banho",
        descricao: "Apartamento T1 acolhedor, ideal para uma pessoa ou casal, situado numa zona prática e bem servida."
    },
    5: {
        titulo: "Moradia T5",
        local: "Mafra",
        tipo: "Venda",
        area: "310 m²",
        quartos: "5 quartos",
        wc: "4 casas de banho",
        descricao: "Moradia T5 com excelente área interior e exterior, indicada para famílias que valorizam espaço e privacidade."
    },
    6: {
        titulo: "Apartamento T3",
        local: "Amadora",
        tipo: "Venda",
        area: "125 m²",
        quartos: "3 quartos",
        wc: "2 casas de banho",
        descricao: "Apartamento T3 funcional e bem localizado, com bons acessos e próximo de comércio, escolas e transportes."
    }
};

function openPropertyModal(id) {
    const property = propertyDetailsData[id];
    if (!property) return;

    const lang = localStorage.getItem("siteLang") || "pt";

    let titulo = property.titulo;
    let local = property.local;
    let tipo = property.tipo;
    let area = property.area;
    let quartos = property.quartos;
    let wc = property.wc;
    let descricao = property.descricao;

    if (lang === "en") {
        titulo = translations[property.titulo] || property.titulo;
        local = translations[property.local] || property.local;
        tipo = translations[property.tipo] || property.tipo;
        quartos = translations[property.quartos] || property.quartos;
        wc = translations[property.wc] || property.wc;
        descricao = translations[property.descricao] || property.descricao;
    }

    document.getElementById("modalPropertyTitle").textContent = titulo;
    document.getElementById("modalPropertyLocation").textContent = local;
    document.getElementById("modalPropertyType").textContent = tipo;
    document.getElementById("modalPropertyArea").textContent = area;
    document.getElementById("modalPropertyRooms").textContent = quartos;
    document.getElementById("modalPropertyWc").textContent = wc;
    document.getElementById("modalPropertyDescription").textContent = descricao;

    document.getElementById("propertyModal").classList.add("show");
}

function closePropertyModal() {
    const modal = document.getElementById("propertyModal");

    if (modal) {
        modal.classList.remove("show");
    }
}

/* TRADUÇÃO PT / ENG */

const languageBtn = document.getElementById("languageBtn");

const translations = {
    "Início": "Home",
    "Imóveis": "Properties",
    "Testemunhos": "Testimonials",
    "Contactos": "Contacts",
    "☰ Menu": "☰ Menu",
    "PT / ENG": "PT / ENG",

    "Century 21 · Consultoria Imobiliária": "Century 21 · Real Estate Consulting",
    "Mais do que imóveis. Construímos novos capítulos de vida.":
    "More than real estate. We help build new chapters of life.",

"Seja para comprar, vender ou investir, conte com o acompanhamento personalizado da Virgínia Bastos e da Natacha Taia para encontrar a melhor solução para si e para a sua família.":
    "Whether you are buying, selling or investing, rely on the personalized guidance of Virgínia Bastos and Natacha Taia to find the best solution for you and your family.",

    "Ver Imóveis": "View Properties",
    "Fale Connosco": "Contact Us",

    "Virgínia": "Virgínia",
    "Natacha": "Natacha",
    "Virgínia Bastos": "Virgínia Bastos",
    "Natacha Taia": "Natacha Taia",
    "Natasha Taia": "Natacha Taia",

    "Consultora imobiliária focada em encontrar soluções à medida de cada cliente, com proximidade, transparência e atenção a todos os detalhes.":
        "Real estate consultant focused on finding tailored solutions for each client, with closeness, transparency and attention to every detail.",

    "Acompanha cada processo com dedicação, profissionalismo e foco em tornar a compra, venda ou arrendamento numa experiência simples e segura.":
        "She follows each process with dedication, professionalism and focus on making buying, selling or renting a simple and secure experience.",

    "Porque escolher-nos?": "Why choose us?",
    "Acompanhamento personalizado": "Personalized support",
    "Cada cliente recebe atenção dedicada, desde a primeira conversa até à conclusão do negócio.":
        "Each client receives dedicated attention, from the first conversation to the completion of the deal.",

    "Confiança e transparência": "Trust and transparency",
    "Processos claros, comunicação próxima e decisões sempre bem explicadas.":
        "Clear processes, close communication and well-explained decisions.",

    "Soluções à medida": "Tailored solutions",
    "Apoio na compra, venda ou arrendamento com foco no objetivo de cada pessoa.":
        "Support in buying, selling or renting with focus on each person's goal.",

    "Comprar · Vender · Arrendar": "Buy · Sell · Rent",
    "Imóveis Disponíveis": "Available Properties",
    "Conheça alguns imóveis disponíveis e veja as fotografias em detalhe.":
        "Discover some available properties and view the photos in detail.",

    "VENDA": "SALE",
    "ARRENDAMENTO": "RENTAL",

    "Venda": "Sale",
    "Arrendamento": "Rental",

    "Moradia T3": "3-Bedroom House",
    "Apartamento T2": "2-Bedroom Apartment",
    "Vivenda T4": "4-Bedroom Villa",
    "Apartamento T1": "1-Bedroom Apartment",
    "Moradia T5": "5-Bedroom House",
    "Apartamento T3": "3-Bedroom Apartment",

    "Lisboa": "Lisbon",
    "Cascais": "Cascais",
    "Sintra": "Sintra",
    "Oeiras": "Oeiras",
    "Mafra": "Mafra",
    "Amadora": "Amadora",

    "Preço sob consulta": "Price on request",
    "Saber Mais": "Learn More",
    "Contactar": "Contact",
    "21 fotos": "21 photos",

    "3 quartos": "3 bedrooms",
    "2 quartos": "2 bedrooms",
    "4 quartos": "4 bedrooms",
    "1 quarto": "1 bedroom",
    "5 quartos": "5 bedrooms",

    "2 casas de banho": "2 bathrooms",
    "1 casa de banho": "1 bathroom",
    "3 casas de banho": "3 bathrooms",
    "4 casas de banho": "4 bathrooms",

    "Moradia T3 em excelente localização, ideal para famílias que procuram conforto, espaço e proximidade aos principais serviços.":
        "3-bedroom house in an excellent location, ideal for families looking for comfort, space and proximity to key services.",

    "Apartamento T2 moderno, próximo de zonas comerciais, transportes e com excelente exposição solar.":
        "Modern 2-bedroom apartment close to shopping areas, transport and with excellent sun exposure.",

    "Vivenda espaçosa com áreas generosas, perfeita para quem procura tranquilidade e qualidade de vida.":
        "Spacious 4-bedroom villa with generous areas, perfect for those looking for tranquility and quality of life.",

    "Apartamento T1 acolhedor, ideal para uma pessoa ou casal, situado numa zona prática e bem servida.":
        "Cozy 1-bedroom apartment, ideal for one person or a couple, located in a practical and well served area.",

    "Moradia T5 com excelente área interior e exterior, indicada para famílias que valorizam espaço e privacidade.":
        "5-bedroom house with excellent indoor and outdoor area, ideal for families who value space and privacy.",

    "Apartamento T3 funcional e bem localizado, com bons acessos e próximo de comércio, escolas e transportes.":
        "Functional and well located 3-bedroom apartment, with good access and close to shops, schools and transport.",

    "Clientes satisfeitos": "Satisfied Clients",
    "Mensagens de pessoas que encontraram a sua casa com acompanhamento personalizado.":
        "Messages from people who found their home with personalized support.",

    "Graças à Virgínia e à Natacha encontrámos a casa perfeita para a nossa família.":
        "Thanks to Virgínia and Natacha, we found the perfect home for our family.",

    "Profissionalismo, simpatia e acompanhamento do início ao fim.":
        "Professionalism, kindness and support from beginning to end.",

    "Todo o processo foi simples, claro e muito bem explicado.":
        "The whole process was simple, clear and very well explained.",

    "Sentimo-nos sempre acompanhados e seguros em cada decisão tomada.":
        "We always felt supported and safe in every decision made.",

    "Um serviço de excelência, sempre disponíveis para esclarecer tudo.":
        "An excellent service, always available to explain everything.",

    "Encontraram exatamente aquilo que procurávamos em muito pouco tempo.":
        "They found exactly what we were looking for in a very short time.",

    "★★★★★ · Cliente satisfeito": "★★★★★ · Satisfied client",
    "★★★★★ · Cliente comprador": "★★★★★ · Buyer client",
    "★★★★★ · Cliente vendedor": "★★★★★ · Seller client",
    "★★★★★ · Cliente arrendamento": "★★★★★ · Rental client",

    "Fale connosco": "Contact us",
    "Contactos": "Contacts",
    "Entre em contacto com a Virgínia ou com a Natacha.":
        "Get in touch with Virgínia or Natacha.",

    "Email": "Email",
    "Instagram": "Instagram",
    "Facebook": "Facebook"
};

function normalizeText(text) {
    return text
        .replace(/\s+/g, " ")
        .trim()
        .replaceAll("Natasha Taia", "Natacha Taia")
        .replaceAll("Natasha", "Natacha");
}

function fixNatachaName() {
    document.querySelectorAll("body *").forEach((el) => {
        if (el.children.length === 0 && el.textContent.includes("Natasha")) {
            el.textContent = el.textContent.replaceAll("Natasha", "Natacha");
        }

        if (el.getAttribute("alt") && el.getAttribute("alt").includes("Natasha")) {
            el.setAttribute("alt", el.getAttribute("alt").replaceAll("Natasha", "Natacha"));
        }

        if (el.getAttribute("href") && el.getAttribute("href").includes("natasha")) {
            el.setAttribute("href", el.getAttribute("href").replaceAll("natasha", "natacha"));
        }
    });
}

function saveOriginalTexts() {
    const elements = document.querySelectorAll(
        "h1, h2, h3, p, a, button, span, strong, .subtitle, .property-badge, .photo-count"
    );

    elements.forEach((el) => {
        const text = normalizeText(el.textContent);

        if (!text) return;

        if (!el.dataset.original) {
            el.dataset.original = text;
        } else {
            el.dataset.original = normalizeText(el.dataset.original);
        }
    });
}

function translateElement(el, lang) {
    const original = normalizeText(el.dataset.original || el.textContent);

    if (!original) return;

    const icon = el.querySelector("i");

    if (lang === "en" && translations[original]) {
        if (icon) {
            el.innerHTML = `${icon.outerHTML} ${translations[original]}`;
        } else {
            el.textContent = translations[original];
        }
    } else {
        if (icon) {
            el.innerHTML = `${icon.outerHTML} ${original}`;
        } else {
            el.textContent = original;
        }
    }
}

function applyLanguage(lang) {
    fixNatachaName();
    saveOriginalTexts();

    const elements = document.querySelectorAll(
        "h1, h2, h3, p, a, button, span, strong, .subtitle, .property-badge, .photo-count"
    );

    elements.forEach((el) => {
        translateElement(el, lang);
    });

    fixNatachaName();
}

if (languageBtn) {
    languageBtn.addEventListener("click", () => {
        const currentLang = localStorage.getItem("siteLang") || "pt";
        const newLang = currentLang === "pt" ? "en" : "pt";

        localStorage.setItem("siteLang", newLang);
        applyLanguage(newLang);
    });
}

window.addEventListener("load", () => {
    fixNatachaName();
    saveOriginalTexts();
    applyLanguage(localStorage.getItem("siteLang") || "pt");
});