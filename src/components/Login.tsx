import React from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import logo from '../assets/zime-logo.png';

const allowedDomain = '@zime.ai';

const Login: React.FC = () => {
  const signin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user.email || !user.email.endsWith(allowedDomain)) {
        await signOut(auth);
        alert('Access denied.');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Zime" className="h-10 w-auto" />
          <span className="mt-2 italic text-[#6f3096] text-3xl font-bold">Nucleus</span>
        </div>
        <div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to continue
          </p>
        </div>
        <div>
          <button
            onClick={signin}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 