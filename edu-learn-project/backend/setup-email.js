'use strict';

// Setup script to configure email settings
// Run this script to configure email for the application

const db = require('./db');

function printConfigInstructions() {
  console.log('⚠️  Email password is not configured!');
  console.log('📝 To configure email, generate an App Password:');
  console.log('   - https://myaccount.google.com/security -> App passwords');
  console.log('   EMAIL_PASSWORD=your-app-password node setup-email.js\n');
}

async function testEmailDelivery() {
  console.log('📧 Testing email sending...');
  const { sendOrderConfirmationEmail } = require('./emailService');
  const testResult = await sendOrderConfirmationEmail(
    'TEST-' + Date.now(),
    'ptthong.www@gmail.com',
    'Test User',
    {
      items: [{ product_name: 'Test Course', price: 100000 }],
      total: 100000,
      payment_method: 'bank_transfer'
    }
  );

  if (testResult.success) {
    console.log('✅ Test email sent successfully! Message ID:', testResult.messageId);
  } else {
    console.log('❌ Failed to send test email:', testResult.error);
  }
}

async function setupEmail() {
  try {
    console.log('🔧 Setting up email configuration...\n');
    const config = await db.get("SELECT * FROM email_config WHERE id = 'main'");
    console.log('Email:', config?.email || 'ptthong.www@gmail.com');
    console.log('Password:', config?.password ? '***configured***' : '❌ NOT SET\n');

    if (!config || !config.password || config.password.trim() === '') {
      printConfigInstructions();
    } else {
      console.log('✅ Email is configured!');
      await testEmailDelivery();
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
}

// Check if EMAIL_PASSWORD is provided as environment variable
if (process.env.EMAIL_PASSWORD) {
  console.log('🔑 Found EMAIL_PASSWORD in environment, updating configuration...');
  
  db.run(
    `INSERT OR REPLACE INTO email_config (id, service, host, port, secure, email, password, from_name, updated_at)
     VALUES ('main', 'gmail', 'smtp.gmail.com', 587, 0, 'ptthong.www@gmail.com', ?, 'DRIVE MH - Học viện trực tuyến', ?)`,
    [process.env.EMAIL_PASSWORD, new Date().toISOString()]
  ).then(() => {
    console.log('✅ Email configuration updated!');
    console.log('   Email: ptthong.www@gmail.com');
    console.log('   Password: ***configured***');
    console.log('');
    return setupEmail();
  }).catch(err => {
    console.error('Error updating config:', err);
    process.exit(1);
  });
} else {
  setupEmail();
}