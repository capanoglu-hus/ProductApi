using StoreWebApi.EFCore;
using System.Diagnostics.CodeAnalysis;

namespace StoreWebApi.Model
{
    public class DbHelper
    {
        private EF_DataContext _context;
        public DbHelper(EF_DataContext context)
        {
            _context = context;
        }

        // GET işlemleri için  
        public List<ProductModel> GetProducts()
        {
            List<ProductModel> response = new List<ProductModel>();
            var dataList = _context.Products.ToList();
            dataList.ForEach(row => response.Add(new ProductModel()
            {
                productId = row.productId,
                name= row.name,
                description= row.description, 
                price= row.price,
                isApproved= row.isApproved,
                category_Id = row.category_Id,
                createdDate= row.createdDate,
                updatedDate= row.updatedDate,
               // createUser_Id= row.createUser_Id,
                //updateUser_Id = row.updateUser_Id,
                status= row.status,
            }));
            return response;

        }


        public ProductModel GetProductById(int productId)
        {
            ProductModel response = new ProductModel();
            var row = _context.Products.Where(d => d.productId.Equals(productId)).FirstOrDefault();
            return new ProductModel()
            {
                productId = row.productId,
                name = row.name,
                description = row.description,
                price = row.price,
                isApproved = row.isApproved,
                //category_Id = row.category_Id,
                createdDate = row.createdDate,
                updatedDate = row.updatedDate,
                //createUser_Id = row.createUser_Id,
               // updateUser_Id = row.updateUser_Id,
                status = row.status,
            };
        }
            

        

        public List<CategoryModel> GetCategorys()
        {
            List<CategoryModel> response = new List<CategoryModel>();
            var dataList = _context.Categorys.ToList();
            dataList.ForEach(row => response.Add(new CategoryModel()
            {
                
                categoryId = row.categoryId,
                name = row.name,
                description= row.description,
                status= row.status,
                createdDate = row.createdDate,
                updatedDate = row.updatedDate,
               // createUser_Id = row.createUser_Id,
                //updateUser_Id = row.updateUser_Id,
            }));
            return response;

        }

        public CategoryModel  GetCategoryById(int categoryId)
        {
            CategoryModel response = new CategoryModel();
            var row = _context.Categorys.Where(d => d.categoryId.Equals(categoryId)).FirstOrDefault();
            return new CategoryModel()
            {

                categoryId = row.categoryId,
                name = row.name,
                description = row.description,
                status = row.status,
                createdDate = row.createdDate,
                updatedDate = row.updatedDate,
                //createUser_Id = row.createUser_Id,
                //updateUser_Id = row.updateUser_Id,
            };

            

        }

        public List<StockModel> GetStocks()
        {
            List<StockModel> response = new List<StockModel>();
            var dataList = _context.Stocks.ToList();
            dataList.ForEach(row => response.Add(new StockModel()
            {

                stockId = row.stockId,
                quantity= row.quantity,
                product_id = row.product_id,
                status = row.status,
                createdDate = row.createdDate,
                updatedDate = row.updatedDate,
                //createUser_Id = row.createUser_Id,
                //updateUser_Id = row.updateUser_Id,
            }));
            return response;

        }

        public StockModel  GetStocksById(int stockId)
        {
            StockModel response = new StockModel();
           
            var row = _context.Stocks.Where(d => d.stockId.Equals(stockId)).FirstOrDefault();
            return new StockModel()
            {

                stockId = row.stockId,
                quantity = row.quantity,
                product_id = row.product_id,
                status = row.status,
                createdDate = row.createdDate,
                updatedDate = row.updatedDate,
               // createUser_Id = row.createUser_Id
                 // updateUser_Id = row.updateUser_Id
            };

        }

