import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../components/ui/ui-components';
import { CreditCard, ArrowLeftCircle, RefreshCw } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotals, resetCart} from '../../redux/orebiSlice';

const Payment = ({ onBack = () => {}, onPaymentComplete = () => {} }) => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [refundStatus, setRefundStatus] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0); // Track payment amount
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const dispatch = useDispatch();

  const products = useSelector((state) => state.orebiReducer.products);
  const { subtotal, shippingCharge, total } = useSelector(selectCartTotals);

  const handlePayment = () => {
    if (paymentStatus === 'success') return; // Prevent duplicate payments

    // Simulate payment processing
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setPaymentAmount(total); // Set the payment amount
      onPaymentComplete();
    }, 2000);
  };

  const handleRefund = () => {
    if (paymentStatus !== 'success') {
      setRefundStatus('error');
      return 0; // Return 0 if no payment was made
    }

    // Simulate refund processing
    setRefundStatus('processing');
    setTimeout(() => {
      setRefundStatus('success');
      alert(`A refund of $${paymentAmount} has been processed.`);
      dispatch(resetCart());
      setPaymentAmount(0);
      setPaymentStatus('');
    }, 2000);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeftCircle className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">Payment Gateway</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${item.price * item.quantity}</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>${shippingCharge}</p>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <p>Total</p>
                  <p>${total}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="card" onValueChange={setSelectedPaymentMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-2 border rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="p-2 border rounded"
                  />
                </div>
              </TabsContent>

              <TabsContent value="bank">
                <div className="space-y-4">
                  <p className="text-sm">Bank: Example Bank</p>
                  <p className="text-sm">Account: 1234-5678-9012</p>
                  <p className="text-sm">Reference: ORD-{Date.now()}</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-4">
              <button
                onClick={handlePayment}
                disabled={paymentStatus === 'processing'}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {paymentStatus === 'processing' ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <CreditCard className="h-5 w-5" />
                )}
                {paymentStatus === 'processing' ? 'Processing...' : 'Pay Now'}
              </button>

              <button
                onClick={handleRefund}
                disabled={refundStatus === 'processing'}
                className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 disabled:bg-gray-100"
              >
                {refundStatus === 'processing' ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  'Request Refund'
                )}
              </button>
            </div>

            {paymentStatus === 'success' && (
              <Alert className="mt-4 bg-green-50 border-green-200">
                <AlertTitle>Payment Successful!</AlertTitle>
                <AlertDescription>
                  Your order has been confirmed and will be shipped soon.
                </AlertDescription>
              </Alert>
            )}

            {refundStatus === 'success' && (
              <Alert className="mt-4 bg-blue-50 border-blue-200">
                <AlertTitle>Refund Requested</AlertTitle>
                <AlertDescription>
                  A total payment of ${paymentAmount} has been refunded and will be processed within 3-5 business days.
                </AlertDescription>
              </Alert>
            )}

            {refundStatus === 'error' && (
              <Alert className="mt-4 bg-red-50 border-red-200">
                <AlertTitle>Refund Failed</AlertTitle>
                <AlertDescription>
                  You have not completed a payment. Refund is not possible.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
