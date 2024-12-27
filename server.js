const express = require('express')
const nunjucks = require('nunjucks');

const app = express();

const dirPath = `${__dirname}/views/board`;

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,

});

app.use(express.urlencoded({extends: true}));

const boardList = [
    {
      id: 1,
      user_id: 'wnqudgus5565',
      writer: '주병현',
      title: '241230 월별평가',
      content: '열심히 하시는 모습 보기 좋습니다',
      hit: 0,
    },
];


app.get('/write', (req, res)=>{

});



app.get('/list', (req, res)=>{
    res.render('board/list.html',
        {boardList},
    );
});



app.get('/view', (req, res)=>{

});



app.get('/modify/:id', (req, res)=>{
    const { id } = req.params;
    const board = boardList.find(value => value.id === parseInt(id));

    res.render('board/modify.html',
        {board},
    );

    console.log(board);

});


app.post('/write', (req, res)=>{
    
});



app.post('/modify/:id', (req, res)=>{
    const { id } = req.params;
    const {user_id, title, content} = req.body;

    const index = boardList.findIndex(value => value.id === parseInt(id))

    boardList[index].user_id = user_id;
    boardList[index].title = title;
    boardList[index].content = content;

    res.redirect(`/list`)

});


app.listen(3000, ()=>{
    console.log("서버와 연결 되었습니다.");
});