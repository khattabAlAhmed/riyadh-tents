import { drizzle } from "drizzle-orm/node-postgres";
import { tent } from "../src/lib/db/schema/website-schema";
import pg from "pg";
import "dotenv/config";
import { eq } from "drizzle-orm";

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

// ============================================
// Updated Tent Descriptions from required_tents_scalability.txt
// ============================================
const tentDescriptions: Record<string, { descriptionAr: string; descriptionEn: string }> = {
    "pyramid-tents": {
        descriptionAr: "تعد الخيام الهرمية من أكثر القاعات انتشاراً لدى شرائح العملاء لأنها بفضل مساحاتها المتعددة وتصاميم سطحها وواجهاتها قادرة على أن تلبّي أغلب المتطلبات وتناسب مع كثير من الأحداث، حيث إنها الحل الأمثل لاستغلال المساحات الواسعة وإقامة الاجتماعات الكبيرة والمعارض والفعاليات المختلفة. وهي متوفرة بمقاسات متعددة وارتفاعات مختلفة لتلبي جميع الاحتياجات.",
        descriptionEn: "The pyramid tents are one of the most popular halls of the customer segments because they are multi-space, surface designs and facades able to meet most requirements and suit many events, as it is the ideal solution for the exploitation of large areas and big meetings, exhibitions and various events. We provide it in various sizes and different heights to present all needs.",
    },
    "polygon-tents": {
        descriptionAr: "تعد هذه الخيام الضخمة الحل الأمثل للفعاليات الكبرى والأحداث الرياضية وكذلك المستودعات التي تتطلب ارتفاعات عالية ومساحات كبيرة. كما أنها تتمتع بعدة خيارات لجوانبها حيث يمكنك الاختيار بين جوانب الـ (PVC) أو الواجهات الزجاجية أو الساندوتش بانل، وهي مصممة لتوفير مساحة داخلية أكبر بمظهر خارجي أنيق.",
        descriptionEn: "These huge tents are the ideal solution for the big exhibitions and sports events as well as warehouses that require high altitudes and large areas. It also has several options for its sides where you can choose between the sides of PVC or glass facade or sandwich panel and it's designed to provide more interior space with a stylish exterior.",
    },
    "cone-tents": {
        descriptionAr: "تحظى خيام القبة بشعبية كبيرة لدى العملاء نظراً للزمن القصير الذي يتطلبه تركيبها، فخيام القبة هي خيام صغيرة يسهل تجميعها وتثبيتها، ولها مجموعة واسعة من الاستخدامات لتلبي حاجة العميل فهي تستخدم كمجالس في المنازل أو في الحدائق فهي تعتبر الحل الأمثل للحفلات الصغيرة واستغلال المساحات المنزلية، كما تستخدم أيضاً كقاعات استقبال كبار الشخصيات في المناسبات، أو كقاعات ملحقة بالقاعات الكبيرة للتقديم والاستقبال، وبعضها يستخدم كبوابات دخول للقاعات العملاقة والأحداث ذات الجماهيرية الضخمة.",
        descriptionEn: "The cone tents are very popular with the customers due to the short time required to install them. The cone tents are small tents that are easy to assemble and install. These tents have a wide range of uses to meet the requirements of the clients. It is used as boards in homes or gardens. It is considered the ideal solution for small parties and the exploitation of home spaces. It is also used as a VIP reception hall for events, or as adjoining halls for large reception and reception rooms, some are used as entry gates for mega halls and large mass events.",
    },
    "exhibition-equipment": {
        descriptionAr: "توفّر الشركة أشكالاً مميّزة من البارتشن للمعارض والإيفنت لتشارككم النجاح، منها البارتشن السريع التجهيز، والبارتشن بتصاميم خاصة التي ينفّذها مصمّمون محترفون في تصاميم الـ 3D لتلبي احتياجاتكم. كما توفّر الشركة فواصل البارتشن الخاصة بالخيام، حيث يمكن استخدامها كفواصل مكتبية أو حواجز، وهي سهلة التركيب والفك، وتمتاز بسهولة نقلها.",
        descriptionEn: "The company provides distinctive partitions for exhibitions and events to share your success, included quick equipped and unique design made by professional designers in 3D designs. The Company also provides partitions for the tents, which can be used as office partitions or barriers, which is easy to install and remove and is easy to move.",
    },
    "dome-tents": {
        descriptionAr: "خيام نصف الدائرة (الدوم) هي الاختيار المثالي للخيام العصرية الحديثة التي تضفي على فعاليتك أناقة وتفرد يرضي ذائقتك، هذه الخيام هي الحل الأمثل للفعاليات الرياضية والمهرجانات والمناسبات الكبيرة لأنها تتمتع بارتفاعات عالية. كما تستخدم كقاعات للأفراح والمعارض والمؤتمرات حيث يتم تزويدها بكافة الملحقات التي تجعل منها خيماً تتميز بالفخامة مثل الإضاءة والمكيفات وأرضيات الباركيه ويضاف إليها الأبواب الزجاجية حسب الطلب.",
        descriptionEn: "The Half circle tents are the perfect choice for modern tents that give your event elegance and uniqueness that satisfies your tastes. These tents are the perfect solution for sports events, festivals and large events because they have high altitudes. They are also used as halls for weddings, exhibitions and conferences where they are provided with all the accessories that make them tents characterized by luxuries such as lighting, air conditioners and parquet floors. Glass doors are added upon request.",
    },
    "cube-tents": {
        descriptionAr: "هذا التصميم للخيام هو النظام المثالي لاستيعاب أكبر عدد من الأشخاص والمستلزمات في المناسبات ذات الجماهيرية العالية، كما تستخدم كصالات لكبار الشخصيات، وكذلك للمسارح والنوادي الرياضية، لتميزها بالخيارات المتعددة للمقاسات من ناحية الأطوال والارتفاعات حسب رغبة العميل.",
        descriptionEn: "This design of the cube tents is the ideal system to accommodate the largest number of people and supplies in high-level events, and also used as VIP lounges, as well as theatres and sports clubs, to be characterized by multiple options of sizes in terms of lengths and heights as desired by the customer.",
    },
    "arched-tents": {
        descriptionAr: "خيام ذات تصميم منفرد وهيكل قوي، تعتبر الاختيار الأفضل للمسارح المفتوحة والقاعات الرياضية، كما أنها الأشهر استخداماً لحظائر الطائرات لارتفاع سقفها واتساع مساحتها. هذه الخيام تمتزج بين الأناقة في التصميم والأمان والقوة من حيث المواد المستخدمة والتنفيذ.",
        descriptionEn: "Tents with a unique design and strong structure, are the best choice for open theatres and sports halls. It's the most popular tents for the hangars due to the ceiling height and big area. These tents combine elegance in design, safety and strength in terms of materials used and implementation.",
    },
    "car-parking-shades": {
        descriptionAr: "صممت هذه المظلات لتلبية احتياجات العملاء حيث أنها توفر أقصى قدر من التظليل لمواقف السيارات، وباستخدام أدنى حد من المساحة كما أنها تتحمل الظروف الجوية القاسية لأنها مصنعة من مواد عالية الجودة.",
        descriptionEn: "These shades are designed to meet the needs of customers as they provide maximum shading for parking, using minimal space and they withstand extreme weather conditions because they are made of high-quality materials.",
    },
};

async function main() {
    await client.connect();

    console.log("🏕️  Starting tent descriptions update...\n");

    for (const [slugEn, descriptions] of Object.entries(tentDescriptions)) {
        console.log(`Updating description for: ${slugEn}`);

        const result = await db
            .update(tent)
            .set({
                descriptionAr: descriptions.descriptionAr,
                descriptionEn: descriptions.descriptionEn,
            })
            .where(eq(tent.slugEn, slugEn));

        console.log(`  ✅ Updated\n`);
    }

    console.log("🎉 All tent descriptions updated successfully!");
    await client.end();
}

main().catch((err) => {
    console.error("❌ Update failed:", err);
    process.exit(1);
});
