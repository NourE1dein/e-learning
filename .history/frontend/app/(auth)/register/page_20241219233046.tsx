'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    // Prepare the data to be sent
    const data = {
      email,
      password,
    };

    try {
      // Send POST request to backend login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., redirect or show success)
        console.log('Login successful', result);
        // Redirect or save user session here
      } else {
        // Handle error (e.g., show error message)
        setErrorMessage(result.message || 'Login failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login to your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
