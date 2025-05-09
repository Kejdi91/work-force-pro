import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Aside from '../../components/shared/auth/Aside';
import RegisterForm from '../../components/shared/auth/RegisterForm';


const RegisterPage = () => {
    return (
        <div className='h-screen md:flex'>
            <Aside/>
            <div className='flex md:w-1/2 h-screen justify-center py-10 items-center bg-white relative'>
                <Link to="/login" className="absolute top-10 right-10">
                    <Button variant="ghost" className="cursor-pointer">Login</Button>
                </Link>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage