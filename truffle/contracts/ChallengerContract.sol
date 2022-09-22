// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./PassCoinContract.sol";

contract ChallengerContract is PassCoinContract{
    struct Challenger {
        // pk
        uint id;
        // 유저,챌린지 fk
        uint userId;
        uint challengeId;

        // 유저 지갑
        address userAddress;

        // 하루 성공횟수 구분을 위한 오늘 날짜 
        string today;

        // 전체 성공횟수, 하루 성공횟수
        uint totalCount;
        uint dailyCount;

        // 실제 예치금
        uint userDeposit;

        // 상금
        uint reward;
    }

    uint challengerSequence=1;
    mapping(uint => Challenger) challengerMap;

    // 유저의 챌린지
    mapping(uint => Challenger[]) findByUserIdChallenger;
    mapping(uint => Challenger[]) findByChallengeIdChallenger;

    
    // 정산하기
    function refund(uint challengerId) public payable{
        Challenger memory challenger=challengerMap[challengerId];
       
        address userAddress=challenger.userAddress;
        payable(userAddress).transfer(challenger.userDeposit+challenger.reward);
    }

    // 패스코인써서 패스 이거랑 erc20에 useCoin 같이 사용
    function usePasscoin(uint challengeId,uint userId,uint challengerId,uint userIdIndex,uint challengeIdIndex) public{
        Challenger memory findChallenger=challengerMap[challengerId];

        findChallenger.totalCount+=1;

        // 챌린저 업데이트
        findByUserIdChallenger[userId][userIdIndex]=findChallenger;
        findByChallengeIdChallenger[challengeId][challengeIdIndex]=findChallenger;
        challengerMap[findChallenger.id]=findChallenger;

        address userAddress=findChallenger.userAddress;
        useCoin(userAddress,1);
    }
    

    // 투표결과반영
    function voteR(uint challengeId,uint userId,uint challengerId,uint userIdIndex,uint challengeIdIndex) public{
 
        Challenger memory findChallenger=challengerMap[challengerId];

        findChallenger.totalCount-=1;

        // 챌린저 업데이트
        findByUserIdChallenger[userId][userIdIndex]=findChallenger;
        findByChallengeIdChallenger[challengeId][challengeIdIndex]=findChallenger;
        challengerMap[findChallenger.id]=findChallenger;
    }
    // 패스코인 지급
    function receivePasscoin(uint[] memory userIdList) public{
        /* 패스코인 지급 로직 */
        for (uint256 i = 0; i < userIdList.length; i++) {
            Challenger memory challenger = findByUserIdChallenger[userIdList[i]][0];             
            transfer(challenger.userAddress, 1);
        }
    }
}
