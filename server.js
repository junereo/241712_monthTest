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
    res.sendFile(dirPath + "/write.html");
});


app.get('/list', (req, res)=>{
    res.render('board/list.html',
        {boardList},
    );
});

app.get('/view/:id', (req, res)=>{
    const { id } = req.params;
    const board = boardList.find(value => value.id === parseInt(id));
    board.hit += 1;
    res.render('board/view.html',
        {board},
    );
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
    const {user_id, title, content} = req.body;

    let index = 0;
    if(boardList.length > 0){
        index = boardList.at(-1).id;
    }

    boardList.push(
        {
            id: index + 1,
            user_id: user_id,
            writer: user_id,
            title: title,
            content: content,
            hit: 0,
        }
    )

    res.redirect('/list');
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

app.post('/delete/:id', (req, res)=>{
    const { id } = req.params;

    const index = boardList.findIndex(value => value.id === parseInt(id))

    if(index === -1){
        throw Error("삭제 하려는 게시글이 없습니다.");
    }

    boardList.splice(index,1);

    res.redirect(`/list`)
});


//에러 발생 지점 체크
app.use((err, req, res, next) =>{
    console.log(err.url);
    res.redirect(`/list`)
})

app.listen(3000, ()=>{
    console.log("서버와 연결 되었습니다.");
});