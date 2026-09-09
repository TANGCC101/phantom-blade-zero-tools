import {RelatedGuides} from '../../src/components/RelatedGuides';
import {T} from '../../src/components/Language';
import {weapons} from '../../src/lib/data';
import {EntityList} from '../../src/components/EntityList';
import {ReliabilityLegend} from '../../src/components/ReliabilityLegend';
import {JsonLd} from '../../src/components/JsonLd';
import {itemList,pageMetadata} from '../../src/lib/seo';
export const metadata=pageMetadata('Weapons & combat systems','/weapons','Explore sourced Phantom Blade Zero main weapon and Phantom Edges system overviews, with preview limits and links to planning guides.');
export default function Page(){return <><h1 className="text-4xl font-bold"><T text="Weapons & combat systems"/></h1><p className="my-4 text-stone-400"><T text="Start with the officially described weapon families. These system overviews are not a complete item database."/></p><ReliabilityLegend/><EntityList items={weapons} kind="weapons"/><JsonLd data={itemList(weapons,'weapons')}/><RelatedGuides slugs={["combat-system-overview","phantom-edges"]}/></>;
}
