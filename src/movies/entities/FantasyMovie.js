export default class {
    constructor(id = undefined, userId, name, genreId, runtime, overview,relaeseDt,actorIds) {
      this.id = id;
      this.userId = userId;
      this.name = name;
      this.genreId = genreId;
      this.runtime = runtime;
      this.overview = overview;
      this.relaeseDt = relaeseDt;
      this.actorIds = actorIds;
    }
  }