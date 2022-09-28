/*
 * 해결되지 않은 문제:
 *   unmined transaction 이 있는데 또 send 하면 거부됨
 *
 * 임시 조치:
 *   충분한 시간(30 초 이상) 간격을 두고 요청
 */

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
 * 일상 챌린지 끝내기
 *
 * Request
 *   /api/enddailychallenge/:challengeId
 *
 * Response
 *   { result: string }
 */
router.get("/enddailychallenge/:challengeId", async (req, res, next) => {
  console.log("==> 일상 챌린지 종료", req.params);

  // const challengeId = req.params.challengeId;

  // test용
  const challengeId = 987654321;
  console.log("[WARNING] challengeId 987654321으로 하드코딩 돼 있음");

  const contract = await getContract("ChallengeContract");

  try {
    const r1 = await contract.methods.endDailyChallenge(challengeId).send({
      from: appAccount.address,
      gasLimit: 3_000_000,
    });

    console.log("<== 일상 챌린지 종료 SUCCESS", r1);

    res.json({ result: "SUCCESS" });
  } catch (e) {
    console.log("<== 일상 챌린지 종료 FAIL", e);

    res.json({ result: "FAIL" });
  }
});

/*
 * 기부 챌린지 끝내기
 *
 * Request
 *   /api/enddonationchallenge/:challengeId
 *
 * Response
 *   { result: string }
 */
router.get("/enddonationchallenge/:challengeId", async (req, res, next) => {
  console.log("==> 기부 챌린지 종료", req.params);

  // const challengeId = req.params.challengeId;

  // test용
  const challengeId = 987654321;
  console.log("[WARNING] challengeId 987654321으로 하드코딩 돼 있음");

  const contract = await getContract("ChallengeContract");

  try {
    const r1 = await contract.methods.endDonationChallenge(challengeId).send({
      from: appAccount.address,
      gasLimit: 3_000_000,
    });

    console.log("<== 기부 챌린지 종료 SUCCESS", r1);

    res.json({ result: "SUCCESS" });
  } catch (e) {
    console.log("<== 기부 챌린지 종료 FAIL", e);

    res.json({ result: "FAIL" });
  }
});

/*
 * 투표 끝내기
 *
 * Request
 *   /api/endvate/:voteId
 *
 * Response
 *   { result: string }
 */
router.get("/endvote/:voteId", async (req, res, next) => {
  console.log("==> 투표 종료", req.params);

  // const voteId = req.params.voteId;

  // test용
  const voteId = 987654321;
  console.log("[WARNING] voteId 987654321로 하드코딩 돼 있음");

  const contract = await getContract("VoteContract");

  try {
    const r1 = await contract.methods.endVote(voteId).send({
      from: appAccount.address,
      gasLimit: 3_000_000,
    });

    console.log("<== 투표 종료 SUCCESS", r1);

    res.json({ result: "SUCCESS" });
  } catch (e) {
    console.log("<== 투표 종료 FAIL", e);

    res.json({ result: "FAIL" });
  }
});

export default router;
