# THE ENCORE, Thiệp ăn mừng

Mở `index.html` bằng trình duyệt. Không cần cài Node, React hoặc GSAP.

- `thiep.jsx`: JavaScript chạy trực tiếp, nội dung thiệp, chuyển cảnh, cúp SVG, pháo giấy và disco canvas. Đuôi `.jsx` được giữ theo file làm việc ban đầu; file không sử dụng cú pháp JSX hay import React.
- `style.css`: bố cục responsive, màu sắc, font và hiệu ứng.
- `index.html`: điểm mở trang. Font Google là tùy chọn; khi mất mạng có font hệ thống dự phòng.

Ngày tổ chức là Thứ Bảy, 03/10/2026, cấu hình tại `PARTY.date` ở đầu `thiep.jsx`. `STOPS` chứa hai tăng, tăng 1 lúc 19:00 tại The Gangs Central, tăng 2 lúc 23:00 với địa điểm club chờ thông báo. Hai phong bì kính mở/gấp riêng, chuyển bằng hai ô chọn có tên tăng, giờ và địa điểm.

Nút “Xác nhận tham gia” lật thành “🔥 Game On!” và lưu lựa chọn bằng localStorage. Nhấn lại để bỏ xác nhận. Đây là phản hồi trên thiết bị, chưa gửi đăng ký đến ban tổ chức. Nếu trình duyệt chặn lưu trữ, lựa chọn chỉ tồn tại trong lần mở trang đó.

Nếu muốn chạy qua HTTP: `python3 -m http.server 8080`, sau đó mở `http://localhost:8080`.

Mở trang sẽ chạy intro khoảng 4 giây: SYSTEM LOAD… → WE SLAYED → phóng chữ để mở nội dung. Có thể bỏ qua bằng nút hoặc phím Escape. Tự giảm hiệu ứng theo thiết lập giảm chuyển động của hệ điều hành.

Điều hướng bằng các nút trong từng phần; không có thanh đầu trang hoặc thanh chương ở chân trang. Trên màn hình nhỏ vẫn cuộn được nội dung dài trong từng phần. Không tự phát âm thanh.

Intro dùng cùng tông đen–lime/ngà với trang đầu. Chạm cúp để ăn mừng, rê chuột lên thẻ cúp/thư để đổi góc sáng; nút trái tim trong thư chỉ phản hồi tại trang, không gửi dữ liệu và không lưu sau khi tải lại. Các nút hỗ trợ bàn phím. Chuyển động và hiệu ứng nghiêng tự giảm theo thiết lập hệ điều hành.
# thi-p-m-i
