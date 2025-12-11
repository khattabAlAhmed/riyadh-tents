import { drizzle } from "drizzle-orm/node-postgres";
import {
    tent,
    tentSize,
    tentSpecification,
    tentAccessory,
} from "../src/lib/db/schema/website-schema";
import { nanoid } from "nanoid";
import pg from "pg";
import "dotenv/config";
import { eq } from "drizzle-orm";

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

// ============================================
// Tent Slugs Mapping (to match existing tents)
// ============================================
const tentSlugsEn = {
    pyramidTents: "pyramid-tents",
    polygonTents: "polygon-tents",
    coneTents: "cone-tents",
    exhibitionEquipment: "exhibition-equipment",
    domeTents: "dome-tents",
    cubeTents: "cube-tents",
    archedTents: "arched-tents",
    carParkingShades: "car-parking-shades",
};

// ============================================
// Tent Sizes Data (from required_tents_scalability.txt)
// ============================================
const tentSizesData: Record<string, Array<{
    typeCode: string;
    wide: number;
    eaveHeight: string;
    ridgeHeight: string;
    bayDistance: number | null;
    diameter: number | null;
    centerHeight: number | null;
    area: number | null;
    capacityStand: number | null;
    capacitySit: number | null;
}>> = {
    "pyramid-tents": [
        { typeCode: "EUR - T5", wide: 5, eaveHeight: "2.60m", ridgeHeight: "3.40m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - T8", wide: 8, eaveHeight: "3.00m", ridgeHeight: "4.30m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - T10", wide: 10, eaveHeight: "3.00m – 4.00m", ridgeHeight: "4.60m – 5.60m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - T15", wide: 15, eaveHeight: "3.00m – 4.00m", ridgeHeight: "5.50m – 6.50m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - T20", wide: 20, eaveHeight: "4.00m", ridgeHeight: "7.25m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - T25", wide: 25, eaveHeight: "4.00m", ridgeHeight: "8.00m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - T30", wide: 30, eaveHeight: "4.00m", ridgeHeight: "9.00m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - T40", wide: 40, eaveHeight: "4.00m", ridgeHeight: "10.50m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - T50", wide: 50, eaveHeight: "4.00m", ridgeHeight: "12.00m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
    ],
    "polygon-tents": [
        { typeCode: "EUR - P20", wide: 20, eaveHeight: "4.00m", ridgeHeight: "10.00m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - P25", wide: 25, eaveHeight: "4.00m", ridgeHeight: "11.50m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - P30", wide: 30, eaveHeight: "4.00m", ridgeHeight: "13.05m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - P40", wide: 40, eaveHeight: "4.00m", ridgeHeight: "16.00m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - P50", wide: 50, eaveHeight: "4.00m", ridgeHeight: "15.25m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - P60", wide: 60, eaveHeight: "4.00m", ridgeHeight: "16.10m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
    ],
    "cone-tents": [
        { typeCode: "EUR - K5", wide: 5, eaveHeight: "2.60m", ridgeHeight: "5.50m", bayDistance: null, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - K5", wide: 5, eaveHeight: "3.00m", ridgeHeight: "5.90m", bayDistance: null, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - K10", wide: 10, eaveHeight: "3.00m", ridgeHeight: "6.40m", bayDistance: null, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - K10", wide: 10, eaveHeight: "4.00m", ridgeHeight: "7.40m", bayDistance: null, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
    ],
    "dome-tents": [
        { typeCode: "EUR - D10", wide: 10, eaveHeight: "5.00m", ridgeHeight: "5.00m", bayDistance: null, diameter: 10, centerHeight: 5, area: 78, capacityStand: 78, capacitySit: 52 },
        { typeCode: "EUR - D10", wide: 15, eaveHeight: "7.50m", ridgeHeight: "7.50m", bayDistance: null, diameter: 15, centerHeight: 7.5, area: 176, capacityStand: 176, capacitySit: 117 },
        { typeCode: "EUR - D20", wide: 20, eaveHeight: "10.00m", ridgeHeight: "10.00m", bayDistance: null, diameter: 20, centerHeight: 10, area: 314, capacityStand: 314, capacitySit: 209 },
        { typeCode: "EUR - D35", wide: 35, eaveHeight: "17.50m", ridgeHeight: "17.50m", bayDistance: null, diameter: 35, centerHeight: 17.5, area: 960, capacityStand: 960, capacitySit: 640 },
    ],
    "cube-tents": [
        { typeCode: "EUR - B10", wide: 10, eaveHeight: "5.00m", ridgeHeight: "5.60m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - B15", wide: 15, eaveHeight: "5.00m", ridgeHeight: "5.90m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - B20", wide: 20, eaveHeight: "5.00m", ridgeHeight: "6.20m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - B25", wide: 25, eaveHeight: "5.00m", ridgeHeight: "6.50m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - B30", wide: 30, eaveHeight: "5.00m", ridgeHeight: "6.80m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
    ],
    "arched-tents": [
        { typeCode: "EUR - C15", wide: 15, eaveHeight: "4.00m", ridgeHeight: "4.50m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - C20", wide: 20, eaveHeight: "4.00m", ridgeHeight: "6.25m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - C30", wide: 30, eaveHeight: "4.00m", ridgeHeight: "8.00m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
        { typeCode: "EUR - C40", wide: 40, eaveHeight: "4.00m", ridgeHeight: "9.50m", bayDistance: 5, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
    ],
    "car-parking-shades": [
        { typeCode: "CPS-01", wide: 3.1, eaveHeight: "2.60m", ridgeHeight: "2.60m", bayDistance: 3.1, diameter: null, centerHeight: null, area: null, capacityStand: null, capacitySit: null },
    ],
};

// ============================================
// Tent Specifications Data
// ============================================
const tentSpecsData: Record<string, {
    profileMaterialEn: string;
    profileMaterialAr: string;
    connectionEn: string;
    connectionAr: string;
    roofCoverEn: string;
    roofCoverAr: string;
    propertiesEn: string;
    propertiesAr: string;
    wallTypeEn: string;
    wallTypeAr: string;
    doorTypeEn: string;
    doorTypeAr: string;
}> = {
    "pyramid-tents": {
        profileMaterialEn: "Hard pressed extruded aluminum 6082/T6",
        profileMaterialAr: "ألمنيوم مبثوق مضغوط 6082/T6",
        connectionEn: "Hot-dip galvanized steel insert / Aluminum roof connection",
        connectionAr: "وصلة فولاذية مجلفنة بالغمس الساخن / وصلة سقف ألمنيوم",
        roofCoverEn: "PVC-coated polyester textile; Density: 850 g/m² double-coated blockout white PVC material",
        roofCoverAr: "نسيج بوليستر مغطى بـ PVC؛ الكثافة: 850 جم/م² مادة PVC بيضاء مزدوجة الطلاء",
        propertiesEn: "Flame retardant to DIN 4102B1, M2, CFM; Waterproof, UV resistant, heat/cold resistance",
        propertiesAr: "مقاوم للحريق وفق DIN 4102B1, M2, CFM؛ مقاوم للماء، مقاوم للأشعة فوق البنفسجية، مقاوم للحرارة/البرودة",
        wallTypeEn: "850 g/m² PVC wall, transparent PVC, sandwich panel wall, glass wall, panel wall",
        wallTypeAr: "جدار PVC 850 جم/م²، PVC شفاف، جدار ساندوتش بانل، جدار زجاجي، جدار بانل",
        doorTypeEn: "PVC screen door, PVC panel door, glass door",
        doorTypeAr: "باب شبكي PVC، باب بانل PVC، باب زجاجي",
    },
    "polygon-tents": {
        profileMaterialEn: "Hard pressed extruded aluminum 6082/T6",
        profileMaterialAr: "ألمنيوم مبثوق مضغوط 6082/T6",
        connectionEn: "Hot-dip galvanized steel insert / Aluminum roof connection",
        connectionAr: "وصلة فولاذية مجلفنة بالغمس الساخن / وصلة سقف ألمنيوم",
        roofCoverEn: "PVC-coated polyester textile; Density: 850 g/m² double coated blockout white PVC material",
        roofCoverAr: "نسيج بوليستر مغطى بـ PVC؛ الكثافة: 850 جم/م² مادة PVC بيضاء مزدوجة الطلاء",
        propertiesEn: "Flame retardant to DIN 4102B1, M2, CFM; Waterproof, UV resistant, heat/cold resistance",
        propertiesAr: "مقاوم للحريق وفق DIN 4102B1, M2, CFM؛ مقاوم للماء، مقاوم للأشعة فوق البنفسجية، مقاوم للحرارة/البرودة",
        wallTypeEn: "850 g/m² PVC wall, transparent PVC, sandwich panel wall, glass wall, panel wall",
        wallTypeAr: "جدار PVC 850 جم/م²، PVC شفاف، جدار ساندوتش بانل، جدار زجاجي، جدار بانل",
        doorTypeEn: "PVC screen door, PVC panel door, glass door",
        doorTypeAr: "باب شبكي PVC، باب بانل PVC، باب زجاجي",
    },
    "cone-tents": {
        profileMaterialEn: "Hard pressed extruded aluminum 6082/T6",
        profileMaterialAr: "ألمنيوم مبثوق مضغوط 6082/T6",
        connectionEn: "Hot-dip galvanized steel insert / Aluminum roof connection",
        connectionAr: "وصلة فولاذية مجلفنة بالغمس الساخن / وصلة سقف ألمنيوم",
        roofCoverEn: "PVC-coated polyester textile; Density: 850 g/m² double coated blockout white PVC material",
        roofCoverAr: "نسيج بوليستر مغطى بـ PVC؛ الكثافة: 850 جم/م² مادة PVC بيضاء مزدوجة الطلاء",
        propertiesEn: "Flame retardant to DIN 4102B1, M2, CFM; Waterproof, UV resistant, heat/cold resistance",
        propertiesAr: "مقاوم للحريق وفق DIN 4102B1, M2, CFM؛ مقاوم للماء، مقاوم للأشعة فوق البنفسجية، مقاوم للحرارة/البرودة",
        wallTypeEn: "850 g/m² PVC wall, transparent PVC, sandwich panel wall, glass wall, panel wall",
        wallTypeAr: "جدار PVC 850 جم/م²، PVC شفاف، جدار ساندوتش بانل، جدار زجاجي، جدار بانل",
        doorTypeEn: "PVC screen door, PVC panel door, glass door",
        doorTypeAr: "باب شبكي PVC، باب بانل PVC، باب زجاجي",
    },
    "dome-tents": {
        profileMaterialEn: "Hard pressed extruded aluminum 6082/T6",
        profileMaterialAr: "ألمنيوم مبثوق مضغوط 6082/T6",
        connectionEn: "Round net based; steel pipe connectors",
        connectionAr: "قاعدة شبكية دائرية؛ موصلات أنابيب فولاذية",
        roofCoverEn: "PVC-coated polyester textile; Density: 850 g/m² double coated blockout white PVC material",
        roofCoverAr: "نسيج بوليستر مغطى بـ PVC؛ الكثافة: 850 جم/م² مادة PVC بيضاء مزدوجة الطلاء",
        propertiesEn: "Flame retardant to DIN 4102B1, M2, CFM; Waterproof, UV resistant, heat/cold resistance",
        propertiesAr: "مقاوم للحريق وفق DIN 4102B1, M2, CFM؛ مقاوم للماء، مقاوم للأشعة فوق البنفسجية، مقاوم للحرارة/البرودة",
        wallTypeEn: "850g/m² PVC wall, transparent PVC wall",
        wallTypeAr: "جدار PVC 850 جم/م²، جدار PVC شفاف",
        doorTypeEn: "PVC screen door, PVC panel door, glass door",
        doorTypeAr: "باب شبكي PVC، باب بانل PVC، باب زجاجي",
    },
    "cube-tents": {
        profileMaterialEn: "Hard pressed extruded aluminum 6082/T6",
        profileMaterialAr: "ألمنيوم مبثوق مضغوط 6082/T6",
        connectionEn: "Hot-dip galvanized steel insert",
        connectionAr: "وصلة فولاذية مجلفنة بالغمس الساخن",
        roofCoverEn: "PVC-coated polyester textile; Density: 850 g/m² double coated blockout white PVC material",
        roofCoverAr: "نسيج بوليستر مغطى بـ PVC؛ الكثافة: 850 جم/م² مادة PVC بيضاء مزدوجة الطلاء",
        propertiesEn: "Flame retardant to DIN 4102B1, M2, CFM; Waterproof, UV resistant, heat/cold resistance",
        propertiesAr: "مقاوم للحريق وفق DIN 4102B1, M2, CFM؛ مقاوم للماء، مقاوم للأشعة فوق البنفسجية، مقاوم للحرارة/البرودة",
        wallTypeEn: "850 g/m² PVC wall, glass panel wall, sandwich panel wall",
        wallTypeAr: "جدار PVC 850 جم/م²، جدار بانل زجاجي، جدار ساندوتش بانل",
        doorTypeEn: "PVC panel door, glass door, glass panel door",
        doorTypeAr: "باب بانل PVC، باب زجاجي، باب بانل زجاجي",
    },
    "arched-tents": {
        profileMaterialEn: "Hard pressed extruded aluminum 6082/T6",
        profileMaterialAr: "ألمنيوم مبثوق مضغوط 6082/T6",
        connectionEn: "Hot-dip galvanized steel insert / Aluminum roof connection",
        connectionAr: "وصلة فولاذية مجلفنة بالغمس الساخن / وصلة سقف ألمنيوم",
        roofCoverEn: "PVC-coated polyester textile; Density: 850 g/m² double coated blockout white PVC material",
        roofCoverAr: "نسيج بوليستر مغطى بـ PVC؛ الكثافة: 850 جم/م² مادة PVC بيضاء مزدوجة الطلاء",
        propertiesEn: "Flame retardant to DIN 4102B1, M2, CFM; Waterproof, UV resistant, heat/cold resistance",
        propertiesAr: "مقاوم للحريق وفق DIN 4102B1, M2, CFM؛ مقاوم للماء، مقاوم للأشعة فوق البنفسجية، مقاوم للحرارة/البرودة",
        wallTypeEn: "850 g/m² PVC wall, transparent PVC, sandwich panel wall, glass wall, panel wall",
        wallTypeAr: "جدار PVC 850 جم/م²، PVC شفاف، جدار ساندوتش بانل، جدار زجاجي، جدار بانل",
        doorTypeEn: "PVC screen door, PVC panel door, glass door",
        doorTypeAr: "باب شبكي PVC، باب بانل PVC، باب زجاجي",
    },
    "car-parking-shades": {
        profileMaterialEn: "Q235 steel, hot-dip galvanizing + electrostatic spraying",
        profileMaterialAr: "فولاذ Q235، جلفنة بالغمس الساخن + رش كهروستاتيكي",
        connectionEn: "Hot-dip galvanized steel support",
        connectionAr: "دعامة فولاذية مجلفنة بالغمس الساخن",
        roofCoverEn: "PVC-coated polyester textile, flame retardant",
        roofCoverAr: "نسيج بوليستر مغطى بـ PVC، مقاوم للحريق",
        propertiesEn: "Wind loading: 80 km/hour 0.3 kN/m²",
        propertiesAr: "تحمل الرياح: 80 كم/ساعة 0.3 كيلو نيوتن/م²",
        wallTypeEn: "Full cover PVC / Transparent PVC",
        wallTypeAr: "غطاء PVC كامل / PVC شفاف",
        doorTypeEn: "N/A",
        doorTypeAr: "غير متوفر",
    },
};

// ============================================
// Tent Accessories Data
// ============================================
const tentAccessoriesData: Record<string, Array<{ nameEn: string; nameAr: string }>> = {
    "pyramid-tents": [
        { nameEn: "Transparent PVC Roof", nameAr: "سقف من البي في سي الشفاف" },
        { nameEn: "PVC Roof", nameAr: "سقف من البي في سي" },
        { nameEn: "Sandwich Panel Wall", nameAr: "جوانب من الساندوتش بانل الصلب" },
        { nameEn: "PVC Wall", nameAr: "جوانب من البي في سي" },
        { nameEn: "Glass Wall", nameAr: "جدران زجاجية" },
        { nameEn: "Glass Window", nameAr: "نافذة زجاجية" },
        { nameEn: "French Window", nameAr: "نوافذ فرنسية" },
        { nameEn: "Wooden Flooring", nameAr: "أرضيات من الباركيه" },
        { nameEn: "Emergency Exit", nameAr: "مخرج طوارئ" },
        { nameEn: "Decor & Curtains", nameAr: "بطائن الديكور الداخلي" },
        { nameEn: "Main Entrance", nameAr: "مدخل مزدوج / باب رئيسي" },
    ],
    "polygon-tents": [
        { nameEn: "Transparent PVC Roof", nameAr: "سقف من البي في سي الشفاف" },
        { nameEn: "PVC Roof", nameAr: "سقف من البي في سي" },
        { nameEn: "Sandwich Panel Wall", nameAr: "جوانب من الساندوتش بانل الصلب" },
        { nameEn: "PVC Wall", nameAr: "جوانب من البي في سي" },
        { nameEn: "Glass Wall", nameAr: "جدران زجاجية" },
        { nameEn: "Glass Window", nameAr: "نافذة زجاجية" },
        { nameEn: "French Window", nameAr: "نوافذ فرنسية" },
        { nameEn: "Wooden Flooring", nameAr: "أرضيات من الباركيه" },
        { nameEn: "Emergency Exit", nameAr: "مخرج طوارئ" },
        { nameEn: "Decor & Curtains", nameAr: "بطائن الديكور الداخلي" },
        { nameEn: "Main Entrance", nameAr: "مدخل مزدوج / باب رئيسي" },
    ],
    "cone-tents": [
        { nameEn: "Transparent PVC Roof", nameAr: "سقف من البي في سي الشفاف" },
        { nameEn: "PVC Roof", nameAr: "سقف من البي في سي" },
        { nameEn: "Sandwich Panel Wall", nameAr: "جوانب من الساندوتش بانل الصلب" },
        { nameEn: "PVC Wall", nameAr: "جوانب من البي في سي" },
        { nameEn: "Glass Wall", nameAr: "جدران زجاجية" },
        { nameEn: "Glass Window", nameAr: "نافذة زجاجية" },
        { nameEn: "French Window", nameAr: "نوافذ فرنسية" },
        { nameEn: "Wooden Flooring", nameAr: "أرضيات من الباركيه" },
        { nameEn: "Emergency Exit", nameAr: "مخرج طوارئ" },
        { nameEn: "Decor & Curtains", nameAr: "بطائن الديكور الداخلي" },
        { nameEn: "Main Entrance", nameAr: "مدخل مزدوج / باب رئيسي" },
    ],
    "exhibition-equipment": [
        { nameEn: "Focus Light", nameAr: "الإضاءة" },
        { nameEn: "Reception Table", nameAr: "طاولة استقبال" },
        { nameEn: "Display Table", nameAr: "طاولة العرض" },
        { nameEn: "Chairs", nameAr: "الكراسي" },
        { nameEn: "Curved Table", nameAr: "الطاولة المقوسة" },
        { nameEn: "Showcase", nameAr: "خزانة العرض" },
    ],
    "dome-tents": [
        { nameEn: "Transparent PVC Roof", nameAr: "سقف من البي في سي الشفاف" },
        { nameEn: "PVC Side Wall", nameAr: "جوانب من البي في سي" },
        { nameEn: "Frame Pipes", nameAr: "هيكل الإطار" },
        { nameEn: "Wooden Flooring", nameAr: "أرضيات من الباركيه" },
    ],
    "cube-tents": [
        { nameEn: "PVC Roof", nameAr: "سقف من البي في سي" },
        { nameEn: "Decor & Curtains", nameAr: "بطائن الديكور الداخلي" },
        { nameEn: "Emergency Exit", nameAr: "مخرج طوارئ" },
        { nameEn: "Main Entrance", nameAr: "مدخل مزدوج / باب رئيسي" },
        { nameEn: "Glass Wall", nameAr: "جدران زجاجية" },
        { nameEn: "PVC Wall", nameAr: "جوانب من البي في سي" },
        { nameEn: "Glass Window", nameAr: "نافذة زجاجية" },
        { nameEn: "Wooden Flooring", nameAr: "أرضيات من الباركيه" },
    ],
    "arched-tents": [
        { nameEn: "Transparent PVC Roof", nameAr: "سقف من البي في سي الشفاف" },
        { nameEn: "PVC Roof", nameAr: "سقف من البي في سي" },
        { nameEn: "Sandwich Panel Wall", nameAr: "جوانب من الساندوتش بانل الصلب" },
        { nameEn: "PVC Wall", nameAr: "جوانب من البي في سي" },
        { nameEn: "Glass Wall", nameAr: "جدران زجاجية" },
        { nameEn: "Glass Window", nameAr: "نافذة زجاجية" },
        { nameEn: "French Window", nameAr: "نوافذ فرنسية" },
        { nameEn: "Wooden Flooring", nameAr: "أرضيات من الباركيه" },
        { nameEn: "Emergency Exit", nameAr: "مخرج طوارئ" },
        { nameEn: "Decor & Curtains", nameAr: "بطائن الديكور الداخلي" },
        { nameEn: "Main Entrance", nameAr: "مدخل مزدوج / باب رئيسي" },
    ],
    "car-parking-shades": [
        { nameEn: "PVC Cover", nameAr: "غطاء من البي في سي" },
        { nameEn: "Frame Pipes", nameAr: "هيكل الإطار" },
    ],
};

async function main() {
    await client.connect();

    console.log("🏕️  Starting tent details seeding...\n");

    // Get all existing tents
    const existingTents = await db.select().from(tent);
    console.log(`Found ${existingTents.length} existing tents\n`);

    for (const existingTent of existingTents) {
        const slugEn = existingTent.slugEn;
        console.log(`Processing tent: ${existingTent.nameEn} (${slugEn})`);

        // Seed sizes
        const sizesData = tentSizesData[slugEn];
        if (sizesData) {
            console.log(`  Seeding ${sizesData.length} sizes...`);
            for (const size of sizesData) {
                await db.insert(tentSize).values({
                    id: nanoid(),
                    tentId: existingTent.id,
                    ...size,
                });
            }
        } else {
            console.log(`  No sizes data found for ${slugEn}`);
        }

        // Seed specification
        const specData = tentSpecsData[slugEn];
        if (specData) {
            console.log(`  Seeding specification...`);
            await db.insert(tentSpecification).values({
                id: nanoid(),
                tentId: existingTent.id,
                ...specData,
            });
        } else {
            console.log(`  No specification data found for ${slugEn}`);
        }

        // Seed accessories
        const accessoriesData = tentAccessoriesData[slugEn];
        if (accessoriesData) {
            console.log(`  Seeding ${accessoriesData.length} accessories...`);
            for (const accessory of accessoriesData) {
                await db.insert(tentAccessory).values({
                    id: nanoid(),
                    tentId: existingTent.id,
                    ...accessory,
                });
            }
        } else {
            console.log(`  No accessories data found for ${slugEn}`);
        }

        console.log(`  ✅ Done\n`);
    }

    console.log("🎉 All tent details seeded successfully!");
    await client.end();
}

main().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
