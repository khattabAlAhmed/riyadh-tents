import { drizzle } from "drizzle-orm/node-postgres";
import { blogPost } from "../src/lib/db/schema/blog-schema";
import { nanoid } from "nanoid";
import pg from "pg";
import "dotenv/config";

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

// ============================================
// Blog Posts Data
// ============================================
const blogPostsData = [
    {
        titleAr: "كيف تختار الخيمة المثالية لحفل زفافك",
        titleEn: "How to Choose the Perfect Tent for Your Wedding",
        slugAr: "كيف-تختار-الخيمة-المثالية-لحفل-زفافك",
        slugEn: "how-to-choose-the-perfect-tent-for-your-wedding",
        excerptAr: "دليل شامل لاختيار الخيمة المناسبة لحفل زفافك، من الحجم والتصميم إلى التجهيزات والديكورات.",
        excerptEn: "A comprehensive guide to selecting the right tent for your wedding, from size and design to equipment and decorations.",
        contentAr: `
            <h2>مقدمة</h2>
            <p>يعتبر اختيار الخيمة المناسبة لحفل الزفاف من أهم القرارات التي يتخذها العروسان. فالخيمة ليست مجرد مأوى، بل هي جزء أساسي من أجواء الحفل وذكرياته.</p>
            
            <h2>تحديد عدد الضيوف</h2>
            <p>أول خطوة في اختيار الخيمة هي معرفة عدد الضيوف المتوقعين. كقاعدة عامة:</p>
            <ul>
                <li>لكل ضيف جالس: 1.5 متر مربع</li>
                <li>لكل ضيف واقف: 0.75 متر مربع</li>
                <li>أضف 20% للمساحات الخدمية</li>
            </ul>
            
            <h2>اختيار نوع الخيمة</h2>
            <p>تتوفر عدة أنواع من الخيام، لكل منها مميزاته:</p>
            <ul>
                <li><strong>الخيمة الهرمية:</strong> تصميم كلاسيكي فاخر، مثالية للحفلات الملكية</li>
                <li><strong>خيمة الدوم:</strong> تصميم عصري بدون أعمدة داخلية، توفر مساحة أكبر</li>
                <li><strong>الخيمة الشفافة:</strong> تتيح رؤية السماء، مثالية للسهرات الليلية</li>
            </ul>
            
            <h2>التجهيزات الأساسية</h2>
            <p>لا تنسَ التجهيزات المهمة مثل:</p>
            <ul>
                <li>نظام التكييف أو التدفئة حسب الموسم</li>
                <li>الإضاءة المناسبة للأجواء</li>
                <li>الأرضيات والسجاد</li>
                <li>الديكورات والستائر</li>
            </ul>
            
            <h2>نصائح أخيرة</h2>
            <p>احجز الخيمة قبل موعد الزفاف بشهرين على الأقل، خاصة في مواسم الذروة. وتأكد من زيارة الموقع مع فريق التركيب لضمان ملاءمة المساحة.</p>
        `,
        contentEn: `
            <h2>Introduction</h2>
            <p>Choosing the right tent for your wedding is one of the most important decisions couples make. A tent is not just a shelter; it's an essential part of the celebration's atmosphere and memories.</p>
            
            <h2>Determining Guest Count</h2>
            <p>The first step in choosing a tent is knowing the expected number of guests. As a general rule:</p>
            <ul>
                <li>For each seated guest: 1.5 square meters</li>
                <li>For each standing guest: 0.75 square meters</li>
                <li>Add 20% for service areas</li>
            </ul>
            
            <h2>Choosing Tent Type</h2>
            <p>Several types of tents are available, each with its advantages:</p>
            <ul>
                <li><strong>Pyramid Tent:</strong> Classic luxurious design, perfect for royal parties</li>
                <li><strong>Dome Tent:</strong> Modern design without internal pillars, provides more space</li>
                <li><strong>Transparent Tent:</strong> Allows sky views, ideal for evening celebrations</li>
            </ul>
            
            <h2>Essential Equipment</h2>
            <p>Don't forget important equipment such as:</p>
            <ul>
                <li>Air conditioning or heating system depending on season</li>
                <li>Appropriate mood lighting</li>
                <li>Flooring and carpets</li>
                <li>Decorations and curtains</li>
            </ul>
            
            <h2>Final Tips</h2>
            <p>Book your tent at least two months before the wedding, especially during peak seasons. Make sure to visit the site with the installation team to ensure space suitability.</p>
        `,
        featuredImageUrl: "https://europa-tents.com/wp-content/uploads/2020/04/حفلات-ملكية-1.jpg",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-خيام-اوربية-1.png",
            "https://europa-tents.com/wp-content/uploads/2020/04/خيام-ملكية-الخيام-الاوروبية-5.png"
        ],
        keywordsAr: ["خيمة زفاف", "حفل زفاف", "تجهيزات زفاف", "خيام فاخرة"],
        keywordsEn: ["wedding tent", "wedding party", "wedding equipment", "luxury tents"],
        tagsAr: ["زفاف", "حفلات", "نصائح"],
        tagsEn: ["wedding", "parties", "tips"],
        metaDescriptionAr: "دليل شامل لاختيار الخيمة المثالية لحفل زفافك. تعرف على أنواع الخيام والمساحات المناسبة والتجهيزات الأساسية.",
        metaDescriptionEn: "A comprehensive guide to choosing the perfect tent for your wedding. Learn about tent types, appropriate sizes, and essential equipment.",
        isPublished: true,
        publishedAt: new Date("2024-11-15"),
    },
    {
        titleAr: "5 نصائح لإعداد معرض ناجح",
        titleEn: "5 Tips for a Successful Exhibition Setup",
        slugAr: "خمس-نصائح-لإعداد-معرض-ناجح",
        slugEn: "5-tips-for-a-successful-exhibition-setup",
        excerptAr: "اكتشف أسرار النجاح في تنظيم المعارض التجارية باستخدام الخيام الاحترافية والتجهيزات المناسبة.",
        excerptEn: "Discover the secrets to success in organizing trade exhibitions using professional tents and appropriate equipment.",
        contentAr: `
            <h2>النجاح في عالم المعارض</h2>
            <p>تعتبر المعارض التجارية فرصة ذهبية للشركات لعرض منتجاتها والتواصل مع العملاء. إليك خمس نصائح أساسية لضمان نجاح معرضك.</p>
            
            <h2>1. اختيار الموقع المناسب</h2>
            <p>الموقع هو أساس نجاح أي معرض. تأكد من:</p>
            <ul>
                <li>سهولة الوصول للزوار</li>
                <li>توفر مواقف السيارات</li>
                <li>مساحة كافية للخيمة والتجهيزات</li>
            </ul>
            
            <h2>2. اختيار الخيمة المناسبة</h2>
            <p>للمعارض التجارية، نوصي بـ:</p>
            <ul>
                <li><strong>الخيام المضلعة:</strong> توفر مساحات واسعة بدون أعمدة</li>
                <li><strong>الخيام المكعبة:</strong> مثالية للمؤتمرات والعروض</li>
            </ul>
            
            <h2>3. الإضاءة الاحترافية</h2>
            <p>الإضاءة الجيدة تبرز منتجاتك وتخلق أجواء احترافية. استخدم مزيجاً من الإضاءة العامة والإضاءة الموجهة للمنتجات.</p>
            
            <h2>4. التكييف والتهوية</h2>
            <p>راحة الزوار أولوية. تأكد من توفير تكييف مناسب خاصة في فصل الصيف.</p>
            
            <h2>5. اللافتات والتوجيه</h2>
            <p>استخدم لافتات واضحة لتوجيه الزوار داخل المعرض وإبراز الأقسام المختلفة.</p>
        `,
        contentEn: `
            <h2>Success in the Exhibition World</h2>
            <p>Trade exhibitions are a golden opportunity for companies to showcase their products and connect with customers. Here are five essential tips to ensure your exhibition's success.</p>
            
            <h2>1. Choosing the Right Location</h2>
            <p>Location is the foundation of any exhibition's success. Ensure:</p>
            <ul>
                <li>Easy access for visitors</li>
                <li>Available parking</li>
                <li>Sufficient space for tent and equipment</li>
            </ul>
            
            <h2>2. Selecting the Right Tent</h2>
            <p>For trade exhibitions, we recommend:</p>
            <ul>
                <li><strong>Polygon Tents:</strong> Provide wide spaces without pillars</li>
                <li><strong>Cube Tents:</strong> Ideal for conferences and presentations</li>
            </ul>
            
            <h2>3. Professional Lighting</h2>
            <p>Good lighting highlights your products and creates a professional atmosphere. Use a mix of general lighting and focused product lighting.</p>
            
            <h2>4. Air Conditioning and Ventilation</h2>
            <p>Visitor comfort is a priority. Ensure adequate air conditioning, especially in summer.</p>
            
            <h2>5. Signage and Wayfinding</h2>
            <p>Use clear signage to guide visitors inside the exhibition and highlight different sections.</p>
        `,
        featuredImageUrl: "https://europa-tents.com/wp-content/uploads/2020/07/maa-1.jpeg",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/0.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/1-5.png"
        ],
        keywordsAr: ["معارض", "معرض تجاري", "خيام معارض", "تنظيم معارض"],
        keywordsEn: ["exhibitions", "trade show", "exhibition tents", "event organization"],
        tagsAr: ["معارض", "أعمال", "نصائح"],
        tagsEn: ["exhibitions", "business", "tips"],
        metaDescriptionAr: "اكتشف 5 نصائح أساسية لتنظيم معرض ناجح. من اختيار الخيمة إلى الإضاءة والتكييف.",
        metaDescriptionEn: "Discover 5 essential tips for organizing a successful exhibition. From tent selection to lighting and air conditioning.",
        isPublished: true,
        publishedAt: new Date("2024-10-20"),
    },
    {
        titleAr: "تقاليد خيام رمضان في المملكة العربية السعودية",
        titleEn: "Ramadan Tent Traditions in Saudi Arabia",
        slugAr: "تقاليد-خيام-رمضان-في-السعودية",
        slugEn: "ramadan-tent-traditions-in-saudi-arabia",
        excerptAr: "استكشف التقاليد العريقة لخيام رمضان في المملكة وكيف تطورت لتجمع بين الأصالة والحداثة.",
        excerptEn: "Explore the rich traditions of Ramadan tents in the Kingdom and how they have evolved to combine authenticity with modernity.",
        contentAr: `
            <h2>رمضان والتراث السعودي</h2>
            <p>تعتبر خيام رمضان جزءاً أصيلاً من التراث السعودي والهوية الثقافية للمملكة. تجسد هذه الخيام قيم الكرم والضيافة العربية الأصيلة.</p>
            
            <h2>تاريخ خيام رمضان</h2>
            <p>بدأت خيام رمضان كتجمعات بسيطة في الأحياء للإفطار الجماعي، ثم تطورت لتصبح فعاليات ضخمة تستضيفها الفنادق والشركات والعائلات الكبيرة.</p>
            
            <h2>عناصر الخيمة الرمضانية التقليدية</h2>
            <ul>
                <li><strong>الفرش التقليدي:</strong> السجاد والوسائد على الطراز العربي</li>
                <li><strong>الإضاءة الدافئة:</strong> فوانيس ومصابيح تقليدية</li>
                <li><strong>التمر والقهوة:</strong> ركن خاص للضيافة السعودية</li>
                <li><strong>شاشات العرض:</strong> لمتابعة البرامج الرمضانية</li>
            </ul>
            
            <h2>الخيام الرمضانية الحديثة</h2>
            <p>اليوم، تجمع الخيام الرمضانية الحديثة بين:</p>
            <ul>
                <li>التصاميم العصرية مع اللمسات التراثية</li>
                <li>أنظمة تكييف متطورة</li>
                <li>تقنيات صوت وإضاءة حديثة</li>
                <li>مساحات للصلاة والعبادة</li>
            </ul>
            
            <h2>نصائح لتجهيز خيمتك الرمضانية</h2>
            <p>إذا كنت تخطط لإقامة خيمة رمضانية، احرص على الحجز المبكر قبل بداية الشهر بشهر على الأقل، وتنسيق الديكورات مع موضوع رمضاني موحد.</p>
        `,
        contentEn: `
            <h2>Ramadan and Saudi Heritage</h2>
            <p>Ramadan tents are an authentic part of Saudi heritage and the Kingdom's cultural identity. These tents embody the values of Arab generosity and hospitality.</p>
            
            <h2>History of Ramadan Tents</h2>
            <p>Ramadan tents began as simple neighborhood gatherings for communal iftar, then evolved to become massive events hosted by hotels, companies, and large families.</p>
            
            <h2>Elements of Traditional Ramadan Tent</h2>
            <ul>
                <li><strong>Traditional Furnishings:</strong> Carpets and cushions in Arabic style</li>
                <li><strong>Warm Lighting:</strong> Traditional lanterns and lamps</li>
                <li><strong>Dates and Coffee:</strong> A special corner for Saudi hospitality</li>
                <li><strong>Display Screens:</strong> For watching Ramadan programs</li>
            </ul>
            
            <h2>Modern Ramadan Tents</h2>
            <p>Today, modern Ramadan tents combine:</p>
            <ul>
                <li>Contemporary designs with heritage touches</li>
                <li>Advanced air conditioning systems</li>
                <li>Modern sound and lighting technology</li>
                <li>Spaces for prayer and worship</li>
            </ul>
            
            <h2>Tips for Setting Up Your Ramadan Tent</h2>
            <p>If you're planning to set up a Ramadan tent, make sure to book early, at least a month before Ramadan begins, and coordinate decorations with a unified Ramadan theme.</p>
        `,
        featuredImageUrl: "https://europa-tents.com/wp-content/uploads/2020/07/1-2.jpg",
        imageUrls: [
            "https://europa-tents.com/wp-content/uploads/2020/07/1-6.png",
            "https://europa-tents.com/wp-content/uploads/2020/07/2-5.png"
        ],
        keywordsAr: ["خيام رمضان", "رمضان السعودية", "تراث سعودي", "إفطار جماعي"],
        keywordsEn: ["ramadan tents", "ramadan saudi arabia", "saudi heritage", "communal iftar"],
        tagsAr: ["رمضان", "تراث", "ثقافة"],
        tagsEn: ["ramadan", "heritage", "culture"],
        metaDescriptionAr: "استكشف تقاليد خيام رمضان في المملكة العربية السعودية. من التراث العريق إلى التصاميم الحديثة.",
        metaDescriptionEn: "Explore Ramadan tent traditions in Saudi Arabia. From rich heritage to modern designs.",
        isPublished: true,
        publishedAt: new Date("2024-09-01"),
    },
];

async function main() {
    await client.connect();

    console.log("📝 Starting blog posts seeding...\n");

    // Seed Blog Posts
    console.log(`Seeding ${blogPostsData.length} blog posts...`);
    for (const postData of blogPostsData) {
        await db.insert(blogPost).values({
            id: nanoid(),
            ...postData,
        });
    }
    console.log("✅ Blog posts seeded successfully!\n");

    console.log("🎉 All blog data seeded successfully!");
    await client.end();
}

main().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
