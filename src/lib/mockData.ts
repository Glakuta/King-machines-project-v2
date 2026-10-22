export const mockMachines = [
  { id: '1', name: 'Automatyczna Linia Pakowania PL-500', slug: 'automatyczna-linia-pakowania-pl-500', category: 'Linie pakujące', price: 185000, images: ['/images/machines/pl-500-1.jpg'], specifications: { Wydajność: 'do 500 opakowań/min', 'Zakres dawkowania': '10g - 5kg', 'Rodzaje opakowań': 'worki, pudełka, słoiki', Zasilanie: '400V / 50Hz / 15kW', Wymiary: '4500 x 2200 x 2100 mm', Masa: '3200 kg' }, description: '<p>Nowoczesna linia pakująca zaprojektowana do pracy ciągłej w warunkach przemysłowych. Zapewnia precyzyjne dawkowanie, hermetyczne zamknięcie opakowań i etykietowanie w jednym cyklu.</p><h3>Zastosowanie</h3><ul><li>Przemysł spożywczy</li><li>Przemysł farmaceutyczny</li><li>Przemysł chemiczny</li></ul>', shortDescription: 'Wysokoefektywna linia do pakowania produktów sypkich i kawałkowych' },
  { id: '2', name: 'Dozownik Wiązany DWM-200', slug: 'dozownik-wiazany-dwm-200', category: 'Dozowniki', price: 42000, images: ['/images/machines/dwm-200-1.jpg'], specifications: { Wydajność: 'do 200 cykli/min', 'Objętość dawki': '5ml - 500ml', Precyzja: '±0.5%', Zasilanie: '230V / 50Hz / 1.5kW', Wymiary: '800 x 600 x 1800 mm', Materiał: 'Nierdzewna 316L' }, description: '<p>Dozownik wiązany o dużej precyzji, idealny do dawania sosów, dżemów, kremów i innych produktów o zmiennej lepkości. Łatwa zmiana formatu bez narzędzi.</p>', shortDescription: 'Precyzyjny dozownik do produktów płynnych i półpłynnych' },
  { id: '3', name: 'Maszyna do Wypełniania i Zakręcania FWC-300', slug: 'maszyny-do-wypelaniania-i-zakrecania-fwc-300', category: 'Wypełniarki', price: 98000, images: ['/images/machines/fwc-300-1.jpg', '/images/machines/fwc-300-2.jpg'], specifications: { Wydajność: 'do 300 sztuk/min', 'Zakres objętości': '50ml - 2000ml', 'Rodzaje zamkowań': 'zakrętki, koreki, folia termokurczliwa', Zasilanie: '400V / 50Hz / 8kW', Wymiary: '3200 x 1800 x 2000 mm' }, description: '<p>Automatyczna maszyna do wypełniania produktów płynnych i zakręcania pokrywek. Modułowa konstrukcja pozwala na łatwą rozbudowę o dodatkowe stacje (np. foliówkowanie, etykietowanie).</p>', shortDescription: 'Kompletna stacja wypełniania i zakręcania butelek i słoików' },
  { id: '4', name: 'Etykietowarka Samoprzylepna EL-150', slug: 'etykietowarka-samoprzylepna-el-150', category: 'Etykietowanie', price: 28000, images: ['/images/machines/el-150-1.jpg'], specifications: { Wydajność: 'do 150 sztuk/min', 'Szerokość etykiety': 'do 150mm', 'Długość etykiety': 'do 300mm', 'Dokładność naklejania': '±1mm', Zasilanie: '230V / 50Hz / 0.75kW', Wymiary: '1200 x 800 x 1600 mm' }, description: '<p>Uniwersalna etykietowarka do naklejania etykiet samoprzylepnych na opakowania o różnych kształtach. Wymiana formatu w mniej niż 2 minuty.</p>', shortDescription: 'Szybka etykietowarka do butelek, słoików i opakowań płaskich' },
  { id: '5', name: 'Paletyzator Robotyczny PR-1000', slug: 'paletyzator-robotyczny-pr-1000', category: 'Paletyzacja', price: 320000, images: ['/images/machines/pr-1000-1.jpg', '/images/machines/pr-1000-2.jpg'], specifications: { Wydajność: 'do 1000 cykli/godz', 'Ładowność robota': '50 kg', 'Zasięg robota': '2000 mm', 'Wzorce paletyzacji': 'do 50 programów', Zasilanie: '400V / 50Hz / 12kW', 'Obszar roboczy': '3000 x 3000 x 2500 mm' }, description: '<p>Nowoczesny paletyzator robotyczny do układania worków, kartonów i pudełek na palety. Programowalne wzory paletyzacji, szybka zmiana formatu.</p>', shortDescription: 'W pełni automatyczny paletyzator z robotem przemysłowym 6-osiowym' },
  { id: '6', name: 'Waga Kontrolna WK-50', slug: 'waga-kontrolna-wk-50', category: 'Kontrola jakości', price: 15000, images: ['/images/machines/wk-50-1.jpg'], specifications: { Wydajność: 'do 50 sztuk/min', 'Zakres wagowy': '10g - 5kg', Precyzja: '±0.1g', Taśma: '400 x 300 mm', Zasilanie: '230V / 50Hz / 0.5kW', Interfejs: 'Ethernet, USB, RS232' }, description: '<p>Wysokoprzesja waga kontrolna do wagiń ruchomych produktów na taśmie transportowej. Automatyczne odrzucanie produktów spoza tolerancji.</p>', shortDescription: 'Dynamiczna waga kontrolna z odrzucaniem produktów niewłaściwych' },
];

