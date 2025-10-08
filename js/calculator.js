const io = document.getElementById("io");
const result = document.getElementById("result");

// 格式化数字：四舍五入保留1位小数，如果是整数不显示小数
function formatNumber(num) {
    const rounded = Math.round(num * 10) / 10;
    return (rounded % 1 === 0) ? rounded.toString() : rounded.toFixed(1);
}

io.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        if (!io.dataset.time) {
            // 第一步：输入时间
            io.dataset.time = io.value.trim();
            io.value = "";
            io.placeholder = "请输入金币数量";
        } else {
            // 第二步：输入金币并计算
            const time = io.dataset.time;
            const coin = parseFloat(io.value.trim());

            const minutes = parseInt(time.slice(0, 2));
            const seconds = parseInt(time.slice(2, 4));
            const totalSeconds = minutes * 60 + seconds;
            const efficiency = coin / totalSeconds * 60;

            let comment = "";
            if (efficiency < 800) comment = "太差了";
            else if (efficiency < 900) comment = "还可以";
            else if (efficiency < 1000) comment = "真不错";
            else comment = "棒极了";

            // 显示结果，数字部分红色
            result.innerHTML = `本局平均经济为 <span style="color:red;">${formatNumber(efficiency)}</span> 金币/分, ${comment}`;

            // 自动重置输入框
            io.value = "";
            io.placeholder = "请输入时间 (mmss)";
            delete io.dataset.time;  // 清除记录的时间，准备下一次输入
        }
    }
});
