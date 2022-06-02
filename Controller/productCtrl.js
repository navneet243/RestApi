const products = require("../Model/productModel");
const csvtojson = require("csvtojson")

const productController = {
    uploadProduct: async(req,res) => {
        //csv file data to be inserted
        const filename = "products.csv";

        var array= [];
        csvtojson()
            .fromFile(filename)
            .then(csvData => {
                for(var i=0;i<csvData.length;i++){
                    var oneRow= {
                        name: csvData[i]["name"],
                        description: csvData[i]["description"],
                        quantity: csvData[i]["quantity"],
                        price: csvData[i]["price"],
                        _createdBy: req.user.id,
                    };
                    array.push(oneRow);
                }
                console.log(csvData);
                products.insertMany(array).then(function(){
                    console.log("Data inserted");
                    //res.json(array);
                    res.json({msg: "success"});
                }).catch(function (error) {
                    console.log(error);     
                });
            });
    },

    //getting products list with name only
    getProducts: async( req,res) => {
        try{
            const productlist= await products.find({},{name:1,_id:0});
            res.json(productlist);
        } catch (err){
            return res.status(500).json({msg: err.message});
        }
    },
}

module.exports = productController;
