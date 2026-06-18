// 1. MASUKKAN URL GOOGLE APPS SCRIPT KAKAK DI SINI
const API_URL = "https://script.google.com/macros/s/AKfycbxA-sM4Dtvolt8l8NH4UNJAT9cUGMzN9F786UQtN0IRn08Ivsi1B6tBhVi23i7DHU92/exec";

// 2. Sistem Pengaman Otomatis Jalur Masuk Halaman Petugas
document.addEventListener("DOMContentLoaded", function() {
    periksaKeamananSesi();
    tampilkanNamaPetugasAktif();
});

function periksaKeamananSesi() {
    const user = localStorage.getItem("sipades_user");
    const token = localStorage.getItem("sipades_token");
    const halamanSekarang = window.location.pathname;

    // Kecualikan proteksi untuk halaman login dan halaman publik penampil QR
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
