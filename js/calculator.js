const GPM_in = document.getElementById("GPM_in");
const GPM_ot = document.getElementById("GPM_ot");

// 格式化数字：四舍五入保留1位小数，如果是整数不显示小数
function formatNumber(num) {
    const rounded = Math.round(num * 10) / 10;
    return (rounded % 1 === 0) ? rounded.toString() : rounded.toFixed(1);
}

GPM_in.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        if (!GPM_in.dataset.time) {
            // 第一步：输入时间
            GPM_in.dataset.time = GPM_in.value.trim();
            GPM_in.value = "";
            GPM_in.placeholder = "请输入金币数量";
        } else {
            // 第二步：输入金币并计算
            const time = GPM_in.dataset.time;
            const coin = parseFloat(GPM_in.value.trim());

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
            GPM_ot.innerHTML = `本局平均经济为 <span style="color:red;">${formatNumber(efficiency)}</span> 金币/分, ${comment}`;
            if (window.msnry) window.msnry.layout();

            // 自动重置输入框
            GPM_in.value = "";
            GPM_in.placeholder = "请输入时间 (mmss)";
            delete GPM_in.dataset.time;  // 清除记录的时间，准备下一次输入
        }
    }
});

// 时间计算器
const time_in = document.getElementById("time_in");
const time_ot = document.getElementById("time_ot");

time_in.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        if (!time_in.dataset.first) {
            // 第一次输入：开始时间
            time_in.dataset.first = time_in.value.trim();
            time_in.value = "";
            time_in.placeholder = "请输入持续时间 (hhmm)";
        } else {
            // 第二次输入：加上的时间
            const start = time_in.dataset.first;
            const add = time_in.value.trim();

            // 解析开始时间
            const h1 = parseInt(start.slice(0, 2));
            const m1 = parseInt(start.slice(2, 4));
            const startMinutes = h1 * 60 + m1;

            // 解析要加的时间
            const h2 = parseInt(add.slice(0, 2));
            const m2 = parseInt(add.slice(2, 4));
            const addMinutes = h2 * 60 + m2;

            // 求和并处理跨天（取模1440）
            let totalMinutes = (startMinutes + addMinutes) % (24 * 60);

            // 转回小时和分钟
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            // 格式化输出
            const result =
                String(hours).padStart(2, "0") +
                ":" +
                String(minutes).padStart(2, "0");

            time_ot.textContent = `结束时间：${result}`;
            if (window.msnry) window.msnry.layout();

            // 重置输入框
            time_in.value = "";
            time_in.placeholder = "请输入开始时间 (hhmm)";
            delete time_in.dataset.first;
        }
    }
});
