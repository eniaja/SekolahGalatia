
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

// Buka dan tutup menu HP
menuToggle.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Dropdown Jenjang dan Postingan
document.querySelectorAll(".dropdown-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
        const parent = button.closest(".nav-dropdown");
        const isOpen = parent.classList.toggle("open");

        button.setAttribute("aria-expanded", isOpen);
    });
});

// Tutup menu setelah tautan diklik
document.querySelectorAll(".navigation a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Tutup dropdown jika pengguna klik di luar dropdown
document.addEventListener("click", function (event) {
    document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("open");

            const button = dropdown.querySelector(".dropdown-toggle");
            button.setAttribute("aria-expanded", "false");
        }
    });
});



const hero = document.querySelector(".hero");
const video = document.querySelector(".hero-video");

const slides = [
    {
        tipe: "gambar",
        gambar: "bg-sekolah.png",
        posisi: "center 19%"
    },
    {
        tipe: "gambar",
        gambar: "bg1.jpeg",
        posisi: "center 85%"
    },
    {
        tipe: "video",
        sumber: "video-sekolah.mp4"
    }
];

let index = 0;
let timer;

function tampilkanSlide() {
    clearTimeout(timer);

    const slide = slides[index];

    if (slide.tipe === "gambar") {
        video.pause();
        video.style.display = "none";

        hero.style.backgroundImage =
            `linear-gradient(
                rgba(30, 43, 65, 0.60),
                rgba(30, 43, 65, 0.60)
            ), url("${slide.gambar}")`;

        hero.style.backgroundPosition = slide.posisi;

        timer = setTimeout(() => {
            index = (index + 1) % slides.length;
            tampilkanSlide();
        }, 5000);

    } else {
        hero.style.backgroundImage = "none";
        video.style.display = "block";

        video.src = slide.sumber;
        video.currentTime = 0;

        video.play().catch(error => {
            console.log("Video belum dapat diputar:", error);
        });
    }
}

// Setelah video selesai, lanjut ke slide berikutnya
video.addEventListener("ended", () => {
    index = (index + 1) % slides.length;
    tampilkanSlide();
});

tampilkanSlide();


// SLIDESHOW FOTO TENTANG KAMI
const profilSlides = document.querySelectorAll(
    ".profil-image.slideshow .slide"
);

let profilSlideAktif = 0;

if (profilSlides.length > 1) {
    setInterval(function () {
        profilSlides[profilSlideAktif].classList.remove("aktif");

        profilSlideAktif =
            (profilSlideAktif + 1) % profilSlides.length;

        profilSlides[profilSlideAktif].classList.add("aktif");
    }, 3000);
}


/* =========================================
   ANIMASI SCROLL BERULANG ATAS DAN BAWAH
========================================= */

(function () {
    function aktifkanAnimasiScroll() {

        const elemenTeks = document.querySelectorAll(`
            header .brand-text h2,
            header .brand-text p,
            header nav a,
            header nav button,
            main h1,
            main h2,
            main h3,
            main p,
            main li,
            main .program-card,
            main .profil-image,
            footer p
        `);

        elemenTeks.forEach(function (elemen, index) {
            elemen.classList.add("scroll-reveal");

            // Variasi jeda animasi
            elemen.classList.remove(
                "delay-1",
                "delay-2",
                "delay-3"
            );

            if (index % 4 === 1) {
                elemen.classList.add("delay-1");
            } else if (index % 4 === 2) {
                elemen.classList.add("delay-2");
            } else if (index % 4 === 3) {
                elemen.classList.add("delay-3");
            }
        });

        if (!("IntersectionObserver" in window)) {
            elemenTeks.forEach(function (elemen) {
                elemen.classList.add("is-visible");
            });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        // Masuk layar: teks bergerak muncul
                        entry.target.classList.add("is-visible");
                    } else {
                        // Keluar layar: reset animasi
                        // agar bisa bergerak lagi
                        entry.target.classList.remove("is-visible");
                    }

                });
            },
            {
                threshold: 0,
                rootMargin: "0px"
            }
        );

        elemenTeks.forEach(function (elemen) {
            observer.observe(elemen);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            aktifkanAnimasiScroll
        );
    } else {
        aktifkanAnimasiScroll();
    }
})();


document.addEventListener("DOMContentLoaded", function () {
    const galeriCards = document.querySelectorAll(".galeri-card");

    const observerGaleri = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Foto muncul saat masuk ke layar
                    entry.target.classList.add("muncul");
                } else {
                    // Reset animasi saat keluar dari layar
                    entry.target.classList.remove("muncul");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    galeriCards.forEach(function (card) {
        observerGaleri.observe(card);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const fasilitasCards = document.querySelectorAll(".fasilitas-card");

    const observerFasilitas = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Foto muncul saat masuk ke layar
                    entry.target.classList.add("muncul");
                } else {
                    // Reset animasi saat keluar dari layar
                    entry.target.classList.remove("muncul");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    fasilitasCards.forEach(function (card) {
        observerFasilitas.observe(card);
    });
});

