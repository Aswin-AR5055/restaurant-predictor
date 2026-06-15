function DashboardCard({
    title,
    value
}) {

    return (
        <div
            className="
                bg-slate-800
                rounded-xl
                p-6
                shadow-lg
                hover:scale-105
                transition
            "
        >
            <h3
                className="
                    text-gray-400
                    text-sm
                "
            >
                {title}
            </h3>

            <h2
                className="
                    text-white
                    text-3xl
                    font-bold
                    mt-2
                "
            >
                {value}
            </h2>
        </div>
    );
}

export default DashboardCard;