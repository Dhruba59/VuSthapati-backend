// const { default: axios } = require('axios')
// const { File } = require('buffer')
// const express = require('express')
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

// const app = express()

// app.post('/upload/photos', upload.array('photos', 12), async function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
//     console.log('photos', req.files)

//     const uploads = Array.from(req.files).map(async (file) => {
//         console.log('photos', req.files)
//         const formData = new FormData();
//         formData.append("image", file);

//         try {
//             const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
//                 params: {
//                     key: process.env.NEXT_PUBLIC_IMGBB_API_KEY, // Use public env var on client
//                 },
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             return response.data.data.url; // Returns uploaded image URL
//         } catch (error) {
//             console.log(error);
//         }

//     });

//     const imageUrls = await Promise.all(uploads);
//     return imageUrls;
// })

import fs from "fs"
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // or configure storage as needed
const express = require('express')

const router = express.Router();

