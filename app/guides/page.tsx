import {T} from '../../src/components/Language';
import Link from 'next/link';
import {JsonLd} from '../../src/components/JsonLd';
import {ReliabilityLegend} from '../../src/components/ReliabilityLegend';
import {pageMetadata} from '../../src/lib/seo';
export const metadata=pageMetadata('Guides','/guides','How to save, share, and interpret your Phantom Blade Zero planning notes.');
const faq=[
 {q:'Does the planner recommend a best build?',a:'No. It records your combinations and strategy notes. It does not simulate damage, validate equipment compatibility, or assign a score.'},
 {q:'Where are my builds stored?',a:'In localStorage on this browser. Download a JSON backup before clearing site data or changing devices. Shared links include the notes you choose to share.'},
 {q:'What does Pre-release mean?',a:'The entry describes announcements or demo observations before release. Official identifies the source; it does not imply final-release verification.'},
 {q:'What happens when the launch timer ends?',a:'The tracker exposes boss progress and retains the pre-release checklist. This is a scheduled interface change, not an independent check that the game is available in your region.'}
];
export default function Guides(){return <><h1 className="mb-6 text-4xl font-bold"><T text="Field guide"/></h1><ReliabilityLegend/><div className="mt-6 grid gap-4 md:grid-cols-2">{faq.map(x=><article className="panel" key={x.q}><h2 className="text-xl text-gold"><T text={x.q}/></h2><p className="mt-3 leading-relaxed text-stone-300"><T text={x.a}/></p></article>)}</div><div className="mt-8 flex gap-6"><Link href="/builds"><T text="Open the planner →"/></Link><Link href="/bosses"><T text="Browse encounter notes →"/></Link></div><JsonLd data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(x=>({'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}}))}}/></>}
