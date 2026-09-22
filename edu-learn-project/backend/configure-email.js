'use strict';

// Interactive email configuration script
// Run: node configure-email.js

const readline = require('readline');
const db = require('./db');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function displayEmailBanner(currentConfig) {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   DRIVE MH - Email Configuration Setup                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  console.log(`Current Email: ${currentConfig?.email || 'ptthong.www@gmail.com'}`);
  console.log(`Password: ${currentConfig?.password ? '***configured***' : '❌ NOT SET'}\n`);
}

async function verifyAndSendTestEmail(finalEmail, password, finalFromName) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: finalEmail, pass: password }
  });

  await transporter.verify();
  console.log('✅ Email connection verified!\n');
  const info = await transporter.sendMail({
    from: `"${finalFromName}" <${finalEmail}>`,
    to: finalEmail,
    subject: '✅ Email Configuration Successful - DRIVE MH',
    text: 'Your email configuration is working correctly.',
    html: `<h1>✅ Email Configuration Successful!</h1><p>From: ${finalFromName} &lt;${finalEmail}&gt;</p>`
  });
  console.log(`✅ Test email sent! Message ID: ${info.messageId}`);
}

async function promptEmailInputs() {
  const email = await question('Enter sender email (default: ptthong.www@gmail.com): ');
  const finalEmail = email.trim() || 'ptthong.www@gmail.com';
  const password = await question('Enter Gmail App Password (16 chars): ');

  if (!password || password.trim().length < 10) {
    console.log('\n❌ Invalid password. Please provide a valid App Password.');
    rl.close();
    process.exit(1);
  }

  const fromName = await question('Enter sender name (default: DRIVE MH - Học viện trực tuyến): ');
  const finalFromName = fromName.trim() || 'DRIVE MH - Học viện trực tuyến';
  return { finalEmail, password: password.trim(), finalFromName };
}

async function configureEmail() {
  const currentConfig = await db.get("SELECT * FROM email_config WHERE id = 'main'");
  displayEmailBanner(currentConfig);

  const { finalEmail, password, finalFromName } = await promptEmailInputs();
  console.log('\n💾 Saving configuration...');

  try {
    const now = new Date().toISOString();
    await db.run(
      `INSERT OR REPLACE INTO email_config (id, service, host, port, secure, email, password, from_name, updated_at)
       VALUES ('main', 'gmail', 'smtp.gmail.com', 587, 0, ?, ?, ?, ?)`,
      [finalEmail, password, finalFromName, now]
    );
    console.log('✅ Configuration saved successfully!\n');
    await verifyAndSendTestEmail(finalEmail, password, finalFromName);
  } catch (error) {
    console.error('\n❌ Failed configuration test/save:', error.message);
  }

  rl.close();
}

configureEmail().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});