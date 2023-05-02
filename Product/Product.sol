// SPDX-License-Identifier: GPL-3.0
  
pragma solidity >=0.8.2 <0.9.0;
/**
   * @title ContractName
   * @dev ContractDescription
   * @custom:dev-run-script scripts/deploy_with_ethers.ts
   */
contract Product {
    address public owner ;

      

    constructor() {
        owner = msg.sender;
    } 

    // product nesnesini oluşturduk
    struct Product{
       uint256 ProductId;
       string name ;
       string description ;
       uint256 price ;
       bool isApproved ; 
       uint256 categoryId;
       uint256 status ;
   }

    // key => value gibi 
   mapping(uint256 => Product) public  products ; 
  
  // sadece kont. yazan yapabilir 
   modifier OnlyOwner(){
      require (msg.sender == owner  , "only the owner can ");
      _;
  }
    // Product ekleme 
    function AddProduct(
        uint256 _ProductId , 
        string memory _name ,
        string memory _description ,
        uint256 _price,
        bool _isApproved , 
        uint256 _categoryId,
        uint256 _status  
    ) public  OnlyOwner {
        Product memory product = Product(
            _ProductId,
            _name,
            _description,
            _price,
            _isApproved,
            _categoryId,
            _status
        );

        products[_ProductId] = product;
       
    }

    // belirli alanları güncelleme 
    function setProduct (
        uint256 _ProductId ,
        string memory _name , 
        string memory _description,
        uint256 _price,
        uint256 _status,
        bool _isApproved 
    ) public  OnlyOwner  {
        Product storage updateProduct =  products[_ProductId];
        updateProduct.name = _name;
        updateProduct.description = _description;
        updateProduct.price = _price;
        updateProduct.status = _status ; 
        updateProduct.isApproved = _isApproved;
        products[_ProductId];
    }

    //id'ye göre silme işlemi 
    function deleteProduct(
        uint256 _ProductId 
    ) public OnlyOwner  {
       
        delete products[_ProductId];
    }

       
   }


    
