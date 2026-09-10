import {guides} from '../lib/guides';
import {RelatedGuideCards} from './GuideCards';

export function RelatedGuides({slugs}:{slugs:string[]}){
 const selected=guides.filter(guide=>slugs.includes(guide.slug)).map(({slug,title,description,lastUpdated})=>({slug,title,description,lastUpdated}));
 return <RelatedGuideCards guides={selected}/>;
}
