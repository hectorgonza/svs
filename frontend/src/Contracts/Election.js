import { ethers } from "ethers";
import {electionABI as erc20ABI} from "../utils/constants"
import {generateBallot, signBallot,packAsNbytes} from "../utils/utils.ts"


export async function getCandidates (address){
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const erc20 = new ethers.Contract(address,erc20ABI, provider)
  return await erc20.functions.getCandidates()
}

export async function sendVote(address, candidate){

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider.getCode(address))
    let erc20 = new ethers.Contract(address,erc20ABI, provider.getSigner())
   
    
    const [ballot, mask, inv_mask, hash, vote] = await generateBallot(
         candidate
      );
      const signedBallot = await signBallot(ballot);
    let signedBallotBytes = signedBallot.toString(16);
    if (signedBallotBytes.length % 2 !== 0)
      signedBallotBytes = "0" + signedBallotBytes;

    signedBallotBytes = packAsNbytes(signedBallotBytes);
    const maskHex = packAsNbytes(mask.toString(16));
    const invHex = packAsNbytes(inv_mask.toString(16));
    
    
    await erc20.functions.sendVote(signedBallotBytes,
    maskHex,
    invHex/* /* ,  {
      gasLimit: 1000000,
   
    } */
  ); 

 
 
  
   erc20.on("NewVote",(add, hash,candidate) => {  
    console.log(add, hash,candidate)
})

 
}