'use client'

import { useRouter } from 'next/router';
import { useState, FormEvent }  from 'react';


export default function LoginPage(){

    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
    


    try{

        const response = await fetch('https://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        if(data.token){
            localStorage.setItem('token', data.token);
        }

        router.push('/dashboard');


    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }

    }

};