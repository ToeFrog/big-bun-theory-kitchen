
/**
 * Twilio Messaging service for sending SMS notifications
 * This uses a browser-compatible approach to handle SMS requests
 */

export interface SmsMessage {
  to: string;
  body: string;
}

/**
 * Send an SMS message using Twilio via an API endpoint
 * This is a mock implementation for the browser environment
 */
export const sendSms = async (message: SmsMessage): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  console.log('SMS would be sent with:', message);
  
  // Validate phone number format (simple validation)
  if (!message.to.match(/^\+?[0-9]{10,15}$/)) {
    console.error('Invalid phone number format');
    return {
      success: false,
      error: 'Invalid phone number format'
    };
  }

  try {
    // In a production environment, you would:
    // 1. Send this request to your backend API
    // 2. The backend would use the Twilio SDK to send the actual SMS
    // For now, we'll simulate a successful response
    
    const mockMessageId = 'SM' + Math.random().toString(36).substring(2, 15);
    
    console.log('SMS simulation successful, mock message ID:', mockMessageId);
    return {
      success: true,
      messageId: mockMessageId
    };
  } catch (error: any) {
    console.error('Error in SMS simulation:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to send SMS'
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
