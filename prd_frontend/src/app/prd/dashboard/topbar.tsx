import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';


interface TopBarProps {
  userRole: string;
}

const TopBar: React.FC<TopBarProps> = ({ userRole }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold">Top Bar</h2>
        <nav className="mt-4">
          <ul className="flex space-x-4">
            <li>
              <Link href={`http://localhost:3001/prd/auth/profile`} className="hover:underline">
                View Profile
              </Link>
            </li>
            <li>
              <Link href={`http://localhost:3001/prd/dashboard/${userRole}/notice`} className="hover:underline">
                Notice
              </Link>
            </li>
            <li>
              <Link href={`http://localhost:3001/prd/dashboard/${userRole}/message`} className="hover:underline">
                Message
              </Link>
            </li>
            <li>
              <Link href={`http://localhost:3001/prd/dashboard/${userRole}/document`} className="hover:underline">
                Document
              </Link>
            </li>
            <li>
              <Link href={`http://localhost:3001/prd/dashboard/${userRole}/notification`} className="hover:underline">
                Notification
              </Link>
            </li>
            <li>
              <Link href="http://localhost:3001/prd/auth/login" className="hover:underline">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
