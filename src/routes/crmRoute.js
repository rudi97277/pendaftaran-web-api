import {addPost, commentPost, followUser, getPost, getUsers, reactPost, register, login, findUser} from "../controllers/crmController"
import auth from "../middlewares/authJWT";
require('express-group-routes');
const routes = (app) => {
    app.group("/user", (router) => {
        router.use(auth)
        router.get("", getUsers); 
        router.get("/:userId", findUser); 
    });

    app.route('/register')
    .post(register);

    app.route('/login')
    .post(login);


    app.route('/post')
    .get(getPost)
    .post(addPost);

    app.route('/post/:postId/react')
    .post(reactPost);

    app.route('/post/:postId/comment')
    .post(commentPost);
}

export default routes;