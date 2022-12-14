const { execSync } = require("child_process");
const fs = require("fs");
module.exports = {
  local_build: () => {
    console.log("----ð¦-start: local_build-ð¦----");
    console.log("----run: cd ./source/books && npm run build-only----");
    // ç¼è¯åç«¯
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
    // ç¼è¯åç«¯
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
    console.log("----ð-end: local_build-ð----\n");
  },
  /**
   * windowsç³»ç»ä½¿ç¨ï¼å¶ä»ç³»ç»ä¸å¯ç¨
   */
  local_clean: () => {
    console.log("----ð¦-start: local_clean-ð¦----");
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
    console.log("----ð-end: local_clean-ð----\n");
  },

  docker_build: () => {
    console.log("----ð¦-start: docker_build-ð¦----");
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
    console.log("----ð-end: docker_build-ð----\n");
  },

  docker_push: () => {
    console.log("----ð¦-start: docker_push-ð¦----");
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
    console.log("----ð-end: docker_push-ð----\n");
  },

  docker_clean: () => {
    console.log("----ð¦-start: docker_clean-ð¦----");
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
    console.log("----ð-end: docker_clean-ð----\n");
  }
}
