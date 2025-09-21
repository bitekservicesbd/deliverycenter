import React from 'react';

const PageNav = ({ children, className = '' }) => {
    return <div className={`custom-nav-color z-10 block w-full ${className}`}>{children}</div>;
};

export default PageNav;
