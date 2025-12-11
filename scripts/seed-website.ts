import { drizzle } from "drizzle-orm/node-postgres";
import {
    tentType,
    tent,
    service,
    review,
    project,
} from "../src/lib/db/schema/website-schema";
import { nanoid } from "nanoid";
import pg from "pg";
import "dotenv/config";

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

// Helper function to generate slug from name
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// ============================================
// Tent Types Data
// ============================================
const tentTypesData = [
    {
        id: nanoid(),
        typeNameAr: "خيام اوروبية",
        typeNameEn: "European Tents",
    },
    {
        id: nanoid(),
        typeNameAr: "خيام شعبية",
        typeNameEn: "Traditional Tents",
    },
];

// ============================================
// Tents Data
// ============================================
const tentsData = [
    {
        nameAr: "الخيام الهرمية",
        nameEn: "Pyramid Tents",
        slugAr: "الخيام-الهرمية",
        slugEn: "pyramid-tents",
        descriptionAr: "خيام هرمية الشكل تتميز بتصميمها الأنيق والمتين، مثالية للمناسبات الفاخرة والحفلات الكبيرة.",
        descriptionEn: "Pyramid-shaped tents featuring elegant and durable design, perfect for luxurious events and large celebrations.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/01/رئيسية-هرمية-1.jpg"],
        keywordsAr: ["خيام هرمية", "خيام فاخرة", "حفلات"],
        keywordsEn: ["pyramid tents", "luxury tents", "events"],
        tagsAr: ["هرمي", "فاخر"],
        tagsEn: ["pyramid", "luxury"],
    },
    {
        nameAr: "الخيام المضلعة (البوليجون)",
        nameEn: "Polygon Tents",
        slugAr: "الخيام-المضلعة",
        slugEn: "polygon-tents",
        descriptionAr: "خيام متعددة الأضلاع توفر مساحة واسعة ومرونة في التصميم، مناسبة للمعارض والفعاليات الكبرى.",
        descriptionEn: "Multi-sided tents providing spacious areas and design flexibility, suitable for exhibitions and major events.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/01/رئيسية-مضلعة-1.jpg"],
        keywordsAr: ["خيام مضلعة", "معارض", "فعاليات"],
        keywordsEn: ["polygon tents", "exhibitions", "events"],
        tagsAr: ["مضلع", "معارض"],
        tagsEn: ["polygon", "exhibitions"],
    },
    {
        nameAr: "خيام المخروط",
        nameEn: "Cone Tents",
        slugAr: "خيام-المخروط",
        slugEn: "cone-tents",
        descriptionAr: "خيام مخروطية الشكل بتصميم فريد ومميز، تضفي لمسة جمالية على أي مناسبة.",
        descriptionEn: "Cone-shaped tents with a unique and distinctive design, adding an aesthetic touch to any occasion.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/01/رئيسية-مخروط-1.jpg"],
        keywordsAr: ["خيام مخروطية", "تصميم فريد"],
        keywordsEn: ["cone tents", "unique design"],
        tagsAr: ["مخروط", "فريد"],
        tagsEn: ["cone", "unique"],
    },
    {
        nameAr: "تجهيزات المعارض",
        nameEn: "Exhibition Equipment",
        slugAr: "تجهيزات-المعارض",
        slugEn: "exhibition-equipment",
        descriptionAr: "تجهيزات متكاملة للمعارض تشمل الهياكل والأنظمة المختلفة لعرض المنتجات والخدمات بشكل احترافي.",
        descriptionEn: "Complete exhibition setups including structures and various systems for professional product and service display.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/01/رئيسية-معارض.jpg"],
        keywordsAr: ["معارض", "تجهيزات", "عرض منتجات"],
        keywordsEn: ["exhibitions", "equipment", "product display"],
        tagsAr: ["معارض", "احترافي"],
        tagsEn: ["exhibitions", "professional"],
    },
    {
        nameAr: "خيام نصف الدائرة (الدوم)",
        nameEn: "Dome Tents",
        slugAr: "خيام-الدوم",
        slugEn: "dome-tents",
        descriptionAr: "خيام نصف دائرية (قبة) توفر مظهراً عصرياً ومساحة داخلية واسعة بدون أعمدة.",
        descriptionEn: "Semi-circular (dome) tents offering a modern look and spacious interior without pillars.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/01/رئيسية-نصف-الدائرة-1.jpg"],
        keywordsAr: ["خيام قبة", "عصري", "بدون أعمدة"],
        keywordsEn: ["dome tents", "modern", "pillarless"],
        tagsAr: ["قبة", "عصري"],
        tagsEn: ["dome", "modern"],
    },
    {
        nameAr: "الخيام المكعبة (قاعة البوكس)",
        nameEn: "Cube Tents (Box Hall)",
        slugAr: "الخيام-المكعبة",
        slugEn: "cube-tents",
        descriptionAr: "خيام مكعبة الشكل توفر مساحة استغلال قصوى، مثالية للمؤتمرات والاجتماعات.",
        descriptionEn: "Cube-shaped tents providing maximum space utilization, ideal for conferences and meetings.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/01/رئيسية-مكعب-1.jpg"],
        keywordsAr: ["خيام مكعبة", "مؤتمرات", "اجتماعات"],
        keywordsEn: ["cube tents", "conferences", "meetings"],
        tagsAr: ["مكعب", "مؤتمرات"],
        tagsEn: ["cube", "conferences"],
    },
    {
        nameAr: "الخيام المقوسة",
        nameEn: "Arched Tents",
        slugAr: "الخيام-المقوسة",
        slugEn: "arched-tents",
        descriptionAr: "خيام بتصميم مقوس أنيق يجمع بين الجمال والوظيفية، مناسبة لمختلف المناسبات.",
        descriptionEn: "Elegantly arched tents combining beauty and functionality, suitable for various occasions.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/01/رئيسية-مقوسة-1.jpg"],
        keywordsAr: ["خيام مقوسة", "أنيق", "مناسبات"],
        keywordsEn: ["arched tents", "elegant", "occasions"],
        tagsAr: ["مقوس", "أنيق"],
        tagsEn: ["arched", "elegant"],
    },
    {
        nameAr: "مظلات السيارات",
        nameEn: "Car Parking Shades",
        slugAr: "مظلات-السيارات",
        slugEn: "car-parking-shades",
        descriptionAr: "مظلات متينة لحماية السيارات من أشعة الشمس والعوامل الجوية، بتصاميم عصرية ومتنوعة.",
        descriptionEn: "Durable shades to protect vehicles from sunlight and weather conditions, with modern and varied designs.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/01/رئيسية-مظلات-السيارات.jpg"],
        keywordsAr: ["مظلات سيارات", "حماية", "عصري"],
        keywordsEn: ["car shades", "protection", "modern"],
        tagsAr: ["مظلات", "سيارات"],
        tagsEn: ["shades", "cars"],
    },
];

