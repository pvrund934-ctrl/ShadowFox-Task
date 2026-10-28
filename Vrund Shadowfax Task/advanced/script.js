/**
 * PULSEFLOW AI - ENTERPRISE OPERATIONS CONSOLE
 * Core JavaScript Engine: View Router, Canvas Telemetry Graph,
 * Visual DAG Pipeline Simulator, Infrastructure ROI Calculator,
 * Audit Table with CSV Exporter, API Key Generator, Webhook Tester,
 * and Global Command Palette (Ctrl+K).
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTelemetryChart();
  initWorkflowSimulator();
  initRoiCalculator();
  initAuditTableAndCsv();
  initApiKeyAndWebhookManager();
  initCommandPalette();
  initBriefModal();
});

/* ===================================================================
   1. NAVIGATION & VIEW PANE ROUTER
   =================================================================== */
function initNavigation() {
  const navItems = document.querySelectorAll('.sidebar-nav-item[data-view]');
  const panes = document.querySelectorAll('.view-pane');
  const activeCrumb = document.getElementById('active-crumb-text');
  const mobileToggle = document.getElementById('mobile-sidebar-toggle');
  const sidebar = document.getElementById('app-sidebar');

  const crumbMap = {
    overview: 'Live Telemetry & Metrics',
    workflows: 'Autonomous Agent Workflows',
    calculator: 'Cloud Infrastructure & ROI Optimizer',
    audit: 'Security Audit & Compliance Logs',
    apikeys: 'API Tokens & Webhook Diagnostics'
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      switchView(targetView);

      // Close mobile sidebar if open
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  window.switchView = function(viewName) {
    navItems.forEach(nav => {
      nav.classList.toggle('active', nav.getAttribute('data-view') === viewName);
    });

    panes.forEach(pane => {
      pane.classList.toggle('active', pane.getAttribute('id') === `pane-${viewName}`);
    });

    if (activeCrumb && crumbMap[viewName]) {
      activeCrumb.textContent = crumbMap[viewName];
    }

    // Trigger canvas resize if switching to overview
    if (viewName === 'overview') {
      setTimeout(renderCanvasChart, 50);
    }
  };
}

/* ===================================================================
   2. INTERACTIVE CANVAS TELEMETRY CHART
   =================================================================== */
let telemetryData = {
  range: '24h',
  points: []
};

function initTelemetryChart() {
  const canvas = document.getElementById('telemetryCanvas');
  const timeTabs = document.querySelectorAll('.time-tab-btn');
  const refreshBtn = document.getElementById('refresh-telemetry-btn');
  if (!canvas) return;

  generateTelemetryData('24h');
  renderCanvasChart();

  // Resize listener
  window.addEventListener('resize', () => {
    renderCanvasChart();
  });

  // Time range filter tabs
  timeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      timeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const range = tab.getAttribute('data-range');
      generateTelemetryData(range);
      renderCanvasChart();
      showToast(`Telemetry time range updated to ${range.toUpperCase()}`, 'info');
    });
  });

  // Manual refresh button
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const icon = refreshBtn.querySelector('i');
      if (icon) icon.classList.add('fa-spin');
      generateTelemetryData(telemetryData.range);
      renderCanvasChart();
      setTimeout(() => {
        if (icon) icon.classList.remove('fa-spin');
        showToast('Fleet telemetry synchronized.', 'success');
      }, 500);
    });
  }

  // Hover tooltip on canvas
  const tooltip = document.getElementById('chart-tooltip');
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dataIndex = Math.min(
      Math.max(0, Math.floor((x / rect.width) * telemetryData.points.length)),
      telemetryData.points.length - 1
    );
    const pt = telemetryData.points[dataIndex];

    if (pt && tooltip) {
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
      tooltip.innerHTML = `
        <strong>${pt.time}</strong><br>
        <span style="color: #00f2fe;">API Ingress: ${pt.ingress.toLocaleString()} req/s</span><br>
        <span style="color: #8b5cf6;">Vector Queries: ${pt.vector.toLocaleString()} q/s</span>
      `;
      tooltip.classList.remove('hidden');
    }
  });

  canvas.addEventListener('mouseleave', () => {
    if (tooltip) tooltip.classList.add('hidden');
  });
}

