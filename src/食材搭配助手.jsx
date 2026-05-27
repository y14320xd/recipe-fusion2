import React, { useState, useEffect } from "react"

// 確保每一道料理都有完整 4 步以上的步驟
const recipes = [
  // --- 鮭魚系列 ---
  { ingredients: ["鮭魚", "青江菜", "蒜頭"], name: "蒜香鮭魚炒青江菜", steps: ["1. 鮭魚切塊撒鹽、黑胡椒備用", "2. 熱鍋下油，放入蒜末爆香", "3. 放入鮭魚塊煎至雙面呈金黃色", "4. 加入青江菜快炒至熟，撒少許鹽調味即可"] },
  { ingredients: ["鮭魚", "高麗菜", "味噌"], name: "味噌鮭魚鮮魚湯", steps: ["1. 鮭魚切塊，高麗菜撕成小片備用", "2. 水滾後加入高麗菜煮至軟透", "3. 將味噌放在濾網上，用熱水攪拌化開入湯", "4. 放入鮭魚煮至熟透，最後撒上少許米酒去腥"] },
  { ingredients: ["鮭魚", "薑", "醬油"], name: "紅燒薑絲鮭魚頭", steps: ["1. 鮭魚頭洗淨抹乾，表面拍薄粉", "2. 熱鍋將魚頭煎至兩面微焦固定形狀", "3. 加入大量薑絲、醬油、糖與適量水", "4. 蓋上鍋蓋小火悶煮 10 分鐘，收汁後起鍋"] },
  { ingredients: ["鮭魚", "奶油", "菠菜"], name: "奶油菠菜煎鮭魚", steps: ["1. 鮭魚兩面抹鹽，菠菜切段備用", "2. 鍋中融化奶油，將鮭魚皮朝下中火煎脆", "3. 魚肉煎熟後取出盛盤避免過老", "4. 利用鍋內餘油快速炒軟菠菜，鋪在魚排旁"] },
  { ingredients: ["鮭魚", "辣椒", "九層塔"], name: "塔香辣炒鮭魚丁", steps: ["1. 鮭魚切成丁狀，拌入少許米酒去腥", "2. 起油鍋，爆香辣椒末與蒜片", "3. 放入鮭魚丁大火快炒至表面上色", "4. 加入九層塔與少許醬油，翻炒出香氣即可"] },
  { ingredients: ["鮭魚", "小白菜", "蒜頭"], name: "蒜泥鮭魚小白菜", steps: ["1. 鮭魚抹鹽蒸熟，取出撥成碎肉去刺", "2. 小白菜燙熟瀝乾水份放入盤中墊底", "3. 蒜頭磨成泥，混合醬油、香油調汁", "4. 將魚肉鋪在菜上，均勻淋上調好的蒜泥醬"] },
  { ingredients: ["鮭魚", "蔥", "薑"], name: "蔥薑清蒸鮭魚排", steps: ["1. 盤底鋪薑片，放上鮭魚排淋米酒", "2. 魚身鋪上蔥絲，大火蒸 8 分鐘", "3. 倒掉盤中多餘魚水避免腥味重", "4. 燒熱一勺油，澆在蔥絲上激發香味"] },
  { ingredients: ["鮭魚", "破布子", "醬油"], name: "破布子蒸鮭魚", steps: ["1. 鮭魚洗淨擦乾，雙面均勻抹薄鹽", "2. 鋪上大量破布子與其原汁醬水", "3. 淋上一匙醬油，放入蒸鍋蒸 10 分鐘", "4. 起鍋撒上蔥花或辣椒絲點綴即可"] },
  
  // --- 鱈魚系列 ---
  { ingredients: ["鱈魚", "菠菜", "奶油"], name: "奶油菠菜鱈魚", steps: ["1. 鱈魚雙面抹鹽與黑胡椒靜置 5 分鐘", "2. 鍋中放入奶油融化，將鱈魚煎熟取出", "3. 利用餘油炒軟菠菜，加少許鹽調味", "4. 將鱈魚置於菠菜上，淋上剩餘奶油汁"] },
  { ingredients: ["鱈魚", "蔥", "醬油"], name: "清蒸蔥油鱈魚", steps: ["1. 鱈魚片放盤中，鋪上蔥絲與薑絲", "2. 淋上一匙醬油與米酒，中火蒸 10 分鐘", "3. 取出後將盤中積水倒掉一半避免淡味", "4. 淋上燒熱的高溫香油，帶出蔥香"] },
  { ingredients: ["鱈魚", "破布子", "薑"], name: "破布子薑絲蒸鱈魚", steps: ["1. 鱈魚抹乾水分，薑切絲鋪於盤底", "2. 均勻淋上破布子及兩匙甘醇醬汁", "3. 放入蒸籠，水滾後計時蒸 8 分鐘", "4. 悶 2 分鐘後取出，確保肉質最嫩滑"] },
  { ingredients: ["鱈魚", "蒜頭", "辣椒"], name: "蒜辣鱈魚菲力", steps: ["1. 鱈魚切塊，沾裹薄薄一層地瓜粉", "2. 熱鍋下油將魚塊煎至表面酥脆取出", "3. 原鍋爆香大量蒜末與紅辣椒片", "4. 將魚塊回鍋快速拌勻，撒鹽即可起鍋"] },
  { ingredients: ["鱈魚", "高麗菜", "味噌"], name: "味噌鱈魚高麗菜煮", steps: ["1. 味噌用少許溫水在碗中化開備用", "2. 鍋內放水煮滾，先下高麗菜煮至透明", "3. 放入鱈魚塊，倒入味噌水均勻攪拌", "4. 保持微滾煮 3 分鐘，確保魚肉入味"] },
  { ingredients: ["鱈魚", "九層塔", "醬油"], name: "塔香紅燒鱈魚片", steps: ["1. 鱈魚兩面煎黃後，撥至鍋子一邊", "2. 空位處倒入醬油與少許糖煮出焦香味", "3. 讓鱈魚吸滿醬汁，中火悶煮 1 分鐘", "4. 最後下一把九層塔拌炒，香味四溢"] },

  // --- 鯖魚系列 ---
  { ingredients: ["鯖魚", "高麗菜", "味噌"], name: "味噌煮鯖魚搭高麗菜", steps: ["1. 鯖魚切段，高麗菜手撕成大塊備用", "2. 鍋中放水煮開，先放入高麗菜熬湯底", "3. 調入味噌糊，放入鯖魚段中火熬煮", "4. 煮至湯汁略微收乾，魚皮上色即可"] },
  { ingredients: ["鯖魚", "薑", "醬油"], name: "薑絲佃煮鯖魚", steps: ["1. 鯖魚切塊，薑切成薄片與長絲", "2. 混合醬油、酒、糖煮成甘甜佃煮汁", "3. 將魚皮朝上放入鍋中，鋪上厚薑絲", "4. 蓋上圓形紙蓋，小火悶煮至完全收汁"] },
  { ingredients: ["鯖魚", "蔥", "辣椒"], name: "椒蔥鹽烤鯖魚", steps: ["1. 鯖魚抹厚鹽，靜置 10 分鐘逼出水分", "2. 烤箱預熱 200 度，皮朝上烤至焦香", "3. 取出後在魚身上鋪滿蔥花與辣椒末", "4. 擠上檸檬汁與撒胡椒鹽增加層次"] },
  { ingredients: ["鯖魚", "蒜頭", "九層塔"], name: "塔香蒜味煎鯖魚", steps: ["1. 鯖魚肉面先煎，逼出魚油後翻面煎皮", "2. 魚皮煎酥後，放入蒜末爆出蒜香", "3. 淋入少許米酒熗鍋去除海魚腥味", "4. 加入九層塔拌炒兩下，趁熱盛盤"] },

  // --- 鱸魚系列 ---
  { ingredients: ["鱸魚", "小白菜", "醬油"], name: "蔥油鱸魚小白菜", steps: ["1. 鱸魚剖開抹鹽，墊入薑片蒸 8 分鐘", "2. 小白菜燙熟瀝乾，鋪在盤底備用", "3. 將鱸魚置於菜上，均勻淋上魚醬油", "4. 燒熱香油淋在蔥花上，燙出蔥香味"] },
  { ingredients: ["鱸魚", "薑", "味噌"], name: "薑絲味噌鱸魚湯", steps: ["1. 鱸魚切成厚片，老薑切細絲備用", "2. 滾水加入薑絲，放入鱸魚片大火煮沸", "3. 取味噌在網杓中慢慢化入魚湯內", "4. 待魚肉變白熟透，即可關火撒蔥花"] },
  { ingredients: ["鱸魚", "破布子", "蔥"], name: "破布子蔥香蒸鱸魚", steps: ["1. 鱸魚身兩面劃刀，方便醬汁滲入", "2. 鋪上大量破布子與蔥白段與少許糖", "3. 放入蒸籠大火蒸 10-12 分鐘", "4. 起鍋撒上鮮蔥絲，視覺與美味兼具"] },

  // --- 吳郭魚系列 ---
  { ingredients: ["吳郭魚", "菠菜", "蒜頭"], name: "蒜炒吳郭魚菠菜", steps: ["1. 吳郭魚切塊沾粉煎熟，撈起瀝油", "2. 另起一鍋油，爆香蒜末至金黃色", "3. 放入菠菜炒熟後，將魚片回鍋", "4. 加鹽調味並快速翻炒 10 秒即成"] },
  { ingredients: ["吳郭魚", "薑", "醬油"], name: "薑絲紅燒吳郭魚", steps: ["1. 吳郭魚兩面劃刀抹鹽，中火煎至皮酥", "2. 放入大量薑絲與一匙醬油、砂糖", "3. 加入半杯水，轉中火悶煮至醬汁收濃", "4. 確保魚身兩面均勻上色後即可起鍋"] },

  // --- 虱目魚系列 ---
  { ingredients: ["虱目魚", "薑", "醬油"], name: "薑絲醬燒虱目魚肚", steps: ["1. 虱目魚肚皮朝下煎出豐富天然魚油", "2. 魚油溢出後翻面，煎熟魚肉的部分", "3. 加入大量薑絲、醬油與適量溫水", "4. 悶煮 5 分鐘至汁濃，魚肚滑嫩入口即化"] },
  { ingredients: ["虱目魚", "破布子", "薑"], name: "破布子蒸虱目魚", steps: ["1. 盤底鋪薑片防止黏底，放上鮮嫩魚肚", "2. 鋪上破布子、醬汁與適量二砂糖提味", "3. 放入電鍋，外鍋加半杯水蒸至跳起", "4. 破布子的甘甜能帶出虱目魚油的清香"] }
];

