document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            try {
                // Gọi tới supabaseClient đã khởi tạo bên HTML
                const { data, error } = await supabaseClient
                    .from("contacts") // Đổi tên bảng ở đây nếu bảng của bạn khác tên
                    .insert([
                        {
                            name: name,
                            email: email,
                            message: message
                        }
                    ]);

                if (error) {
                    console.error("Lỗi gửi dữ liệu:", error);
                    alert("Có lỗi xảy ra khi gửi tin nhắn: " + error.message);
                } else {
                    alert("Gửi tin nhắn thành công!");
                    contactForm.reset();
                }
            } catch (err) {
                console.error("Lỗi hệ thống:", err);
                alert("Đã xảy ra lỗi ngoài dự kiến.");
            }
        });
    }
});