function DropdownFAQ() {
  const customStyle = {
    width: "100%",
    textAlign: "left",
    backgroundColor: "#fff",
    margin: "20px 0px",
    border: "1px solid #F58C4D",
    borderRadius: "10px",
    padding: "10px",
  };

  const faqStyle = {
    backgroundColor: "#F58C4D",
    color: "#fff",
    padding: "12px",
    fontWeight: "bold",
    fontSize: "1.5rem",
  };

  return (
    <>
      <div className="container">
        {/* FAQ #1 */}
        <div className="FAQ-1">
          <div className="faq-title" style={{ ...customStyle, ...faqStyle }}>
            1. Khi ở KTX cần lưu ý điều gì?{" "}
          </div>

          <div style={{ ...customStyle }}>
            <div className="faq-content">
              <h6 style={{ fontWeight: "bolder" }}>
                Ký túc xá có một số điều cần lưu ý khi ở như sau:
              </h6>
              <div className="text-wrap">
                <ul>
                  <li>Không được nuôi vật nuôi, thú cưng (chó, mèo,...).</li>
                  <li>
                    Không được uống rượu, bia, chơi cờ bạc, sử dụng các chất
                    kích thích và chất cấm.
                  </li>
                  <li>Không được nấu ăn trong ký túc xá.</li>
                  <li>
                    Không được đưa người lạ không ở trong ký túc xá vào phòng
                    sau giờ giới nghiêm.
                  </li>
                  <li>
                    Giờ giới nghiêm trong ký túc xá là sau 10 giờ 30 phút tối.
                  </li>
                  <li>Giữ gìn vệ sinh chung và đổ rác trước 9 giờ sáng.</li>
                </ul>
                <h6 style={{ fontWeight: "bolder" }}>
                  Tất cả các lỗi vi phạm đều bị trừ dựa trên điểm uy tín dựa
                  trên mức độ lỗi vi phạm.
                </h6>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ #2 */}
        <div className="FAQ-2">
          <div className="faq-title" style={{ ...customStyle, ...faqStyle }}>
            2. Làm thế nào để gửi yêu cầu tới Ban Quản lý KTX{" "}
          </div>

          <div style={{ ...customStyle }}>
            <div className="faq-content">
              <div className="text-wrap">
                <ul>
                  <li>
                    Bước 1: Vào chức năng{" "}
                    <span style={{ fontWeight: "bolder" }}>My Request</span>
                  </li>
                  <li>
                    Bước 2: Bấm vào nút{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      Create new request.{" "}
                    </span>{" "}
                    Chọn{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      loại yêu cầu (Type request){" "}
                    </span>
                    thích hợp.
                  </li>
                  <li>
                    Bước 3: Điền nội dung của yêu cầu ở phần{" "}
                    <span style={{ fontWeight: "bolder" }}>Content</span>.
                  </li>
                  <li>
                    Bước 4: Bấm vào nút{" "}
                    <span style={{ fontWeight: "bolder" }}>Create request</span>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DropdownFAQ;

// {data.map((item) => (
//   <div key={item.faqId}>
//     <h1 key={item.title}>{item.title}</h1>
//     <h2 key={item.subTitle}>{item.subTitle}</h2>
//     <h3 key={item.content}>{item.content}</h3>
//   </div>
// ))}
