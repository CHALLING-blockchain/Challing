// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

contract ChallengeContract {
    struct Challenger {
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

        // 유저 인증 사진 리스트
        string[1000] picURLList;
        string[1000] picTimestamp;

        // 사진 pk
        uint sequence;
    }
    struct DaliyChallenge {
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
        
        // 인증 빈도
        uint authWeekTimes;
        uint authDayTimes;

        // 인증가능시간
        int startTime;
        int endTime;

        // 챌린지 기간
        string startDate;
        string endDate;

        // 모집 인원 (인원 제한없으면 int(-1) 저장 이게 제일 큰값임)
        uint personnel;

        // 예치금 (예치금 고정일 경우 max=0, min에다가 저장)
        uint minDeposit;
        uint maxDeposit;

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
        uint authWeekTimes;
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
    }
    
    uint sequence = 1;
    
    mapping(uint => DaliyChallenge) findByChallengeIdDaliyChallenge;
    mapping(uint => DonationChallenge) findByChallengeIdDonationChallenge;

    // 유저의 챌린지
    mapping(uint => Challenger[]) findByUserIdChallenger;
    mapping(uint => Challenger[]) findByChallengeIdChallenger;


    uint[] dailyChallengeIds;
    uint[] donationChallengeIds;
    DaliyChallenge[] dailyChallenges;
    DonationChallenge[] donationChallenges;

    // 챌린지아이디로 어느 챌린지에 존재하는지 판단
    function isDaliyChallenge(uint challengeId) private view returns(bool){
        return keccak256(abi.encodePacked(findByChallengeIdDaliyChallenge[challengeId].name)) != keccak256(abi.encodePacked(""));
    }

    function isDonationChallenge(uint challengeId) private view returns(bool){
        return keccak256(abi.encodePacked(findByChallengeIdDonationChallenge[challengeId].name)) != keccak256(abi.encodePacked(""));
    }

    // 챌린지 생성
    function createDaliyChallenge(DaliyChallenge memory daliyChallenge)
        public
    {
        daliyChallenge.challengeId=sequence;
        findByChallengeIdDaliyChallenge[sequence++]=daliyChallenge ;
    }
    function createDonationChallenge(DonationChallenge memory donationChallenge)
        public
    {
        donationChallenge.challengeId=sequence;
        findByChallengeIdDonationChallenge[sequence++]=donationChallenge ;
    }

    // 전체 챌린지 조회
    function getAllChallenge() public returns(uint[] memory,uint[] memory,DaliyChallenge[] memory,DonationChallenge[] memory){
        
        for(uint i=0;i<=sequence;i++){
            if(isDaliyChallenge(i)){
                dailyChallengeIds.push(i);
                dailyChallenges.push(findByChallengeIdDaliyChallenge[i]);
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
        string[1000] memory urlList;
        string[1000] memory timestampList;
        Challenger memory challenger=Challenger(
            {
                userId:userId,
                challengeId:challengeId,
                userAddress:msg.sender,
                today:today,
                totalCount:0,
                dailyCount:0,
                userDeposit:msg.value,
                reward:0,
                picURLList:urlList,
                picTimestamp:timestampList,
                sequence:0
            });

        // 챌린지 아이디로 일상챌린지인지 기부챌린지인지 판단 후 유저 추가
        if(isDaliyChallenge(challengeId)){
            DaliyChallenge storage challenge=findByChallengeIdDaliyChallenge[challengeId];
            challenge.totalDeposit+=msg.value; 
        }

        else if(isDonationChallenge(challengeId)){
            DonationChallenge storage challenge=findByChallengeIdDonationChallenge[challengeId];
            challenge.totalDonation+=msg.value;
        }

        // 챌린저들 저장소
        findByUserIdChallenger[userId].push(challenger);
        findByChallengeIdChallenger[challengeId].push(challenger);
    }

    // 유저의 챌린지 조회
    function getMyChallenge(uint userId) public view returns(uint[] memory,uint[] memory){
        // 내가 생성한 챌린지
        uint[] memory challengesByMe=new uint[](sequence);
        
        // 전체 챌린지를 순회하면서 챌린지의 ownerId와 userId가 같을 경우 추가
        for(uint challengeId=0;challengeId<sequence;challengeId++){
            if((isDaliyChallenge(challengeId) && findByChallengeIdDaliyChallenge[challengeId].ownerId==userId) ||
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
    function authenticate(uint challengeId,uint userId, string memory today,string memory picURL) public{
        Challenger[] memory challengers=findByUserIdChallenger[userId];
        Challenger memory findChallenger;

        uint authDayTimes;
        if(isDaliyChallenge(challengeId)) authDayTimes=findByChallengeIdDaliyChallenge[challengeId].authDayTimes;
        else if(isDonationChallenge(challengeId)) authDayTimes=findByChallengeIdDonationChallenge[challengeId].authDayTimes;
        
        // 챌린저 찾기
        for(uint index=0;index<challengers.length;index++){
            if(challengers[index].challengeId==challengeId){
                findChallenger=challengers[index];
                break;
            }
        }
        // 다른날짜라면 하루 인증횟수 초기화
        if(keccak256(abi.encodePacked(findChallenger.today)) != keccak256(abi.encodePacked(today))){
            findChallenger.dailyCount=0;
        }
        findChallenger.dailyCount+=1;

        // 하루인증을 다했다면 전체인증 카운트
        if(authDayTimes==findChallenger.dailyCount){
            findChallenger.totalCount+=1;
            findChallenger.dailyCount=0;
        }

        // challengr에 사진url이랑 사진의 날짜 저장해서 신고하기 당했을 때 사용하기
        findChallenger.picURLList[findChallenger.sequence]=picURL;
        findChallenger.picTimestamp[findChallenger.sequence++]=today;
    }
}
