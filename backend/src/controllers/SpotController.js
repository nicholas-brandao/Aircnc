const Spot = require("../models/Spot");
const User = require("../models/User");

async function ValidaUsuario(user_id, res) {
    
    const user = await User.findById(user_id);
    
    if(!user)
        throw new Error(`Usuário '${ user_id }' não encontrado!`);
}

module.exports = {
    async store(req, res) {

        const { user_id } = req.headers;
        ValidaUsuario(user_id, res)
        .then(async r => {             
        
            let filename;

            filename = req.file ? req.file.filename : null;
            const { company, techs, price } = req.body;
            
            const spot = await Spot.create({
                user: user_id,
                thumbnail: filename,
                company,
                price,
                techs: techs.split(",").map(tech => tech.trim())
            });        
            
            return res.json(spot);
        })
        .catch(r => {
            return res.status(400).json({messageErro: r.message});
        });
    },
    async update(req, res){
        
        const { user_id } = req.headers;
        ValidaUsuario(user_id, res)
        .then(async r => {           
        
            let filename;

            filename = req.file ? req.file.filename : req.body.thumbnail;
            const { spot_id} = req.params;
            const { company, techs, price } = req.body;

            await Spot.updateOne({_id: spot_id}, 
            {
                _id: spot_id,
                user: user_id,
                thumbnail: filename,
                company,
                price,
                techs: techs.split(",").map(tech => tech.trim())
            },
            {"new": true})
            .then(r => {
                return res.status(200).json({message: "Spot atualizado com sucesso!"});
                }
            )
            .catch(e => {
                return res.status(500).json({messageErro: e.message});
            });
        })
        .catch(r => {
            return res.status(400).json({messageErro: r.message});
        });   
  
    },
    async index(req, res){
        return res.json(await Spot.find({ techs: req.query.tech }));
    },
    async indexFindById(req, res){
        return res.json(await Spot.findById({ _id: req.params.spot_id}));
    },
    async destroy(req, res){
        const { user_id } = req.headers;
        ValidaUsuario(user_id, res)
        .then(async r => {
            await Spot.deleteOne({_id: req.params.spot_id})
            .then(r => {
                return res.status(200).json({message: "Spot excluído com sucesso!"});
            })
            .catch(e => {
                return res.status(500).json({messageErro: e.message});
            });
        })
        .catch(r => {
            return res.status(400).json({messageErro: r.message});
        });
    }
};