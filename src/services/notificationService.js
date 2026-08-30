// Notification Service — isolated so simulated in-app notifications can be
// swapped for Firebase Cloud Messaging / SMS fallback later without
// touching UI components.

let idCounter = 1000

export function createNotification(title, message, type = 'info') {
  idCounter += 1
  return {
    id: `n${idCounter}`,
    title,
    message,
    type,
    time: 'Just now',
    read: false,
  }
}

export const templates = {
  queueApproaching: (aheadCount) => createNotification(
    'Queue Update',
    `Your token is approaching. ${aheadCount} farmer${aheadCount === 1 ? '' : 's'} ${aheadCount === 1 ? 'is' : 'are'} ahead of you.`,
    'queue'
  ),
  yourTurn: (token, counter = 2) => createNotification(
    'Your Turn',
    `Token ${token} — please proceed to Counter ${counter}.`,
    'queue'
  ),
  procurementCompleted: (quantity, crop) => createNotification(
    'Procurement Completed',
    `Your procurement of ${quantity} of ${crop} has been successfully recorded.`,
    'procurement'
  ),
  paymentInitiated: (amount) => createNotification(
    'Payment Update',
    `Your payment of ₹${amount.toLocaleString('en-IN')} has been initiated.`,
    'payment'
  ),
}
