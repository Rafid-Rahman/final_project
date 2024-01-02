"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

interface SubscriptionPackage {
  id: number;
  name: string;
  features: string;
  price: number;
}

const SubscriptionPage: React.FC = () => {
  const [subscriptionPackages, setSubscriptionPackages] = useState<SubscriptionPackage[]>([]);
  const userId='';

  useEffect(() => {
    axios.get<SubscriptionPackage[]>('http://localhost:3000/prd/subscription_packages')
      .then(response => {console.log('Backend Response:', response.data);
        setSubscriptionPackages(response.data)})
      .catch(error => console.error('Error fetching subscription packages:', error));
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptionPackages.map(subscriptionPackage => (
            <div
              key={subscriptionPackage.id}
              className="bg-white p-6 rounded-lg shadow-lg text-black"
            >
              <h2 className="text-2xl font-semibold mb-4">{subscriptionPackage.name}</h2>
              <p className="text-gray-600 mb-4">{subscriptionPackage.features}</p>
              <p className="text-3xl font-bold text-green-500 mb-4">${subscriptionPackage.price}</p>
              <Link href="http://localhost:3001/prd/subscription_packages/payment">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
                  Subscribe Now
                </button>
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center">
          Already have an account?{' '}
          <a href="http://localhost:3001/prd/auth/login" className="underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
export default SubscriptionPage;
