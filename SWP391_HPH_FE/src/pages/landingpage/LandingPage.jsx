import logo from "./images/Logo.png";
import contentbanner from "./images/content-banner.png";
import "./styleLanding.css";
import CarouselHeader from "./CarouselHeader";
import infoImg1 from "./images/info-1.jpg";
import infoImg2 from "./images/info-2.jpg";
import infoImg3 from "./images/info-3.jpg";
import DropdownFAQ from "./DropdownFAQ";
import { Link, Navigate, useNavigate } from "react-router-dom";
export default function LandingPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (user) {
    const path = "/" + user.roleName.toLowerCase();
    return <Navigate to={`${path}`} replace />;
  }
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic"
        rel="stylesheet"
        type="text/css"
      />

      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <img src={logo} />
          <Link className="btn btn-orange" to="login">
            Login
          </Link>
        </div>
      </nav>

      {/* Masthead*/}
      <header style={{ paddingBottom: "25px" }}>
        {/* Slider here */}
        <CarouselHeader />
        {/* Slider end here */}
      </header>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <img
                className="d-block mx-auto img-fluid rounded"
                src={contentbanner}
                alt="Banner"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-4 mb-3">
              <div
                className="rounded p-3"
                style={{
                  backgroundColor: "#F48120",
                }}
              >
                <h4
                  className="text-white"
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  Thông tin KTX Đại Học FPT
                </h4>

                <p
                  className="lead mb-0 text-white"
                  style={{ cursor: "pointer" }}
                >
                  Thông tin{" "}
                  <a href="#dorm-info" className="text-white">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="16"
                        viewBox="0 0 22 16"
                        fill="none"
                      >
                        <path
                          d="M13.6667 1L21 8M21 8L13.6667 15M21 8H1"
                          stroke="white"
                        />
                      </svg>
                    </span>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div
                className="rounded p-3"
                style={{
                  backgroundColor: "#F48120",
                }}
              >
                <h4
                  className="text-white"
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => navigate("login")}
                >
                  Đăng kí sử dụng Ký túc xá
                </h4>
                <p
                  className="lead mb-0 text-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("login")}
                >
                  Đăng kí{" "}
                  <a href="#" className="text-white">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="16"
                        viewBox="0 0 22 16"
                        fill="none"
                      >
                        <path
                          d="M13.6667 1L21 8M21 8L13.6667 15M21 8H1"
                          stroke="white"
                        />
                      </svg>
                    </span>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div
                className="rounded p-3"
                style={{
                  backgroundColor: "#F48120",
                }}
              >
                <h4 className="text-white" style={{ fontWeight: "bold" }}>
                  Các câu hỏi thường gặp
                </h4>
                <p className="lead mb-0 text-white">
                  FAQ{" "}
                  <a href="#FAQ" className="text-white">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="16"
                        viewBox="0 0 22 16"
                        fill="none"
                      >
                        <path
                          d="M13.6667 1L21 8M21 8L13.6667 15M21 8H1"
                          stroke="white"
                        />
                      </svg>
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Showcases*/}
      <section className="showcase" id="dorm-info">
        <div className="container">
          <div className="row mb-5">
            <h1
              className="text-center p-4"
              style={{
                fontFamily: "monospace",
                color: "#F48120",
                fontWeight: "bold",
              }}
            >
              Thông tin Ký túc xá Đại Học FPT
            </h1>
            <div className="col-lg-5 order-lg-2 col-xs-12 text-white">
              <img src={infoImg1} alt="" className="img-fluid w-100" />
            </div>
            <div className="col-lg-7 order-lg-1 col-xs-12 d-flex align-items-end">
              <p
                className=" mb-0 "
                style={{
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  fontSize: "16px",
                  lineHeight: "180%",
                }}
              >
                Trường Đại học FPT là một trong những ngôi trường nổi tiếng đào
                tạo đa ngành, với chất lượng đào tạo đạt chuẩn quốc tế. Trường
                không chỉ quan tâm đến chất lượng đào tạo, công tác tuyển sinh
                mà còn chăm lo cho đời sống sinh viên.
                <p>
                  Bằng việc đầu tư, xây dựng khu{" "}
                  <span style={{ color: "#F48120", fontWeight: "bold" }}>
                    Ký túc xá
                  </span>{" "}
                  xịn sò. Đầy đủ trang thiết bị cần thiết, không gian thoáng
                  mát, sạch sẽ. Để đáp ứng nhu cầu và tạo không gian học tập,
                  sinh hoạt thoải mái nhất cho sinh viên.{" "}
                  <span style={{ color: "#F48120", fontWeight: "bold" }}>
                    KTX
                  </span>{" "}
                  cũng được xem như ngôi nhà thứ 2 của nhiều sinh viên.
                </p>
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-lg-8 text-white col-xs-12">
              <img src={infoImg2} alt="" className="img-fluid w-100" />
            </div>
            <div className="col-lg-4 col-xs-12 d-flex align-items-end justify-content-end">
              <p
                className=" mb-0 "
                style={{
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  fontSize: "16px",
                  lineHeight: "180%",
                }}
              >
                {" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  Ký túc xá của trường Đại học FPT là chỗ ở dành riêng cho sinh
                  viên của Đại học FPT.
                </span>{" "}
                <br /> Hiện nay, một vấn đề các bạn tân sinh viên sau khi biết
                kết quả trúng tuyển Đại học. Đó là tìm kiếm cho mình một chỗ ở
                phù hợp, vừa tiết kiệm vừa đảm bảo an ninh, môi trường học tập.
                Không chỉ các tân sinh viên mà các bạn sinh viên các khóa trước
                hầu hết cũng đều mong muốn ở tại{" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  KTX
                </span>{" "}
                trường để thuận lợi cho việc di chuyển. Và để tiết kiệm chi phí,
                có một trường trường để học tập và sinh hoạt.
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-lg-12 order-lg-1 col-xs-12 text-white d-flex justify-content-center">
              <img src={infoImg3} alt="" className="img-fluid w-100" />
            </div>
            <div className="col-lg-12 col-xs-12 order-lg-2 ">
              <p
                className=" mb-0"
                style={{
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  fontSize: "16px",
                  lineHeight: "180%",
                }}
              >
                {" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  Ký túc xá trường Đại học FPT được xây dựng với thiết kế hiện
                  đại, thoáng mát và đầy đủ tiện nghi.
                </span>{" "}
                <br /> Khu{" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  KTX
                </span>{" "}
                gồm các tòa nhà. Mỗi tòa{" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  KTX
                </span>{" "}
                có các tầng rộng rãi, sạch sẽ, có cả wifi, máy bán nước tự động,
                máy giặt sấy tự động... Xung quanh còn là cây cối xanh mướt
                trong lành, dễ chịu, thoáng mát. Phòng ở được thiết kế hiện đại,
                không gian thoải mái, thiết kế phù hợp cho từng loại phòng
                3-4-6-8 người. Mỗi phòng sẽ được trang bị các thiết bị cần
                thiết, đầy đủ phục vụ cho những nhu cầu thiết yếu của sinh viên
                như giường tầng, bàn học, giá phơi quần áo, bình nóng lạnh, điều
                hòa, tủ để giày, nhà vệ sinh riêng cho mỗi phòng… giúp sinh viên
                an tâm học tập trong quãng thời gian gắn bó với đại học FPT, đem
                đến cho sinh viên cảm giác thoải mái tiện nghi như ở nhà.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials*/}
      <section className="testimonials text-center bg-light" id="FAQ">
        <div className="container">
          <h1
            className="text-center mb-5"
            style={{
              fontFamily: "monospace",
              color: "#F48120",
              fontSize: "72px",
              fontWeight: "bold",
            }}
          >
            FAQ
          </h1>

          <DropdownFAQ />
        </div>
      </section>

      {/* Footer*/}
      <footer className="footer bg-light">
        <div className="container">
          <div className="row" style={{ textAlign: "center" }}>
            <hr style={{ borderColor: "#F48120", borderWidth: "4px" }} />
            <div className="col-lg-12">
              <h3
                style={{
                  fontWeight: "bold",
                  color: "#F48120",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                Hà Nội
              </h3>
              <p>
                {" "}
                Khu Giáo dục và Đào tạo - Khu Công nghệ cao Hòa Lạc <br />
                KM29 Đại Lộ Thăng Long, H. Thạch Thất, TP. Hà Nội
              </p>

              <p>Điện thoại: 024 7300 1866</p>

              <p>Email: daihocfpt@fpt.edu.vn</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
