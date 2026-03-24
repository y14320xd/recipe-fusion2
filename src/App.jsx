import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 導入動畫庫

// --- 食譜數據庫 ---
const recipes = [
  { ingredients: ["多利魚", "奶油", "蒜頭"], name: "奶油蒜香煎多利魚", nutrition: "低脂無刺、香氣濃郁", defrostTime: 15, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 多利魚排洗淨擦乾", "2. 熱鍋下奶油，放入蒜片呈現金黃", "3. 放入魚排中小火煎至兩面金黃", "4. 撒上少許鹽巴即可出鍋"] },
  { ingredients: ["虱目魚", "味噌", "薑"], name: "味噌薑絲虱目魚肚", nutrition: "優質油脂、滋補首選", defrostTime: 20, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 虱目魚肚抹上薄薄味噌", "2. 薑切絲鋪在魚肚上", "3. 放入蒸鍋或平底鍋悶煮", "4. 待魚肉熟透，味噌香氣滲入即可"] },
  { ingredients: ["石斑魚", "醬油", "薑"], name: "清蒸醬油石斑魚", nutrition: "膠原蛋白豐富、肉質Q彈", defrostTime: 25, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 石斑魚洗淨劃刀，鋪上薑片", "2. 大火蒸約 8-10 分鐘", "3. 倒掉多餘魚湯，淋上適量醬油", "4. 淋上熱油激發香氣更佳"] },
  { ingredients: ["秋刀魚", "蒜頭"], name: "鹽抹秋刀魚配蒜酥", nutrition: "高 Omega-3、下酒良伴", defrostTime: 15, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 秋刀魚表面抹鹽，靜置 5 分鐘", "2. 蒜頭切末炸成金黃蒜酥備用", "3. 魚入鍋煎至兩面酥脆逼出油脂", "4. 撒上蒜酥即可享用"] },
  { ingredients: ["白帶魚", "醬油"], name: "香煎白帶魚捲", nutrition: "古早風味、酥脆可口", defrostTime: 20, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 白帶魚洗淨切段 or 捲起固定", "2. 熱鍋煎至表面金黃酥脆", "3. 起鍋前沿鍋邊淋入一圈醬油", "4. 醬汁焦化產生香氣後即可起鍋"] },
  { ingredients: ["鬼頭刀", "高麗菜", "味噌"], name: "高麗菜味噌燉鬼頭刀", nutrition: "紮實肉質、蔬菜鮮甜", defrostTime: 20, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 鬼頭刀切塊略煎定型", "2. 加入水與高麗菜煮軟", "3. 將味噌拌勻後倒入鍋中", "4. 小火燉煮 5 分鐘讓魚肉入味"] },
  { ingredients: ["比目魚", "小白菜"], name: "小白菜炒比目魚片", nutrition: "質地細緻、滑順爽口", defrostTime: 20, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 比目魚切片備用", "2. 先炒軟小白菜梗，再入菜葉", "3. 放入魚片快速拌炒至變色", "4. 簡單鹽巴調味，口感極為滑嫩"] },
  { ingredients: ["午仔魚", "青江菜", "醬油"], name: "青江菜醬燒午仔魚", nutrition: "細緻油脂、紅燒入味", defrostTime: 15, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 午仔魚兩面煎黃", "2. 加入醬油、水、少許糖紅燒", "3. 放入青江菜悶煮吸附醬汁", "4. 待湯汁收乾即可擺盤"] },
  { ingredients: ["黃魚", "菠菜", "奶油"], name: "菠菜奶油拌黃魚", nutrition: "溫潤配菜、營養均衡", defrostTime: 20, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 黃魚煎熟後去骨拆成碎肉", "2. 奶油下鍋炒香菠菜", "3. 加入魚肉快速拌炒", "4. 奶油香與魚肉鮮味完美融合"] },
  { ingredients: ["多利魚", "小白菜", "蒜頭", "醬油"], name: "蒜泥白灼多利魚片", nutrition: "低卡清爽、健身首選", defrostTime: 10, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 魚片與小白菜分別燙熟", "2. 將魚片鋪在小白菜上", "3. 蒜末加醬油調成蒜泥醬汁", "4. 淋上醬汁即可享用"] },
  { ingredients: ["石斑魚", "午仔魚", "薑", "味噌"], name: "薑絲鮮魚味噌湯", nutrition: "暖胃經典、鮮味十足", defrostTime: 20, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 水滾後放入薑絲與魚塊", "2. 煮至魚肉變白熟透", "3. 熄火加入味噌攪拌均勻", "4. 撒上蔥花即可完成"] },
  { ingredients: ["比目魚", "高麗菜", "奶油", "蒜頭"], name: "奶油高麗菜蒸魚排", nutrition: "懶人料理、一鍋完成", defrostTime: 20, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 盤底鋪滿高麗菜，放上魚排", "2. 擺上蒜片與一塊奶油", "3. 整盤放入電鍋，外鍋半杯水", "4. 蒸熟後蔬菜吸飽鮮魚奶油香"] },
  { ingredients: ["鬼頭刀", "醬油", "蒜頭", "薑"], name: "醬油蒜燒鬼頭刀塊", nutrition: "紮實口感、酷似雞肉", defrostTime: 20, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 鬼頭刀切塊，先入鍋煎至上色", "2. 放入蒜頭與薑片爆香", "3. 加入醬油與水收汁", "4. 煮至湯汁濃稠，口感紮實彈牙"] },
  { ingredients: ["秋刀魚", "醬油", "薑"], name: "秋刀魚生薑醬油煮", nutrition: "日式風味、非常下飯", defrostTime: 15, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 秋刀魚切段，放入大量生薑絲", "2. 加入醬油、水與少許味醂", "3. 小火慢煮 15 分鐘至軟爛", "4. 醬汁完全滲入魚骨更美味"] },
  { ingredients: ["黃魚", "高麗菜", "薑"], name: "鮮魚蔬菜雜炊", nutrition: "全齡皆宜、鮮甜好吸收", defrostTime: 25, buyUrl: "https://www.facebook.com/zfresh_life/shop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", steps: ["1. 黃魚煎熟拆碎，高麗菜切絲", "2. 魚湯或清水加飯煮成粥", "3. 放入高麗菜絲與魚肉", "4. 撒上薑絲煮滾，鮮味飽滿"] }
];

const fishList = ["虱目魚", "比目魚", "石斑魚", "午仔魚", "秋刀魚", "黃魚", "多利魚", "鬼頭刀", "白帶魚"];
const vegetableList = ["青江菜", "菠菜", "高麗菜", "小白菜"];
const seasoningList = ["蒜頭", "薑", "味噌", "醬油", "奶油"];

export default function App() {
  const [selectedFish, setSelectedFish] = useState([]);
  const [selectedVeg, setSelectedVeg] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState([]);
  const [activeRecipe, setActiveRecipe] = useState(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#09090b";
    
    if (!document.getElementById("fa-style")) {
      const link = document.createElement("link");
      link.id = "fa-style";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  const toggle = (item, state, setter) => {
    setter(state.includes(item) ? state.filter(i => i !== item) : [...state, item]);
  };

  const allSelected = [...selectedFish, ...selectedVeg, ...selectedSeason];

  const filteredRecipes = allSelected.length === 0 
    ? [] 
    : recipes.filter(r => {
        const hasFish = selectedFish.length === 0 || selectedFish.some(f => r.ingredients.includes(f));
        const hasVeg = selectedVeg.length === 0 || selectedVeg.some(v => r.ingredients.includes(v));
        const hasSeason = selectedSeason.length === 0 || selectedSeason.some(s => r.ingredients.includes(s));
        return hasFish && hasVeg && hasSeason;
      })
      .sort((a, b) => {
        const matchA = a.ingredients.filter(i => allSelected.includes(i)).length;
        const matchB = b.ingredients.filter(i => allSelected.includes(i)).length;
        return matchB - matchA;
      });

  const btnStyle = (item, list, color) => ({
    padding: "10px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer", fontSize: "14px", fontWeight: "500",
    backgroundColor: list.includes(item) ? color : "#18181b",
    color: list.includes(item) ? "white" : "#a1a1aa",
    outline: "none"
  });

  return (
    <div style={{ backgroundColor: "#09090b", color: "#f4f4f5", minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "clamp(48px, 8vw, 72px)", fontWeight: "900", margin: 0, background: "linear-gradient(135deg, #3b82f6, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>智鮮生活</h1>
        <p style={{ color: "#71717a", fontSize: "clamp(14px, 2vw, 18px)", letterSpacing: "8px", marginTop: "10px" }}>SMART FRESH LIFE</p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#18181b", padding: "30px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <Section title="STEP 1. 選擇魚種" color="#3b82f6" list={fishList} selected={selectedFish} onToggle={item => toggle(item, selectedFish, setSelectedFish)} btnStyle={btnStyle} activeColor="#2563eb" />
        <Section title="STEP 2. 現有食材" color="#10b981" list={vegetableList} selected={selectedVeg} onToggle={item => toggle(item, selectedVeg, setSelectedVeg)} btnStyle={btnStyle} activeColor="#059669" />
        <Section title="STEP 3. 廚房調味" color="#a1a1aa" list={seasoningList} selected={selectedSeason} onToggle={item => toggle(item, selectedSeason, setSelectedSeason)} btnStyle={btnStyle} activeColor="#52525b" />
      </div>

      <div style={{ maxWidth: "800px", margin: "50px auto" }}>
        <AnimatePresence mode="wait">
          {allSelected.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}
            >
              {filteredRecipes.map((r, index) => (
                <RecipeCard key={r.name} recipe={r} index={index} onClick={() => setActiveRecipe(r)} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: "center", padding: "80px 20px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "24px" }}
            >
              <h3 style={{ color: "#71717a", fontWeight: "500" }}>請選取食材來精準篩選</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {activeRecipe && (
        <RecipeModal 
          recipe={activeRecipe} 
          onClose={() => setActiveRecipe(null)} 
          onIgShare={() => window.open(`https://www.instagram.com/reels/create/`)}
        />
      )}
    </div>
  );
}

// --- 組件部分 ---

function Section({ title, color, list, selected, onToggle, btnStyle, activeColor }) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <h3 style={{ color, fontSize: "13px", fontWeight: "700", marginBottom: "15px" }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {list.map(item => (
          <motion.button 
            key={item} 
            whileHover={{ scale: 1.05 }} // 滑鼠懸停微放
            whileTap={{ scale: 0.95 }}   // 點擊縮放反饋
            style={btnStyle(item, selected, activeColor)} 
            onClick={() => onToggle(item)}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function RecipeCard({ recipe, index, onClick }) {
  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }} // 初始位置在下方且透明
      animate={{ opacity: 1, y: 0 }}   // 向上浮現
      transition={{ delay: index * 0.05 }} // 階梯式進場
      whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.5)" }} // 懸停往上飄一點
      style={{ padding: "20px", backgroundColor: "#18181b", borderRadius: "16px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={{ fontWeight: "700", fontSize: "18px" }}>{recipe.name}</div>
      <div style={{ fontSize: "12px", color: "#3b82f6" }}>{recipe.nutrition}</div>
    </motion.div>
  );
}

function RecipeModal({ recipe, onClose, onIgShare }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100, padding: "20px" }} 
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ backgroundColor: "#18181b", padding: "30px", borderRadius: "28px", maxWidth: "500px", width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }} 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", fontSize: "20px" }}><i className="fa-solid fa-xmark"></i></button>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>{recipe.name}</h2>
        
        <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9", backgroundColor: "#000", marginBottom: "20px" }}>
          <iframe width="100%" height="100%" src={recipe.videoUrl} frameBorder="0" allowFullScreen title="recipe-video"></iframe>
        </div>

        <div style={{ backgroundColor: "#09090b", padding: "20px", borderRadius: "16px", marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#3b82f6" }}>料理步驟</h4>
          <ol style={{ paddingLeft: "15px", margin: 0, color: "#f4f4f5", lineHeight: "1.8" }}>
            {recipe.steps.map((s, i) => <li key={i}>{s.replace(/^\d+\.\s*/, '')}</li>)}
          </ol>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(recipe.buyUrl)} 
            style={{ padding: "16px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer" }}
          >
            立即購買食材
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onIgShare} 
            style={{ padding: "16px", background: "linear-gradient(45deg, #f09433, #bc1888)", color: "white", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer" }}
          >
            分享到 Instagram
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}