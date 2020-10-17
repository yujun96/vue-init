const {promisify} = require('util') // 将异步函数转换为Promise形式
const figlet = promisify(require('figlet')) // 将字符串转换为颜文字
const chalk = require('chalk') // 将命令行改变颜色
const open = require('open') // 自动打开浏览器

const {clone,spawn} = require('./download')   
// 定义一个输出绿色文字的log方法
const log = text => console.log(chalk.green(text))

module.exports = async name => {
    // 1.将文本转换为颜文字
    const text = await figlet('Welcome')
    // 3.输出欢迎文本
    log(text)
    log(`🎁创建项目：${name}`)
    //  下载项目
    await clone(`github:yujun96/vueapp`, name)
    log('⚡安装依赖')
    await spawn('npm', ['install'], {cwd: `./${name}`})
    log(`
⭐安装完成：
To get Start: 
===========================
     cd ${name}
    npm run serve 
===========================
  `)
  // 6.启动项目
  log('🚀启动项目')
  open('http://localhost:8080')
  await spawn('npm', ['run', 'dev'], {cwd: `./${name}`})

}