import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 md:p-10 bg-slate-900">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
