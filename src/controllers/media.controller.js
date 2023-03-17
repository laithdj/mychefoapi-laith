const fs =require('fs');
const path = require('path');
const httpStatus = require('http-status');
const config = require('./../config/config');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {mediaService} = require('./../services/index');
const { fileTypes } = require('../config/multer');



const uploadMedia = catchAsync(async (req, res) => {
    const { newFileName, originalname, filePath } =req.body;
    const {type } = req.params;
    const {id} = req.query;

    const fullPath = `${filePath}/${newFileName}`

    const {newPath, oldPath} = await mediaService.updateMediaPath(type, id, fullPath, originalname);

    if(oldPath && newPath!==oldPath){
        let absolutePath = path.resolve(`${__dirname}./../../${config.storage.baseUrl}/${oldPath}`);
        if(fs.existsSync(absolutePath)){
            fs.unlinkSync(absolutePath);
        }
    }

    if(!newPath){
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update file path');
    }

    res.status(httpStatus.CREATED).send({ msg:'Media uploaded successfully'});
});


const getProtectedMedia = catchAsync(async (req, res)=>{

    let filePath = await mediaService.getFilePath(fileTypes.courseMaterial, req.params.id);

    let absolutePath = path.resolve(`${__dirname}./../../${config.storage.baseUrl}/${filePath}`);

    if (!filePath || !fs.existsSync(absolutePath)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Media Not found');
    }


    const range = req.headers.range;
    if (!range) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Require range headers');
    }
    const videoSize = fs.statSync(absolutePath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(absolutePath, { start, end });
    videoStream.pipe(res);

});


const getPublicMedia = catchAsync(async (req, res)=>{
    
    let filePath=await  mediaService.getFilePath(req.params.type, req.query.id);

    let absolutePath = path.resolve(`${__dirname}./../../${config.storage.baseUrl}/${filePath}`);
    
    if (!fs.existsSync(absolutePath)){
        throw new ApiError(httpStatus.NOT_FOUND, 'Media Not found')
    }

    res.sendFile(absolutePath)
});


const deleteMedia = catchAsync(async (req, res) => {

    const { type } = req.params;
    const { id } = req.query;

    const { newPath, oldPath } = await mediaService.updateMediaPath(type, id, '', '');

    if (oldPath && newPath !== oldPath) {
        let absolutePath = path.resolve(`${__dirname}./../../${config.storage.baseUrl}/${oldPath}`);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
    }

    if (newPath) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete');
    }

    res.status(httpStatus.NO_CONTENT).send();
});




module.exports = {
    uploadMedia,
    getProtectedMedia,
    getPublicMedia,
    deleteMedia
};
