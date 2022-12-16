const { execSync } = require("child_process");
const fs = require("fs");
module.exports = {
  local_build: () => {
    console.log("----📦-start: local_build-📦----");
    console.log("----run: cd ./source/books && npm run build-only----");
    // 编译前端
    execSync(
      `cd ./source/books && npm run build-only`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    console.log("----run: cd ./source/server && npm run build----");
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
    console.log("----🍃-end: local_build-🍃----\n");
  },
  /**
   * windows系统使用，其他系统不可用
   */
  local_clean: () => {
    console.log("----📦-start: local_clean-📦----");
    console.log("----run: cd source/books && rd/s/q dist----");
    execSync(
      `cd source/books && rd/s/q dist`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );

    console.log("----run: cd source/server && rd/s/q dist----");
    execSync(
      `cd source/server && rd/s/q dist`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    console.log("----🍃-end: local_clean-🍃----\n");
  },

  docker_build: () => {
    console.log("----📦-start: docker_build-📦----");
    const packageInfo = fs.readFileSync("package.json", { encoding: "utf-8" });
    const pack = JSON.parse(packageInfo);
    const version = pack.version;

    const dockerfile = fs.readFileSync("Dockerfile_lock", { encoding: "utf-8" });
    const realDockerfile = dockerfile.replace("{{version}}", '"' + version + '"');
    fs.writeFileSync("Dockerfile", realDockerfile, { encoding: "utf-8" });

    console.log("----run: docker build -t dingdangdog/cashbook:" + version + " . && docker build -t dingdangdog/cashbook:latest .");
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
    console.log("----🍃-end: docker_build-🍃----\n");
  },

  docker_push: () => {
    console.log("----📦-start: docker_push-📦----");
    const packageInfo = fs.readFileSync("package.json", { encoding: "utf-8" });
    const pack = JSON.parse(packageInfo);
    const version = pack.version;

    console.log("----run: docker push dingdangdog/cashbook:" + version + " && docker push dingdangdog/cashbook:latest");
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
    console.log("----🍃-end: docker_push-🍃----\n");
  },

  docker_clean: () => {
    console.log("----📦-start: docker_clean-📦----");
    const packageInfo = fs.readFileSync("package.json", { encoding: "utf-8" });
    const pack = JSON.parse(packageInfo);
    const version = pack.version;

    console.log("----run: docker rmi dingdangdog/cashbook:" + version + " && docker rmi dingdangdog/cashbook:lates");
    execSync(
      `docker rmi dingdangdog/cashbook:${version} && docker rmi dingdangdog/cashbook:latest`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    console.log("----🍃-end: docker_clean-🍃----\n");
  }
}
