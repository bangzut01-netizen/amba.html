const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const universe = document.querySelector('.universe');
const ascendBtn = document.getElementById('ascendBtn');
const ambaGod = document.getElementById('ambaGod');
const flashOverlay = document.getElementById('flashOverlay');
const statusLabel = document.getElementById('statusLabel');
const sound = document.getElementById('cosmicSound');

let isAscended = false;
let particles = [];

// Set Ukuran Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Efek Interaksi Mouse (Kamera 3D Parallax)
window.addEventListener('mousemove', (e) => {
    if (isAscended) return; // Kunci mouse jika sedang mode kekacauan
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    
    document.documentElement.style.setProperty('--mouseX', `${-x}deg`);
    document.documentElement.style.setProperty('--mouseY', `${y}deg`);
});

// Class Komponen Partikel Aura
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
    }
    update(multiplier = 1) {
        this.y -= this.speedY * multiplier;
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Inisialisasi Partikel
for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
}

// Loop Animasi Canvas Latar Belakang
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let multiplier = isAscended ? 15 : 1; // Percepat partikel kalau mode dewa aktif
    
    particles.forEach(p => {
        p.update(multiplier);
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// Event Klik Tombol Dimensi Amba
ascendBtn.addEventListener('click', () => {
    if (!isAscended) {
        isAscended = true;
        
        // Audio play
        sound.currentTime = 0;
        sound.play().catch(() => console.log("Izin audio aktif setelah interaksi."));

        // Trigger Efek Kilat / Strobo awal
        flashOverlay.style.opacity = '1';
        setTimeout(() => flashOverlay.style.opacity = '0', 200);

        // Berikan Class Kekacauan Luar Nalar
        document.body.classList.add('hyper-shake');
        ambaGod.classList.add('god-ascension');
        
        // Ubah UI Status
        statusLabel.innerText = "OVERLOAD / KOSMIK RUSAK";
        statusLabel.className = "neon-red";
        ascendBtn.innerText = "TUTUP DIMENSI!";

        // Interval Pembuat Teks "Shitpost" Melayang
        const wordSpam = setInterval(() => {
            if (!isAscended) {
                clearInterval(wordSpam);
                return;
            }
            spawnFloatingWord();
        }, 60);

        // Matikan otomatis dalam 8 detik demi keselamatan grafis/mata
        setTimeout(() => { if(isAscended) resetDimension(); }, 8000);

    } else {
        resetDimension();
    }
});

function resetDimension() {
    isAscended = false;
    document.body.classList.remove('hyper-shake');
    ambaGod.classList.remove('god-ascension');
    sound.pause();
    
    statusLabel.innerText = "STABIL";
    statusLabel.className = "neon-green";
    ascendBtn.innerText = "BUKA GERBANG DIMENSI!";
    
    // Reset Kamera
    document.documentElement.style.setProperty('--mouseX', '0deg');
    document.documentElement.style.setProperty('--mouseY', '0deg');
}

// Fungsi Spawn Kata Terbang Dinamis
function spawnFloatingWord() {
    const words = ["AMBATUKAM", "OH MY KOSMIK", "SANG OVERLORD", "AUGH", "DIMENSI X", "BERTOBATLAH", "⚡", "🔥"];
    const span = document.createElement('span');
    
    span.classList.add('floating-word');
    span.innerText = words[Math.floor(Math.random() * words.length)];
    
    // Posisi acak di sekitar portal tengah
    span.style.left = (window.innerWidth / 2 + (Math.random() * 400 - 200)) + 'px';
    span.style.top = (window.innerHeight / 2 + (Math.random() * 400 - 200)) + 'px';
    
    // Warna acak neon
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0000', '#00ff00'];
    span.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(span);
    
    setTimeout(() => span.remove(), 1500);
}
