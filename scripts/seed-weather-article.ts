import { drizzle } from "drizzle-orm/node-postgres";
import { blogPost } from "../src/lib/db/schema/blog-schema";
import { nanoid } from "nanoid";
import pg from "pg";
import "dotenv/config";

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

// Weather and Education Article
const articleData = {
    titleAr: "الطقس غدًا في الرياض والتأثير على الدراسة",
    titleEn: "Tomorrow's Weather in Riyadh and Its Impact on Education",
    slugAr: "الطقس-غدا-في-الرياض-والتأثير-على-الدراسة",
    slugEn: "tomorrows-weather-in-riyadh-and-its-impact-on-education",
    excerptAr: "تحويل الدراسة الحضورية إلى التعليم عن بُعد في الرياض والمحافظات بسبب توقعات الأمطار. تعرف على توقعات الطقس ومنصة مدرستي.",
    excerptEn: "In-person education converted to remote learning in Riyadh and governorates due to rain forecasts. Learn about weather predictions and Madrasati Platform.",
    contentAr: `
<h2>توقعات الطقس غدًا</h2>
<p>في إجراء استباقي من قبل الإدارة العامة للتعليم بمنطقة الرياض، تم إعلان تحويل الدراسة الحضورية إلى التعليم عن بُعد ليوم غدٍ الاثنين (15 ديسمبر 2025)، وذلك في ضوء التقارير الصادرة من المركز الوطني للأرصاد بشأن الحالة المطرية المتوقع حدوثها.</p>

<p>توقعت المراكز الأرصادية أن يشهد يوم غدٍ الاثنين في الرياض:</p>
<ul>
    <li><strong>درجة الحرارة النهارية:</strong> 18°م</li>
    <li><strong>درجة الحرارة الليلية:</strong> 17°م</li>
    <li><strong>الحالة:</strong> غائم جزئيًا مع احتمالية هطول أمطار</li>
    <li><strong>سرعة الرياح:</strong> 12.3 كم/س نهارًا و 22.4 كم/س ليلًا</li>
    <li><strong>الرطوبة الجوية:</strong> 61.92% نهارًا و 54.09% ليلًا</li>
</ul>

<h2>تعليق الدراسة في الرياض والمحافظات</h2>
<p>شمل قرار تعليق الدراسة الحضورية وتحويلها للتعليم عن بُعد المناطق التالية:</p>
<ul>
    <li>مدينة الرياض</li>
    <li>محافظة المجمعة</li>
    <li>محافظة الغاط</li>
    <li>محافظة الزلفي</li>
    <li>محافظة الدوادمي</li>
    <li>محافظة القويعية</li>
    <li>محافظة عفيف</li>
    <li>محافظة شقراء</li>
    <li>المنطقة الشرقية</li>
    <li>محافظة حفر الباطن</li>
</ul>

<h2>منصة مدرستي: البديل الآمن للتعليم</h2>
<p>ستُستكمل العملية التعليمية عبر <strong>منصة مدرستي</strong>، وهي المنصة التعليمية الرسمية التابعة لوزارة التعليم السعودية.</p>

<p><strong>المزايا الرئيسية لمنصة مدرستي:</strong></p>
<ul>
    <li>تضم أكثر من 6 ملايين طالب وطالبة</li>
    <li>تشغلها أكثر من 525 ألف معلم ومعلمة</li>
    <li>توفر حوالي 250 ألف فصل دراسي افتراضي يوميًا</li>
    <li>تتضمن أكثر من 45 ألف محتوى تعليمي متنوع</li>
    <li>تحتوي على بنك أسئلة بأكثر من 100 ألف سؤال تفاعلي</li>
    <li>تحقق معدل وصول بنسبة 98%</li>
</ul>

<h2>الفصول الدراسية الافتراضية</h2>
<p>تتيح المنصة للمعلمين والمعلمات إجراء فصول دراسية مباشرة عبر تطبيق Microsoft Teams، مما يسمح بالتفاعل المباشر بين المعلم والطلاب، وطرح الأسئلة، والحصول على ردود فورية.</p>

<h2>المحتوى التعليمي المتنوع</h2>
<p>توفر المنصة محتوى تعليميًا شاملًا يشمل:</p>
<ul>
    <li>مقاطع فيديو تعليمية</li>
    <li>محاكاة تفاعلية</li>
    <li>ألعاب تعليمية</li>
    <li>كتب إلكترونية</li>
    <li>أنشطة تفاعلية</li>
</ul>

<h2>خصوصيات القرار: ليس إجازة بل تحويل للتعليم</h2>
<p>من المهم التأكيد على أن <strong>تعليق الدراسة الحضورية لا يعني إجازة</strong> بل يعني تحويل آني وسلس للتعليم عن بُعد. يجب على الطلاب والطالبات حضور الحصص الدراسية عبر المنصة وفقًا للجدول الدراسي المعتمد.</p>

<h2>نصائح للطلاب والأسر</h2>
<ol>
    <li><strong>تأكد من استقرار الاتصال بالإنترنت</strong> قبل موعد الدراسة</li>
    <li><strong>جهز مكانًا مناسبًا</strong> للدراسة خالٍ من الضوضاء</li>
    <li><strong>اتبع الجدول الدراسي</strong> بنفس الالتزام كما في الدراسة الحضورية</li>
    <li><strong>استعد بالأدوات والكتب</strong> المطلوبة قبل بداية الحصة</li>
    <li><strong>ركز على المشاركة الفعالة</strong> في الفصل الدراسي الافتراضي</li>
</ol>

<h2>رسالة من وزارة التعليم</h2>
<p>أكدت وزارة التعليم على أن اتخاذ هذه القرارات يأتي <strong>حرصًا على سلامة الجميع</strong>، وأن المنصات التعليمية الرقمية توفر بيئة تعليمية آمنة وفعالة تُسهم في استمرار العملية التعليمية دون انقطاع.</p>

<h2>السياق الأوسع: التعليم الرقمي والتحول الوطني</h2>
<p>تعكس هذه الإجراءات التطور الحقيقي الذي حققته المملكة العربية السعودية في مجال التعليم الرقمي، والذي يتوافق مع أهداف <strong>رؤية 2030</strong>. فقد أصبح التعليم الهجين (الجمع بين الحضوري والعن بُعد) جزءًا أساسيًا من المشهد التعليمي السعودي.</p>
    `,
    contentEn: `
<h2>Tomorrow's Weather Forecast</h2>
<p>In a proactive measure by the General Administration of Education in Riyadh Region, it has been announced that in-person education will be converted to remote learning for tomorrow, Monday (December 15, 2025), in light of weather reports issued by the National Center of Meteorology regarding expected rainy conditions.</p>

<p>Meteorological centers have predicted that tomorrow, Monday in Riyadh will experience:</p>
<ul>
    <li><strong>Daytime Temperature:</strong> 18°C</li>
    <li><strong>Nighttime Temperature:</strong> 17°C</li>
    <li><strong>Conditions:</strong> Partly cloudy with possibility of rainfall</li>
    <li><strong>Wind Speed:</strong> 12.3 km/h during the day and 22.4 km/h at night</li>
    <li><strong>Humidity:</strong> 61.92% during the day and 54.09% at night</li>
</ul>

<h2>School Suspension in Riyadh and Governorates</h2>
<p>The decision to suspend in-person education and convert it to remote learning includes the following regions:</p>
<ul>
    <li>Riyadh City</li>
    <li>Al-Majmaah Governorate</li>
    <li>Al-Ghat Governorate</li>
    <li>Al-Zulfi Governorate</li>
    <li>Al-Dawadmi Governorate</li>
    <li>Al-Quwaiyah Governorate</li>
    <li>Afif Governorate</li>
    <li>Shaqra Governorate</li>
    <li>Eastern Region</li>
    <li>Hafar Al-Batin Governorate</li>
</ul>

<h2>Madrasati Platform: The Safe Alternative for Education</h2>
<p>The educational process will continue through <strong>Madrasati Platform</strong>, the official e-learning platform of the Saudi Ministry of Education.</p>

<p><strong>Key Features of Madrasati:</strong></p>
<ul>
    <li>Serves over 6 million students</li>
    <li>Employs more than 525,000 teachers</li>
    <li>Provides approximately 250,000 virtual classrooms daily</li>
    <li>Contains over 45,000 diverse educational resources</li>
    <li>Includes a question bank with over 100,000 interactive questions</li>
    <li>Achieves 98% user reach rate</li>
</ul>

<h2>Virtual Classrooms</h2>
<p>The platform allows teachers to conduct live classes through Microsoft Teams, enabling direct interaction between instructor and students, asking questions, and receiving immediate responses.</p>

<h2>Diverse Educational Content</h2>
<p>The platform provides comprehensive educational content including:</p>
<ul>
    <li>Educational videos</li>
    <li>Interactive simulations</li>
    <li>Educational games</li>
    <li>E-books</li>
    <li>Interactive activities</li>
</ul>

<h2>Important Clarification: Not a Holiday but Online Learning</h2>
<p>It is important to emphasize that <strong>suspension of in-person education does not mean a holiday</strong> but rather an immediate and seamless shift to remote learning. Students must attend classes via the platform according to the approved school schedule.</p>

<h2>Tips for Students and Families</h2>
<ol>
    <li><strong>Ensure stable internet connection</strong> before class time</li>
    <li><strong>Prepare a suitable study space</strong> free from noise</li>
    <li><strong>Follow the class schedule</strong> with the same commitment as face-to-face learning</li>
    <li><strong>Prepare necessary tools and books</strong> before the class starts</li>
    <li><strong>Engage actively</strong> in the virtual classroom</li>
</ol>

<h2>Message from the Ministry of Education</h2>
<p>The Ministry of Education emphasized that these decisions are taken <strong>to ensure everyone's safety</strong>, and that digital educational platforms provide a safe and effective learning environment that contributes to the continuity of the educational process without interruption.</p>

<h2>Broader Context: Digital Education and National Transformation</h2>
<p>These measures reflect the real progress achieved by the Kingdom of Saudi Arabia in digital education, which aligns with the objectives of <strong>Vision 2030</strong>. Hybrid education (combining face-to-face and remote learning) has become an integral part of Saudi Arabia's educational landscape.</p>
    `,
    featuredImageUrl: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200",
    imageUrls: [],
    keywordsAr: ["الطقس في الرياض", "تعليق الدراسة", "منصة مدرستي", "التعليم عن بعد", "أمطار الرياض", "وزارة التعليم"],
    keywordsEn: ["Riyadh weather", "school suspension", "Madrasati platform", "remote learning", "Riyadh rain", "Ministry of Education"],
    tagsAr: ["تعليم", "طقس", "رؤية 2030"],
    tagsEn: ["education", "weather", "Vision 2030"],
    metaDescriptionAr: "تحويل الدراسة الحضورية إلى التعليم عن بُعد في الرياض بسبب توقعات الأمطار. تعرف على منصة مدرستي ونصائح للطلاب والأسر.",
    metaDescriptionEn: "In-person education converted to remote learning in Riyadh due to rain forecasts. Learn about Madrasati Platform and tips for students and families.",
    isPublished: true,
    publishedAt: new Date("2025-12-14"),
};

async function main() {
    await client.connect();

    console.log("📝 Seeding weather and education article...\n");

    await db.insert(blogPost).values({
        id: nanoid(),
        ...articleData,
    });

    console.log("✅ Article seeded successfully!\n");
    console.log("🎉 Done!");

    await client.end();
}

main().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
