module.exports = {
  header: "# Changelog",
  commitUrlFormat: "https://github.com/{{owner}}/{{repository}}/commit/{{hash}}",
  compareUrlFormat:"https://github.com/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
  issueUrlFormat:"https://github.com/{{owner}}/{{repository}}/issues/{{id}}",
  types: [
    { type: "feat", section: "๐ด Features | ๆฐๅ่ฝ" },
    { type: "fix", section: "๐ Bug Fixes | Bug ไฟฎๅค" },
    { type: "init", section: "๐ซ Init | ๅๅงๅ" },
    { type: "docs", section: "๐ Documentation | ๆๆกฃ" },
    { type: "style", section: "๐ Styles | ้ฃๆ ผ" },
    { type: "refactor", section: "โ Code Refactoring | ไปฃ็ ้ๆ" },
    { type: "perf", section: "๐ Performance Improvements | ๆง่ฝไผๅ" },
    { type: "test", section: "๐ Tests | ๆต่ฏ" },
    { type: "revert", section: "๐ง Revert | ๅ้" },
    { type: "build", section: "โ Build System | ๆๅๆๅปบ" },
    { type: "chore", section: "๐ฉ Chore | ๆๅปบ/ๅทฅ็จไพ่ต/ๅทฅๅท" },
    { type: "ci", section: "โฝ Continuous Integration | CI ้็ฝฎ" },
  ],
};