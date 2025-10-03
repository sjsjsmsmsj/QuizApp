## Buổi 1 và buổi 2: 
- Thiết kế cơ sở dữ liệu
- phân tích nhu cầu của khách hàng 
- tạo ra các bảng có mối liên hệ với nhau

## Buổi 3 
- Khởi tạo dự án: npm init --y
- thêm module: commonjs để import 
- cài: npm i nodemon để chạy refresh server mỗi khi thay đổi code
- cài: npm i express dùng để sử dụng để khởi tạo server 

## Buổi 4 
- lên web tạo database mongo 
- lấy username và password lưu vào .env 
- cài npm i env, npm i mongoose
- export thì phải đúng định dang, export default thì chỉ cần gọi tên ra thôi 

### Buổi 5 
- Mô hình MVC: model, view, controller. 
- model: quy định các trường dữ liệu.
- controller: khi người dùng gọi để xử lý 
- view: (api) để người dùng xem

- NoSQL: collection có các trường dữ liệu 
{
    ten: "Thinh", 
    kkk: "kkdjfd"
}
- Table: row có các column
1    ten      password 

### Buổi 6
- Test API với postman 
- Tạo crud với cursor AI 


### Buổi 7 
- Khi người dùng vào ai được phép được truy cập câu hỏi, tạo câu hỏi => sử dụng xác thực và phân quyền (Authentication)
- Cần cài: 
- npm i jsonwebtoken: 
    Xác thực người dùng: Sau khi đăng nhập, server tạo một token gửi cho client.

    Trao đổi thông tin an toàn: Token chứa dữ liệu (ví dụ: user ID, quyền hạn) và được ký để đảm bảo không bị sửa đổi.

    Không cần lưu session trên server: Giúp hệ thống nhẹ, dễ mở rộng
- npm i bcrypt 
    dùng để mã hoá (hash) mật khẩu trước khi lưu vào cơ sở dữ liệu, giúp bảo vệ mật khẩu nếu dữ liệu bị lộ.

- access token: dùng để khi người dùng đã đăng nhập , thì khi tắt ứng dụng thì khi người dùng 
bật lên thì tự động đăng nhập vào app 
=> Thường được cấp 15 phút - 1 tiếng

- refresh token: dùng để cấp khi access token hết hạn, nếu refresh token cũng hết hạn người dùng phải đăng nhập lại 
=> Thường được cấp 1 tuần - 2 tuần

- đăng ký(register): tạo user mới sử dụng hashpassword (để mã hóa mật khẩu tránh bị hack cơ sở dữ liệu), với tạo access token, refresh token để lần sau khỏi cần đăng nhập 

- đăng nhập(login): kiểm tra user có tồn tại hay chưa(so sánh password với password mình đã nhập thông qua hàm mã hóa(hashedPassword)) , với tạo access token, refresh token để lần sau khỏi cần đăng nhập 

# Buổi 8
- Phân quyền sử dụng middle wares 

- authorization: thì sử dụng token của header để 
verify với token bí mật của mình(JWT.SECRET)
=> Nếu đúng thì giải mã ra payload, sai thì báo lỗi 

- verifyAdmin: nếu là admin thì mới được xóa, sửa, xóa câu hỏi chẳng hạn

- verifyTeacher: nếu là teacher thì có thể thêm, 
xóa, sửa câu hỏi 

# Buổi 9 JWT Refresh Token 
- Work flow: 
- Khi access token hết hạn 
- Nếu refresh token cũng hết hạn -> lỗi 
- Nếu refresh token chưa hết hạn -> 
    tạo access token mới 
    tạo refresh token mới 
    hash refresh token lưu vào mongodb 
    return client 

- Xử lý lỗi tập trung tránh xử dụng try, catch 
- Sử dụng thư viện npm i async-error-handler để nó trong middle ware, và sử dụng cuối cùng trong app 
- AppError extend error cũng để xử lý lỗi

