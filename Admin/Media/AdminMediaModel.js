import mongoose from "mongoose";

class MediaModel {
    constructor() {
        this.schema = new mongoose.Schema({
            name: { type: String, required: true },
            extension: { type: String, required: true },
            path: { type: String, required: true },
            mimetype: { type: String, required: true },
            size: { type: Number, required: true },
            purpose: { type: Number, default: null },
        }, { timestamps: true });
        this.mediaTbl = mongoose.model("tbl_medias", this.schema);
    }

    insertMedia (mediaDetails) {
        return this.mediaTbl.create(mediaDetails);
    }

    getMedia () {
        return this.mediaTbl.find({ $or: [{ mimetype: "image" }, { mimetype: "video" }] }, { name: true, mimetype: true, size: true, url: { $concat: ["http://localhost:5000", "$path"] } });
    }

}

const media_model = new MediaModel();
export default media_model
