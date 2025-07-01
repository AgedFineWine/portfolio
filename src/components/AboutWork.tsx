import SubHeader from "./SectionHeader";
import me from "../assets/me.png";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutWork() {
  return (
    <section className="py-20 mb-35 mx-auto boundingBox">

      <div className="grid grid-cols-2 justify-items-center aboutWork">
        <div>
          <SubHeader id={"aboutWork"} singleWord={'Intro'} shortTextBefore={'About My '} emphasis={'Works'} />
          <p className="mt-8 text-center text-muted-grey font-inter font-normal text-lg">
            I've put a lot of time and heart into brainstorming, planning, and developing these personal projects.
            My hope is that they can bring some value to others while also giving me the chance to have some fun
            while learning and growing.
          </p>
        </div>

        <div className="flex justify-center w-1/2">
          <img className="w-[350px] aspect-square" src={me} alt="A picture of me" />
        </div>

      </div>
    </section>
  );
}
