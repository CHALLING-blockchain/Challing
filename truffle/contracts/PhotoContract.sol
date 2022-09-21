// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./ChallengerContract.sol";

contract PhotoContract is ChallengerContract{
    struct Photo {
        uint id;
        uint userId;
        uint challengerId;

        string picURL;
        string timestamp;
    }
    uint photoSequence = 1;
    mapping(uint => Photo) photoRepository;

    // 챌린저의 사진
    mapping(uint => Photo[]) findByChallengerIdPhoto;

    // 유저의 사진 조회
    function getMyAllPhoto(uint userId) public view returns(Photo[] memory){
        Challenger[] memory challengers=findByUserIdChallenger[userId];
        
        uint photoCount=0;
        for(uint i=0;i<challengers.length;i++){
            Challenger memory challenger=challengers[i];
            Photo[] memory photo=findByChallengerIdPhoto[challenger.id];
            photoCount += photo.length;
        }

        uint photoIndex = 0;
        Photo[] memory photoList = new Photo[](photoCount);
        for(uint i=0;i<challengers.length;i++){
            Challenger memory challenger=challengers[i];
            Photo[] memory photo=findByChallengerIdPhoto[challenger.id];
            for (uint256 j = 0; j < photo.length; j++) {
                photoList[photoIndex++] = photo[j];
            }
        }

        return photoList;
    }
}