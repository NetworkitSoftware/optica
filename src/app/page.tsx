import Image from "next/image";
import Link from "next/link";
import { assetPath, CATALOG_ITEMS } from "@/lib/catalog";

const getBrandFont = (brand: string) => {
  if (brand === "Louis Vuitton") return "font-serif tracking-normal text-gray-800";
  if (brand === "Ray-Ban") return "font-serif italic tracking-wide text-red-600";
  if (brand === "Burberry") return "font-sans font-black tracking-widest text-gray-900";
  if (brand === "Vera Wang") return "font-serif font-light tracking-widest text-gray-600";
  return "font-sans text-gray-400";
};

export default function Home() {
  const oftalmicos = CATALOG_ITEMS.filter(i => i.category === "oftalmico");
  const sol = CATALOG_ITEMS.filter(i => i.category === "sol");

  return (
    <div className="w-full flex flex-col min-h-screen relative">
      
      {/* Global SVG Waves for the rest of the page (starts below Hero) */}
      <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 w-[200%] h-[80%] opacity-[0.04] animate-wave-slow text-primary" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0,160 C240,320, 480,0, 720,160 C960,320, 1200,0, 1440,160 L1440,320 L0,320 Z" fill="currentColor"></path>
        </svg>
        <svg className="absolute bottom-0 w-[200%] h-[70%] opacity-[0.06] animate-wave-fast text-primary-dark" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0,160 C240,0, 480,320, 720,160 C960,0, 1200,320, 1440,160 L1440,320 L0,320 Z" fill="currentColor"></path>
        </svg>
        <svg className="absolute bottom-0 w-[200%] h-[60%] opacity-[0.08] animate-wave-slow text-primary-darker" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M0,160 C240,240, 480,80, 720,160 C960,240, 1200,80, 1440,160 L1440,320 L0,320 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Hero Section (Uses CSS Fluid Background) */}
      <section className="relative w-full h-[90vh] min-h-[750px] flex items-center animated-fluid-bg overflow-hidden py-16">
        {/* Overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-bold w-max shadow-sm flex items-center gap-2 mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 5.5 6 .6-4.5 4 1.3 5.9L12 16l-5.3 3 1.3-5.9-4.5-4 6-.6L12 3z" fill="currentColor"/></svg>
              NUEVO Prueba virtual con realidad aumentada
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md mb-8">
              El lujo de probarte el mundo<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">
                desde tu casa
              </span>
            </h1>
            <p className="text-lg text-blue-100 max-w-lg font-medium drop-shadow-sm mb-10">
              Más que Óptica. Descubre el catálogo de Óptica López y pruébate cientos de monturas en vivo con realidad aumentada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/ar" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all hover:scale-105 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="14" height="13" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M16 11l5-3v9l-5-3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="12.5" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                Probar gafas en AR
              </Link>
              <a href="#oftalmicos" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-full text-lg font-bold shadow-sm transition-all hover:scale-105">
                Ver catálogo
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative h-[600px] flex justify-center items-center">
            {/* Phone Mockup */}
            <div className="relative w-[300px] h-[580px] bg-black rounded-[40px] border-[12px] border-black shadow-2xl overflow-hidden animate-float">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-[16px] z-20"></div>
              {/* Screen */}
              <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                <Image src={assetPath("/glasses/g4.jpg")} alt="AR App Mockup" fill className="object-cover opacity-90" />
                
                {/* Phone UI Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="text-white font-bold text-lg">Ray-Ban Aviator Classic</div>
                  <div className="text-gray-300 text-sm mb-4">Prueba virtual activa</div>
                  <Link href="/ar?product=2" className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded-2xl flex justify-center items-center gap-2 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="14" height="13" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M16 11l5-3v9l-5-3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="12.5" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                    Probar en mi rostro
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Chips */}
            <div className="absolute top-[20%] -left-4 bg-white text-gray-900 px-5 py-3 rounded-2xl shadow-xl border border-gray-100 font-bold text-sm animate-float flex flex-col" style={{ animationDelay: '1s' }}>
              <span className="text-xs text-gray-500 font-medium">Funciona en</span>
              100% tu navegador
            </div>
            
            <div className="absolute bottom-[25%] -right-8 bg-[#025090] text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-sm animate-float flex items-center gap-3" style={{ animationDelay: '2s' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 12a8 8 0 1 1-3.2-6.4L20 4v5h-5" stroke="#34e6cf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-200 font-medium leading-tight">Comparar</span>
                <span>Antes / Después</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas Exclusivas */}
      <section id="marcas" className="py-24 bg-white/10 backdrop-blur-md border-b border-white/20 scroll-mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Catálogo Premium</p>
            <h2 className="text-3xl font-bold text-primary">Marcas Exclusivas</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 transition-all duration-500">
            <span className="text-3xl font-black font-serif text-gray-800 hover:text-primary transition-colors cursor-pointer">Louis Vuitton</span>
            <span className="text-3xl font-black font-serif italic text-gray-800 hover:text-primary transition-colors cursor-pointer">Ray-Ban</span>
            <span className="text-3xl font-black font-serif text-gray-800 hover:text-primary transition-colors cursor-pointer">BURBERRY</span>
            <span className="text-3xl font-black font-serif tracking-widest text-gray-800 hover:text-primary transition-colors cursor-pointer">VERA WANG</span>
          </div>
        </div>
      </section>

      {/* Catálogo: Lentes Oftálmicos */}
      <section id="oftalmicos" className="py-24 bg-transparent scroll-mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Lentes Oftálmicos</h2>
              <p className="text-gray-600 max-w-xl">Precisión visual y estilo. Encuentra la montura perfecta que complemente tus rasgos faciales para el día a día.</p>
            </div>
            <a href="#" className="hidden md:inline-flex text-primary font-semibold hover:text-primary-dark transition-colors">Ver todos &rarr;</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {oftalmicos.map(item => (
              <div key={item.id} className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl hover:bg-white/20 transition-all flex flex-col">
                <div className="relative w-full h-56 bg-white/40 rounded-2xl mb-3 overflow-hidden flex items-center justify-center">
                  <Image src={item.images[0]} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <Link href={`/ar?product=${item.id}`} className="absolute opacity-0 group-hover:opacity-100 bg-white text-primary px-6 py-2 rounded-full font-semibold shadow-lg transition-all translate-y-4 group-hover:translate-y-0">
                    Probar en AR
                  </Link>
                </div>
                {/* 3 Angles Thumbnails */}
                <div className="flex gap-2 mb-6">
                  {item.images.map((img, idx) => (
                    <div key={idx} className="relative w-full h-16 bg-gray-50/50 rounded-lg overflow-hidden border border-gray-100 hover:border-primary transition-colors cursor-pointer">
                      <Image src={img} alt={`Angulo ${idx+1} de ${item.name}`} fill sizes="100px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col flex-grow justify-end">
                  <p className={`text-xs uppercase mb-2 ${getBrandFont(item.brand)}`}>{item.brand}</p>
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo: Lentes de Sol */}
      <section id="sol" className="py-24 bg-transparent border-t border-white/20 scroll-mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Lentes de Sol</h2>
              <p className="text-gray-600 max-w-xl">Protección UV superior con diseños de lujo. Luce espectacular protegiendo tu vista con las mejores marcas del mundo.</p>
            </div>
            <a href="#" className="hidden md:inline-flex text-primary font-semibold hover:text-primary-dark transition-colors">Ver todos &rarr;</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sol.map(item => (
              <div key={item.id} className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl hover:bg-white/20 transition-all flex flex-col">
                <div className="relative w-full h-56 bg-white/40 rounded-2xl mb-3 overflow-hidden flex items-center justify-center">
                  <Image src={item.images[0]} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <Link href={`/ar?product=${item.id}`} className="absolute opacity-0 group-hover:opacity-100 bg-primary text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all translate-y-4 group-hover:translate-y-0">
                    Probar en AR
                  </Link>
                </div>
                {/* 3 Angles Thumbnails */}
                <div className="flex gap-2 mb-6">
                  {item.images.map((img, idx) => (
                    <div key={idx} className="relative w-full h-16 bg-white/50 rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-colors cursor-pointer">
                      <Image src={img} alt={`Angulo ${idx+1} de ${item.name}`} fill sizes="100px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col flex-grow justify-end">
                  <p className={`text-xs uppercase mb-2 ${getBrandFont(item.brand)}`}>{item.brand}</p>
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sucursales */}
      <section id="sucursales" className="py-24 animated-fluid-bg text-white overflow-hidden scroll-mt-20 relative z-10">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 21c-5-5-8-9-8-12a8 8 0 1 1 16 0c0 3-3 7-8 12z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2"/></svg>
              </div>
              <h2 className="text-4xl font-bold mb-6">Siempre cerca de ti</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">Contamos con más de 20 sucursales a nivel nacional en República Dominicana. Visítanos en Santo Domingo, Santiago, San Francisco de Macorís, La Vega y Bávaro para realizarte un examen visual experto.</p>
              <a href="https://www.google.com/maps/search/Optica+Lopez+Republica+Dominicana" target="_blank" rel="noopener noreferrer" className="inline-block bg-white hover:bg-gray-100 text-primary px-8 py-3.5 rounded-full text-base font-bold shadow-xl transition-all">
                Ver Mapa Completo
              </a>
            </div>
            <div className="flex-1 w-full h-[400px] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xl flex items-center justify-center relative">
               <iframe 
                 src="https://maps.google.com/maps?q=Optica%20Lopez%20Republica%20Dominicana&t=&z=12&ie=UTF8&iwloc=&output=embed"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={false} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
               ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
