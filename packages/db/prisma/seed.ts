import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 都道府県マスタ
  const prefectures = [
    { code: "01", name: "北海道" },
    { code: "02", name: "青森県" },
    { code: "03", name: "岩手県" },
    { code: "04", name: "宮城県" },
    { code: "05", name: "秋田県" },
    { code: "06", name: "山形県" },
    { code: "07", name: "福島県" },
    { code: "08", name: "茨城県" },
    { code: "09", name: "栃木県" },
    { code: "10", name: "群馬県" },
    { code: "11", name: "埼玉県" },
    { code: "12", name: "千葉県" },
    { code: "13", name: "東京都" },
    { code: "14", name: "神奈川県" },
    { code: "15", name: "新潟県" },
    { code: "16", name: "富山県" },
    { code: "17", name: "石川県" },
    { code: "18", name: "福井県" },
    { code: "19", name: "山梨県" },
    { code: "20", name: "長野県" },
    { code: "21", name: "岐阜県" },
    { code: "22", name: "静岡県" },
    { code: "23", name: "愛知県" },
    { code: "24", name: "三重県" },
    { code: "25", name: "滋賀県" },
    { code: "26", name: "京都府" },
    { code: "27", name: "大阪府" },
    { code: "28", name: "兵庫県" },
    { code: "29", name: "奈良県" },
    { code: "30", name: "和歌山県" },
    { code: "31", name: "鳥取県" },
    { code: "32", name: "島根県" },
    { code: "33", name: "岡山県" },
    { code: "34", name: "広島県" },
    { code: "35", name: "山口県" },
    { code: "36", name: "徳島県" },
    { code: "37", name: "香川県" },
    { code: "38", name: "愛媛県" },
    { code: "39", name: "高知県" },
    { code: "40", name: "福岡県" },
    { code: "41", name: "佐賀県" },
    { code: "42", name: "長崎県" },
    { code: "43", name: "熊本県" },
    { code: "44", name: "大分県" },
    { code: "45", name: "宮崎県" },
    { code: "46", name: "鹿児島県" },
    { code: "47", name: "沖縄県" },
  ];

  for (const pref of prefectures) {
    await prisma.prefecture.upsert({
      where: { code: pref.code },
      update: {},
      create: pref,
    });
  }
  console.log(`  ${prefectures.length} prefectures seeded`);

  // 主要政党
  const parties = [
    { name: "自由民主党", shortName: "自民", color: "#E3242B", website: "https://www.jimin.jp/" },
    { name: "立憲民主党", shortName: "立憲", color: "#1E50A2", website: "https://cdp-japan.jp/" },
    { name: "日本維新の会", shortName: "維新", color: "#38B48B", website: "https://o-ishin.jp/" },
    { name: "公明党", shortName: "公明", color: "#F39800", website: "https://www.komei.or.jp/" },
    { name: "国民民主党", shortName: "国民", color: "#FCC800", website: "https://new-kokumin.jp/" },
    { name: "日本共産党", shortName: "共産", color: "#D7003A", website: "https://www.jcp.or.jp/" },
    {
      name: "れいわ新選組",
      shortName: "れいわ",
      color: "#ED6D8E",
      website: "https://reiwa-shinsengumi.com/",
    },
    { name: "社会民主党", shortName: "社民", color: "#E85298", website: "https://sdp.or.jp/" },
    { name: "参政党", shortName: "参政", color: "#FF8C00", website: "https://www.sanseito.jp/" },
    { name: "日本保守党", shortName: "保守", color: "#8B4513", website: "https://hoshuto.jp/" },
    {
      name: "チームみらい",
      shortName: "みらい",
      color: "#00B4D8",
      website: "https://team-mir.ai/",
    },
    { name: "NHK党", shortName: "N党", color: "#FF6B00", website: "https://www.nhk-party.jp/" },
    {
      name: "教育無償化を実現する会",
      shortName: "教育",
      color: "#00A651",
      website: "https://kyoiku-mushouka.jp/",
    },
    { name: "沖縄社会大衆党", shortName: "社大", color: "#FF4500", website: "https://shadai.jp/" },
    { name: "無所属", shortName: "無", color: "#808080", website: null },
  ];

  for (const party of parties) {
    await prisma.party.upsert({
      where: { name: party.name },
      update: { shortName: party.shortName, color: party.color, website: party.website },
      create: party,
    });
  }
  console.log(`  ${parties.length} parties seeded`);

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
