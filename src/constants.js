import { toLower } from 'ramda'

export const MIN_ANSWER_LENGTH = 8

export const authStatusConst 	= {
	INITIALIZING	: 'INITIALIZING',
	LOGGED_IN		: 'LOGGED_IN', 
	NOT_LOGGED_IN	: 'NOT_LOGGED_IN',
}

export const authScreenConst 	= {
	LOG_IN			: 'LOG_IN',
	SIGN_UP			: 'SIGN_UP',
	RESET			: 'RESET',
	SENT			: 'SENT'
}

export const statusConstSimple = {
	LOADING			: 'LOADING',
	LOADED			: 'LOADED'
}

export const statusConstWithNone = {
	NONE			: 'NONE',
	LOADING			: 'LOADING',
	LOADED			: 'LOADED',
}

export const saveTypeConst			= {
	NONE			: 'NONE',
	NEW_RECORD		: 'NEW_RECORD',
	SEARCH_DATE		: 'SEARCH_DATE',
	ANSWERS			: 'ANSWERS'
}

export const filterConst		= {
	MEMORIZED		: 'MEMORIZED',
	NOT_MEMORIZED	: 'NOT_MEMORIZED',
	ALL 			: 'ALL'
}

export const questions = [
	{ q: 'Görsel çağrışımlar', p: 'Görsel olaraksize ne anımsattığını not alın. Şekil ve renk olarak olabildiğince fazla detay girin.' },
	{ q: 'İşitsel çağrışımlar', p: 'Ses ve mantıksal yönden kelimenin size çağrıştırdığı şeyleri not alın.' },
	{ q: 'Diğer duyular', p: 'koku, tat ve dokunsal yönden canlandırarak ve yine olabildiğince detay vererek not alın.' },
	{ q: 'Duygusal', p: 'Ne hissettirdiğini yakalamaya çalışın! Çok güçlü bir duygu olması gerekmiyor, geçmişte ilişkili olarak yaşadığınız bir deneyim de olabilir. '},
	{ q: 'Yazılış-Heceleme', p: 'Kelimeyi doğru olarak yazın. Eğer zorlanacağınız veya karıştıracağınız yerler varsa, örneğin sırasını karıştırabileceğiniz harflerin olması durumunda, heceler gibi(tire işareti kullanarak) ve bir kaç kez tekrar ederek yazın.' },
	{ q: 'İlişkili kelimeler', p: 'Eş anlamlı, zıt anlamlı, anlam veya yazılış olarak ilişkili kelimeleri aklınıza geldiği kadarıyla yazın ve aradaki ilişkiyi biraz zaman ayırarak canlandırın.' },
	// { q: 'Açıklama 7', p: 'placeholder 7' },
	// { q: 'Açıklama 8', p: 'placeholder 8' },
	{ q: 'Diğer', p: 'Eklemek istediğiniz başka bir şey varsa buraya not alın' },	
]

export const emptyRecordCardContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

export const whatIsCengel = 'Çengel, sözlükten arattığınız ingilizce kelimelerin aklınızdan uçup gitmesine engel olur'
