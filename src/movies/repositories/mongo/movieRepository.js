import mongoose from 'mongoose';
import FantasyMovie from '../../entities/FantasyMovie';
import MovieRepository from '../Repository';

export default class extends MovieRepository {

    constructor() {
        super();
        const fantasymovieSchema = new mongoose.Schema({
            userId: String,
            name: String,
            genreId: String,
            runtime: Number,
            overview: String,
            releaseDt: String,
            actorIds: [Number]
        });
        this.model = mongoose.model('FantasyMovie', fantasymovieSchema);
    }

    async persist(fantasyMovieEntity) {
        const {userId, name, genreId, runtime, overview, releaseDt, actorIds} = fantasyMovieEntity;
        const result = new this.model({userId, name, genreId, runtime, overview,releaseDt,actorIds});
        await result.save();
        fantasyMovieEntity.id=result.id;
        return fantasyMovieEntity;
    }
    async get(userID) {
        const result = await this.model.findOne({userId: userID});
        if(result == null){
            return [];
        }
        const {id, userId, name, genreId, runtime, overview, releaseDt, actorIds } = result;
        return new FantasyMovie(id, userId, name, genreId, runtime, overview, releaseDt, actorIds);
    }
}