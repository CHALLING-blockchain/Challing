// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./DailyChallengeContract.sol";
import "./DonationContract.sol";
contract DonationChallengeContract is DailyChallengeContract,DonationContract{

    struct DonationChallenge {
        // pk
        uint challengeId;
        // 관심사 fk
        uint interestId;
        // 챌린지 개설자 fk
        uint ownerId;
        // 기부처 fk
        uint donationId;
        string name;
        string desc;
        
        // 기부금 설정
        uint setDonation;
        // 메인이랑 인증샷 예시
        string mainPicURL;
        string goodPicURL;
        string badPicURL;
        // 인증 빈도
        uint authTotalTimes;
        uint authDayTimes;
        // 인증가능시간
        uint startTime;
        uint endTime;
        // 챌린지 기간
        string startDate;
        string endDate;
        // 모집 인원 (인원 제한없으면 int(-1) 저장 이게 제일 큰값임)
        uint personnel;
        uint256 totalDonation;

        // 챌린지 완료 여부
        bool complete;

        bool success;
    }
    mapping(uint => DonationChallenge) donationChallengeMap;
    DonationChallenge[] donationChallenges;

    function createDonationChallenge(DonationChallenge memory donationChallenge) public payable
    {
        donationChallenge.challengeId=challengeSequence;
        donationChallenge.setDonation=msg.value;
        donationChallenge.totalDonation=msg.value;
        donationChallengeMap[challengeSequence++]=donationChallenge ;
        emit returnChallengeId(donationChallenge.challengeId);
        /* 챌린지 생성자 챌린저에 추가 */
        // 챌린저 생성
        Challenger storage challenger=challengerMap[challengerSequence];
        challenger.id=challengerSequence;
        challenger.userId=donationChallenge.ownerId;
        challenger.challengeId=donationChallenge.challengeId;
        challenger.userAddress=msg.sender;
        challenger.today=donationChallenge.startDate;
        challenger.userDeposit=msg.value;

        // 챌린저 유저아이디 검색챌린저에 추가
        findByUserIdChallenger[donationChallenge.ownerId].push(challenger);
        findByChallengeIdChallenger[donationChallenge.challengeId].push(challenger);
        challengerSequence++;
    }

    // 기부챌린지 종료
    function endDonationChallenge(uint challengeId) public payable{
        DonationChallenge storage challenge=donationChallengeMap[challengeId];
        Challenger[] memory challengers=findByChallengeIdChallenger[challengeId];
        challenge.complete=true;
        uint count=0;
        for(uint i=0;i<challengers.length;i++){
            uint rate=(challengers[i].totalCount*100)/challenge.authTotalTimes;
            if(rate>=80) count++;
        }
        if((count*100)/challengers.length>=80){
            Donation memory donation =donationMap[challenge.donationId];
            challenge.success=true;
            for(uint i=0;i<challengers.length;i++){
                challengers[i].userDeposit=0;
            }
        
            address donationAddress=donation.donationAddress;
            payable(donationAddress).transfer(challenge.totalDonation);
        }

    }
}