export const mockArticles = [
  {
    id: '1',
    title: 'Jak wybrać odpowiednią maszynę pakującą do swojej produkcji?',
    slug: 'jak-wybrac-odpowiednia-maszyne-pakujaca',
    excerpt: 'Przewodnik po kluczowych parametrach, na które warto zwrócić uwagę przy doborze maszyny pakującej.',
    content: '<p>Wybór odpowiedniej maszyny pakującej to kluczowa decyzja dla efektywności produkcji. Warto zwrócić uwagę na wydajność, zakres dawkowania, rodzaje obsługiwanych opakowań oraz koszty eksploatacji.</p><h3>Kluczowe parametry</h3><ul><li>Wydajność (opakowań/minutę)</li><li>Zakres dawkowania</li><li>Rodzaje obsługiwanych opakowań</li><li>Precyzja dawkowania</li><li>Łatwość obsługi i czyszczenia</li></ul>',
    category: 'Poradniki',
    author: 'Jan Kowalski',
    date: '15 stycznia 2025',
    readTime: '8 min',
  },
  {
    id: '2',
    title: 'Porównanie dozowników wiązanych i tłokowych - co wybrać?',
    slug: 'porownanie-dozownikow-wiazanych-i-tlokowych',
    excerpt: 'Szczegółowe porównanie dwóch najpopularniejszych typów dozowników w przemyśle spożywczym.',
    content: '<p>Dozowniki wiązane i tłokowe to dwa główne typy urządzeń do dawania produktów. Dozowniki wiązane charakteryzują się większą precyzją przy produktach o niższej lepkości, natomiast tłokowe lepiej radzą sobie z produktami gęstymi.</p><h3>Dozowniki wiązane</h3><ul><li>Wysoka precyzja (±0.5%)</li><li>Idealne do płynów i półpłynów</li><li>Łatwa zmiana formatu</li></ul><h3>Dozowniki tłokowe</h3><ul><li>Lepsze do produktów gęstych</li><li>Większa objętość dawki</li><li>Niższa precyzja</li></ul>',
    category: 'Porównania',
    author: 'Anna Nowak',
    date: '28 grudnia 2024',
    readTime: '12 min',
  },
  {
    id: '3',
    title: 'Case Study: Automatyzacja linii produkcyjnej w zakładzie mleczarskim',
    slug: 'case-study-automatyzacja-linii-mleczarskiej',
    excerpt: 'Jak wdrożenie linii pakującej PL-500 zwiększyło wydajność o 40% i zmieniło koszty operacyjne.',
    content: '<p>Zakład mleczarski "MlekoPol" stanął przed wyzwaniem modernizacji linii produkcyjnej. Stare maszyny były awaryjne, a wydajność nie zaspokajała rosnącego popytu.</p><h3>Rozwiązanie</h3><p>Wdrożono linię pakującą PL-500 z dozwinkiem wiązanym DWM-200, etykietowarką EL-150 i paletyzatorem PR-1000.</p><h3>Efekty</h3><ul><li>Wzrost wydajności o 40%</li><li>Redukcja odpadów o 25%</li><li>Skrócenie czasu przeformatowania z 4h do 30min</li><li>ROI po 14 miesiącach</li></ul>',
    category: 'Case Studies',
    author: 'Piotr Wiśniewski',
    date: '10 grudnia 2024',
    readTime: '15 min',
  },
];

export const mockCategories = [
  { name: 'Poradniki', slug: 'poradniki', count: 12, icon: '📖' },
  { name: 'Specyfikacje', slug: 'specyfikacje', count: 8, icon: '📋' },
  { name: 'Porównania', slug: 'porownania', count: 5, icon: '⚖️' },
  { name: 'Case Studies', slug: 'case-studies', count: 7, icon: '📊' },
  { name: 'Wideo', slug: 'wideo', count: 15, icon: '▶️' },
  { name: 'FAQ', slug: 'faq', count: 20, icon: '❓' },
];