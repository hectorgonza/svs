import { ethers } from "ethers";
import erc20ABI from "../utils/constants/electionABI"
import contractAddress from "../utils/constants/electionAddress"
import { getElection } from "./ElectionFactory";
import generateRandomBallot from "../scripts/tavs"
async function sendVote(electionId){

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let erc20 = new ethers.Contract(contractAddress,erc20ABI, provider)
    let election = await getElection(electionId)
    // candidates = 
    const [ballot, mask, inv_mask, hash, vote] = await generateRandomBallot(
        //candidates
      );
    
   
    

}