function generateTelemetryData(range) {
  telemetryData.range = range;
  const count = range === '24h' ? 24 : (range === '7d' ? 14 : 30);
  telemetryData.points = [];

  for (let i = 0; i < count; i++) {
    const base = 14000 + Math.sin(i / 2) * 5000 + Math.random() * 2000;
    const vectorBase = 6000 + Math.cos(i / 2) * 2500 + Math.random() * 1500;
    const timeLabel = range === '24h' ? `${i}:00` : (range === '7d' ? `Day ${i + 1}` : `Oct ${i + 1}`);

    telemetryData.points.push({
      time: timeLabel,
      ingress: Math.round(base),
      vector: Math.round(vectorBase)
    });
  }
}

function renderCanvasChart() {
  const canvas = document.getElementById('telemetryCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, width, height);

  const pts = telemetryData.points;
  if (!pts || pts.length === 0) return;

  const maxVal = Math.max(...pts.map(p => Math.max(p.ingress, p.vector))) * 1.15;
  const paddingBottom = 30;
  const paddingTop = 20;
  const drawHeight = height - paddingBottom - paddingTop;

  // Draw grid horizontal lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (drawHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Function to draw smooth Bézier curve line
  function drawLine(key, strokeColor, fillColor) {
    ctx.beginPath();
    const stepX = width / (pts.length - 1);

    pts.forEach((p, idx) => {
      const x = idx * stepX;
      const y = paddingTop + drawHeight - (p[key] / maxVal) * drawHeight;
      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = (idx - 1) * stepX;
        const prevY = paddingTop + drawHeight - (pts[idx - 1][key] / maxVal) * drawHeight;
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }
    });

    // Stroke
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(width, height - paddingBottom);
    ctx.lineTo(0, height - paddingBottom);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  // Draw Vector curve (Purple)
  const gradPurple = ctx.createLinearGradient(0, 0, 0, height);
  gradPurple.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
  gradPurple.addColorStop(1, 'rgba(139, 92, 246, 0)');
  drawLine('vector', '#8b5cf6', gradPurple);

  // Draw Ingress curve (Cyan)
  const gradCyan = ctx.createLinearGradient(0, 0, 0, height);
  gradCyan.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
  gradCyan.addColorStop(1, 'rgba(0, 242, 254, 0)');
  drawLine('ingress', '#00f2fe', gradCyan);

  // Draw X-axis timestamps
  ctx.fillStyle = '#64748b';
  ctx.font = '10px JetBrains Mono, monospace';
  const labelStep = Math.max(1, Math.floor(pts.length / 6));
  pts.forEach((p, idx) => {
    if (idx % labelStep === 0 || idx === pts.length - 1) {
      const x = idx * (width / (pts.length - 1));
      ctx.fillText(p.time, Math.max(0, x - 15), height - 8);
    }
  });
}

/* ===================================================================
   3. VISUAL WORKFLOW DAG & PIPELINE SIMULATOR
   =================================================================== */
function initWorkflowSimulator() {
  const runBtn = document.getElementById('run-pipeline-btn');
  const clearLogsBtn = document.getElementById('clear-logs-btn');
  const terminal = document.getElementById('pipeline-terminal-body');
  const overallStatus = document.getElementById('wf-overall-status');

  if (clearLogsBtn && terminal) {
    clearLogsBtn.addEventListener('click', () => {
      terminal.innerHTML = '<div class="log-line text-muted">[CONSOLE] Execution log history cleared.</div>';
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      runPipelineSimulation();
    });
  }
}

function runPipelineSimulation() {
  const runBtn = document.getElementById('run-pipeline-btn');
  const overallStatus = document.getElementById('wf-overall-status');
  const terminal = document.getElementById('pipeline-terminal-body');

  const nodes = [
    { id: 'node-stage-1', statusId: 'node-1-status', name: 'Data Ingestion', desc: 'Ingesting 4,200 events/sec via Kafka partition #04' },
    { id: 'node-stage-2', statusId: 'node-2-status', name: 'Vector Indexing', desc: 'Generating 1536-dim embeddings via HNSW vector index' },
    { id: 'node-stage-3', statusId: 'node-3-status', name: 'LLM Agent Reasoning', desc: 'Synthesizing task context with guardrail verification' },
    { id: 'node-stage-4', statusId: 'node-4-status', name: 'Action Dispatcher', desc: 'Executing database write and firing webhook callback' }
  ];

  // Disable button
  runBtn.disabled = true;
  runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing Pipeline...';
  overallStatus.innerHTML = '<span class="status-dot dot-running"></span> Status: Executing...';

  // Reset all nodes
  nodes.forEach(n => {
    const el = document.getElementById(n.id);
    const statusEl = document.getElementById(n.statusId);
    el.className = 'pipeline-node';
    statusEl.textContent = 'Pending';
  });

  appendLog('[START] Automated pipeline run #PL-784 triggered by user session.', 'text-cyan');

  let currentStep = 0;

  function executeStep() {
    if (currentStep < nodes.length) {
      const node = nodes[currentStep];
      const el = document.getElementById(node.id);
      const statusEl = document.getElementById(node.statusId);

      // Set node to running
      el.className = 'pipeline-node running';
      statusEl.textContent = 'Running...';
      appendLog(`[RUNNING] ${node.name}: ${node.desc}`, 'text-yellow');

      setTimeout(() => {
        // Complete node
        el.className = 'pipeline-node complete';
        statusEl.textContent = 'Complete (0.24s)';
        appendLog(`[SUCCESS] ${node.name} completed successfully with exit code 0.`, 'text-green');

        currentStep++;
        executeStep();
      }, 900);
    } else {
      // All stages completed
      runBtn.disabled = false;
      runBtn.innerHTML = '<i class="fa-solid fa-play"></i> Run Pipeline Simulation';
      overallStatus.innerHTML = '<span class="status-dot dot-success"></span> Status: Succeeded';
      appendLog('[FINISH] Pipeline #PL-784 executed successfully in 3.64s. SLA compliant.', 'text-cyan');
      showToast('Pipeline execution simulation completed successfully!', 'success');
    }
  }

  executeStep();

  function appendLog(msg, colorClass = '') {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = `log-line ${colorClass}`;
    line.textContent = `[${time}] ${msg}`;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

window.toggleAgentState = function(agentIndex) {
  const badge = document.getElementById(`agent-badge-${agentIndex}`);
  if (!badge) return;

  const isActive = badge.classList.contains('active');
  if (isActive) {
    badge.className = 'status-badge paused';
    badge.textContent = 'Paused';
    showToast(`Agent #${agentIndex} execution paused.`, 'info');
  } else {
    badge.className = 'status-badge active';
    badge.textContent = 'Active';
    showToast(`Agent #${agentIndex} resumed to active pool.`, 'success');
  }
};

/* ===================================================================
   4. CLOUD COMPUTE & ROI COST CALCULATOR
   =================================================================== */
function initRoiCalculator() {
  const sliderApi = document.getElementById('slider-api');
  const sliderNodes = document.getElementById('slider-nodes');
  const sliderStorage = document.getElementById('slider-storage');
  const resetBtn = document.getElementById('reset-calculator-btn');

  const valApi = document.getElementById('val-api');
  const valNodes = document.getElementById('val-nodes');
  const valStorage = document.getElementById('val-storage');

  const legacyCostEl = document.getElementById('legacy-cost-val');
  const pulseflowCostEl = document.getElementById('pulseflow-cost-val');
  const netSavingsEl = document.getElementById('net-savings-val');
  const savingsPercentEl = document.getElementById('savings-percent-val');
  const tierNameEl = document.getElementById('recommended-tier-name');

  function calculateCosts() {
    const apiRequests = parseInt(sliderApi.value, 10);
    const nodes = parseInt(sliderNodes.value, 10);
    const storageGb = parseInt(sliderStorage.value, 10);

    // Update labels
    valApi.textContent = apiRequests >= 1000000 ? `${(apiRequests / 1000000).toFixed(1)}M Invocations` : `${apiRequests.toLocaleString()} Invocations`;
    valNodes.textContent = `${nodes} Dedicated Nodes`;
    valStorage.textContent = `${storageGb.toLocaleString()} GB`;

    // Legacy Hyperscaler Compute Modeling (AWS / GCP)
    // $180 / node + $0.0007 / req + $0.18 / GB storage
    const legacyCost = Math.round((nodes * 180) + (apiRequests * 0.00065) + (storageGb * 0.16));

    // PulseFlow Optimized Mesh Modeling
    // $72 / node + $0.00022 / req + $0.05 / GB storage
    const pulseflowCost = Math.round((nodes * 72) + (apiRequests * 0.00022) + (storageGb * 0.05));

    const savings = Math.max(0, legacyCost - pulseflowCost);
    const percent = Math.round((savings / legacyCost) * 100);

    legacyCostEl.textContent = `$${legacyCost.toLocaleString()}`;
    pulseflowCostEl.textContent = `$${pulseflowCost.toLocaleString()}`;
    netSavingsEl.textContent = `$${savings.toLocaleString()} / month`;
    savingsPercentEl.textContent = `(${percent}% reduction in cloud compute spend)`;

    // Tier recommendation
    if (nodes <= 8 && apiRequests <= 2000000) {
      tierNameEl.textContent = 'Starter Pro Fleet';
    } else if (nodes <= 24) {
      tierNameEl.textContent = 'Growth Production Fleet';
    } else {
      tierNameEl.textContent = 'Enterprise Dedicated Global Mesh';
    }
  }

  [sliderApi, sliderNodes, sliderStorage].forEach(slider => {
    if (slider) slider.addEventListener('input', calculateCosts);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      sliderApi.value = 5000000;
      sliderNodes.value = 16;
      sliderStorage.value = 250;
      calculateCosts();
      showToast('Calculator parameters reset to defaults.', 'info');
    });
  }

  const quoteModalBtn = document.getElementById('quote-modal-btn');
  if (quoteModalBtn) {
    quoteModalBtn.addEventListener('click', () => {
      showToast('Enterprise tier quote reserved. Our solutions engineering team will reach out within 2 hours.', 'success');
    });
  }

  calculateCosts();
}

/* ===================================================================
   5. SECURITY AUDIT LOGS & CSV EXPORT
   =================================================================== */
const initialAuditLogs = [
  { time: "2026-10-28 17:15:22", user: "sarah.jenkins@pulseflow.io", action: "DEPLOY", resource: "agent-cluster-us01", ip: "192.168.4.12", status: "SUCCESS" },
  { time: "2026-10-28 16:48:05", user: "vrund.patel@pulseflow.io", action: "AUTH", resource: "console-sso-gateway", ip: "103.21.144.9", status: "SUCCESS" },
  { time: "2026-10-28 15:32:19", user: "devops-bot@system", action: "DEPLOY", resource: "pipeline-#PL-784", ip: "10.0.12.84", status: "SUCCESS" },
  { time: "2026-10-28 14:10:41", user: "marcus.k@pulseflow.io", action: "POLICY", resource: "iam-role-auditor", ip: "84.17.52.204", status: "SUCCESS" },
  { time: "2026-10-28 13:05:12", user: "system-monitor", action: "ALERT", resource: "node-frankfurt-03", ip: "10.0.4.19", status: "WARNING" },
  { time: "2026-10-28 11:22:54", user: "alex.rivera@pulseflow.io", action: "AUTH", resource: "token-auth-gateway", ip: "172.56.21.90", status: "SUCCESS" },
  { time: "2026-10-28 09:40:18", user: "sarah.jenkins@pulseflow.io", action: "POLICY", resource: "vpc-peering-rule", ip: "192.168.4.12", status: "SUCCESS" }
];

let activeLogs = [...initialAuditLogs];

function initAuditTableAndCsv() {
  const tbody = document.getElementById('audit-tbody');
  const searchInput = document.getElementById('audit-search-input');
  const typeFilter = document.getElementById('audit-type-filter');
  const exportBtn = document.getElementById('export-csv-btn');
  const inviteBtn = document.getElementById('invite-member-btn');
  const inviteModal = document.getElementById('invite-modal');
  const closeInviteBtn = document.getElementById('close-invite-btn');
  const inviteForm = document.getElementById('invite-form');

  function renderTable() {
    if (!tbody) return;
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const type = typeFilter ? typeFilter.value : 'all';

    const filtered = activeLogs.filter(log => {
      const matchSearch = !query || 
        log.user.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.ip.includes(query) ||
        log.resource.toLowerCase().includes(query);
      const matchType = type === 'all' || log.action === type;
      return matchSearch && matchType;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #64748b; padding: 2rem;">No matching audit events found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(log => `
      <tr>
        <td style="font-family: var(--font-mono); font-size: 0.78rem; color: #94a3b8;">${log.time}</td>
        <td><strong>${log.user}</strong></td>
        <td><span class="code-pill">${log.action}</span></td>
        <td style="font-family: var(--font-mono); font-size: 0.78rem;">${log.resource}</td>
        <td style="font-family: var(--font-mono); font-size: 0.78rem; color: #64748b;">${log.ip}</td>
        <td>
          <span class="status-badge ${log.status === 'SUCCESS' ? 'active' : 'paused'}">
            ${log.status}
          </span>
        </td>
      </tr>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('input', renderTable);
  if (typeFilter) typeFilter.addEventListener('change', renderTable);

  // CSV Export Engine
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const type = typeFilter ? typeFilter.value : 'all';

      const exportRows = activeLogs.filter(log => {
        const matchSearch = !query || 
          log.user.toLowerCase().includes(query) ||
          log.action.toLowerCase().includes(query) ||
          log.ip.includes(query) ||
          log.resource.toLowerCase().includes(query);
        const matchType = type === 'all' || log.action === type;
        return matchSearch && matchType;
      });

      let csvContent = "Timestamp,User,ActionType,TargetResource,OriginIP,Status\n";
      exportRows.forEach(r => {
        csvContent += `"${r.time}","${r.user}","${r.action}","${r.resource}","${r.ip}","${r.status}"\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PulseFlow_Security_Audit_Report_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`Exported ${exportRows.length} audit records to CSV!`, 'success');
    });
  }

  // Invite Modal
  if (inviteBtn && inviteModal) {
    inviteBtn.addEventListener('click', () => {
      inviteModal.classList.remove('hidden');
    });
    if (closeInviteBtn) {
      closeInviteBtn.addEventListener('click', () => {
        inviteModal.classList.add('hidden');
      });
    }
    inviteModal.addEventListener('click', (e) => {
      if (e.target === inviteModal) inviteModal.classList.add('hidden');
    });

    if (inviteForm) {
      inviteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('invite-name').value.trim();
        const email = document.getElementById('invite-email').value.trim();
        const role = document.getElementById('invite-role').value;

        if (!name || !email) {
          showToast('Please fill out all invitation fields.', 'error');
          return;
        }

        inviteModal.classList.add('hidden');
        inviteForm.reset();

        // Add to audit logs
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        activeLogs.unshift({
          time: now,
          user: "sarah.jenkins@pulseflow.io",
          action: "AUTH",
          resource: `invited-${role.toLowerCase()}-${email}`,
          ip: "192.168.4.12",
          status: "SUCCESS"
        });
        renderTable();

        showToast(`Invitation successfully sent to ${email} (${role})!`, 'success');
      });
    }
  }

  renderTable();
}

/* ===================================================================
   6. API KEYS & WEBHOOK DIAGNOSTIC PING
   =================================================================== */
let apiKeys = [
  { id: 1, name: "Production-Ingress-Cluster-01", token: "pulse_live_9f81a7b63c4d2e1088ef92", created: "2026-10-12", scope: "telemetry:read,workflow:execute" },
  { id: 2, name: "Analytics-ReadOnly-Service", token: "pulse_live_3b4a8e991c2f70415a9901", created: "2026-10-24", scope: "telemetry:read" }
];

function initApiKeyAndWebhookManager() {
  const listContainer = document.getElementById('api-keys-list');
  const countBadge = document.getElementById('key-count-badge');
  const createBtn = document.getElementById('create-api-key-btn');
  const keyModal = document.getElementById('key-modal');
  const closeKeyBtn = document.getElementById('close-key-btn');
  const createForm = document.getElementById('create-key-form');

  const webhookForm = document.getElementById('webhook-ping-form');
  const pingBtn = document.getElementById('ping-btn');
  const diagnosticBox = document.getElementById('diagnostic-output-box');
  const diagnosticPayload = document.getElementById('diagnostic-payload');
  const pingLatency = document.getElementById('ping-latency');

  function renderKeys() {
    if (!listContainer) return;
    if (countBadge) countBadge.textContent = `${apiKeys.length} Keys Active`;

    listContainer.innerHTML = apiKeys.map(k => `
      <div class="key-item-row">
        <div class="key-meta">
          <h4>${k.name}</h4>
          <span class="key-token-string">${maskToken(k.token)}</span>
          <div style="font-size: 0.72rem; color: #64748b; margin-top: 0.35rem;">
            Scope: <code>${k.scope}</code> &bull; Created: ${k.created}
          </div>
        </div>
        <div class="key-actions">
          <button class="btn btn-sm btn-outline" onclick="copyTokenToClipboard('${k.token}')" title="Copy full token">
            <i class="fa-regular fa-copy"></i> Copy
          </button>
          <button class="btn btn-sm btn-secondary" onclick="revokeApiKey(${k.id})" title="Revoke key">
            <i class="fa-solid fa-trash-can" style="color: #ef4444;"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  function maskToken(str) {
    return str.substring(0, 14) + '••••••••••••••••••••';
  }

  window.copyTokenToClipboard = function(token) {
    navigator.clipboard.writeText(token).then(() => {
      showToast('API Key copied to clipboard securely!', 'success');
    }).catch(() => {
      showToast(`Token: ${token}`, 'info');
    });
  };

  window.revokeApiKey = function(id) {
    apiKeys = apiKeys.filter(k => k.id !== id);
    renderKeys();
    showToast('API key successfully revoked.', 'info');
  };

  // Create Key Modal
  if (createBtn && keyModal) {
    createBtn.addEventListener('click', () => {
      keyModal.classList.remove('hidden');
    });
    if (closeKeyBtn) {
      closeKeyBtn.addEventListener('click', () => {
        keyModal.classList.add('hidden');
      });
    }
    keyModal.addEventListener('click', (e) => {
      if (e.target === keyModal) keyModal.classList.add('hidden');
    });

    if (createForm) {
      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('key-name').value.trim();
        const scope = document.getElementById('key-scope').value;

        if (!name) return;

        const randomHex = Array.from({length: 24}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        const newToken = `pulse_live_${randomHex}`;
        const today = new Date().toISOString().substring(0, 10);

        apiKeys.push({
          id: Date.now(),
          name: name,
          token: newToken,
          created: today,
          scope: scope
        });

        keyModal.classList.add('hidden');
        createForm.reset();
        renderKeys();
        showToast(`Created API Key "${name}"!`, 'success');
      });
    }
  }

  // Webhook Diagnostic Ping Tool
  if (webhookForm) {
    webhookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetUrl = document.getElementById('webhook-url').value.trim();
      const eventName = document.getElementById('webhook-event').value;

      pingBtn.disabled = true;
      pingBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Testing Handshake...';

      setTimeout(() => {
        pingBtn.disabled = false;
        pingBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Test Diagnostic Ping';

        const simulatedLatency = Math.floor(28 + Math.random() * 25);
        if (pingLatency) pingLatency.textContent = `${simulatedLatency}ms`;

        const payloadObj = {
          event: eventName,
          timestamp: new Date().toISOString(),
          delivery_id: `delv_${Math.floor(Math.random() * 1000000)}`,
          status: "DELIVERED",
          endpoint: targetUrl,
          response: {
            http_code: 200,
            status_text: "OK",
            tls_cipher: "TLS_AES_256_GCM_SHA384",
            roundtrip_ms: simulatedLatency
          }
        };

        if (diagnosticPayload) {
          diagnosticPayload.textContent = JSON.stringify(payloadObj, null, 2);
        }

        if (diagnosticBox) diagnosticBox.classList.remove('hidden');
        showToast(`Webhook ping delivered successfully in ${simulatedLatency}ms!`, 'success');
      }, 700);
    });
  }

  renderKeys();
}

/* ===================================================================
   7. COMMAND PALETTE (Ctrl + K)
   =================================================================== */
function initCommandPalette() {
  const trigger = document.getElementById('command-palette-trigger');
  const modal = document.getElementById('command-palette-modal');
  const input = document.getElementById('palette-input');
  const items = document.querySelectorAll('.palette-item');

  if (trigger && modal) {
    trigger.addEventListener('click', openPalette);

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('hidden')) {
          openPalette();
        } else {
          closePalette();
        }
      }
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closePalette();
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });

    // Filter items
    if (input) {
      input.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? 'flex' : 'none';
        });
      });
    }

    // Click item jumps to view
    items.forEach(item => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        if (action) {
          switchView(action);
          closePalette();
        }
      });
    });
  }

  function openPalette() {
    modal.classList.remove('hidden');
    input.value = '';
    items.forEach(i => i.style.display = 'flex');
    input.focus();
  }

  function closePalette() {
    modal.classList.add('hidden');
  }
}

/* ===================================================================
   8. CLIENT REQUIREMENT BRIEF MODAL
   =================================================================== */
function initBriefModal() {
  const openBtn = document.getElementById('open-brief-modal-btn');
  const modal = document.getElementById('brief-modal');
  const closeBtn = document.getElementById('close-brief-btn');
  const closeAction = document.getElementById('brief-modal-close-action');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    const closeModal = () => modal.classList.add('hidden');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeAction) closeAction.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/* ===================================================================
   9. TOAST NOTIFICATION HELPER
   =================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
