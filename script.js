function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    // Ganti ini sesuai keinginan
    const validUsername = "hasbi";
    const validPassword = "12345678";

    if (username === validUsername && password === validPassword) {
        // Simpan status login (opsional)
        localStorage.setItem("loggedIn", "true");
        window.location.href = "portfolio.html";
    } else {
        errorMsg.textContent = "Username atau password salah!";
    }
}
