const express = require('express')
const router = express.Router()

let character = require('../models/characterModel')
const characters = require('../models/characterModel')

router.get('/',(req,res)=>{
    try {
        res.status(200).json({message:"데이터 가져오기 성공",character})
    } catch (error) {
        res.status(500).json({message:"서버 오류"})
    }
})

router.get('/:id',(req,res)=>{
    try {
        const charId = Number(req.params.id)
        const char = character.find(c=>c.id===charId)
        if(!char){
            return res.status(404).json({message:"게시물을 찾을 수 없음"})
        }
        res.status(200).json({message:"1개 캐릭터 가져오기 성공",char})
    } catch (error) {
        res.status(500).json({message:"서버 오류"})
    }
})

router.post('/',(req,res)=>{
    try {
        const {name,level,isOnline} = req.body

        if(!name || typeof level !== 'number'){
            return res.status(400).json({message:"name과 level은 필수 입니다."})
        }

        const newChar = {
            id: Date.now(),
            name,
            level,
            isOnline: isOnline ?? false 
        }
        characters.push(newChar)
        res.status(200).json({message:"캐릭터 등록 성공",characters})
    } catch (error) {
        res.status(500).json({message:"서버 오류"})
    }
})

router.put('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)
        const index = characters.findIndex(c => c.id == charId)

        if (index === -1) {
            return res.status(404).json({ message: '캐릭터 없음' })
        }
        const { name, level, isOnline } = req.body
        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }
        characters[index] = {
            ...characters[index],
            name,
            level,
            isOnline: isOnline ?? false
        }
        res.status(200).json({ message: '캐릭터 수정 완료', character: characters[index] })
    } catch (error) {

        res.status(500).json({ message: '서버 오류' })
    }
})


router.delete('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)
        const index = characters.findIndex(c => c.id == charId)

        if (index === -1) {
            return res.status(404).json({ message: '캐릭터 없음' })
        }

        characters.splice(index,1)
        res.status(200).json({ message: '캐릭터 삭제 완료', characters })
    } catch (error) {

        res.status(500).json({ message: '서버 오류' })
    }
})

module.exports = router