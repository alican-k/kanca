import { times, toLower } from 'ramda'
import { statusConstWithNone, statusConstSimple } from './constants'

export const sampleMeaning = { 
	entr			: '::__typ{f}__defgibi::__defaçıklama::__cat(Bilgisayar)__defadı::__defolabildikçee::__defolabildikçe__expexample',
	entrRel			: '::__trmas a result__typ{f}__defgibi::defaçıklama::__cat(Bilgisayar)__defadı::__defolabildikçee::__defolabildikçe',
	tren			: '',
	trenRel			: '',
	pronunciation	: "/ˈaz/ /ˈæz/",
	sameMeanings	: 'at the time that, during the time that',
	sameSyntaxes	: 'as well as, as well, as soon as, as long as',
	voice			: ''								// bu url olacak. ama cihaza kaydederken dosya da kaydedilecek
}

const createRecordArray = size => times(
	i => ({
		term			: 'window' + i,
		searchDate		: 100000 + i,
		memorizeDate	: 0,
		summary			: 'açıklama summary - pencere',
		meaning			: sampleMeaning, 
		answers			: [] 
	}), 
	size
)

export const sampleRecords = createRecordArray(4)