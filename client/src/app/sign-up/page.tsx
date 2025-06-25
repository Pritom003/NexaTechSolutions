/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { registerUserWithFormData } from '@/services/Authservice';
import Link from 'next/link';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');
  setSuccessMessage('');

  try {
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
     
    };

    const formdata = new FormData();
    formdata.append('formdata', JSON.stringify(userData));

    // Optional: debug log
    for (const [key, value] of formdata.entries()) {
      console.log(`${key}: ${value}`);
    }

    const result = await registerUserWithFormData(formdata);
    console.log(result);

    if (result?.success) {
      setSuccessMessage('Account created successfully!');
    } else {
      setError(result?.message || 'Something went wrong');
    }
  } catch (err) {
    setError('Failed to register. Please try again.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Register
        </button>
  {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
