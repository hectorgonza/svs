import { ethers } from "ethers";
import {  keypair } from "keypair";
import {forge} from "node-forge"
import erc20ABI from "../utils/constants/electionFactoryABI"
import address from "../utils/constants/electionFactoryAddress"
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
//Change parameters
export async function createElection(name,
    publicKey,
    modulo,
    startTime,
    duration,
    candidates){
        var pair = keypair();
        var publicKey = forge.pki.publicKeyFromPem(pair.public);
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const erc20 = new ethers.Contract(address,erc20ABI, provider)
        let election = await erc20.functions.createElection(name,
            publicKey,
            modulo,
            startTime,
            duration,
            candidates)
        erc20.on("NewElection",(electionAddress,creator,id,name, event) => {
            console.log(electionAddress,creator,id,name)
        }); 
       
    }