// mock.js — Mock data for judicial orders
// TODO: replace with fetch('/api/judicial/orders') — keep the shape identical

const DB = {
  orders: [
    // 资料收集 (4 orders - waiting to enter judicial process)
    { id: "20240717-822-0241749643176", customer: "小白测", product: "iPhone 15全新", name: "李丹丹", phone: "187****5510", bizType: "账单逾期", date: "2024-07-17 08:17:41", amount: 899.99, judicialStatus: "资料收集", court: "", paymentStatus: "未回款", overdueDays: 120, batch: "", specialMark: "", judgmentAmount: null },
    { id: "20240718-315-0241749654201", customer: "张伟杰", product: "iPhone 14 Pro Max", name: "王芳", phone: "138****2266", bizType: "账单逾期", date: "2024-07-18 10:23:15", amount: 1299.00, judicialStatus: "资料收集", court: "", paymentStatus: "未回款", overdueDays: 118, batch: "", specialMark: "重点跟进", judgmentAmount: null },
    { id: "20240719-426-0241749655512", customer: "陈大明", product: "iPhone 15 Pro", name: "陈大", phone: "139****3344", bizType: "账单逾期", date: "2024-07-19 09:30:28", amount: 1599.00, judicialStatus: "资料收集", court: "", paymentStatus: "未回款", overdueDays: 115, batch: "", specialMark: "", judgmentAmount: null },
    { id: "20240719-738-0241749656623", customer: "林小红", product: "MacBook Air M2", name: "林红", phone: "137****8800", bizType: "账单逾期", date: "2024-07-19 14:20:55", amount: 3299.00, judicialStatus: "资料收集", court: "", paymentStatus: "部分回款", overdueDays: 112, batch: "", specialMark: "", judgmentAmount: null },

    // 司法中 - 待立案 (4 orders)
    { id: "20240720-517-0241749667890", customer: "李明科技", product: "MacBook Air M2", name: "李明", phone: "159****8899", bizType: "账单逾期", date: "2024-07-20 14:45:33", amount: 3299.00, judicialStatus: "待立案", court: "北京市人民法院", paymentStatus: "部分回款", overdueDays: 95, batch: "2024-07", specialMark: "", judgmentAmount: null },
    { id: "20240721-628-0241749668901", customer: "赵小刚", product: "iPhone 14", name: "赵刚", phone: "136****1122", bizType: "账单逾期", date: "2024-07-21 10:15:08", amount: 799.00, judicialStatus: "待立案", court: "上海市人民法院", paymentStatus: "未回款", overdueDays: 92, batch: "2024-07", specialMark: "", judgmentAmount: null },
    { id: "20240722-829-0241749671234", customer: "陈小华", product: "iPad Pro 12.9", name: "陈华", phone: "186****4477", bizType: "账单逾期", date: "2024-07-22 09:15:08", amount: 2199.00, judicialStatus: "待立案", court: "广州市人民法院", paymentStatus: "未回款", overdueDays: 88, batch: "2024-07", specialMark: "", judgmentAmount: null },
    { id: "20240723-931-0241749672345", customer: "黄丽萍", product: "iPhone 15 Plus", name: "黄丽", phone: "188****5566", bizType: "账单逾期", date: "2024-07-23 16:30:22", amount: 999.00, judicialStatus: "待立案", court: "深圳市人民法院", paymentStatus: "未回款", overdueDays: 85, batch: "2024-07", specialMark: "", judgmentAmount: null },

    // 司法中 - 待开庭 (3 orders)
    { id: "20240725-331-0241749685678", customer: "刘洋贸易", product: "iPhone 15 Pro", name: "刘洋", phone: "133****1122", bizType: "账单逾期", date: "2024-07-25 16:30:22", amount: 1599.00, judicialStatus: "待开庭", court: "北京市人民法院", paymentStatus: "未回款", overdueDays: 76, batch: "2024-07", specialMark: "", judgmentAmount: null },
    { id: "20240726-442-0241749686789", customer: "何志远", product: "MacBook Air M3", name: "何志", phone: "134****4411", bizType: "账单逾期", date: "2024-07-26 14:15:43", amount: 3899.00, judicialStatus: "待开庭", court: "上海市人民法院", paymentStatus: "部分回款", overdueDays: 70, batch: "2024-07", specialMark: "", judgmentAmount: null },
    { id: "20240727-553-0241749687890", customer: "周婷婷", product: "iPad Pro 11", name: "周婷", phone: "131****7788", bizType: "账单逾期", date: "2024-07-27 11:05:19", amount: 2799.00, judicialStatus: "待开庭", court: "广州市人民法院", paymentStatus: "未回款", overdueDays: 65, batch: "2024-07", specialMark: "", judgmentAmount: null },

    // 司法中 - 待执行 (2 orders - have judgment amounts)
    { id: "20240728-446-0241749690123", customer: "赵琳琳", product: "Apple Watch Ultra 2", name: "赵琳", phone: "152****5544", bizType: "账单逾期", date: "2024-07-28 11:20:45", amount: 2999.00, judicialStatus: "待执行", court: "上海市人民法院", paymentStatus: "部分回款", overdueDays: 60, batch: "2024-07", specialMark: "已判决", judgmentAmount: 3599.00 },
    { id: "20240729-657-0241749691234", customer: "孙建军", product: "iPhone 14 Pro Max", name: "孙军", phone: "155****2233", bizType: "账单逾期", date: "2024-07-29 08:45:02", amount: 1299.00, judicialStatus: "待执行", court: "深圳市人民法院", paymentStatus: "未回款", overdueDays: 55, batch: "2024-07", specialMark: "已判决", judgmentAmount: 1899.00 },

    // 司法中 - 待结案 (1 order)
    { id: "20240801-558-0241749704567", customer: "周强", product: "iPhone 14", name: "周强", phone: "177****3388", bizType: "账单逾期", date: "2024-08-01 13:05:19", amount: 799.00, judicialStatus: "待结案", court: "广州市人民法院", paymentStatus: "已回款", overdueDays: 52, batch: "2024-08", specialMark: "", judgmentAmount: 999.00 },

    // 司法中 - 已结案 (1 order)
    { id: "20240803-662-0241749718901", customer: "吴敏敏", product: "MacBook Pro 14", name: "吴敏", phone: "189****9900", bizType: "账单逾期", date: "2024-08-03 08:45:02", amount: 4999.00, judicialStatus: "已结案", court: "深圳市人民法院", paymentStatus: "已回款", overdueDays: 45, batch: "2024-08", specialMark: "", judgmentAmount: 5499.00 },

    // 司法中 - 已退案 (1 order)
    { id: "20240805-773-0241749723456", customer: "孙丽丽", product: "iPhone 15 Plus", name: "孙丽", phone: "131****6655", bizType: "账单逾期", date: "2024-08-05 15:18:37", amount: 999.00, judicialStatus: "已退案", court: "北京市人民法院", paymentStatus: "未回款", overdueDays: 40, batch: "2024-08", specialMark: "客户申诉", judgmentAmount: null },
  ],

  courts: [
    { value: "北京市人民法院", label: "北京市人民法院" },
    { value: "上海市人民法院", label: "上海市人民法院" },
    { value: "广州市人民法院", label: "广州市人民法院" },
    { value: "深圳市人民法院", label: "深圳市人民法院" },
    { value: "其他", label: "其他" },
  ],

  statusCounts: {
    "未司法": 56,
    "资料收集": 4,
    "司法中": 12,
    "待立案": 4,
    "待开庭": 3,
    "待执行": 2,
    "待结案": 1,
    "已结案": 1,
    "已退案": 1,
  },
};

