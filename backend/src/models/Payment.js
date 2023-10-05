const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({    // 스키마 생성
    user: {     // 구매한 사람
        type: Object
    },
    data: {     // 결제 정보
        type: Array,
        default: []
    },
    product: {      // 구매한 상품 정보
        type: Array,
        default: []
    }
}, { timestamps: true })

const Payment = mongoose.model("Payment", paymentSchema);    // 스키마 이용해서 Model 생성

module.exports = Payment;