"use client";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { CATALOG_ITEMS, FITTINGBOX } from "@/lib/catalog";

/* FittingBox Virtual Try-On Advanced (FitMix). El widget corre dentro de su
   propio iframe: gestiona el permiso de cámara, el aviso de privacidad, el
   tracking facial y el render 3D. Referencia: docs/FITTINGBOX-INTEGRATION.md
   del POC "Óptica Oviedo e-commerce AR v2". */
interface FitMixInstance {
  startVto: (mode: "live" | "photo" | "faceshape") => void;
  stopVto: () => void;
  setFrame: (gtin: string) => void;
  getSnapshot: () => void;
}

interface FitMixSnapshot {
  dataUrl: string;
  width: number;
  height: number;
}

interface FitMixParams {
  apiKey: string;
  lang?: string;
  frame?: string;
  onStopVto?: () => void;
  onSnapshot?: (data: FitMixSnapshot) => void;
  onIssue?: (issue: unknown) => void;
}

declare global {
  interface Window {
    FitMix?: {
      createWidget: (
        containerId: string,
        params: FitMixParams,
        onReady: () => void
      ) => FitMixInstance;
    };
  }
}

function downloadSnapshot(data: FitMixSnapshot | string) {
  // Según el API Reference de FittingBox, onSnapshot entrega
  // { dataUrl, width, height }; se acepta string por si acaso.
  const raw = typeof data === "string" ? data : data?.dataUrl;
  if (!raw) {
    console.warn("Snapshot sin datos de imagen:", data);
    return;
  }
  const url = raw.startsWith("data:") ? raw : `data:image/png;base64,${raw}`;
  const a = document.createElement("a");
  a.href = url;
  a.download = "mi-look-optica-lopez.png";
  a.click();
}

