import type { WPMachine, WPArticle, Machine, Article, Category } from '../types/wp';

const WP_URL = import.meta.env.WP_URL || 'https://your-wordpress-site.com';
const WP_API = `${WP_URL}/wp-json/wp/v2`;

function getAuthHeaders(): Record<string, string> {
  const username = import.meta.env.WP_USERNAME;
  const password = import.meta.env.WP_APP_PASSWORD;
  
  if (username && password) {
    const credentials = btoa(`${username}:${password}`);
    return { 'Authorization': `Basic ${credentials}` };
  }
  return {};
}

async function fetchWP<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${WP_API}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`WP API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

function transformMachine(wpMachine: WPMachine): Machine {
  const acf = wpMachine.acf || {};
  const featuredMedia = wpMachine._embedded?.['wp:featuredmedia']?.[0];
  
  return {
    id: String(wpMachine.id),
    name: wpMachine.title.rendered,
    slug: wpMachine.slug,
    category: acf.category || 'Inne',
    price: acf.price,
    shortDescription: acf.short_description,
    description: wpMachine.content.rendered,
    specifications: acf.specifications,
    images: acf.images?.map(img => img.source_url) || [],
    featuredImage: featuredMedia?.source_url || acf.images?.[0]?.source_url,
  };
}

function transformArticle(wpArticle: WPArticle): Article {
  const featuredMedia = wpArticle._embedded?.['wp:featuredmedia']?.[0];
  const author = wpArticle._embedded?.author?.[0];
  const categoryTerm = wpArticle._embedded?.['wp:term']?.[0]?.[0];
  
  const wordCount = wpArticle.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  
  return {
    id: String(wpArticle.id),
    title: wpArticle.title.rendered,
    slug: wpArticle.slug,
    excerpt: wpArticle.excerpt.rendered.replace(/<[^>]*>/g, ''),
    content: wpArticle.content.rendered,
    category: categoryTerm?.name || 'Ogólne',
    author: author?.name,
    date: new Date(wpArticle.date).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: featuredMedia?.source_url,
    readTime: `${readTime} min`,
  };
}

export async function getMachines(): Promise<Machine[]> {
  try {
    const data = await fetchWP<WPMachine[]>('/machines?per_page=100&_embed=true&acf_format=standard');
    return data.map(transformMachine);
  } catch (error) {
    console.error('Error fetching machines:', error);
    return getMockMachines();
  }
}

export async function getMachineBySlug(slug: string): Promise<Machine | null> {
  try {
    const data = await fetchWP<WPMachine[]>(`/machines?slug=${slug}&_embed=true&acf_format=standard`);
    if (data.length === 0) return null;
    return transformMachine(data[0]);
  } catch (error) {
    console.error('Error fetching machine:', error);
    return getMockMachines().find(m => m.slug === slug) || null;
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const data = await fetchWP<WPArticle[]>('/posts?per_page=100&_embed=true');
    return data.map(transformArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return getMockArticles();
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await fetchWP<WPArticle[]>(`/posts?slug=${slug}&_embed=true`);
    if (data.length === 0) return null;
    return transformArticle(data[0]);
  } catch (error) {
    console.error('Error fetching article:', error);
    return getMockArticles().find(a => a.slug === slug) || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const machines = await getMachines();
    const categoryMap = new Map<string, number>();
    
    machines.forEach(m => {
      categoryMap.set(m.category, (categoryMap.get(m.category) || 0) + 1);
    });
    
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

function getMockMachines(): Machine[] {
  return [
    {
      id: '1',
      name: 'Automatyczna Linia Pakowania PL-500',
      slug: 'automatyczna-linia-pakowania-pl-500',
      category: 'Linie pakujące',
      price: 185000,
      shortDescription: 'Wysokoefektywna linia do pakowania produktów sypkich i kawałkowych',
      description: '<p>Nowoczesna linia pakująca zaprojektowana do pracy ciągłej w warunkach przemysłowych. Zapewnia precyzyjne dawkowanie, hermetyczne zamknięcie opakowań i etykietowanie w jednym cyklu.</p><h3>Zastosowanie</h3><ul><li>Przemysł spożywczy</li><li>Przemysł farmaceutyczny</li><li>Przemysł chemiczny</li></ul>',
      specifications: {
        'Wydajność': 'do 500 opakowań/min',
        'Zakres dawkowania': '10g - 5kg',
        'Rodzaje opakowań': 'worki, pudełka, słoiki',
        'Zasilanie': '400V / 50Hz / 15kW',
        'Wymiary': '4500 x 2200 x 2100 mm',
        'Masa': '3200 kg',
      },
      images: ['/images/machines/pl-500-1.jpg', '/images/machines/pl-500-2.jpg'],
      featuredImage: '/images/machines/pl-500-1.jpg',
    },
    {
      id: '2',
      name: 'Dozownik Wiązany DWM-200',
      slug: 'dozownik-wiazany-dwm-200',
      category: 'Dozowniki',
      price: 42000,
      shortDescription: 'Precyzyjny dozownik do produktów płynnych i półpłynnych',
      description: '<p>Dozownik wiązany o dużej precyzji, idealny do dawania sosów, dżemów, kremów i innych produktów o zmiennej lepkości. Łatwa zmiana formatu bez narzędzi.</p>',
      specifications: {
        'Wydajność': 'do 200 cykli/min',
        'Objętość dawki': '5ml - 500ml',
        'Precyzja': '±0.5%',
        'Zasilanie': '230V / 50Hz / 1.5kW',
        'Wymiary': '800 x 600 x 1800 mm',
        'Materiał': 'Nierdzewna 316L',
      },
      images: ['/images/machines/dwm-200-1.jpg'],
      featuredImage: '/images/machines/dwm-200-1.jpg',
    },
    {
      id: '3',
      name: 'Maszyna do Wypełniania i Zakręcania FWC-300',
      slug: 'maszyny-do-wypelaniania-i-zakrecania-fwc-300',
      category: 'Wypełniarki',
      price: 98000,
      shortDescription: 'Kompletna stacja wypełniania i zakręcania butelek i słoików',
      description: '<p>Automatyczna maszyna do wypełniania produktów płynnych i zakręcania pokrywek. Modułowa konstrukcja pozwala na łatwą rozbudowę o dodatkowe stacje (np. foliówkowanie, etykietowanie).</p>',
      specifications: {
        'Wydajność': 'do 300 sztuk/min',
        'Zakres objętości': '50ml - 2000ml',
        'Rodzaje zamkowań': 'zakrętki, koreki, folia termokurczliwa',
        'Zasilanie': '400V / 50Hz / 8kW',
        'Wymiary': '3200 x 1800 x 2000 mm',
      },
      images: ['/images/machines/fwc-300-1.jpg', '/images/machines/fwc-300-2.jpg'],
      featuredImage: '/images/machines/fwc-300-1.jpg',
    },
    {
      id: '4',
      name: 'Etykietowarka Samoprzylepna EL-150',
      slug: 'etykietowarka-samoprzylepna-el-150',
      category: 'Etykietowanie',
      price: 28000,
      shortDescription: 'Szybka etykietowarka do butelek, słoików i opakowań płaskich',
      description: '<p>Uniwersalna etykietowarka do naklejania etykiet samoprzylepnych na opakowania o różnych kształtach. Wymiana formatu w mniej niż 2 minuty.</p>',
      specifications: {
        'Wydajność': 'do 150 sztuk/min',
        'Szerokość etykiety': 'do 150mm',
        'Długość etykiety': 'do 300mm',
        'Dokładność naklejania': '±1mm',
        'Zasilanie': '230V / 50Hz / 0.75kW',
        'Wymiary': '1200 x 800 x 1600 mm',
      },
      images: ['/images/machines/el-150-1.jpg'],
      featuredImage: '/images/machines/el-150-1.jpg',
    },
    {
      id: '5',
      name: 'Paletyzator Robotyczny PR-1000',
      slug: 'paletyzator-robotyczny-pr-1000',
      category: 'Paletyzacja',
      price: 320000,
      shortDescription: 'W pełni automatyczny paletyzator z robotem przemysłowym 6-osiowym',
      description: '<p>Nowoczesny paletyzator robotyczny do układania worków, kartonów i pudełek na palety. Programowalne wzory paletyzacji, szybka zmiana formatu.</p>',
      specifications: {
        'Wydajność': 'do 1000 cykli/godz',
        'Ładowność robota': '50 kg',
        'Zasięg robota': '2000 mm',
        'Wzorce paletyzacji': 'do 50 programów',
        'Zasilanie': '400V / 50Hz / 12kW',
        'Obszar roboczy': '3000 x 3000 x 2500 mm',
      },
      images: ['/images/machines/pr-1000-1.jpg', '/images/machines/pr-1000-2.jpg'],
      featuredImage: '/images/machines/pr-1000-1.jpg',
    },
    {
      id: '6',
      name: 'Waga Kontrolna WK-50',
      slug: 'waga-kontrolna-wk-50',
      category: 'Kontrola jakości',
      price: 15000,
      shortDescription: 'Dynamiczna waga kontrolna z odrzucaniem produktów niewłaściwych',
      description: '<p>Wysokoprzesja waga kontrolna do wagiń ruchomych produktów na taśmie transportowej. Automatyczne odrzucanie produktów spoza tolerancji.</p>',
      specifications: {
        'Wydajność': 'do 50 sztuk/min',
        'Zakres wagowy': '10g - 5kg',
        'Precyzja': '±0.1g',
        'Taśma': '400 x 300 mm',
        'Zasilanie': '230V / 50Hz / 0.5kW',
        'Interfejs': 'Ethernet, USB, RS232',
      },
      images: ['/images/machines/wk-50-1.jpg'],
      featuredImage: '/images/machines/wk-50-1.jpg',
    },
  ];
}

function getMockArticles(): Article[] {
  return [
    {
      id: '1',
      title: 'Jak wybrać odpowiednią maszynę pakującą do swojej produkcji?',
      slug: 'jak-wybrac-odpowiednia-maszyne-pakujaca',
      excerpt: 'Przewodnik po kluczowych parametrach, na które warto zwrócić uwagę przy doborze maszyny pakującej.',
      content: '<p>Wybór odpowiedniej maszyny pakującej to kluczowa decyzja dla efektywności produkcji...</p>',
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
      content: '<p>Dozowniki wiązane i tłokowe to dwa grundy typy urządzeń do dawania produktów...</p>',
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
      content: '<p>Zakład mleczarski "MlekoPol" stanął przed wyzwaniem modernizacji linii produkcyjnej...</p>',
      category: 'Case Studies',
      author: 'Piotr Wiśniewski',
      date: '10 grudnia 2024',
      readTime: '15 min',
    },
  ];
}