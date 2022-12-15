const insertLog = () => {
  const fs = require("fs");
  const log = fs.readFileSync("CHANGELOG.md", { encoding: "utf-8" });
  const newLog =
    "# 更新日志📣" +
    log.replace("# Changelog", "");

  fs.writeFileSync("docs/ref/changelog.md", newLog, { encoding: "utf-8" });

  // 更新文档版本更新标识文件
  let version = fs.readFileSync("doc-version", { encoding: "utf-8" });
  version = version.split("\n")[0].trim();
  const arr = version.split(".");
  const sub = arr.pop();
  arr.push(String(parseInt(sub) + 1));
  const newVersion = arr.join(".");
  fs.writeFileSync("doc-version", newVersion, { encoding: "utf-8" });

  // 添加脚本执行器并应用
  const { execSync } = require("child_process");
  execSync(
    `git add . && git commit -m \"docs: 更新文档\" && git tag doc-${newVersion} && git push --follow-tags origin main && git push --tags`,
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
