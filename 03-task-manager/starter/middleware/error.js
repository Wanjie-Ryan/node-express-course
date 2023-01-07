const error = (req, res)=>{

    res.status(404).send(
        `
        <div style = 'text-align:center;'>
        
        <h2>Page cannot seem to be found</h2>

        </div>
        

        `
    )
}

module.exports = error