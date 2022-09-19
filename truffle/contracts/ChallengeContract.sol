// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

contract ChallengeContract {
    struct Donation{
        // 기부처pk
        uint id;

        // 기부챌린지fk
        uint challengeId;

        // 기부처 이름
        string name;

        // 기부처 지갑
        address donationAddress;

        // 기부처 홈페이지
        string donationURL;
    }
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
    }

    struct Photo {
        uint id;
        uint userId;
        uint challengerId;

        string picURL;
        string timestamp;
    }


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
    uint voteSequence = 1;
    uint photoSequence = 1;
    uint challengerSequence=1;
    
    mapping(uint => DailyChallenge) findByChallengeIdDailyChallenge;
    mapping(uint => DonationChallenge) findByChallengeIdDonationChallenge;
    mapping(uint => Vote) voteRepository;
    mapping(uint => Photo) photoRepository;
    mapping(uint => Challenger) challengerRepository;
    mapping(uint => Donation) donationRepository;

    // 유저의 챌린지
    mapping(uint => Challenger[]) findByUserIdChallenger;
    mapping(uint => Challenger[]) findByChallengeIdChallenger;

    // 챌린저의 사진
    mapping(uint => Photo[]) findByChallengerIdPhoto;

    // 챌린지의 투표
    mapping(uint => Vote[]) findByChallengeIdVote;

    
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

    function createDonationChallenge(DonationChallenge memory donationChallenge)
        public
    {
        donationChallenge.challengeId=challengeSequence;
        donationChallenge.setDonaion*=1e18;
        findByChallengeIdDonationChallenge[challengeSequence++]=donationChallenge ;
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

    // 유저의 사진 조회
    function getMyAllPhoto(uint userId) public view returns(Photo[] memory){
        Challenger[] memory challengers=findByUserIdChallenger[userId];

        Photo[] memory photoList;

        uint photoCount=0;
        for(uint i=0;i<challengers.length;i++){
            Challenger memory challenger=challengers[i];
            Photo[] memory photo=findByChallengerIdPhoto[challenger.id];
            for(uint j=0;j<photo.length;i++){
                photoList[photoCount++]=photo[j];
            }
        }

        return photoList;
    }


    // 사진으로 유저 챌린지 인증
    function authenticate(uint challengeId,uint userId, string memory today,string memory picURL) public {
        Challenger[] memory challengersByUser=findByUserIdChallenger[userId];
        Challenger[] memory challengersByChallenge=findByChallengeIdChallenger[challengeId];
        Challenger memory findChallenger;

        uint authDayTimes;
        uint userIdIndex=0;
        uint challengeIdIndex=0;
        if(isDailyChallenge(challengeId)) authDayTimes=findByChallengeIdDailyChallenge[challengeId].authDayTimes;
        else if(isDonationChallenge(challengeId)) authDayTimes=findByChallengeIdDonationChallenge[challengeId].authDayTimes;
        
        // 챌린저 찾기
        for(userIdIndex;userIdIndex<challengersByUser.length;userIdIndex++){
            if(challengersByUser[userIdIndex].challengeId==challengeId){
                findChallenger=challengersByUser[userIdIndex];
                break;
            }
        }
        for(challengeIdIndex;challengeIdIndex<challengersByChallenge.length;challengeIdIndex++){
            if(challengersByChallenge[challengeIdIndex].userId==userId){
                break;
            }
        }
        
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
        
        findByUserIdChallenger[userId][userIdIndex]=findChallenger;
        findByChallengeIdChallenger[challengeId][challengeIdIndex]=findChallenger;
        challengerRepository[findChallenger.id]=findChallenger;
    }

    // 신고하기
    function report(uint challengeId,uint photoId) public{
        Photo memory findPhoto=photoRepository[photoId];
        
        Vote memory vote=voteRepository[voteSequence];
        vote.id=voteSequence++;
        vote.challengeId=challengeId;
        vote.photo=findPhoto;
        vote.startTimestamp=block.timestamp;

        findByChallengeIdVote[challengeId].push(vote);

    }
 
    
    // 찬반 투표
    function voting(uint userId,uint challengeId, uint voteId, bool pass) public{
        Vote storage findVote=voteRepository[voteId];
        if(pass) findVote.pass++;
        else findVote.fail++;

        findVote.userIdList.push(userId);
        findByChallengeIdVote[challengeId][voteId]=findVote;
    }

    // 투표 종료
    function endVote(uint challengeId,uint voteId,uint challengerId) public {
        Vote memory vote=findByChallengeIdVote[challengeId][voteId];

        // 노인정일시 챌린저의 토탈 카운트--
        if(vote.pass<vote.fail) challengerRepository[challengerId].totalCount--;

        // 패스코인 지급 로직

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

    // 정산하기
    function refund(uint challengeId,uint userId)public payable{
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

            address donationAddress=donation.donationAddress;
            payable(donationAddress).transfer(challenge.totalDonation);
        }
    }


    // 챌린지 디테일 
    function getChallengeDetail(uint challengeId) public view returns(Challenger[] memory,Photo[] memory,Vote[] memory){
        Challenger[] memory challengers=findByChallengeIdChallenger[challengeId];
        Photo[] memory photoList;

        // uint photoCount=0;
        // for(uint i=0;i<challengers.length;i++){
        //     Challenger memory challenger=challengers[i];
        //     Photo[] memory photo=findByChallengerIdPhoto[challenger.id];
        //     for(uint j=0;j<photo.length;i++){
        //         photoList[photoCount++]=photo[j];
        //     }
        // }
        
        return(challengers,photoList,findByChallengeIdVote[challengeId]);
    }
}
