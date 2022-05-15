import mongoose from 'mongoose';
import FantasyMovie from '../../entities/FantasyMovie';
import MovieRepository from '../Repository';

export default class extends MovieRepository {

    constructor() {
        super();
        var imageSchema = new mongoose.Schema({
            fantasymovieid: String,
            img:
            {
                data: Buffer,
                contentType: String
            }
          });

        const fantasymovieSchema = new mongoose.Schema({
            userId: String,
            name: String,
            genreId: String,
            runtime: Number,
            overview: String,
            releaseDt: String,
            actorIds: [Number],
            posterimage: imageSchema
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
        const {id, userId, name, genreId, runtime, overview, releaseDt, actorIds, posterimage } = result;
        return new FantasyMovie(id, userId, name, genreId, runtime, overview, releaseDt, actorIds, posterimage);
    }
    async uploadPoster(posterObj) {

        const result = await this.model.findOne({userId: posterObj.userid});
        if(result == null){
            return [];
        }
        var {id, userId, name, genreId, runtime, overview, releaseDt, actorIds, posterimage } = result;
        posterimage = posterObj;
        await this.model.findByIdAndUpdate(id, { id, userId, name, genreId, runtime, overview,releaseDt,actorIds, posterimage });

        return null;
    }
    async updateFantasyMovie(fantasyMovieEntity) {

        const {userId, name, genreId, runtime, overview, releaseDt, actorIds} = fantasyMovieEntity;
        const result = await this.model.findOne({userId: userId});
        var {id} = result;
        if(result == null){
            return [];
        }
        await this.model.findByIdAndUpdate(id, { id, userId, name, genreId, runtime, overview, releaseDt, actorIds });
        return null;
    }
    async deleteFantasyMovie(userID) {
        const result = await this.model.deleteOne({userId: userID});
        if(result == null){
            return [];
        }
        const {id, userId, name, genreId, runtime, overview, releaseDt, actorIds, posterimage } = result;
        return new FantasyMovie(id, userId, name, genreId, runtime, overview, releaseDt, actorIds, posterimage);
    }
    
}