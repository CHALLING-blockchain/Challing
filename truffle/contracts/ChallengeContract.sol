// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./DonationChallengeContract.sol";

contract ChallengeContract is DonationChallengeContract{
    uint[] dailyChallengeIds;
    uint[] donationChallengeIds;

    // 챌린지아이디로 어느 챌린지에 존재하는지 판단
    function isDailyChallenge(uint challengeId) private view returns(bool){
        return keccak256(abi.encodePacked(dailyChallengeMap[challengeId].name)) != keccak256(abi.encodePacked(""));
    }

    function isDonationChallenge(uint challengeId) private view returns(bool){
        return keccak256(abi.encodePacked(donationChallengeMap[challengeId].name)) != keccak256(abi.encodePacked(""));
    }

    // 전체 챌린지 조회
    function getAllChallenge() public returns(uint[] memory,uint[] memory,DailyChallenge[] memory,DonationChallenge[] memory){
        
        for(uint i=1;i<=challengeSequence;i++){
            if(isDailyChallenge(i)){
                dailyChallengeIds.push(i);
                dailyChallenges.push(dailyChallengeMap[i]);
            }

            else if(isDonationChallenge(i)){
                donationChallengeIds.push(i);
                donationChallenges.push(donationChallengeMap[i]);
            }
        }
        return (dailyChallengeIds,donationChallengeIds,dailyChallenges,donationChallenges);
    }

    // 유저가 챌린지에 참가
    function joinChallenge(uint challengeId,uint userId,string memory today) public payable{
    
        // 챌린저 생성
        Challenger storage challenger=challengerMap[challengerSequence];
        challenger.id=challengerSequence;
        challenger.userId=userId;
        challenger.challengeId=challengeId;
        challenger.userAddress=msg.sender;
        challenger.today=today;
        challenger.userDeposit=msg.value;

        // 챌린저 유저아이디 검색챌린저에 추가
        findByUserIdChallenger[userId].push(challenger);
        findByChallengeIdChallenger[challengeId].push(challenger);
        challengerSequence++;

        // 챌린지 아이디로 일상챌린지인지 기부챌린지인지 판단 후 유저 추가
        if(isDailyChallenge(challengeId)){
            DailyChallenge storage challenge=dailyChallengeMap[challengeId];
            challenge.totalDeposit+=msg.value; 
        }

        else if(isDonationChallenge(challengeId)){
            DonationChallenge storage challenge=donationChallengeMap[challengeId];
            challenge.totalDonation+=msg.value;
        }
    }

    // 유저의 챌린지 조회
    function getMyChallenge(uint userId) public view returns(uint[] memory,uint[] memory){
        Challenger[] memory challengers=findByUserIdChallenger[userId];
        // 내가 생성한 챌린지
        uint[] memory challengesByMe=new uint[](challengers.length);
        
        uint myChallengeIndex = 0;
        // 전체 챌린지를 순회하면서 챌린지의 ownerId와 userId가 같을 경우 추가
        for(uint challengeId=0;challengeId<challengeSequence;challengeId++){
            if((isDailyChallenge(challengeId) && dailyChallengeMap[challengeId].ownerId==userId) ||
            (isDonationChallenge(challengeId) && donationChallengeMap[challengeId].ownerId==userId)){
                challengesByMe[myChallengeIndex++] = challengeId;
            }
        }

        // 내가 참가한 챌린지
        uint[] memory myChallenges=new uint[](challengers.length);
        for(uint index=0;index<challengers.length;index++){
            myChallenges[index]=challengers[index].challengeId;
        }
        return(challengesByMe,myChallenges);
    }

    // 챌린저 아이디 찾기(챌린저아이디,유저인덱스,챌린지인덱스)
    function findingChallenger(uint challengeId,uint userId)public view returns(uint,uint,uint){       
        uint userIdIndex=0;
        uint challengeIdIndex=0;
        // 챌린저 찾기
        while(findByChallengeIdChallenger[challengeId].length>challengeIdIndex&&
            findByChallengeIdChallenger[challengeId][challengeIdIndex].userId!=userId) challengeIdIndex++;
        while(findByUserIdChallenger[userId].length>userIdIndex&&
        findByUserIdChallenger[userId][userIdIndex].challengeId!=challengeId) userIdIndex++;
        
        return(findByUserIdChallenger[userId][userIdIndex].id,userIdIndex,challengeIdIndex);
    }
    function checkChallenger(uint challengeId,uint userId)public view returns(bool){       
        for(uint challengeIdIndex=0;challengeIdIndex<findByChallengeIdChallenger[challengeId].length;challengeIdIndex++){
            if(findByChallengeIdChallenger[challengeId][challengeIdIndex].userId==userId) return true;
        }
        return false;
    }

    // 사진으로 유저 챌린지 인증
    function authenticate(uint challengeId,uint userId, uint challengerId,uint userIdIndex,uint challengeIdIndex, string memory today) public {
        Challenger memory findChallenger=challengerMap[challengerId];
        
        uint authDayTimes;
        if(isDailyChallenge(challengeId)) authDayTimes=dailyChallengeMap[challengeId].authDayTimes;
        else if(isDonationChallenge(challengeId)) authDayTimes=donationChallengeMap[challengeId].authDayTimes;
        
        // 다른날짜라면 하루 인증횟수 초기화
        if(keccak256(abi.encodePacked(findChallenger.today)) != keccak256(abi.encodePacked(today))){
            findChallenger.dailyCount=0;
            findChallenger.today=today;
        }
        findChallenger.dailyCount+=1;
        findChallenger.totalCount+=1;
        
        // 챌린저 업데이트
        findByUserIdChallenger[userId][userIdIndex]=findChallenger;
        findByChallengeIdChallenger[challengeId][challengeIdIndex]=findChallenger;
        challengerMap[findChallenger.id]=findChallenger;
    }
    
    // 챌린지 참여 챌린저들 리스트 반환 
    function getChallengers(uint challengeId) public view returns(Challenger[] memory){
        return(findByChallengeIdChallenger[challengeId]);
    }

    // 유저의 챌린저들 리스트 반환 
    function getChallengersByUserId(uint userId) public view returns(Challenger[] memory){
        return(findByUserIdChallenger[userId]);
    }
}
