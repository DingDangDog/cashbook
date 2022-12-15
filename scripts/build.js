const build = () => {
  // 添加脚本执行器
  const { execSync } = require("child_process");
  // 编译前端
  execSync(
    `cd ./source/books && npm run build`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
  // 编译后端
  execSync(
    `cd ./source/server && npm run build`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}
build();