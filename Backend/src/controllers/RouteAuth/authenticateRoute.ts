import { Request, Response } from "express";
// import { IUser } from "../../@types/models";

// interface CustomRequest extends Request {
//     user?: IUser
// }

const authenticateRoute = (req: Request, res: Response) => {

    // const user = req.user as IUser;

    // if (!user) {

    //     console.log(user);

    //     return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    // }

    res.status(200).json({ mensagem: 'Usuário autenticado' });
};

export { authenticateRoute };