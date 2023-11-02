"use client";
import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useRef, useState } from "react";
import ModalApp from "./ModalApp";
import ModalComponent from "./ModalComponent";
import {
  concludePoll,
  createPoll,
  unfreezeToken,
  vote,
} from "@/src/BE/functions/web3";
import Link from "next/link";
import { message } from "antd";
import TabApp from "./TabApp";

declare global {
  interface Window {
    ethereum: any;
  }
}



function Main({ admin,polls }: { admin: string,polls:{pollId:number;pollTopic:string;pollCreattionTimestamp:number;Outcome:string;ended:boolean;active:boolean;yesVotes:number;noVotes:number}[]}) {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], chainId: "" };
  const [wallet, setWallet] = useState(initialState);
  const [modalState, setModalState] = useState(false);
const topicRef = useRef<HTMLTextAreaElement>(null)
  const timerApi = () => {
    (function (d, s, id) {
      var js,
        pjs = d.getElementsByTagName(s)[0] as HTMLScriptElement;
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "//www.tickcounter.com/static/js/loader.js";
      pjs.parentNode?.insertBefore(js, pjs);
    })(document, "script", "tickcounter-sdk");
  };
  const cleanUPTimer=()=>{
    const js = document.getElementById("tickcounter-sdk") as HTMLScriptElement
    if(js){
      js.parentElement?.removeChild(js)
    }
  }
  useEffect(() => {
    timerApi()
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        setWallet(initialState);
      }
    };
    const chechChain = (chainId: any) => {
      if (chainId != "0xa4b1" && hasProvider) {
        setModalState(true);
      }
    };
    if (wallet.chainId != "0xa4b1" && hasProvider) {
      setModalState(true);
    }
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", chechChain);
      }
    };

    getProvider();

    return () => {
      cleanUPTimer()
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", chechChain);
    };
  }, [modalState, admin]);
  const refreshChain = async (chainId: any) => {
    setWallet((wallet) => ({ ...wallet, chainId }));
  };
  const updateWallet = async (accounts: any) => {
    setWallet({
      accounts,
      chainId: await window.ethereum.request({ method: "eth_chainId" }),
    });
  };
  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };
  const handleTopic=()=>{
    if(!topicRef || !topicRef.current){ message.error("Please enter a topic to poll"); return }

    return topicRef.current.value
  }
  return (
    <>
      <ModalApp
        modalState={modalState}
        set={setModalState}
        component={<ModalComponent refresh={refreshChain} />}
      />
      <nav className=" z-20 fixed w-full bg-[#000000dd] backdrop:blur-[10px] top-0 py-4 border-b border-white">
        <h1 className="text-2xl ml-6 font-extrabold text-white">
          DPO <span className="text-[#729502]">SHAREHOLDERS</span> DAO
        </h1>
        {wallet.accounts.length > 0 ? (
          <p className="text-center text-white text-xl">{wallet.accounts[0]}</p>
        ) : (
          <button
            className="px-6 py-2 bg-white border border-[#729502] rounded-lg hover:bg-[#729502] hover:text-white mx-auto block text-[#729502]"
            onClick={handleConnect}
          >
            Connect Wallet
          </button>
        )}
      </nav>
      <main className="my-[7%] mt-40 lg:max-w-[750px] mx-auto">
        {wallet.accounts[0] == admin ? (
          <>
            {" "}
            <h1 className="text-center text-xl">Create A Poll</h1>
            <textarea
              name=""
              id=""
              ref={topicRef}
              cols={30}
              rows={10}
              placeholder="Write a topic to be polled"
              className="border border-gray-500 rounded-md mx-auto block w-full md:w-[50%] lg:w-[100%] p-4 outline-none h-[200px]"
            ></textarea>
            <button className="bg-blue-500 rounded-md px-6 py-2 text-white my-2 border border-[inherit] hover:bg-blue-500/90" onClick={()=>{createPoll(wallet.accounts[0],handleTopic())}
            }>
              POLL
            </button>
          </>
        ) : (
          <></>
        )}
        <ul className="voteHistory">
          <h2 className="text-xl mt-10">Poll History</h2>
          <TabApp admin={admin} polls={polls} wallet={wallet}  />
        </ul>
      </main>
    </>
  );
}

export default Main;
