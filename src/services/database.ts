
/**
 * Database service for persisting user notification data
 * This is a stub implementation that can be replaced with actual database calls
 */

export interface NotificationSubscription {
  id?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
}

// In-memory store for subscriptions when no database is available
const inMemorySubscriptions: NotificationSubscription[] = [];

/**
 * Save a new notification subscription to the database
 */
export const saveSubscription = async (
  data: Omit<NotificationSubscription, 'id' | 'createdAt'>
): Promise<NotificationSubscription> => {
  console.log('Saving subscription to database:', data);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create subscription object
  const subscription: NotificationSubscription = {
    id: `sub_${Math.random().toString(36).substring(2, 10)}`,
    ...data,
    createdAt: new Date()
  };
  
  // In a production environment, this would save to a real database
  // For now, we'll store it in memory
  inMemorySubscriptions.push(subscription);
  
  console.log('Subscription saved:', subscription);
  return subscription;
};

/**
 * Get all subscriptions from the database
 */
export const getSubscriptions = async (): Promise<NotificationSubscription[]> => {
  console.log('Fetching all subscriptions');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return the in-memory subscriptions
  return [...inMemorySubscriptions];
};
