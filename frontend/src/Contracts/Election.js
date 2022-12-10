import { ethers } from "ethers";
import erc20ABI from "../utils/constants/electionABI"
import contractAddress from "../utils/constants/electionAddress"
import { getElection } from "./ElectionFactory";
import {generateBallot, signBallot,packAsNbytes} from "../scripts/tavs"

async function sendVote(electionId, candidate){

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let erc20 = new ethers.Contract(contractAddress,erc20ABI, provider)
    let election = await getElection(electionId)
    
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
    invHex
  );
    

}