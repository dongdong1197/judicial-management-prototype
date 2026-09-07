// app.js — Interaction logic for judicial orders prototype

// ===== State =====
const state = {
  currentMainTab: "司法中",
  currentSubTab: "待立案",
  selectedOrders: new Set(),
  filters: {},
  courtValue: "",
  showCourtInput: false,
  modal: {
    open: false,
    mode: "",
    fromStatus: "",
    status: "待立案",
    batchYear: "2026",
    batchNum: "10",
    court: "",
    courtInput: "",
    showCourtInput: false,
    importedOrders: [],
    importedJudgments: [],
    // 待执行相关
    hearingDate: "",
    caseNumber: "",
    lawsuitAmount: "",
    execFee: "",
    preservationFee: "",
    otherFee: "",
    // 已结案相关
    closeDate: "",
    closeAttachments: [],
  },
};

// ===== Icons (inline SVG) =====
const icons = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  uploadCloud: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16l-4-4-4 4"></path><path d="M12 12v9"></path><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>`,
  errorCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  empty: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  finance: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  box: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
  file: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  scales: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"></path><path d="M3 7h18"></path><path d="M7 7v4a3 3 0 0 1-6 0V7"></path><path d="M23 7v4a3 3 0 0 1-6 0V7"></path><path d="M12 21v-9"></path></svg>`,
  receipt: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path><line x1="8" y1="8" x2="16" y2="8"></line><line x1="8" y1="12" x2="14" y2="12"></line></svg>`,
  layers: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
};

// ===== Status tag colors =====
const statusColors = {
  "逾期中": "tag-red",
  "资料收集": "tag-blue",
  "待立案": "tag-blue",
  "待开庭": "tag-orange",
  "待执行": "tag-orange",
  "待结案": "tag-blue",
  "已结案": "tag-green",
  "已退案": "tag-gray",
};

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  renderStatusTabs();
  renderSubTabs();
  renderTable();
  bindFilterEvents();
  bindModalEvents();
  bindDropdownEvents();
});

// ===== Sidebar =====
function renderSidebar() {
  const groups = [
    {
      title: "",
      items: [
        { label: "融资管理", icon: "finance", subItems: ["融资订单", "二手融资推送"] },
        { label: "资产管理", icon: "box", subItems: ["逾期订单", "结清订单"] },
        { label: "订单管理", icon: "file", subItems: ["合同管理", "订单管理", "收款管理", "下载记录"] },
        { label: "清分管理", icon: "layers" },
        { label: "保险管理", icon: "shield" },
      ],
    },
    {
      title: "",
      items: [
        {
          label: "司法管理", icon: "scales", active: true,
          subItems: [
            { label: "司法订单", active: true },
            { label: "司法发票管理" },
          ],
        },
      ],
    },
    {
      title: "",
      items: [
        { label: "发票管理", icon: "receipt" },
      ],
    },
  ];

  const sidebar = document.getElementById("sidebar");
  let html = "";
  groups.forEach(group => {
    if (group.title) {
      html += `<div class="sidebar-group-title">${group.title}</div>`;
    }
    group.items.forEach(item => {
      html += `<div class="sidebar-item${item.active ? " active" : ""}">${icons[item.icon]}<span>${item.label}</span></div>`;
      if (item.subItems) {
        item.subItems.forEach(sub => {
          const subActive = typeof sub === "object" ? sub.active : false;
          const subLabel = typeof sub === "object" ? sub.label : sub;
          html += `<div class="sidebar-sub-item${subActive ? " active" : ""}">${subLabel}</div>`;
        });
      }
    });
  });
  sidebar.innerHTML = html;
}

// ===== Status Tabs =====
function renderStatusTabs() {
  const tabs = ["未司法", "资料收集", "司法中"];
  const container = document.getElementById("status-tabs");
  let html = "";
  tabs.forEach(tab => {
    const count = DB.statusCounts[tab] || 0;
    html += `
      <div class="status-tab${state.currentMainTab === tab ? " active" : ""}" data-tab="${tab}">
        ${tab}
        <span class="status-tab-count">${count}</span>
      </div>`;
  });
  container.innerHTML = html;

  container.querySelectorAll(".status-tab").forEach(el => {
    el.addEventListener("click", () => {
      state.currentMainTab = el.dataset.tab;
      if (state.currentMainTab === "司法中") {
        state.currentSubTab = "待立案";
      }
      state.selectedOrders.clear();
      renderStatusTabs();
      renderSubTabs();
      renderTable();
    });
  });
}

// ===== Sub Tabs =====
function renderSubTabs() {
  const container = document.getElementById("sub-tabs");
  if (state.currentMainTab !== "司法中") {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }
  container.style.display = "flex";
  const subTabs = ["待立案", "待开庭", "待执行", "待结案", "已结案", "已退案"];
  let html = "";
  subTabs.forEach(tab => {
    const count = DB.statusCounts[tab] || 0;
    html += `
      <div class="sub-tab${state.currentSubTab === tab ? " active" : ""}" data-tab="${tab}">
        ${tab}
        <span class="sub-tab-count">(${count})</span>
      </div>`;
  });
  container.innerHTML = html;

  container.querySelectorAll(".sub-tab").forEach(el => {
    el.addEventListener("click", () => {
      state.currentSubTab = el.dataset.tab;
      state.selectedOrders.clear();
      renderSubTabs();
      renderTable();
    });
  });
}

// ===== Table =====
function renderTable() {
  const wrapper = document.getElementById("table-wrapper");
  const loading = document.getElementById("loading");

  loading.style.display = "flex";

  setTimeout(() => {
    loading.style.display = "none";

    let orders = DB.orders.slice();
    if (state.currentMainTab === "司法中") {
      orders = orders.filter(o => o.judicialStatus === state.currentSubTab);
    } else if (state.currentMainTab === "资料收集") {
      orders = orders.filter(o => o.judicialStatus === "资料收集");
    } else {
      orders = [];
    }

    const allChecked = orders.length > 0 && orders.every(o => state.selectedOrders.has(o.id));
    const isCollecting = state.currentMainTab === "资料收集";
    const showJudgmentCol = !isCollecting;

    let html = `
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <div class="dropdown">
            <button class="btn" id="batch-btn">
              批量操作
              ${icons.chevronDown}
            </button>
            <div class="dropdown-menu" id="batch-menu">
              <div class="dropdown-menu-item" data-action="status-change">${isCollecting ? "转入司法" : "状态变更"}</div>
              <div class="dropdown-menu-item" data-action="import-judgment">导入判决金额</div>
              <div class="dropdown-menu-item" data-action="export">导出选中</div>
            </div>
          </div>
          <button class="btn" id="import-orders-btn">${icons.upload} 导入订单</button>
          <button class="btn" id="import-judgment-btn">${icons.upload} 导入判决金额</button>
          <button class="btn">${icons.download} 导出</button>
          <button class="btn">${icons.refresh} 刷新</button>
        </div>
        <div class="table-toolbar-right">
          共 ${orders.length} 条记录
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th class="col-check">
                <div class="checkbox${allChecked ? " checked" : ""}" id="check-all"></div>
              </th>
              <th>订单编号</th>
              <th>客户名称</th>
              <th>商品名称</th>
              <th>姓名</th>
              <th>手机号</th>
              <th>业务类型</th>
              <th>法院</th>
              <th>司法状态</th>
              <th>日期</th>
              <th>订单金额</th>
              ${showJudgmentCol ? `<th>判决金额</th>` : ""}
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
    `;

    if (orders.length === 0) {
      const colCount = showJudgmentCol ? 13 : 12;
      html += `<tr><td colspan="${colCount}"><div class="empty-state">${icons.empty}<div>暂无数据</div></div></td></tr>`;
    } else {
      orders.forEach(order => {
        const checked = state.selectedOrders.has(order.id);
        const tagClass = statusColors[order.judicialStatus] || "tag-gray";
        const courtText = order.court || '<span style="color:#bfbfbf">未选择</span>';

        let judgmentCell = "";
        if (showJudgmentCol) {
          if (order.judgmentAmount) {
            judgmentCell = `<td class="col-judgment"><span class="judgment-value">¥${order.judgmentAmount.toFixed(2)}</span></td>`;
          } else {
            judgmentCell = `<td class="col-judgment"><input type="number" class="judgment-input" placeholder="录入" data-id="${order.id}" /><span class="judgment-saved"></span></td>`;
          }
        }

        const actionLabel = isCollecting ? "转入司法" : "变更状态";

        html += `
          <tr>
            <td class="col-check">
              <div class="checkbox${checked ? " checked" : ""}" data-id="${order.id}"></div>
            </td>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.name}</td>
            <td>${order.phone}</td>
            <td>${order.bizType}</td>
            <td>${courtText}</td>
            <td><span class="tag ${tagClass}">${order.judicialStatus}</span></td>
            <td>${order.date}</td>
            <td>¥${order.amount.toFixed(2)}</td>
            ${judgmentCell}
            <td class="col-action">
              <button class="btn-link">查看</button>
              <button class="btn-link" data-action="status-change" data-id="${order.id}">${actionLabel}</button>
            </td>
          </tr>`;
      });
    }

    const colCount = showJudgmentCol ? 13 : 12;
    html += `
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <span class="pagination-info">第 1 - ${orders.length} 条 / 共 ${orders.length} 条</span>
        <button class="page-btn" disabled>&lt;</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">&gt;</button>
      </div>
    `;

    wrapper.innerHTML = html;

    // Bind checkboxes
    document.getElementById("check-all")?.addEventListener("click", () => {
      if (allChecked) {
        orders.forEach(o => state.selectedOrders.delete(o.id));
      } else {
        orders.forEach(o => state.selectedOrders.add(o.id));
      }
      renderTable();
    });

    wrapper.querySelectorAll(".checkbox[data-id]").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        if (state.selectedOrders.has(id)) {
          state.selectedOrders.delete(id);
        } else {
          state.selectedOrders.add(id);
        }
        renderTable();
      });
    });

    // Bind judgment amount inputs
    wrapper.querySelectorAll(".judgment-input").forEach(el => {
      el.addEventListener("blur", async () => {
        const val = parseFloat(el.value);
        if (!isNaN(val) && val > 0) {
          await updateJudgmentAmount(el.dataset.id, val);
          showToast(`订单 ${el.dataset.id} 判决金额已保存`, "success");
          renderTable();
        }
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") el.blur();
      });
    });

    // Bind action buttons
    wrapper.querySelectorAll('.col-action [data-action="status-change"]').forEach(el => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = el.dataset.id;
        if (id) {
          state.selectedOrders.clear();
          state.selectedOrders.add(id);
        }
        openStatusModal(isCollecting ? "资料收集" : "");
      });
    });

    document.getElementById("import-orders-btn")?.addEventListener("click", openOrderImportModal);
    document.getElementById("import-judgment-btn")?.addEventListener("click", openJudgmentImportModal);
    document.getElementById("batch-btn")?.addEventListener("click", toggleBatchMenu);
    document.querySelectorAll("#batch-menu .dropdown-menu-item").forEach(el => {
      el.addEventListener("click", () => {
        const action = el.dataset.action;
        document.getElementById("batch-menu").classList.remove("show");
        if (action === "status-change") {
          openStatusModal(isCollecting ? "资料收集" : "");
        } else if (action === "import-judgment") {
          openJudgmentImportModal();
        }
      });
    });
  }, 300);
}

// ===== Filter Events =====
function bindFilterEvents() {
  const courtSelect = document.getElementById("court-select");
  const courtInputWrapper = document.getElementById("court-input-wrapper");

  courtSelect.addEventListener("change", () => {
    state.courtValue = courtSelect.value;
    state.showCourtInput = courtSelect.value === "其他";
    if (state.showCourtInput) {
      courtInputWrapper.classList.add("show");
    } else {
      courtInputWrapper.classList.remove("show");
    }
  });

  document.getElementById("search-btn").addEventListener("click", () => {
    state.filters.orderId = document.getElementById("filter-order-id").value.trim();
    state.filters.court = document.getElementById("court-select").value;
    showToast("筛选条件已应用", "success");
    renderTable();
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    document.querySelectorAll(".filter-control").forEach(el => el.value = "");
    state.filters = {};
    state.courtValue = "";
    state.showCourtInput = false;
    courtInputWrapper.classList.remove("show");
    renderTable();
  });
}

// ===== Dropdown =====
function toggleBatchMenu() {
  document.getElementById("batch-menu").classList.toggle("show");
}

function bindDropdownEvents() {
  document.addEventListener("click", (e) => {
    const batchMenu = document.getElementById("batch-menu");
    const batchBtn = document.getElementById("batch-btn");
    if (batchMenu && !batchMenu.contains(e.target) && !batchBtn?.contains(e.target)) {
      batchMenu.classList.remove("show");
    }
  });
}

// ===== Status Change Modal =====
function openStatusModal(fromStatus = "") {
  const modal = document.getElementById("modal-overlay");
  modal.dataset.mode = fromStatus === "资料收集" ? "collect" : "status";
  modal.classList.add("show");
  state.modal.open = true;
  state.modal.fromStatus = fromStatus;
  state.modal.mode = modal.dataset.mode;
  if (fromStatus === "资料收集") {
    state.modal.status = "待立案";
  } else {
    // 待结案是自动流转，不在手动变更选项中
    const flow = ["待立案", "待开庭", "待执行", "已结案", "已退案"];
    const idx = flow.indexOf(state.currentSubTab);
    state.modal.status = flow[idx + 1] || flow[0];
  }
  state.modal.court = "";
  state.modal.courtInput = "";
  state.modal.showCourtInput = false;
  state.modal.importedOrders = [];
  state.modal.importedJudgments = [];
  renderModalContent();
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("show");
  state.modal.open = false;
}

function renderModalContent() {
  const title = document.getElementById("modal-title");
  const isCollect = state.modal.mode === "collect";
  title.textContent = isCollect ? "转入司法" : "状态变更";
  const body = document.getElementById("modal-body");

  // Determine available statuses
  let statuses;
  if (isCollect) {
    statuses = [{ value: "待立案", label: "待立案（司法中）" }];
  } else {
    // 待结案是自动流转（待执行订单已完结自动进入），不在手动变更选项中
    const all = ["待立案", "待开庭", "待执行", "已结案", "已退案"];
    statuses = all.filter(s => s !== state.currentSubTab).map(s => ({ value: s, label: s }));
  }

  let statusHtml = "";
  statuses.forEach(s => {
    statusHtml += `
      <div class="radio-item${state.modal.status === s.value ? " checked" : ""}" data-status="${s.value}">
        <div class="radio-circle"></div>
        <span>${s.label}</span>
      </div>`;
  });

  // Court selection field (only for 资料收集 → 司法中)
  const courtField = isCollect ? `
    <div class="form-field">
      <label class="form-label">法院选择<span class="required">*</span></label>
      <select class="form-input form-select" id="modal-court-select">
        <option value="">请选择法院</option>
        <option value="北京市人民法院">北京市人民法院</option>
        <option value="上海市人民法院">上海市人民法院</option>
        <option value="广州市人民法院">广州市人民法院</option>
        <option value="深圳市人民法院">深圳市人民法院</option>
        <option value="其他">其他</option>
      </select>
      <div class="modal-court-input-wrapper" id="modal-court-input-wrapper" style="display:none;">
        <input type="text" class="form-input" placeholder="请输入法院名称" id="modal-court-input" style="margin-top:8px;">
      </div>
      <div class="form-error" id="court-error">请选择法院</div>
    </div>` : "";

  // 待开庭：开庭信息字段（含批次）
  const hearingFields = state.modal.status === "待开庭" ? `
    <div class="form-field">
      <label class="form-label">开庭时间<span class="required">*</span></label>
      <input type="date" class="form-input" value="${state.modal.hearingDate}" id="hearing-date">
    </div>
    <div class="form-field">
      <label class="form-label">案件号<span class="required">*</span></label>
      <input type="text" class="form-input" placeholder="请输入案件号" value="${state.modal.caseNumber}" id="case-number">
    </div>
  ` : "";

  // 待执行：费用字段（无批次）
  const execFields = state.modal.status === "待执行" ? `
    <div class="form-field">
      <label class="form-label">起诉金额<span class="required">*</span></label>
      <input type="number" class="form-input" placeholder="请输入起诉金额" value="${state.modal.lawsuitAmount}" id="lawsuit-amount">
    </div>
    <div class="form-field">
      <label class="form-label">执行手续费<span class="required">*</span></label>
      <input type="number" class="form-input" placeholder="请输入执行手续费" value="${state.modal.execFee}" id="exec-fee">
    </div>
    <div class="form-field">
      <label class="form-label">保全费<span class="required">*</span></label>
      <input type="number" class="form-input" placeholder="请输入保全费" value="${state.modal.preservationFee}" id="preservation-fee">
    </div>
    <div class="form-field">
      <label class="form-label">其他费</label>
      <input type="number" class="form-input" placeholder="请输入其他费" value="${state.modal.otherFee}" id="other-fee">
    </div>
    <div class="form-field total-amount-field">
      <label class="form-label">司法账单应还金额</label>
      <div class="total-amount" id="total-amount">¥0.00</div>
    </div>
  ` : "";

  // 已结案：结案证明 + 结案时间（无批次）
  const closeFields = state.modal.status === "已结案" ? `
    <div class="form-field">
      <label class="form-label">结案时间<span class="required">*</span></label>
      <input type="date" class="form-input" value="${state.modal.closeDate}" id="close-date">
    </div>
    <div class="form-field">
      <label class="form-label">结案证明附件<span class="required">*</span></label>
      <div class="attach-upload-area" id="close-attach-area">
        <div class="attach-upload-icon">${icons.uploadCloud}</div>
        <div class="attach-upload-text">点击上传 <strong>结案证明</strong></div>
        <div class="attach-upload-hint">支持 .pdf / .jpg / .png 格式</div>
      </div>
      <div class="attach-list${state.modal.closeAttachments.length > 0 ? " show" : ""}" id="close-attach-list">
        ${state.modal.closeAttachments.map((f, i) => `
          <div class="attach-item">
            <span class="attach-name">${f.name}</span>
            <span class="attach-size">${f.size}</span>
            <span class="attach-remove" data-attach-idx="${i}">×</span>
          </div>
        `).join("")}
      </div>
    </div>
  ` : "";

  // 批次：待执行和已结案不需要批次，其他都需要（含转司法）
  const showBatch = state.modal.status !== "待执行" && state.modal.status !== "已结案";
  const batchField = showBatch ? `
    <div class="form-field">
      <label class="form-label">选择批次</label>
      <div class="batch-input-group">
        <input type="text" class="form-input" placeholder="年份" value="${state.modal.batchYear}" id="batch-year" maxlength="4">
        <span class="batch-sep">-</span>
        <input type="text" class="form-input" placeholder="批次号" value="${state.modal.batchNum}" id="batch-num" maxlength="4">
      </div>
    </div>
  ` : "";

  body.innerHTML = `
    <div class="form-field">
      <label class="form-label">${isCollect ? "司法状态" : "变更至"}<span class="required">*</span></label>
      <div class="radio-group" id="status-radio-group">
        ${statusHtml}
      </div>
    </div>

    ${courtField}
    ${hearingFields}
    ${batchField}
    ${execFields}
    ${closeFields}
  `;

  // Bind radio
  body.querySelectorAll(".radio-item").forEach(el => {
    el.addEventListener("click", () => {
      state.modal.status = el.dataset.status;
      renderModalContent();
    });
  });

  // Bind court select (only in collect mode)
  if (isCollect) {
    const modalCourtSelect = document.getElementById("modal-court-select");
    const modalCourtWrapper = document.getElementById("modal-court-input-wrapper");
    modalCourtSelect.addEventListener("change", () => {
      state.modal.court = modalCourtSelect.value;
      state.modal.showCourtInput = modalCourtSelect.value === "其他";
      modalCourtWrapper.style.display = state.modal.showCourtInput ? "block" : "none";
      document.getElementById("court-error").classList.remove("show");
    });
    document.getElementById("modal-court-input")?.addEventListener("input", (e) => {
      state.modal.courtInput = e.target.value;
    });
  }

  // Bind batch inputs
  document.getElementById("batch-year")?.addEventListener("input", (e) => {
    state.modal.batchYear = e.target.value;
  });
  document.getElementById("batch-num")?.addEventListener("input", (e) => {
    state.modal.batchNum = e.target.value;
  });

  // 待开庭：开庭时间 + 案件号
  if (state.modal.status === "待开庭") {
    document.getElementById("hearing-date")?.addEventListener("change", (e) => {
      state.modal.hearingDate = e.target.value;
    });
    document.getElementById("case-number")?.addEventListener("input", (e) => {
      state.modal.caseNumber = e.target.value;
    });
  }

  // 待执行：费用计算
  if (state.modal.status === "待执行") {
    const calcTotal = () => {
      const a = parseFloat(state.modal.lawsuitAmount) || 0;
      const b = parseFloat(state.modal.execFee) || 0;
      const c = parseFloat(state.modal.preservationFee) || 0;
      const d = parseFloat(state.modal.otherFee) || 0;
      const total = a + b + c + d;
      const el = document.getElementById("total-amount");
      if (el) el.textContent = "¥" + total.toFixed(2);
    };
    calcTotal();

    document.getElementById("lawsuit-amount")?.addEventListener("input", (e) => {
      state.modal.lawsuitAmount = e.target.value; calcTotal();
    });
    document.getElementById("exec-fee")?.addEventListener("input", (e) => {
      state.modal.execFee = e.target.value; calcTotal();
    });
    document.getElementById("preservation-fee")?.addEventListener("input", (e) => {
      state.modal.preservationFee = e.target.value; calcTotal();
    });
    document.getElementById("other-fee")?.addEventListener("input", (e) => {
      state.modal.otherFee = e.target.value; calcTotal();
    });
  }

  // 已结案：结案时间 + 附件
  if (state.modal.status === "已结案") {
    document.getElementById("close-date")?.addEventListener("change", (e) => {
      state.modal.closeDate = e.target.value;
    });
    document.getElementById("close-attach-area")?.addEventListener("click", () => {
      state.modal.closeAttachments.push({ name: "结案证明.pdf", size: "1.2 MB" });
      renderModalContent();
      showToast("附件已上传", "success");
    });
    document.querySelectorAll("[data-attach-idx]").forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.dataset.attachIdx);
        state.modal.closeAttachments.splice(idx, 1);
        renderModalContent();
      });
    });
  }
}

function bindModalEvents() {
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-cancel").addEventListener("click", closeModal);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") closeModal();
  });

  document.getElementById("modal-confirm").addEventListener("click", async () => {
    const isCollect = state.modal.mode === "collect";

    // Validate court selection for 资料收集 → 司法中
    if (isCollect) {
      const courtVal = state.modal.court;
      if (!courtVal) {
        document.getElementById("court-error").classList.add("show");
        showToast("请选择法院", "error");
        return;
      }
      if (courtVal === "其他" && !state.modal.courtInput.trim()) {
        document.getElementById("court-error").textContent = "请输入法院名称";
        document.getElementById("court-error").classList.add("show");
        showToast("请输入法院名称", "error");
        return;
      }
    }

    // 待开庭：验证开庭信息
    if (state.modal.status === "待开庭") {
      if (!state.modal.hearingDate) {
        showToast("请选择开庭时间", "error");
        return;
      }
      if (!state.modal.caseNumber.trim()) {
        showToast("请输入案件号", "error");
        return;
      }
    }

    // 待执行：验证费用必填项
    if (state.modal.status === "待执行") {
      if (!state.modal.lawsuitAmount || parseFloat(state.modal.lawsuitAmount) <= 0) {
        showToast("请输入起诉金额", "error");
        return;
      }
      if (!state.modal.execFee || parseFloat(state.modal.execFee) <= 0) {
        showToast("请输入执行手续费", "error");
        return;
      }
      if (!state.modal.preservationFee || parseFloat(state.modal.preservationFee) <= 0) {
        showToast("请输入保全费", "error");
        return;
      }
    }

    // 已结案：验证结案时间和附件
    if (state.modal.status === "已结案") {
      if (!state.modal.closeDate) {
        showToast("请选择结案时间", "error");
        return;
      }
      if (state.modal.closeAttachments.length === 0) {
        showToast("请上传结案证明附件", "error");
        return;
      }
    }

    const finalCourt = state.modal.court === "其他" ? state.modal.courtInput.trim() : state.modal.court;

    const orderIds = Array.from(state.selectedOrders);

    if (orderIds.length === 0) {
      showToast("请先在表格中勾选订单", "error");
      return;
    }

    const btn = document.getElementById("modal-confirm");
    btn.disabled = true;
    btn.textContent = "提交中...";

    const batchStr = `${state.modal.batchYear}-${state.modal.batchNum}`;
    const result = await changeStatus(orderIds, state.modal.status, batchStr, finalCourt);

    btn.disabled = false;
    btn.textContent = "确定";

    if (result.code === 0) {
      showToast(result.message, "success");
      closeModal();
      state.selectedOrders.clear();
      // Update counts
      const fromKey = isCollect ? "资料收集" : state.currentSubTab;
      if (DB.statusCounts[fromKey] !== undefined) DB.statusCounts[fromKey] = Math.max(0, DB.statusCounts[fromKey] - orderIds.length);
      if (DB.statusCounts[state.modal.status] !== undefined) DB.statusCounts[state.modal.status] += orderIds.length;
      if (isCollect) {
        DB.statusCounts["司法中"] = (DB.statusCounts["司法中"] || 0) + orderIds.length;
      }
      renderStatusTabs();
      renderSubTabs();
      renderTable();
    } else {
      showToast(result.message, "error");
    }
  });
}

// ===== Judgment Import Modal =====
function openJudgmentImportModal() {
  const modal = document.getElementById("judgment-modal-overlay");
  modal.classList.add("show");
  state.modal.importedJudgments = [];
  renderJudgmentModalContent();
}

function closeJudgmentModal() {
  document.getElementById("judgment-modal-overlay").classList.remove("show");
}

function renderJudgmentModalContent() {
  const body = document.getElementById("judgment-modal-body");

  body.innerHTML = `
    <div class="form-field">
      <label class="form-label">导入判决金额</label>
      <div class="import-area" id="judgment-import-area">
        <div class="import-icon">${icons.uploadCloud}</div>
        <div class="import-text">点击或拖拽文件到此处 <strong>导入判决金额</strong></div>
        <div class="import-hint">支持 .xlsx / .csv 格式，需包含订单编号和判决金额列</div>
      </div>
      <div class="imported-list${state.modal.importedJudgments.length > 0 ? " show" : ""}" id="judgment-imported-list">
        <div class="imported-list-header">
          <span>已导入 ${state.modal.importedJudgments.length} 条记录</span>
          <span class="remove-btn" id="clear-judgments">清空</span>
        </div>
        ${state.modal.importedJudgments.map(o => `
          <div class="imported-list-item judgment-imported-item">
            <span>${o.id}</span>
            <span>${o.customer}</span>
            <span class="judgment-amount-preview">¥${o.amount.toFixed(2)}</span>
            <span class="remove-btn" data-jremove="${o.id}">移除</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  document.getElementById("judgment-import-area")?.addEventListener("click", () => {
    // Simulate importing judgment amounts for orders that need them
    const needJudgment = DB.orders.filter(o => !o.judgmentAmount && o.judicialStatus !== "资料收集").slice(0, 4);
    needJudgment.forEach(o => {
      if (!state.modal.importedJudgments.find(existing => existing.id === o.id)) {
        state.modal.importedJudgments.push({
          id: o.id,
          customer: o.customer,
          amount: Math.round(o.amount * 1.2 * 100) / 100,
        });
      }
    });
    renderJudgmentModalContent();
    showToast("已导入 4 条判决金额记录", "success");
  });

  document.getElementById("clear-judgments")?.addEventListener("click", () => {
    state.modal.importedJudgments = [];
    renderJudgmentModalContent();
  });

  document.querySelectorAll("[data-jremove]").forEach(el => {
    el.addEventListener("click", () => {
      state.modal.importedJudgments = state.modal.importedJudgments.filter(o => o.id !== el.dataset.jremove);
      renderJudgmentModalContent();
    });
  });
}

function bindJudgmentModalEvents() {
  document.getElementById("judgment-modal-close").addEventListener("click", closeJudgmentModal);
  document.getElementById("judgment-modal-cancel").addEventListener("click", closeJudgmentModal);
  document.getElementById("judgment-modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "judgment-modal-overlay") closeJudgmentModal();
  });

  document.getElementById("judgment-modal-confirm").addEventListener("click", async () => {
    if (state.modal.importedJudgments.length === 0) {
      showToast("请先导入判决金额数据", "error");
      return;
    }

    const btn = document.getElementById("judgment-modal-confirm");
    btn.disabled = true;
    btn.textContent = "提交中...";

    const result = await batchUpdateJudgmentAmount(state.modal.importedJudgments);

    btn.disabled = false;
    btn.textContent = "确定";

    if (result.code === 0) {
      showToast(result.message, "success");
      closeJudgmentModal();
      renderTable();
    } else {
      showToast(result.message, "error");
    }
  });
}

// ===== Order Import Modal =====
function openOrderImportModal() {
  const modal = document.getElementById("order-import-modal-overlay");
  modal.classList.add("show");
  state.modal.importedOrders = [];
  if (state.currentMainTab === "资料收集") {
    state.modal.status = "待立案";
  } else {
    // 待结案是自动流转，不在手动变更选项中
    const flow = ["待立案", "待开庭", "待执行", "已结案", "已退案"];
    const idx = flow.indexOf(state.currentSubTab);
    state.modal.status = flow[idx + 1] || flow[0];
  }
  renderOrderImportModalContent();
}

function closeOrderImportModal() {
  document.getElementById("order-import-modal-overlay").classList.remove("show");
}

function renderOrderImportModalContent() {
  const body = document.getElementById("order-import-modal-body");
  const isCollect = state.currentMainTab === "资料收集";

  const statuses = isCollect
    ? [{ value: "待立案", label: "待立案（司法中）" }]
    : ["待立案", "待开庭", "待执行", "已结案", "已退案"]
        .filter(s => s !== state.currentSubTab)
        .map(s => ({ value: s, label: s }));

  let statusHtml = "";
  statuses.forEach(s => {
    statusHtml += `
      <div class="radio-item${state.modal.status === s.value ? " checked" : ""}" data-import-status="${s.value}">
        <div class="radio-circle"></div>
        <span>${s.label}</span>
      </div>`;
  });

  body.innerHTML = `
    <div class="form-field">
      <label class="form-label">变更至状态<span class="required">*</span></label>
      <div class="radio-group" id="import-status-radio-group">
        ${statusHtml}
      </div>
    </div>

    <div class="form-field">
      <label class="form-label">上传文件<span class="required">*</span></label>
      <div class="import-area" id="order-import-area">
        <div class="import-icon">${icons.uploadCloud}</div>
        <div class="import-text">点击或拖拽文件到此处 <strong>导入订单</strong></div>
        <div class="import-hint">支持 .xlsx / .csv 格式，需包含订单编号列，单次最多 500 条</div>
      </div>
      <div class="imported-list${state.modal.importedOrders.length > 0 ? " show" : ""}" id="order-imported-list">
        <div class="imported-list-header">
          <span>已导入 ${state.modal.importedOrders.length} 个订单</span>
          <span class="remove-btn" id="clear-imported-orders">清空</span>
        </div>
        ${state.modal.importedOrders.map(o => `
          <div class="imported-list-item">
            <span>${o.id}</span>
            <span>${o.customer}</span>
            <span class="remove-btn" data-iremove="${o.id}">移除</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="form-field">
      <label class="form-label">选择批次</label>
      <div class="batch-input-group">
        <input type="text" class="form-input" placeholder="年份" value="${state.modal.batchYear}" id="import-batch-year" maxlength="4">
        <span class="batch-sep">-</span>
        <input type="text" class="form-input" placeholder="批次号" value="${state.modal.batchNum}" id="import-batch-num" maxlength="4">
      </div>
    </div>
  `;

  // Bind radio
  body.querySelectorAll(".radio-item").forEach(el => {
    el.addEventListener("click", () => {
      state.modal.status = el.dataset.importStatus;
      renderOrderImportModalContent();
    });
  });

  // Bind batch inputs
  document.getElementById("import-batch-year")?.addEventListener("input", (e) => {
    state.modal.batchYear = e.target.value;
  });
  document.getElementById("import-batch-num")?.addEventListener("input", (e) => {
    state.modal.batchNum = e.target.value;
  });

  // Bind import area
  document.getElementById("order-import-area")?.addEventListener("click", () => {
    const available = DB.orders.filter(o =>
      (isCollect && o.judicialStatus === "资料收集") ||
      (!isCollect && o.judicialStatus === state.currentSubTab)
    );
    const sample = available.slice(0, 5).map(o => ({ id: o.id, customer: o.customer }));
    sample.forEach(o => {
      if (!state.modal.importedOrders.find(existing => existing.id === o.id)) {
        state.modal.importedOrders.push(o);
      }
    });
    renderOrderImportModalContent();
    showToast(`已导入 ${sample.length} 个订单`, "success");
  });

  // Bind remove
  document.getElementById("clear-imported-orders")?.addEventListener("click", () => {
    state.modal.importedOrders = [];
    renderOrderImportModalContent();
  });
  body.querySelectorAll("[data-iremove]").forEach(el => {
    el.addEventListener("click", () => {
      state.modal.importedOrders = state.modal.importedOrders.filter(o => o.id !== el.dataset.iremove);
      renderOrderImportModalContent();
    });
  });
}

function bindOrderImportModalEvents() {
  document.getElementById("order-import-modal-close").addEventListener("click", closeOrderImportModal);
  document.getElementById("order-import-modal-cancel").addEventListener("click", closeOrderImportModal);
  document.getElementById("order-import-modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "order-import-modal-overlay") closeOrderImportModal();
  });

  document.getElementById("order-import-modal-confirm").addEventListener("click", async () => {
    if (state.modal.importedOrders.length === 0) {
      showToast("请先导入订单文件", "error");
      return;
    }

    const orderIds = state.modal.importedOrders.map(o => o.id);
    const btn = document.getElementById("order-import-modal-confirm");
    btn.disabled = true;
    btn.textContent = "提交中...";

    const isCollect = state.currentMainTab === "资料收集";
    const batchStr = `${state.modal.batchYear}-${state.modal.batchNum}`;
    const result = await changeStatus(orderIds, state.modal.status, batchStr, "");

    btn.disabled = false;
    btn.textContent = "确定";

    if (result.code === 0) {
      showToast(result.message, "success");
      closeOrderImportModal();
      const fromKey = isCollect ? "资料收集" : state.currentSubTab;
      if (DB.statusCounts[fromKey] !== undefined) DB.statusCounts[fromKey] = Math.max(0, DB.statusCounts[fromKey] - orderIds.length);
      if (DB.statusCounts[state.modal.status] !== undefined) DB.statusCounts[state.modal.status] += orderIds.length;
      if (isCollect) DB.statusCounts["司法中"] = (DB.statusCounts["司法中"] || 0) + orderIds.length;
      renderStatusTabs();
      renderSubTabs();
      renderTable();
    } else {
      showToast(result.message, "error");
    }
  });
}

// ===== Toast =====
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  toast.className = `toast ${type}`;
  const iconHtml = type === "error" ? icons.errorCircle : type === "success" ? icons.checkCircle : "";
  toast.innerHTML = `<span class="toast-icon">${iconHtml}</span><span>${message}</span>`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Bind modal events on load
document.addEventListener("DOMContentLoaded", () => {
  bindJudgmentModalEvents();
  bindOrderImportModalEvents();
});
