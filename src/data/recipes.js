// 1. 食材分組 (分類標籤)
export const ingredientsData = [
  { 
    category: "🥬 菜菜們", 
    items: ["番茄", "胡蘿蔔", "白蘿蔔", "青菜", "西蘭花", "黃瓜", "高麗菜", "茄子", "馬鈴薯"] 
  },
  { 
    category: "🥩 肉肉與蛋白質", 
    items: ["雞蛋", "雞肉", "豬肉", "牛肉", "豆腐"] 
  },
  { 
    category: "🧂 辛香料", 
    items: ["大蒜", "薑", "蔥", "辣椒", "九層塔"] 
  }
];

// 2. 大量食譜資料庫 (合成公式)
export const recipes = [
  {
    id: 1,
    name: "番茄炒蛋",
    ingredients: ["番茄", "雞蛋"],
    time: "10分鐘",
    difficulty: "簡單",
    description: "經典家常菜，酸甜可口，超級下飯。"
  },
  {
    id: 2,
    name: "蒜蓉西蘭花",
    ingredients: ["西蘭花", "大蒜"],
    time: "10分鐘",
    difficulty: "簡單",
    description: "清爽健康的蒜炒蔬菜，保留蔬菜原味。"
  },
  {
    id: 3,
    name: "三杯雞",
    ingredients: ["雞肉", "大蒜", "薑", "九層塔"],
    time: "25分鐘",
    difficulty: "中等",
    description: "濃郁鹹香的台灣味，麻油與九層塔的完美結合。"
  },
  {
    id: 4,
    name: "麻婆豆腐",
    ingredients: ["豆腐", "豬肉", "大蒜", "辣椒"],
    time: "15分鐘",
    difficulty: "中等",
    description: "麻辣鮮香，拌飯神菜。"
  },
  {
    id: 5,
    name: "咖哩牛肉",
    ingredients: ["牛肉", "馬鈴薯", "胡蘿蔔"],
    time: "40分鐘",
    difficulty: "中等",
    description: "濃郁的咖哩醬汁搭配軟爛的馬鈴薯與牛肉。"
  },
  {
    id: 6,
    name: "蔥爆牛肉",
    ingredients: ["牛肉", "蔥", "大蒜"],
    time: "15分鐘",
    difficulty: "簡單",
    description: "大火快炒，鎖住牛肉肉汁與青蔥香氣。"
  },
  {
    id: 7,
    name: "涼拌小黃瓜",
    ingredients: ["黃瓜", "大蒜", "辣椒"],
    time: "5分鐘",
    difficulty: "極簡",
    description: "夏日必備涼菜，清脆解膩。"
  },
  {
    id: 8,
    name: "紅蘿蔔炒蛋",
    ingredients: ["胡蘿蔔", "雞蛋", "蔥"],
    time: "10分鐘",
    difficulty: "簡單",
    description: "營養滿分的家常小菜，色彩鮮豔。"
  }
];