import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import React from 'react';

const CentralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="container mx-auto px-6 py-6">{children}</div>
            <Footer />
        </div>
    );
};

export default CentralLayout;
