module.exports = Prism => {
	const LANGUAGE_REGEX = /diff-([\w-]+)/i
	const HTML_TAG = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/gi
	const HTML_LINE = RegExp(
		/(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))/.source.replace(/__/g, function() {
			return HTML_TAG.source
		}),
		'gi'
	)
	var PREFIXES = Prism.languages.diff.PREFIXES

	Prism.hooks.add('before-sanity-check', function(env) {
		var lang = env.language

		if (LANGUAGE_REGEX.test(lang) && !env.grammar) env.grammar = Prism.languages[lang] = Prism.languages['diff']
	})

	Prism.hooks.add('before-tokenize', function(env) {
		var lang = env.language

		if (LANGUAGE_REGEX.test(lang) && !Prism.languages[lang]) Prism.languages[lang] = Prism.languages['diff']
	})

	Prism.hooks.add('wrap', function(env) {
		var diffLanguage, diffGrammar

		if (env.language !== 'diff') {
			var langMatch = LANGUAGE_REGEX.exec(env.language)
			if (!langMatch) return
			diffLanguage = langMatch[1]
			diffGrammar = Prism.languages[diffLanguage]
		}

		if (env.type in PREFIXES) {
			var content = env.content.replace(HTML_TAG, '')
			var decoded = content.replace(/&lt;/g, '<').replace(/&amp;/g, '&')
			var code = decoded.replace(/(^|[\r\n])./g, '$1')
			var highlighted, m

			if (diffGrammar) highlighted = Prism.highlight(code, diffGrammar, diffLanguage)
			else highlighted = Prism.util.encode(code)

			var prefixToken = new Prism.Token('prefix', PREFIXES[env.type], [/\w+/.exec(env.type)[0]])
			var prefix = Prism.Token.stringify(prefixToken, env.language)
			var lines = []
			HTML_LINE.lastIndex = 0

			while ((m = HTML_LINE.exec(highlighted))) {
				lines.push(prefix + m[0])
			}

			if (/(?:^|[\r\n]).$/.test(decoded)) lines.push(prefix)
			env.content = lines.join('')

			if (diffGrammar) env.classes.push('language-' + diffLanguage)
		}
	})
}
