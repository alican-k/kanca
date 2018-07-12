import cheerio from 'cheerio-without-node-native'
import { compose, filter, prop, startsWith, split } from 'ramda'

export const search = (term) =>
  fetch('https://www.seslisozluk.net/?word=' + term)
    .then(res => res.text())
    .then(text => parseMeaning(text))

const parseMeaning = (html) => {
	const $ = cheerio.load(html)

	const notFound = $('div.panel-heading.sesli-red-bg:contains("sözlükte bulunamadı")')
	if (notFound.length) {
		return 'notfound' 
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
	let entr = ''

	if (enToTrNode.length) {
		enToTrNode.next().find('dd').each(function(i) {
			let item = ''			
			const dd = $(this)

			const prev = dd.prev()

			const trm = prev && 
						prev.prop('tagName') === 'DT' && 
						prev.hasClass('similar') && 
						prev.text().trim()

			const cat = dd.find('var.category').text().trim()
			const typ = dd.find('var.pos').text().trim()
			const def = dd.find('a').text().trim()

			item += trm ? '__trm' + trm : ''
			item += typ ? '__typ' + typ : ''
			item += cat ? '__cat' + cat : ''
			item += def ? '__def' + def : ''

			dd.find('q').each(function(i) {
				const exp = $(this).text().trim()
				item += exp ? '__exp' + exp : ''
			})
			entr += item ? '::' + item : ''
		})
	}

	const trToEnNode = $('div.panel-heading.sesli-red-bg:contains("Türkçe - İngilizce")')
	let tren = ''

	if (trToEnNode.length) {
		trToEnNode.next().find('dd').each(function(i) {
			let item = ''			
			const dd = $(this)

			const prev = dd.prev()

			const trm = prev && 
						prev.prop('tagName') === 'DT' && 
						prev.hasClass('similar') && 
						prev.text().trim()

			const cat = dd.find('var.category').text().trim()
			const typ = dd.find('var.pos').text().trim()
			const def = dd.find('a').text().trim()

			item += trm ? '__trm' + trm : ''
			item += typ ? '__typ' + typ : ''
			item += cat ? '__cat' + cat : ''
			item += def ? '__def' + def : ''

			dd.find('q').each(function(i) {
				const exp = $(this).text().trim()
				item += exp ? '__exp' + exp : ''
			})
			tren += item ? '::' + item : ''
		})
	}

	const pronunciation = $('div#phonem div').text() || ''

	let sameMeanings = ''
	$('div#synonyms a').each(function(i){
		const comma = i === 0 ? '' : ','
		sameMeanings += comma + $(this).text()
	})

	let sameSyntaxes = ''
	$('div#common-collocations a').each(function(i){
		const comma = i === 0 ? '' : ', '
		sameSyntaxes += comma + $(this).text()
	})

	const voiceArr = []
	$('a[title="Sesli Dinleme Butonları"]').each(function(i){
		const onclick = $(this).attr('onclick')
		const url = compose(prop(0), filter(startsWith('pron')), split("'"))(onclick)
		voiceArr.push(url)
	})

	let voice = compose(prop(0), filter(startsWith('pronunciation/en/us')))(voiceArr)
	voice = voice || compose(prop(0), filter(startsWith('pronunciation/en/uk')))(voiceArr)
	voice = voice || compose(prop(0), filter(startsWith('pronunciation/en/au')))(voiceArr)

	return {
		entr, 
		tren, 
		pronunciation, 
		sameMeanings,
		sameSyntaxes,
		voice
	}
}
