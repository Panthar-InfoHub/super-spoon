'use client'
import React, { useState } from 'react'

const InputComp = () => {
    const [email, setEmail] = useState('');
    const [loading , setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipientEmail: email }),
            });

            if (response.ok) {
                alert('You will be notified soon!');
            } else {
                alert('Failed to send notification. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('An error occurred. Please try again later.');
        }finally{
            setEmail("")
            setLoading(false)
        }
    }
    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit} >
            <input disabled={loading} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="py-3 px-2 bg-gray-200 placeholder:text-gray-500 rounded-xl outline-none w-full" />
            <button type="submit" className="btn py-3 rounded-xl transition-all duration-200 w-full disabled:disAbleBtn " disabled={loading} > Get Notified </button>
        </form>
    )
}

export default InputComp
