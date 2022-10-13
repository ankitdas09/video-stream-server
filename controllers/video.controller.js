import fs from "fs";
export const getAllVideos = (req, res, next) => {
	res.json("all videos");
};

export const getVideo = (req, res, next) => {
	const range = req.headers.range;
	if (!range) {
		return res.status(400).send("Range required!");
	}
	const videoPath = "./uploads/videos/02.mp4";
	const videoSize = fs.statSync(videoPath).size;
	const CHUNKSIZE = 10 ** 6;
	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + CHUNKSIZE, videoSize - 1);
	const contentLength = end - start + 1;
	const headers = {
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	};
	res.writeHead(206, headers);
	const videoStream = fs.createReadStream(videoPath, { start, end });
	videoStream.pipe(res);
};
