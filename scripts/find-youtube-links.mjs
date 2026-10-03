import fs from 'node:fs';
import path from 'node:path';

const appFile = path.resolve('src/App.jsx');
const jsonFile = path.resolve('src/data/recipeVideos.json');

const text = fs.readFileSync(appFile, 'utf8');
const nameRegex = /name:\s*"([^\"]+)"/g;
const names = [...new Set(Array.from(text.matchAll(nameRegex), (m) => m[1]))];

const filtered = names.filter((name) => {
  const skip = ['鮮活', '步驟', '商品', '品牌故事', '當前動作', '做法', '食譜'];
  return name && !skip.some((token) => name.includes(token));
});

const uniqueNames = filtered.filter((name, index) => filtered.indexOf(name) === index);

async function getFirstYoutubeVideoUrl(query) {
  const encoded = encodeURIComponent(query);
  const url = `https://www.youtube.com/results?search_query=${encoded}&hl=zh-TW&persist_hl=1`;

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!response.ok) return null;

    const html = await response.text();
    const videoIdMatch = html.match(/"videoId":"([A-Za-z0-9_-]{11})"/);
    if (!videoIdMatch) return null;

    return `https://www.youtube.com/watch?v=${videoIdMatch[1]}`;
  } catch (error) {
    console.warn(`搜尋失敗: ${query}`, error.message);
    return null;
  }
}

const result = {};

for (const name of uniqueNames) {
  try {
    const link = await getFirstYoutubeVideoUrl(`${name} 做法`);
    result[name] = link || null;
    console.log(`${name} => ${link || '未找到'}`);
  } catch (error) {
    result[name] = null;
    console.log(`${name} => 未找到 (例外)`);
  }
}

fs.writeFileSync(jsonFile, JSON.stringify(result, null, 2), 'utf8');
console.log(`\n已寫入 ${jsonFile}，共 ${Object.keys(result).length} 條料理對照`);
