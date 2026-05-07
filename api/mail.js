import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, mail, phone, products, quantity } = req.body;

    // Validate required fields
    if (!name || !mail || !phone || !products || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create email content
    const emailContent = `
Name: ${name}
Email: ${mail}
Phone: ${phone}
Products: ${products}
Quantity: ${quantity}
    `.trim();

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Important for some SMTP servers
      },
    });

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log('SMTP Connection successful');
    } catch (verifyError) {
      console.error('SMTP Verification failed:', verifyError.message);
      return res.status(500).json({
        success: false,
        error: 'Email service verification failed. Check your email credentials.',
        details: verifyError.message,
      });
    }

    // Send email to admin
    const adminInfo = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: 'info@lebluewater.com',
      subject: `New Order from ${name} - Le Blue Website`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Order Received</h2>
          <hr style="border: 1px solid #ddd;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${mail}">${mail}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Products:</strong> ${products}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <hr style="border: 1px solid #ddd;">
          <p style="font-size: 12px; color: #999;">This is an automated message from your website.</p>
        </div>
      `,
      text: emailContent,
      replyTo: mail,
    });

    console.log('Admin email sent:', adminInfo.messageId);

    // Send confirmation email to customer
    try {
      const customerInfo = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: mail,
        subject: 'Order Confirmation - Le Blue Mineral Water',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Order Confirmation</h2>
            <p>Dear ${name},</p>
            <p>Thank you for your order! We have received your request and will contact you shortly to confirm your order details.</p>
            <h3>Your Order Details:</h3>
            <p><strong>Product:</strong> ${products}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p>Our team will reach out to you at <strong>${phone}</strong> to finalize your order.</p>
            <hr style="border: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">Thank you for choosing Le Blue Mineral Water!</p>
          </div>
        `,
        text: `Dear ${name},\n\nThank you for your order!\n\nProduct: ${products}\nQuantity: ${quantity}\n\nWe will contact you at ${phone} to confirm.`,
      });
      console.log('Customer confirmation email sent:', customerInfo.messageId);
    } catch (customerEmailError) {
      console.warn('Failed to send customer confirmation email:', customerEmailError.message);
      // Don't fail the order if customer email fails
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Order sent successfully. We will contact you soon.',
      messageId: adminInfo.messageId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Email sending error:', error.message);
    console.error('Error details:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
      details: error.message,
    });
  }
}  
