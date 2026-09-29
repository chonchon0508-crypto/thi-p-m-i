# THE ENCORE — Thiệp ăn mừng

Mở `index.html` bằng trình duyệt. Không cần cài Node, React hoặc GSAP.

- `thiep.jsx`: JavaScript chạy trực tiếp, nội dung thiệp, chuyển cảnh, cúp SVG, pháo giấy và disco canvas. Đuôi `.jsx` được giữ theo file làm việc ban đầu; file không sử dụng cú pháp JSX hay import React.
- `style.css`: bố cục responsive, màu sắc, font và hiệu ứng.
- `index.html`: điểm mở trang. Font Google là tùy chọn; khi mất mạng có font hệ thống dự phòng.

Sửa `PARTY` ở đầu `thiep.jsx` để điền ngày, giờ, địa điểm và dress code. Giá trị `null` hiển thị thông báo đang cập nhật. Nút lưu thiệp tải tệp văn bản, không gửi RSVP hay dữ liệu đến máy chủ.

Nếu muốn chạy qua HTTP: `python3 -m http.server 8080`, sau đó mở `http://localhost:8080`.

Điều hướng bằng các nút chính hoặc bốn nút chương ở chân trang. Trên màn hình nhỏ vẫn cuộn được nội dung dài trong từng chương. Nút giảm chuyển động và thiết lập hệ điều hành được hỗ trợ. Không tự phát âm thanh.
# thi-p-m-i
