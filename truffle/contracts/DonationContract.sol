// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

contract DonationContract{
    struct Donation{
        // 기부처pk
        uint id;

        // 기부처 이름
        string name;

        // 기부처 지갑
        address donationAddress;

        // 기부처 홈페이지
        string donationURL;
    }
    uint donationSequence=1;
    mapping(uint => Donation) donationMap;

     // 기부처 생성
    function addDonation(Donation memory donation) public {
        donation.id=donationSequence;
        donationMap[donationSequence++]=donation;
    }

    // 기부처 목록 반환
    function getAllDonation() public view returns(Donation[] memory) {
        Donation[] memory donationList=new Donation[](donationSequence-1);

        for(uint i=0;i<donationSequence-1;i++){
            donationList[i]=donationMap[i+1];
        }
        return donationList;
    }
}