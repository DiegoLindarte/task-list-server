/* function validarMetodos (req, res, next) {
    
    const metodos = ["GET", "POST", "PUT", "DELETE"];

    if (!metodos.includes(req.method)) {
        
        return res.status(400).json(
            {
                error: "Metodo no valido"
            }
        );

    };

    next();
    
};

module.exports = {

    validarMetodos,

}; */

