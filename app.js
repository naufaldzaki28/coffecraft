// Register Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker Registered");
    });
}

// Push Notification Button
function requestNotificationPermission() {
    Notification.requestPermission().then((result) => {
        if (result === "granted") {
            new Notification("☕ Coffee Bliss", {
                body: "Terima kasih! Notifikasi aktif.",
                icon: "/icons/icon-192.png"
            });
        }
    });
}

// Auto ask notification after 3 sec (optional)
setTimeout(() => {
    if (Notification.permission !== "granted") {
        requestNotificationPermission();
    }
}, 3000);

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log("Service Worker Registered"))
        .catch(err => console.log(err));
}

// Auto Reminder
async function startReminder() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        navigator.serviceWorker.getRegistration().then(reg => {
            // Kirim notifikasi pertama
            reg.showNotification("☕ Coffee Reminder", {
                body: "Saatnya menikmati secangkir kopi!",
                icon: "/icons/coffee-192.png",
                badge: "/icons/coffee-192.png"
            });

            // Kirim notifikasi berkala (misal: 1 menit)
            setInterval(() => {
                reg.showNotification("☕ Ngopi Dulu?", {
                    body: "Jangan biarkan mood kamu turun. Waktunya ngopi!",
                    icon: "/icons/coffee-192.png",
                    vibrate: [100, 50, 100],
                });
            }, 60000); // 60.000 ms = 1 menit
        });
    } else {
        alert("Notifikasi tidak diizinkan.");
    }
}

// Aktifkan via tombol
document.getElementById("notifyBtn").addEventListener("click", startReminder);