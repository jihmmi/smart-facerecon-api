const handleProfileGet = (req,res,db) =>{
    console.log("id=",req.params.id);
    const{id} = req.params;
    db('users').where({id})
    .then(user => {
        if(user.length)
        {   
            console.log("user array",user);
            console.log("user index 0",user[0]);
            res.json(user[0])
        }
        else
        {
            res.status(400).json('Not Found')
        }
    })
    .catch(err => res.status(400).json('error getting user') );

}

module.exports ={
    handleProfileGet : handleProfileGet
}