// ============================================
// Services Data
// ============================================
const servicesData = [
    {
        nameAr: "خيام الحفلات الملكية",
        nameEn: "Royal Party Tents",
        slugAr: "خيام-الحفلات-الملكية",
        slugEn: "royal-party-tents",
        descriptionAr: "خيام فاخرة للحفلات الملكية والمناسبات الراقية، مصممة بأعلى معايير الجودة والأناقة.",
        descriptionEn: "Luxurious tents for royal parties and upscale events, designed with the highest standards of quality and elegance.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/04/حفلات-ملكية-1.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-خيام-اوربية-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-خيام-اووربية-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-الخيام-اووربية-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-خيام-اوروبية-4.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-الخيام-الاوروبية-5.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-خيام-اوروبية-6.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/7-الخيام-الملكية-خيام-اوروبية-.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-الخيام-الاوروبية-8-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-الخيام-الاوروبية-9.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-الخيام-الاوروبية-10.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-الخيام-الاوروبية-11.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-الخيام-الاوروبية-12.png"
        ],
        keywordsAr: ["حفلات ملكية", "خيام فاخرة", "مناسبات راقية"],
        keywordsEn: ["royal parties", "luxury tents", "upscale events"],
        tagsAr: ["ملكي", "فاخر"],
        tagsEn: ["royal", "luxury"],
    },
    {
        nameAr: "خيام الفعاليات",
        nameEn: "Event Tents",
        slugAr: "خيام-الفعاليات",
        slugEn: "event-tents",
        descriptionAr: "حلول متكاملة لخيام الفعاليات المختلفة من مهرجانات ومؤتمرات وحفلات.",
        descriptionEn: "Comprehensive solutions for various event tents including festivals, conferences, and celebrations.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/خيام-الفعاليات-1.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/1-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/2-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/3-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/4-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/5-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/6-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/7-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/8-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/10-تركيب-خيام-فعاليات-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/10-تركيب-خيام-فعاليات-الخيام-الاوروبية-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/11-تركيب-خيام-فعاليات-الخيام-الاوروبية.png"
        ],
        keywordsAr: ["فعاليات", "مهرجانات", "مؤتمرات"],
        keywordsEn: ["events", "festivals", "conferences"],
        tagsAr: ["فعاليات", "مؤتمرات"],
        tagsEn: ["events", "conferences"],
    },
    {
        nameAr: "خيام المعارض",
        nameEn: "Exhibition Tents",
        slugAr: "خيام-المعارض",
        slugEn: "exhibition-tents",
        descriptionAr: "خيام مخصصة للمعارض والعروض التجارية بتصاميم احترافية تناسب جميع الأحجام.",
        descriptionEn: "Specialized tents for exhibitions and trade shows with professional designs suitable for all sizes.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/maa-1.jpeg",
            "https://europa-tents.com/wp-content/uploads/2020/07/0.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/1-5.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/2-4.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/4-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/7-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/8-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/9-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/10-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/14-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/15-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/16.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/18.png"
        ],
        keywordsAr: ["معارض", "عروض تجارية", "تصاميم احترافية"],
        keywordsEn: ["exhibitions", "trade shows", "professional designs"],
        tagsAr: ["معارض", "تجاري"],
        tagsEn: ["exhibitions", "commercial"],
    },
    {
        nameAr: "الخيام الرمضانية",
        nameEn: "Ramadan Tents",
        slugAr: "الخيام-الرمضانية",
        slugEn: "ramadan-tents",
        descriptionAr: "خيام رمضانية مميزة لإقامة الإفطارات والسحور، مجهزة بكافة وسائل الراحة.",
        descriptionEn: "Distinguished Ramadan tents for iftar and suhoor gatherings, equipped with all comfort amenities.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/1-2.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/1-6.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/2-5.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/3-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/4-4.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/5-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/6-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/7-4.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/8-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/9-4.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/11-2.png"
        ],
        keywordsAr: ["رمضان", "إفطار", "سحور"],
        keywordsEn: ["ramadan", "iftar", "suhoor"],
        tagsAr: ["رمضان", "إفطار"],
        tagsEn: ["ramadan", "iftar"],
    },
    {
        nameAr: "خيام الحج",
        nameEn: "Hajj Tents",
        slugAr: "خيام-الحج",
        slugEn: "hajj-tents",
        descriptionAr: "خيام مخصصة لموسم الحج تتميز بالتحمل والمتانة وتوفير الظل والراحة للحجاج.",
        descriptionEn: "Specialized tents for Hajj season characterized by durability and providing shade and comfort for pilgrims.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/1-3.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/1-خيام-الحج-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/2-خيام-الحج-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/3-خيام-الحج-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/4-خيام-الحج-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/5-خيام-الحج-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/6-خيام-الحج-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/7-خيام-الحج-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/8-خيام-الحج-الخيام-الاوروبية.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/9-خيام-الحج-الخيام-الاوروبية.png"
        ],
        keywordsAr: ["حج", "خيام حجاج", "موسم الحج"],
        keywordsEn: ["hajj", "pilgrim tents", "hajj season"],
        tagsAr: ["حج", "حجاج"],
        tagsEn: ["hajj", "pilgrims"],
    },
    {
        nameAr: "خيام المستودعات",
        nameEn: "Warehouse Tents",
        slugAr: "خيام-المستودعات",
        slugEn: "warehouse-tents",
        descriptionAr: "حلول تخزين مرنة باستخدام خيام المستودعات المتينة والآمنة لحماية البضائع.",
        descriptionEn: "Flexible storage solutions using durable and secure warehouse tents to protect goods.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/خيام-المستودع.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/الخيام-الاوروبية-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/خيام-مستودع-أوربية-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/خيام-اوروبية-خيام-المستودع-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/4.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/7.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/8.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/9.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/10.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/11.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/12.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/13.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/14.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/15.png"
        ],
        keywordsAr: ["مستودعات", "تخزين", "حماية بضائع"],
        keywordsEn: ["warehouses", "storage", "goods protection"],
        tagsAr: ["مستودع", "تخزين"],
        tagsEn: ["warehouse", "storage"],
    },
    {
        nameAr: "خيام المنزل",
        nameEn: "Home Tents",
        slugAr: "خيام-المنزل",
        slugEn: "home-tents",
        descriptionAr: "خيام منزلية أنيقة للحدائق والأسطح، توفر مساحة إضافية للاستجمام والترفيه.",
        descriptionEn: "Elegant home tents for gardens and rooftops, providing extra space for relaxation and entertainment.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/خيمة-منزلية.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/الخيام-الاوربية-خيام-المنزل-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/الخيام-الاوربية-خيام-المنزل-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/الخيام-الاوربية-خيام-المنزل-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/الخيام-الاوربية-خيام-المنزل-4.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/خيام-الاوروبية-خيام-المنزل-5.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/خيام-الاوروبية-خيام-المنزل-6.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/خيام-الاوروبية-خيام-المنزل-7-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/خيام-الاوروبية-خيام-المنزل-8.png"
        ],
        keywordsAr: ["خيام منزلية", "حدائق", "استجمام"],
        keywordsEn: ["home tents", "gardens", "relaxation"],
        tagsAr: ["منزل", "حديقة"],
        tagsEn: ["home", "garden"],
    },
    {
        nameAr: "الخيام العسكرية",
        nameEn: "Military Tents",
        slugAr: "الخيام-العسكرية",
        slugEn: "military-tents",
        descriptionAr: "خيام عسكرية متينة مصممة لتحمل الظروف القاسية، مناسبة للاستخدامات الميدانية.",
        descriptionEn: "Durable military tents designed to withstand harsh conditions, suitable for field operations.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/1-12.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/1-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/4-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/5-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/6-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/7-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/8-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/9-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/10-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/11-1.png"
        ],
        keywordsAr: ["خيام عسكرية", "ميداني", "متين"],
        keywordsEn: ["military tents", "field", "durable"],
        tagsAr: ["عسكري", "ميداني"],
        tagsEn: ["military", "field"],
    },
    {
        nameAr: "الخيام الرياضية",
        nameEn: "Sports Tents",
        slugAr: "الخيام-الرياضية",
        slugEn: "sports-tents",
        descriptionAr: "خيام مخصصة للفعاليات الرياضية والملاعب، توفر تغطية مثالية للمتفرجين والفرق.",
        descriptionEn: "Specialized tents for sports events and stadiums, providing ideal coverage for spectators and teams.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/الخيام-الرياضية.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/1-4.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/2-3.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/3-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/4-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/5-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/6-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/7-2.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/9-2.png"
        ],
        keywordsAr: ["رياضة", "ملاعب", "فعاليات رياضية"],
        keywordsEn: ["sports", "stadiums", "sports events"],
        tagsAr: ["رياضي", "ملعب"],
        tagsEn: ["sports", "stadium"],
    },
    {
        nameAr: "الخدمات المساندة",
        nameEn: "Supporting Services",
        slugAr: "الخدمات-المساندة",
        slugEn: "supporting-services",
        descriptionAr: "خدمات متكاملة تشمل التركيب والصيانة والإضاءة والتكييف وجميع التجهيزات اللازمة.",
        descriptionEn: "Comprehensive services including installation, maintenance, lighting, air conditioning, and all necessary equipment.",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/07/الخدمات-المساندة.jpg"],
        keywordsAr: ["خدمات", "تركيب", "صيانة", "تكييف"],
        keywordsEn: ["services", "installation", "maintenance", "air conditioning"],
        tagsAr: ["خدمات", "صيانة"],
        tagsEn: ["services", "maintenance"],
    },
    {
        nameAr: "الخيام الشفافة",
        nameEn: "Transparent Tents",
        slugAr: "الخيام-الشفافة",
        slugEn: "transparent-tents",
        descriptionAr: "خيام شفافة أنيقة تسمح برؤية السماء والمناظر الطبيعية، مثالية للحفلات الليلية.",
        descriptionEn: "Elegant transparent tents allowing views of the sky and natural scenery, ideal for evening celebrations.",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/12/PHOTO-2021-01-18-12-33-03.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/04/حفلات-ملكية-1.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/05/ملكي-هرمي32-2.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/01/event_tent9.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/18-2.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/05/ملكي-هرمي-34.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/05/الفعاليات-نصف-الدائرة21.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/07/9-2.jpeg",
            "https://europa-tents.com/wp-content/uploads/2020/05/فعاليات-مضلعة20.jpg",
            "https://europa-tents.com/wp-content/uploads/2020/05/الفعاليات-نصف-الدائرة-13.jpeg"
        ],
        keywordsAr: ["خيام شفافة", "حفلات ليلية", "مناظر طبيعية"],
        keywordsEn: ["transparent tents", "evening parties", "natural scenery"],
        tagsAr: ["شفاف", "ليلي"],
        tagsEn: ["transparent", "evening"],
    },
];

