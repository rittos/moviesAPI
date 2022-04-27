import mongoose from 'mongoose';
import MovieRepository from '../Repository';

export default class extends MovieRepository {

    constructor() {
        super();
        const fantasymovieSchema = new mongoose.Schema({
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
        const {name, genreId, runtime, overview, releaseDt, actorIds} = fantasyMovieEntity;
        const result = new this.model({name, genreId, runtime, overview,releaseDt,actorIds});
        await result.save();
        fantasyMovieEntity.id=result.id;
        return fantasyMovieEntity;
    }
}