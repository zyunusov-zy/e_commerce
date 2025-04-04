import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
    return ( 
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="w-full">
                {children}
            </main>
            <Footer/>
        </div>
     );
}

export default MainLayout;