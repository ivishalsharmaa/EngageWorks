import SmoothScrollProvider from "./components/SmoothScrollProvider";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";

export const metadata = {
  title: "Engage Works | Digital Marketing & Web Development",
  description: "We build brands that convert. Premium digital agency.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white relative">
        <ScrollToTop />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
