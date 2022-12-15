const insertLog = () => {
  const fs = require("fs");
  let log = fs.readFileSync("CHANGELOG.md", { encoding: "utf-8" });
  // 本地配置修改
  log = log.replace("https://ddd/", "https://github.com/");
  fs.writeFileSync("CHANGELOG.md", log, { encoding: "utf-8" });

  const newLog =
    "---\ntitle: 更新日志\nicon: update\n---\n\n" +
    log.replace("# Changelog", "");

  fs.writeFileSync("docs/ref/changelog.md", newLog, { encoding: "utf-8" });

  // 文档版本标识文件，暂不需要
  // let version = fs.readFileSync("doc-version", { encoding: "utf-8" });
  // version = version.split("\n")[0].trim();
  // const arr = version.split(".");
  // const sub = arr.pop();
  // arr.push(String(parseInt(sub) + 1));
  // const newVersion = arr.join(".");
  // fs.writeFileSync("doc-version", newVersion, { encoding: "utf-8" });

  // 添加脚本执行器并应用
  const { execSync } = require("child_process");
  execSync(
    `git add . && git commit -m \"docs: CHANGELOG文档自动更新\"`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
};
insertLog();
