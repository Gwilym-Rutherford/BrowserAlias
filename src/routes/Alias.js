import express from "express";
import config from "../public/config.json" assert {type: "json"};

export const alias = express.Router();

alias.get("/", (req,res)=>{
    res.render("home");
});


// alias.post("/", (req,res)=>{
//     let query = req.body.query;
    
//     // split query and find first section
//     let tokenized = query.split(" ");
//     let alias = tokenized[0];
//     let searchTerm = tokenized.slice(1).join("+");

//     let match = false;

//     config.aliasInfo.forEach((block)=>{
//         if(block.alias == alias){
//             res.redirect(block.url + searchTerm);
//             match = true;
//             return;
//         }
//         match = false;
//     });

//     if(!match){
//         res.redirect(config.aliasInfo[0].url + encode(query));
//     }
    
// });