const fishList = ["鮭魚", "鱈魚", "鯖魚", "鱸魚", "吳郭魚", "虱目魚"]
const vegetableList = ["青江菜", "菠菜", "高麗菜", "小白菜"]
const seasoningList = ["蒜頭", "薑", "味噌", "醬油", "奶油", "辣椒", "蔥", "九層塔", "破布子"]

export default function App() {
  const [selectedFish, setSelectedFish] = useState([])
  const [selectedVeg, setSelectedVeg] = useState([])
  const [selectedSeason, setSelectedSeason] = useState([])
  const [activeRecipe, setActiveRecipe] = useState(null)

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) setList(list.filter(i => i !== item))
    else setList([...list, item])
  }

  // --- 核心邏輯升級：支援複選 ---
  // 規則：如果什麼都沒選，就不顯示。
  // 如果有選，顯示「包含任何一個選中食材」的食譜（複選模式）。
  const filteredRecipes = recipes.filter(r => {
    const allSelected = [...selectedFish, ...selectedVeg, ...selectedSeason];
    if (allSelected.length === 0) return false;
    // 只要食譜需要的食材中有任何一項在「已選清單」中，就出現
    return r.ingredients.some(ing => allSelected.includes(ing));
  })

  const getBtnStyle = (item, list, activeColor) => ({
    padding: "10px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)",
    cursor: "pointer", fontWeight: "bold", fontSize: "13px", transition: "0.2s",
    backgroundColor: list.includes(item) ? activeColor : "#18181b",
    color: list.includes(item) ? "white" : "#71717a",
    boxShadow: list.includes(item) ? `0 0 15px ${activeColor}44` : "none"
  })

  return (
    <div style={{ backgroundColor: "#09090b", color: "#f4f4f5", minHeight: "100vh", padding: "40px 20px", textAlign: "center", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", background: "linear-gradient(to right, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          智鮮生活：專屬食譜合成器
        </h1>
        <p style={{ color: "#71717a" }}>選取下方食材進行複選，自動配對最適合的料理</p>
      </header>

      <div style={{ maxWidth: "850px", margin: "0 auto", backgroundColor: "#18181b", padding: "25px", borderRadius: "24px", border: "1px solid #27272a", textAlign: "left" }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#3b82f6", fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "10px" }}>🐟 魚類 (可複選)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {fishList.map(i => <button key={i} style={getBtnStyle(i, selectedFish, "#2563eb")} onClick={() => toggleSelection(i, selectedFish, setSelectedFish)}>{i}</button>)}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#10b981", fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "10px" }}>🥬 蔬菜 (可複選)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {vegetableList.map(i => <button key={i} style={getBtnStyle(i, selectedVeg, "#059669")} onClick={() => toggleSelection(i, selectedVeg, setSelectedVeg)}>{i}</button>)}
          </div>
        </div>
        <div>
          <label style={{ color: "#f59e0b", fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "10px" }}>🧂 調料配料 (可複選)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {seasoningList.map(i => <button key={i} style={getBtnStyle(i, selectedSeason, "#d97706")} onClick={() => toggleSelection(i, selectedSeason, setSelectedSeason)}>{i}</button>)}
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "850px", margin: "40px auto", textAlign: "left" }}>
        <h2 style={{ fontSize: "18px", color: "#a1a1aa", borderBottom: "1px solid #27272a", paddingBottom: "10px", marginBottom: "20px" }}>
          合成結果：找到 {filteredRecipes.length} 道料理
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
          {filteredRecipes.map(r => (
            <div key={r.name} onClick={() => setActiveRecipe(r)} style={{ padding: "20px", backgroundColor: "#1c1c1f", borderRadius: "16px", border: "1px solid #27272a", cursor: "pointer" }}>
              <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "8px" }}>{r.name}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {r.ingredients.map(ing => <span key={ing} style={{ fontSize: "10px", color: "#71717a", backgroundColor: "#09090b", padding: "2px 6px", borderRadius: "4px" }}>#{ing}</span>)}
              </div>
            </div>
          ))}
        </div>
      </main>

      {activeRecipe && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.9)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 }} onClick={() => setActiveRecipe(null)}>
          <div style={{ backgroundColor: "#18181b", padding: "40px", borderRadius: "24px", maxWidth: "420px", width: "90%", textAlign: "left" }} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: "#34d399", marginTop: 0 }}>{activeRecipe.name}</h2>
            <div style={{ height: "1px", backgroundColor: "#27272a", margin: "15px 0" }} />
            <ol style={{ paddingLeft: "20px", color: "#d4d4d8", lineHeight: "1.8" }}>
              {activeRecipe.steps.map((s, i) => <li key={i} style={{ marginBottom: "10px" }}>{s}</li>)}
            </ol>
            <button onClick={() => setActiveRecipe(null)} style={{ marginTop: "20px", width: "100%", padding: "12px", borderRadius: "12px", backgroundColor: "#10b981", color: "white", fontWeight: "bold", border: "none", cursor: "pointer" }}>準備開煮</button>
          </div>
        </div>
      )}
    </div>
  )
}