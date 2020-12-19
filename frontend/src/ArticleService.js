import axios from 'axios';

const url = 'http://localhost:5000/api/home';

class ArticleService {
    //Get articles
    static getArticles(){
        return new Promise((resolve, reject) => {
            axios.get(url)
            .then( res => {
                resolve(
                    res.data.map(article => ({
                        ...article
                    }))
                );
            })
            .catch( err => {
                reject(err);
            });
        });
    }

    //Post articles
    /*static insertArticle(parametri){
        return axios.post(url, {
            parametri
        });
    }*/

    //Delete articles
    static deleteArticles(id){
        return axios.delete(`${url}${id}`);
    }
}

export default ArticleService;