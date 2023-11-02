import { refineDate } from '@/src/BE/functions/helpers';
import { concludePoll, unfreezeToken, vote } from '@/src/BE/functions/web3';
import Link from 'next/link';
import React from 'react'

function ActivePolls({polls,wallet,admin}:{polls:any[],wallet:any,admin:string}) {
    const Active = polls.filter((e)=> e.active)
  return (
    <>
    {Active.map((item, i) => (
            <li key={i}>
              <p id="votetopic">{item.pollTopic}</p>
              <p id="yes">Yes:{item.yesVotes}</p>
              <p id="no">no:{item.noVotes}</p>

              <button
                id="yesBtn"
                onClick={() => {
                  console.log(i);

                  vote(wallet.accounts[0], i, true);
                }}
                className="text-white px-6 py-2 rounded-md bg-green-500 border border-[inherit] hover:bg-green-500/80"
              >
                Vote Yes
              </button>

              <button
                id="noBtn"
                onClick={() => {
                  console.log(i);
                  vote(wallet.accounts[0], i, false);
                }}
                className="text-white px-6 py-2 rounded-md bg-red-500 border border-[inherit] hover:bg-red-500/80"
              >
                Vote No
              </button>
              {wallet.accounts[0] == admin ? (
                <button
                  id="concludeBtn"
                  onClick={() => {
                    concludePoll(wallet.accounts[0], i);
                  }}
                  className="border border-red-500 py-2 px-6 rounded-md text-red-500"
                >
                  Conclude Poll
                </button>
              ) : (
                <></>
              )}
              <Link id="timer"
                data-type="countdown"
                data-name="Poll ends in:"
                data-bg_color="#97B8FF"
                data-name_color="#008922"
                data-border_color="#888888"
                data-dt={refineDate(item.pollCreattionTimestamp)}
                data-timezone="America/Chicago"
                className="tickcounter"
                onClick={(e)=>{e.preventDefault();e.currentTarget.href="#"}}
                href="//www.tickcounter.com"
              >
                Countdown
              </Link>
              <div id="outcome">
                <h2 className="text-xl">Vote Outcome:</h2>
                <p className="text-2xl font-extrabold">{item.Outcome}</p>
              </div>
              <button
                id="unfreezeBtn"
                onClick={() => {
                  unfreezeToken(wallet.accounts[0]);
                }}
                className="border border-blue-500 text-blue-500 rounded-lg px-4 py-2"
              >
                Unfreeze Token
              </button>
            </li>
          ))}
          </>
  )
}

export default ActivePolls