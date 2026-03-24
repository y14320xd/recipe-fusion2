import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 食譜數據庫 (維持 45 道料理) ---
const recipesByFish = {
  "多利魚": [
    { name: "奶油蒜香煎多利魚", ingredients: ["奶油", "蒜頭"], nutrition: "香氣濃郁", videoUrl: "https://www.youtube.com/embed/SshM_67X734", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚排洗淨擦乾", "2. 奶油爆香蒜片", "3. 煎至兩面金黃"] },
    { name: "蒜泥白灼多利魚片", ingredients: ["小白菜", "蒜頭", "醬油"], nutrition: "低脂健身", videoUrl: "https://www.youtube.com/embed/5T6oHlB0x2c", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚片燙熟", "2. 鋪在燙熟小白菜上", "3. 淋上蒜泥醬油"] },
    { name: "泰式酸辣多利魚", ingredients: ["薑", "蒜頭", "醬油"], nutrition: "開胃爽口", videoUrl: "https://www.youtube.com/embed/rV578P-7Q1M", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚片蒸熟", "2. 調製酸辣醬汁淋上"] },
    { name: "味噌多利魚片湯", ingredients: ["味噌", "薑"], nutrition: "暖胃鮮甜", videoUrl: "https://www.youtube.com/embed/x8I-6K93U5A", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 水滾放薑絲", "2. 熄火拌入味噌"] },
    { name: "高麗菜煮魚片", ingredients: ["高麗菜", "薑"], nutrition: "清甜好吸收", videoUrl: "https://www.youtube.com/embed/Z0Ym7rK-5O8", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 高麗菜煮軟", "2. 放入魚片煮熟"] }
  ],
  "虱目魚": [
    { name: "味噌薑絲虱目魚肚", ingredients: ["味噌", "薑"], nutrition: "油脂豐富", videoUrl: "https://www.youtube.com/embed/w7WjT-3-D0E", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚肚抹味噌", "2. 鋪薑絲悶煮熟透"] },
    { name: "醬油紅燒虱目魚肚", ingredients: ["醬油", "蒜頭", "薑"], nutrition: "經典家常", videoUrl: "https://www.youtube.com/embed/6m7pA4UfVv0", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 煎香魚肚", "2. 放入薑蒜醬油收汁"] },
    { name: "青江菜虱目魚丸湯", ingredients: ["青江菜", "薑"], nutrition: "輕便快速", videoUrl: "https://www.youtube.com/embed/8F6vS8XW3Yc", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 薑絲煮滾放魚丸", "2. 加入青江菜煮熟"] },
    { name: "蒜酥香煎虱目魚", ingredients: ["蒜頭"], nutrition: "酥脆下酒", videoUrl: "https://www.youtube.com/embed/G8oY8T8u6f4", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚肉抹鹽煎酥", "2. 撒上炸好的蒜酥"] },
    { name: "高麗菜虱目魚粥", ingredients: ["高麗菜", "薑"], nutrition: "滋補首選", videoUrl: "https://www.youtube.com/embed/Z0Ym7rK-5O8", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 煮好稀飯放高麗菜", "2. 加入魚肚與薑絲煮滾"] }
  ],
  "石斑魚": [
    { name: "清蒸醬油石斑魚", ingredients: ["醬油", "薑"], nutrition: "肉質彈牙", videoUrl: "https://www.youtube.com/embed/Q0P7j9V7Cpk", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚身劃刀鋪薑片", "2. 大火蒸10分鐘淋醬油"] },
    { name: "薑絲石斑鮮魚湯", ingredients: ["薑"], nutrition: "鮮味十足", videoUrl: "https://www.youtube.com/embed/x8I-6K93U5A", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 水滾放薑絲", "2. 放入石斑魚塊煮熟"] },
    { name: "奶油蒜燒石斑魚", ingredients: ["奶油", "蒜頭"], nutrition: "濃厚中西合璧", videoUrl: "https://www.youtube.com/embed/SshM_67X734", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 石斑魚塊煎黃", "2. 放入奶油蒜片炒香"] },
    { name: "小白菜燉石斑魚", ingredients: ["小白菜", "味噌"], nutrition: "口感滑順", videoUrl: "https://www.youtube.com/embed/m7wFf3S3j68", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 煮開味噌湯", "2. 放石斑魚與小白菜煮熟"] },
    { name: "紅燒醬油石斑", ingredients: ["醬油", "蒜頭", "薑"], nutrition: "喜慶大菜", videoUrl: "https://www.youtube.com/embed/6m7pA4UfVv0", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚兩面煎香", "2. 加調味料悶煮入味"] }
  ],
  "秋刀魚": [
    { name: "鹽抹秋刀魚配蒜酥", ingredients: ["蒜頭"], nutrition: "豐富Omega-3", videoUrl: "https://www.youtube.com/embed/C28Rk79v_L4", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚身抹鹽", "2. 煎出油脂搭配蒜酥"] },
    { name: "秋刀魚生薑醬油煮", ingredients: ["醬油", "薑"], nutrition: "日式下飯", videoUrl: "https://www.youtube.com/embed/S_8nB_F4T1Y", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 秋刀魚切段", "2. 加薑片醬油慢火煮"] },
    { name: "味噌滷秋刀魚", ingredients: ["味噌", "薑"], nutrition: "軟化魚骨", videoUrl: "https://www.youtube.com/embed/S_8nB_F4T1Y", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 調製味噌水", "2. 與秋刀魚段小火燉煮"] },
    { name: "奶油蒜香秋刀魚", ingredients: ["奶油", "蒜頭"], nutrition: "洋風料理", videoUrl: "https://www.youtube.com/embed/SshM_67X734", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 奶油熱鍋", "2. 煎熟秋刀魚後撒蒜末"] },
    { name: "高麗菜秋刀魚煮", ingredients: ["高麗菜", "醬油"], nutrition: "甜味平衡", videoUrl: "https://www.youtube.com/embed/Z0Ym7rK-5O8", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 高麗菜鋪底", "2. 放上秋刀魚段加醬油蒸煮"] }
  ],
  "黃魚": [
    { name: "菠菜奶油拌黃魚", ingredients: ["菠菜", "奶油"], nutrition: "細緻美味", videoUrl: "https://www.youtube.com/embed/S8k7_9v-Yy8", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 煎黃魚拆肉", "2. 與奶油菠菜快炒"] },
    { name: "鮮魚蔬菜雜炊", ingredients: ["高麗菜", "薑"], nutrition: "清爽好吸收", videoUrl: "https://www.youtube.com/embed/Z0Ym7rK-5O8", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 煎熟黃魚拆肉", "2. 與飯、高麗菜煮粥"] },
    { name: "醬油紅燒黃魚", ingredients: ["醬油", "蒜頭", "薑"], nutrition: "宴客首選", videoUrl: "https://www.youtube.com/embed/6m7pA4UfVv0", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚兩面煎黃", "2. 加入蔥薑蒜醬油悶煮"] },
    { name: "蒜泥蒸黃魚", ingredients: ["蒜頭", "醬油"], nutrition: "重口味推薦", videoUrl: "https://www.youtube.com/embed/Q0P7j9V7Cpk", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 鋪滿蒜泥", "2. 大火蒸熟淋醬油"] },
    { name: "味噌煮黃魚", ingredients: ["味噌", "薑"], nutrition: "日式溫潤", videoUrl: "https://www.youtube.com/embed/w7WjT-3-D0E", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 薑絲煮滾", "2. 加入黃魚與味噌慢煮"] }
  ],
  "白帶魚": [
    { name: "香煎白帶魚捲", ingredients: ["醬油"], nutrition: "外酥內嫩", videoUrl: "https://www.youtube.com/embed/39908F_A39c", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚捲固定", "2. 煎至金黃噴醬油"] },
    { name: "蒜片白帶魚", ingredients: ["蒜頭"], nutrition: "酥脆辛香", videoUrl: "https://www.youtube.com/embed/G8oY8T8u6f4", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚塊煎酥", "2. 搭配大量蒜片"] },
    { name: "奶油白帶魚", ingredients: ["奶油", "薑"], nutrition: "中西合璧", videoUrl: "https://www.youtube.com/embed/SshM_67X734", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 奶油爆香薑絲", "2. 快速煎熟魚塊"] },
    { name: "小白菜白帶魚湯", ingredients: ["小白菜", "薑"], nutrition: "清爽解膩", videoUrl: "https://www.youtube.com/embed/8F6vS8XW3Yc", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 薑絲煮湯", "2. 加入白帶魚與小白菜"] },
    { name: "味噌燉白帶魚", ingredients: ["味噌", "蒜頭"], nutrition: "濃郁口感", videoUrl: "https://www.youtube.com/embed/w7WjT-3-D0E", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 蒜頭炒香加水", "2. 拌入味噌與魚塊燉煮"] }
  ],
  "鬼頭刀": [
    { name: "高麗菜味噌燉鬼頭刀", ingredients: ["高麗菜", "味噌"], nutrition: "紮實彈牙", videoUrl: "https://www.youtube.com/embed/m7wFf3S3j68", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚塊略煎", "2. 與高麗菜味噌同煮"] },
    { name: "醬油蒜燒鬼頭刀塊", ingredients: ["醬油", "蒜頭", "薑"], nutrition: "像雞肉般口感", videoUrl: "https://www.youtube.com/embed/C9_O3lT2R3U", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 爆香薑蒜", "2. 魚塊入鍋加醬油收汁"] },
    { name: "奶油鬼頭刀排", ingredients: ["奶油", "蒜頭"], nutrition: "豪邁肉質感", videoUrl: "https://www.youtube.com/embed/SshM_67X734", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚排兩面抹鹽", "2. 奶油煎香至熟透"] },
    { name: "菠菜拌鬼頭刀", ingredients: ["菠菜", "醬油"], nutrition: "營養滿分", videoUrl: "https://www.youtube.com/embed/yW9l9mP-0oM", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚塊燙熟", "2. 與菠菜快炒淋醬油"] },
    { name: "鬼頭刀味噌湯", ingredients: ["味噌", "薑"], nutrition: "家常必備", videoUrl: "https://www.youtube.com/embed/x8I-6K93U5A", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 水滾放薑絲", "2. 加入鬼頭刀與味噌"] }
  ],
  "比目魚": [
    { name: "小白菜炒比目魚片", ingredients: ["小白菜"], nutrition: "質地細緻", videoUrl: "https://www.youtube.com/embed/yW9l9mP-0oM", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚片快速過油", "2. 加入小白菜拌炒"] },
    { name: "奶油高麗菜蒸魚排", ingredients: ["高麗菜", "奶油", "蒜頭"], nutrition: "懶人料理", videoUrl: "https://www.youtube.com/embed/qZ6zC9yG_G0", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 盤底鋪菜放魚", "2. 放奶油蒜片蒸10分"] },
    { name: "清蒸醬油比目魚", ingredients: ["醬油", "薑"], nutrition: "滑嫩入口", videoUrl: "https://www.youtube.com/embed/Q0P7j9V7Cpk", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚身鋪薑絲", "2. 大火蒸熟淋醬油"] },
    { name: "香煎奶油比目魚", ingredients: ["奶油"], nutrition: "法式風情", videoUrl: "https://www.youtube.com/embed/SshM_67X734", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚片抹薄粉", "2. 奶油煎至兩面金黃"] },
    { name: "比目魚味噌燒", ingredients: ["味噌", "蒜頭"], nutrition: "香濃入味", videoUrl: "https://www.youtube.com/embed/w7WjT-3-D0E", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚片抹味噌", "2. 放入烤箱或平底鍋燒熟"] }
  ],
  "午仔魚": [
    { name: "青江菜醬燒午仔魚", ingredients: ["青江菜", "醬油"], nutrition: "油脂最高", videoUrl: "https://www.youtube.com/embed/L6q9_5f3D_o", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚兩面煎香", "2. 加醬油與青江菜悶煮"] },
    { name: "清蒸午仔魚", ingredients: ["薑", "醬油"], nutrition: "最鮮吃法", videoUrl: "https://www.youtube.com/embed/Q0P7j9V7Cpk", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 鋪薑絲大火蒸8分", "2. 淋上醬油熱油"] },
    { name: "乾煎午仔魚", ingredients: ["蒜頭"], nutrition: "皮酥肉嫩", videoUrl: "https://www.youtube.com/embed/G8oY8T8u6f4", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 魚身抹鹽", "2. 煎至酥脆搭配蒜頭"] },
    { name: "奶油午仔魚片", ingredients: ["奶油", "薑"], nutrition: "溫潤高級感", videoUrl: "https://www.youtube.com/embed/SshM_67X734", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 奶油爆香薑絲", "2. 快速煎熟午仔魚片"] },
    { name: "午仔魚味噌湯", ingredients: ["味噌", "薑"], nutrition: "營養精華", videoUrl: "https://www.youtube.com/embed/x8I-6K93U5A", buyUrl: "https://www.facebook.com/zfresh_life/shop", steps: ["1. 薑絲水滾", "2. 加入魚塊與味噌拌勻"] }
  ]
};

const fishList = Object.keys(recipesByFish);
const orangeCook = "#e67e22"; 
const blueMarine = "#34495e"; 
const bgWarm = "#f9f7f2"; 

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedFish, setSelectedFish] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [showBrandStory, setShowBrandStory] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = bgWarm;
    if (!document.getElementById("fa-style")) {
      const link = document.createElement("link");
      link.id = "fa-style";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  const currentRecipes = (!selectedFish) ? [] : recipesByFish[selectedFish].filter(r => 
    selectedIngredients.every(i => r.ingredients.includes(i))
  );

  return (
    <div style={{ color: "#2c3e50", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      <div style={{ padding: "40px 15px 60px 15px", flex: "1" }}>
        <header style={{ textAlign: "center", marginBottom: "40px", position: "relative" }}>
          <button onClick={() => setShowBrandStory(true)} style={{ position: "absolute", top: -10, right: 0, background: "none", border: `1px solid ${orangeCook}`, color: orangeCook, fontSize: "0.7rem", padding: "3px 8px", borderRadius: "20px" }}>關於品牌</button>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: blueMarine, margin: 0, letterSpacing: "2px" }}>智鮮生活</h1>
          <p style={{ color: orangeCook, fontSize: "0.9rem", fontWeight: "600", letterSpacing: "5px", marginTop: "5px" }}>SMART FRESH GUIDE</p>
        </header>

        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <span style={{ backgroundColor: orangeCook, color: "#fff", padding: "4px 12px", borderRadius: "10px", fontSize: "0.8rem", fontWeight: "bold" }}>步驟一</span>
                  <h2 style={{ fontSize: "1.2rem", marginTop: "10px", fontWeight: "700" }}>請對照包裝，選擇您購買的海鮮</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {fishList.map(fish => (
                    <button key={fish} onClick={() => { setSelectedFish(fish); setStep(2); }}
                      style={{ padding: "20px 10px", borderRadius: "15px", backgroundColor: "#fff", color: blueMarine, border: "1px solid #eee", fontSize: "1.1rem", fontWeight: "600" }}>
                      {fish}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: orangeCook, fontWeight: "bold", marginBottom: "20px" }}>
                  <i className="fa-solid fa-arrow-left"></i> 重選主角
                </button>
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: "700" }}>廚房現有什麼配料？</h2>
                  <p style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>選中的魚：{selectedFish}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "40px" }}>
                  {[...new Set(recipesByFish[selectedFish].flatMap(r => r.ingredients))].map(ing => (
                    <button key={ing} onClick={() => setSelectedIngredients(prev => prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing])}
                      style={{ padding: "10px 20px", borderRadius: "12px", border: "none", fontWeight: "600", backgroundColor: selectedIngredients.includes(ing) ? orangeCook : "#fff", color: selectedIngredients.includes(ing) ? "#fff" : "#7f8c8d" }}>
                      {ing}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(3)} style={{ width: "100%", padding: "18px", borderRadius: "15px", backgroundColor: blueMarine, color: "#fff", border: "none", fontSize: "1.1rem", fontWeight: "bold" }}>查看推薦食譜 ➔</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: orangeCook, fontWeight: "bold", marginBottom: "20px" }}>
                  <i className="fa-solid fa-arrow-left"></i> 修改配料
                </button>
                <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "20px" }}>適合您的 {selectedFish} 料理</h2>
                <div style={{ display: "grid", gap: "15px" }}>
                  {currentRecipes.map(r => (
                    <div key={r.name} onClick={() => setActiveRecipe(r)} style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "15px", borderLeft: `5px solid ${orangeCook}`, boxShadow: "0 3px 6px rgba(0,0,0,0.03)" }}>
                      <h3 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>{r.name}</h3>
                      <p style={{ color: "#95a5a6", fontSize: "0.85rem", margin: 0 }}>{r.nutrition}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 底部品牌足跡 (Footer) - 填補留白並強化品牌感 */}
     {/* 底部品牌足跡 (Footer) */}
<footer style={{ backgroundColor: "#eeeae3", padding: "40px 20px", textAlign: "center", borderTop: "1px solid #e0ddd7" }}>
  <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "20px" }}>
    
    <div style={{ fontSize: "0.75rem", color: "#7f8c8d" }}>
      <i className="fa-solid fa-snowflake" style={{ color: "#3498db", marginBottom: "8px", display: "block", fontSize: "1.4rem" }}></i> 
      急速冷凍
    </div>
    
    <div style={{ fontSize: "0.75rem", color: "#7f8c8d" }}>
      <i className="fa-solid fa-anchor" style={{ color: "#34495e", marginBottom: "8px", display: "block", fontSize: "1.4rem" }}></i> 
      產地直送
    </div>
    
    {/* 修正這裡：確保類別是 fa-circle-check 或是 fa-award */}
    <div style={{ fontSize: "0.75rem", color: "#7f8c8d" }}>
      <i className="fa-solid fa-circle-check" style={{ color: "#27ae60", marginBottom: "8px", display: "block", fontSize: "1.4rem" }}></i> 
      品質嚴選
    </div>

  </div>
  
  {/* 社群圖標區塊 */}
  <div style={{ display: "flex", justifyContent: "center", gap: "25px", marginBottom: "20px" }}>
     <a href="https://facebook.com/zfresh_life" target="_blank" rel="noreferrer" style={{ color: "#34495e", fontSize: "1.5rem" }}><i className="fa-brands fa-facebook"></i></a>
     <a href="https://instagram.com/zspin_vinyl" target="_blank" rel="noreferrer" style={{ color: "#34495e", fontSize: "1.5rem" }}><i className="fa-brands fa-instagram"></i></a>
     <a href="https://line.me" target="_blank" rel="noreferrer" style={{ color: "#34495e", fontSize: "1.5rem" }}><i className="fa-brands fa-line"></i></a>
  </div>
  
  <p style={{ fontSize: "0.7rem", color: "#bdc3c7", margin: 0 }}>© 2026 智鮮生活 SMART FRESH LIFE. All Rights Reserved.</p>
</footer>

      {/* 詳細抽屜彈窗 (含解凍提醒與獎勵) */}
      <AnimatePresence>
        {activeRecipe && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "flex-end", zIndex: 1100 }} onClick={() => setActiveRecipe(null)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} 
              style={{ backgroundColor: "#fff", padding: "30px 20px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px", width: "100%", maxWidth: "500px", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
              <div style={{ width: "40px", height: "5px", backgroundColor: "#eee", borderRadius: "10px", margin: "0 auto 20px" }}></div>
              <h2 style={{ fontSize: "1.5rem", color: blueMarine, marginBottom: "20px" }}>{activeRecipe.name}</h2>
              <div style={{ borderRadius: "15px", overflow: "hidden", aspectRatio: "16/9", marginBottom: "20px", backgroundColor: "#000" }}>
                <iframe width="100%" height="100%" src={activeRecipe.videoUrl} frameBorder="0" allowFullScreen></iframe>
              </div>
              
              {/* 專業解凍提醒 */}
              <div style={{ backgroundColor: "#e7f3ff", padding: "12px", borderRadius: "12px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", border: "1px solid #cce5ff" }}>
                <i className="fa-solid fa-snowflake" style={{ color: "#007bff" }}></i>
                <span style={{ fontSize: "0.85rem", color: "#0056b3", fontWeight: "600" }}>專業提醒：烹飪前放置冷藏自然解凍，肉質最鮮甜！</span>
              </div>

              <div style={{ backgroundColor: bgWarm, padding: "20px", borderRadius: "15px", marginBottom: "25px" }}>
                <h4 style={{ color: orangeCook, marginTop: 0 }}>料理步驟</h4>
                {activeRecipe.steps.map((s, i) => <p key={i} style={{ fontSize: "0.95rem", lineHeight: "1.6", margin: "8px 0" }}>{s}</p>)}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button onClick={() => window.open(`https://line.me`)} style={{ width: "100%", padding: "16px", backgroundColor: "#00b900", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "bold" }}>領取優惠 & 加入 Line 客服</button>
                <button onClick={() => window.open(`https://www.instagram.com/reels/create/`)} style={{ width: "100%", padding: "16px", background: "linear-gradient(45deg, #f09433, #bc1888)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "bold" }}>拍下分享 IG 領 $50 折價券</button>
              </div>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#95a5a6", marginTop: "15px" }}>完成料理標記 @zfresh_life 即可領取獎勵 🎁</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 品牌故事 */}
      <AnimatePresence>
        {showBrandStory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1200, padding: "20px" }} onClick={() => setShowBrandStory(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "20px", maxWidth: "400px", width: "100%", textAlign: "center" }} onClick={e => e.stopPropagation()}>
              <h3 style={{ color: blueMarine, marginTop: 0 }}>鮮海直送，急速冷凍</h3>
              <p style={{ color: "#7f8c8d", fontSize: "0.9rem", lineHeight: "1.6", textAlign: "left" }}>
                我們承諾，所有魚貨皆由捕獲後「急速冷凍」，鎖住剛上岸的鮮甜。為了讓您在家也能輕鬆享用五星級美味，我們精心設計了這套智能導引系統。不論您是料理新手還是老饕，都能在這裡找到最適合的烹飪方案。
              </p>
              <button onClick={() => setShowBrandStory(false)} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: blueMarine, color: "#fff", border: "none", borderRadius: "10px" }}>我了解了</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 