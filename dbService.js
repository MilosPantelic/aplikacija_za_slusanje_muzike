const mysql=require("mysql");

let pool;
exports.createConnectionPool=()=>{
    pool  = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : "jumper"
      });
};


exports.register= async(korisnik)=>{
    return await new Promise (function(resolve, reject){
        const values=[[
            korisnik.ime,
            korisnik.sifra

        ]]
        pool.query('INSERT INTO users (username,password) VALUES (?)',values,(err,data)=>{
            if(err)
            {
                reject(err);
            }
            resolve(data);
        })
    });
}

exports.getUsers = async(ime)=>{
    return await new Promise (function(resolve, reject){
        pool.query("SELECT * FROM users WHERE username = ?",ime,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data[0]);
    });})
}
