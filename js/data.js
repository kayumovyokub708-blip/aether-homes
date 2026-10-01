// Default house data (will be merged/overwritten by localStorage if present)
const DEFAULT_HOUSES = [
  {
    id: 1,
    title: "Villa Aurora",
    category: "modern",
    type: "project",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    area: 280,
    rooms: 5,
    floors: 2,
    price: 185000,
    description: "Виллаи муосир бо тирезаҳои калон, ҳавлии зебо ва тарҳи кушода. Идеалӣ барои оилаҳои калон.",
    features: ["Гараж барои 2 мошин", "Ҳавзи шиноварӣ", "Системаи оқилона", "Боми ҳамвор бо терраса", "Ошхонаи кушода", "Кабинети корӣ"],
    status: "Лоиҳа"
  },
  {
    id: 2,
    title: "Casa Minimal",
    category: "minimal",
    type: "project",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    area: 160,
    rooms: 3,
    floors: 1,
    price: 98000,
    description: "Хонаи минималистӣ бо хатҳои тоза, нури табиӣ ва истифодаи самараноки фазо.",
    features: ["Тирезаҳои панҷара", "Гармкунии зерифарш", "Боғи хурд", "Таҳхона", "Дизайни скандинавӣ"],
    status: "Лоиҳа"
  },
  {
    id: 3,
    title: "Residence Classic",
    category: "classic",
    type: "project",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
    area: 320,
    rooms: 6,
    floors: 2,
    price: 245000,
    description: "Хонаи классикӣ бо элементҳои анъанавӣ ва роҳатӣи муосир. Фазои васеъ ва зебо.",
    features: ["Ҳавлии калон", "Шоҳонаи меҳмонхона", "Китобхона", "Гараж", "Системаи амният"],
    status: "Лоиҳа"
  },
  {
    id: 4,
    title: "Skyline House",
    category: "modern",
    type: "project",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    area: 210,
    rooms: 4,
    floors: 2,
    price: 142000,
    description: "Хонаи дуошёна бо намои зебо, балконҳои васеъ ва тарҳи функсионалӣ.",
    features: ["Балкони панорамӣ", "Ошхонаи ҷазира", "Ҳаммомҳои люкс", "Ҷойи барбекю"],
    status: "Лоиҳа"
  },
  {
    id: 5,
    title: "Green Nest",
    category: "minimal",
    type: "built",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd1c?w=800&q=80",
    area: 145,
    rooms: 3,
    floors: 1,
    price: 87000,
    description: "Хонаи экологӣ бо маводҳои табиӣ ва самаранокии энергия. Соли 2024 супорида шуд.",
    features: ["Панелҳои офтобӣ", "Изолятсияи баланд", "Боғи сабз", "Системаи ҷамъоварии об"],
    status: "Сохташуда"
  },
  {
    id: 6,
    title: "Lakeview Villa",
    category: "modern",
    type: "built",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    area: 350,
    rooms: 6,
    floors: 2,
    price: 310000,
    description: "Виллаи люкс бо намои кӯл, ҳавзи калон ва ҳамаи имконоти муосир. Соли 2023 супорида шуд.",
    features: ["Намои кӯл", "Ҳавзи гарм", "Спа-минтақа", "Гаражи 3-мошина", "Хонаи меҳмон"],
    status: "Сохташуда"
  },
  {
    id: 7,
    title: "Urban Compact",
    category: "minimal",
    type: "project",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    area: 110,
    rooms: 2,
    floors: 1,
    price: 72000,
    description: "Хонаи компакт барои ҷуфтҳои ҷавон ё оилаҳои хурд. Оптимизатсияи фазо ва арзиши дастрас.",
    features: ["Тарҳи кушода", "Гармкунии самаранок", "Ҳавлии хурд", "Ҷойи корӣ"],
    status: "Лоиҳа"
  },
  {
    id: 8,
    title: "Heritage Home",
    category: "classic",
    type: "built",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    area: 260,
    rooms: 5,
    floors: 2,
    price: 198000,
    description: "Хонаи классикӣ бо унсурҳои меъмории анъанавӣ ва роҳатӣи муосир. Соли 2022 супорида шуд.",
    features: ["Шифти баланд", "Шӯъбаи оташдон", "Боғи анъанавӣ", "Зеризамин"],
    status: "Сохташуда"
  }
];

function getHouses() {
  try {
    const stored = localStorage.getItem('aether_houses');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return [...DEFAULT_HOUSES];
}

function saveHouses(houses) {
  localStorage.setItem('aether_houses', JSON.stringify(houses));
}

function formatPrice(price) {
  return new Intl.NumberFormat('tg-TJ', { style: 'currency', currency: 'TJS', maximumFractionDigits: 0 }).format(price * 10.5);
  // Approximate conversion for display; real would be local currency
}
// Better simple format
function formatPriceSimple(price) {
  return '$' + price.toLocaleString('en-US');
}