// ============================================
// Reviews Data (Mock)
// ============================================
const reviewsData = [
    {
        authorNameAr: "أحمد محمد العلي",
        authorNameEn: "Ahmed Mohammed Al-Ali",
        profileImageUrl: null,
        reviewContentAr: "تعاملت معهم في تنظيم حفل زفاف وكانت الخدمة ممتازة. الخيمة كانت رائعة والتجهيزات فاخرة جداً. أنصح الجميع بالتعامل معهم.",
        reviewContentEn: "I worked with them for my wedding ceremony and the service was excellent. The tent was wonderful and the equipment was very luxurious. I recommend everyone to work with them.",
        stars: 5,
        positionAr: "رجل أعمال",
        positionEn: "Businessman",
    },
    {
        authorNameAr: "سارة خالد الحربي",
        authorNameEn: "Sarah Khalid Al-Harbi",
        profileImageUrl: null,
        reviewContentAr: "استأجرنا خيمة رمضانية للشركة وكانت التجربة رائعة. الفريق محترف والتسليم في الموعد المحدد. شكراً لكم.",
        reviewContentEn: "We rented a Ramadan tent for our company and the experience was wonderful. The team is professional and delivery was on time. Thank you.",
        stars: 4.5,
        positionAr: "مديرة موارد بشرية",
        positionEn: "HR Manager",
    },
    {
        authorNameAr: "عبدالله سعود القحطاني",
        authorNameEn: "Abdullah Saud Al-Qahtani",
        profileImageUrl: null,
        reviewContentAr: "نظمنا معرضاً تجارياً باستخدام خيامهم، الجودة عالية والأسعار منافسة. سنتعامل معهم مستقبلاً بالتأكيد.",
        reviewContentEn: "We organized a trade exhibition using their tents, high quality and competitive prices. We will definitely work with them in the future.",
        stars: 5,
        positionAr: "مدير تسويق",
        positionEn: "Marketing Director",
    },
];

