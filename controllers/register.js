

const handleRegister = (req,res,db,bcrypt) =>{

    const {email,name,password} = req.body;
     /* hashing password
     bcrypt.hash(password, null, null, function(err, hash) {
      // Store hash in your password DB.
         console.log(hash);
     });*/
     if (!email || !name || !password){
        return res.status(400).json('incorrect form submission');         
     }

     const hash = bcrypt.hashSync(password);
    
     db.transaction(trx =>{
         trx.insert({
             hash:hash,
             email
         })
         .into('login')
         .returning('email')
         .then(loginEmail =>{
             return  trx('users')
                     .returning('*')
                     .insert({
                         email:loginEmail[0],
                         name:name,
                         joined: new Date()
                     }).then(user => {
                         res.json(user[0]);
                     }).catch(err => res.status(400).json('unable to register'))
             })
             .then(trx.commit) 
             .catch(trx.rollback)
     })
     .catch(err => res.status(400).json('transaction error'))
 
    
 }

 module.exports = {
     handleRegister : handleRegister
 }