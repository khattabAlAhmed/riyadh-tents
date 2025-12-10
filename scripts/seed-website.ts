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
        descriptionAr:
            "خيام هرمية الشكل تتميز بتصميمها الأنيق والمتين، مثالية للمناسبات الفاخرة والحفلات الكبيرة.",
        descriptionEn:
            "Pyramid-shaped tents featuring elegant and durable design, perfect for luxurious events and large celebrations.",
        maxWidth: 20,
        maxHeight: 8,
    },
    {
        nameAr: "الخيام المضلعة (البوليجون)",
        nameEn: "Polygon Tents",
        descriptionAr:
            "خيام متعددة الأضلاع توفر مساحة واسعة ومرونة في التصميم، مناسبة للمعارض والفعاليات الكبرى.",
        descriptionEn:
            "Multi-sided tents providing spacious areas and design flexibility, suitable for exhibitions and major events.",
        maxWidth: 30,
        maxHeight: 10,
    },
    {
        nameAr: "خيام المخروط",
        nameEn: "Cone Tents",
        descriptionAr:
            "خيام مخروطية الشكل بتصميم فريد ومميز، تضفي لمسة جمالية على أي مناسبة.",
        descriptionEn:
            "Cone-shaped tents with a unique and distinctive design, adding an aesthetic touch to any occasion.",
        maxWidth: 15,
        maxHeight: 12,
    },
    {
        nameAr: "تجهيزات المعارض",
        nameEn: "Exhibition Equipment",
        descriptionAr:
            "تجهيزات متكاملة للمعارض تشمل الهياكل والأنظمة المختلفة لعرض المنتجات والخدمات بشكل احترافي.",
        descriptionEn:
            "Complete exhibition setups including structures and various systems for professional product and service display.",
        maxWidth: 50,
        maxHeight: 6,
    },
    {
        nameAr: "خيام نصف الدائرة (الدوم)",
        nameEn: "Dome Tents",
        descriptionAr:
            "خيام نصف دائرية (قبة) توفر مظهراً عصرياً ومساحة داخلية واسعة بدون أعمدة.",
        descriptionEn:
            "Semi-circular (dome) tents offering a modern look and spacious interior without pillars.",
        maxWidth: 25,
        maxHeight: 15,
    },
    {
        nameAr: "الخيام المكعبة (قاعة البوكس)",
        nameEn: "Cube Tents (Box Hall)",
        descriptionAr:
            "خيام مكعبة الشكل توفر مساحة استغلال قصوى، مثالية للمؤتمرات والاجتماعات.",
        descriptionEn:
            "Cube-shaped tents providing maximum space utilization, ideal for conferences and meetings.",
        maxWidth: 20,
        maxHeight: 5,
    },
    {
        nameAr: "الخيام المقوسة",
        nameEn: "Arched Tents",
        descriptionAr:
            "خيام بتصميم مقوس أنيق يجمع بين الجمال والوظيفية، مناسبة لمختلف المناسبات.",
        descriptionEn:
            "Elegantly arched tents combining beauty and functionality, suitable for various occasions.",
        maxWidth: 18,
        maxHeight: 7,
    },
    {
        nameAr: "مظلات السيارات",
        nameEn: "Car Parking Shades",
        descriptionAr:
            "مظلات متينة لحماية السيارات من أشعة الشمس والعوامل الجوية، بتصاميم عصرية ومتنوعة.",
        descriptionEn:
            "Durable shades to protect vehicles from sunlight and weather conditions, with modern and varied designs.",
        maxWidth: 6,
        maxHeight: 3,
    },
];

