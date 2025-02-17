import { ethers } from "ethers";
import   keypair  from "keypair";
import {electionFactoryABI as erc20ABI} from "../utils/constants.js"
import {electionFactoryAddress as address} from "../utils/constants.js"
import {packAsNbytes} from "../utils/utils.ts"

export async function getElections (){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(address,erc20ABI, provider)
    return await erc20.functions.getElections()
}
export async function getElection (id){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(address,erc20ABI, provider)
    return await erc20.functions.getElection(id)
}

export async function getAvailableElections(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(address,erc20ABI, provider)
    const currentTimestamp = Math.floor(Date.now() / 1000)
    return await erc20.functions.getAvailableElections(currentTimestamp)
}

export async function createElection(name,
    startTime,
    duration,
    candidates){
       // var pair = keypair();
        
        /*var publicKey = forge.pki.publicKeyFromPem(pair.public);
        console.log(publicKey)*/
        var modulo =  "0xcc20bbe7f3af9c71b5d3bc23203bdb074e849639c74cfd69770153b820d360f82b1577f44a8450118e8d26b552b0c885bf15a15a8f08f6a5cef4eb03fa8acd5cef9e0d2c9ed00f9c9a3278e0f5bddfa0660f7f98e3c35188a22e74feb8af3f649cb4a50e0c4e5cf507582c02c2dee49d289519375f7e2b98c2f3237efbf5c7d6873dd07994416bc310d77aaa036c4932b98355996a0d53f07a84dd1a28e979a3137fd471741447890917b932f744e140a5530c1e74ff0f653cc98868915616d4c12d86ebf59ee77519dd47291512c6ca1bd1b647f6ade2c6b026704bebfa69192bb62806fa7fa4462ef62e39d58dd8aa0122da84644a283c62df748f7b9ffc37";
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const erc20 = new ethers.Contract(address,erc20ABI, provider.getSigner())
        var publicKey = packAsNbytes("0x010001");

        let election = await erc20.functions.createElection(name,
            publicKey,
            modulo,
            startTime,
            duration,
            candidates)
        
       
        erc20.on("NewElection",(electionAddress,creator,id,name, event) => {
            console.log(electionAddress,creator,id,name)
        }); 
       return election
    }