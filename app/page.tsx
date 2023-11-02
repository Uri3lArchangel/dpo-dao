import { fetchPolls, getAdmin } from '@/src/BE/functions/web3'
import Main from '@/src/FE/components/Main'
import React from 'react'

async function page() {
  // "(await fetchPolls()).data;"
 const admin =((await  getAdmin()).data)?.toLowerCase()
 const polls:{pollId:number;pollTopic:string;pollCreattionTimestamp:number;Outcome:string;ended:boolean;active:boolean;yesVotes:number;noVotes:number}[] =[
  {pollId:1,pollTopic:"abc",pollCreattionTimestamp:1698819574,Outcome:"Undecided",ended:false,active:true,yesVotes:100,noVotes:40},
  {pollId:2,pollTopic:"ccc",pollCreattionTimestamp:1698646774,Outcome:"Undecided",ended:false,active:true,yesVotes:1,noVotes:40},
  {pollId:3,pollTopic:"abc",pollCreattionTimestamp:1698646770,Outcome:"Yes",ended:true,active:false,yesVotes:100,noVotes:40}


 ] 
  return (
    <section>
      <Main admin={admin!} polls={polls}/>
    </section>
  )
}

export default page