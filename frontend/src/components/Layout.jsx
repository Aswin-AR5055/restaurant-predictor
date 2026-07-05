import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-slate-900 pb-20 md:pb-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
