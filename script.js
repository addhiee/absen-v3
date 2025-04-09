document.addEventListener("DOMContentLoaded", function () {
  const uidToName = {
    "1234567890": "Nama Lengkap A",
    "0987654321": "Nama Lengkap B"
    // Tambahkan UID lainnya di sini
  };

  const uidInput = document.getElementById("uid");
  const alertBox = document.getElementById("customAlert");

  uidInput.addEventListener("input", function () {
    const uid = uidInput.value;

    // Hanya izinkan angka
    uidInput.value = uid.replace(/\D/g, "");

    // Jika UID valid dan ditemukan dalam daftar
    if (uid.length === 10 && uidToName[uid]) {
      const nama = uidToName[uid];

      // Tampilkan alert di tengah
      alertBox.textContent = `Selamat datang, ${nama}`;
      alertBox.style.display = "block";

      // Kirim data ke Google Sheet
      fetch("https://script.google.com/macros/s/AKfycbxjs-a2mmE39IOSP49jE7o-wqVOvusB7dzaulykkGlRy8D4OBZ1JMIr4WG8_Lu2ljo/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uid: uid,
          nama: nama,
          keterangan: "Hadir"
        })
      });

      // Sembunyikan alert dan reset input
      setTimeout(() => {
        alertBox.style.display = "none";
        uidInput.value = "";
      }, 2000);
    }
  });
});