// ============================================
// Projects Data (Mock)
// ============================================
const projectsData = [
    {
        titleAr: "حفل زفاف ملكي - الرياض",
        titleEn: "Royal Wedding Ceremony - Riyadh",
        slugAr: "حفل-زفاف-ملكي-الرياض",
        slugEn: "royal-wedding-ceremony-riyadh",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/04/حفلات-ملكية-1.jpg"],
        descriptionAr: "تنفيذ خيمة ملكية فاخرة لحفل زفاف في الرياض بمساحة 500 متر مربع، مع تجهيزات كاملة من إضاءة وتكييف وديكورات راقية.",
        descriptionEn: "Execution of a luxurious royal tent for a wedding ceremony in Riyadh with an area of 500 square meters, with complete equipment including lighting, air conditioning, and elegant decorations.",
        keywordsAr: ["زفاف", "ملكي", "الرياض"],
        keywordsEn: ["wedding", "royal", "riyadh"],
        tagsAr: ["زفاف", "ملكي"],
        tagsEn: ["wedding", "royal"],
        date: new Date("2024-03-15"),
    },
    {
        titleAr: "معرض جدة الدولي للسيارات",
        titleEn: "Jeddah International Auto Show",
        slugAr: "معرض-جدة-الدولي-للسيارات",
        slugEn: "jeddah-international-auto-show",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/07/maa-1.jpeg"],
        descriptionAr: "توفير خيام معارض احترافية لمعرض السيارات الدولي في جدة، شملت 3 خيام كبيرة بمساحة إجمالية 2000 متر مربع.",
        descriptionEn: "Providing professional exhibition tents for the International Auto Show in Jeddah, including 3 large tents with a total area of 2000 square meters.",
        keywordsAr: ["معرض", "سيارات", "جدة"],
        keywordsEn: ["exhibition", "cars", "jeddah"],
        tagsAr: ["معرض", "سيارات"],
        tagsEn: ["exhibition", "cars"],
        date: new Date("2024-01-20"),
    },
    {
        titleAr: "خيمة رمضان - فندق الفيصلية",
        titleEn: "Ramadan Tent - Al Faisaliah Hotel",
        slugAr: "خيمة-رمضان-فندق-الفيصلية",
        slugEn: "ramadan-tent-al-faisaliah-hotel",
        imageUrls: ["https://europa-tents.com/wp-content/uploads/2020/07/1-2.jpg"],
        descriptionAr: "تجهيز خيمة رمضانية فاخرة لفندق الفيصلية تتسع لـ 300 ضيف، مع ديكورات شرقية أصيلة وإضاءة مميزة.",
        descriptionEn: "Setting up a luxurious Ramadan tent for Al Faisaliah Hotel accommodating 300 guests, with authentic oriental decorations and distinctive lighting.",
        keywordsAr: ["رمضان", "فندق", "الفيصلية"],
        keywordsEn: ["ramadan", "hotel", "faisaliah"],
        tagsAr: ["رمضان", "فندق"],
        tagsEn: ["ramadan", "hotel"],
        date: new Date("2024-03-10"),
    },
];

