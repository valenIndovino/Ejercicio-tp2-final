const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const {User, Repository} = require("./db/models");


app.get("/repositories", async function(req, res){
    let repos = await Repository.findAll();
    res.send(repos);
});

app.get("/repositories/:id", async function(req, res){
    let repo = await Repository.findByPk(req.params.id);

    if(repo == null){
        res.status(404).json({message:'REPOSITORY_DOESENT_EXIST'});
    } else if(!repo.visibility){
        res.status(403).json({message:'REPOSITORY_PRIVATE'});
    }else{
        res.send(repo);
    }
});

app.post("/repositories", async function(req, res){
    let name = await Repository.findOne({ where: { name: req.body.name } });
    
    if(name == null){
        try{
            await Repository.create({
                name: req.body.name,
                visibility: req.body.visibility,
                userId: req.body.userId,
                slug: (req.body.name).replaceAll(" ", "-")
            })
            res.json({message:'SLUG_CREATED'});
        }catch(err){
            res.status(404).json({message:'REPOSITORY_NOT_CREATED'});
        }
    } else{
        res.status(422).json({message:'REPOSITORY_NAME_REPEATED'});
    }
    
});

app.listen(6001);