import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import SelectCars from "./components/SelectCars";
import PaymentMethods from "./components/PaymentMethods";
import Selected from "./context/Selected";
import LoadWrapper from "./context/Wrapper";
import RoutingContext from "./context/RoutingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Taxi Go",
  description: "Generated by create next app",
};

const myPublishableKey =
  "pk_test_dG9waWNhbC1uZXd0LTI5LmNsZXJrLmFjY291bnRzLmRldiQ";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={myPublishableKey}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Selected>
            <RoutingContext>
              <LoadWrapper>
                <Navbar />
                {children}
              </LoadWrapper>
            </RoutingContext>
          </Selected>
        </body>
      </html>
    </ClerkProvider>
  );
}
