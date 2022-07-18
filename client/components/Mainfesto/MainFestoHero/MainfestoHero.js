import Styles from "./MainfestoHero.module.css";
import Image from "next/image";

const MainfestoHero = () => {
  return (
    <div className={Styles.mainfestoHero}>
      <div className={Styles.maiFestoHeroLeft}>
        <Image
          src={"/images/Blue Crystal.png"}
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className={Styles.mainFestoHeroRight}>
        <h6>Manifesto</h6>
        <h1>
          The Dawn of a <br /> New Era
        </h1>
        <p>To a life full of your wildesrt dreams coming true.</p>
        <p>
          {" "}
          Creating the Unimagianable &amp; taking the Road less traveled.
        </p>{" "}
        <p> Deep into the Cosmos.</p>
        <p> Down the rabbit hole we go.</p>{" "}
        <p> This is for the Thinkers, Artist, Misfits, Degens.</p>{" "}
        <p> Sanding Out’s Starting To feel a lot like Home.</p>
        <p>Step into your world. A world of wonder &amp; no Limitations.</p>
        <p> Leave your Insecurities at the Door, You wont’t need them here.</p>
        <p>
          If we grow, you grow, we go together welcome to the creative Haven.
        </p>
      </div>
    </div>
  );
};

export default MainfestoHero;
