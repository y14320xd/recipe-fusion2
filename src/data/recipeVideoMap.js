export const recipeVideoMap = {
  "大蒜乾煎吳郭魚": "https://www.youtube.com/watch?v=hhC2wey93Wk",
  "豆豉清蒸吳郭魚": "https://www.youtube.com/watch?v=cg5-a8RasrM",
  "泰式酸辣吳郭魚": "https://www.youtube.com/watch?v=PDDX0VIxsr4",
  "味噌吳郭魚湯": "https://www.youtube.com/watch?v=8TeH2iu7b6A",
  "三杯吳郭魚": "https://www.youtube.com/watch?v=MI9Io2GajXo",
  "家常紅燒吳郭魚": "https://www.youtube.com/watch?v=zj5IPvofjnQ",
  "番茄燉吳郭魚": "https://www.youtube.com/watch?v=t2V7OeZ8KQU",
  "香蔥豆瓣吳郭魚": "https://www.youtube.com/watch?v=E_YbdSfwWwY",
  "剁椒蒸吳郭魚": "https://www.youtube.com/watch?v=rUOQds5V63o",
  "砂鍋魚頭風吳郭魚湯": "https://www.youtube.com/watch?v=p_x1t5kHHd8",
};

export function normalizeYoutubeUrl(url = "") {
  if (!url) return "";

  if (url.includes("/embed/")) return url;

  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
  if (!match) return url;

  return `https://www.youtube.com/embed/${match[1]}`;
}

export function buildYoutubeEmbedUrl(url = "", start = 0, end = null) {
  const normalized = normalizeYoutubeUrl(url);
  if (!normalized) return "";

  const params = new URLSearchParams({
    autoplay: "1",
    enablejsapi: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  if (Number.isFinite(start) && start > 0) params.set("start", String(start));
  if (Number.isFinite(end) && end > start) params.set("end", String(end));

  return `${normalized}?${params.toString()}`;
}

export default recipeVideoMap;