function ARExperience() {
  const searchParams = useSearchParams();
  const requestedId = Number(searchParams.get("product"));
  const initialIndex = Math.max(
    0,
    CATALOG_ITEMS.findIndex((p) => p.id === requestedId)
  );

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const [starting, setStarting] = useState(false);
  const [live, setLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fitmixRef = useRef<FitMixInstance | null>(null);
  const widgetPromiseRef = useRef<Promise<FitMixInstance> | null>(null);
  const liveRef = useRef(false);
  const selectedIndexRef = useRef(initialIndex);
  selectedIndexRef.current = selectedIndex;

  /* Crea el widget una sola vez y reutiliza la instancia (recomendación de
     FittingBox: pre-instanciar para que el arranque de cámara sea inmediato). */
  const ensureWidget = useCallback(() => {
    if (widgetPromiseRef.current) return widgetPromiseRef.current;

    widgetPromiseRef.current = new Promise<FitMixInstance>((resolve, reject) => {
      if (!window.FitMix) {
        reject(new Error("El motor FittingBox no está disponible."));
        return;
      }
      let settled = false;
      const done = (fn: () => void) => {
        if (!settled) {
          settled = true;
          fn();
        }
      };
      try {
        const product = CATALOG_ITEMS[selectedIndexRef.current];
        const instance = window.FitMix.createWidget(
          "fitmix-container",
          {
            apiKey: FITTINGBOX.apiKey,
            lang: FITTINGBOX.lang,
            frame: product?.gtin,
            onStopVto: () => {
              liveRef.current = false;
              setLive(false);
            },
            onSnapshot: (data) => downloadSnapshot(data),
            onIssue: (issue) => console.warn("FittingBox issue:", issue),
          },
          () => {
            fitmixRef.current = instance;
            setWidgetReady(true);
            done(() => resolve(instance));
          }
        );
        // Si el widget nunca confirma (red caída a mitad de carga), no colgar la UI.
        setTimeout(
          () => done(() => reject(new Error("FittingBox no respondió (timeout)."))),
          20000
        );
      } catch (err) {
        done(() => reject(err instanceof Error ? err : new Error(String(err))));
      }
    }).catch((err) => {
      widgetPromiseRef.current = null;
      throw err;
    });

    return widgetPromiseRef.current;
  }, []);

  const handleScriptReady = useCallback(() => {
    ensureWidget().catch((err) => {
      console.error("FittingBox no pudo inicializar:", err);
      setError("No se pudo cargar el probador virtual. Verifica tu conexión e intenta de nuevo.");
    });
  }, [ensureWidget]);

  const startVto = useCallback(async () => {
    setError(null);
    setStarting(true);
    try {
      const fm = await ensureWidget();
      const product = CATALOG_ITEMS[selectedIndexRef.current];
      if (product?.gtin) fm.setFrame(product.gtin);
      fm.startVto("live");
      liveRef.current = true;
      setLive(true);
    } catch (err) {
      console.error("FittingBox no pudo iniciar:", err);
      setError("No se pudo iniciar la prueba virtual. Verifica tu conexión e intenta de nuevo.");
    } finally {
      setStarting(false);
    }
  }, [ensureWidget]);

  const selectFrame = useCallback((index: number) => {
    setSelectedIndex(index);
    const gtin = CATALOG_ITEMS[index]?.gtin;
    if (liveRef.current && fitmixRef.current && gtin) {
      fitmixRef.current.setFrame(gtin);
    }
  }, []);

  const takeSnapshot = useCallback(() => {
    if (!liveRef.current || !fitmixRef.current) return;
    try {
      fitmixRef.current.getSnapshot();
    } catch (err) {
      console.warn("No se pudo capturar la foto:", err);
    }
  }, []);

  /* Libera la cámara al salir de la página. */
  useEffect(() => {
    return () => {
      if (fitmixRef.current && liveRef.current) {
        try {
          fitmixRef.current.stopVto();
        } catch (err) {
          console.warn(err);
        }
      }
    };
  }, []);

  const selected = CATALOG_ITEMS[selectedIndex];

  return (
    <div className="w-full min-h-screen bg-dark-bg flex flex-col relative overflow-hidden text-white font-sans">
      <Script
        src={FITTINGBOX.scriptSrc}
        strategy="afterInteractive"
        onReady={handleScriptReady}
        onError={() => {
          setScriptFailed(true);
          setError("No se pudo cargar el motor de realidad aumentada (¿sin internet?).");
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-primary-dark/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 group-hover:border-primary transition-colors bg-white">
            <Image src="/logo-optica-lopez.jpeg" alt="Óptica López Logo" fill className="object-cover" />
          </div>
          <span className="font-bold tracking-tight text-white shadow-sm">Óptica López</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Volver a la tienda
        </Link>
      </header>

      {/* Escenario AR */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-4 pb-6 gap-6">
        <div className="w-full max-w-xl">
          <div className="relative w-full h-[62vh] min-h-[420px] rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl">
            {/* Contenedor del widget FittingBox (mínimo 400×400 px). El iframe
                del widget se monta aquí y ocupa todo el recuadro. */}
            <div id="fitmix-container" className="absolute inset-0 w-full h-full"></div>

            {/* Overlay previo al arranque de la cámara */}
            {!live && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center p-8 bg-black/70 backdrop-blur-sm">
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 border-2 border-primary/50 border-t-primary rounded-full animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M3 7v-2a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2m-10 0h-2a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Probador Virtual</h1>
                  <p className="text-gray-300 max-w-sm mx-auto text-sm">
                    Pruébate <span className="font-semibold text-white">{selected?.brand} {selected?.name}</span> en
                    vivo con la tecnología de realidad aumentada de FittingBox.
                  </p>
                </div>
                {error ? (
                  <p className="text-red-300 text-sm max-w-sm">{error}</p>
                ) : null}
                <button
                  onClick={startVto}
                  disabled={starting || scriptFailed}
                  className="bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-full text-base font-bold shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="14" height="13" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M16 11l5-3v9l-5-3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="12.5" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  {starting ? "Iniciando…" : "Activar cámara"}
                </button>
                <p className="text-xs text-gray-500">
                  {widgetReady
                    ? "Motor AR listo · FittingBox gestiona el permiso de cámara"
                    : scriptFailed
                      ? "Motor AR no disponible"
                      : "Cargando motor AR…"}
                </p>
              </div>
            )}

            {/* Controles en vivo */}
            {live && (
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-3">
                <button
                  onClick={takeSnapshot}
                  title="Capturar foto"
                  className="w-12 h-12 rounded-full bg-white text-primary shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="2"/></svg>
                </button>
                <button
                  onClick={() => fitmixRef.current?.stopVto()}
                  title="Detener cámara"
                  className="w-12 h-12 rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Selector de monturas */}
        <div className="w-full max-w-xl">
          <p className="text-sm text-gray-400 mb-3 text-center">
            {live ? "Toca una montura para cambiarla en vivo" : "Elige la montura que quieres probarte"}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 px-1 justify-start md:justify-center">
            {CATALOG_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => selectFrame(index)}
                className={`shrink-0 w-24 text-left rounded-2xl border p-2 transition-all ${
                  index === selectedIndex
                    ? "border-primary bg-primary/20 shadow-lg shadow-primary/20"
                    : "border-white/15 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="relative w-full h-14 rounded-xl overflow-hidden bg-white/10 mb-1.5">
                  <Image src={item.images[0]} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
                <span className="block text-[10px] uppercase tracking-wide text-gray-400 truncate">{item.brand}</span>
                <span className="block text-[11px] font-semibold text-white truncate">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Contact Info */}
      <footer className="relative z-10 w-full p-6 bg-gradient-to-t from-black/90 to-transparent mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white">
              <Image src="/logo-optica-lopez.jpeg" alt="Óptica López Logo" fill className="object-cover" />
            </div>
            <span className="font-semibold">&copy; {new Date().getFullYear()} Óptica López.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="flex items-center gap-2 font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              809-547-1981
            </span>
            <span className="flex items-center gap-2 font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Santo Domingo, Rep. Dom.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ARPage() {
  // useSearchParams exige un límite de Suspense en el App Router.
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-dark-bg" />}>
      <ARExperience />
    </Suspense>
  );
}
