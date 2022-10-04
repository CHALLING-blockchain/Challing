// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract PassCoinContract is IERC20 {

    string public constant name = "PassCoin"; // 토큰명
    string public constant symbol = "PASS"; // 토큰의 단축약어
    uint8 public constant decimals = 0; // 소수점 단위

    address owner;
    // 주소와 각 주소가 보유한 토큰량
    mapping(address => uint256) balances;

    // 주소 A의 토큰을 주소 B가 대리 사용 가능하며 이때 사용 가능한 토큰량을 저장
    mapping(address => mapping (address => uint256)) allowed;

    // 전체 발행된 토큰량
    uint256 totalSupply_ = 100000000; 

    constructor() {
        balances[msg.sender] = totalSupply_;
        owner=msg.sender;
    }

    // 발행된 총 토큰의 개수를 리턴함
    function totalSupply() public override view returns (uint256) {
        return totalSupply_;
    }

    // tokenOwner가 가진 계좌 잔고를 리턴함
    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    // receiver 주소로 numTokens 만큼의 이더를 전송함
    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    // delegate가 인출할 수 있는 한도를 지정함 (리턴 : 성공-실패 여부)
    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    // owner가 delegate에게 인출을 허락한 토큰의 개수
    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    // owner 주소에서 buyer 주소로 numTokens 만큼의 이더를 전송함
    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }

    function useCoin(address user, uint256 numTokens) public {
        require(numTokens <= balances[owner]);
        balances[owner] = balances[owner]+numTokens;
        balances[user] = balances[user]-numTokens;
    }
}
