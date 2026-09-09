import {T} from '../../src/components/Language';
import {BuildPlanner} from '../../src/components/BuildPlanner';
export const metadata={title:'Build Planner | Phantom Blade Zero Tools',description:'Save and share your own loadout notes.'};
export default function Builds(){return <><h1 className="text-4xl font-bold"><T text="Build Planner"/></h1><p className="mt-3 text-stone-400"><T text="Your combinations, saved on this device. Fields below are player notes, not verified equipment slots."/></p><BuildPlanner/></>}
