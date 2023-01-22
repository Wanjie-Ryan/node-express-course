const login  = async(req, res) =>{

    res.send('Sample login/Register')
}



// dashboard is where we will share our authorized data

const dashboard = async (req, res)=>{

    const token = Math.floor(Math.random() * 100)

    res.status(200).json({msg:`Hello Ryan`, secret: `Your authorized data and lucky number is ${token}`})
}


module.exports = {login, dashboard}