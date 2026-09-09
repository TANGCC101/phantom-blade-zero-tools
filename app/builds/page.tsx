import {pageMetadata} from '../../src/lib/seo';
import {RelatedGuides} from '../../src/components/RelatedGuides';
import {T} from '../../src/components/Language';
import {BuildPlanner} from '../../src/components/BuildPlanner';
export const metadata=pageMetadata('Phantom Blade Zero Build Planner','/builds','Save personal Phantom Blade Zero build notes in your browser, export JSON backups, and preview shared combinations. No unverified build rankings.');
export default function Builds(){return <><h1 className="text-4xl font-bold"><T text="Build Planner"/></h1><p className="mt-3 text-stone-400"><T text="Your combinations, saved on this device. Fields below are player notes, not verified equipment slots."/></p><BuildPlanner/><RelatedGuides slugs={["build-planner","phantom-edges"]}/></>;
}
