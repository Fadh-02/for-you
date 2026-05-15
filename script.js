// --- Variable Global ---
let noButtonCount = 0; // Kiraan berapa kali user cuba tekan 'No'
let wrongAttemptCount = 0;

// --- 1. Fungsi Navigasi (SPA) ---
function nextPage(pageNumber) {
    // Sembunyikan semua page
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Tunjukkan page yang dimahukan
    const targetPage = document.getElementById('page' + pageNumber);
    if(targetPage) {
        targetPage.style.display = 'block';
    }
}

// --- 2. Logik Shutdown (Jika tekan No pada soalan Ready) ---
function handleNoReady() {
    // 1. Tukar warna background body kepada hitam dan buang gambar hati
    document.body.style.backgroundColor = "black";
    document.body.style.backgroundImage = "none"; 

    // 2. Masukkan kandungan baru
    document.body.innerHTML = `
        <div class="shutdown-screen">
            <h1 style="font-family: sans-serif; font-size: 1.5rem; padding: 20px; color: white;">
                Ahhh.... You don't want to know 😔
            </h1>
            <button class="btn" style="cursor: not-allowed; background: #555; color: white; border: none;">Bye-bye</button>
            <p style="margin-top: 20px; font-size: 0.8rem; color: #888;"></p>
        </div>
    `;
    
    // Bekukan skrin
    document.body.style.pointerEvents = "none";
}

// --- 3. Logik Puzzle (Susun Kata) ---
function checkPuzzle() {
    // 1. Ambil input, tukar jadi huruf kecil, dan BUANG semua ruang (space)
    const input = document.getElementById('puzzle-answer').value.toLowerCase().replace(/\s/g, '');
    
    // 2. Semak terus dengan jawapan yang tiada space
    if (input === 'youandmeforever') {
        nextPage(4); // Terus ke page soalan lamaran
    } else {
        wrongAttemptCount++; // Tambah kiraan salah

        // 3. Logik Hint (Susun dari 3 ke bawah supaya dia tak sangkut)
        if (wrongAttemptCount >= 3) {
            alert("Sayang, hint untuk awak: Y _ U _ N D M _ F _ R _ V _ R 🫣");
        } else if (wrongAttemptCount >= 2) {
            alert("Hint untuk awak, sayang cuba lagi 🫣 : Y_ _ _ _D _ _ F_ _ _ _E_");
        } else {
            alert("Ops! Salah la sayang. Cuba lagi sekali, pasti boleh! 😘");
        }
    }
}

// --- 4. Logik Celebrate (Tekan Yes Terakhir) ---
function celebrate() {
    // Tunjukkan Modal WhatsApp dulu sebelum ke page terakhir
    showWhatsAppModal();
    
    // Logik asal awak (Muzik & Konfeti)
    document.body.style.backgroundColor = "#f8bbd0";
    const audio = document.getElementById('romantic-music');
    audio.play().catch(e => console.log("Audio blocked"));

    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    (function frame() {
        confetti({
            particleCount: 2, angle: 60, spread: 55, origin: { x: 0 },
            colors: ['#ff80ab', '#f06292', '#ffffff']
        });
        confetti({
            particleCount: 2, angle: 120, spread: 55, origin: { x: 1 },
            colors: ['#ff80ab', '#f06292', '#ffffff']
        });
        if (Date.now() < animationEnd) requestAnimationFrame(frame);
    }());
}

// --- FUNGSI BARU WHATSAPP ---
function showWhatsAppModal() {
    document.getElementById('waModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('waModal').style.display = 'none';
    nextPage(5); // Terus ke page 5 (Yay!) selepas tutup modal
}

function processWhatsApp() {
    const tel = document.getElementById('waNumber').value.trim();
    const message = document.getElementById('waCustomMessage').value;

    if (tel === "") {
        alert("Sila masukkan nombor telefon pasangan!");
        return;
    }

    let finalTel = tel;
    if (!tel.startsWith('6')) finalTel = '6' + tel;

    const url = "https://wa.me/" + finalTel + "?text=" + encodeURIComponent(message);
    window.open(url, '_blank').focus();
    closeModal();
}


// --- 5. Prank Butang No Lari (Dengan Counter) ---
// Gantikan logik butang lari dalam script.js dengan ni:
const runBtn = document.getElementById('run-away-btn');
const container = document.querySelector('.container'); // Ambil kotak putih tu

if(runBtn && container) {
    const moveButton = () => {
        noButtonCount++;

        if (noButtonCount >= 4) {
            alert("Don't play with my heart! 😤 Only 'YES' is allowed here!");
            noButtonCount = 0;
        } else {
            // Dapatkan posisi dan saiz kotak
            const containerRect = container.getBoundingClientRect();
            
            // Kira had pergerakan supaya tak keluar dari kotak
            // Kita tolak 50px (saiz anggaran butang) supaya dia tak terkeluar margin
            const maxX = containerRect.width - runBtn.offsetWidth - 20;
            const maxY = containerRect.height - runBtn.offsetHeight - 20;
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            // Guna 'relative' supaya dia gerak dalam kotak, bukan luar skrin
            runBtn.style.position = 'relative'; 
            runBtn.style.left = `${randomX}px`;
            runBtn.style.top = `${randomY}px`;
        }
    };

    runBtn.addEventListener('mouseover', moveButton);
    runBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });
}
