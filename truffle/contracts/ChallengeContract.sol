// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
pragma abicoder v2;

contract ChallengeContract {
    struct Challenger {
        // 유저,챌린지 fk
        uint256 userId;
        uint256 challengeId;

        // 유저 지갑
        address userAddress;
        // 성공횟수
        uint256 count;
        // 실제 예치금
        uint256 userDeposit;

        // 유저 인증 사진 리스트
        string[] picURLList;
    }
    struct DaliyChallenge {
        // pk
        uint256 challengeId;

        // 관심사 fk
        uint256 interestId;

        // 챌린지 개설자 fk
        uint256 ownerId;

        string name;
        string desc;

        // 메인이랑 인증샷 예시
        string mainPicURL;
        string goodPicURL;
        string badPicURL;
        
        // 인증 빈도
        uint256 authWeekTimes;
        uint256 authDayTimes;

        // 인증가능시간
        uint256 startTime;
        uint256 endTime;

        // 챌린지 기간
        string startDate;
        string endDate;

        // 모집 인원 (인원 제한없으면 uint256(-1) 저장 이게 제일 큰값임)
        uint256 personnel;

        // 예치금 (예치금 고정일 경우 max=0, min에다가 저장)
        uint256 minDeposit;
        uint256 maxDeposit;

        // 전체 예치금
        uint256 totalDeposit;

        // 챌린지 참가 유저들
        uint256[] userId;
        // 유저 지갑
        address[] userAddress;
        // 성공횟수
        uint256[] count;

        // 챌린지 완료 여부
        bool complet;
    }
    struct DonationChallenge {
        // pk
        uint256 challengeId;
        // 관심사 fk
        uint256 interestId;
        // 챌린지 개설자 fk
        uint256 ownerId;
        // 기부처 fk
        uint256 donationId;
        string name;
        string desc;
        
        // 기부금 설정
        uint256 setDonaion;
        // 메인이랑 인증샷 예시
        string mainPicURL;
        string goodPicURL;
        string badPicURL;
        // 인증 빈도
        uint256 authWeekTimes;
        uint256 authDayTimes;
        // 인증가능시간
        uint256 startTime;
        uint256 endTime;
        // 챌린지 기간
        string startDate;
        string endDate;
        // 모집 인원 (인원 제한없으면 uint256(-1) 저장 이게 제일 큰값임)
        uint256 personnel;
        uint256 totalDonation;

        // 챌린지 참가 유저들
        uint256[] userId;
        // 유저 지갑
        address[] userAddress;
        // 성공횟수
        uint256[] count;
        // 실제 예치금
        uint256[] userDeposit;

        // 챌린지 완료 여부
        bool complet;
    }
    
    uint256 sequence = 0;
    
    mapping(uint => DaliyChallenge) daliyChallengeRepository;
    mapping(uint => DonationChallenge) donationChallengeRepository;
    mapping(uint => Challenger[]) challengerRepository;

    uint[] dailyChallengeIds;
    uint[] donationChallengeIds;
    DaliyChallenge[] dailyChallenges;
    DonationChallenge[] donationChallenges;

    // 챌린지아이디로 어느 챌린지에 존재하는지 판단
    function isDaliyChallenge(uint challengeId) private view returns(bool){
        return keccak256(abi.encodePacked(daliyChallengeRepository[challengeId].name)) != keccak256(abi.encodePacked(""));
    }

    function isDonationChallenge(uint challengeId) private view returns(bool){
        return keccak256(abi.encodePacked(donationChallengeRepository[challengeId].name)) != keccak256(abi.encodePacked(""));
    }

    // 챌린지 생성
    function createDaliyChallenge(DaliyChallenge memory daliyChallenge)
        public
    {
        daliyChallenge.challengeId=sequence;
        daliyChallengeRepository[sequence++]=daliyChallenge ;
    }
    function createDonationChallenge(DonationChallenge memory donationChallenge)
        public
    {
        donationChallenge.challengeId=sequence;
        donationChallengeRepository[sequence++]=donationChallenge ;
    }

    // 전체 챌린지 조회
    function getAllChallenge() public returns(uint[] memory,uint[] memory,DaliyChallenge[] memory,DonationChallenge[] memory){
        
        for(uint i=0;i<=sequence;i++){
            if(isDaliyChallenge(i)){
                dailyChallengeIds.push(i);
                dailyChallenges.push(daliyChallengeRepository[i]);
            }

            else if(isDonationChallenge(i)){
                donationChallengeIds.push(i);
                donationChallenges.push(donationChallengeRepository[i]);
            }
        }
        return (dailyChallengeIds,donationChallengeIds,dailyChallenges,donationChallenges);
    }

    // 유저가 챌린지에 참가
    function joinChallenge(uint challengeId,uint userId) public payable{
        string[] memory urlList;
        Challenger memory challenger=Challenger(userId,challengeId,msg.sender,0,msg.value,urlList);

        // 챌린지 아이디로 일상챌린지인지 기부챌린지인지 판단 후 유저 추가
        if(isDaliyChallenge(challengeId)){
            DaliyChallenge storage challenge=daliyChallengeRepository[challengeId];
            challengerRepository[userId].push(challenger);
            challenge.totalDeposit+=msg.value;

            challenge.userId.push(userId);
            challenge.userAddress.push(msg.sender);
            challenge.count.push(0);
        }

        else if(isDonationChallenge(challengeId)){
            DonationChallenge storage challenge=donationChallengeRepository[challengeId];
            challengerRepository[userId].push(challenger);
            challenge.totalDonation+=msg.value;

            challenge.userId.push(userId);
            challenge.userAddress.push(msg.sender);
            challenge.count.push(0);
            challenge.userDeposit.push(msg.value);
        }
    }


   
}
