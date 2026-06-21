import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Poppins, Rubik_Puddles } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins', // Defines the CSS variable name
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-orbitron',
});

const rubikPuddles = Rubik_Puddles({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rubik-puddles',
});

export const metadata: Metadata = {
  title: "Dr.coder",
  description: "simple portfolio to make the client confidence",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!['en', 'ar'].includes(locale)) {
    notFound();
  }
  
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const messages = await getMessages();
  return (
    <html lang={locale} dir={direction} className={`${poppins.variable} ${orbitron.variable} ${rubikPuddles.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="w-[85%] mx-auto  flex flex-col flex-1 items-center justify-center font-sans ">
            {children}
          </div>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
