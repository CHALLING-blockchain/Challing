// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./PhotoContract.sol";
import "./PassCoinContract.sol";

contract VoteContract is PhotoContract, PassCoinContract{
    struct Vote{
        // 투표pk
        uint id;

        uint challengeId;
        Photo photo;
        // 찬반
        uint pass;
        uint fail;

        // 시작시간
        uint startTimestamp;
        // 투표에 참여한 유저
        uint[] userIdList;
        bool[] userVoteList;
    }
    uint voteSequence = 1;
    mapping(uint => Vote) voteRepository;

    // 챌린지의 투표
    mapping(uint => Vote[]) findByChallengeIdVote;

     // 신고하기
    function report(uint challengeId,uint photoId,uint userId) public{
        Photo memory findPhoto=photoRepository[photoId];
        
        Vote storage vote=voteRepository[voteSequence];
        vote.id=voteSequence++;
        vote.challengeId=challengeId;
        vote.photo=findPhoto;
        vote.startTimestamp=block.timestamp;

        findByChallengeIdVote[challengeId].push(vote);

        voting(userId, challengeId, vote.id, false); // 투표한 사람 자동으로 반대 투표
    }
    // 찬반 투표
    function voting(uint userId,uint challengeId, uint voteId, bool pass) public{
        Vote storage findVote=voteRepository[voteId];

        findVote.userIdList.push(userId);
        if(pass){
            findVote.pass++;
            findVote.userVoteList.push(true);
        }
        else{
            findVote.fail++;
            findVote.userVoteList.push(false);
        }

        uint voteIndex = 0;
        while(findByChallengeIdVote[challengeId][voteIndex].id!=voteId) 
            voteIndex++;
        
        findByChallengeIdVote[challengeId][voteIndex] = findVote;
    }

    // 투표 종료
    function endVote(uint challengeId,uint voteId,uint challengerId) public payable{
        uint voteIndex = 0;
        while(findByChallengeIdVote[challengeId][voteIndex].id!=voteId) 
            voteIndex++;

        Vote memory vote=findByChallengeIdVote[challengeId][voteIndex];

        /* 패스코인 지급 로직 */
        // 노인정일시 챌린저의 토탈 카운트--
        if(vote.pass<vote.fail){
            for (uint256 i = 0; i < vote.userIdList.length; i++) {
                if(!vote.userVoteList[i]){
                    Challenger memory challenger = findByUserIdChallenger[vote.userIdList[i]][0];             
                    transfer(challenger.userAddress, 1);
                }
            }
            //챌린저 업데이트
            uint userId=challengerRepository[challengerId].userId;
            challengerRepository[challengerId].totalCount--;
            
            Challenger[] memory challengersByChallenge=findByChallengeIdChallenger[challengeId];
            Challenger[] memory challengersByUser=findByUserIdChallenger[userId];

            uint userIdIndex=0;
            uint challengeIdIndex=0;
        
            // 챌린저 찾기
            while(challengersByChallenge[challengeIdIndex].userId!=userId) challengeIdIndex++;
            while(challengersByUser[userIdIndex].challengeId!=challengeId) userIdIndex++;

            findByChallengeIdChallenger[challengeId][challengeIdIndex].totalCount--;
            findByUserIdChallenger[userId][userIdIndex].totalCount--;
        }
        else{
            for (uint256 i = 0; i < vote.userIdList.length; i++) {
                if(vote.userVoteList[i]){
                    Challenger memory challenger = findByUserIdChallenger[vote.userIdList[i]][0];
                    transfer(challenger.userAddress, 1);
                }
            }
        }
    }

    function usePasscoin(uint userId,uint challengeId) public{
        
        Challenger[] memory challengersByUser=findByUserIdChallenger[userId];
        Challenger[] memory challengersByChallenge=findByChallengeIdChallenger[challengeId];
        Challenger memory findChallenger;

        uint userIdIndex=0;
        uint challengeIdIndex=0;
        
        // 챌린저 찾기
        while(challengersByChallenge[challengeIdIndex].userId!=userId) challengeIdIndex++;
        while(challengersByUser[userIdIndex].challengeId!=challengeId) userIdIndex++;
        findChallenger=challengersByUser[userIdIndex];

        address userAddress=findChallenger.userAddress;
        useCoin(userAddress,1);

        findChallenger.totalCount+=1;


        // 챌린저 업데이트
        findByUserIdChallenger[userId][userIdIndex]=findChallenger;
        findByChallengeIdChallenger[challengeId][challengeIdIndex]=findChallenger;
        challengerRepository[findChallenger.id]=findChallenger;
    }
    
}