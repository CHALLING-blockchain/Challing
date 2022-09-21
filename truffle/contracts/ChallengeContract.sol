// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./VoteContract.sol";
import "./DonationContract.sol";

contract ChallengeContract is VoteContract,DonationContract{
    
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
        uint setDonaion;
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
    
    uint challengeSequence = 1;
    
    mapping(uint => DailyChallenge) findByChallengeIdDailyChallenge;
    mapping(uint => DonationChallenge) findByChallengeIdDonationChallenge;

    uint[] dailyChallengeIds;
    uint[] donationChallengeIds;
    DailyChallenge[] dailyChallenges;
    DonationChallenge[] donationChallenges;

    // 챌린지아이디로 어느 챌린지에 존재하는지 판단
    function isDailyChallenge(uint challengeId) private view returns(bool){
        return keccak256(abi.encodePacked(findByChallengeIdDailyChallenge[challengeId].name)) != keccak256(abi.encodePacked(""));
    }

    function isDonationChallenge(uint challengeId) private view returns(bool){
        return keccak256(abi.encodePacked(findByChallengeIdDonationChallenge[challengeId].name)) != keccak256(abi.encodePacked(""));
    }

    // 챌린지 생성
    function createDailyChallenge(DailyChallenge memory dailyChallenge) public payable {
        dailyChallenge.challengeId=challengeSequence;
        dailyChallenge.deposit*=1e18;
        dailyChallenge.totalDeposit*=1e18;
        findByChallengeIdDailyChallenge[challengeSequence++]=dailyChallenge ;
        
        /* 챌린지 생성자 챌린저에 추가 */
        // 챌린저 생성
        Challenger storage challenger=challengerRepository[challengerSequence];
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

    function createDonationChallenge(DonationChallenge memory donationChallenge) public payable
    {
        donationChallenge.challengeId=challengeSequence;
        donationChallenge.setDonaion*=1e18;
        donationChallenge.totalDonation*=1e18;
        findByChallengeIdDonationChallenge[challengeSequence++]=donationChallenge ;

        /* 챌린지 생성자 챌린저에 추가 */
        // 챌린저 생성
        Challenger storage challenger=challengerRepository[challengerSequence];
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

    // 전체 챌린지 조회
    function getAllChallenge() public returns(uint[] memory,uint[] memory,DailyChallenge[] memory,DonationChallenge[] memory){
        
        for(uint i=1;i<=challengeSequence;i++){
            if(isDailyChallenge(i)){
                dailyChallengeIds.push(i);
                dailyChallenges.push(findByChallengeIdDailyChallenge[i]);
            }

            else if(isDonationChallenge(i)){
                donationChallengeIds.push(i);
                donationChallenges.push(findByChallengeIdDonationChallenge[i]);
            }
        }
        return (dailyChallengeIds,donationChallengeIds,dailyChallenges,donationChallenges);
    }

    // 유저가 챌린지에 참가
    function joinChallenge(uint challengeId,uint userId,string memory today) public payable{
    
        // 챌린저 생성
        Challenger storage challenger=challengerRepository[challengerSequence];
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
            DailyChallenge storage challenge=findByChallengeIdDailyChallenge[challengeId];
            challenge.totalDeposit+=msg.value; 
        }

        else if(isDonationChallenge(challengeId)){
            DonationChallenge storage challenge=findByChallengeIdDonationChallenge[challengeId];
            challenge.totalDonation+=msg.value;
        }
    }

    // 유저의 챌린지 조회
    function getMyChallenge(uint userId) public view returns(uint[] memory,uint[] memory){
        // 내가 생성한 챌린지
        uint[] memory challengesByMe=new uint[](challengeSequence);
        
        // 전체 챌린지를 순회하면서 챌린지의 ownerId와 userId가 같을 경우 추가
        for(uint challengeId=0;challengeId<challengeSequence;challengeId++){
            if((isDailyChallenge(challengeId) && findByChallengeIdDailyChallenge[challengeId].ownerId==userId) ||
            (isDonationChallenge(challengeId) && findByChallengeIdDonationChallenge[challengeId].ownerId==userId)){
                challengesByMe[challengeId]=challengeId;
            }
        }

        Challenger[] memory challengers=findByUserIdChallenger[userId];

        // 내가 참가한 챌린지
        uint[] memory myChallenges=new uint[](challengers.length);
        for(uint index=0;index<challengers.length;index++){
            myChallenges[index]=challengers[index].challengeId;
        }
        return(challengesByMe,myChallenges);
    }

   
     // 사진으로 유저 챌린지 인증
    function authenticate(uint challengeId,uint userId, string memory today,string memory picURL) public {
        Challenger[] memory challengersByUser=findByUserIdChallenger[userId];
        Challenger[] memory challengersByChallenge=findByChallengeIdChallenger[challengeId];
        Challenger memory findChallenger;

        uint userIdIndex=0;
        uint challengeIdIndex=0;
        
        // 챌린저 찾기
        while(challengersByChallenge[challengeIdIndex].userId!=userId) challengeIdIndex++;
        while(challengersByUser[userIdIndex].challengeId!=challengeId) userIdIndex++;
        findChallenger=challengersByUser[userIdIndex];
        

        uint authDayTimes;
        if(isDailyChallenge(challengeId)) authDayTimes=findByChallengeIdDailyChallenge[challengeId].authDayTimes;
        else if(isDonationChallenge(challengeId)) authDayTimes=findByChallengeIdDonationChallenge[challengeId].authDayTimes;
        
        // 다른날짜라면 하루 인증횟수 초기화
        if(keccak256(abi.encodePacked(findChallenger.today)) != keccak256(abi.encodePacked(today))){
            findChallenger.dailyCount=0;
            findChallenger.today=today;
        }
        findChallenger.dailyCount+=1;
        findChallenger.totalCount+=1;

        // 하루인증횟수 초과시 예외
        // require(authDayTimes<findChallenger.dailyCount,"One day authentication exceeded");
    
        // challengr에 사진url이랑 사진의 날짜 저장해서 신고하기 당했을 때 사용하기
        Photo storage photo=photoRepository[photoSequence];
        photo.id=photoSequence++;
        photo.userId=userId;
        photo.challengerId=findChallenger.id;
        photo.picURL=picURL;
        photo.timestamp=today;

        findByChallengerIdPhoto[findChallenger.id].push(photo);
        
        
        // 챌린저 업데이트
        findByUserIdChallenger[userId][userIdIndex]=findChallenger;
        findByChallengeIdChallenger[challengeId][challengeIdIndex]=findChallenger;
        challengerRepository[findChallenger.id]=findChallenger;
    }
    
    

    // 일상챌린지 종료
    function endDailyChallenge(uint challengeId) public{
        DailyChallenge storage challenge=findByChallengeIdDailyChallenge[challengeId];
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
            // challengerRepository 업데이트
            challengerRepository[challengers[i].id]=challengers[i];
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

            // challengerRepository 업데이트
            challengerRepository[challengers[i].id]=challengers[i];

            // findByUserIdChallenger 챌린저 업데이트
            uint userId=challengers[i].userId;
            for(uint j=0;j<findByUserIdChallenger[userId].length;j++){
                if(findByUserIdChallenger[userId][j].challengeId==challengeId){
                    findByUserIdChallenger[userId][j]=challengers[i];
                }
            }
        }
    }

    
    // 기부챌린지 종료
    function endDonationChallenge(uint challengeId) public payable{
        DonationChallenge storage challenge=findByChallengeIdDonationChallenge[challengeId];
        Challenger[] memory challengers=findByChallengeIdChallenger[challengeId];
        challenge.complete=true;
        uint count=0;
        for(uint i=0;i<challengers.length;i++){
            uint rate=(challengers[i].totalCount*100)/challenge.authTotalTimes;
            if(rate>=80) count++;
        }
        if((count*100)/challengers.length>=80){
            Donation memory donation =donationRepository[challenge.donationId];
            challenge.success=true;
            for(uint i=0;i<challengers.length;i++){
                challengers[i].userDeposit=0;
            }
        
            address donationAddress=donation.donationAddress;
            payable(donationAddress).transfer(challenge.totalDonation);
        }

    }

    // 챌린지 디테일 
    function getChallengeDetail(uint challengeId) public view returns(Challenger[] memory,Photo[] memory,Vote[] memory){
        Challenger[] memory challengers=findByChallengeIdChallenger[challengeId];
        Photo[] memory photoList = new Photo[](photoSequence-1);

        uint photoCount=0;
        for(uint i=0;i<challengers.length;i++){
            Challenger memory challenger=challengers[i];
            Photo[] memory photo=findByChallengerIdPhoto[challenger.id];
            for(uint j=0;j<photo.length;j++){
                photoList[photoCount++] = photo[j];
            }
        }
        
        return(challengers,photoList,findByChallengeIdVote[challengeId]);
    }
}
