//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721A.sol";

contract NightKicks is ERC721A, Ownable, ReentrancyGuard {
    IERC721Enumerable MembershipToken;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public maxSupply;
    bool public sale;
    bool public publicSale;
    string public _tokenURI;
    uint256 membershipPrice = 0.06 ether;
    uint256 publicPrice = 0.08 ether;

    mapping(uint256 => bool) public usedMembershipToken;

    event NftBought(address indexed, uint256 memberShipTokenId);

    constructor(address _tokenAddress) ERC721A("NightKicks", "NK", 10, 5555) {
        MembershipToken = IERC721Enumerable(_tokenAddress);
        maxSupply = 5555;
        _tokenURI = "https://ipfs.io/ipfs/_IPFS_HASH_/";
        sale = false;
        publicSale = false;
    }

    function buyWithMembershipToken(uint256 _count, uint256[] memory tokenId)
        public
        payable
        nonReentrant
    {
        require(
            totalSupply() + _count <= maxSupply,
            "ERROR: max limit reached"
        );
        require(
            _count <= 10 && tokenId.length <= 10,
            "ERROR: max 10 mint per transaction"
        );
        require(_count == tokenId.length, "ERROR: wrong token ID or count");
        require(sale, "ERROR: not on sale");
        require(msg.value >= _count * membershipPrice, "ERROR: wrong price");
        require(
            _count <= MembershipToken.balanceOf(msg.sender),
            "ERROR: not enough MembershipToken"
        );
        for (uint256 i = 0; i < tokenId.length; i++) {
            require(
                msg.sender == MembershipToken.ownerOf(tokenId[i]),
                "ERROR: u don't have this token ID"
            );

            require(
                !usedMembershipToken[tokenId[i]],
                "ERROR: this Membership Token is already used"
            );
        }

        _safeMint(_msgSender(), _count);
        for (uint256 j = 0; j < _count; j++) {
            usedMembershipToken[tokenId[j]] = true;
            emit NftBought(_msgSender(), tokenId[j]);
        }
    }

    function publicMint(uint256 _count) public payable nonReentrant {
        require(
            totalSupply() + _count <= maxSupply,
            "ERROR: max limit reached"
        );
        require(_count <= 10, "ERROR: max 10 mint per transaction");
        require(publicSale, "ERROR: not on sale");
        require(msg.value >= _count * publicPrice, "ERROR: wrong price");

        _safeMint(_msgSender(), _count);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _tokenURI;
    }

    function changeTokenUri(string memory _newUri) public onlyOwner {
        _tokenURI = _newUri;
    }

    function unLockSale() public onlyOwner {
        sale = true;
    }

    function lockSale() public onlyOwner {
        sale = false;
    }

    function unLockPublicSale() public onlyOwner {
        publicSale = true;
    }

    function lockPublicSale() public onlyOwner {
        publicSale = false;
    }
}
