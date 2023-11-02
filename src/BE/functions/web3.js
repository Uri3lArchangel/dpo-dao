import Web3 from "web3"
import dao from '../build/DAO.json'
import erc from '../build/SHT_ABI.json'

const daoAddr = '0xea4Dfd2a95b3D3691FcfA88B42943cE68C287d57'
const ercAddr  = "0xfdA7d5fc54d8e537aC4D97F3e4Cc7045B84aE08B"
let contract=null
let web3instance=null
let contractERC=null

 const ContractInit=async()=>{
const web3 = new Web3(window.ethereum || "https://arb1.arbitrum.io/rpc")
web3instance=web3
const _contract = new web3.eth.Contract(dao.output.abi,daoAddr)
const _contractERC =new web3.eth.Contract(erc.output.abi,ercAddr)
contract = _contract;
contractERC = _contractERC;
}

export const createPool=async(address,topic)=>{
   try{ await ContractInit()
    if(!web3instance || !contract || !address){
        return
    }
    const pollId =await contract.methods.createPoll(topic).send({from:address})
    return {status:'success',msg:"sucessfully openeda poll",data:pollId}
}catch(err){
    return {status:"error",msg:err.message,data:null}
}
}

export const vote=async(address,pollId,vote)=>{
    try{ await ContractInit()
     if(!web3instance || !contract || !address){
         return
     }
     await contractERC.methods.transfer(daoAddr,`${1E18}`).send({from:address})
    await contract.methods.Vote(pollId,vote).send({from:address})

     return {status:'success',msg:`sucessfully voted ${vote?'Yes':'No'}`}
 }catch(err){
     return {status:"error",msg:err.message}
 }
 }


export const unfreezeToken=async(address,pollId)=>{
    try{ await ContractInit()
     if(!web3instance || !contract || !address){
         return
     }
    await contract.methods.unfreezeToken(pollId).send({from:address})
     return {status:'success',msg:`sucessfully voted unfrozen 1 DPO token`}
 }catch(err){
     return {status:"error",msg:err.message}
 }
 }

 export const concludePoll=async(address,pollId)=>{
    try{ await ContractInit()
     if(!web3instance || !contract || !address){
         return
     }
    await contract.methods.concludePoll(pollId).send({from:address})
     return {status:'success',msg:`Poll successfully concluded`}
 }catch(err){
     return {status:"error",msg:err.message}
 }
 }
 

 export const fetchPolls=async()=>{
    try{ await ContractInit()
     if(!web3instance || !contract ){
         return{status:"error",msg:""}
     }
    const polls=await contract.methods.allPolls().call()
     return {status:'success',msg:``,data:polls}
 }catch(err){
     return {status:"error",msg:err.message}
 }
 }
 export const getAdmin=async()=>{
    try{ await ContractInit()
     if(!web3instance || !contract ){
         return{status:"error",msg:""}
     }
    const admin=await contract.methods.admin().call()
     return {status:'success',msg:``,data:admin}
 }catch(err){
     return {status:"error",msg:err.message}
 }
 }
 
 
 
 