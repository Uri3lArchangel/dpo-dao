import { fetchPolls, getAdmin } from '@/src/BE/functions/web3'
import Main from '@/src/FE/components/Main'
import React from 'react'

async function page() {
 const admin =((await  getAdmin()).data)?.toLowerCase()
 const polls:{pollId:number;pollTopic:string;pollCreattionTimestamp:number;Outcome:string;ended:boolean;active:boolean;yesVotes:number;noVotes:number}[] =(await fetchPolls()).data;
  return (
    <section>
      <Main admin={admin!} polls={polls}/>
    </section>
  )
}

export default page