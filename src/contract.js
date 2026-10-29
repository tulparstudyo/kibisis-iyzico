"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentError = exports.PAYMENT_API_VERSION = void 0;
/**
 * Kibisis payment contract, apiVersion 1.
 */
exports.PAYMENT_API_VERSION = 1;
class PaymentError extends Error {
    constructor(message, code = "payment_error") {
        super(message);
        this.name = "PaymentError";
        this.code = code;
    }
}
exports.PaymentError = PaymentError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNVLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxDQUFBO0FBK0hwQyxNQUFhLFlBQWEsU0FBUSxLQUFLO0lBR3JDLFlBQVksT0FBZSxFQUFFLElBQUksR0FBRyxlQUFlO1FBQ2pELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFBO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7Q0FDRjtBQVJELG9DQVFDIn0=