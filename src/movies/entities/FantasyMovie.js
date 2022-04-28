export default class {
    constructor(id = undefined, userId, name, genreId, runtime, overview,releaseDt,actorIds) {
      this.id = id;
      this.userId = userId;
      this.name = name;
      this.genreId = genreId;
      this.runtime = runtime;
      this.overview = overview;
      this.releaseDt = releaseDt;
      this.actorIds = actorIds;
    }
  }