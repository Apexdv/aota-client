import Styles from "./GalleryMain.module.css";
import Image from "next/image";
import { data } from "../data";
import { useState } from "react";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const GalleryMain = () => {
  const [info, setInfo] = useState(data);
  const [modalOpen, setModalOpen] = useState(null);

  const toggle = (i) => {
    if (modalOpen === i) {
      return setModalOpen(null);
    }

    setModalOpen(i);
  };

  return (
    <div className={Styles.galleryMain}>
      <div className={Styles.filerArea}>
        <h1>Gallery</h1>


        <div className={Styles.GoldenOption}> 

        <Image width={24} height={24} src={"/images/gallery/goldbean.png"} />
        <h3>Golden Mode</h3>
        <Switch {...label} />
        </div>

        <div className={Styles.SearcOption}> 

        <Image width={24} height={24} src={"/images/gallery/Search.png"} />
        <input placeholder="Sort by serial..." id="searchbyid" type="text" />

        </div>

        <div className={Styles.optionArea}>
          {info.map((data, i) => {
            return (
              <>
                <div className={Styles.filterOption}>
                  <div className={Styles.ImageAndIcon}>
                  <Image width={20} height={15} src={data.image}/>
                  <p>{data.name}</p>              
                  </div>

                  <div className={Styles.plusIcon} onClick={() => toggle(i)}>
                    {modalOpen === i ? (
                      <Image
                        src={"/images/x.png"}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      ></Image>
                    ) : (
                      <Image
                        src={"/images/Plus.png"}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      ></Image>
                    )}
                  </div>
                </div>

                {modalOpen === i ? (
                  <div className={Styles.options}>
                    {data.options.map((option) => {
                      return <p>{option}</p>;
                    })}
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
        <button className={Styles.resetButton}>Reset</button>
      </div>

      <div className={Styles.galleryItem}>
        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 187.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>

        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 184-1.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>

        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 184-2.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>

        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 187.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>

        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 184-1.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>

        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 184-2.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>

        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 187.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>

        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 184-1.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>

        <div className={Styles.galleryImages}>
          <Image
            src={"/images/Frame 184-2.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default GalleryMain;