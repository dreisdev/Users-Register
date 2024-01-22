import { config } from 'dotenv';

const configDotenv = (): void => {
    const result = config();

    if (result.error) {
        console.error(result.error);
        throw new Error('Erro ao carregar as variáveis de ambiente do Dotenv');
    }
};

export default configDotenv;
