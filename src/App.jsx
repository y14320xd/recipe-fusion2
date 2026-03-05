import React, { useState, useEffect } from "react"

// 食譜資料庫
const recipes = [
  {
    ingredients: ["鮭魚", "青江菜", "蒜頭"],
    name: "蒜香鮭魚炒青江菜",
    steps: ["1. 鮭魚切塊撒鹽備用", "2. 熱鍋下蒜末爆香", "3. 放入鮭魚煎至金黃", "4. 加入青江菜快炒至熟即可"]
  },
  {
    ingredients: ["鱈魚", "菠菜", "奶油"],
    name: "奶油菠菜鱈魚",
    steps: ["1. 鱈魚抹乾水分", "2. 奶油融化後放入鱈魚兩面煎熟", "3. 利用餘油炒軟菠菜", "4. 擺盤淋上奶油醬汁"]
  },
  {
    ingredients: ["鯖魚", "高麗菜", "味噌"],
    name: "味噌煮鯖魚搭高麗菜",
    steps: ["1. 味噌加水調開", "2. 鯖魚入鍋與味噌水同煮", "3. 加入高麗菜片悶煮至軟爛", "4. 煮至收汁入味"]
  },
  {
    ingredients: ["鱸魚", "小白菜", "醬油"],
    name: "蔥油鱸魚小白菜",
    steps: ["1. 鱸魚清蒸 8 分鐘", "2. 小白菜燙熟墊底", "3. 魚擺盤後淋上醬油", "4. 淋上熱蔥油激發香氣"]
  },
  {
    ingredients: ["吳郭魚", "菠菜", "蒜頭"],
    name: "蒜炒吳郭魚菠菜",
    steps: ["1. 吳郭魚切片沾粉煎熟", "2. 另起鍋爆香蒜頭", "3. 放入菠菜炒熟後放入魚片", "4. 快速拌勻即可起鍋"]
  }
]

const fishList = ["鮭魚", "鱈魚", "鯖魚", "鱸魚", "吳郭魚"]
const vegetableList = ["青江菜", "菠菜", "高麗菜", "小白菜"]
const seasoningList = ["蒜頭", "薑", "味噌", "醬油", "奶油"]

export default function App() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#09090b";
  }, []);

  const [selectedFish, setSelectedFish] = useState([])
  const [selectedVegetables, setSelectedVegetables] = useState([])
  const [selectedSeasonings, setSelectedSeasonings] = useState([])
  const [activeRecipe, setActiveRecipe] = useState(null)

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) setList(list.filter(i => i !== item))
    else setList([...list, item])
  }

  const filteredRecipes = recipes.filter(r =>
    selectedFish.some(f => r.ingredients.includes(f)) ||
    selectedVegetables.some(v => r.ingredients.includes(v)) ||
    selectedSeasonings.some(s => r.ingredients.includes(s))
  )

  const getBtnStyle = (item, list, activeColor) => ({
    padding: "12px 20px",
    borderRadius: "15px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
    backgroundColor: list.includes(item) ? activeColor : "#18181b",
    color: list.includes(item) ? "white" : "#71717a",
    boxShadow: list.includes(item) ? `0 0 15px ${activeColor}66` : "none"
  })

  return (
    <div style={{
      backgroundColor: "#09090b",
      color: "#f4f4f5",
      minHeight: "100vh",
      width: "100vw",
      padding: "60px 20px",
      boxSizing: "border-box",
      textAlign: "center"
    }}>
      <div style={{ marginBottom: "50px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "900", margin: "0 0 10px 0", letterSpacing: "-2px" }}>
          好的，今天我們來做菜！
        </h1>
        <p style={{ color: "#71717a", fontSize: "18px", letterSpacing: "2px" }}>
          🥘 先選一下食材
        </p>
      </div>

      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "rgba(24, 24, 27, 0.6)",
        padding: "40px",
        borderRadius: "30px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        textAlign: "left"
      }}>
        {/* 已刪除旁邊的 (藍色) 說明文字 */}
        <h3 style={{ color: "#3b82f6", fontSize: "12px", letterSpacing: "3px", marginBottom: "15px", fontWeight: "800" }}>魚類選擇</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "30px" }}>
          {fishList.map(item => (
            <button key={item} style={getBtnStyle(item, selectedFish, "#2563eb")} onClick={() => toggleSelection(item, selectedFish, setSelectedFish)}>
              {item}
            </button>
          ))}
        </div>

        {/* 已刪除旁邊的 (綠色) 說明文字 */}
        <h3 style={{ color: "#10b981", fontSize: "12px", letterSpacing: "3px", marginBottom: "15px", fontWeight: "800" }}>蔬菜選擇</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "30px" }}>
          {vegetableList.map(item => (
            <button key={item} style={getBtnStyle(item, selectedVegetables, "#059669")} onClick={() => toggleSelection(item, selectedVegetables, setSelectedVegetables)}>
              {item}
            </button>
          ))}
        </div>

        {/* 已刪除旁邊的 (灰色) 說明文字 */}
        <h3 style={{ color: "#a1a1aa", fontSize: "12px", letterSpacing: "3px", marginBottom: "15px", fontWeight: "800" }}>調料選擇</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {seasoningList.map(item => (
            <button key={item} style={getBtnStyle(item, selectedSeasonings, "#52525b")} onClick={() => toggleSelection(item, selectedSeasonings, setSelectedSeasonings)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "50px auto 0 auto", textAlign: "left" }}>
        <h2 style={{ fontSize: "20px", color: "#52525b", borderBottom: "1px solid #27272a", paddingBottom: "15px", marginBottom: "20px" }}>
          合成結果庫
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filteredRecipes.map(r => (
            <div key={r.name} onClick={() => setActiveRecipe(r)} style={{
              padding: "20px", backgroundColor: "#18181b", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer", transition: "0.3s"
            }}>
              <span style={{ fontWeight: "bold" }}>{r.name} ➔</span>
            </div>
          ))}
        </div>
      </div>

      {activeRecipe && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100
        }} onClick={() => setActiveRecipe(null)}>
          <div style={{
            backgroundColor: "#18181b", padding: "40px", borderRadius: "30px", maxWidth: "450px", width: "90%",
            border: "1px solid rgba(255, 255, 255, 0.1)", textAlign: "left"
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: "#10b981", marginTop: 0 }}>{activeRecipe.name}</h2>
            <ol style={{ paddingLeft: "20px", color: "#a1a1aa", lineHeight: "2" }}>
              {activeRecipe.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
            <button onClick={() => setActiveRecipe(null)} style={{
              marginTop: "30px", width: "100%", padding: "15px", borderRadius: "15px", border: "none",
              backgroundColor: "#059669", color: "white", fontWeight: "bold", cursor: "pointer"
            }}>準備開煮</button>
          </div>
        </div>
      )}
    </div>
  )
}