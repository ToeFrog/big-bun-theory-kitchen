
/**
 * Twilio Messaging service for sending SMS notifications
 * This is a stub implementation that can be replaced with actual Twilio API calls
 */

export interface SmsMessage {
  to: string;
  body: string;
}

/**
 * Send an SMS message using Twilio
 */
export const sendSms = async (message: SmsMessage): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  // This is a stub function - in a real implementation, this would call the Twilio API
  console.log('Sending SMS via Twilio:', message);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate phone number format (simple validation)
  if (!message.to.match(/^\+?[0-9]{10,15}$/)) {
    console.error('Invalid phone number format');
    return {
      success: false,
      error: 'Invalid phone number format'
    };
  }
  
  // In a production environment, you would use Twilio SDK with API credentials
  // const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // const result = await twilioClient.messages.create({
  //   body: message.body,
  //   to: message.to,
  //   from: process.env.TWILIO_PHONE_NUMBER
  // });
  
  // Simulate successful message delivery
  const messageId = `msg_${Math.random().toString(36).substring(2, 10)}`;
  console.log('SMS sent successfully, message ID:', messageId);
  
  return {
    success: true,
    messageId
  };
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
