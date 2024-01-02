"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PaymentPage: React.FC = () => {
 const router = useRouter();
 const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
 const [cardNumber, setCardNumber] = useState<string>('');

 const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setSelectedPaymentMethod(event.target.value);
 };

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   console.log('Selected Payment Method:', selectedPaymentMethod);
   console.log('Card Number:', cardNumber);

   router.push('http://localhost:3001/prd/auth/signup');
 };

 return (
  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-gray-800 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Select Payment Method:</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="visa"
                value="visa"
                checked={selectedPaymentMethod === 'visa'}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="visa">Visa</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="mastercard"
                value="mastercard"
                checked={selectedPaymentMethod === 'mastercard'}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="mastercard">MasterCard</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="amex"
                value="amex"
                checked={selectedPaymentMethod === 'amex'}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="amex">American Express</label>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Submit Payment
        </button>
      </form>
    </div>
  </div>
);
};

export default PaymentPage;
