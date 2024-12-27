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


app.get('/write', (res, req)=>{

});



app.get('/list', (res, req)=>{

});



app.get('/view', (res, req)=>{

});



app.get('/modify', (res, req)=>{

});


app.post('/write', (res, req)=>{

});



app.post('/modify', (res, req)=>{

});


app.listen(3000, ()=>{
    console.log("서버와 연결 되었습니다.");
});