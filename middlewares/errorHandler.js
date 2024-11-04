// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro para monitoramento

    const statusCode = err.statusCode || 500; // Define o status do erro, ou 500 se não especificado
    const message = err.message || "Erro interno do servidor";

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

module.exports = errorHandler;