// API stubs — shape IS the future real API
// TODO: replace with fetch('/api/judicial/orders') — keep the shape identical
async function fetchOrders(filters = {}) {
  await delay(300);
  let list = DB.orders.slice();
  if (filters.judicialStatus) {
    list = list.filter(o => o.judicialStatus === filters.judicialStatus);
  }
  if (filters.orderId) {
    list = list.filter(o => o.id.includes(filters.orderId));
  }
  if (filters.court && filters.court !== "全部" && filters.court !== "") {
    list = list.filter(o => o.court === filters.court);
  }
  return { code: 0, data: list, total: list.length };
}

// TODO: replace with POST /api/judicial/orders/status-change
// Request: { orderIds: string[], newStatus: string, batch: string, court: string }
// Response: { code: number, message: string }
async function changeStatus(orderIds, newStatus, batch, court) {
  await delay(500);

  if (newStatus === "待执行") {
    const missing = orderIds.filter(id => {
      const o = DB.orders.find(o => o.id === id);
      return !o || !o.judgmentAmount;
    });
    if (missing.length > 0) {
      return { code: -1, message: `以下订单未录入判决金额：${missing.join("、")}` };
    }
  }

  orderIds.forEach(id => {
    const order = DB.orders.find(o => o.id === id);
    if (order) {
      order.judicialStatus = newStatus;
      if (court) order.court = court;
      if (batch) order.batch = batch;
    }
  });
  return { code: 0, message: "状态变更成功" };
}

// TODO: replace with PUT /api/judicial/orders/:id/judgment-amount
async function updateJudgmentAmount(orderId, amount) {
  await delay(200);
  const order = DB.orders.find(o => o.id === orderId);
  if (order) {
    order.judgmentAmount = amount;
  }
  return { code: 0, message: "判决金额已保存" };
}

// TODO: replace with POST /api/judicial/orders/batch-judgment-amount
async function batchUpdateJudgmentAmount(items) {
  await delay(500);
  let updated = 0;
  items.forEach(item => {
    const order = DB.orders.find(o => o.id === item.id);
    if (order) {
      order.judgmentAmount = item.amount;
      updated++;
    }
  });
  return { code: 0, message: `已更新 ${updated} 个订单的判决金额` };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
