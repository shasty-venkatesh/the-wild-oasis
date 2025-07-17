import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationProvider";

const joseFont = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Wild Oasis",
    default: "Welcome | Wild Oasis",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${joseFont.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <header>
          <Header />
        </header>
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
