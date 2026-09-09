import {T} from '../../src/components/Language';
import {bosses} from '../../src/lib/data';
import {EntityList} from '../../src/components/EntityList';
import {ReliabilityLegend} from '../../src/components/ReliabilityLegend';
import {JsonLd} from '../../src/components/JsonLd';
import {itemList,pageMetadata} from '../../src/lib/seo';
export const metadata=pageMetadata('Boss encounter notes','/bosses','Sourced pre-release reference notes and tools.');
export default function Page(){return <><h1 className="text-4xl font-bold"><T text="Boss encounter notes"/></h1><p className="my-4 text-stone-400"><T text="A selective record of reported demo encounters. Community includes independent press; entries are not a final-release boss roster."/></p><ReliabilityLegend/><EntityList items={bosses} kind="bosses"/><JsonLd data={itemList(bosses,'bosses')}/></>}
