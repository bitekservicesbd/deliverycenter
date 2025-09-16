const TopButton = ({ icon: Icon, label, onClick, type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="flex flex-col items-center rounded bg-slate-200 px-3 py-2 hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-800"
        >
            <Icon className="text-2xl text-orange-400" />
            <p className="mt-1 text-center text-sm">{label}</p>
        </button>
    );
};

export default TopButton;
