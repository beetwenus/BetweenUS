/* BETWEEN US v2.1 — THE BRIDGE
   Same-device, turn-by-turn conversation. No server or account required. */
(() => {
  'use strict';
  const STORAGE_KEY = 'betweenUsV21_bridgeSessions';
  const QUESTIONS = [
    ['What happened?', 'Describe what took place, focusing on what you know.'],
    ['How did it make you feel?', 'Name the feelings that came up for you.'],
    ['What did you need?', 'What would have helped in that moment?'],
    ['What do you wish your partner understood?', 'What feels important for them to hear?'],
    ['What would you like to improve?', 'Name something you would like to handle differently.']
  ];
  const STEPS = ['Start', 'Person A', 'Person B', 'Share consent', 'Perspective reveal', 'Understanding', 'Common ground', 'Our agreement', 'Summary'];
  const q = (selector, root=document) => root.querySelector(selector);
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const makeId = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `bridge-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const readSaved = () => { try { const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); return Array.isArray(data)?data:[]; } catch { return []; } };
  const writeSaved = records => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); return true; } catch { return false; } };
  const dialog = () => q('#v2ToolDialog');
  const content = () => q('#v2ToolDialogContent');
  let session = null;
  let paused = false;
  let savedId = null;

  function newSession() {
    return { id:makeId(), title:`Conversation · ${new Date().toLocaleDateString()}`, createdAt:Date.now(), updatedAt:Date.now(), step:0,
      a:Array(5).fill(''), b:Array(5).fill(''), consentA:false, consentB:false, ackA:false, ackB:false,
      understandingA:'', understandingB:'', clarifyA:'', clarifyB:'',
      common:{agree:'',different:'',needs:'',improve:'',solutions:'',future:''},
      agreement:{a:'',b:'',together:'',review:''}, confirmedA:false, confirmedB:false, summaryText:'', summaryEdited:false };
  }
  function toast(message) {
    const el=q('#toast');
    if (el) { el.textContent=message; el.classList.add('show'); window.clearTimeout(toast.timer); toast.timer=window.setTimeout(()=>el.classList.remove('show'),2600); }
  }
  function showDialog() { const el=dialog(); if (!el) return; if (!el.open) el.showModal(); }
  function persist(quiet=false) {
    if (!session) return false;
    session.updatedAt=Date.now();
    const all=readSaved();
    const at=all.findIndex(item=>item.id===session.id);
    if (at>=0) all[at]=session; else all.unshift(session);
    const ok=writeSaved(all);
    if (ok) { savedId=session.id; if (!quiet) toast('Conversation saved on this device.'); }
    else toast('Could not save. Your browser may have storage disabled or full.');
    return ok;
  }
  function removeSaved(id) {
    if (!confirm('Delete this saved Bridge conversation from this browser? This cannot be undone.')) return;
    writeSaved(readSaved().filter(item=>item.id!==id));
    if (session?.id===id) { session=null; savedId=null; }
    renderHome(); toast('Saved conversation deleted.');
  }
  function progressMarkup() {
    return `<div class="bridge-stepbar" role="progressbar" aria-label="Conversation progress" aria-valuemin="1" aria-valuemax="${STEPS.length}" aria-valuenow="${session.step+1}">${STEPS.map((_,i)=>`<span class="${i<=session.step?'done':''}"></span>`).join('')}</div><div class="bridge-step-meta"><span>${escapeHTML(STEPS[session.step])}</span><span>Step ${session.step+1} of ${STEPS.length}</span></div>`;
  }
  function stepButtons() {
    const movement = session.step===3
      ? `<button class="button button-primary button-small" type="button" data-bridge="reveal" ${session.consentA&&session.consentB?'':'disabled'}>Reveal both perspectives →</button>`
      : `<button class="button button-primary button-small" type="button" data-bridge="next">${session.step===8?'Finish':'Continue'} →</button>`;
    return `<div class="bridge-step-actions"><button class="button button-outline button-small" type="button" data-bridge="back" ${session.step===0?'disabled':''}>Back</button>${movement}</div><div class="bridge-controls"><button class="button button-outline button-small" type="button" data-bridge="save">Save progress</button><button class="button button-outline button-small" type="button" data-bridge="pause">Pause conversation</button><button class="button button-outline button-small" type="button" data-bridge="restart">Restart</button><button class="button button-outline button-small" type="button" data-bridge="exit">Exit without saving</button><button class="button button-outline button-small" type="button" data-bridge="clear">Clear all responses</button></div>`;
  }
  function privacyNote() {
    return `<div class="bridge-privacy"><strong>Same-device privacy:</strong> Both people use this device and browser, taking turns. Responses are stored in this browser only when you save. They are not encrypted, password-protected, or synced to another device. Do not enter details you would not want someone with access to this device to see. This activity never reads or shares entries from the separate reflection journal.</div>`;
  }
  function renderHome() {
    session=null; paused=false; savedId=null;
    const records=readSaved().sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    content().innerHTML=`<div class="eyebrow">BETWEEN US · SIGNATURE EXPERIENCE</div><h2 id="v2ToolTitle">THE BRIDGE</h2><p class="v2-tool-lead">Two perspectives. One conversation. A chance to understand each other.</p><div class="bridge-modal-intro">A structured, unhurried conversation to help two people work through a misunderstanding, disagreement, or communication problem. The Bridge does not decide who is right. It helps both people listen and choose their next steps voluntarily.</div>${privacyNote()}<div class="v2-tool-actions"><button class="button button-primary button-small" type="button" data-bridge="start">Start a conversation</button><button class="button button-outline button-small" type="button" data-bridge="how">How it works</button></div>${records.length?`<h3 style="margin:25px 0 8px;font-size:17px">Continue a saved conversation</h3>${records.map(item=>`<div class="bridge-saved-item"><div><strong>${escapeHTML(item.title||'Saved conversation')}</strong><small>Updated ${new Date(item.updatedAt||Date.now()).toLocaleString()}</small></div><div class="bridge-saved-actions"><button class="button button-outline button-small" type="button" data-bridge-load="${escapeHTML(item.id)}">Continue</button><button class="button button-outline button-small" type="button" data-bridge-delete="${escapeHTML(item.id)}" aria-label="Delete ${escapeHTML(item.title||'saved conversation')}">Delete</button></div></div>`).join('')}`:`<p class="bridge-muted" style="margin-top:22px">No saved conversations yet. Start a new conversation whenever both people are ready.</p>`}`;
  }
  function renderHow() {
    content().innerHTML=`<div class="eyebrow">THE BRIDGE · HOW IT WORKS</div><h2 id="v2ToolTitle">A conversation, one turn at a time.</h2><ol><li><strong>Person A writes first.</strong> Their answers remain hidden while Person B takes a turn.</li><li><strong>Person B answers independently.</strong> Person A's responses are not shown.</li><li><strong>Both people choose whether to reveal.</strong> Both consent boxes must be checked before the perspectives appear.</li><li><strong>Reflect and clarify.</strong> Each person writes what they understood and the other can confirm or clarify.</li><li><strong>Find common ground.</strong> Record agreements and differences without forcing a solution.</li><li><strong>Create an optional plan.</strong> Each person can choose actions and confirm voluntarily.</li></ol>${privacyNote()}<button class="button button-primary button-small" type="button" data-bridge="home">Back</button>`;
  }
  function renderPerson(person) {
    const key=person.toLowerCase();
    return `<section class="bridge-person-panel ${person==='B'?'person-b':''}"><h3>Person ${person}'s perspective</h3><p>${person==='A'?'Person A takes the device first. Person B should not read these responses while completing their own turn.':'Person B now takes the device. Person A’s answers remain hidden until both people voluntarily agree to reveal them.'}</p>${QUESTIONS.map(([question,hint],i)=>`<label class="bridge-field"><span>${i+1}. ${escapeHTML(question)}</span><textarea rows="3" data-bridge-answer="${key}:${i}" placeholder="${escapeHTML(hint)}">${escapeHTML(session[key][i])}</textarea></label>`).join('')}</section>`;
  }
  function renderRevealConsent() {
    return `<div class="eyebrow">STEP 4 · SHARED CHOICE</div><h2 id="v2ToolTitle">Are you both ready to share?</h2><p class="v2-tool-lead">The answers are still hidden. Each person should read this screen and choose freely. The perspectives will only appear after both boxes are checked and you press Reveal both perspectives.</p><div class="bridge-consent-row"><label><input type="checkbox" data-bridge-consent="A" ${session.consentA?'checked':''}> <span><strong>Person A:</strong> I am comfortable sharing my answers with Person B now.</span></label><label><input type="checkbox" data-bridge-consent="B" ${session.consentB?'checked':''}> <span><strong>Person B:</strong> I am comfortable sharing my answers with Person A now.</span></label></div>${privacyNote()}<p class="bridge-muted">Use Back to return to Person B's turn, or choose Reveal only after both people consent.</p>`;
  }
  function renderReveal() {
    return `<div class="eyebrow">STEP 5 · PERSPECTIVE REVEAL</div><h2 id="v2ToolTitle">Two perspectives, side by side.</h2><p class="v2-tool-lead">Take turns reading. Try to understand before responding. You do not have to agree with every detail.</p><div class="bridge-reveal-grid">${['A','B'].map(person=>`<section class="bridge-answer-card ${person==='B'?'person-b':''}"><h4>PERSON ${person}</h4>${QUESTIONS.map(([question],i)=>`<p><strong>${escapeHTML(question)}</strong><br>${escapeHTML(session[person.toLowerCase()][i]||'No response entered.')}</p>`).join('')}</section>`).join('')}</div><div class="bridge-consent-row"><label><input type="checkbox" data-bridge-ack="A" ${session.ackA?'checked':''}> <span>Person A: I have read Person B's perspective and considered what they shared.</span></label><label><input type="checkbox" data-bridge-ack="B" ${session.ackB?'checked':''}> <span>Person B: I have read Person A's perspective and considered what they shared.</span></label></div><p class="bridge-muted">Both acknowledgements are needed to move to the understanding check. You can go back or pause instead.</p>`;
  }
  function renderSummaryText() {
    const s=session;
    const list=(who,answers)=>`${who}\n${QUESTIONS.map(([label],i)=>`${label}\n${answers[i]||'Not answered.'}`).join('\n\n')}`;
    return `THE BRIDGE — CONVERSATION SUMMARY\n${s.title}\n\nORIGINAL CONCERN\n${s.a[0]||s.b[0]||'Not specified.'}\n\n${list("PERSON A'S PERSPECTIVE",s.a)}\n\n${list("PERSON B'S PERSPECTIVE",s.b)}\n\nSHARED UNDERSTANDING\nPerson A: ${s.understandingA||'Not added.'}\nPerson B: ${s.understandingB||'Not added.'}\nPerson A clarification: ${s.clarifyA||'Not added.'}\nPerson B clarification: ${s.clarifyB||'Not added.'}\n\nCOMMON GROUND\nThings we agree on: ${s.common.agree||'Not added.'}\nThings we understand differently: ${s.common.different||'Not added.'}\nWhat each person needs: ${s.common.needs||'Not added.'}\nWhat each person can improve: ${s.common.improve||'Not added.'}\nPossible solutions: ${s.common.solutions||'Not added.'}\nQuestions or topics to revisit later: ${s.common.future||'Not added.'}\n\nAGREED ACTIONS\nPerson A: ${s.agreement.a||'Not added.'}\nPerson B: ${s.agreement.b||'Not added.'}\nTogether: ${s.agreement.together||'Not added.'}\nReview timing: ${s.agreement.review||'Not set.'}\nPerson A voluntarily confirmed: ${s.confirmedA?'Yes':'No'}\nPerson B voluntarily confirmed: ${s.confirmedB?'Yes':'No'}\n\nFUTURE DISCUSSION POINTS\n${s.common.future||s.common.different||'None recorded.'}\n\nThis summary records what participants entered. It does not decide who is right or wrong.`;
  }
  function renderStep() {
    if (!session) return renderHome();
    if (paused) {
      content().innerHTML=`<div class="eyebrow">THE BRIDGE · PAUSED</div><h2 id="v2ToolTitle">Take the time you need.</h2><p class="v2-tool-lead">The conversation is paused. You can resume now, save progress for later, or exit.</p><div class="v2-tool-actions"><button class="button button-primary button-small" type="button" data-bridge="resume">Resume conversation</button><button class="button button-outline button-small" type="button" data-bridge="save">Save progress</button><button class="button button-outline button-small" type="button" data-bridge="exit">Exit without saving</button></div>`;
      return;
    }
    const step=session.step;
    let body='';
    if (step===0) body=`<div class="eyebrow">THE BRIDGE · BEGIN</div><h2 id="v2ToolTitle">Start with curiosity.</h2><p class="v2-tool-lead">Choose a calm moment. Both people can pause or leave at any time. There is no requirement to agree or reach a solution today.</p><div class="bridge-modal-intro">${escapeHTML('Two perspectives. One conversation. A chance to understand each other.')}</div><label class="bridge-field"><span>Conversation title (optional)</span><input type="text" maxlength="90" data-bridge-title value="${escapeHTML(session.title)}"></label>${privacyNote()}`;
    if (step===1) body=`<div class="eyebrow">STEP 2 · PERSON A</div><h2 id="v2ToolTitle">Person A's perspective</h2><p class="v2-tool-lead">Write what feels important to you. You can leave any question blank.</p>${renderPerson('A')}`;
    if (step===2) body=`<div class="eyebrow">STEP 3 · PERSON B</div><h2 id="v2ToolTitle">Person B's perspective</h2><p class="v2-tool-lead">Person A's responses are hidden on this screen. Take your own turn and describe your experience in your words.</p>${renderPerson('B')}`;
    if (step===3) body=renderRevealConsent();
    if (step===4) body=renderReveal();
    if (step===5) body=`<div class="eyebrow">STEP 6 · UNDERSTANDING CHECK</div><h2 id="v2ToolTitle">Reflect what you heard.</h2><p class="v2-tool-lead">Each person describes what they understood from the other's perspective. The other person can confirm or clarify.</p><label class="bridge-field"><span>Person A: “What I understand from your perspective is…”</span><textarea rows="3" data-bridge-text="understandingA">${escapeHTML(session.understandingA)}</textarea></label><label class="bridge-field"><span>Person B: confirm or clarify what Person A understood</span><textarea rows="3" data-bridge-text="clarifyB">${escapeHTML(session.clarifyB)}</textarea></label><label class="bridge-field"><span>Person B: “What I understand from your perspective is…”</span><textarea rows="3" data-bridge-text="understandingB">${escapeHTML(session.understandingB)}</textarea></label><label class="bridge-field"><span>Person A: confirm or clarify what Person B understood</span><textarea rows="3" data-bridge-text="clarifyA">${escapeHTML(session.clarifyA)}</textarea></label>`;
    if (step===6) body=`<div class="eyebrow">STEP 7 · FIND COMMON GROUND</div><h2 id="v2ToolTitle">What can you understand together?</h2><p class="v2-tool-lead">Differences are allowed. Record what you agree on and what still needs conversation.</p>${[['agree','Things we agree on'],['different','Things we understand differently'],['needs','What each person needs'],['improve','What each person can improve'],['solutions','Possible solutions (only if they feel fair to both)'],['future','Questions or topics to revisit later']].map(([key,label])=>`<label class="bridge-field"><span>${label}</span><textarea rows="3" data-bridge-common="${key}">${escapeHTML(session.common[key])}</textarea></label>`).join('')}`;
    if (step===7) body=`<div class="eyebrow">STEP 8 · OUR AGREEMENT</div><h2 id="v2ToolTitle">Small, voluntary next steps.</h2><p class="v2-tool-lead">Only include actions each person genuinely wants to take. Leave anything blank if you are not ready.</p>${[['a','What Person A will work on'],['b','What Person B will work on'],['together','What both people will work on together'],['review','When will you review your progress?']].map(([key,label])=>`<label class="bridge-field"><span>${label}</span><textarea rows="2" data-bridge-agreement="${key}">${escapeHTML(session.agreement[key])}</textarea></label>`).join('')}<div class="bridge-consent-row"><label><input type="checkbox" data-bridge-confirm="A" ${session.confirmedA?'checked':''}> <span>Person A voluntarily confirms these actions.</span></label><label><input type="checkbox" data-bridge-confirm="B" ${session.confirmedB?'checked':''}> <span>Person B voluntarily confirms these actions.</span></label></div><p class="bridge-muted">Confirmation is optional. This is not a contract, and neither person is required to accept an action plan.</p>`;
    if (step===8) {
      const summary=session.summaryEdited?session.summaryText:renderSummaryText();
      body=`<div class="eyebrow">STEP 9 · CONVERSATION SUMMARY</div><h2 id="v2ToolTitle">A record of what you discussed.</h2><p class="v2-tool-lead">Review and edit the summary. Save it on this device, copy it, or delete the saved record when you're done.</p><label class="bridge-field"><span>Editable conversation summary</span><textarea class="bridge-summary" rows="19" data-bridge-summary>${escapeHTML(summary)}</textarea></label><div class="v2-tool-actions"><button class="button button-outline button-small" type="button" data-bridge="copy">Copy summary</button><button class="button button-primary button-small" type="button" data-bridge="save">Save conversation</button><button class="button button-outline button-small" type="button" data-bridge="home">Finish</button><button class="button button-outline button-small" type="button" data-bridge="delete-current">Delete conversation</button></div><div class="bridge-controls"><button class="button button-outline button-small" type="button" data-bridge="pause">Pause conversation</button><button class="button button-outline button-small" type="button" data-bridge="restart">Restart</button><button class="button button-outline button-small" type="button" data-bridge="clear">Clear all responses</button><button class="button button-outline button-small" type="button" data-bridge="exit">Exit without saving</button></div>`;
    }
    content().innerHTML=`<div class="eyebrow">BETWEEN US · THE BRIDGE</div>${progressMarkup()}${body}${step<8?stepButtons():''}<p class="bridge-muted" style="margin-top:14px">Same-device mode · Local browser storage only · Not encrypted · Not synced between devices.</p>`;
  }
  function collect() {
    if (!session) return;
    const title=q('[data-bridge-title]'); if(title) session.title=title.value.trim()||'Conversation';
    content().querySelectorAll('[data-bridge-answer]').forEach(el=>{const [person,index]=el.dataset.bridgeAnswer.split(':');session[person][Number(index)]=el.value;});
    content().querySelectorAll('[data-bridge-consent]').forEach(el=>{session[`consent${el.dataset.bridgeConsent}`]=el.checked;});
    content().querySelectorAll('[data-bridge-ack]').forEach(el=>{session[`ack${el.dataset.bridgeAck}`]=el.checked;});
    content().querySelectorAll('[data-bridge-text]').forEach(el=>{session[el.dataset.bridgeText]=el.value;});
    content().querySelectorAll('[data-bridge-common]').forEach(el=>{session.common[el.dataset.bridgeCommon]=el.value;});
    content().querySelectorAll('[data-bridge-agreement]').forEach(el=>{session.agreement[el.dataset.bridgeAgreement]=el.value;});
    content().querySelectorAll('[data-bridge-confirm]').forEach(el=>{session[`confirmed${el.dataset.bridgeConfirm}`]=el.checked;});
    const summary=q('[data-bridge-summary]'); if(summary){session.summaryText=summary.value;session.summaryEdited=true;}
    session.updatedAt=Date.now();
  }
  function validateStep() {
    if (session.step===1 && !session.a.some(value=>value.trim())) { toast('Person A can add at least one response before continuing.'); return false; }
    if (session.step===2 && !session.b.some(value=>value.trim())) { toast('Person B can add at least one response before continuing.'); return false; }
    if (session.step===3 && !(session.consentA && session.consentB)) { toast('Both people must choose to share before the perspectives are revealed.'); return false; }
    if (session.step===4 && !(session.ackA && session.ackB)) { toast('Both people should acknowledge that they have read the other perspective.'); return false; }
    return true;
  }
  function openBridge() { showDialog(); renderHome(); }
  function navigate(step) { collect(); session.step=Math.max(0,Math.min(8,step)); paused=false; renderStep(); }
  function downloadCopy(text) {
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(()=>toast('Summary copied.')).catch(()=>toast('Clipboard access is unavailable. You can select and copy the text manually.'));
    else { const area=q('[data-bridge-summary]'); if(area){area.focus();area.select();toast('Select and copy the highlighted summary.');} else toast('Clipboard access is unavailable in this browser.'); }
  }
  function onBridgeAction(event) {
    const load=event.target.closest('[data-bridge-load]');
    if (load) { event.preventDefault();event.stopImmediatePropagation();const found=readSaved().find(item=>item.id===load.dataset.bridgeLoad);if(found){session=JSON.parse(JSON.stringify(found));savedId=found.id;if(session.step===3){session.consentA=false;session.consentB=false;}paused=false;showDialog();renderStep();}return; }
    const del=event.target.closest('[data-bridge-delete]');
    if (del) { event.preventDefault();event.stopImmediatePropagation();removeSaved(del.dataset.bridgeDelete);return; }
    const button=event.target.closest('[data-bridge]'); if(!button)return;
    event.preventDefault();event.stopImmediatePropagation();
    const action=button.dataset.bridge;
    if(action==='start'){session=newSession();savedId=null;paused=false;renderStep();}
    else if(action==='how')renderHow();
    else if(action==='home'){collect();renderHome();}
    else if(action==='back'){if(session.step===4)session.step=3;else session.step=Math.max(0,session.step-1);renderStep();}
    else if(action==='back-to-b'){session.step=2;renderStep();}
    else if(action==='next'){collect();if(!validateStep())return;if(session.step<8){session.step++;renderStep();}else{persist(true);renderHome();toast('Conversation completed.');}}
    else if(action==='reveal'){collect();if(session.consentA&&session.consentB){session.step=4;renderStep();}else toast('Both people must consent before revealing responses.');}
    else if(action==='save'){collect();persist();}
    else if(action==='pause'){collect();paused=true;renderStep();}
    else if(action==='resume'){paused=false;renderStep();}
    else if(action==='restart'){if(confirm('Restart this conversation? All current answers will be cleared.')){const previousId=session.id;const wasSaved=savedId===previousId;session=newSession();session.id=previousId;savedId=wasSaved?previousId:null;paused=false;renderStep();}}
    else if(action==='clear'){if(confirm('Clear all responses in this conversation? This cannot be undone unless you saved an earlier copy.')){const previousId=session.id;const wasSaved=savedId===previousId;session=newSession();session.id=previousId;savedId=wasSaved?previousId:null;renderStep();}}
    else if(action==='exit'){if(confirm('Exit without saving the changes from this session? Unsaved changes will be discarded.')){session=null;paused=false;savedId=null;renderHome();}}
    else if(action==='copy'){collect();downloadCopy(session.summaryEdited?session.summaryText:renderSummaryText());}
    else if(action==='delete-current'){if(session && savedId)removeSaved(session.id);else if(confirm('Discard this conversation and return to the start?')){session=null;paused=false;renderHome();}}
  }
  // Capture the Bridge's controls before the existing toolbox event delegation.
  document.addEventListener('click', event=>{
    const launch=event.target.closest('[data-open-tool="bridge"]');
    if(launch){event.preventDefault();event.stopImmediatePropagation();openBridge();return;}
    onBridgeAction(event);
  },true);
  document.addEventListener('input', event=>{if(event.target.matches('[data-bridge-answer],[data-bridge-title],[data-bridge-text],[data-bridge-common],[data-bridge-agreement],[data-bridge-summary]'))collect();});
  document.addEventListener('change', event=>{if(event.target.matches('[data-bridge-consent],[data-bridge-ack],[data-bridge-confirm]')){collect();if(session?.step===3){const reveal=q('[data-bridge="reveal"]');if(reveal)reveal.disabled=!(session.consentA&&session.consentB);}}});
  document.addEventListener('keydown', event=>{if(event.key==='Escape' && dialog()?.open){/* Native dialog handles close; session stays only if explicitly saved. */}});
})();
