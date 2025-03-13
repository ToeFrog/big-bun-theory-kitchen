
/**
 * Twilio Messaging service for sending SMS notifications
 * This uses the Twilio API for sending actual SMS messages
 */

import axios from 'axios';

export interface SmsMessage {
  to: string;
  body: string;
}

/**
 * Send an SMS message using Twilio
 */
export const sendSms = async (message: SmsMessage): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  console.log('Sending SMS via Twilio API:', message);
  
  // Validate phone number format (simple validation)
  if (!message.to.match(/^\+?[0-9]{10,15}$/)) {
    console.error('Invalid phone number format');
    return {
      success: false,
      error: 'Invalid phone number format'
    };
  }

  try {
    // Get Twilio credentials from environment variables
    const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID || 'AC00000000000000000000000000000000';
    const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN || '00000000000000000000000000000000';
    const fromNumber = import.meta.env.VITE_TWILIO_PHONE_NUMBER || '+15555555555';

    // Format the Twilio API request
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const payload = new URLSearchParams();
    payload.append('To', message.to);
    payload.append('From', fromNumber);
    payload.append('Body', message.body);

    // Send request to Twilio API
    const response = await axios.post(url, payload, {
      auth: {
        username: accountSid,
        password: authToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('SMS sent successfully, message ID:', response.data.sid);
    
    return {
      success: true,
      messageId: response.data.sid
    };
  } catch (error: any) {
    console.error('Error sending SMS via Twilio:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to send SMS'
    };
  }
};

/**
 * Format a phone number to E.164 format for Twilio
 * Converts various phone formats to the +1XXXXXXXXXX format required by Twilio
 */
export const formatPhoneForTwilio = (phone: string): string => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Add country code if needed (assuming US/Canada numbers)
  if (digitsOnly.length === 10) {
    return `+1${digitsOnly}`;
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+${digitsOnly}`;
  }
  
  // If already has plus, return as is
  if (phone.startsWith('+')) {
    return phone;
  }
  
  // Default case, just add plus (might not be valid for all countries)
  return `+${digitsOnly}`;
};
