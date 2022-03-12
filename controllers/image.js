const Clarifai = require('clarifai');

/* OLD WAY WITHOUT ENVIRONMENT VARS
const app = new Clarifai.App({
    apiKey: 'c39ce9ce23ef4fd5a515b00902c53aaf'
    
    });*/
    
const app = new Clarifai.App({
    apiKey: process.env.CLARIFY_KEY
    
    });
//app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a',this.state.input);
const handleApiCall = (req,res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data =>{
        res.json(data);
    }).catch(err => res.status(400).json('unable to work with API'))
    ;
}


const handleImage = (req,res,db) => {
    console.log("id=",req.body.id);
    const{id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        console.log(entries)
        if(entries.length)
            res.json(entries[0])
        else
            res.status(400).json('Not update')
    })
    .catch(err => res.status(400).json('unable to get entries'))

}

   module.exports = {
    handleImage,
    handleApiCall
   }