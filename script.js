document.addEventListener("DOMContentLoaded", () => {
    // 1. Pencarian & sorotan kata kunci pada teks halaman (Search Bar)
    const searchInput = document.querySelector(".hx-search input");
    const searchableTargets = document.querySelectorAll(
        ".hero-title, .info-item h3, .info-item p, .hx-linksind a"
    );

    if (searchInput && searchableTargets.length > 0) {
        searchInput.addEventListener("input", (e) => {
            const keyword = e.target.value.trim().toLowerCase();

            searchableTargets.forEach((el) => {
                el.style.outline = "none";
                el.style.backgroundColor = "";
                el.style.borderRadius = "";

                if (!keyword) return;

                const text = el.textContent.toLowerCase();
                if (text.includes(keyword)) {
                    el.style.backgroundColor = "rgba(217, 35, 46, 0.22)";
                    el.style.outline = "1px solid rgba(217, 35, 46, 0.65)";
                    el.style.borderRadius = "6px";
                }
            });
        });

        // Tekan Enter untuk melompat ke halaman yang cocok (misal: ketik "skills" atau "experience")
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const q = searchInput.value.trim().toLowerCase();
                const pageMap = {
                    education: "education.html",
                    pendidikan: "education.html",
                    experience: "experience.html",
                    pengalaman: "experience.html",
                    kerja: "experience.html",
                    skills: "skills.html",
                    skill: "skills.html",
                    keahlian: "skills.html"
                };

                for (const [key, url] of Object.entries(pageMap)) {
                    if (q.includes(key)) {
                        window.location.href = url;
                        break;
                    }
                }
            }
        });
    }

    // 2. Klik item pada .info-grid (01 Profile, 02 Services, 03 Highlight) untuk info detail
    const infoItems = document.querySelectorAll(".info-item");
    const extraNotes = {
        "01": "Pelatihan Teknisi Komputer & Jaringan serta AI Productivity di Javacom Academy Surakarta.",
        "02": "Hardware/software troubleshooting, desain promosi & media sosial, serta alur kerja berbasis AI.",
        "03": "Terbuka untuk peluang kolaborasi kreatif, proyek freelance, dan peran penuh waktu."
    };

    infoItems.forEach((item) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            const code = item.querySelector("h3 span")?.textContent.trim();
            const existingNote = item.querySelector(".js-extra-note");

            if (existingNote) {
                existingNote.remove();
                return;
            }

            if (code && extraNotes[code]) {
                const note = document.createElement("p");
                note.className = "js-extra-note";
                note.style.marginTop = "8px";
                note.style.fontSize = "0.84rem";
                note.style.opacity = "0.9";
                note.style.fontStyle = "italic";
                note.textContent = extraNotes[code];
                item.appendChild(note);
            }
        });
    });

    // 3. Efek parallax halus pada foto karakter saat kursor digerakkan
    const heroCharacter = document.querySelector(".hero-character img");
    const heroBody = document.querySelector(".hero-body");

    if (heroCharacter && heroBody) {
        heroBody.addEventListener("mousemove", (e) => {
            const rect = heroBody.getBoundingClientRect();
            const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
            const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
            heroCharacter.style.transform = `translate(${xRatio * -14}px, ${yRatio * -10}px)`;
            heroCharacter.style.transition = "transform 0.15s ease-out";
        });

        heroBody.addEventListener("mouseleave", () => {
            heroCharacter.style.transform = "translate(0, 0)";
            heroCharacter.style.transition = "transform 0.35s ease";
        });
    }

    // 4. Animasi muncul lembut saat halaman dimuat
    const revealEls = document.querySelectorAll(".hero-card, .info-item");
    revealEls.forEach((el, idx) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(14px)";
        el.style.transition = `opacity 0.5s ease ${idx * 0.06}s, transform 0.5s ease ${idx * 0.06}s`;

        requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    });
});