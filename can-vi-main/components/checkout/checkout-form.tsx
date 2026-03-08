'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  matchId: string;
  ticketCount: number;
  totalAmount: number;
  onSuccess?: () => void;
}

export function CheckoutForm({
  matchId,
  ticketCount,
  totalAmount,
  onSuccess,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setIsLoading(false);
      return;
    }

    try {
      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess?.();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('[v0] Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 p-6">
        <PaymentElement />
      </div>

      <div className="space-y-2 rounded-lg bg-gray-50 p-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">Tickets:</span>
          <span className="text-sm text-gray-900">{ticketCount}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2">
          <span className="font-semibold text-gray-900">Total:</span>
          <span className="font-semibold text-gray-900">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </Button>
    </form>
  );
}
