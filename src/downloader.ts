export const getSongInfo = async (shareId: string) => {
  const url = `https://node.kg.qq.com/play?s=${shareId}`

  const text = await fetch(url).then((r) => r.text())
  const regex = /window\.__DATA__ = (.*?); <\/script>/
  const m = regex.exec(text)
  return JSON.parse(m[1])
}
