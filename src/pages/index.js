import tinytime from 'tinytime'
import Link from 'next/link'
import Head from 'next/head'
import getAllPostPreviews from '@/getAllPostPreviews'
import quoc17072006 from '@/img/quoc17072006.jpg'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'

const posts = getAllPostPreviews()

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export default function Home() {
	return (
		<>
			<SectionContainer>
				<Header />
			</SectionContainer>
			<SectionContainer>
				<main>
					<div className="divide-y divide-gray-200">
						<Head>
							<title>Quoc's Blog</title>
							<meta
								name="description"
								content="This is the place where I jot down my thoughts, and many other things."
							/>
							<meta
								property="og:url"
								content="https://quoc17072006-blog.vercel.app"
							/>
							<meta property="og:type" content="article" />
							<meta property="og:image" content={quoc17072006} />
							<meta property="og:title" content="Quoc's Blog" />
							<meta
								property="og:description"
								content="This is the place where I jot down my thoughts, and many other things."
							/>
						</Head>
						<div className="pt-6 pb-8 space-y-2 md:space-y-5">
							<h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem]">
								Welcome to my blog!
							</h1>
							<p className="text-lg text-gray-500">
								Hey everyone, this is the place where I jot down my thoughts,
								and many other things.
							</p>
						</div>
						<ul className="divide-y divide-gray-200">
							{posts.map(({ link, module: { default: Component, meta } }) => {
								return (
									<li key={link} className="py-12">
										<article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
											<dl>
												<dt className="sr-only">Published on</dt>
												<dd className="text-base font-medium text-gray-500">
													<time dateTime={meta.date}>
														{postDateTemplate.render(new Date(meta.date))}
													</time>
												</dd>
											</dl>
											<div className="space-y-5 xl:col-span-3">
												<div className="space-y-6">
													<h2 className="text-2xl font-bold tracking-tight">
														<Link href={link}>
															<a className="text-gray-900">{meta.title}</a>
														</Link>
													</h2>
													<div className="prose max-w-none text-gray-500">
														<Component />
													</div>
												</div>
												<div className="text-base font-medium">
													<Link href={link}>
														<a
															className="text-teal-600 hover:text-teal-700"
															aria-label={`Read "${meta.title}"`}
														>
															Read more &rarr;
														</a>
													</Link>
												</div>
											</div>
										</article>
									</li>
								)
							})}
						</ul>
					</div>
				</main>
			</SectionContainer>
		</>
	)
}
