import randomstring from "randomstring";
import media_model from "./AdminMediaModel.js";

class MediaController {
    async createMedia (req, res) {
        try {
            const file = req.files.file;
            let name = randomstring.generate({
                length: 11,
            });
            let extension = file.name.split(".");
            extension = extension[extension.length - 1];
            name = `${name}.${extension}`;
            let mimetype = file.mimetype.split("/")[0];
            let path = `./Admin/Media/uploads/${mimetype}/${name}`;


            const upload = await file.mv(path);

            path = path.substring(1);

            const media = {
                name,
                extension,
                mimetype,
                path,
                size: file.size
            };

            const result = await media_model.insertMedia(media);

            if (!result) return res.status(500).send({ message: "Something Went wrong" });
            return res.status(200).send({ Message: "Success" ,data:result});
        } catch (error) {
            console.log(error);
            return res.status(500).send({ Message: "Internal server error" });
        }
    }

    async getmedia (req, res) {
        try {
            const data = await media_model.getMedia();
            if (!data) {
                return res.status(500).send({ message: "Something went wrong" });
            }
            return res.status(200).send({ message: "Success", data });
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" });
        }
    }
}

const media_controller = new MediaController();
export default media_controller;
