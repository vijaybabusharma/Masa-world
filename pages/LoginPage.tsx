
import React, { useState } from 'react';
import { NavigationProps } from '../types';

const LoginPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Mock authentication
        setTimeout(() => {
            if (email === 'member@masa.world' && password === 'password123') {
                sessionStorage.setItem('masa_member_auth', 'true');
                navigateTo('dashboard');
            } else {
                setError('Invalid credentials. Please try again.');
            }
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-3xl font-bold text-center mb-1 text-masa-charcoal">Member Login</h2>
                    <p className="text-center text-gray-500 mb-8">Access your dashboard.</p>
                    
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none"
                                required
                            />
                        </div>
                        <div className="text-right">
                            <a href="#" className="text-sm font-medium text-masa-blue hover:underline">Forgot password?</a>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-masa-blue text-white py-3 rounded-full font-bold text-lg hover:bg-blue-900 transition-colors disabled:bg-gray-400"
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                     <div className="text-center text-xs text-gray-400 mt-4">
                        <p>For demo, use:</p>
                        <p>Email: <b>member@masa.world</b></p>
                        <p>Password: <b>password123</b></p>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                    </div>

                    <button className="w-full bg-masa-orange text-white py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
                        Login with OTP
                    </button>
                </div>
                 <p className="text-center text-gray-500 mt-6">
                    Not a member yet?{' '}
                    <button onClick={() => navigateTo('membership')} className="font-bold text-masa-blue hover:underline">
                        Join Now
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;