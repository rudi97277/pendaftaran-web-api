import {addPost, commentPost, followUser, getPost, getUsers, reactPost, register, login} from "../controllers/crmController"
import auth from "../middlewares/authJWT";
const routes = (app) => {
    app.route('/user')
    .get(auth, getUsers);

    app.route('/register')
    .post(register);

    app.route('/login')
    .post(login);


    app.route('/user/:userId/follow')
    .post(followUser);

    app.route('/post')
    .get(getPost)
    .post(addPost);

    app.route('/post/:postId/react')
    .post(reactPost);

    app.route('/post/:postId/comment')
    .post(commentPost);
}

export default routes;