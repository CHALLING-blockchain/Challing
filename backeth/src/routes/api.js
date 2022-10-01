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

  // 찐
  const challengeId = Number.parseInt(req.params.challengeId);
  console.log("challengeId:", challengeId);

  if (Number.isNaN(challengeId) || challengeId < 0) {
    console.log("<== 일상 챌린지 종료 FAIL", "Illegal argument:", challengeId);

    res.json({ result: "FAIL" });
    return;
  }

  // test용
  // const challengeId = 987654321;
  // console.log("[WARNING] challengeId 987654321 로 하드코딩 돼 있음");

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

  // 찐
  const challengeId = Number.parseInt(req.params.challengeId);
  console.log("challengeId:", challengeId);

  if (Number.isNaN(challengeId) || challengeId < 0) {
    console.log("<== 기부 챌린지 종료 FAIL", "Illegal argument:", challengeId);

    res.json({ result: "FAIL" });
    return;
  }

  // test용
  // const challengeId = 987654321;
  // console.log("[WARNING] challengeId 987654321 로 하드코딩 돼 있음");

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
 *   body {
 *     voteId: long,
 *     challengeId: long,
 *     userId: long,
 *     challengerId: long,
 *     userIdIndex: long,
 *     challengeIdIndex: long
 *   }
 *
 * vuint challengeId,uint userId,uint challengerId,uint userIdIndex,uint challengeIdIndex
 *
 * Response
 *   { result: string }
 */
router.post("/endvote", async (req, res, next) => {
  console.log("==> 투표 종료", req.body);

  const {
    voteId,
    challengeId,
    userId,
    challengerId,
    userIdIndex,
    challengeIdIndex,
  } = req.body;

  const voteContract = await getContract("VoteContract");
  const challengeContract = await getContract("ChallengeContract");

  try {
    const r1 = await voteContract.methods.endVote(voteId).call({
      from: appAccount.address,
      gasLimit: 3_000_000,
    });

    console.log("r1:", r1);

    if (!r1["0"]) {
      const r2 = await challengeContract.methods
        .applyVoteResult(
          challengeId,
          userId,
          challengerId,
          userIdIndex,
          challengeIdIndex
        )
        .send({
          from: appAccount.address,
          gasLimit: 3_000_000,
        });

      console.log("r2:", r2);
    }

    const r3 = await challengeContract.methods
      .receivePasscoin(r1["1"], challengeId)
      .send({
        from: appAccount.address,
        gasLimit: 3_000_000,
      });

    console.log("r3:", r3);

    console.log("<== 투표 종료 SUCCESS");

    res.json({ result: "SUCCESS" });
  } catch (e) {
    console.log("<== 투표 종료 FAIL", e);

    res.json({ result: "FAIL" });
  }
});

export default router;
