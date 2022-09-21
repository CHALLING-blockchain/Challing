// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

contract ChallengerContract{
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
    mapping(uint => Challenger) challengerRepository;

    // 유저의 챌린지
    mapping(uint => Challenger[]) findByUserIdChallenger;
    mapping(uint => Challenger[]) findByChallengeIdChallenger;

    
    // 정산하기
    function refund(uint challengeId,uint userId) public payable{
        Challenger[] memory challengers= findByUserIdChallenger[userId];
        Challenger memory challenger;
        for(uint i=0;i<challengers.length;i++){
            if(challengers[i].challengeId==challengeId){
                challenger=challengers[i];
                break;
            }
        }
        
        address userAddress=challenger.userAddress;
        payable(userAddress).transfer(challenger.userDeposit+challenger.reward);
    }

}
