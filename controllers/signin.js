
const handleSignin = (req,res,db,bcrypt) =>{
    /*bcrypt.compare("flocks", '$2a$10$mgtzG.ec8VnJPH/AuB9Tt..EzHSFpqm7BD/ZQ3Ll.EKfdWZPOfty.', function(err, res) {
        console.log('first guess',res)
    });    
    bcrypt.compare("veggies", '$2a$10$mgtzG.ec8VnJPH/AuB9Tt..EzHSFpqm7BD/ZQ3Ll.EKfdWZPOfty.', function(err, res) {
       console.log('second guess',res)
   });    */
       //console.log('signin ...')\
       const {email,password} = req.body;
       if(!email || !password){
           return res.status(400).json('incorrect credentials')
       }
       db.select('email','hash').from('login')
       .where('email', '=', email)
       .then(data => {
           data[0]
           const isValid = bcrypt.compareSync(password,data[0].hash);
           if(isValid){
               db.select('*').from('users')
               .where('email','=',email)
               .then(user =>{
                   res.json(user[0])
               })
               .catch(err => res.status(400).json('unable to get user'))
               
           }
           else
               res.status('400').json('wrong credentials')
       })
       .catch(err => res.status(400).json('wrong credentials'))
   }

   module.exports = {
    handleSignin : handleSignin
   }