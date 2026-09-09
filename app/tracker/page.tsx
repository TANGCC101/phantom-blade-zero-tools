import {pageMetadata} from '../../src/lib/seo';
import {RelatedGuides} from '../../src/components/RelatedGuides';
import {T} from '../../src/components/Language';
import {Tracker} from '../../src/components/Tracker';
export const metadata=pageMetadata('Phantom Blade Zero Launch & Progress Tracker','/tracker','Follow the scheduled Phantom Blade Zero launch, preserve your announcement checklist, and record personal progress with local JSON backups.');
export default function Page(){return <><h1 className="text-4xl font-bold"><T text="Your journey, recorded."/></h1><Tracker/><RelatedGuides slugs={["progress-tracker","boss-encounter-notes"]}/></>;
}
