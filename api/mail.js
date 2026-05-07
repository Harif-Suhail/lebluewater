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

    // Create email content
    const emailContent = `
Name: ${name}
Email: ${mail}
Phone: ${phone}
Products: ${products}
Quantity: ${quantity}
    `.trim();

    // Configure your email service here
    // Option 1: Gmail (uncomment to use)
    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
      },
    });
    */

    // Option 2: Generic SMTP (uncomment to use)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: 'info@lebluewater.com',
      subject: 'Order from Le Blue Website',
      html: `
        <h2>New Order Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${mail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Products:</strong> ${products}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
      `,
      text: emailContent,
      replyTo: mail,
    });

    console.log('Email sent:', info.messageId);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Order sent successfully. We will contact you soon.',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
      details: error.message,
    });
  }
}
