const docker_push = () => {
  const fs = require("fs");
  const packageInfo = fs.readFileSync("package.json", { encoding: "utf-8" });

  const pack = JSON.parse(packageInfo);
  const version = pack.version;

  // 添加脚本执行器
  const { execSync } = require("child_process");

  execSync(
    `docker push dingdangdog/cashbook:${version} && docker push dingdangdog/cashbook:latest`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );

}
docker_push();