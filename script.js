document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");
    const trickBtn = document.getElementById("trickBtn");
    const prankMsg = document.getElementById("prankMessage");

    let clickCount = 0;
    const maxClicks = 5;
    const prankTexts = [
        "Wkwkwk",
        "Pencet i lagii",
        "Aih masa nda kena",
        "Ngoe",
    ];

    trickBtn.addEventListener("click", () => {
        if (clickCount < maxClicks) {
            prankMsg.textContent = prankTexts[Math.floor(Math.random() * prankTexts.length)];
            clickCount++;

            const padding = 100;
            const randomX = Math.random() * (window.innerWidth - trickBtn.offsetWidth - padding * 2) + padding;
            const randomY = Math.random() * (window.innerHeight - trickBtn.offsetHeight - padding * 2) + padding;
            const randomRotate = (Math.random() - 0.5) * 50;

            trickBtn.style.position = "fixed";
            trickBtn.style.left = `${randomX}px`;
            trickBtn.style.top = `${randomY}px`;
            trickBtn.style.transform = `rotate(${randomRotate}deg)`;
        } else {
            bgMusic.play().catch(() => {});
            transitionToStage("stage-welcome");
            startWelcomeStage();
        }
    });

    function transitionToStage(stageId) {
        document.querySelectorAll(".stage").forEach(stage => {
            stage.classList.remove("active");
        });
        setTimeout(() => {
            document.getElementById(stageId).classList.add("active");
        }, 500);
    }

    function typeWriter(elementId, text, speed = 110, callback) {
        const el = document.getElementById(elementId);
        el.textContent = "";
        let i = 0;

        function typing() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (callback) {
                setTimeout(callback, 3800);
            }
        }
        typing();
    }

    function startWelcomeStage() {
        const welcomeStage = document.getElementById("stage-welcome");
        
        setTimeout(() => {
            welcomeStage.classList.add("bright");
        }, 1500);

        setTimeout(() => {
            typeWriter(
                "typingWelcome", 
                "Anjayy berhasilmi napencet, sebelumnya perkenalkan namaku Sofyan, anak IPMIL sering panggil 'Sopi' beh terlalu banyak perkenalan.... Langsung saja ah", 
                70, 
                () => {
                    transitionToStage("stage-photo");
                    startPhotoStage();
                }
            );
        }, 3200);
    }

    function startPhotoStage() {
        setTimeout(() => {
            typeWriter(
                "typingPhoto", 
                "02 november 2007, nama Zahratusitha disematkan pada seorang anak yang lahir dengan tangis merdu. Zahra yang berarti 'bunga', sitha yang bermakna 'musim dingin'. 'Bunga musim dingin' memiliki esensi tersendiri, Ratu misalnya...", 
                100, 
                () => {
                    transitionToStage("stage-video");
                    startVideoStage();
                }
            );
        }, 1500);
    }

    function startVideoStage() {
        setTimeout(() => {
            typeWriter(
                "typingVideo", 
                "WOII TUMBLERMU AMBIL SEBELUM SAYA JUAL!!!, kutau ji sebatas ' junior & senior' relasita, tapi kuanggap sodariku sendiri mko dek, agak keras kepala ko tapi kusuka ajak bercanda. semoga senyum selalu tersematkan dimukamu, sehat-sehat ko nah supaya cepat-cepatko jauhkan ka dari tumbler pink ini hahahaha canda", 
                100, 
                () => {
                    transitionToStage("stage-finale");
                    startFinaleStage();
                }
            );
        }, 1500);
    }

    // TAHAP 5: Alur Baru (Petasan Megah 5 Detik -> Foto Memenuhi Layar 1 per 1 -> Teks Muncul Permanen)
    function startFinaleStage() {
        // 1. Nyalakan kembang api megah terlebih dahulu
        const fireworksStop = initMegaFireworks();

        // 2. Jeda 5 detik menikmati petasan, baru munculkan foto memenuhi layar satu per satu
        setTimeout(() => {
            showFullFillingRandomPhotos(() => {
                // 3. Setelah foto memenuhi layar dan tetap permanen, munculkan teks ucapan di tengah
                const finaleContainer = document.querySelector(".finale-container");
                finaleContainer.classList.add("show");

                setTimeout(() => {
                    typeWriter(
                        "typingFinale", 
                        "Hari ini, semesta kembali merayakan hadirnya seseorang yang mungkin tidak selalu mudah dipahami, yang terkadang keras kepala dengan segala pendiriannya, dan bisa berubah suasana hatinya seperti langit yang tak pernah berjanji akan selalu cerah. HAPPY 19TH ZAHRATUSITHA yang kerap di sapa RATU.", 
                        95
                    );
                }, 800);
            });
        }, 5000); // Jeda persis 5 detik
    }

    // Fungsi Menampilkan Foto Memenuhi Layar Satu per Satu Secara Acak
    function showFullFillingRandomPhotos(onComplete) {
        const container = document.getElementById("randomPhotosContainer");
        container.innerHTML = "";

        const photoUrls = [
            "foto2.jpeg",
            "foto3.jpeg",
            "foto4.jpeg",
            "foto5.jpeg",
            "foto6.jpeg",
            "foto7.jpeg"
        ];

        // Posisi menyebar luas memenuhi layar (atas, bawah, kiri, kanan, tengah-pinggir)
        const screenFillPositions = [
            { top: "4%", left: "4%", rotate: "-14deg" },
            { top: "6%", right: "5%", rotate: "16deg" },
            { bottom: "5%", left: "6%", rotate: "12deg" },
            { bottom: "4%", right: "4%", rotate: "-18deg" },
            { top: "35%", left: "2%", rotate: "8deg" },
            { top: "30%", right: "3%", rotate: "-10deg" }
        ];

        let loadedCount = 0;

        screenFillPositions.forEach((pos, index) => {
            const div = document.createElement("div");
            div.className = "scattered-photo";

            if (pos.top) div.style.top = pos.top;
            if (pos.bottom) div.style.bottom = pos.bottom;
            if (pos.left) div.style.left = pos.left;
            if (pos.right) div.style.right = pos.right;
            div.style.transform = `rotate(${pos.rotate}) scale(0.3) translateY(60px)`;

            const img = document.createElement("img");
            img.src = photoUrls[index % photoUrls.length];
            img.alt = "Kenangan";

            div.appendChild(img);
            container.appendChild(div);

            // Munculkan bertahap satu per satu dan biarkan tetap permanen di layar
            setTimeout(() => {
                div.classList.add("show");
                div.style.transform = `rotate(${pos.rotate}) scale(1) translateY(0)`;
                loadedCount++;

                if (loadedCount === screenFillPositions.length && onComplete) {
                    setTimeout(onComplete, 1000);
                }
            }, index * 800); // Jeda kemunculan tiap foto berurutan
        });
    }

    // Efek Kembang Api Megah & Sangat Ramai
    function initMegaFireworks() {
        const canvas = document.getElementById("fireworksCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 9 + 3;
                this.friction = 0.94;
                this.gravity = 0.05;
                this.alpha = 1;
                this.decay = Math.random() * 0.009 + 0.003;
            }

            update() {
                this.speed *= this.friction;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed + this.gravity;
                this.alpha -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        let particles = [];

        function addMegaFirework() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height * 0.75);
            const brightColors = ["#ff7675", "#fab1a0", "#ffeaa7", "#55efc4", "#74b9ff", "#a29bfe", "#fd79a8", "#ffffff", "#e17055"];
            
            const color1 = brightColors[Math.floor(Math.random() * brightColors.length)];
            const color2 = brightColors[Math.floor(Math.random() * brightColors.length)];

            for (let i = 0; i < 90; i++) {
                particles.push(new Particle(x, y, i % 2 === 0 ? color1 : color2));
            }
        }

        const fireworkInterval = setInterval(addMegaFirework, 900);

        function animate() {
            ctx.fillStyle = "rgba(15, 12, 11, 0.18)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();
                if (p.alpha <= 0) {
                    particles.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        }
        animate();
    }
});