// SPDX-License-Identifier: GPL-3.0
  
pragma solidity >=0.8.2 <0.9.0;
/**
   * @title ContractName
   * @dev ContractDescription
   * @custom:dev-run-script scripts/deploy_with_ethers.ts
   */
contract Product {
    address payable public owner ;

      

    constructor() {
        owner = payable(msg.sender);
    } 

    // product nesnesini oluşturduk
    struct Product{
       uint256 productId;
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
    function addProduct(
        uint256 _productId , 
        string memory _name ,
        string memory _description ,
        uint256 _price,
        bool _isApproved , 
        uint256 _categoryId,
        uint256 _status  
    ) public  OnlyOwner {
        Product memory product = Product(
            _productId,
            _name,
            _description,
            _price,
            _isApproved,
            _categoryId,
            _status
        );

        products[_productId] = product;
       
    }

    // belirli alanları güncelleme 
    function setProduct (
        uint256 _productId ,
        string memory _name , 
        string memory _description,
        uint256 _price,
        uint256 _status,
        bool _isApproved 
    ) public  OnlyOwner  {
        Product storage updateProduct =  products[_productId];
        updateProduct.name = _name;
        updateProduct.description = _description;
        updateProduct.price = _price;
        updateProduct.status = _status ; 
        updateProduct.isApproved = _isApproved;
        products[_productId];
    }

    //id'ye göre silme işlemi 
    function deleteProduct(
        uint256 _productId 
    ) public OnlyOwner  {
       
        delete products[_productId];
    }
    
       receive() external payable {
        // kont. dışından ödeme yapabilir
    }
    
    //satın alma 
    function buyProduct(uint256 _productId) public payable {
        Product memory product = products[_productId];

        require(msg.value >= product.price);
        require(product.status >  0 ); 
        products[_productId].status = product.status - 1 ; // satış yapıldığında status 1 eksilmeli 
    }

    // eth çekme 
    function withdrawTips() public payable{
        require(owner.send(address(this).balance));  // sadece kont. yazan eth çekebilir
       
    }
    
       
   }


    
