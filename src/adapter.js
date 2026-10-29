"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IyzicoAdapter = void 0;
const contract_1 = require("./contract");
class IyzicoAdapter {
    toSession(request) {
        const buyer = request.buyer;
        const billing = request.billingAddress;
        const shipping = request.shippingAddress;
        const basketItems = request.basket.map((item, index) => ({
            id: item.id || `BI${index + 1}`,
            name: item.name.slice(0, 100),
            category1: item.category.slice(0, 100),
            itemType: "PHYSICAL",
            price: item.price,
        }));
        return {
            locale: request.locale === "en" ? "en" : "tr",
            conversationId: request.reference,
            price: request.amount,
            paidPrice: request.amount,
            currency: request.currency,
            basketId: request.cartId || request.reference,
            paymentGroup: "PRODUCT",
            callbackUrl: request.callbackUrl,
            enabledInstallments: [1, 2, 3, 6, 9, 12],
            buyer: {
                id: buyer.id || buyer.email || "BY1",
                name: buyer.name || "Müşteri",
                surname: buyer.surname || "Müşteri",
                gsmNumber: buyer.phone || "+905555555555",
                email: buyer.email,
                identityNumber: buyer.identityNumber || "11111111111",
                registrationAddress: buyer.address || "Adres",
                ip: buyer.ip || "127.0.0.1",
                city: buyer.city || "İstanbul",
                country: buyer.country || "Turkey",
                zipCode: buyer.postalCode || "34000",
            },
            shippingAddress: {
                contactName: `${shipping.name} ${shipping.surname}`.trim() || buyer.name,
                city: shipping.city || buyer.city || "İstanbul",
                country: shipping.country || buyer.country || "Turkey",
                address: shipping.address || buyer.address || "Adres",
                zipCode: shipping.postalCode || buyer.postalCode || "34000",
            },
            billingAddress: {
                contactName: `${billing.name} ${billing.surname}`.trim() || buyer.name,
                city: billing.city || buyer.city || "İstanbul",
                country: billing.country || buyer.country || "Turkey",
                address: billing.address || buyer.address || "Adres",
                zipCode: billing.postalCode || buyer.postalCode || "34000",
            },
            basketItems,
        };
    }
    fromSession(request, response) {
        const token = typeof response.token === "string" ? response.token : null;
        const checkoutFormContent = typeof response.checkoutFormContent === "string" ? response.checkoutFormContent : "";
        const paymentPageUrl = typeof response.paymentPageUrl === "string" ? response.paymentPageUrl : null;
        if (!checkoutFormContent && !paymentPageUrl) {
            throw new contract_1.PaymentError("iyzico ödeme formu içeriği üretilemedi.", "invalid_response");
        }
        return {
            reference: request.reference,
            providerReference: token,
            mode: "html",
            htmlContent: checkoutFormContent,
            paymentPageUrl,
            token,
            raw: response,
        };
    }
    toVerify(request) {
        const token = request.token || request.body.token;
        if (!token || typeof token !== "string") {
            throw new contract_1.PaymentError("iyzico callback doğrulama için token gerekli.", "invalid_request");
        }
        return {
            locale: "tr",
            conversationId: request.reference || "",
            token,
        };
    }
    fromVerify(request, response) {
        const isSuccess = response.status === "success" && response.paymentStatus === "SUCCESS";
        const reference = response.conversationId || request.reference || "";
        const providerReference = response.paymentId || response.token || null;
        if (!isSuccess) {
            return {
                reference,
                providerReference,
                status: "failed",
                errorMessage: response.errorMessage || "Ödeme iyzico tarafından onaylanmadı.",
            };
        }
        return {
            reference,
            providerReference,
            status: "captured",
            paidAmount: typeof response.paidPrice === "string" ? response.paidPrice : null,
            installment: typeof response.installment === "number" ? response.installment : 1,
            cardFamily: response.cardFamily || null,
            lastFourDigits: response.lastFourDigits || null,
            acknowledgmentBody: JSON.stringify({ status: "success" }),
        };
    }
}
exports.IyzicoAdapter = IyzicoAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBUW1CO0FBRW5CLE1BQWEsYUFBYTtJQUN4QixTQUFTLENBQUMsT0FBOEI7UUFDdEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtRQUMzQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFBO1FBQ3RDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUE7UUFFeEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsRUFBRTtZQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztZQUM3QixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztZQUN0QyxRQUFRLEVBQUUsVUFBVTtZQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQyxDQUFDLENBQUE7UUFFSCxPQUFPO1lBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDN0MsY0FBYyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQ2pDLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTTtZQUNyQixTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDekIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxTQUFTO1lBQzdD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