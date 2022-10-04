// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

contract PhotoContract{
    struct Photo {
        uint id;
        uint userId;
        uint challengerId;
        bool report;
        string picURL;
        string timestamp;
    }
    uint photoSequence = 1;
    mapping(uint => Photo) photoMap;

    // 챌린저의 사진
    mapping(uint => Photo[]) findByChallengerIdPhoto;

    // 사진 추가
    function addPhoto(uint challengerId,uint userId,string memory picURL,string memory today) public {
        // challengr에 사진url이랑 사진의 날짜 저장해서 신고하기 당했을 때 사용하기
        Photo storage photo=photoMap[photoSequence];
        photo.id=photoSequence++;
        photo.userId=userId;
        photo.challengerId=challengerId;
        photo.report=false;
        photo.picURL=picURL;
        photo.timestamp=today;
        findByChallengerIdPhoto[challengerId].push(photo);
    }

    function deletePhoto(uint challengerId, uint photoId) public {
        Photo storage photo = photoMap[photoId];
        photo.id = 0;
        photo.userId = 0;
        photo.challengerId = 0;
        photo.report = false;
        photo.picURL = "";
        photo.timestamp = "";

        for(uint i=0; i<findByChallengerIdPhoto[challengerId].length; i++){
            if(findByChallengerIdPhoto[challengerId][i].id == photoId){
                findByChallengerIdPhoto[challengerId][i] = photo;
                break;
            }
        }
    }

    //유저의 사진 조회
    function getChallengerPhoto(uint challengerId) public view returns(Photo[] memory){
        return findByChallengerIdPhoto[challengerId];
    }
}