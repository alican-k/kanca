import cheerio from 'cheerio-without-node-native'

export const search = (term) =>
  fetch('https://www.seslisozluk.net/?word=' + term)
    .then(res => res.text())
    .then(text => parseMeaning(text))

const parseMeaning = (html) => {
  const $ = cheerio.load(html)

  const notFound = $('div.panel-heading.sesli-red-bg:contains("sözlükte bulunamadı")')
  if (notFound.length) {
    return 'NOT_FOUND' 
  }

  const didYouMean = $('div.panel-heading.sesli-red-bg:contains("Bunu mu demek istediniz?")')
  if (didYouMean.length) {
    const suggestions = []
    didYouMean.next().find('li').each(function(i) {
      suggestions.push($(this).text())
    })

    return suggestions 
  }

  const enToTrNode = $('div.panel-heading.sesli-red-bg:contains("İngilizce - Türkçe")')
  const enToTr = []

  if (enToTrNode.length) {
    enToTrNode.next().find('dd').each(function(i) {
      const dd = $(this)

      const samples = []
      dd.find('q').each(function(i) {
        samples.push($(this).text())
      })

      enToTr.push({ category: dd.find('var').text(), definition: dd.find('a').text(), samples })
    })
  }

  const trToEnNode = $('div.panel-heading.sesli-red-bg:contains("Türkçe - İngilizce")')
  const trToEn = []

  if (trToEnNode.length) {
    trToEnNode.next().find('dd').each(function(i) {
      const dd = $(this)

      const samples = []
      dd.find('q').each(function(i) {
        samples.push($(this).text())
      })

      trToEn.push({ category: dd.find('var').text(), definition: dd.find('a').text(), samples })
    })
  }

  return {enToTr, trToEn}
}
