// =====================
// 通用输入行为修复（手机防跳焦点）
// =====================
function preventMobileEnterJump(input) {
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // 手机端按回车会触发 blur，手动重新聚焦防止跳到其他输入框
    input.addEventListener("blur", () => {
        setTimeout(() => {
            if (document.activeElement.tagName !== "INPUT") {
                input.focus();
            }
        }, 50);
    });
}

// =====================
// 经济计算器
// =====================
const GPM_in = document.getElementById("GPM_in");
const GPM_ot = document.getElementById("GPM_ot");

preventMobileEnterJump(GPM_in);

GPM_in.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        if (!GPM_in.dataset.time) {
            // 第一次输入：对局时长
            GPM_in.dataset.time = GPM_in.value.trim();
            GPM_in.value = "";
            GPM_in.placeholder = "请输入金币数量";
        } else {
            // 第二次输入：金币数量
            const time = GPM_in.dataset.time;
            const coin = parseFloat(GPM_in.value.trim());
            const minutes = parseInt(time.slice(0, 2));
            const seconds = parseInt(time.slice(2, 4));
            const totalSeconds = minutes * 60 + seconds;
            const efficiency = (coin / totalSeconds) * 60;

            let comment = "";
            if (efficiency < 800) comment = "太差了";
            else if (efficiency < 900) comment = "还可以";
            else if (efficiency < 1000) comment = "真不错";
            else comment = "棒极了";

            // 格式化数字
            const rounded = Math.round(efficiency * 10) / 10;
            const formatted =
                rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);

            GPM_ot.innerHTML = `本局平均经济为 <span style="color:red;">${formatted}</span> 金币/分, ${comment}`;

            // 重置
            GPM_in.value = "";
            GPM_in.placeholder = "请输入对局时长 (mmss)";
            delete GPM_in.dataset.time;
        }
    }
});

// =====================
// 时间计算器
// =====================
const time_in = document.getElementById("time_in");
const time_ot = document.getElementById("time_ot");

preventMobileEnterJump(time_in);

time_in.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        if (!time_in.dataset.first) {
            // 第一次输入：开始时间
            time_in.dataset.first = time_in.value.trim();
            time_in.value = "";
            time_in.placeholder = "请输入要增加的时间 (hhmm)";
        } else {
            // 第二次输入：增加的时间
            const start = time_in.dataset.first;
            const add = time_in.value.trim();

            const h1 = parseInt(start.slice(0, 2));
            const m1 = parseInt(start.slice(2, 4));
            const h2 = parseInt(add.slice(0, 2));
            const m2 = parseInt(add.slice(2, 4));

            // 总分钟数并处理跨天
            const total = (h1 * 60 + m1 + h2 * 60 + m2) % (24 * 60);
            const hh = String(Math.floor(total / 60)).padStart(2, "0");
            const mm = String(total % 60).padStart(2, "0");

            time_ot.textContent = `结束时间：${hh}:${mm}`;

            // 重置
            time_in.value = "";
            time_in.placeholder = "请输入开始时间 (hhmm)";
            delete time_in.dataset.first;
        }
    }
});
