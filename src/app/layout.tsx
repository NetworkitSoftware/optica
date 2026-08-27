import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Óptica López | República Dominicana",
  description: "Descubre la óptica del futuro. Pruébate cientos de monturas con realidad aumentada.",
  icons: {
    icon: "/logo-optica-lopez.jpeg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased select-none`}>
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 group-hover:border-primary transition-colors bg-white">
                  <Image src="/logo-optica-lopez.jpeg" alt="Óptica López Logo" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-gray-900">Óptica López</span>
                  <span className="text-xs font-semibold tracking-widest text-primary uppercase">República Dominicana</span>
                </div>
              </Link>
              
              <nav className="hidden md:flex gap-8">
                <Link href="/#oftalmicos" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Lentes oftálmicos</Link>
                <Link href="/#sol" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Lentes de sol</Link>
                <Link href="/#marcas" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Marcas Exclusivas</Link>
                <Link href="/#sucursales" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Sucursales</Link>
              </nav>

              <div className="flex items-center gap-4">
                <Link href="/ar" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="14" height="13" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M16 11l5-3v9l-5-3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="12.5" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  Probar en AR
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white">
                  <Image src="/logo-optica-lopez.jpeg" alt="Óptica López Logo" fill className="object-cover" />
                </div>
                <span className="text-lg font-bold">Óptica López</span>
              </div>
              <p className="text-sm text-gray-400">Desde hace 55 años dedicados a la mejor visión de los dominicanos.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Productos</h4>
              <ul className="flex flex-col gap-2 text-sm text-gray-400">
                <li><Link href="/#oftalmicos" className="hover:text-white transition-colors">Lentes oftálmicos</Link></li>
                <li><Link href="/#sol" className="hover:text-white transition-colors">Lentes de sol</Link></li>
                <li><Link href="/#marcas" className="hover:text-white transition-colors">Marcas de Lujo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Servicios</h4>
              <ul className="flex flex-col gap-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Examen Visual</Link></li>
                <li><Link href="/ar" className="hover:text-white transition-colors">Prueba AR Virtual</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Taller Óptico</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Contacto</h4>
              <ul className="flex flex-col gap-2 text-sm text-gray-400 mb-4">
                <li>Santo Domingo, Rep. Dom.</li>
                <li>Av. Abraham Lincoln #1015</li>
                <li>809-547-1981 / 809-567-6085</li>
              </ul>
              <a href="https://www.instagram.com/lopezopticard?igsh=MTU0ank5ZzdoaG5qeQ==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>@lopezopticard</span>
              </a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 flex justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Óptica López. Todos los derechos reservados.</p>
            <div className="flex gap-6 items-center">
              <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
              <Link href="#" className="hover:text-white transition-colors">Términos</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