async function main() {
    await client.connect();

    console.log("🏕️  Starting website data seeding...\n");

    // Seed Tent Types
    console.log(`Seeding ${tentTypesData.length} tent types...`);
    for (const typeData of tentTypesData) {
        await db.insert(tentType).values(typeData);
    }
    console.log("✅ Tent types seeded successfully!\n");

    // Seed Tents
    console.log(`Seeding ${tentsData.length} tents...`);
    for (const tentData of tentsData) {
        await db.insert(tent).values({
            id: nanoid(),
            ...tentData,
            tentTypeId: tentTypesData[0].id, // Default to European Tents
        });
    }
    console.log("✅ Tents seeded successfully!\n");

    // Seed Services
    console.log(`Seeding ${servicesData.length} services...`);
    for (const serviceData of servicesData) {
        await db.insert(service).values({
            id: nanoid(),
            ...serviceData,
        });
    }
    console.log("✅ Services seeded successfully!\n");

    // Seed Reviews
    console.log(`Seeding ${reviewsData.length} reviews...`);
    const reviewIds: string[] = [];
    for (const reviewData of reviewsData) {
        const reviewId = nanoid();
        reviewIds.push(reviewId);
        await db.insert(review).values({
            id: reviewId,
            ...reviewData,
        });
    }
    console.log("✅ Reviews seeded successfully!\n");

    // Seed Projects
    console.log(`Seeding ${projectsData.length} projects...`);
    for (let i = 0; i < projectsData.length; i++) {
        const projectData = projectsData[i];
        await db.insert(project).values({
            id: nanoid(),
            ...projectData,
            tentId: null,
            tentTypeId: tentTypesData[i % tentTypesData.length].id,
            reviewId: reviewIds[i] || null,
        });
    }
    console.log("✅ Projects seeded successfully!\n");

    console.log("🎉 All website data seeded successfully!");
    await client.end();
}

main().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
