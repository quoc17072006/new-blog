import '@/css/tailwind.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
	return (
		<div
			className="antialiased"
			style={{ WebkitTapHighlightColor: 'transparent' }}
		>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#fff"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#353639"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="alternate"
					type="application/rss+xml"
					title="RSS 2.0"
					href="/feed.xml"
				/>
				<link
					rel="alternate"
					type="application/atom+xml"
					title="Atom 1.0"
					href="/atom.xml"
				/>
				<link
					rel="alternate"
					type="application/json"
					title="JSON Feed"
					href="/feed.json"
				/>
			</Head>
			<Component {...pageProps} />
		</div>
	)
}
