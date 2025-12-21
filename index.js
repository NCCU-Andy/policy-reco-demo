/** =========================
     *  Demo 資料（你可替換）
     *  TODO：把 CASE_DB / BNP_CATALOG 換成你們整理過的資料庫與法巴商品
     * ========================= */
    const CASE_DB = [
      {
        id:"SEG-A1", gender:"生理男", ageBand:"30-39", jobRisk:2, income:"300萬以上", family:"核心家庭",
        needs:["保障型保單","投資型保單"],
        coverages: [
          {type:"醫療(實支)", amount: 1200000, unit:"NTD", note:"年度限額示意"},
          {type:"意外", amount: 3000000, unit:"NTD", note:"身故/失能示意"},
          {type:"重大傷病", amount: 2000000, unit:"NTD", note:"一次金示意"},
          {type:"投資型", amount: 1000000, unit:"NTD", note:"首期投入示意"},
        ]
      },
      {
        id:"SEG-A2", gender:"生理男", ageBand:"30-39", jobRisk:2, income:"150萬到300萬", family:"核心家庭",
        needs:["保障型保單","儲蓄型保單"],
        coverages: [
          {type:"醫療(實支)", amount: 1000000, unit:"NTD", note:"年度限額示意"},
          {type:"意外", amount: 2000000, unit:"NTD", note:"身故/失能示意"},
          {type:"壽險(定期)", amount: 5000000, unit:"NTD", note:"家庭責任期示意"},
          {type:"儲蓄/年金", amount: 800000, unit:"NTD", note:"目標準備示意"},
        ]
      },
      {
        id:"SEG-B1", gender:"生理女", ageBand:"20-29", jobRisk:1, income:"70萬到150萬", family:"單人戶",
        needs:["保障型保單","儲蓄型保單"],
        coverages: [
          {type:"醫療(實支)", amount: 800000, unit:"NTD", note:"年度限額示意"},
          {type:"意外", amount: 1500000, unit:"NTD", note:"身故/失能示意"},
          {type:"儲蓄/年金", amount: 500000, unit:"NTD", note:"目標準備示意"},
        ]
      },
      {
        id:"SEG-C1", gender:"生理男", ageBand:"50-59", jobRisk:3, income:"150萬到300萬", family:"夫妻家庭",
        needs:["保障型保單"],
        coverages: [
          {type:"醫療(實支)", amount: 1500000, unit:"NTD", note:"高額自費示意"},
          {type:"重大傷病", amount: 2500000, unit:"NTD", note:"一次金示意"},
          {type:"壽險(定期)", amount: 3000000, unit:"NTD", note:"責任/負債示意"},
        ]
      },
      {
        id:"SEG-D1", gender:"生理男", ageBand:"20-29", jobRisk:5, income:"70萬以下", family:"單人戶",
        needs:["保障型保單"],
        coverages: [
          {type:"意外", amount: 3000000, unit:"NTD", note:"高風險職業示意"},
          {type:"醫療(住院日額)", amount: 2000, unit:"NTD/日", note:"住院日額示意"},
        ]
      },
      {
        id:"SEG-E1", gender:"生理女", ageBand:"60-69", jobRisk:1, income:"70萬到150萬", family:"三代家庭",
        needs:["保障型保單","儲蓄型保單"],
        coverages: [
          {type:"醫療(實支)", amount: 1000000, unit:"NTD", note:"年度限額示意"},
          {type:"長照/失能", amount: 30000, unit:"NTD/月", note:"照護扶助示意"},
          {type:"儲蓄/年金", amount: 600000, unit:"NTD", note:"保守準備示意"},
        ]
      },
    ];

    const BNP_CATALOG = [
      { type:"醫療(實支)", product:"法國巴黎人壽｜醫療實支型方案（示意）", channel:"銀行通路", note:"住院/手術/自費項目相關設計，依條款為準" },
      { type:"醫療(住院日額)", product:"法國巴黎人壽｜住院日額型方案（示意）", channel:"銀行通路", note:"日額給付，注意等待期/除外責任" },
      { type:"意外", product:"法國巴黎人壽｜意外身故/失能＋意外醫療（示意）", channel:"銀行通路", note:"職業等級可能影響保費與承保" },
      { type:"重大傷病", product:"法國巴黎人壽｜重大傷病一次金（示意）", channel:"銀行通路", note:"一次金便於支應重大支出" },
      { type:"壽險(定期)", product:"法國巴黎人壽｜定期壽險（示意）", channel:"銀行通路", note:"家庭責任期常用，保費效率較佳" },
      { type:"長照/失能", product:"法國巴黎人壽｜長照/失能扶助（示意）", channel:"銀行通路", note:"照護風險，注意給付認定與等待期" },
      { type:"儲蓄/年金", product:"法國巴黎人壽｜儲蓄/年金型商品（示意）", channel:"銀行通路", note:"偏穩健資金準備，注意解約費用/期間" },
      { type:"還本型", product:"法國巴黎人壽｜還本型商品（示意）", channel:"銀行通路", note:"返還條件/期間限制要對客說清楚" },
      { type:"投資型", product:"法國巴黎人壽｜投資型保單（示意）", channel:"銀行通路", note:"非存款、不保本；淨值波動與費用會影響帳戶價值" },
    ];

    /** =========================
     *  State + Draft (localStorage)
     * ========================= */
    const DRAFT_KEY = "policy_reco_demo_draft_v1";

    const state = {
      agree:false,
      gender:"",
      ageBand:"",
      jobTitle:"",
      jobRisk:null,
      income:"",
      family:"",
      needs:[]
    };

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    function toast(msg){
      const t = $("#toast");
      t.textContent = msg;
      t.classList.add("show");
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(()=>t.classList.remove("show"), 1600);
    }

    function saveDraft(){
      const payload = {
        ...state,
        __ts: Date.now()
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
      $("#draftState").textContent = "草稿：已自動儲存";
    }

    function loadDraft(){
      try{
        const raw = localStorage.getItem(DRAFT_KEY);
        if(!raw) return;
        const data = JSON.parse(raw);
        // apply
        state.agree = !!data.agree;
        state.gender = data.gender || "";
        state.ageBand = data.ageBand || "";
        state.jobTitle = data.jobTitle || "";
        state.jobRisk = data.jobRisk ?? null;
        state.income = data.income || "";
        state.family = data.family || "";
        state.needs = Array.isArray(data.needs) ? data.needs : [];
        $("#draftState").textContent = "草稿：已載入";
        toast("✅ 已載入上次草稿");
      }catch{}
    }

    /** =========================
     *  Validation + Progress
     * ========================= */
    function validate(){
      return state.agree && state.gender && state.ageBand && state.jobRisk && state.income && state.family;
    }

    function calcProgress(){
      // 必填 6項：agree + gender + ageBand + jobRisk + income + family
      const items = [
        state.agree ? 1 : 0,
        state.gender ? 1 : 0,
        state.ageBand ? 1 : 0,
        state.jobRisk ? 1 : 0,
        state.income ? 1 : 0,
        state.family ? 1 : 0
      ];
      const pct = Math.round((items.reduce((a,b)=>a+b,0) / items.length) * 100);
      return pct;
    }

    function updateProgressSteps(){
      const ok = validate();
      $("#step1").classList.toggle("completed", ok);
      $("#step2").classList.toggle("active", ok);
      if(window.__last){
        $("#step2").classList.add("completed");
        $("#step3").classList.add("active", "completed");
        const hasReport = !$("#reportBox").textContent.includes("尚未生成") && !$("#reportBox").textContent.includes("✅ 已生成");
        if(hasReport){
          $("#step4").classList.add("active", "completed");
        }
      }
    }

    function updateProgressCard(){
      const pct = calcProgress();
      $("#progressPct").textContent = `${pct}%`;
      $("#progressFill").style.width = `${pct}%`;
      $("#previewTag").textContent = validate() ? "可分析" : "未完成";
    }

    function updateLivePreview(){
      const pv = $("#livePreview");
      const fmt = (v)=> v ? `<b>${v}</b>` : "—";
      const needs = state.needs.length ? state.needs.join("、") : "—";
      pv.innerHTML = `
        <div>性別</div><div>${fmt(state.gender)}</div>
        <div>年齡段</div><div>${fmt(state.ageBand)}</div>
        <div>職業</div><div>${fmt(state.jobTitle || "未填")}</div>
        <div>等級</div><div>${fmt(state.jobRisk ? ("等級 " + state.jobRisk) : "")}</div>
        <div>年收入</div><div>${fmt(state.income)}</div>
        <div>家庭</div><div>${fmt(state.family)}</div>
        <div>需求</div><div>${fmt(needs)}</div>
      `;
    }

    /** =========================
     *  Field filled UI
     * ========================= */
    function updateFilledUI(){
      $$(".field").forEach(field => {
        const name = field.dataset.field;
        if(!name) return;
        if(name === "needs"){
          field.classList.toggle("filled", state.needs.length > 0);
          return;
        }
        field.classList.toggle("filled", !!state[name]);
      });
    }

    /** =========================
     *  Buttons state + Hint
     * ========================= */
    function sync(){
      const ok = validate();
      $("#run").disabled = !ok || !!window.__analyzing;
      $("#genReport").disabled = !ok || !window.__last || !!window.__analyzing;
      $("#copyReport").disabled = !window.__last || $("#reportBox").textContent.includes("尚未生成");
      $("#toggleReport").disabled = $("#reportBox").textContent.includes("尚未生成");
      $("#fabCopy").disabled = $("#reportBox").textContent.includes("尚未生成");

      const hint = $("#hint");
      if(ok){
        hint.style.display = "none";
      } else {
        hint.style.display = "block";
        hint.textContent = "⚠️ 請先勾選聲明，並完成：性別、年齡段、職業等級、年收入、家庭結構。";
      }

      updateFilledUI();
      updateProgressCard();
      updateLivePreview();
      updateScenarioTip();
      updateProgressSteps();

      // autosave draft
      saveDraft();
    }

    /** =========================
     *  Option selection
     * ========================= */
    function setPressed(field, value){
      $$(`.option-btn[data-field="${field}"]`).forEach(btn=>{
        const on = btn.dataset.value === value;
        btn.setAttribute("aria-pressed", on ? "true":"false");
      });
      if(field==="jobRisk") state.jobRisk = Number(value);
      else state[field] = value;
      sync();
    }

    function readNeeds(){
      const checks = $$("#needs input[type='checkbox']");
      state.needs = checks.filter(c=>c.checked).map(c=>c.value);
      checks.forEach(c=>c.closest(".checkbox-card").classList.toggle("checked", c.checked));
      sync();
    }

    /** =========================
     *  Job risk inference
     * ========================= */
    function inferJobRisk(jobTitle){
      const t = (jobTitle || "").toLowerCase();
      const high = ["工地","建築","鷹架","鋼構","焊接","礦","油","化工","消防","警察","保全","海巡","軍",
                    "貨車","卡車","司機","外送","機車","重機","高空","電塔","船員","漁","起重",
                    "工人","施工","搬運","倉儲","機械維修","救護"];
      const mid = ["餐飲","廚師","服務生","護理","照服","物流","業務","銷售","教練","美容","美髮","按摩","技術員"];
      const low = ["工程師","會計","行政","文書","人資","法務","金融","銀行","研究","設計","行銷","客服","學生","老師","教授"];
      const hit = (arr)=>arr.some(k=>t.includes(k));
      if(hit(high)) return {level:5, reason:"職業關鍵字顯示高活動/高風險工作型態"};
      if(hit(mid))  return {level:3, reason:"職業型態可能具一定活動與風險暴露"};
      if(hit(low))  return {level:1, reason:"多為室內/相對低風險工作型態"};
      return {level:2, reason:"資訊不足，先以一般等級估計（建議理專再確認工作內容）"};
    }

    function autoSelectJobRisk(level){
      $$(`.option-btn[data-field="jobRisk"]`).forEach(btn=>{
        const on = Number(btn.dataset.value) === Number(level);
        btn.setAttribute("aria-pressed", on ? "true":"false");
      });
      state.jobRisk = Number(level);
    }

    /** =========================
     *  Similarity & aggregation
     * ========================= */
    function overlapScore(a, b){
      if(!a.length || !b.length) return 0;
      const A = new Set(a), B = new Set(b);
      let inter=0;
      for(const x of A) if(B.has(x)) inter++;
      const union = new Set([...A, ...B]).size;
      return inter / union;
    }

    function similarity(user, c){
      let score = 0;
      score += (user.gender === c.gender) ? 1.2 : 0;
      score += (user.ageBand === c.ageBand) ? 1.3 : 0;
      score += (user.income === c.income || user.income==="暫不提供") ? 0.9 : 0;
      score += (user.family === c.family) ? 1.0 : 0;
      score += Math.max(0, 1.2 - 0.35*Math.abs((user.jobRisk||2) - c.jobRisk));
      score += 1.6 * overlapScore(user.needs, c.needs);
      return score;
    }

    function topSimilarCases(user, k=3){
      const scored = CASE_DB.map(c => ({...c, sim: similarity(user, c)}));
      scored.sort((a,b)=>b.sim-a.sim);
      return scored.slice(0,k);
    }

    function median(nums){
      if(!nums.length) return null;
      const a = [...nums].sort((x,y)=>x-y);
      const m = Math.floor(a.length/2);
      return a.length%2 ? a[m] : (a[m-1]+a[m])/2;
    }

    function aggregateCoverage(simCases){
      const map = new Map();
      for(const c of simCases){
        for(const cv of c.coverages){
          const key = `${cv.type}::${cv.unit}`;
          if(!map.has(key)){
            map.set(key, {type: cv.type, unit: cv.unit, amounts:[cv.amount], count:1, weight:c.sim});
          }else{
            const o = map.get(key);
            o.amounts.push(cv.amount);
            o.count += 1;
            o.weight += c.sim;
          }
        }
      }
      return Array.from(map.values())
        .map(o => ({...o, typical: median(o.amounts)}))
        .sort((a,b)=>b.weight-a.weight);
    }

    function pickBnpProduct(type){
      const p = BNP_CATALOG.find(x=>x.type===type);
      if(p) return p;
      const p2 = BNP_CATALOG.find(x=>type.startsWith(x.type.split("(")[0]));
      return p2 || {type, product:"法國巴黎人壽｜（待補商品名）", channel:"銀行通路", note:"請替換成法巴實際商品" };
    }

    function personaTypeBoost(user){
      const wanted = new Set();
      if(user.needs.includes("保障型保單") || user.needs.length===0){
        wanted.add("醫療(實支)");
        wanted.add("意外");
        wanted.add("重大傷病");
      }
      if(["核心家庭","夫妻家庭","單親家庭","三代家庭","祖孫家庭"].includes(user.family)){
        wanted.add("壽險(定期)");
      }
      if((user.jobRisk||0) >= 4) wanted.add("意外");
      if((user.ageBand||"").startsWith("60") || user.ageBand==="70+"){
        wanted.add("長照/失能");
        wanted.add("醫療(實支)");
      }
      if(user.needs.includes("儲蓄型保單")) wanted.add("儲蓄/年金");
      if(user.needs.includes("還本型保單")) wanted.add("還本型");
      if(user.needs.includes("投資型保單")) wanted.add("投資型");
      return wanted;
    }

    function fmtAmount(a, unit){
      if(a==null) return "—";
      if(unit==="NTD"){
        if(a>=1000000) return `${Math.round(a/10000)} 萬`;
        return `${a.toLocaleString()} 元`;
      }
      return `${a.toLocaleString()} ${unit}`;
    }

    /** =========================
     *  Render
     * ========================= */
    function renderSummary(){
      const jobTxt = state.jobTitle ? `｜職業：${state.jobTitle}` : "";
      $("#summary").innerHTML = `
        <strong>基本資料</strong><br>
        ${state.gender}｜${state.ageBand}｜職業等級 ${state.jobRisk}｜${state.income}｜${state.family}${jobTxt}<br>
        <strong>需求</strong>：${state.needs.length?state.needs.join("、"):"未選"}
      `;
    }

    function renderSimilar(simCases){
      const el = $("#similar");
      if(!simCases.length){
        el.innerHTML = `<div class="empty-state">尚未生成</div>`;
        return;
      }
      el.innerHTML = simCases.map((c, idx)=>`
        <div class="result-card">
          <h3>相似輪廓 #${idx+1} <span style="color:var(--primary)">（相似度 ${c.sim.toFixed(2)}）</span></h3>
          <div class="meta">
            ${c.coverages.map(cv=>`• ${cv.type}：${fmtAmount(cv.amount, cv.unit)}（${cv.note||"示意"}）`).join("<br>")}
          </div>
          <div class="tags">
            ${c.coverages.map(cv=>`<span class="tag">${cv.type}</span>`).slice(0,6).join("")}
          </div>
        </div>
      `).join("");
    }

    function renderRecoCards(recoItems){
      const el = $("#reco");
      if(!recoItems.length){
        el.innerHTML = `<div class="empty-state">尚未生成</div>`;
        return;
      }
      el.innerHTML = recoItems.map(r=>{
        const p = pickBnpProduct(r.type);
        return `
          <div class="result-card">
            <h3>${r.type}｜${p.product}</h3>
            <div class="meta">
              建議保額（參考相似族群）：<strong>${fmtAmount(r.typical, r.unit)}</strong><br>
              參考次數：${r.count}｜通路：${p.channel}<br>
              說明：${p.note}
            </div>
            <div class="tags">
              <span class="tag">法巴</span>
              <span class="tag">銀行通路</span>
              <span class="tag">相似個案推導</span>
            </div>
          </div>
        `;
      }).join("");
    }

    function reportPersonaInsights(user){
      const bullets = [];
      if(user.ageBand==="30-39" || user.ageBand==="40-49") bullets.push("處於家庭責任與資產累積階段：建議先盤點保障缺口，再評估儲蓄/投資。");
      if(user.ageBand==="50-59") bullets.push("健康風險上升期：重大傷病一次金與醫療自費支出風險需更被看見。");
      if(user.ageBand.startsWith("60") || user.ageBand==="70+") bullets.push("高齡階段：優先檢視醫療與照護/失能風險，並確認等待期與可承保條件。");
      if((user.jobRisk||0)>=4) bullets.push("職業風險偏高：意外/失能保障建議提高，並確認職業等級承保規則。");
      if(["核心家庭","三代家庭","祖孫家庭","單親家庭"].includes(user.family)) bullets.push("家庭結構顯示扶養/照護責任：可用定期壽險建立責任期的支出風險緩衝。");
      if(user.needs.includes("投資型保單")) bullets.push("有投資型需求：需先確認風險承受度與波動理解（非存款、不保本），並避免挪用保障預算。");
      if(user.needs.includes("還本型保單")) bullets.push("偏好還本型：需清楚說明返還條件/期間/解約費用，避免誤解為保本理財。");
      if(user.needs.includes("儲蓄型保單")) bullets.push("偏好儲蓄/年金：可作資金準備，但仍需先確保基本保障不缺口。");
      if(!bullets.length) bullets.push("建議理專先釐清：客戶優先目標（保障缺口 / 資金準備 / 報酬）與可負擔保費。");
      return bullets;
    }

    function typeDistribution(simCases){
      const m = new Map();
      for(const c of simCases){
        for(const cv of c.coverages){
          m.set(cv.type, (m.get(cv.type)||0) + 1);
        }
      }
      return Array.from(m.entries()).sort((a,b)=>b[1]-a[1]);
    }

    function generateAdvisorReport(user, simCases, recoAgg){
      const needsLine = user.needs.length ? user.needs.join("、") : "未選（建議至少確認保障型需求）";
      const jobLine = user.jobTitle
        ? `職業：${user.jobTitle}（系統估等級 ${user.jobRisk}，建議理專再確認工作內容）`
        : `職業等級：${user.jobRisk}`;
      const dist = typeDistribution(simCases).map(([t,c])=>`- ${t}：出現於 ${c}/3 個相似輪廓`).join("\n");

      const topRecs = recoAgg.slice(0,6).map(r=>{
        const p = pickBnpProduct(r.type);
        return `- ${r.type}：${fmtAmount(r.typical, r.unit)}（${p.product}｜${p.channel}）`;
      }).join("\n");

      const insights = reportPersonaInsights(user).map(x=>`- ${x}`).join("\n");

      const questions = [
        "目前是否已有既有保單？各類保額/附約/等待期/除外責任為何？",
        "家中主要經濟支柱是誰？若發生重大事故，家庭月支出能支撐多久？",
        "醫療自費項目（手術、住院、門急診）是否有備用金？",
        "對『一次金』的偏好（重大傷病/癌症）是否能接受？",
        "若涉及投資型：可接受帳戶價值波動幅度？最在意報酬還是穩定？"
      ].map(q=>`- ${q}`).join("\n");

      const disclaimer =
`【合規提醒（摘要）】
- 本報告為需求分析輔助文件，非承諾給付或核保結果。
- 實際承保、費率、給付條件、等待期、除外責任，以法巴保單條款與核保為準。
- 投資型保單非存款、不保本；費用、匯率與淨值波動會影響帳戶價值。`;

      return `《法國巴黎人壽｜理專需求分析報告（Demo）》

【客戶概況】
- 基本：${user.gender}｜年齡段 ${user.ageBand}｜${user.income}｜${user.family}
- ${jobLine}
- 投保需求偏好：${needsLine}

【相似客群投保輪廓（依 Top 3 相似輪廓彙整）】
${dist}

【建議投保組合（法巴｜示意）】
${topRecs}

【需求推論與建議重點】
${insights}

【建議理專訪談提問（加速定案）】
${questions}

${disclaimer}`;
    }

    function buildTLDR(user, recoAgg){
      const lines = [];
      // 1) priority
      const p1 = user.needs.includes("保障型保單") || user.needs.length===0
        ? "優先順序：先補足【保障缺口】（醫療/意外/重大傷病/壽險責任期）"
        : `優先順序：以客戶偏好【${user.needs.join("、")}】為主，但仍建議檢視基本保障`;
      lines.push(`• ${p1}`);

      // 2) top 2 recs
      const top2 = recoAgg.slice(0,2).map(r=>`${r.type}（${fmtAmount(r.typical, r.unit)}）`).join("、");
      if(top2) lines.push(`• 本次最關鍵建議：${top2}`);

      // 3) risk note
      if((user.jobRisk||0) >= 4) lines.push("• 風險提醒：職業等級偏高，意外/失能與承保條件需優先確認");
      else if((user.ageBand||"").startsWith("60") || user.ageBand==="70+") lines.push("• 風險提醒：高齡族群需特別留意等待期/給付認定與可承保限制");
      else lines.push("• 理專建議：先盤點既有保單，再用差額補齊缺口（避免重複投保或保障不對位）");

      return lines.join("<br/>");
    }

    /** =========================
     *  Tabs + Accordion
     * ========================= */
    function setTab(id){
      $$(".tab").forEach(b=>b.classList.toggle("active", b.dataset.tab===id));
      $$(".tab-panel").forEach(p=>p.classList.toggle("active", p.id===id));
    }

    function bindAccordions(){
      $$(".acc-item .acc-btn").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          btn.parentElement.classList.toggle("open");
        });
      });
    }

    /** =========================
     *  Scenario tip (即時提示)
     *  用部分條件找「大致相近」樣本，再看 needs 分佈
     * ========================= */
    function partialMatchScore(u, c){
      let s = 0, w = 0;
      if(u.gender){ w+=1; if(u.gender===c.gender) s+=1; }
      if(u.ageBand){ w+=1; if(u.ageBand===c.ageBand) s+=1; }
      if(u.family){ w+=1; if(u.family===c.family) s+=1; }
      if(u.income && u.income!=="暫不提供"){ w+=1; if(u.income===c.income) s+=1; }
      if(u.jobRisk){ w+=1; s += Math.max(0, 1 - 0.25*Math.abs(u.jobRisk - c.jobRisk)); }
      return w===0 ? 0 : s/w;
    }

    function updateScenarioTip(){
      const el = $("#scenarioTip");

      const filledAny = state.gender || state.ageBand || state.family || state.income || state.jobRisk;
      if(!filledAny){
        el.innerHTML = `先完成基本資料，系統會根據相似客群資料庫，提供「像您這樣的客戶通常會先做什麼」的提示。`;
        return;
      }

      // pick top matches by partial score
      const scored = CASE_DB
        .map(c=>({c, s: partialMatchScore(state, c)}))
        .sort((a,b)=>b.s-a.s)
        .slice(0, 5)
        .filter(x=>x.s>0);

      if(!scored.length){
        el.innerHTML = `目前資料不足以形成穩定輪廓。建議先補齊：年齡段、職業等級與家庭結構。`;
        return;
      }

      const counts = new Map();
      let total = 0;
      for(const x of scored){
        for(const n of x.c.needs){
          counts.set(n, (counts.get(n)||0) + 1);
          total += 1;
        }
      }

      const entries = Array.from(counts.entries()).sort((a,b)=>b[1]-a[1]);
      const top = entries[0];
      if(!top){
        el.innerHTML = `像您這樣的客戶多半會先確認「保障缺口」與保費可負擔性。`;
        return;
      }
      const pct = Math.round((top[1] / total) * 100);

      el.innerHTML = `
        像您這樣的客戶，<b>${pct}%</b> 在第一輪會優先考慮 <b>${top[0]}</b>。<br/>
        建議操作：先完成分析 → 再到「建議方案」頁看保額落點；若不確定需求，可按「不確定？幫我推薦」。
      `;
    }

    /** =========================
     *  Auto needs (不確定？幫我推薦)
     * ========================= */
    function recommendNeeds(u){
      const set = new Set();
      // 基本：若資料不足，先勾保障型
      if(!u.ageBand || !u.family || !u.jobRisk) {
        set.add("保障型保單");
        return Array.from(set);
      }

      // 高齡/家庭責任/職業風險 → 保障型
      set.add("保障型保單");
      if((u.ageBand||"").startsWith("60") || u.ageBand==="70+") set.add("儲蓄型保單");
      if(["核心家庭","夫妻家庭","單親家庭","三代家庭","祖孫家庭"].includes(u.family)) set.add("保障型保單");

      // 高收入偏向資產配置：可加投資型/儲蓄型（demo）
      if(u.income==="300萬以上") set.add("投資型保單");
      if(u.income==="150萬到300萬") set.add("儲蓄型保單");

      // 若選「暫不提供」：保守一點
      if(u.income==="暫不提供") set.add("儲蓄型保單");

      return Array.from(set);
    }

    function applyNeeds(values){
      const checks = $$("#needs input[type='checkbox']");
      checks.forEach(c=>{
        c.checked = values.includes(c.value);
      });
      readNeeds();
    }

    /** =========================
     *  Loader simulation
     * ========================= */
    async function runAnalysisWithLoader(fn){
      window.__analyzing = true;
      $("#loader").classList.add("show");
      $("#loaderFill").style.width = "0%";
      $("#loaderPct").textContent = "0%";
      sync();

      let p = 0;
      const timer = setInterval(()=>{
        p = Math.min(100, p + (Math.random()*18 + 6));
        $("#loaderFill").style.width = `${p}%`;
        $("#loaderPct").textContent = `${Math.round(p)}%`;
      }, 120);

      // simulate compute time
      await new Promise(r=>setTimeout(r, 1100));
      clearInterval(timer);
      $("#loaderFill").style.width = "100%";
      $("#loaderPct").textContent = "100%";

      await new Promise(r=>setTimeout(r, 180));
      $("#loader").classList.remove("show");
      window.__analyzing = false;

      fn();
      sync();
    }

    /** =========================
     *  Events
     * ========================= */
    $("#agree").addEventListener("change", e=>{
      state.agree = e.target.checked;
      sync();
    });

    $$(".option-btn[data-field]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        setPressed(btn.dataset.field, btn.dataset.value);
      });
    });

    $$("#needs input[type='checkbox']").forEach(c=>{
      c.addEventListener("change", readNeeds);
    });

    $("#autoNeeds").addEventListener("click", ()=>{
      applyNeeds(recommendNeeds(state));
      toast("✨ 已依情境推薦需求");
    });

    $("#jobTitle").addEventListener("input", e=>{
      state.jobTitle = e.target.value || "";
      const r = inferJobRisk(state.jobTitle);
      $("#jobHint").innerHTML = `系統判斷：<strong>等級 ${r.level}</strong>（${r.reason}）<br><span style="color:var(--text-muted);font-size:11px;">可直接手動改等級，系統會以你手動選的為準。</span>`;
      autoSelectJobRisk(r.level);
      sync();
    });

    // Tabs
    $$(".tab").forEach(b=>{
      b.addEventListener("click", ()=> setTab(b.dataset.tab));
    });

    // Report collapse
    $("#toggleReport").addEventListener("click", ()=>{
      const box = $("#reportBox");
      if(box.style.maxHeight === "420px" || !box.style.maxHeight){
        box.style.maxHeight = "none";
      }else{
        box.style.maxHeight = "420px";
      }
    });

    // Main analysis
    $("#run").addEventListener("click", async ()=>{
      await runAnalysisWithLoader(()=>{
        renderSummary();

        const simCases = topSimilarCases(state, 3);
        renderSimilar(simCases);

        const agg = aggregateCoverage(simCases);
        const wanted = personaTypeBoost(state);
        for(const t of wanted){
          const exists = agg.some(x=>x.type===t);
          if(!exists) agg.push({type:t, unit:"NTD", amounts:[], typical:null, count:0, weight:0.01});
        }
        agg.sort((a,b)=>b.weight-a.weight);
        const recoAgg = agg.slice(0,6);
        renderRecoCards(recoAgg);

        window.__last = { simCases, recoAgg };

        $("#reportBox").textContent = "✅ 已生成相似輪廓與建議方案。切到「理專報告」分頁後再按「生成理專報告」。";
        $("#tldr").style.display = "none";
        $("#toggleReport").disabled = true;

        // switch to reco tab
        setTab("t-reco");
        toast("✅ 已完成分析並產生推薦");
      });
    });

    $("#genReport").addEventListener("click", async ()=>{
      if(!window.__last){
        $("#reportBox").textContent = "❌ 請先按「分析並產生推薦方案」。";
        return;
      }
      const {simCases, recoAgg} = window.__last;

      await runAnalysisWithLoader(()=>{
        const text = generateAdvisorReport(state, simCases, recoAgg);
        $("#reportBox").textContent = text;

        $("#tldrText").innerHTML = buildTLDR(state, recoAgg);
        $("#tldr").style.display = "block";
        $("#toggleReport").disabled = false;

        // show floating bar
        $("#fab").classList.add("show");

        setTab("t-report");
        toast("📝 已生成理專報告");
      });
    });

    async function copyReport(){
      const text = $("#reportBox").textContent || "";
      if(!text || text.includes("尚未生成")){
        alert("請先生成理專報告。");
        return;
      }
      try{
        await navigator.clipboard.writeText(text);
        toast("📋 已複製報告");
      }catch{
        alert("複製失敗：瀏覽器可能限制 clipboard。你可以手動全選報告文字複製。");
      }
    }

    $("#copyReport").addEventListener("click", copyReport);
    $("#fabCopy").addEventListener("click", copyReport);

    $("#fabPrint").addEventListener("click", ()=>{
      // 用列印另存 PDF（不需要外部套件，GitHub Pages 也穩）
      window.print();
    });

    $("#fabShare").addEventListener("click", async ()=>{
      const url = location.href;
      const text = "法國巴黎人壽｜智能保單推薦系統 Demo（相似個案 + 理專報告）";
      if(navigator.share){
        try{
          await navigator.share({title: document.title, text, url});
          toast("🔗 已分享");
        }catch{}
      }else{
        try{
          await navigator.clipboard.writeText(url);
          toast("🔗 已複製網址（此瀏覽器不支援分享）");
        }catch{
          alert("此瀏覽器不支援分享/複製，請手動複製網址。");
        }
      }
    });

    $("#reset").addEventListener("click", ()=>{
      // reset state
      state.agree=false; state.gender=""; state.ageBand="";
      state.jobTitle=""; state.jobRisk=null; state.income=""; state.family=""; state.needs=[];
      window.__last = null;

      $("#agree").checked=false;
      $("#jobTitle").value="";
      $("#jobHint").innerHTML = `系統判斷：<strong>尚未判斷</strong>`;

      $$(".option-btn[data-field]").forEach(btn=>btn.setAttribute("aria-pressed","false"));
      $$("#needs input[type='checkbox']").forEach(c=>c.checked=false);
      readNeeds();

      $("#summary").innerHTML = `<div class="empty-state">尚未生成</div>`;
      $("#similar").innerHTML = `<div class="empty-state">尚未生成</div>`;
      $("#reco").innerHTML = `<div class="empty-state">尚未生成</div>`;
      $("#reportBox").textContent = "尚未生成";
      $("#tldr").style.display = "none";

      // reset steps
      $$(".step").forEach(step => step.classList.remove("active","completed"));
      $("#step1").classList.add("active");

      // hide fab
      $("#fab").classList.remove("show");

      // clear draft
      localStorage.removeItem(DRAFT_KEY);
      $("#draftState").textContent = "草稿：未儲存";

      setTab("t-sim");
      toast("🔄 已清除並重填");
      sync();
    });

    /** =========================
     *  Init
     * ========================= */
    bindAccordions();
    loadDraft();

    // apply draft to UI
    $("#agree").checked = state.agree;

    function applyPressed(field, value){
      if(!value) return;
      $$(`.option-btn[data-field="${field}"]`).forEach(btn=>{
        btn.setAttribute("aria-pressed", btn.dataset.value===value ? "true":"false");
      });
    }
    applyPressed("gender", state.gender);
    applyPressed("ageBand", state.ageBand);
    applyPressed("income", state.income);
    applyPressed("family", state.family);
    if(state.jobRisk) applyPressed("jobRisk", String(state.jobRisk));

    $("#jobTitle").value = state.jobTitle || "";
    if(state.jobTitle){
      const r = inferJobRisk(state.jobTitle);
      $("#jobHint").innerHTML = `系統判斷：<strong>等級 ${r.level}</strong>（${r.reason}）<br><span style="color:var(--text-muted);font-size:11px;">可直接手動改等級，系統會以你手動選的為準。</span>`;
      // keep draft jobRisk if exists; else auto
      if(!state.jobRisk) autoSelectJobRisk(r.level);
    }

    // needs apply
    if(state.needs.length){
      applyNeeds(state.needs);
    }

    sync();