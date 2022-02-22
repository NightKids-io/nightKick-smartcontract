pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Membership is ERC721Enumerable {
    constructor() ERC721("Membership token", "MM") ERC721Enumerable() {
        for (uint8 i = 0; i < 10; i++) {
            _safeMint(msg.sender, totalSupply());
        }
    }

    function preMint() public {
        for (uint8 i = 0; i < 10; i++) {
            _safeMint(msg.sender, totalSupply());
        }
    }
}
