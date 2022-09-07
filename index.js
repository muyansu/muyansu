const express = require('express');
const app = express();
const mysql =require('mysql');
const bodyParser =require('body-parser');
const cors =require('cors');
app.use(cors());//解决跨域
app.use(bodyParser.json());//解析参数
app.use(bodyParser.urlencoded({extended:false}));//表单请求
// app.listen(8089,()=>{console.log('服务启动')});

const option ={
    host:'localhost',
    user:'root',
    password:'1001',
    port:'3306',
    database:'test',
    connectTimeout:5000,//连接超时
    multipleStatements:false  //是否允许一个query中包含多条sql语句

}
const conn = mysql.createConnection(option);
var server = app.listen(8089, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

// //登录判断
// app.all('*',(req,res,next)=>{
//     console.log(req.body,'json参数')
//     console.log(req.params,'路径上的参数')
//     console.log(req.query,' ？后面的表单参数')
//     if(!req.query.login){
//         return res.json('未登录')
//     }
//     next();
// })
function Result({code=1,msg='',data={}}){
    this.code=code;
    this.msg=msg;
    this.data=data;
}
// app.get('/',(req,res)=>{
//     res.send('<div style="color:red;">hello world</div> ')//以页面的方式返回去
//     res.json('helloWorld')//以json对象的形式返回去
//     res.download()//以文件的方式返回去，前端请求会下载此文件
// })

// app.get('/',(req,res)=>{
//     // res.send('<div style="color:red;">hello world</div> ')
//     res.json('helloWorld')//
// })
// app.get('/test',(req,res)=>{
//     res.send('<div style="color:red;">hello world</div> ')
//     // res.json('helloWorld')//
// })
// app.post('/first',(req,res)=>{
//     res.json('hello boy')
// })
// app.post('/test',(req,res)=>{
//     return res.json({query:req.query,data:req.params,json:req.body})
// })
app.all('/login',(req,res)=>{
    conn.connect(function(err){
        if(err){
            return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
    });
    conn.query(`SELECT * FROM user_info where id = ${req.query.id} `,(e,r)=>{
        if(r.length==1){
            res.json(new Result({data:r}));
        }else if(r.length>1){
            res.json(new Result({code:0,msg:'用户数据出错'}))
        }else{
            res.json(new Result({code:0,msg:'未查到该用户'}))
        }
        
    })
})