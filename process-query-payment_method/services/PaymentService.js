const axios = require('axios');

class PaymentService {
  async createPayment() {
    const url = 'https://api.mercadopago.com/checkout/preferences';

    const body = {
      payer_email: 'test_user_49925203@testuser.com',
      items: [
        {
          title: 'Title',
          currency_id: 'COP',
          description: 'descripcion',
          picture_url: 'prueba',
          category_id: 'cat123',
          quantity: 1,
          unit_price: 100000
        }
      ],
      back_urls: {
        succes: '/success',
        failure: '/failure',
        pending: '/pending'
      },
      notification_url: 'https://www.your-site.com/ipn'
    };

    const payment = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

  async createSubscription() {
    const url = 'https://api.mercadopago.com/preapproval';

    const body = {
      reason: 'Suscripcion de ejemplo',
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: 100000,
        currency_id: 'COP'
      },
      back_url: 'https://google.com',
      payer_email: 'test_user_49925203@testuser.com'
    };

    const subscription = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
