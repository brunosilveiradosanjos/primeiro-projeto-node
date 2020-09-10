declare namespace Express {
    export interface Request {
        user: {
            id: string;
        }
    }
}

// gatinho para sobrescrever tipos de uma biblioteca que estamos usando na nossa aplicação
// Agora em todas as rotas que estão autenticadas nós poderemos acessar o ID do usuário através de request.user