// ============================================
// Services Data
// ============================================
const servicesData = [
    {
        nameAr: "خيام الحفلات الملكية",
        nameEn: "Royal Party Tents",
        descriptionAr:
            "خيام فاخرة للحفلات الملكية والمناسبات الراقية، مصممة بأعلى معايير الجودة والأناقة.",
        descriptionEn:
            "Luxurious tents for royal parties and upscale events, designed with the highest standards of quality and elegance.",
    },
    {
        nameAr: "خيام الفعاليات",
        nameEn: "Event Tents",
        descriptionAr:
            "حلول متكاملة لخيام الفعاليات المختلفة من مهرجانات ومؤتمرات وحفلات.",
        descriptionEn:
            "Comprehensive solutions for various event tents including festivals, conferences, and celebrations.",
    },
    {
        nameAr: "خيام المعارض",
        nameEn: "Exhibition Tents",
        descriptionAr:
            "خيام مخصصة للمعارض والعروض التجارية بتصاميم احترافية تناسب جميع الأحجام.",
        descriptionEn:
            "Specialized tents for exhibitions and trade shows with professional designs suitable for all sizes.",
    },
    {
        nameAr: "الخيام الرمضانية",
        nameEn: "Ramadan Tents",
        descriptionAr:
            "خيام رمضانية مميزة لإقامة الإفطارات والسحور، مجهزة بكافة وسائل الراحة.",
        descriptionEn:
            "Distinguished Ramadan tents for iftar and suhoor gatherings, equipped with all comfort amenities.",
    },
    {
        nameAr: "خيام الحج",
        nameEn: "Hajj Tents",
        descriptionAr:
            "خيام مخصصة لموسم الحج تتميز بالتحمل والمتانة وتوفير الظل والراحة للحجاج.",
        descriptionEn:
            "Specialized tents for Hajj season characterized by durability and providing shade and comfort for pilgrims.",
    },
    {
        nameAr: "خيام المستودعات",
        nameEn: "Warehouse Tents",
        descriptionAr:
            "حلول تخزين مرنة باستخدام خيام المستودعات المتينة والآمنة لحماية البضائع.",
        descriptionEn:
            "Flexible storage solutions using durable and secure warehouse tents to protect goods.",
    },
    {
        nameAr: "خيام المنزل",
        nameEn: "Home Tents",
        descriptionAr:
            "خيام منزلية أنيقة للحدائق والأسطح، توفر مساحة إضافية للاستجمام والترفيه.",
        descriptionEn:
            "Elegant home tents for gardens and rooftops, providing extra space for relaxation and entertainment.",
    },
    {
        nameAr: "الخيام العسكرية",
        nameEn: "Military Tents",
        descriptionAr:
            "خيام عسكرية متينة مصممة لتحمل الظروف القاسية، مناسبة للاستخدامات الميدانية.",
        descriptionEn:
            "Durable military tents designed to withstand harsh conditions, suitable for field operations.",
    },
    {
        nameAr: "الخيام الرياضية",
        nameEn: "Sports Tents",
        descriptionAr:
            "خيام مخصصة للفعاليات الرياضية والملاعب، توفر تغطية مثالية للمتفرجين والفرق.",
        descriptionEn:
            "Specialized tents for sports events and stadiums, providing ideal coverage for spectators and teams.",
    },
    {
        nameAr: "الخدمات المساندة",
        nameEn: "Supporting Services",
        descriptionAr:
            "خدمات متكاملة تشمل التركيب والصيانة والإضاءة والتكييف وجميع التجهيزات اللازمة.",
        descriptionEn:
            "Comprehensive services including installation, maintenance, lighting, air conditioning, and all necessary equipment.",
    },
    {
        nameAr: "الخيام الشفافة",
        nameEn: "Transparent Tents",
        descriptionAr:
            "خيام شفافة أنيقة تسمح برؤية السماء والمناظر الطبيعية، مثالية للحفلات الليلية.",
        descriptionEn:
            "Elegant transparent tents allowing views of the sky and natural scenery, ideal for evening celebrations.",
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
        reviewContentAr:
            "تعاملت معهم في تنظيم حفل زفاف وكانت الخدمة ممتازة. الخيمة كانت رائعة والتجهيزات فاخرة جداً. أنصح الجميع بالتعامل معهم.",
        reviewContentEn:
            "I worked with them for my wedding ceremony and the service was excellent. The tent was wonderful and the equipment was very luxurious. I recommend everyone to work with them.",
        stars: 5,
        positionAr: "رجل أعمال",
        positionEn: "Businessman",
    },
    {
        authorNameAr: "سارة خالد الحربي",
        authorNameEn: "Sarah Khalid Al-Harbi",
        profileImageUrl: null,
        reviewContentAr:
            "استأجرنا خيمة رمضانية للشركة وكانت التجربة رائعة. الفريق محترف والتسليم في الموعد المحدد. شكراً لكم.",
        reviewContentEn:
            "We rented a Ramadan tent for our company and the experience was wonderful. The team is professional and delivery was on time. Thank you.",
        stars: 4.5,
        positionAr: "مديرة موارد بشرية",
        positionEn: "HR Manager",
    },
    {
        authorNameAr: "عبدالله سعود القحطاني",
        authorNameEn: "Abdullah Saud Al-Qahtani",
        profileImageUrl: null,
        reviewContentAr:
            "نظمنا معرضاً تجارياً باستخدام خيامهم، الجودة عالية والأسعار منافسة. سنتعامل معهم مستقبلاً بالتأكيد.",
        reviewContentEn:
            "We organized a trade exhibition using their tents, high quality and competitive prices. We will definitely work with them in the future.",
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
        imageUrls: [],
        descriptionAr:
            "تنفيذ خيمة ملكية فاخرة لحفل زفاف في الرياض بمساحة 500 متر مربع، مع تجهيزات كاملة من إضاءة وتكييف وديكورات راقية.",
        descriptionEn:
            "Execution of a luxurious royal tent for a wedding ceremony in Riyadh with an area of 500 square meters, with complete equipment including lighting, air conditioning, and elegant decorations.",
        date: new Date("2024-03-15"),
    },
    {
        titleAr: "معرض جدة الدولي للسيارات",
        titleEn: "Jeddah International Auto Show",
        imageUrls: [],
        descriptionAr:
            "توفير خيام معارض احترافية لمعرض السيارات الدولي في جدة، شملت 3 خيام كبيرة بمساحة إجمالية 2000 متر مربع.",
        descriptionEn:
            "Providing professional exhibition tents for the International Auto Show in Jeddah, including 3 large tents with a total area of 2000 square meters.",
        date: new Date("2024-01-20"),
    },
    {
        titleAr: "خيمة رمضان - فندق الفيصلية",
        titleEn: "Ramadan Tent - Al Faisaliah Hotel",
        imageUrls: [],
        descriptionAr:
            "تجهيز خيمة رمضانية فاخرة لفندق الفيصلية تتسع لـ 300 ضيف، مع ديكورات شرقية أصيلة وإضاءة مميزة.",
        descriptionEn:
            "Setting up a luxurious Ramadan tent for Al Faisaliah Hotel accommodating 300 guests, with authentic oriental decorations and distinctive lighting.",
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

    // Seed Tents (using first tent type as default)
    console.log(`Seeding ${tentsData.length} tents...`);
    for (const tentData of tentsData) {
        await db.insert(tent).values({
            id: nanoid(),
            ...tentData,
            imageUrls: [],
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
            imageUrls: [],
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
