const express = require("express");
const router = express.Router();

// 메모리 데이터
let books = [
    { id: 1, title: "javascript", auther: "김**" },
    { id: 2, title: "html", auther: "김**" },
    { id: 3, title: "css", auther: "김**" },
];

let initId = 4
const findIndexId = (idParams) => { 
    return books.findIndex(p => p.id == Number(idParams)) 
}

router.post('/', (req, res) => {
    try {
        const { title, auther } = req.body

        if (typeof title !== 'string' || auther.trim() == '' ||
            typeof auther !== 'string' || auther.trim() == '') {
            return res.status(400).json({ message: "비워있지 않은 문자열 이어야 합니다" })
        }

        const newBooks = {
            id: initId++,
            title: title,
            auther: auther
        }
        books.push(newBooks)
        res.status(200).json({ message: "책 등록 완료", books })
    } catch (error) {
        console.error("책 등록중 오류", error)
        res.status(500).json({ message: "서버오류" })
    }
})

router.get('/books', (req, res) => {
    try {
        res.status(201).json({ message: "사용자 조회 완료", books })
    } catch (error) {
        console.error("게시글 불러오기 중 오류", error)
        res.status(500).json({ message: "서버오류" })
    }
})

router.get('/books/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)
        const index = findIndexId(bookId)
        console.log(index)
        if(index === -1){
            return res.status(404).json({message:"책 없음"})
        }
        res.status(200).json({ message: "책 조회 완료", book: books[index] })
    } catch (error) {
        console.error("책 불러오기 중 오류", error)
        res.status(500).json({ message: "서버오류" })
    }
})


module.exports = router