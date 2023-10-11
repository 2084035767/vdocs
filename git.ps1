# $select=""
$select = Read-Host -Prompt "请输入操作类型：1.更新 2.提交"
# 设置日志文件路径
$logfile = ".\src\other\log.md"
if ($select -eq "1") {
    $commitMessage = ""
while ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = Read-Host -Prompt "请输入提交信息"
}
# 添加所有更改
git add .
# 提交更改
git commit -m $commitMessage
# 推送仓库
git push
Write-Host "已提交到仓库。"

} elseif ($select -eq "2") {
# 获取当前日期和时间
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
# 提示用户输入更新信息
$updates = Read-Host "请输入更新信息"
# 构建更新日志条目
$logEntry = @"
#### $timestamp
> 更新：$updates

"@
# 将更新日志条目追加到日志文件
$logEntry | Out-File -FilePath $logfile -Append
Write-Host "已将更新信息追加到日志文件。"
}
else{
    Write-Host "输入错误"
}