        // post put işlemleri için 
        public void SaveProduct(ProductModel productModel)
        {
            Product dbTable = new Product();
            if (productModel.productId > 0) 
            {
                // put işlemi 
                dbTable= _context.Products.Where(d => d.productId.Equals(productModel.productId)).FirstOrDefault();
                if(dbTable != null )
                {
                    dbTable.name = productModel.name;
                    dbTable.description = productModel.description;
                    dbTable.price = productModel.price;
                    dbTable.isApproved  = productModel.isApproved;
                    dbTable.status= productModel.status;
                    dbTable.updatedDate= productModel.updatedDate;
                    // dbTable.updateUser_Id = _context.Users.Where(f => f.userId.Equals(productModel.updateUser_Id)).FirstOrDefault();
                }

                else
                {
                    // POST İŞLEMLERİ 
                    dbTable.productId = productModel.productId;
                    dbTable.name = productModel.name;
                    dbTable.description = productModel.description;
                    dbTable.price = productModel.price;
                    dbTable.isApproved= productModel.isApproved;
                    dbTable.status= productModel.status;
                    dbTable.createdDate = productModel.createdDate;
                   // dbTable.createUser_Id = _context.Users.Where(f => f.userId.Equals(productModel.createUserId)).FirstOrDefault();
                }
                _context.SaveChanges();
            }
        }


        public void SaveCategory(CategoryModel categoryModel)
        {
            Category dbTable = new Category();
            if (categoryModel.categoryId > 0)
            {
                // put işlemi 
                dbTable = _context.Categorys.Where(d => d.categoryId.Equals(categoryModel.categoryId)).FirstOrDefault();
                if (dbTable != null)
                {
                    dbTable.name = categoryModel.name;
                    dbTable.description = categoryModel.description;
                    
                    dbTable.status = categoryModel.status;
                    dbTable.updatedDate = categoryModel.updatedDate;
                  //  dbTable.updateUser_Id = _context.Users.Where(f => f.userId.Equals(categoryModel.updateUser_Id)).FirstOrDefault();
                }

                else
                {
                    // POST İŞLEMLERİ 
                    dbTable.categoryId = categoryModel.categoryId;
                    dbTable.name = categoryModel.name;
                    dbTable.description = categoryModel.description;
                    dbTable.status = categoryModel.status;
                    dbTable.createdDate= categoryModel.createdDate;

                  //  dbTable.createUser_Id = _context.Users.Where(f => f.userId.Equals(categoryModel.createUser_Id)).FirstOrDefault();
                }
                _context.SaveChanges();
            }
        }

        public void SaveStock(StockModel stockModel)
        {
            Stock dbTable = new Stock();
            if (stockModel.stockId > 0)
            {
                // put işlemi 
                dbTable = _context.Stocks.Where(d => d.stockId.Equals(stockModel.stockId)).FirstOrDefault();
                if (dbTable != null)
                {
                    dbTable.quantity= stockModel.quantity;
                    dbTable.status= stockModel.status;
                    dbTable.updatedDate= stockModel.updatedDate;
                    
                    // dbTable.updateUser_Id = _context.Users.Where(f => f.userId.Equals(stockModel.updateUser_Id)).FirstOrDefault();
                }

                else
                {
                    // POST İŞLEMLERİ 
                    dbTable.stockId = stockModel.stockId;
                   // dbTable.product_id = _context.Products.Where(f => f.productId.Equals(stockModel.product_id)).FirstOrDefault();
                    dbTable.quantity = stockModel.quantity;
                    dbTable.status = stockModel.status;
                    dbTable.createdDate= stockModel.createdDate;

                   // dbTable.createUser_Id = _context.Users.Where(f => f.userId.Equals(stockModel.createUser_Id)).FirstOrDefault();
                }
                _context.SaveChanges();
            }
        }
        
        // DELETE işlemleri
        public void DeleteProduct(int productId)
        {
            var product = _context.Products.Where(d=>d.productId.Equals(productId)).FirstOrDefault();
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
        }

        public void DeleteCategory(int categoryId)
        {
            var category = _context.Categorys.Where(d => d.categoryId.Equals(categoryId)).FirstOrDefault();
            if (category != null)
            {
                _context.Categorys.Remove(category);
                _context.SaveChanges();
            }
        }


        public void DeleteStock(int stockId)
        {
            var stock = _context.Stocks.Where(d => d.stockId.Equals(stockId)).FirstOrDefault();
            if (stock != null)
            {
                _context.Stocks.Remove(stock);
                _context.SaveChanges();
            }
        }

    }
}
