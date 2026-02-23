export async function getLatestNews(categoria = "technology") {
  const API_KEY = "3429f66319d94ac391539d600d895f33"; // substitua pela sua chave real

  try {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=pt&category=${categoria}`
    );

    if (!res.ok) {
      console.error("Resposta da API não foi OK:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    const artigos = data.results || [];

    return artigos.map((artigo) => ({
      titulo: artigo.title || "Sem título",
      texto: artigo.content || artigo.description || "Texto não disponível.",
    }));
  } catch (err) {
    console.error("Erro ao buscar notícias:", err);
    return [];
  }
}
