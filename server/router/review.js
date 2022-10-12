import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Token
import dotenv from 'dotenv'; // .env
dotenv.config(); // .env
const JWT_SECRET = process.env.JWT_SECRET; // .env + Token

import Review from '../model/review.js';
const __dirname = path.resolve(); // import 환경에서는 __dirname을 만들어줘야함

const router = express.Router();
router
    // 리뷰 데이터 요청
    .get('/get', (req, res) => {
        console.log(req.query);

    })

    // 리뷰 데이터 등록
    .post("/writeReview", async (req, res) => {
        console.log(req.body);
        Review.create(req.body).then((result) => {
            return res.status(200).json({ result: true, data: result });
        }).catch((err) => {
            return res.status(400).json({ result: false, message: err });
        })
    })

    //! 사용자 토큰 인증 (이후 라우터는 토큰 필요)
    .use((req, res, next) => {
        console.log("review router 사용자 토큰 인증 실행");
        const authorization = req.get("Authorization");
        if (!authorization || !authorization.startsWith("Bearer")) {
            return res.status(401).json({ result: false, message: "invalid token" });
        }

        const token = authorization.split(/\s/)[1];
        try {
            const payload = jwt.verify(token, JWT_SECRET);
            req.logonId = payload.id; // req.logonId에 토큰 id 입력
            logon = payload.id; // logon 변수에 토큰 id 입력
            console.log("토근 인증 성공!");
        } catch (e) {
            return res.status(401).json({ result: false, message: "unauthorized token" });
        }

        next();
    })


export default router;