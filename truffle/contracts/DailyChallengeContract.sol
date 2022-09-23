// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./ChallengerContract.sol";

contract DailyChallengeContract is ChallengerContract{
    
    struct DailyChallenge {
        // pk
        uint challengeId;

        // 관심사 fk
        uint interestId;

        // 챌린지 개설자 fk
        uint ownerId;

        string name;
        string desc;

        // 메인이랑 인증샷 예시
        string mainPicURL;
        string goodPicURL;
        string badPicURL;
        
        // 인증 빈도 이걸 전체 인증횟수로 쓰자
        uint authTotalTimes;
        uint authDayTimes;

        // 인증가능시간
        int startTime;
        int endTime;

        // 챌린지 기간
        string startDate;
        string endDate;

        // 모집 인원 (인원 제한없으면 int(-1) 저장 이게 제일 큰값임)
        uint personnel;

        // 예치금 설정
        uint deposit;

        // 전체 예치금
        uint256 totalDeposit;

        // 챌린지 완료 여부
        bool complete;
    }
    uint challengeSequence = 1;
    mapping(uint => DailyChallenge) dailyChallengeMap;
    DailyChallenge[] dailyChallenges;

    // 챌린지 생성
    function createDailyChallenge(DailyChallenge memory dailyChallenge) public payable {
        dailyChallenge.challengeId=challengeSequence;
        dailyChallenge.deposit*=1e18;
        dailyChallenge.totalDeposit*=1e18;
        dailyChallengeMap[challengeSequence++]=dailyChallenge ;
        
        /* 챌린지 생성자 챌린저에 추가 */
        // 챌린저 생성
        Challenger storage challenger=challengerMap[challengerSequence];
        challenger.id=challengerSequence;
        challenger.userId=dailyChallenge.ownerId;
        challenger.challengeId=dailyChallenge.challengeId;
        challenger.userAddress=msg.sender;
        challenger.today=dailyChallenge.startDate;
        challenger.userDeposit=msg.value;

        // 챌린저 유저아이디 검색챌린저에 추가
        findByUserIdChallenger[dailyChallenge.ownerId].push(challenger);
        findByChallengeIdChallenger[dailyChallenge.challengeId].push(challenger);
        challengerSequence++;
    }

    // 일상챌린지 종료
    function endDailyChallenge(uint challengeId) public{
        DailyChallenge storage challenge=dailyChallengeMap[challengeId];
        Challenger[] memory challengers=findByChallengeIdChallenger[challengeId];
        challenge.complete=true;

        uint totalReward=0;
        uint count=0;
        // 챌린저들 성공 퍼센티지에 따라서 전체 상금이랑 벌금을 계산
        for(uint i=0;i<challengers.length;i++){
            uint rate = (challengers[i].totalCount*100)/challenge.authTotalTimes;
            if(challenge.authTotalTimes==challengers[i].totalCount){
                count++;               
            }  
            else if(rate>=80){
                challengers[i].reward=0;
            }
            else if(rate>=40){
                totalReward+=challengers[i].userDeposit-(challenge.deposit*rate)/100;
                challengers[i].userDeposit=(challenge.deposit*rate)/100;
            }
            else{        
                totalReward+=challenge.deposit;
                challengers[i].userDeposit=0;
            }

            findByChallengeIdChallenger[challengeId][i]=challengers[i];
            // challengerMap 업데이트
            challengerMap[challengers[i].id]=challengers[i];
            // findByUserIdChallenger 업데이트
            uint userId=challengers[i].userId;
            for(uint j=0;j<findByUserIdChallenger[userId].length;j++){
                if(findByUserIdChallenger[userId][j].challengeId==challengeId){
                    findByUserIdChallenger[userId][j]=challengers[i];
                    break;
                }
            }
            
        }
        for(uint i=0;i<challengers.length;i++){
            if(challenge.authTotalTimes!=challengers[i].totalCount) continue;
            challengers[i].reward=totalReward/count;  

            findByChallengeIdChallenger[challengeId][i]=challengers[i];

            // challengerMap 업데이트
            challengerMap[challengers[i].id]=challengers[i];

            // findByUserIdChallenger 챌린저 업데이트
            uint userId=challengers[i].userId;
            for(uint j=0;j<findByUserIdChallenger[userId].length;j++){
                if(findByUserIdChallenger[userId][j].challengeId==challengeId){
                    findByUserIdChallenger[userId][j]=challengers[i];
                }
            }
        }
    }
}