"use client";
import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useState } from "react";
import ModalApp from "./ModalApp";
import ModalComponent from "./ModalComponent";
import { fetchPolls, getAdmin } from "@/src/BE/functions/web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

function Main() {
  const [admin, setAdmin] = useState("");
  const [polls, setPolls] = useState<any[]>([]);
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], chainId: "" };
  const [wallet, setWallet] = useState(initialState);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
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
    const init = async () => {
      const polls = await fetchPolls();
      const admin = await getAdmin();
      
      if (polls.status == "error" || admin.status == "error") {
        return;
      }
      console.log(String(admin.data).toLowerCase(),wallet.accounts[0])
      setAdmin(String(admin.data).toLowerCase());
      setPolls(polls.data);
    };

    getProvider();
    init();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", chechChain);
    };
  }, [modalState,wallet.accounts]);
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

  return (
    <>
      <ModalApp
        modalState={modalState}
        set={setModalState}
        component={<ModalComponent refresh={refreshChain} />}
      />
      <nav className="fixed w-full bg-[#000000dd] backdrop:blur-[10px] top-0 py-4 border-b border-white">
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
      <main className="my-[7%] lg:max-w-[750px] mx-auto">
        {wallet.accounts[0] == admin ? (
          <>
            {" "}
            <h1 className="text-center text-xl">Create A Poll</h1>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="Write a topic to be polled"
              className="border border-gray-500 rounded-md mx-auto block w-full md:w-[50%] lg:w-[100%] p-4 outline-none h-[200px]"
            ></textarea>
            <button className="bg-blue-500 rounded-md px-6 py-2 text-white my-2 border border-[inherit] hover:bg-blue-500/90">
              POLL
            </button>
          </>
        ) : (
          <></>
        )}
        <ul className="voteHistory">
          <h2 className="text-xl">Poll History</h2>
         {polls.map((item,i)=>(
           <li>
           <p id="votetopic">topic....</p>
           <button
             id="yesBtn"
             className="text-white px-6 py-2 rounded-md bg-green-500 border border-[inherit] hover:bg-green-500/80"
           >
             Vote Yes
           </button>
           <button
             id="noBtn"
             className="text-white px-6 py-2 rounded-md bg-red-500 border border-[inherit] hover:bg-red-500/80"
           >
             Vote No
           </button>
          { wallet.accounts[0] == admin ?<button
             id="concludeBtn"
             className="border border-red-500 py-2 px-6 rounded-md text-red-500"
           >
             Conclude Poll
           </button>:<></>}
           <p id="timer">TimeLeft:00:00:00</p>
           <div id="outcome">
             <h2 className="text-xl">Vote Outcome:</h2>
             <p className="text-2xl font-extrabold">{item.Outcome}</p>
           </div>
           <button
             id="unfreezeBtn"
             className="border border-blue-500 text-blue-500 rounded-lg px-4 py-2"
           >
             Unfreeze Token
           </button>
         </li>
         ))}
        </ul>
      </main>
    </>
  );
}

export default Main;
