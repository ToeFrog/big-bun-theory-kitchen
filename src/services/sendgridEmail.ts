
/**
 * SendGrid Email service for sending email notifications
 * This uses the SendGrid API for sending actual emails
 */

import axios from 'axios';

export interface EmailMessage {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send an email using SendGrid
 */
export const sendEmail = async (email: EmailMessage): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  console.log('Sending email via SendGrid API:', email);
  
  // Validate email format
  if (!email.to.match(/\S+@\S+\.\S+/)) {
    console.error('Invalid email format');
    return {
      success: false,
      error: 'Invalid email format'
    };
  }

  try {
    // Get SendGrid API key from environment variables
    const apiKey = import.meta.env.VITE_SENDGRID_API_KEY || 'SG.0000000000000000000000000000000000000000000000';
    const fromEmail = import.meta.env.VITE_FROM_EMAIL || 'noreply@bigbuntheory.com';
    
    // Format the SendGrid API request
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const payload = {
      personalizations: [
        {
          to: [{ email: email.to }],
          subject: email.subject,
        },
      ],
      from: { email: fromEmail, name: 'Big Bun Theory' },
      content: [
        {
          type: 'text/plain',
          value: email.text || '',
        }
      ]
    };

    // Add HTML content if provided
    if (email.html) {
      payload.content.push({
        type: 'text/html',
        value: email.html,
      });
    }

    // Send request to SendGrid API
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Generate a pseudo messageId since SendGrid doesn't return one in the same way
    const messageId = `email_${Math.random().toString(36).substring(2, 10)}`;
    console.log('Email sent successfully via SendGrid, message ID:', messageId);
    
    return {
      success: true,
      messageId
    };
  } catch (error: any) {
    console.error('Error sending email via SendGrid:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to send email'
    };
  }
};

/**
 * Generate HTML for the welcome email
 */
export const generateWelcomeEmailHtml = (email: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #503c3b; text-align: center;">Big Bun Theory</h1>
      <h2 style="color: #d97706; text-align: center;">We're Coming Soon!</h2>
      <p style="font-size: 16px; line-height: 1.5; color: #333;">
        Thank you for signing up to be notified when we launch. We'll send an email to <strong>${email}</strong> as soon as we open our doors.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333;">
        Get ready for a delicious culinary adventure where gourmet burgers meet theoretical physics!
      </p>
      <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f9f5f3; border-radius: 10px;">
        <p style="font-style: italic; color: #666;">
          "The only theory that matters is how good our burgers taste."
        </p>
      </div>
      <p style="text-align: center; margin-top: 30px; font-size: 14px; color: #777;">
        © ${new Date().getFullYear()} Big Bun Theory. All rights reserved.
      </p>
    </div>
  `;
};
