import {T,LanguageProvider,LanguageSelect} from '../src/components/Language';
import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import type {Metadata} from 'next';
import {siteUrl} from '../src/lib/seo';
export const metadata:Metadata={
 title:{default:'Phantom Blade Zero Tools',template:'%s | PBZ Tools'},
 description:'Independent, sourced build planning and launch tracking for Phantom Blade Zero.',
 metadataBase:siteUrl?new URL(siteUrl):undefined,
 robots:{index:!!siteUrl,follow:!!siteUrl},
 verification:{google:process.env.GOOGLE_SITE_VERIFICATION||undefined},
 openGraph:{title:'Phantom Blade Zero Tools',description:'Plan your combinations. Record your journey.',type:'website'},
};
export default function Layout({children}:{children:React.ReactNode}){
 const token=process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN;
 return <html lang="en"><body><LanguageProvider><a className="skip-link" href="#main"><T text="Skip to content"/></a><header className="border-b border-stone-800"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-5"><Link href="/" className="text-xl font-bold tracking-widest text-gold">PBZ <span className="text-stone-300">/ TOOLS</span></Link><nav aria-label="Main navigation" className="flex flex-wrap gap-5">{['builds','weapons','bosses','tracker','guides','about'].map(x=><Link key={x} href={'/'+x} className="text-sm capitalize"><T text={x}/></Link>)}</nav><LanguageSelect/></div></header><main id="main" className="mx-auto min-h-[75vh] max-w-6xl px-6 py-12">{children}</main><footer className="mx-auto max-w-6xl border-t border-stone-800 px-6 py-8 text-sm text-stone-500"><T text="Independent fan project · No affiliation with S-GAME."/><Link href="/about"><T text="Sources & privacy"/></Link></footer>{token&&<Script src="https://static.cloudflareinsights.com/beacon.min.js" strategy="afterInteractive" data-cf-beacon={JSON.stringify({token})}/>}</LanguageProvider></body></html>;
}
