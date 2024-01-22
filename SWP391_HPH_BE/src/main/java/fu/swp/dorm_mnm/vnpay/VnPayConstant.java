package fu.swp.dorm_mnm.vnpay;

import org.springframework.beans.factory.annotation.Value;

public class VnPayConstant {

    public static String vnp_Version = "2.1.0";
    public static String vnp_Command = "2.1.0";

    @Value("tmn-code")
    public static String vnp_TmnCode;

    @Value("{hash-secret}")
    public static String vnp_HashSecret;

    public static String vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static String vnp_BankCode = "NCB";

    public static String vnp_CurrCode = "VND";
    // public static String vnp_IpAddr = "0:0:0:0:0:0:0:1";
    public static String vnp_Locale = "vn";
    public static String vnp_ReturnUrl = "http://localhost:5173/api/vnpay/payment_infor";

    // public static String vnp_ReturnUrl = "localhost/success";

    // public static String vnp_ExpireDate = "";

    // vpn_Ammount = tien *100;
    // vpn_OrderInfo = Mo ta;
    // public static String vnp_OrderType = "200000";
    // vnp_TxnRef ma tham chieu giao dich (unique);
}
