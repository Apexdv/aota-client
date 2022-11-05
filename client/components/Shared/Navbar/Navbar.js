import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Styles from "./Navbar.module.css";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import { MintContext } from "./../../../context/MintContext";

function Navbar({ BorderBottom, wallet }) {
  const {
    isConnected,
    hasMetamask,
    sign,
    web3Modal,
    web3,
    setIsConnected,
    setWeb3Modal,
    setSign,
    setWeb3,
    setChainId
  } =
    useContext(MintContext);


  // connect to wallet start

  useEffect(() => {
    // initiate web3modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "29a4aa8775aa42caace0437559c37bb4",
        },
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "",
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  // connect to wallet end
  async function connectWallet() {
    let provider;
    try {
      provider = await web3Modal.connect();
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
    console.log("HERE", provider);

    await addListeners(provider);

    const web3Instance = new Web3(provider);
    const signer = (await web3Instance.eth.getAccounts())[0];
    const chainId = await web3Instance.eth.getChainId();
    console.log(web3Instance, "dfasdf");
    setWeb3(web3Instance);
    setSign(signer);
    setChainId(chainId);
    setIsConnected(true);
  }

  // reset web3 and signer when disconnecting
  async function resetApp() {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await web3Modal.clearCachedProvider();
    setWeb3(null);
    setChainId("");
    setSign("");
    setIsConnected(false);
  }

  // disconnect from wallet end
  async function disconnectWallet() {
    await web3Modal.clearCachedProvider();
    setWeb3(null);
    setChainId("");
    setSign("");
    setIsConnected(false);
  }

  async function addListeners(web3ModalProvider) {
    if (!web3ModalProvider.on) {
      return;
    }
    web3ModalProvider.on("close", () => resetApp());

    web3ModalProvider.on("accountsChanged", async (accounts) => {
      setConnectedAddress(accounts[0]);
      window.location.reload();
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", async (chainId) => {
      setChainId(chainId);
      window.location.reload();
    });
  }

  // connect to wallet end 

  useEffect(() => { }, [isConnected, web3]);
  const router = useRouter();
  const [active, setActive] = useState(null);
  return (
    <nav
      style={{ display: "block", padding: "20px 20px 0px" }}
      className={`navbar navbar-expand-lg fn-Montserrat-Regular ${wallet ? "navbar-light" : "navbar-dark"
        } bg-primary`}
    >
      <div className={`${wallet}  ${BorderBottom && Styles.BorderBottom}`}>
        <div className={Styles.MobileLogoButton}>
          <Link className={`navbar-brand ${Styles.MobileNabImage}`} href="/">
            <Image
              src="/image 8.png"
              width={100}
              height={20}
              className={`img-fluid`}
            />
          </Link>

          <button
            className={`navbar-toggler collapsed ${Styles.MobileNabButton}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <Image
              src={"/image/Menu (2 lines).svg"}
              width={20}
              height={15}
              className="navbar-toggler-icon text-white"
            /> */}
            <span class="toggler-icon top-bar"></span>
            <span class="toggler-icon middle-bar"></span>
            <span class="toggler-icon bottom-bar"></span>
          </button>
        </div>

        <div
          className={`collapse navbar-collapse ${Styles.NavbarItam}`}
          id="navbarSupportedContent"
        >
          <ul
            style={{ lineHeight: "40px" }}
            className="navbar-nav me-auto mb-2 mb-lg-0"
          >
            {wallet ? (
              <>
                <Link href={"/collection"}>
                  <li className="nav-item ms-md-4">
                    <a
                      className={"nav-link " + Styles.navLink}
                      aria-current="page"
                      href="#"
                    >
                      Collection
                    </a>
                  </li>
                </Link>
                {sign === "0x33588e7C50457e0e5f7dC0fD8FFa60E93ef33881" && (
                  <Link href={"/admin"}>
                    <li className="nav-item ms-md-4 " >
                      <a
                        className={"nav-link " + Styles.navLink}
                        aria-current="page"
                        href="#"
                      >
                        Admin
                      </a>
                    </li>
                  </Link>
                )}

                <li className="nav-item ms-md-4">
                  {isConnected &&
                    <p className="pt-2 fw-bold" style={{ overflow: "hidden", wordWrap: "break-word", marginRight: "8px" }}> {sign?.slice(0, 4)}...{sign?.slice(-4)} </p>
                  }
                </li>
                <li className="nav-item ms-md-4">
                  {isConnected && (
                    <button
                      className={"btn " + Styles.disWalletBtn}
                      onClick={() => disconnectWallet()}
                      aria-current="page"
                      href="#"
                    >
                      Disconnect Wallet
                    </button>
                  )
                    // : (
                    //   <button
                    //     className={"btn " + Styles.connectWalletBtn}
                    //     onClick={() => connectwallet()}
                    //   >
                    //     Connect Wallet
                    //   </button>
                    // )
                  }
                </li>
              </>
            ) : (
              <>
                <Link className={"navbar-brand"} href="/">
                  <div className={Styles.LogoImage}>
                    <Image src="/image 8.png" layout="fill" objectFit="cover" />
                  </div>
                </Link>

                <div className={Styles.menuAll}>
                  <Link href={"/gallery"}>
                    <li className={`nav-item ms-md-4 ${Styles.Muneleft}`}>
                      <a
                        className={
                          router.pathname == "/gallery"
                            ? Styles.navLinkActive
                            : "nav-link " + Styles.navLink
                        }
                        aria-current="page"
                        href="#"
                      >
                        Gallery
                      </a>
                    </li>
                  </Link>
                  <Link href={"/roadmap"}>
                    <li className="nav-item ms-md-4">
                      <a
                        className={
                          router.pathname == "/roadmap"
                            ? Styles.navLinkActive
                            : "nav-link " + Styles.navLink
                        }
                        aria-current="page"
                        href="#"
                      >
                        Roadmap
                      </a>
                    </li>
                  </Link>
                  <Link href={"/manifesto"}>
                    <li className="nav-item ms-md-4">
                      <a
                        className={
                          router.pathname == "/manifesto"
                            ? Styles.navLinkActive
                            : "nav-link " + Styles.navLink
                        }
                        aria-current="page"
                        href="#"
                      >
                        Manifesto
                      </a>
                    </li>
                  </Link>
                  <Link href={"/the-ave"}>
                    <li className="nav-item ms-md-4">
                      <a
                        className={
                          router.pathname == "/the-ave"
                            ? Styles.navLinkActive
                            : "nav-link " + Styles.navLink
                        }
                        aria-current="page"
                        href="#"
                      >
                        The ave
                      </a>
                    </li>
                  </Link>
                </div>
              </>
            )}
          </ul>
          <ul className={`navbar-nav ml-auto $`}>
            <div className={Styles.SocailMedIcon}>
              <li className="nav-item">
                <a
                  onMouseOver={() => setActive(0)}
                  onMouseOut={() => setActive(null)}
                  className={"nav-link " + Styles.socialIcon}
                  aria-current="page"
                  href="http://instagram.com/aliensontheave"
                  target="_blank"
                >
                  {active === 0 ? (
                    <Image
                      src="/images/navbar/insta Yellow.svg"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/images/navbar/insta gray.svg"
                      width={24}
                      height={24}
                    />
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a
                  onMouseOver={() => setActive(1)}
                  onMouseOut={() => setActive(null)}
                  className={"nav-link " + Styles.socialIcon}
                  aria-current="page"
                  href="https://discord.gg/xpsqJdKkZd"
                  target="_blank"
                >
                  {active === 1 ? (
                    <Image
                      src="/images/navbar/Discord.svg"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/images/navbar/Discord 2.svg"
                      width={24}
                      height={24}
                    />
                  )}
                </a>
              </li>

              <li className="nav-item">
                <a
                  onMouseOver={() => setActive(2)}
                  onMouseOut={() => setActive(null)}
                  className={"nav-link " + Styles.socialIcon}
                  aria-current="page"
                  href="http://twitter.com/AOTAnft/"
                  target="_blank"
                >
                  {active === 2 ? (
                    <Image
                      src="/images/navbar/twitter.svg"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/images/icons/twitter.svg"
                      width={24}
                      height={24}
                    />
                  )}
                </a>
              </li>

              <li className="nav-item">
                <a
                  onMouseOver={() => setActive(3)}
                  onMouseOut={() => setActive(null)}
                  className={"nav-link " + Styles.socialIcon}
                  aria-current="page"
                  href="https://opensea.io/collection/aota-genesis"
                  target="_blank"
                >
                  {active === 3 ? (
                    <Image
                      src="/images/navbar/opensea 1.svg"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/images/icons/opensea 2.svg"
                      width={24}
                      height={24}
                    />
                  )}
                </a>
              </li>
            </div>

            {/* <button
              className={`${Styles.MobileButton}`}
              onClick={connectwallet}
            >
              {isConnected ? "Mint" : "Connect Wallet"}
            </button> */}

            {/* <li className="nav-item">
              <a className={"nav-link " + Styles.navLinkTooo}>
                {isConnected ? (
                  <Link href={"/public-sale"}>
                    <button className={`${Styles.connectWalletBtnS}`}>
                      MINT
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => connectWallet()}
                    className={`${Styles.connectWalletBtnS}`}
                  >
                    CONNECT WALLET
                  </button>
                )}
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
