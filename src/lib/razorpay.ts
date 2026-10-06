import Razorpay from 'razorpay';

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

export const getRazorpayInstance = () => {
  if (!keyId || !keySecret) {
    return null;
  }
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export const getRazorpayKeyId = () => {
  return keyId || 'rzp_test_placeholder';
};