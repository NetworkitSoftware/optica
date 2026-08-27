// Catálogo compartido entre la tienda (/) y el probador AR (/ar).
//
// FittingBox identifica cada montura por su EAN/UPC/GTIN. Como estos productos
// son de demostración, cada uno se mapea a un GTIN del catálogo demo de
// FittingBox (verificados como `available: true` contra su Product API).
// En producción: usar el GTIN real de cada montura digitalizada por FittingBox.
export type CatalogItem = {
  id: number;
  brand: string;
  name: string;
  category: "sol" | "oftalmico";
  images: string[];
  gtin: string;
};

export const FITTINGBOX = {
  // Clave DEMO provista por FittingBox (FITTINGBOX.txt del POC Oviedo).
  // Para producción, solicitar clave a sales-cs@fittingbox.com y servir por HTTPS.
  apiKey: "TBVAcXitApiZPVH791yxdHbAc8AKzBwtCnjtv6Xn",
  lang: "es",
  scriptSrc: "https://vto-advanced-integration-api.fittingbox.com/index.js",
};

export const CATALOG_ITEMS: CatalogItem[] = [
  { id: 1, brand: "Louis Vuitton", name: "LV Clash Square", category: "sol", gtin: "8053672727708", images: [
    "/glasses/g1.jpg", "/glasses/g2.jpg", "/glasses/g3.jpg"
  ]},
  { id: 2, brand: "Ray-Ban", name: "Aviator Classic", category: "sol", gtin: "8053672909258", images: [
    "/glasses/g4.jpg", "/glasses/g1.jpg", "/glasses/g2.jpg"
  ]},
  { id: 3, brand: "Burberry", name: "BE4291 Rectangular", category: "sol", gtin: "3617064485260", images: [
    "/glasses/g3.jpg", "/glasses/g4.jpg", "/glasses/g1.jpg"
  ]},
  { id: 4, brand: "Vera Wang", name: "VW514 Essential", category: "oftalmico", gtin: "716736368207", images: [
    "/glasses/g2.jpg", "/glasses/g3.jpg", "/glasses/g4.jpg"
  ]},
  { id: 5, brand: "Ray-Ban", name: "Clubmaster Optics", category: "oftalmico", gtin: "8056597233958", images: [
    "/glasses/g1.jpg", "/glasses/g3.jpg", "/glasses/g4.jpg"
  ]},
  { id: 6, brand: "Louis Vuitton", name: "LV Link Optical", category: "oftalmico", gtin: "716736989341", images: [
    "/glasses/g4.jpg", "/glasses/g2.jpg", "/glasses/g1.jpg"
  ]},
];
