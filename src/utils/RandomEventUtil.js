import {NotifyPlugin} from "tdesign-vue-next";


let normalInterval1 = undefined;
let normalInterval2 = undefined;
let emergencyInterval = undefined;
let deviceMap = {
    0: {
        name: "無人機",
        type: "電量",
        min: 10,
        max: 100,
        unit: "%"
    },
    1: {
        name: "無人機站",
        type: "無人機數量",
        min: 0,
        max: 10,
        unit: "架"
    },
    2: {
        name: "風力監測站",
        type: "設備數量",
        min: 1,
        max: 11,
        unit: "級"
    },
    3: {
        name: "濕度監測儀",
        type: "空氣濕度",
        min: 80,
        max: 99,
        unit: "%RH"
    },
}

// 定义构造函数
function RandomEventUtil() {
    // 初始化属性
    this.normalInterval1 = normalInterval1;
    this.normalInterval2 = normalInterval2;
    this.emergencyInterval = emergencyInterval;
    this.warningThreshold = {
        // 定义每种设备的警告阈值
        0: {min: 30, max: 100, advice: "請及時充電"}, // 无人机电量的最小和最大安全值
        1: {min: 5, max: 10, advice: "請及時補充可用無人機"}, // 无人机站无人机数量的最小和最大安全值
        2: {min: 1, max: 4, advice: "請注意判斷該天氣下是否適合飛行"}, // 风力监测站设备数量的最小和最大安全值
        3: {min: 85, max: 95, advice: "請注意觀察天氣"} // 湿度监测仪空气湿度的最小和最大安全值
    };
}

RandomEventUtil.prototype.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

RandomEventUtil.prototype.checkForWarning = function (value, deviceId) {
    let threshold = this.warningThreshold[deviceId];
    if (value < threshold.min || value > threshold.max) {
        let obj = deviceMap[deviceId];
        let warningMsg = `警告：${obj.name} 的${obj.type}为${value}${obj.unit}\n已經超出設定的安全範圍！\n建議：${threshold.advice}`;
        NotifyPlugin.error({
            title: '警告消息',
            content: warningMsg,
            duration: 11000,
        });
    }
};

RandomEventUtil.prototype.start = function () {
    this.normalInterval1 = setInterval(() => {
        let deviceId = this.getRandomInt(0, 3);
        let obj = deviceMap[deviceId];
        let value = this.getRandomInt(obj.min, obj.max);
        let normalMsg = `收到來自 ${obj.name} ${100000 + this.getRandomInt(0, 200)} 的消息\n最新的${obj.type}：${value}${obj.unit}`;
        NotifyPlugin.info({
            title: '設備消息',
            content: normalMsg,
            duration: 11000,
        });
        // 检查是否需要警告
        this.checkForWarning(value, deviceId);
    }, 5000);
    setTimeout(() => {
        this.normalInterval2 = setInterval(() => {
            let deviceId = this.getRandomInt(0, 3);
            let obj = deviceMap[deviceId];
            let value = this.getRandomInt(obj.min, obj.max);
            let normalMsg = `收到來自 ${obj.name} ${100000 + this.getRandomInt(0, 200)} 的消息\n最新的${obj.type}：${value}${obj.unit}`;
            NotifyPlugin.info({
                title: '設備消息',
                content: normalMsg,
                duration: 11000,
            });
            // 检查是否需要警告
            this.checkForWarning(value, deviceId);
        }, 5000);
    }, 3000)
};

// 在构造函数的原型上添加 stop 方法
RandomEventUtil.prototype.stop = function () {
    clearInterval(this.normalInterval1);
    clearInterval(this.normalInterval2);
    clearInterval(this.emergencyInterval);
};

// 导出 RandomEventUtil 构造函数
export default RandomEventUtil;
