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
    mapping(uint => Donation) donationRepository;

     // 기부처 생성
    function addDonation(Donation memory donation) public {
        donation.id=donationSequence;
        donationRepository[donationSequence++]=donation;
    }

    // 기부처 목록 반환
    function getAllDonation() public view returns(uint[] memory,Donation[] memory) {
        uint[] memory donationIds=new uint[](donationSequence);
        Donation[] memory donationList=new Donation[](donationSequence);

        for(uint i=1;i<=donationSequence;i++){
            donationIds[i]=i;
            donationList[i]=donationRepository[i];
        }
        return (donationIds,donationList);
    }
}