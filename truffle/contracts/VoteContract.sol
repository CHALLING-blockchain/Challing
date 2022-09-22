// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./PhotoContract.sol";

contract VoteContract is PhotoContract{
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
    mapping(uint => Vote) voteMap;

    // 챌린지의 투표
    mapping(uint => Vote[]) findByChallengeIdVote;

     // 신고하기
    function report(uint challengeId,uint photoId,uint userId) public{
        Photo memory findPhoto=photoMap[photoId];
        
        Vote storage vote=voteMap[voteSequence];
        vote.id=voteSequence++;
        vote.challengeId=challengeId;
        vote.photo=findPhoto;
        vote.startTimestamp=block.timestamp;

        findByChallengeIdVote[challengeId].push(vote);

        voting(userId, challengeId, vote.id, false); // 투표한 사람 자동으로 반대 투표
    }
    // 찬반 투표
    function voting(uint challengeId,uint userId, uint voteId, bool pass) public{
        Vote storage findVote=voteMap[voteId];

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
    function endVote(uint voteId) public view returns(bool,uint[] memory){
        Vote memory vote=voteMap[voteId];

        // 결과 맞춘 유저 찾기
        uint[] memory userIdList=new uint[](vote.userIdList.length);
        uint count=0;
        for (uint256 i = 0; i < vote.userIdList.length; i++) {
            if(vote.pass>vote.fail&&vote.userVoteList[i]){
                userIdList[count++]=vote.userIdList[i];             
            }
            else if (vote.pass<vote.fail&&!vote.userVoteList[i]){
                userIdList[count++]=vote.userIdList[i];   
            }
        }

        // 투표결과와 맞춘 유저 아이디 반환
        return (vote.pass>vote.fail,userIdList);
    }

    // 챌린지 아이디로 투표리스트 조회
    function getChallengeVote(uint challengeId)public view returns(Vote[] memory){
        return findByChallengeIdVote[challengeId];
    }
}