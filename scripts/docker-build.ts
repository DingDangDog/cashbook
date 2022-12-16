const docker_build = () => {
  const build = require("./build.ts");
  build.build();

  const fs = require("fs");
  const packageInfo = fs.readFileSync("package.json", { encoding: "utf-8" });
  const pack = JSON.parse(packageInfo);
  const version = pack.version;

  const dockerfile = fs.readFileSync("Dockerfile_lock", { encoding: "utf-8" });
  const realDockerfile = dockerfile.replace("{{version}}", '"' + version + '"');
  fs.writeFileSync("Dockerfile", realDockerfile, { encoding: "utf-8" });

  // 添加脚本执行器
  const { execSync } = require("child_process");

  execSync(
    `docker build -t dingdangdog/cashbook:${version} . && docker build -t dingdangdog/cashbook:latest .`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );

}
docker_build();