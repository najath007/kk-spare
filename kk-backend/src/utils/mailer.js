const nodemailer = require('nodemailer');

// Singleton pattern to reuse the ethereal account during the server lifecycle
let testAccount = null;

async function getTransporter() {
  if (!testAccount) {
    testAccount = await nodemailer.createTestAccount();
  }
  
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

async function sendOrderEmail(userEmail, userName, orderId, status, total) {
  try {
    const transporter = await getTransporter();
    
    let subject = `Update on your KK Spare Parts Order #${orderId}`;
    let message = `Hello ${userName}, your order #${orderId} has been updated.`;
    
    const trackingLink = `http://localhost:5173/track-order`;
    const brandColor = '#ff5e14';

    if (status === 'pending' || status === 'confirmed') {
      subject = `Order Confirmed: KK Spare Parts #${orderId}`;
      message = `Great news! Your order #${orderId} totaling $${total} has been confirmed and is being processed.`;
    } else if (status === 'shipped') {
      subject = `Your Order #${orderId} has Shipped! 🚚`;
      message = `Your order #${orderId} is on the way! Keep an eye on it using our tracking dashboard.`;
    } else if (status === 'delivered') {
      subject = `Your Order #${orderId} has been Delivered 🏠`;
      message = `Your spare parts have arrived. Time to get back on the road!`;
    } else if (status === 'cancelled') {
      subject = `Order Cancelled: #${orderId}`;
      message = `Your order #${orderId} has been cancelled.`;
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
          <h1 style="color: ${brandColor}; margin: 0; font-style: italic; font-weight: 900;">KK SPARE PARTS</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #333;">Hello ${userName},</h2>
          <p style="font-size: 16px; color: #555; line-height: 1.5;">${message}</p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f8fafc; border-left: 4px solid ${brandColor};">
            <p style="margin: 0; font-weight: bold; color: #333;">Order ID: #${orderId}</p>
            <p style="margin: 5px 0 0 0; color: #666;">Current Status: <strong style="text-transform: uppercase;">${status}</strong></p>
          </div>

          <div style="text-align: center; margin-top: 40px;">
            <a href="${trackingLink}" style="background-color: ${brandColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Track Your Order</a>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; color: #888; font-size: 12px;">
          © ${new Date().getFullYear()} KK Spare Parts. The Rider's Choice Since 2000.
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: '"KK Spare Parts Support" <no-reply@kkspareparts.com>',
      to: userEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log(`Email sent for Order #${orderId} (${status}). URL: ${nodemailer.getTestMessageUrl(info)}`);
    return nodemailer.getTestMessageUrl(info);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

module.exports = { sendOrderEmail };
