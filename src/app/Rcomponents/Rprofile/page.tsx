import Image from 'next/image';
import { useState } from 'react';

export default function RProfile() {
  // State variables for name and phone number
  const [name, Name] = useState('User');
  const [email, Email] = useState('user@gmail.com');
  const [phone, Phone] = useState('9800000000');
  const [username, Username] = useState('user123');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image 
            src="/admin.png" 
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => Name(e.target.value)}
            className="text-xl font-bold bg-transparent border-none outline-none text-white"
          />
          <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            value={email}
            onChange={(e) => Email(e.target.value)}
            className="text-gray-400 bg-transparent border-none outline-none mt-1"
          />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="bg-green-600 text-xs font-medium py-1 px-3 rounded-full">ACTIVE</span>
          </div>
        </div>
      </div>
      
      <div>
          <input
            type="text"
            value={phone}
            onChange={(e) => Phone(e.target.value)}
            className="text-gray-400 bg-transparent border-none outline-none mt-1"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => Username(e.target.value)}
            className="text-gray-400 bg-transparent border-none outline-none mt-1"
          />
      </div>
    </div>
  );
}
