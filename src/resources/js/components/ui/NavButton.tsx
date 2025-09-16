const NavButton = ({ label, onClick, type = 'button', className = '' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`border-r border-r-slate-400 bg-slate-300 px-5 py-3 font-medium hover:bg-orange-500 hover:text-white dark:bg-zinc-600 dark:hover:bg-orange-800 ${className}`}
        >
            {label}
        </button>
    );
};

export default NavButton;
