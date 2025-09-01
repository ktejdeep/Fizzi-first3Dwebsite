import localFont from 'next/font/local'
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./app.css";
import Header from '@/components/header';
import ViewCanvas from '@/components/ViewCanvas';
import Footer from '@/components/Footer';

const fredoka_font = localFont({
  src: "../../public/fonts/Fredoka-VariableFont_wdth\,wght.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-fredoka",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fredoka_font.variable}>
      <body className='bg-yellow-300 overflow-x-hidden'>
        <Header />
        <main>{ children }
              <ViewCanvas/>
          </main>
          <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
