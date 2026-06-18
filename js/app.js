// 1. MASUKKAN URL GOOGLE APPS SCRIPT KAKAK DI SINI
const API_URL = "https://script.google.com/macros/s/AKfycbxA-sM4Dtvolt8l8NH4UNJAT9cUGMzN9F786UQtN0IRn08Ivsi1B6tBhVi23i7DHU92/exec";

// 2. Fungsi Global Ambil Data dari Google Sheets (GET)
async function ambilDataDariCloud(namaSheet) {
    try {
        const respon = await fetch(`${API_URL}?sheet=${namaSheet}`);
        if (!respon.ok) throw new Error("Gagal mengambil data dari server cloud.");
        const dataJson = await respon.json();
        return dataJson;
    } catch (eror) {
        console.error("Eror API Ambil Data:", eror);
        return [];
    }
}

// 3. Fungsi Global Kirim Data Laporan ke Google Sheets (POST)
async function kirimDataAmanKeCloud(payload) {
    try {
        const respon = await fetch(API_URL, {
            method: "POST",
            mode: "no-cors", // Mencegah blokir kebijakan keamanan CORS browser
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        return true;
    } catch (eror) {
        console.error("Eror API Kirim Data:", eror);
        return false;
    }
}

// 4. Sistem Pengaman Otomatis Jalur Masuk Halaman Petugas
document.addEventListener("DOMContentLoaded", function() {
    periksaKeamananSesi();
    tampilkanNamaPetugasAktif();
});

function periksaKeamananSesi() {
    const user = localStorage.getItem("sipades_user");
    const token = localStorage.getItem("sipades_token");
    const halamanSekarang = window.location.pathname;

    // Pengecekan gerbang masuk panel admin
    if (!user || !token) {
        if (!halamanSekarang.includes("login.html") && !halamanSekarang.includes("detail-aset.html")) {
            alert("Akses Ditolak: Silakan masuk menggunakan PIN Token terlebih dahulu.");
            window.location.href = "login.html";
        }
    }
}

function tampilkanNamaPetugasAktif() {
    const elemenNama = document.getElementById("namaAktorInfo");
    const namaLengkap = localStorage.getItem("sipades_nama");
    const role = localStorage.getItem("sipades_role");

    if (elemenNama && namaLengkap) {
        elemenNama.innerHTML = `<i class="fa-solid fa-user-tie text-success me-2"></i> ${namaLengkap} (${role})`;
    }
}

function logoutSistem() {
    if (confirm("Apakah Anda yakin ingin keluar dan mengunci akses?")) {
        localStorage.clear();
        window.location.href = "login.html";
    }
}
