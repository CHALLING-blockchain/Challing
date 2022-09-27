import { Router } from "express";
import Web3 from "web3";
import config from "../util/config.js";
import artifacts from "../util/artifacts.js";

const router = Router();

const web3 = new Web3(new Web3.providers.HttpProvider(config.ENDPOINT));
const appAccount = web3.eth.accounts.privateKeyToAccount(config.PRIVATE_KEY);
web3.eth.accounts.wallet.add(appAccount);

const getContract = async (cname) => {
  try {
    const artifact = artifacts[cname];
    const networkId = await web3.eth.net.getId();
    const { abi } = artifact;
    const address = artifact.networks[networkId].address;
    return new web3.eth.Contract(abi, address);
  } catch (e) {
    console.log(e);
    console.log(`${cname} 컨트랙트를 ${config.ENDPOINT}에 배포했는지 확인`);
  }
};

/*
 * 챌린지 끝내기
 *
 * Request
 *   /api/endchallenge/:challengeId
 *
 * Response
 *   { result: string }
 */
router.get("/endchallenge/:challengeId", async (req, res, next) => {
  console.log(req.params);

  const challengeId = req.params.challengeId;

  const contract = await getContract("ChallengeContract");

  res.json({ result: "DONE" });
});

/*
 * 투표 끝내기
 *
 * Request
 *   /api/endvate
 *   body: {
 *     challengeId: string,
 *     voteId: string,
 *     challengerId: string
 *   }
 *
 * Response
 *   { result: string }
 */
router.post("/endvote", async (req, res, next) => {
  console.log(req.body);

  const challengeId = req.body.challengeId;
  const voteId = req.body.voteId;
  const challengerId = req.body.challengerId;

  const contract = await getContract("VoteContract");

  res.json({ result: "DONE" });
});

export default router;
