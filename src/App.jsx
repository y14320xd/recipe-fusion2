import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 全新食譜資料庫 (吳郭魚、鮭魚、鱸魚、白蝦) ---
const recipesByFish = {
  "吳郭魚": [
    { 
      name: "大蒜乾煎吳郭魚", 
      ingredients: ["大蒜", "黑胡椒", "檸檬"], 
      nutrition: "外酥內嫩", 
      videoUrl: "https://www.youtube.com/embed/G8oY8T8u6f4", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 吳郭魚洗乾淨後，用廚房紙巾擦乾水分。", 
        "2. 魚身兩面各劃2～3刀，方便入味。", 
        "3. 均勻撒上鹽與黑胡椒，醃10分鐘。", 
        "4. 平底鍋開中火，加入食用油。", 
        "5. 油熱後放入魚，不要急著翻面，先煎約5分鐘。", 
        "6. 看到底部變金黃色後，再小心翻面。", 
        "7. 另一面再煎4～5分鐘。", 
        "8. 放入蒜末炒香，將蒜油淋在魚上。", 
        "9. 起鍋後擠上檸檬汁即可。"
      ] 
    },
    { 
      name: "豆豉清蒸吳郭魚", 
      ingredients: ["豆豉", "薑絲", "蔥絲", "醬油", "米酒"], 
      nutrition: "甘甜下飯", 
      videoUrl: "https://www.youtube.com/embed/Q0P7j9V7Cpk", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 魚洗淨後，在魚身劃刀。", 
        "2. 將薑絲塞進魚肚與刀口。", 
        "3. 淋上米酒去腥。", 
        "4. 豆豉稍微切碎，鋪在魚身上。", 
        "5. 再淋上醬油。", 
        "6. 蒸鍋水滾後放入魚。", 
        "7. 用大火蒸約10～12分鐘。", 
        "8. 蒸好後撒上蔥絲。", 
        "9. 最後淋1匙熱油增加香氣。"
      ] 
    },
    { 
      name: "泰式酸辣吳郭魚", 
      ingredients: ["檸檬汁", "魚露", "辣椒", "香菜"], 
      nutrition: "酸辣開胃", 
      videoUrl: "https://www.youtube.com/embed/rV578P-7Q1M", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 魚乾後下鍋油炸。", 
        "2. 炸至兩面金黃酥脆。", 
        "3. 將檸檬汁、魚露、糖混合。", 
        "4. 加入辣椒拌勻。", 
        "5. 醬汁淋在魚上。", 
        "6. 撒上香菜即可。"
      ] 
    },
    { 
      name: "味噌吳郭魚湯", 
      ingredients: ["味噌", "豆腐", "蔥花"], 
      nutrition: "暖胃鮮甜", 
      videoUrl: "https://www.youtube.com/embed/w7WjT-3-D0E", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 水煮滾後放魚塊。", 
        "2. 撈除浮沫。", 
        "3. 放入豆腐煮5分鐘。", 
        "4. 味噌先用湯拌開。", 
        "5. 倒回鍋中。", 
        "6. 小火煮2分鐘。", 
        "7. 撒蔥花即可。"
      ] 
    },
    { 
      name: "三杯吳郭魚", 
      ingredients: ["麻油", "醬油", "米酒", "大蒜", "薑片", "九層塔"], 
      nutrition: "塔香濃郁", 
      videoUrl: "https://www.youtube.com/embed/6m7pA4UfVv0", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 魚塊先煎至表面金黃。", 
        "2. 爆香薑片與大蒜。", 
        "3. 放入魚塊。", 
        "4. 加醬油、米酒與少許糖。", 
        "5. 小火收汁。", 
        "6. 放九層塔拌炒即可。"
      ] 
    }
  ],
  "鮭魚": [
    { 
      name: "鹽烤鮭魚", 
      ingredients: ["黑胡椒", "檸檬"], 
      nutrition: "原汁原味", 
      videoUrl: "https://www.youtube.com/embed/C28Rk79v_L4", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 鮭魚擦乾。", 
        "2. 撒鹽與黑胡椒。", 
        "3. 靜置10分鐘。", 
        "4. 烤箱200度預熱。", 
        "5. 烤15分鐘。", 
        "6. 擠檸檬即可。"
      ] 
    },
    { 
      name: "奶油蒜香鮭魚", 
      ingredients: ["奶油", "蒜末", "黑胡椒"], 
      nutrition: "香氣撲鼻", 
      videoUrl: "https://www.youtube.com/embed/SshM_67X734", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 魚皮面先下鍋。", 
        "2. 中火煎4分鐘。", 
        "3. 翻面再煎3分鐘。", 
        "4. 加奶油和蒜末。", 
        "5. 將奶油反覆淋魚。", 
        "6. 撒黑胡椒即可。"
      ] 
    },
    { 
      name: "鮭魚味噌鍋", 
      ingredients: ["味噌", "高麗菜", "金針菇", "豆腐"], 
      nutrition: "豐富食材", 
      videoUrl: "https://www.youtube.com/embed/x8I-6K93U5A", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 水滾後加入味噌。", 
        "2. 放高麗菜煮軟。", 
        "3. 加豆腐與金針菇。", 
        "4. 最後放鮭魚。", 
        "5. 煮約5分鐘即可。"
      ] 
    },
    { 
      name: "蜂蜜照燒鮭魚", 
      ingredients: ["醬油", "蜂蜜", "米酒"], 
      nutrition: "鹹甜交織", 
      videoUrl: "https://www.youtube.com/embed/S_8nB_F4T1Y", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 調好照燒醬。", 
        "2. 魚先煎熟。", 
        "3. 倒入醬汁。", 
        "4. 小火慢慢收汁。", 
        "5. 醬汁濃稠即可。"
      ] 
    },
    { 
      name: "酪梨鮭魚沙拉", 
      ingredients: ["酪梨", "生菜", "胡麻醬"], 
      nutrition: "輕食健康", 
      videoUrl: "https://www.youtube.com/embed/yW9l9mP-0oM", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 生菜洗淨瀝乾。", 
        "2. 酪梨切片。", 
        "3. 將生菜鋪盤。", 
        "4. 放上鮭魚與酪梨。", 
        "5. 淋胡麻醬即可。"
      ] 
    }
  ],
  "鱸魚": [
    { 
      name: "清蒸鱸魚", 
      ingredients: ["薑絲", "蔥絲", "醬油", "米酒"], 
      nutrition: "鮮嫩滑口", 
      videoUrl: "https://www.youtube.com/embed/Q0P7j9V7Cpk", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 魚洗淨劃刀。", 
        "2. 淋米酒去腥。", 
        "3. 放薑絲。", 
        "4. 水滾後蒸10分鐘。", 
        "5. 鋪蔥絲。", 
        "6. 淋醬油與熱油即可。"
      ] 
    },
    { 
      name: "鱸魚蛤蜊湯", 
      ingredients: ["蛤蜊", "薑片", "米酒"], 
      nutrition: "海味雙重奏", 
      videoUrl: "https://www.youtube.com/embed/8F6vS8XW3Yc", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 蛤蜊吐沙。", 
        "2. 水滾放薑片。", 
        "3. 加魚塊煮5分鐘。", 
        "4. 放蛤蜊。", 
        "5. 淋米酒。", 
        "6. 蛤蜊開口即可。"
      ] 
    },
    { 
      name: "香煎檸檬鱸魚", 
      ingredients: ["檸檬", "奶油"], 
      nutrition: "清爽解膩", 
      videoUrl: "https://www.youtube.com/embed/G8oY8T8u6f4", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 魚排撒鹽醃10分鐘。", 
        "2. 平底鍋熱油。", 
        "3. 每面煎4分鐘。", 
        "4. 加奶油增加香氣。", 
        "5. 起鍋擠檸檬汁即可。"
      ] 
    },
    { 
      name: "豉汁蒸鱸魚", 
      ingredients: ["豆豉", "蒜末", "辣椒"], 
      nutrition: "鹹香下飯", 
      videoUrl: "https://www.youtube.com/embed/Q0P7j9V7Cpk", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 豆豉切碎。", 
        "2. 與蒜末混合。", 
        "3. 鋪在魚身。", 
        "4. 水滾後蒸10分鐘。", 
        "5. 撒辣椒即可。"
      ] 
    },
    { 
      name: "鱸魚粥", 
      ingredients: ["白飯", "薑絲", "蔥花"], 
      nutrition: "滋補暖胃", 
      videoUrl: "https://www.youtube.com/embed/Z0Ym7rK-5O8", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 白飯加水煮成粥。", 
        "2. 放薑絲。", 
        "3. 加魚片煮熟。", 
        "4. 加鹽調味。", 
        "5. 撒蔥花即可。"
      ] 
    }
  ],
  "白蝦": [
    { 
      name: "鹽烤白蝦", 
      ingredients: ["粗鹽", "黑胡椒"], 
      nutrition: "彈牙鮮甜", 
      videoUrl: "https://www.youtube.com/embed/C28Rk79v_L4", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 白蝦洗淨擦乾。", 
        "2. 烤盤鋪鹽。", 
        "3. 放上白蝦。", 
        "4. 烤箱200度烤10分鐘。", 
        "5. 撒黑胡椒即可。"
      ] 
    },
    { 
      name: "蒜蓉粉絲蝦", 
      ingredients: ["粉絲", "蒜末", "醬油"], 
      nutrition: "吸滿精華", 
      videoUrl: "https://www.youtube.com/embed/Q0P7j9V7Cpk", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 粉絲泡軟。", 
        "2. 白蝦開背去腸泥。", 
        "3. 粉絲鋪底。", 
        "4. 放白蝦。", 
        "5. 淋蒜蓉醬。", 
        "6. 蒸6～8分鐘即可。"
      ] 
    },
    { 
      name: "奶油胡椒蝦", 
      ingredients: ["奶油", "蒜末", "黑胡椒"], 
      nutrition: "濃郁辛香", 
      videoUrl: "https://www.youtube.com/embed/SshM_67X734", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 白蝦下鍋煎至鮮紅。", 
        "2. 加蒜末爆香。", 
        "3. 放奶油融化。", 
        "4. 撒黑胡椒。", 
        "5. 翻炒均勻即可。"
      ] 
    },
    { 
      name: "泰式酸辣蝦", 
      ingredients: ["檸檬汁", "魚露", "辣椒"], 
      nutrition: "清爽開胃", 
      videoUrl: "https://www.youtube.com/embed/rV578P-7Q1M", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 白蝦燙熟。", 
        "2. 泡冰水口感更Q。", 
        "3. 混合檸檬汁與魚露。", 
        "4. 加辣椒拌勻。", 
        "5. 淋在蝦上即可。"
      ] 
    },
    { 
      name: "白蝦炒蛋", 
      ingredients: ["雞蛋", "蔥花"], 
      nutrition: "家常美味", 
      videoUrl: "https://www.youtube.com/embed/yW9l9mP-0oM", 
      buyUrl: "https://www.facebook.com/zfresh_life/shop", 
      steps: [
        "1. 白蝦去殼留尾。", 
        "2. 雞蛋打散。", 
        "3. 先炒熟白蝦。", 
        "4. 倒入蛋液。", 
        "5. 小火慢炒。", 
        "6. 蛋半熟時加入蔥花。", 
        "7. 炒至喜歡熟度即可。"
      ] 
    }
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
    document.body.style.touchAction = "manipulation"; // 手機防閃爍延遲優化
    
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
    <div style={{ color: "#2c3e50", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      
      <div style={{ padding: "30px 15px 60px 15px", flex: "1" }}>
        <header style={{ textAlign: "center", marginBottom: "35px", position: "relative" }}>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowBrandStory(true)} style={{ position: "absolute", top: -5, right: 0, background: "none", border: `1px solid ${orangeCook}`, color: orangeCook, fontSize: "0.75rem", padding: "5px 10px", borderRadius: "20px", cursor: "pointer", fontWeight: "600" }}>關於品牌</motion.button>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: blueMarine, margin: 0, letterSpacing: "2px" }}>智鮮生活</h1>
          <p style={{ color: orangeCook, fontSize: "0.85rem", fontWeight: "600", letterSpacing: "5px", marginTop: "5px" }}>SMART FRESH GUIDE</p>
        </header>

        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <span style={{ backgroundColor: orangeCook, color: "#fff", padding: "5px 14px", borderRadius: "10px", fontSize: "0.8rem", fontWeight: "bold" }}>步驟一</span>
                  <h2 style={{ fontSize: "1.2rem", marginTop: "12px", fontWeight: "700" }}>請對照包裝，選擇您購買的海鮮</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {fishList.map(fish => (
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      key={fish} 
                      onClick={() => { setSelectedFish(fish); setSelectedIngredients([]); setStep(2); }}
                      style={{ padding: "22px 10px", borderRadius: "16px", backgroundColor: "#fff", color: blueMarine, border: "1px solid #eee", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.02)" }}>
                      {fish}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: orangeCook, fontWeight: "bold", marginBottom: "20px", cursor: "pointer", fontSize: "1rem", padding: "5px 0" }}>
                  <i className="fa-solid fa-arrow-left"></i> 重選主角
                </button>
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: "700" }}>廚房現有什麼配料？</h2>
                  <p style={{ color: "#7f8c8d", fontSize: "0.9rem", marginTop: "4px" }}>選中的海鮮：<strong style={{ color: blueMarine }}>{selectedFish}</strong></p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "40px" }}>
                  {[...new Set((recipesByFish[selectedFish] || []).flatMap(r => r.ingredients))].map(ing => (
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      key={ing} 
                      onClick={() => setSelectedIngredients(prev => prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing])}
                      style={{ padding: "12px 22px", borderRadius: "14px", border: "none", fontWeight: "600", cursor: "pointer", backgroundColor: selectedIngredients.includes(ing) ? orangeCook : "#fff", color: selectedIngredients.includes(ing) ? "#fff" : "#7f8c8d", boxShadow: "0 3px 8px rgba(0,0,0,0.04)" }}>
                      {ing}
                    </motion.button>
                  ))}
                </div>
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => setStep(3)} style={{ width: "100%", padding: "18px", borderRadius: "16px", backgroundColor: blueMarine, color: "#fff", border: "none", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 12px rgba(52, 73, 94, 0.2)" }}>查看推薦食譜 ➔</motion.button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: orangeCook, fontWeight: "bold", marginBottom: "20px", cursor: "pointer", fontSize: "1rem", padding: "5px 0" }}>
                  <i className="fa-solid fa-arrow-left"></i> 修改配料
                </button>
                <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "20px" }}>適合您的 {selectedFish} 料理</h2>
                <div style={{ display: "grid", gap: "15px" }}>
                  {currentRecipes.length > 0 ? currentRecipes.map(r => (
                    <motion.div 
                      whileTap={{ scale: 0.98 }}
                      key={r.name} 
                      onClick={() => setActiveRecipe(r)} 
                      style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "16px", borderLeft: `6px solid ${orangeCook}`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)", cursor: "pointer" }}>
                      <h3 style={{ margin: "0 0 6px 0", fontSize: "1.15rem", fontWeight: "700" }}>{r.name}</h3>
                      <p style={{ color: "#95a5a6", fontSize: "0.85rem", margin: 0 }}>{r.nutrition}</p>
                    </motion.div>
                  )) : (
                    <p style={{ textAlign: "center", color: "#7f8c8d", padding: "30px", backgroundColor: "#fff", borderRadius: "16px" }}>找不到完全符合所有配料的食譜，請嘗試減少勾選項喔！</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 底部品牌足跡 (Footer) */}
      <footer style={{ backgroundColor: "#eeeae3", padding: "40px 20px 50px 20px", textAlign: "center", borderTop: "1px solid #e0ddd7" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "25px" }}>
          <div style={{ fontSize: "0.75rem", color: "#7f8c8d", fontWeight: "600" }}>
            <i className="fa-solid fa-snowflake" style={{ color: "#3498db", marginBottom: "8px", display: "block", fontSize: "1.5rem" }}></i> 
            急速冷凍
          </div>
          <div style={{ fontSize: "0.75rem", color: "#7f8c8d", fontWeight: "600" }}>
            <i className="fa-solid fa-anchor" style={{ color: "#34495e", marginBottom: "8px", display: "block", fontSize: "1.5rem" }}></i> 
            產地直送
          </div>
          <div style={{ fontSize: "0.75rem", color: "#7f8c8d", fontWeight: "600" }}>
            <i className="fa-solid fa-circle-check" style={{ color: "#27ae60", marginBottom: "8px", display: "block", fontSize: "1.5rem" }}></i> 
            品質嚴選
          </div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "25px" }}>
           <a href="https://www.facebook.com/profile.php?id=61576506302352" target="_blank" rel="noreferrer" style={{ color: "#34495e", fontSize: "1.6rem" }}><i className="fa-brands fa-facebook"></i></a>
           <a href="https://www.instagram.com/zhixian.life/" target="_blank" rel="noreferrer" style={{ color: "#34495e", fontSize: "1.6rem" }}><i className="fa-brands fa-instagram"></i></a>
           {/* LINE 官方帳號圖標點擊連結 */}
           <a href="https://lin.ee/7D61wiz" target="_blank" rel="noreferrer" style={{ color: "#34495e", fontSize: "1.6rem" }}><i className="fa-brands fa-line"></i></a>
        </div>
        
        <p style={{ fontSize: "0.75rem", color: "#bdc3c7", margin: 0 }}>© 2026 智鮮生活 SMART FRESH LIFE. All Rights Reserved.</p>
      </footer>

      {/* 詳細抽屜彈窗 */}
      <AnimatePresence>
        {activeRecipe && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "flex-end", zIndex: 1100 }} onClick={() => setActiveRecipe(null)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 220 }} 
              style={{ backgroundColor: "#fff", padding: "25px 20px 40px 20px", borderTopLeftRadius: "28px", borderTopRightRadius: "28px", width: "100%", maxWidth: "500px", maxHeight: "88vh", overflowY: "auto", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }} onClick={e => e.stopPropagation()}>
              
              <div onClick={() => setActiveRecipe(null)} style={{ width: "100%", padding: "10px 0", marginTop: "-10px", cursor: "pointer", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "45px", height: "5px", backgroundColor: "#e0e0e0", borderRadius: "10px" }}></div>
              </div>
              
              <h2 style={{ fontSize: "1.4rem", color: blueMarine, marginBottom: "15px", fontWeight: "700", marginTop: "5px" }}>{activeRecipe.name}</h2>
              
              <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", width: "100%", paddingTop: "56.25%", backgroundColor: "#000", marginBottom: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                <iframe style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }} src={activeRecipe.videoUrl} allowFullScreen></iframe>
              </div>
              
              <div style={{ backgroundColor: "#e7f3ff", padding: "14px", borderRadius: "14px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #cce5ff" }}>
                <i className="fa-solid fa-snowflake" style={{ color: "#007bff", fontSize: "1.1rem" }}></i>
                <span style={{ fontSize: "0.85rem", color: "#0056b3", fontWeight: "700", lineHeight: "1.4" }}>專業提醒：烹飪前放置冷藏自然解凍，肉質最鮮甜！</span>
              </div>

              <div style={{ backgroundColor: bgWarm, padding: "20px", borderRadius: "16px", marginBottom: "25px" }}>
                <h4 style={{ color: orangeCook, marginTop: 0, fontSize: "1rem", fontWeight: "700", marginBottom: "10px" }}>料理步驟</h4>
                {activeRecipe.steps.map((s, i) => <p key={i} style={{ fontSize: "0.95rem", lineHeight: "1.6", margin: "10px 0", color: "#2c3e50" }}>{s}</p>)}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* LINE 官方帳號按鈕點擊連結 */}
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => window.open(`https://lin.ee/7D61wiz`)} style={{ width: "100%", padding: "16px", backgroundColor: "#00b900", color: "#fff", border: "none", borderRadius: "14px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>領取優惠 & 加入 Line 客服</motion.button>
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => window.open(`https://www.instagram.com/reels/create/`)} style={{ width: "100%", padding: "16px", background: "linear-gradient(45deg, #f09433, #bc1888)", color: "#fff", border: "none", borderRadius: "14px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>拍下分享 IG 領 $50 折價券</motion.button>
              </div>
              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#95a5a6", marginTop: "16px", fontWeight: "500" }}>完成料理標記 @zhixian.life 即可領取獎勵 🎁</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 品牌故事彈窗 */}
      <AnimatePresence>
        {showBrandStory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1200, padding: "20px" }} onClick={() => setShowBrandStory(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ backgroundColor: "#fff", padding: "30px 24px", borderRadius: "24px", maxWidth: "400px", width: "100%", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
              <h3 style={{ color: blueMarine, marginTop: 0, fontWeight: "700", fontSize: "1.3rem" }}>鮮海直送，急速冷凍</h3>
              <p style={{ color: "#7f8c8d", fontSize: "0.95rem", lineHeight: "1.7", textAlign: "left", margin: "15px 0" }}>
                我們承諾，所有魚貨皆由捕獲後「急速冷凍」，鎖住剛上岸的鮮甜。為了讓您在家也能輕鬆享用五星級美味，我們精心設計了這套智能導引系統。不論您是料理新手還是老饕，都能在這裡找到最適合的烹飪方案。
              </p>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowBrandStory(false)} style={{ marginTop: "10px", padding: "12px 28px", backgroundColor: blueMarine, color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem", width: "100%" }}>我了解了</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}