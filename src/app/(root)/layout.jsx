import Footer from "@/src/components/my_components/Footer";
import LenisDiv from "@/src/components/my_components/LenisDiv";
import Navbar from "@/src/components/my_components/Navbar";

export default function RootLayout({ children }) {
    return (
        <LenisDiv>
            <main className="pt-2 bg-[#FAF9F6] flex flex-col gap-5 w-screen min-h-screen overflow-hidden" >
                <Navbar />
                {children}
                <Footer />
            </main>
        </LenisDiv>
    )
}