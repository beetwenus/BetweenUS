'use strict';

/* BETWEEN US v2 — local-only interactive tools and dashboard. */
(() => {
  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const PREFIX = 'betweenUsV2_';
  const KEYS = {
    moods: PREFIX + 'moods', goals: PREFIX + 'goals', plans: PREFIX + 'plans',
    challenges: PREFIX + 'challenges', favorites: PREFIX + 'favorites', weekly: PREFIX + 'weekly',
    activity: PREFIX + 'activity', style: PREFIX + 'style', quality: PREFIX + 'quality',
    appreciation: PREFIX + 'appreciation'
  };
  const read = (key, fallback = []) => {
    try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value ?? fallback; }
    catch { return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { toast('Saving is unavailable. Check this browser’s storage settings or free space.'); return false; }
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const makeId = () => (window.crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
  const stamp = () => Date.now();
  const niceDate = value => { try { return new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); } catch { return ''; } };
  const toast = message => {
    const el = q('#toast');
    if (!el) return;
    el.textContent = message; el.classList.add('show');
    clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
  };
  const copy = async (value, message = 'Copied to clipboard.') => {
    if (!String(value || '').trim()) { toast('There is nothing to copy yet.'); return; }
    try {
      await navigator.clipboard.writeText(String(value)); toast(message);
    } catch {
      const area = document.createElement('textarea'); area.value = String(value); area.setAttribute('readonly', '');
      area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch { ok = false; }
      area.remove(); toast(ok ? message : 'Copy is unavailable here. Select the text and copy it manually.');
    }
  };
  const record = (type, label) => {
    const events = read(KEYS.activity, []);
    events.unshift({ id: makeId(), type, label: String(label).slice(0, 90), at: stamp() });
    write(KEYS.activity, events.slice(0, 80));
    renderDashboard();
  };

  const primaryTools = [
    ['mood','Mood Check-in','Name what you are feeling, add context, and keep a private mood history.','◎'],
    ['cooldown','Cool Down Before You Reply','Use a short pause, breathing prompts, and reflection questions before a difficult reply.','◷'],
    ['argument','Argument Recovery Planner','Work through a disagreement one step at a time and save a repair plan.','↺'],
    ['before-send','Before You Send','Review a draft for blame, assumptions, pressure, and unclear wording.','✎'],
    ['style','Communication Style','Explore the communication preferences that help you feel heard.','⌁'],
    ['growth','Relationship Growth Tracker','Create personal goals, track small actions, and review your progress.','↗'],
    ['appreciation','Appreciation Generator','Find natural ways to notice effort and express gratitude.','♡'],
    ['weekly','Weekly Couple Check-in','Make space for two perspectives and one shared weekly conversation.','▤'],
    ['compromise','Compromise Builder','Lay out two sets of needs and explore possible middle grounds.','◇'],
    ['quality','Quality Time Ideas','Find realistic activities by budget, time, setting, and mood.','✦'],
    ['boundary','Boundary Builder','Put personal limits into clear, respectful words.','⌑'],
    ['challenge','Personal Growth Challenges','Choose manageable daily and weekly habits to practise.','☼']
  ].map(([id,title,description,icon]) => ({id,title,description,icon}));
  const extraTools = [
    ['feelings','Feelings Translator','Turn a hard-to-explain emotion into a clear “I feel” statement.','≈'],
    ['apology','Apology Builder','Build an apology that names the action, impact, and next step.','♡'],
    ['trust','Trust Rebuilding Planner','Map out realistic actions, boundaries, and review points.','⌂'],
    ['conversation','Conversation Planner','Prepare for a difficult talk without scripting the other person.','☷'],
    ['conflict','Conflict Simulator','Try fictional scenarios and learn from different response choices.','◇'],
    ['timeline','Personal Progress Timeline','Review locally saved moods, goals, reflections, and completed activities.','⌁']
  ].map(([id,title,description,icon]) => ({id,title,description,icon}));
  const allTools = [...primaryTools, ...extraTools];
  const remindersV2 = [
    'You can care deeply and still give each other room to breathe.',
    'A feeling is real, but the first explanation is not always the full story.',
    'You can ask for reassurance without demanding control.',
    'A healthy pause includes respect and, when possible, a plan to reconnect.',
    'Your needs matter. The other person’s boundaries matter too.',
    'Progress is often a small change repeated over time.',
    'Listening does not mean you have to agree with everything.',
    'You deserve respect without needing to earn it by being perfect.',
    'A sincere apology includes changed actions, not only careful words.',
    'You are allowed to have a life, friendships, school, and interests outside a relationship.'
  ];

  function renderCatalog() {
    const render = tool => `<button class="v2-tool-card" type="button" data-open-tool="${tool.id}"><span class="v2-tool-icon" aria-hidden="true">${tool.icon}</span><span class="v2-tool-card-copy"><strong>${esc(tool.title)}</strong><small>${esc(tool.description)}</small><span class="v2-tool-open">Open tool <b>↗</b></span></span></button>`;
    q('#v2PrimaryTools').innerHTML = primaryTools.map(render).join('');
    q('#v2ExtraTools').innerHTML = extraTools.map(render).join('');
  }

  function renderDashboard() {
    const moods = read(KEYS.moods, []), goals = read(KEYS.goals, []), challenges = read(KEYS.challenges, []), plans = read(KEYS.plans, []);
    let reflections = [];
    try { reflections = JSON.parse(localStorage.getItem('betweenUsReflections_v1') || '[]'); if (!Array.isArray(reflections)) reflections = []; } catch { reflections = []; }
    const completedGoals = goals.filter(goal => goal.done).length;
    const completedChallenges = challenges.filter(item => item.done).length;
    const favoritesCount = read(KEYS.quality,[]).length + read(KEYS.appreciation,[]).length;
    const stats = [
      ['Mood check-ins', moods.length, 'private entries'],
      ['Active goals', goals.length - completedGoals, `${completedGoals} completed`],
      ['Challenges done', completedChallenges, 'small steps count'],
      ['Saved reflections', reflections.length, 'on this device']
    ];
    q('#v2DashboardStats').innerHTML = stats.map(([label,num,sub]) => `<article class="v2-stat-card"><span>${esc(label)}</span><strong>${num}</strong><small>${esc(sub)}</small></article>`).join('');
    const today = new Date().toDateString();
    const todayMood = moods.find(item=>new Date(item.at).toDateString()===today);
    const todayChallenge = challenges.find(item=>new Date(item.at).toDateString()===today);
    const weeklyCount = read(KEYS.weekly,[]).length;
    const planCount = plans.length + favoritesCount;
    q('#v2DashboardShortcuts').innerHTML = `
      <button type="button" class="v2-shortcut-card" data-open-tool="mood"><span class="mini-label">TODAY’S MOOD</span><strong>${todayMood?esc(todayMood.mood):'Not checked in yet'}</strong><small>${todayMood?'View your latest check-in':'Take a moment to name how you feel'} ↗</small></button>
      <button type="button" class="v2-shortcut-card" data-open-tool="challenge"><span class="mini-label">DAILY GROWTH</span><strong>${todayChallenge?'Challenge completed':'One small challenge'}</strong><small>${todayChallenge?'You recorded a step today':'Choose a gentle action to practise'} ↗</small></button>
      <button type="button" class="v2-shortcut-card" data-open-tool="weekly"><span class="mini-label">WEEKLY CONNECTION</span><strong>${weeklyCount} saved check-in${weeklyCount===1?'':'s'}</strong><small>Open the shared conversation ↗</small></button>
      <button type="button" class="v2-shortcut-card" data-open-tool="timeline"><span class="mini-label">SAVED ACTIVITIES</span><strong>${planCount} saved item${planCount===1?'':'s'}</strong><small>Review or manage your timeline ↗</small></button>`;
    const openGoals = goals.filter(goal => !goal.done).slice(0, 4);
    q('#v2DashboardGoals').innerHTML = openGoals.length ? openGoals.map(goal => `<div class="v2-list-row"><span class="v2-list-dot"></span><span>${esc(goal.title)}</span><small>${esc(goal.category || 'Personal')}</small></div>`).join('') : '<div class="v2-empty-state">No active goals yet. Start with one small habit you would like to practise.</div>';
    const events = read(KEYS.activity, []).slice(0, 10);
    const legacy = reflections.map(item => ({ type: 'Reflection', label: item.title || 'Saved reflection', at: item.updatedAt || item.createdAt || 0 }));
    const timeline = [...events, ...legacy].sort((a,b) => b.at - a.at).slice(0, 9);
    q('#v2Timeline').innerHTML = timeline.length ? timeline.map(item => `<div class="v2-timeline-item"><span class="v2-timeline-marker"></span><div><strong>${esc(item.label)}</strong><small>${esc(item.type)} · ${esc(niceDate(item.at))}</small></div></div>`).join('') : '<div class="v2-empty-state">Your recent activity will appear here after you save a check-in, goal, reflection, or plan.</div>';
    q('#v2JournalCount')?.replaceChildren(document.createTextNode(`${reflections.length} saved reflection${reflections.length === 1 ? '' : 's'}`));
  }

  function openTool(id) {
    const tool = allTools.find(item => item.id === id);
    if (!tool) return;
    stopTimer();
    q('#v2ToolDialogContent').innerHTML = `<div class="eyebrow">BETWEEN US · INTERACTIVE TOOL</div><h2 id="v2ToolTitle">${esc(tool.title)}</h2><p class="v2-tool-lead">${esc(tool.description)}</p><div class="v2-tool-body">${renderTool(id)}</div><p class="v2-modal-privacy">This tool runs in your browser. Saved information stays on this device unless you choose to clear it.</p>`;
    const dialog = q('#v2ToolDialog');
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    if (id === 'mood') renderMoodHistory();
    if (id === 'growth') renderGoals();
    if (id === 'quality') renderQualityFavorites();
    if (id === 'weekly') renderWeeklyHistory();
    if (id === 'challenge') renderChallengeHistory();
    if (id === 'timeline') renderTimelineTool();
    if (id === 'appreciation') q('#v2AppreciationSaved') && renderAppreciationFavorites();
    q('#v2ToolDialogContent').scrollTop = 0;
  }

  function field(label, id, placeholder = '', rows = 3, required = false) {
    return `<label class="v2-field"><span>${esc(label)}${required ? ' <i>*</i>' : ''}</span><textarea id="${id}" rows="${rows}" placeholder="${esc(placeholder)}" ${required ? 'required' : ''}></textarea></label>`;
  }
  function inputField(label, id, placeholder = '', required = false, max = 180) {
    return `<label class="v2-field"><span>${esc(label)}${required ? ' <i>*</i>' : ''}</span><input id="${id}" maxlength="${max}" placeholder="${esc(placeholder)}" ${required ? 'required' : ''}></label>`;
  }
  function selectField(label, id, options) {
    return `<label class="v2-field"><span>${esc(label)}</span><select id="${id}">${options.map(([value,name]) => `<option value="${esc(value)}">${esc(name)}</option>`).join('')}</select></label>`;
  }
  function toolButton(label, action, style = 'button-outline', extra = '') {
    return `<button type="button" class="button ${style} button-small" data-tool-action="${action}" ${extra}>${label}</button>`;
  }
  function outputBox(id, label = 'Your result') {
    return `<div class="v2-output-wrap"><span class="mini-label">${esc(label)}</span><textarea id="${id}" rows="4" aria-label="${esc(label)}"></textarea><div class="v2-tool-actions">${toolButton('Copy', 'copy-output', 'button-outline', `data-copy-target="${id}"`)}</div></div>`;
  }

  const moodsList = [
    ['Happy','☀'],['Worried','⌁'],['Jealous','◇'],['Confused','?'],['Upset','≈'],
    ['Lonely','○'],['Overwhelmed','≋'],['Appreciated','♡'],['Calm','☾'],['Disappointed','·']
  ];
  const moodGuidance = {
    Happy:['Notice what is helping you feel good.','Enjoy the moment without feeling you have to make it perfect.','What would I like to remember about today?'],
    Worried:['Something may feel uncertain or important to you.','Separate what you know from what you fear might happen.','What information or support would help me feel clearer?'],
    Jealous:['You may be worried about connection, trust, or comparison.','Name the trigger without turning the feeling into a rule for someone else.','What reassurance can I ask for respectfully, and what can I work through myself?'],
    Confused:['You may not have enough information or may be holding mixed feelings.','Pause before deciding what another person intended.','What is one clear question I could ask?'],
    Upset:['Something may have felt frustrating, unfair, or painful.','Give yourself a moment before choosing how to respond.','What part of this situation matters most to me?'],
    Lonely:['You may be missing connection or companionship.','Consider reaching out to someone safe or doing an activity that supports you.','What kind of connection would feel helpful right now?'],
    Overwhelmed:['There may be several feelings or responsibilities happening at once.','Choose one small next step and let the rest wait when possible.','What can I set down for now?'],
    Appreciated:['You may be noticing care, effort, or support.','Let yourself acknowledge the positive moment.','How could I express thanks in a way that feels genuine?'],
    Calm:['You may have a little space to think clearly.','Use this moment to notice what is working for you.','What would help me protect this sense of balance?'],
    Disappointed:['Something may not have turned out as you hoped.','Let yourself name the disappointment without blaming yourself for having it.','What expectation or need would I like to communicate?']
  };
  function renderTool(id) {
    if (id === 'mood') return `<div class="v2-tool-panel"><p>Pick the feeling that is closest to what you are experiencing. You can save more than one check-in over time.</p><div class="v2-mood-grid" id="v2MoodGrid">${moodsList.map(([name,icon]) => `<button class="v2-mood-choice" type="button" data-mood="${name}"><span>${icon}</span>${name}</button>`).join('')}</div><div id="v2MoodMeaning" class="v2-feedback" hidden></div>${field('What might be contributing to this feeling? (optional)','v2MoodNote','A short note for yourself...',3)}<div class="v2-tool-actions">${toolButton('Save mood check-in','save-mood','button-primary')}</div><div id="v2MoodHistory" class="v2-tool-history"></div></div>`;
    if (id === 'cooldown') return `<div class="v2-tool-panel"><p>Pausing can help you choose your words. It is okay to take time, and it is also important to return to important conversations when you are ready.</p><div class="v2-timer-display" id="v2TimerDisplay">01:00</div><div class="v2-duration-row">${[1,3,5].map(min => `<button type="button" class="v2-duration ${min === 1 ? 'selected' : ''}" data-timer-minutes="${min}">${min} min</button>`).join('')}</div><div class="v2-tool-actions v2-center-actions">${toolButton('Start','timer-start','button-primary')}${toolButton('Pause','timer-pause')}${toolButton('Resume','timer-resume')}${toolButton('Reset','timer-reset')}</div><div class="v2-breath-prompt" id="v2BreathPrompt" aria-live="polite">Breathe in gently. Let your shoulders relax.</div><div class="v2-reflection-prompt"><span class="mini-label">A QUESTION TO CONSIDER</span><p id="v2TimerQuestion">What am I feeling, and what do I actually want to communicate?</p></div></div>`;
    if (id === 'argument') return renderArgumentWizard();
    if (id === 'before-send') return `<div class="v2-tool-panel"><p>Paste your draft below. This checker uses simple wording reminders, not AI. It cannot know the full context or decide what another person will feel.</p>${field('Your draft message','v2OriginalMessage','Write the message you are considering sending...',5)}<div class="v2-checklist"><span class="mini-label">PAUSE AND CHECK</span>${['Am I blaming the other person?','Am I making assumptions about their intentions?','Am I explaining my actual feelings?','Am I respecting their boundaries?','Am I expecting an immediate response?','Could I make the request clearer?'].map((item,i) => `<label><input type="checkbox" class="v2-before-check" value="${i}"><span>${item}</span></label>`).join('')}</div><div class="v2-tool-actions">${toolButton('Review my draft','review-message','button-primary')}${toolButton('Clear','clear-before-send')}</div><div id="v2BeforeFeedback" class="v2-feedback" hidden></div>${field('Editable revised message','v2ImprovedMessage','Your edited wording will appear here...',5)}<div class="v2-tool-actions">${toolButton('Copy revised message','copy-output','button-outline','data-copy-target="v2ImprovedMessage"')}</div></div>`;
    if (id === 'style') return `<div class="v2-tool-panel"><p>This quiz describes preferences, not a personality type or diagnosis. Your answers can change depending on the situation.</p><form id="v2StyleForm">${[
      ['When I am busy, I prefer…',['A short update so we stay connected','A little quiet time and a later check-in','It depends on what is happening']],
      ['Reassurance feels most helpful when…',['It is said clearly and directly','It is shown through consistent actions','I can ask for it without feeling judged']],
      ['During a disagreement, I usually prefer…',['Talking it through when we are both calm','A pause, then a planned conversation','A mix depending on how intense it feels']],
      ['I tend to show appreciation by…',['Saying it out loud or in a message','Doing thoughtful actions','Both words and actions']],
      ['Personal space feels healthy when…',['We still communicate when we will reconnect','We can each follow our own routines','We agree together on what works']],
      ['I feel heard when someone…',['Listens and asks questions','Acknowledges what I am feeling','Helps us find a practical next step']],
      ['For difficult subjects, I prefer…',['A calm talk with time to explain','A little time to prepare my thoughts','A short opening conversation, then more later']]
    ].map((item,i) => { const [question,answers] = item; return `<fieldset class="v2-quiz-question"><legend>${question}</legend>${answers.map((answer,index)=>`<label><input type="radio" name="style-${i}" value="${index}"><span>${answer}</span></label>`).join('')}</fieldset>`; }).join('')}<div class="v2-tool-actions"><button class="button button-primary button-small" type="submit">Build my summary</button></div></form><div id="v2StyleResult" class="v2-feedback" hidden></div></div>`;
    if (id === 'growth') return `<div class="v2-tool-panel"><p>Choose goals that are about your own actions. This is personal development, not a way to measure or compete with a partner.</p><form id="v2GoalForm" class="v2-inline-form">${inputField('A small goal','v2GoalTitle','e.g. Ask instead of assuming',true)}${selectField('Area','v2GoalCategory',[['Communication','Communication'],['Patience','Patience'],['Boundaries','Boundaries'],['Listening','Listening'],['Self-care','Self-care'],['Accountability','Accountability']])}<button class="button button-primary button-small" type="submit">Add goal</button></form><div class="v2-progress-track"><span id="v2GoalProgress" style="width:0%"></span></div><div id="v2GoalList" class="v2-tool-history"></div>${field('Weekly review','v2GoalReview','What went well? What would you like to practise next week?',3)}${toolButton('Save weekly review','save-goal-review','button-outline')}</div>`;
    if (id === 'appreciation') return `<div class="v2-tool-panel"><p>Choose a type of appreciation, then make the words specific to the person and moment.</p>${selectField('I want to appreciate…','v2AppreciationType',[['effort','Their effort'],['support','Their support'],['kindness','Their kindness'],['achievement','An achievement'],['time','Time they made for me'],['ordinary','An everyday little thing']])}<div class="v2-tool-actions">${toolButton('Generate an idea','generate-appreciation','button-primary')}${toolButton('Another idea','generate-appreciation')}</div><textarea id="v2AppreciationOutput" rows="4" placeholder="Your appreciation idea will appear here. Edit it so it sounds like you."></textarea><div class="v2-tool-actions">${toolButton('Save favorite','save-appreciation')}${toolButton('Copy','copy-output','button-outline','data-copy-target="v2AppreciationOutput"')}</div><div id="v2AppreciationSaved" class="v2-tool-history"></div></div>`;
    if (id === 'weekly') return `<div class="v2-tool-panel"><p>Use this together only when both people agree to share and save their answers. This version works on the same device; it does not send answers to another person.</p><div class="v2-consent-note">Before writing, make sure both people are comfortable with the other person seeing these responses on this device. These are shared check-in notes, not private journal entries.</div><div class="v2-two-column">${field('Person A — What went well this week?','v2WeeklyA1','A moment you appreciated...',2)}${field('Person B — What went well this week?','v2WeeklyB1','A moment you appreciated...',2)}${field('Person A — What would you like to improve?','v2WeeklyA2','A need or concern to discuss...',2)}${field('Person B — What would you like to improve?','v2WeeklyB2','A need or concern to discuss...',2)}</div>${field('One shared goal for next week','v2WeeklyGoal','A small action you both agree to try...',2)}<label class="v2-consent-check"><input type="checkbox" id="v2WeeklyConsent"><span>Both people agree to view and save these shared answers on this device.</span></label><div class="v2-tool-actions">${toolButton('Save weekly check-in','save-weekly','button-primary')}${toolButton('Clear form','clear-weekly')}</div><div id="v2WeeklyHistory" class="v2-tool-history"></div></div>`;
    if (id === 'compromise') return `<div class="v2-tool-panel"><p>Use this to understand what matters to each person. A compromise is optional; neither person should be pressured to accept an outcome.</p><div class="v2-two-column"><div class="v2-person-panel"><span class="mini-label">PERSON A</span>${field('What do I need?','v2CompA1','Describe the need...',2)}${field('Why does it matter?','v2CompA2','Explain the reason...',2)}${field('What could I be flexible about?','v2CompA3','Possible flexibility...',2)}</div><div class="v2-person-panel"><span class="mini-label">PERSON B</span>${field('What do I need?','v2CompB1','Describe the need...',2)}${field('Why does it matter?','v2CompB2','Explain the reason...',2)}${field('What could I be flexible about?','v2CompB3','Possible flexibility...',2)}</div></div><div class="v2-tool-actions">${toolButton('Explore possible middle ground','build-compromise','button-primary')}${toolButton('Clear','clear-compromise')}</div><div id="v2CompromiseResult" class="v2-feedback" hidden></div></div>`;
    if (id === 'quality') return `<div class="v2-tool-panel"><p>Find an idea that fits the time and budget you actually have. These are suggestions, not expectations.</p><div class="v2-form-grid">${selectField('Budget','v2QualityBudget',[['any','Any budget'],['free','Free'],['low','Low-cost'],['flexible','Flexible']])}${selectField('Available time','v2QualityTime',[['any','Any length'],['5','5 minutes'],['15','15 minutes'],['30','30 minutes'],['60','60 minutes']])}${selectField('Setting','v2QualitySetting',[['any','Any setting'],['home','At home'],['outdoors','Outdoors'],['online','Online'],['in-person','In person']])}${selectField('Mood','v2QualityMood',[['any','Any mood'],['relaxed','Relaxed'],['fun','Fun'],['thoughtful','Thoughtful'],['creative','Creative'],['meaningful','Meaningful']])}</div><div class="v2-tool-actions">${toolButton('Find an idea','generate-quality','button-primary')}</div><div id="v2QualityResult" class="v2-feedback" hidden></div><div id="v2QualityFavorites" class="v2-tool-history"></div></div>`;
    if (id === 'boundary') return `<div class="v2-tool-panel"><p>A boundary describes what you are comfortable with and what you will do to look after your own needs. It is not a rule for controlling someone else.</p>${selectField('Boundary area','v2BoundaryCategory',[['Personal space','Personal space'],['Privacy','Privacy'],['Friendships','Friendships'],['Communication','Communication'],['Time management','Time management'],['Respect','Respect'],['School and responsibilities','School and responsibilities'],['Social media','Social media'],['Emotional needs','Emotional needs']])}${field('What am I comfortable with?','v2BoundaryOk','Describe what feels okay...',2)}${field('What makes me uncomfortable?','v2BoundaryNo','Describe the limit...',2)}${field('Why does this boundary matter to me?','v2BoundaryWhy','Explain what it protects...',2)}<div class="v2-tool-actions">${toolButton('Create a respectful statement','build-boundary','button-primary')}</div>${outputBox('v2BoundaryOutput','Editable boundary statement')}</div>`;
    if (id === 'challenge') return `<div class="v2-tool-panel"><p>Pick a realistic challenge that supports your own growth. You can skip any challenge that does not fit your circumstances.</p><div class="v2-challenge-card" id="v2ChallengeCard"><span class="mini-label">YOUR NEXT SMALL STEP</span><h3 id="v2ChallengeTitle">Ask a question instead of making an assumption.</h3><span id="v2ChallengeType" class="v2-local-pill">Daily practice</span></div><div class="v2-tool-actions">${toolButton('New daily challenge','new-challenge','button-outline')}${toolButton('New weekly challenge','new-weekly-challenge','button-outline')}${toolButton('Mark as completed','complete-challenge','button-primary')}</div><div id="v2ChallengeHistory" class="v2-tool-history"></div></div>`;
    if (id === 'feelings') return `<div class="v2-tool-panel"><p>Choose a feeling and add a little context. The tool will offer a starting sentence, not a perfect interpretation.</p>${selectField('What am I feeling?','v2FeelingChoice',[['ignored','Ignored'],['jealous','Jealous'],['overwhelmed','Overwhelmed'],['unappreciated','Unappreciated'],['worried','Worried'],['confused','Confused'],['lonely','Lonely'],['disappointed','Disappointed'],['hurt','Hurt']])}${field('What happened? (optional)','v2FeelingContext','A simple description, without guessing someone’s intention...',2)}<div class="v2-tool-actions">${toolButton('Translate my feeling','translate-feeling','button-primary')}</div>${outputBox('v2FeelingOutput','Suggested wording')}</div>`;
    if (id === 'apology') return `<div class="v2-tool-panel"><p>A thoughtful apology takes responsibility without demanding forgiveness. Keep the promise realistic and focused on what you can change.</p>${field('What happened?','v2ApologyAction','Describe your action...',2)}${field('How might it have affected the other person?','v2ApologyImpact','Consider the impact...',2)}${field('What responsibility can you acknowledge?','v2ApologyOwn','Avoid adding excuses...',2)}${field('What will you do differently?','v2ApologyChange','Name a specific next step...',2)}<div class="v2-tool-actions">${toolButton('Build my apology','build-apology','button-primary')}</div>${outputBox('v2ApologyOutput','Editable apology')}</div>`;
    if (id === 'trust') return `<div class="v2-tool-panel"><p>Trust is rebuilt through consistent actions over time. This planner cannot guarantee that trust will return or require anyone to forgive.</p>${field('What affected trust?','v2TrustIssue','Describe the situation...',2)}${field('What boundaries are needed now?','v2TrustBoundary','What would help each person feel respected?',2)}${field('What actions are realistic?','v2TrustActions','List actions that can be followed through...',2)}${field('When should progress be reviewed?','v2TrustReview','Choose a realistic check-in point...',1)}<div class="v2-tool-actions">${toolButton('Create trust plan','build-trust','button-primary')}</div><div id="v2TrustResult" class="v2-feedback" hidden></div></div>`;
    if (id === 'conversation') return `<div class="v2-tool-panel"><p>Prepare what you want to say while leaving space to listen. A plan is a guide, not a script that the other person must follow.</p>${field('What do I want to discuss?','v2ConversationTopic','Name one topic...',2)}${field('Why does it matter to me?','v2ConversationWhy','Explain the impact...',2)}${field('What am I feeling?','v2ConversationFeeling','Name your feelings...',2)}${field('What do I need to communicate?','v2ConversationNeed','A request, boundary, or concern...',2)}${field('What do I hope to understand?','v2ConversationListen','A question for the other person...',2)}<div class="v2-tool-actions">${toolButton('Build conversation outline','build-conversation','button-primary')}</div><div id="v2ConversationResult" class="v2-feedback" hidden></div></div>`;
    if (id === 'conflict') return `<div class="v2-tool-panel"><p>Try a fictional situation, choose a response, and learn what that response may communicate. Real situations can have more context than a short scenario.</p><div class="v2-scenario-card"><span class="mini-label">SCENARIO</span><h3 id="v2ScenarioTitle">Your partner says they need some time before discussing a disagreement.</h3><p id="v2ScenarioText">You want to resolve things now because waiting makes you feel unsettled.</p></div><div class="v2-scenario-options" id="v2ScenarioOptions"><button type="button" class="v2-scenario-option" data-scenario-choice="0">Send several messages until they answer.</button><button type="button" class="v2-scenario-option" data-scenario-choice="1">Agree on a time to reconnect, then take care of yourself while waiting.</button><button type="button" class="v2-scenario-option" data-scenario-choice="2">Pretend nothing happened and never bring it up again.</button></div><div id="v2ScenarioFeedback" class="v2-feedback" hidden></div>${toolButton('Try another scenario','next-scenario')}</div>`;
    if (id === 'timeline') return `<div class="v2-tool-panel"><p>This timeline summarizes activity saved by BETWEEN US in this browser. It does not include the text of private journal entries.</p><div id="v2TimelineTool" class="v2-timeline"></div><div class="v2-tool-actions">${toolButton('Refresh timeline','refresh-timeline','button-outline')}</div></div>`;
    return '<p>This tool is not available.</p>';
  }

  const wizardSteps = [
    ['Describe what happened','Focus on the event, not labels or guesses.'],
    ['What did I feel?','Name the feelings you noticed during or after the disagreement.'],
    ['Facts and assumptions','What do you know for sure, and what are you interpreting?'],
    ['Consider another perspective','What might the other person have experienced? Keep it as a possibility, not a fact.'],
    ['My responsibility','Is there anything you want to acknowledge or handle differently?'],
    ['What needs to be discussed?','Name the main point or request that still needs attention.'],
    ['A respectful next step','Choose one realistic action that respects both people’s boundaries.']
  ];
  let wizard = { step: 0, answers: Array(7).fill('') };
  function renderArgumentWizard() {
    wizard = { step: 0, answers: Array(7).fill('') };
    return `<div class="v2-tool-panel"><p>This guided planner is for understanding and repair, not deciding who won an argument.</p><div id="v2WizardMount">${wizardStepMarkup()}</div></div>`;
  }
  function wizardStepMarkup() {
    const [title, hint] = wizardSteps[wizard.step];
    const percent = Math.round(((wizard.step + 1) / wizardSteps.length) * 100);
    return `<div class="v2-wizard-progress"><div class="v2-progress-track"><span style="width:${percent}%"></span></div><small>Step ${wizard.step + 1} of ${wizardSteps.length}</small></div><h3 class="v2-wizard-title">${esc(title)}</h3><p class="v2-wizard-hint">${esc(hint)}</p><textarea id="v2WizardAnswer" rows="5" placeholder="Write what feels important to you...">${esc(wizard.answers[wizard.step])}</textarea><div class="v2-tool-actions"><button type="button" class="button button-outline button-small" data-tool-action="wizard-back" ${wizard.step===0?'disabled':''}>Previous</button>${wizard.step < wizardSteps.length - 1 ? '<button type="button" class="button button-primary button-small" data-tool-action="wizard-next">Next step</button>' : '<button type="button" class="button button-primary button-small" data-tool-action="wizard-save">Save recovery plan</button>'}</div>`;
  }
  function storeWizardAnswer() { const input = q('#v2WizardAnswer'); if (input) wizard.answers[wizard.step] = input.value.trim(); }
  function savePlan(title, details) {
    const plans = read(KEYS.plans, []);
    plans.unshift({ id: makeId(), title, details, at: stamp() });
    if (write(KEYS.plans, plans.slice(0, 60))) { record('Plan saved', title); return true; }
    return false;
  }

  function renderMoodHistory() {
    const history = read(KEYS.moods, []).slice(0, 6);
    q('#v2MoodHistory').innerHTML = `<div class="v2-history-heading"><span class="mini-label">RECENT CHECK-INS</span></div>${history.length ? history.map(item => `<div class="v2-history-row"><strong>${esc(item.mood)}</strong><small>${esc(niceDate(item.at))}</small>${item.note ? `<p>${esc(item.note)}</p>` : ''}</div>`).join('') : '<p class="v2-empty-state">Your saved mood check-ins will appear here.</p>'}`;
  }
  function renderGoals() {
    const goals = read(KEYS.goals, []);
    const completed = goals.filter(item => item.done).length;
    const percent = goals.length ? Math.round(completed / goals.length * 100) : 0;
    q('#v2GoalProgress').style.width = `${percent}%`;
    q('#v2GoalList').innerHTML = goals.length ? goals.map(goal => `<div class="v2-goal-item ${goal.done ? 'is-done' : ''}"><label><input type="checkbox" data-goal-toggle="${esc(goal.id)}" ${goal.done ? 'checked' : ''}><span>${esc(goal.title)}<small>${esc(goal.category || 'Personal')}</small></span></label><div><button type="button" data-goal-edit="${esc(goal.id)}" aria-label="Edit goal">Edit</button><button type="button" data-goal-delete="${esc(goal.id)}" aria-label="Delete goal">Delete</button></div></div>`).join('') : '<p class="v2-empty-state">You have not added any goals yet.</p>';
  }
  function renderWeeklyHistory() {
    const history = read(KEYS.weekly, []).slice(0, 5);
    q('#v2WeeklyHistory').innerHTML = `<span class="mini-label">SAVED SHARED CHECK-INS</span>${history.length ? history.map(item => `<div class="v2-history-row"><strong>${esc(item.goal || 'Weekly conversation')}</strong><small>${esc(niceDate(item.at))}</small><details><summary>View shared notes</summary><p><b>Person A:</b> ${esc(item.a1)} ${esc(item.a2)}</p><p><b>Person B:</b> ${esc(item.b1)} ${esc(item.b2)}</p></details><div class="v2-tool-actions"><button type="button" class="text-button" data-weekly-edit="${esc(item.id)}">Edit</button><button type="button" class="text-button danger-text" data-weekly-delete="${esc(item.id)}">Delete</button></div></div>`).join('') : '<p class="v2-empty-state">No shared check-ins saved yet.</p>'}`;
  }
  function renderChallengeHistory() {
    const history = read(KEYS.challenges, []).slice(0, 8);
    q('#v2ChallengeHistory').innerHTML = `<span class="mini-label">COMPLETED CHALLENGES</span>${history.length ? history.map(item => `<div class="v2-history-row"><strong>${esc(item.title)}</strong><small>${esc(item.type)} · ${esc(niceDate(item.at))}</small></div>`).join('') : '<p class="v2-empty-state">Completed challenges will appear here.</p>'}`;
  }
  function renderQualityFavorites() {
    const favorites=read(KEYS.quality,[]).slice(0,12);
    q('#v2QualityFavorites').innerHTML=`<span class="mini-label">SAVED IDEAS</span>${favorites.length?favorites.map(item=>`<div class="v2-history-row"><strong>${esc(item.title)}</strong><small>${esc(niceDate(item.at))}</small><button type="button" class="text-button danger-text" data-quality-delete="${esc(item.id)}">Remove</button></div>`).join(''):'<p class="v2-empty-state">Save an idea to keep it here.</p>'}`;
  }
  function renderAppreciationFavorites() {
    const favorites = read(KEYS.appreciation, []).slice(0, 10);
    q('#v2AppreciationSaved').innerHTML = `<span class="mini-label">SAVED IDEAS</span>${favorites.length ? favorites.map(item => `<div class="v2-history-row"><p>${esc(item.text)}</p><button class="text-button danger-text" type="button" data-appreciation-delete="${esc(item.id)}">Remove</button></div>`).join('') : '<p class="v2-empty-state">Save an idea to keep it on this device.</p>'}`;
  }
  function renderTimelineTool() {
    const moods = read(KEYS.moods, []).map(item=>({id:item.id,source:'moods',label:`Mood check-in: ${item.mood}`,type:'Mood',at:item.at}));
    const goals = read(KEYS.goals, []).map(item=>({id:item.id,source:'goals',label:`${item.done?'Completed':'Goal'}: ${item.title}`,type:'Personal growth',at:item.updatedAt||item.createdAt||0}));
    const plans = read(KEYS.plans, []).map(item=>({id:item.id,source:'plans',label:item.title,type:'Saved plan',at:item.at}));
    const challengesDone = read(KEYS.challenges, []).map(item=>({id:item.id,source:'challenges',label:item.title,type:'Completed challenge',at:item.at}));
    const weekly = read(KEYS.weekly, []).map(item=>({id:item.id,source:'weekly',label:item.goal||'Weekly couple check-in',type:'Shared check-in',at:item.at}));
    const appreciation = read(KEYS.appreciation, []).map(item=>({id:item.id,source:'appreciation',label:item.text,type:'Appreciation favorite',at:item.at}));
    const quality = read(KEYS.quality, []).map(item=>({id:item.id,source:'quality',label:item.title,type:'Quality-time favorite',at:item.at}));
    const styles = read(KEYS.style, []).map(item=>({id:item.id,source:'style',label:'Communication preferences summary',type:'Self-understanding',at:item.at}));
    let reflections=[]; try{reflections=JSON.parse(localStorage.getItem('betweenUsReflections_v1')||'[]');if(!Array.isArray(reflections))reflections=[];}catch{reflections=[];}
    const journal = reflections.map(item=>({id:item.id,source:'reflections',label:item.title||'Saved reflection',type:'Reflection',at:item.updatedAt||item.createdAt||0}));
    const all=[...moods,...goals,...plans,...challengesDone,...weekly,...appreciation,...quality,...styles,...journal].sort((a,b)=>(b.at||0)-(a.at||0)).slice(0,35);
    q('#v2TimelineTool').innerHTML = all.length ? all.map(item => `<div class="v2-timeline-item v2-timeline-managed"><span class="v2-timeline-marker"></span><div><strong>${esc(item.label)}</strong><small>${esc(item.type)} · ${esc(niceDate(item.at))}</small><div class="v2-timeline-actions"><button type="button" data-timeline-edit="${esc(item.source)}:${esc(item.id)}">Edit</button><button type="button" data-timeline-delete="${esc(item.source)}:${esc(item.id)}">Delete</button></div></div></div>`).join('') : '<p class="v2-empty-state">No activity saved yet.</p>';
  }
  function mutateTimelineItem(reference, mode) {
    const [source,id] = String(reference||'').split(':');
    const keyBySource = {moods:KEYS.moods,goals:KEYS.goals,plans:KEYS.plans,challenges:KEYS.challenges,weekly:KEYS.weekly,appreciation:KEYS.appreciation,quality:KEYS.quality,style:KEYS.style,activity:KEYS.activity};
    const key=keyBySource[source];
    if(source==='reflections'){
      let items=[];try{items=JSON.parse(localStorage.getItem('betweenUsReflections_v1')||'[]');if(!Array.isArray(items))items=[];}catch{items=[];}
      const item=items.find(x=>x.id===id);if(!item)return;
      if(mode==='delete'){if(!confirm('Delete this reflection from this browser?'))return;localStorage.setItem('betweenUsReflections_v1',JSON.stringify(items.filter(x=>x.id!==id)));}else{const value=prompt('Edit reflection title:',item.title||'');if(value===null||!value.trim())return;item.title=value.trim();item.updatedAt=stamp();localStorage.setItem('betweenUsReflections_v1',JSON.stringify(items));}
    } else {
      if(!key)return;const items=read(key,[]);const item=items.find(x=>x.id===id);if(!item)return;
      if(mode==='delete'){if(!confirm('Delete this saved item from this device?'))return;write(key,items.filter(x=>x.id!==id));}
      else {const fieldBySource={moods:'mood',goals:'title',plans:'title',challenges:'title',weekly:'goal',appreciation:'text',quality:'title',style:'text',activity:'label'};const field=fieldBySource[source];const value=prompt('Edit this timeline entry:',item[field]||'');if(value===null||!value.trim())return;item[field]=value.trim();item.updatedAt=stamp();write(key,items);}
    }
    renderTimelineTool();renderDashboard();toast(mode==='delete'?'Timeline item deleted.':'Timeline item updated.');
  }

  let timerRemaining = 60, timerInterval = null, timerRunning = false, selectedMinutes = 1;
  let editingWeeklyId = null;
  const timerPrompts = ['Breathe in gently. Let your shoulders relax.','Release your jaw and soften your hands.','Notice five things you can see around you.','Ask yourself: what do I know for sure?','Choose one clear thing you want to communicate.'];
  const timerQuestions = ['What am I feeling, and what do I actually want to communicate?','Am I responding to facts or assumptions?','Can this conversation wait until we are both calmer?','What would a respectful next step look like?'];
  function paintTimer() {
    const minutes = Math.floor(timerRemaining / 60), seconds = timerRemaining % 60;
    q('#v2TimerDisplay').textContent = `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }
  function stopTimer() { if (timerInterval) clearInterval(timerInterval); timerInterval = null; timerRunning = false; }
  function startTimer() {
    if (timerRunning) return;
    if (timerRemaining <= 0) timerRemaining = selectedMinutes * 60;
    timerRunning = true;
    timerInterval = setInterval(() => {
      timerRemaining = Math.max(0, timerRemaining - 1); paintTimer();
      if (timerRemaining === 0) { stopTimer(); q('#v2BreathPrompt').textContent = 'Your pause is complete. You can choose whether you are ready to continue or need a little more time.'; toast('Your cooldown timer is complete.'); }
      else if (timerRemaining % 15 === 0) { const index = Math.floor(Math.random() * timerPrompts.length); q('#v2BreathPrompt').textContent = timerPrompts[index]; q('#v2TimerQuestion').textContent = timerQuestions[Math.floor(Math.random() * timerQuestions.length)]; }
    }, 1000);
  }

  const appreciationIdeas = {
    effort: ['I noticed the effort you put into today, and I appreciate it.','Thank you for trying, even when you had a lot going on.','I appreciate the thought you put into that.'],
    support: ['Thank you for listening when I needed someone to hear me.','Your support meant a lot to me today.','I appreciate that you made space for how I was feeling.'],
    kindness: ['That small kind thing you did stayed with me. Thank you.','I appreciate the way you treated me with care today.','Thank you for being thoughtful in your own way.'],
    achievement: ['I am proud of the work you put into that. You deserve to feel good about it.','I noticed how much effort that took. Congratulations.','You worked hard for this, and I hope you give yourself credit.'],
    time: ['Thank you for making time for us. I enjoyed being with you.','I appreciate the time we got to share today.','It meant something to me that you made space for our conversation.'],
    ordinary: ['I appreciate the ordinary little moments we get to share.','Thank you for being part of my day.','I noticed that small thing you did, and it made me feel cared for.']
  };
  const qualityIdeas = [
    {title:'Share one good thing from today',detail:'Each person names one small moment they appreciated. Listening is enough; no one needs to fix anything.',budget:'free',time:5,setting:['home','online','in-person'],mood:['relaxed','thoughtful','meaningful']},
    {title:'Ask one curious question',detail:'Take turns asking one light or meaningful question and give each other room to answer.',budget:'free',time:5,setting:['home','online','in-person'],mood:['fun','thoughtful','meaningful']},
    {title:'Ask each other three curious questions',detail:'Take turns asking questions you have not asked before. Listen without rushing to answer.',budget:'free',time:15,setting:['home','online','in-person'],mood:['thoughtful','meaningful','relaxed']},
    {title:'Make a shared playlist',detail:'Choose songs that remind you of good moments, and explain why each one matters.',budget:'free',time:30,setting:['home','online','in-person'],mood:['creative','meaningful','relaxed']},
    {title:'Take a short walk together',detail:'Put distractions away for a little while and talk about something light or interesting.',budget:'free',time:15,setting:['outdoors','in-person'],mood:['relaxed','meaningful']},
    {title:'Draw the same silly prompt',detail:'Pick a random object or imaginary place and draw your own versions.',budget:'low',time:30,setting:['home','in-person'],mood:['creative','fun']},
    {title:'Share a favorite memory',detail:'Describe a small memory that still makes you happy and what you remember most.',budget:'free',time:15,setting:['home','online','in-person'],mood:['thoughtful','meaningful']},
    {title:'Plan a future low-cost outing',detail:'Look at a few nearby public places and choose one idea that fits your schedule and budget.',budget:'flexible',time:30,setting:['online','home'],mood:['creative','meaningful']},
    {title:'Play a word or guessing game',detail:'Take turns giving clues about a movie, place, food, or shared memory.',budget:'free',time:15,setting:['home','online','in-person'],mood:['fun']},
    {title:'Make appreciation notes',detail:'Write one specific thing you value about the other person. Share only if both feel comfortable.',budget:'free',time:15,setting:['home','in-person'],mood:['thoughtful','meaningful']},
    {title:'Watch one short documentary or video',detail:'Choose something interesting, then talk about one thing you learned.',budget:'free',time:30,setting:['home','online'],mood:['relaxed','thoughtful']},
    {title:'Make a snack together',detail:'Prepare something simple with ingredients you already have, following household food-safety rules.',budget:'low',time:30,setting:['home','in-person'],mood:['creative','relaxed']},
    {title:'Do a photo memory exchange',detail:'Share a favorite non-private photo or describe a moment you remember clearly.',budget:'free',time:15,setting:['online','in-person'],mood:['meaningful','thoughtful']},
    {title:'Create a tiny bucket list',detail:'Write five simple activities you might enjoy doing together in the coming month.',budget:'free',time:30,setting:['home','online','in-person'],mood:['creative','fun']},
    {title:'Enjoy a quiet study or hobby session',detail:'Spend time alongside each other while each person works on their own task.',budget:'free',time:60,setting:['home','online','in-person'],mood:['relaxed']},
    {title:'Share a song and its story',detail:'Choose a song you like and explain what you connect with in it, without needing to share lyrics.',budget:'free',time:15,setting:['home','online','in-person'],mood:['meaningful','relaxed']},
    {title:'Try a mini trivia round',detail:'Take turns asking five questions about a topic you both enjoy.',budget:'free',time:15,setting:['home','online','in-person'],mood:['fun','creative']}
  ];
  const challenges = [
    'Ask a question instead of making an assumption.','Listen without interrupting during one conversation.','Express appreciation for one specific action.','Take a pause before replying when you feel overwhelmed.','Name your own feeling without blaming someone.','Respect a reasonable request for personal space.','Follow through on one small promise to yourself.','Ask for what you need in a clear, respectful way.','Make time for one activity that supports your own wellbeing.','Acknowledge a mistake without adding an excuse.'
  ];
  let currentChallenge = challenges[0], currentChallengeType = 'Daily practice';
  const scenarios = [
    {title:'A partner asks for time before a difficult talk.',text:'You want to resolve things now because waiting makes you unsettled.',options:['Send several messages until they answer.','Agree on a time to reconnect, then take care of yourself while waiting.','Pretend nothing happened and never bring it up again.'],feedback:['Repeated messages can feel pressuring and may make it harder to talk calmly.','This response respects their need for time while also making room for your need for clarity.','Avoiding the subject indefinitely can leave the concern unresolved.']},
    {title:'Your partner spends time with friends.',text:'You notice jealousy and worry that you are becoming less important.',options:['Tell them they cannot spend time with those friends.','Notice the feeling, identify the fear, and ask for a calm conversation if needed.','Check their private messages to reassure yourself.'],feedback:['Trying to control friendships can damage trust and independence.','This acknowledges the emotion without turning it into control.','Checking private messages violates privacy and does not build trust.']},
    {title:'A message sounds colder than usual.',text:'You are tempted to assume the other person is angry with you.',options:['Ask a clear question without deciding what they meant.','Reply with something hurtful so they know how it feels.','Assume the relationship is in trouble.'],feedback:['Curiosity leaves room for context and an honest answer.','Retaliation usually adds another problem instead of resolving the first.','One message is incomplete information; look for context and patterns.']}
  ];
  let scenarioIndex = 0;

  function action(actionName, target) {
    if (actionName === 'copy-output') { const el = q(`#${target || ''}`); if (el) copy(el.value); return; }
    if (actionName === 'save-mood') {
      const selected = q('.v2-mood-choice.selected'); if (!selected) { toast('Choose a feeling first.'); return; }
      const list = read(KEYS.moods, []); const item = { id: makeId(), mood: selected.dataset.mood, note: q('#v2MoodNote').value.trim(), at: stamp() };
      if (write(KEYS.moods, [item, ...list].slice(0, 100))) { renderMoodHistory(); record('Mood check-in', item.mood); toast('Mood check-in saved on this device.'); }
    }
    if (actionName === 'timer-start') startTimer();
    if (actionName === 'timer-pause') { stopTimer(); q('#v2BreathPrompt').textContent = 'Timer paused. Resume when you are ready.'; }
    if (actionName === 'timer-resume') startTimer();
    if (actionName === 'timer-reset') { stopTimer(); timerRemaining = selectedMinutes * 60; paintTimer(); q('#v2BreathPrompt').textContent = 'Timer reset. Take your time.'; }
    if (actionName === 'wizard-next') { storeWizardAnswer(); if (!wizard.answers[wizard.step]) { toast('Add a few words before moving on, or use “Not sure yet.”'); return; } wizard.step++; q('#v2WizardMount').innerHTML = wizardStepMarkup(); }
    if (actionName === 'wizard-back') { storeWizardAnswer(); wizard.step = Math.max(0, wizard.step - 1); q('#v2WizardMount').innerHTML = wizardStepMarkup(); }
    if (actionName === 'wizard-save') {
      storeWizardAnswer();
      if (!wizard.answers[wizard.step]) { toast('Add a short next step before saving.'); return; }
      const details = wizardSteps.map(([title],i) => ({title,answer:wizard.answers[i]}));
      if (savePlan('Argument recovery plan', details)) q('#v2WizardMount').innerHTML = `<div class="v2-success-state"><span>✓</span><h3>Your plan is saved.</h3><p>You can revisit these notes and decide what feels useful to discuss when both people are ready.</p>${details.map(item=>`<div class="v2-summary-item"><b>${esc(item.title)}</b><p>${esc(item.answer)}</p></div>`).join('')}${toolButton('Start a new plan','restart-wizard','button-outline')}</div>`;
    }
    if (actionName === 'restart-wizard') { wizard={step:0,answers:Array(7).fill('')}; q('#v2WizardMount').innerHTML=wizardStepMarkup(); }
    if (actionName === 'review-message') reviewMessage();
    if (actionName === 'clear-before-send') { q('#v2OriginalMessage').value=''; q('#v2ImprovedMessage').value=''; q('#v2BeforeFeedback').hidden=true; qa('.v2-before-check').forEach(el=>el.checked=false); }
    if (actionName === 'generate-appreciation') generateAppreciation();
    if (actionName === 'save-appreciation') saveAppreciation();
    if (actionName === 'generate-quality') generateQuality();
    if (actionName === 'build-compromise') buildCompromise();
    if (actionName === 'clear-compromise') { ['v2CompA1','v2CompA2','v2CompA3','v2CompB1','v2CompB2','v2CompB3'].forEach(id=>q(`#${id}`).value=''); q('#v2CompromiseResult').hidden=true; }
    if (actionName === 'build-boundary') buildBoundary();
    if (actionName === 'new-challenge') setChallenge('Daily practice');
    if (actionName === 'new-weekly-challenge') setChallenge('Weekly practice');
    if (actionName === 'complete-challenge') completeChallenge();
    if (actionName === 'translate-feeling') translateFeeling();
    if (actionName === 'build-apology') buildApology();
    if (actionName === 'build-trust') buildTrust();
    if (actionName === 'build-conversation') buildConversation();
    if (actionName === 'next-scenario') nextScenario();
    if (actionName === 'save-goal-review') { const text = q('#v2GoalReview').value.trim(); if (!text) { toast('Write a short weekly reflection first.'); return; } if (savePlan('Weekly personal growth review', [{title:'Weekly review',answer:text}])) q('#v2GoalReview').value=''; }
    if (actionName === 'save-weekly') saveWeekly();
    if (actionName === 'clear-weekly') { editingWeeklyId=null; ['v2WeeklyA1','v2WeeklyB1','v2WeeklyA2','v2WeeklyB2','v2WeeklyGoal'].forEach(id=>q(`#${id}`).value=''); q('#v2WeeklyConsent').checked=false; const saveButton=q('[data-tool-action="save-weekly"]');if(saveButton)saveButton.textContent='Save weekly check-in'; }
    if (actionName === 'refresh-timeline') renderTimelineTool();
  }

  function reviewMessage() {
    const original = q('#v2OriginalMessage').value.trim(); if (!original) { toast('Write a message first.'); return; }
    const checks = qa('.v2-before-check').map(el=>el.checked);
    const notes = [];
    if (/\b(always|never|every time|you don't care|you clearly)\b/i.test(original)) notes.push('Try replacing absolute words with the specific moment you noticed.');
    if (/\b(reply now|answer me|right now|you have to)\b/i.test(original)) notes.push('Consider making a request rather than demanding an immediate response.');
    if (/\b(you made me|because of you)\b/i.test(original)) notes.push('Try naming your feeling and the event separately from assigning blame.');
    if (checks[0]) notes.push('Look for sentences that describe the other person’s character instead of a specific action.');
    if (checks[1]) notes.push('Use “I might be misunderstanding” when you are not sure what they intended.');
    if (checks[2]) notes.push('Consider adding one calm sentence that names your feeling or the need behind it.');
    if (checks[3]) notes.push('Leave room for the other person to choose when they are ready to talk.');
    if (checks[4]) notes.push('A respectful message can ask for a reply without setting an unrealistic deadline.');
    if (checks[5]) notes.push('Try ending with one clear, realistic request instead of several demands.');
    if (!notes.length) notes.push('Your draft may already be clear. Read it once more and check that it sounds like you.');
    q('#v2BeforeFeedback').hidden = false;
    q('#v2BeforeFeedback').innerHTML = `<strong>Things to consider</strong><ul>${notes.map(item=>`<li>${esc(item)}</li>`).join('')}</ul><p>This is a basic wording check, not an assessment of the full conversation.</p>`;
    let improved = original;
    if (/\byou never talk to me\b/i.test(original)) {
      improved = 'I have been missing our conversations lately. Could we find some time to talk?';
    } else if (/\byou always ignore me\b/i.test(original)) {
      improved = 'I have been feeling unheard lately. Could we talk about how we can make space for each other?';
    } else if (/\byou clearly don't care\b/i.test(original)) {
      improved = 'I have been feeling unsure where I stand, and I would like to understand how you see things.';
    } else if (/\breply to me right now\b/i.test(original)) {
      improved = 'Please let me know when you have time to reply. I understand you may be busy.';
    } else if (/\b(always|never|every time)\b/i.test(original)) {
      improved = 'I want to explain something I noticed without blaming you: [describe the specific moment]. I felt [name your feeling], and I would like to understand your perspective. Could we talk when we are both ready?';
    } else if (improved === original) {
      improved = `I want to explain something without blaming you: ${original} Could we talk about it when we are both ready?`;
    }
    q('#v2ImprovedMessage').value = improved;
  }
  function generateAppreciation() {
    const type = q('#v2AppreciationType').value, pool = appreciationIdeas[type] || appreciationIdeas.ordinary;
    q('#v2AppreciationOutput').value = pool[Math.floor(Math.random() * pool.length)];
  }
  function saveAppreciation() {
    const text = q('#v2AppreciationOutput').value.trim(); if (!text) { toast('Generate or write an idea first.'); return; }
    const items = read(KEYS.appreciation, []);
    items.unshift({id:makeId(),text,at:stamp()});
    if (write(KEYS.appreciation, items.slice(0,30))) { renderAppreciationFavorites(); record('Saved appreciation idea','Appreciation message'); toast('Favorite saved on this device.'); }
  }
  function generateQuality() {
    const budget=q('#v2QualityBudget').value, time=q('#v2QualityTime').value, setting=q('#v2QualitySetting').value, mood=q('#v2QualityMood').value;
    const filtered = qualityIdeas.filter(item => (budget==='any'||item.budget===budget|| (budget==='low'&&item.budget==='free') || (budget==='flexible'&&item.budget!=='free')) && (time==='any'||item.time<=Number(time)) && (setting==='any'||item.setting.includes(setting)) && (mood==='any'||item.mood.includes(mood)));
    const result = filtered.length ? filtered[Math.floor(Math.random()*filtered.length)] : null;
    q('#v2QualityResult').hidden = false;
    q('#v2QualityResult').innerHTML = result ? `<span class="mini-label">A MATCH FOR YOUR FILTERS</span><h3>${esc(result.title)}</h3><p>${esc(result.detail)}</p><small>${esc(result.budget==='free'?'Free':result.budget==='low'?'Low-cost':'Flexible')} · About ${result.time} minutes</small><div class="v2-tool-actions"><button type="button" class="button button-outline button-small" data-save-quality="${esc(result.title)}">Save favorite</button></div>` : '<strong>No exact match found.</strong><p>Try changing one or more filters to see more ideas.</p>';
  }
  function buildCompromise() {
    const ids=['v2CompA1','v2CompA2','v2CompA3','v2CompB1','v2CompB2','v2CompB3'];
    const values=ids.map(id=>q(`#${id}`).value.trim());
    if (!values[0] || !values[3]) { toast('Add what each person needs before exploring options.'); return; }
    const result = `<span class="mini-label">BOTH PERSPECTIVES</span><div class="v2-two-column"><div><h3>Person A</h3><p><b>Need:</b> ${esc(values[0])}</p><p><b>Why it matters:</b> ${esc(values[1]||'Not shared yet')}</p><p><b>Flexibility:</b> ${esc(values[2]||'Not shared yet')}</p></div><div><h3>Person B</h3><p><b>Need:</b> ${esc(values[3])}</p><p><b>Why it matters:</b> ${esc(values[4]||'Not shared yet')}</p><p><b>Flexibility:</b> ${esc(values[5]||'Not shared yet')}</p></div></div><h3>Discussion prompts</h3><ul><li>Which needs can both people respect at the same time?</li><li>Is there a small experiment you would both freely agree to try?</li><li>What would make the arrangement feel fair and safe to each person?</li></ul><p>No one has to accept an option. Some differences may need a boundary or a decision rather than a compromise.</p><button type="button" class="button button-outline button-small" data-tool-action="save-compromise">Save this plan</button>`;
    q('#v2CompromiseResult').hidden=false; q('#v2CompromiseResult').innerHTML=result;
  }
  function buildBoundary() {
    const category=q('#v2BoundaryCategory').value, ok=q('#v2BoundaryOk').value.trim(), no=q('#v2BoundaryNo').value.trim(), why=q('#v2BoundaryWhy').value.trim();
    if (!ok || !no) { toast('Describe what feels okay and what feels uncomfortable.'); return; }
    q('#v2BoundaryOutput').value = `I want to talk about ${category.toLowerCase()}. I feel comfortable with ${ok}. I feel uncomfortable with ${no}. This matters to me because ${why || 'it helps me look after my wellbeing and communicate clearly'}. I hope we can discuss a respectful way forward.`;
  }
  function setChallenge(type) {
    const previous = q('#v2ChallengeTitle').textContent;
    const pool = challenges.filter(item=>item!==previous);
    currentChallenge = pool[Math.floor(Math.random()*pool.length)] || challenges[0]; currentChallengeType = type;
    q('#v2ChallengeTitle').textContent=currentChallenge; q('#v2ChallengeType').textContent=type;
  }
  function completeChallenge() {
    const items=read(KEYS.challenges,[]);
    if (items.some(item=>item.title===currentChallenge && new Date(item.at).toDateString()===new Date().toDateString())) { toast('You have already recorded this challenge today.'); return; }
    items.unshift({id:makeId(),title:currentChallenge,type:currentChallengeType,done:true,at:stamp()});
    if (write(KEYS.challenges,items.slice(0,100))) { renderChallengeHistory(); record('Completed challenge',currentChallenge); toast('Challenge recorded. Small steps count.'); }
  }
  function translateFeeling() {
    const choice=q('#v2FeelingChoice').value, context=q('#v2FeelingContext').value.trim();
    const starts={ignored:'I have been feeling a little disconnected',jealous:'I noticed I am feeling insecure about something',overwhelmed:'I am feeling overwhelmed and may need a little time',unappreciated:'I have been feeling like my effort is not being noticed',worried:'I have been feeling worried and would like some clarity',confused:'I am feeling confused about what happened',lonely:'I have been feeling lonely and would appreciate some connection',disappointed:'I felt disappointed about what happened',hurt:'I felt hurt by that situation'};
    q('#v2FeelingOutput').value = `${starts[choice] || 'I have been having a hard time explaining how I feel'}${context ? ` after ${context}` : ''}. I do not want to assume what you meant. Could we talk about it when we are both ready?`;
  }
  function buildApology() {
    const actionText=q('#v2ApologyAction').value.trim(), impact=q('#v2ApologyImpact').value.trim(), own=q('#v2ApologyOwn').value.trim(), change=q('#v2ApologyChange').value.trim();
    if (!actionText || !own || !change) { toast('Complete what happened, your responsibility, and your next step.'); return; }
    q('#v2ApologyOutput').value = `I want to apologize for ${actionText}. I understand it may have affected you by ${impact || 'causing frustration or hurt'}. I take responsibility for ${own}. I will work on ${change}. I understand that you may need time, and I will respect that.`;
  }
  function buildTrust() {
    const issue=q('#v2TrustIssue').value.trim(), boundary=q('#v2TrustBoundary').value.trim(), actions=q('#v2TrustActions').value.trim(), review=q('#v2TrustReview').value.trim();
    if (!issue || !actions) { toast('Describe what affected trust and the actions that are realistic.'); return; }
    q('#v2TrustResult').hidden=false; q('#v2TrustResult').innerHTML=`<h3>Trust rebuilding outline</h3><p><b>What affected trust:</b> ${esc(issue)}</p><p><b>Boundaries to respect:</b> ${esc(boundary||'Discuss together before making assumptions.')}</p><p><b>Actions to practise:</b> ${esc(actions)}</p><p><b>Review point:</b> ${esc(review||'Agree together on a suitable time to check in.')}</p><p>Trust is built through consistent actions. Each person can decide what they need and whether they are comfortable continuing.</p><button type="button" class="button button-outline button-small" data-tool-action="save-trust">Save plan</button>`;
  }
  function buildConversation() {
    const topic=q('#v2ConversationTopic').value.trim(), why=q('#v2ConversationWhy').value.trim(), feeling=q('#v2ConversationFeeling').value.trim(), need=q('#v2ConversationNeed').value.trim(), listen=q('#v2ConversationListen').value.trim();
    if (!topic || !need) { toast('Add the topic and what you need to communicate.'); return; }
    q('#v2ConversationResult').hidden=false; q('#v2ConversationResult').innerHTML=`<h3>Conversation outline</h3><ol><li><b>Open with:</b> “I would like to talk about ${esc(topic)} because ${esc(why||'it matters to me')}.”</li><li><b>Share your feeling:</b> ${esc(feeling||'Name what you feel in your own words.')}</li><li><b>Communicate your need:</b> ${esc(need)}</li><li><b>Invite their perspective:</b> ${esc(listen||'What has this been like for you?')}</li><li><b>Close:</b> Agree on one respectful next step, or take time to think if you are not ready.</li></ol><button type="button" class="button button-outline button-small" data-tool-action="save-conversation">Save outline</button>`;
  }
  function nextScenario() {
    scenarioIndex=(scenarioIndex+1)%scenarios.length; const item=scenarios[scenarioIndex];
    q('#v2ScenarioTitle').textContent=item.title; q('#v2ScenarioText').textContent=item.text;
    q('#v2ScenarioOptions').innerHTML=item.options.map((option,index)=>`<button type="button" class="v2-scenario-option" data-scenario-choice="${index}">${esc(option)}</button>`).join('');
    q('#v2ScenarioFeedback').hidden=true;
  }
  function saveWeekly() {
    if (!q('#v2WeeklyConsent').checked) { toast('Both people must agree before saving shared answers.'); return; }
    const item={id:editingWeeklyId||makeId(),a1:q('#v2WeeklyA1').value.trim(),a2:q('#v2WeeklyA2').value.trim(),b1:q('#v2WeeklyB1').value.trim(),b2:q('#v2WeeklyB2').value.trim(),goal:q('#v2WeeklyGoal').value.trim(),at:stamp()};
    if (![item.a1,item.a2,item.b1,item.b2,item.goal].some(Boolean)) { toast('Add at least one response before saving.'); return; }
    const items=read(KEYS.weekly,[]); const exists=items.some(entry=>entry.id===item.id);
    const next=exists?items.map(entry=>entry.id===item.id?item:entry):[item,...items];
    if (write(KEYS.weekly,next.slice(0,30))) { editingWeeklyId=null; renderWeeklyHistory();const saveButton=q('[data-tool-action="save-weekly"]');if(saveButton)saveButton.textContent='Save weekly check-in';record(exists?'Updated weekly couple check-in':'Weekly couple check-in','Saved shared weekly check-in'); toast(exists?'Shared check-in updated.':'Shared check-in saved on this device.'); }
  }

  function handleToolClick(event) {
    const open = event.target.closest('[data-open-tool]');
    if (open) { openTool(open.dataset.openTool); return; }
    const mood = event.target.closest('[data-mood]');
    if (mood) {
      qa('.v2-mood-choice').forEach(item=>item.classList.toggle('selected',item===mood));
      const info=moodGuidance[mood.dataset.mood]||[];
      q('#v2MoodMeaning').hidden=false;
      q('#v2MoodMeaning').innerHTML=`<strong>${esc(mood.dataset.mood)}</strong><p>${esc(info[0])}</p><p><b>A healthy next step:</b> ${esc(info[1])}</p><p><b>Reflection question:</b> ${esc(info[2])}</p>`;
      return;
    }
    const duration = event.target.closest('[data-timer-minutes]');
    if (duration) { stopTimer(); selectedMinutes=Number(duration.dataset.timerMinutes); timerRemaining=selectedMinutes*60; qa('[data-timer-minutes]').forEach(item=>item.classList.toggle('selected',item===duration)); paintTimer(); return; }
    const goalToggle = event.target.closest('[data-goal-toggle]');
    if (goalToggle) { const items=read(KEYS.goals,[]); const goal=items.find(item=>item.id===goalToggle.dataset.goalToggle); if(goal){goal.done=goalToggle.checked;goal.updatedAt=stamp();write(KEYS.goals,items);renderGoals();record(goal.done?'Completed goal':'Reopened goal',goal.title);} return; }
    const goalEdit = event.target.closest('[data-goal-edit]');
    if (goalEdit) { const items=read(KEYS.goals,[]); const item=items.find(g=>g.id===goalEdit.dataset.goalEdit); if(item){const next=prompt('Edit this personal goal:',item.title);if(next&&next.trim()){item.title=next.trim();write(KEYS.goals,items);renderGoals();renderDashboard();}} return; }
    const goalDelete = event.target.closest('[data-goal-delete]');
    if (goalDelete) { const items=read(KEYS.goals,[]); const item=items.find(g=>g.id===goalDelete.dataset.goalDelete); if(item&&confirm('Delete this goal from this device?')){write(KEYS.goals,items.filter(g=>g.id!==item.id));renderGoals();record('Deleted goal',item.title);} return; }
    const editWeekly=event.target.closest('[data-weekly-edit]');
    if(editWeekly){const item=read(KEYS.weekly,[]).find(x=>x.id===editWeekly.dataset.weeklyEdit);if(item){editingWeeklyId=item.id;q('#v2WeeklyA1').value=item.a1||'';q('#v2WeeklyA2').value=item.a2||'';q('#v2WeeklyB1').value=item.b1||'';q('#v2WeeklyB2').value=item.b2||'';q('#v2WeeklyGoal').value=item.goal||'';q('#v2WeeklyConsent').checked=true;const saveButton=q('[data-tool-action="save-weekly"]');if(saveButton)saveButton.textContent='Update weekly check-in';toast('Editing shared check-in. Both people should review it together.');}return;}
    const removeWeekly=event.target.closest('[data-weekly-delete]');
    if(removeWeekly){const items=read(KEYS.weekly,[]);if(confirm('Delete this shared check-in from this device?')){write(KEYS.weekly,items.filter(x=>x.id!==removeWeekly.dataset.weeklyDelete));renderWeeklyHistory();renderDashboard();}return;}
    const timelineEdit=event.target.closest('[data-timeline-edit]');
    if(timelineEdit){mutateTimelineItem(timelineEdit.dataset.timelineEdit,'edit');return;}
    const timelineDelete=event.target.closest('[data-timeline-delete]');
    if(timelineDelete){mutateTimelineItem(timelineDelete.dataset.timelineDelete,'delete');return;}
    const removeAppreciation=event.target.closest('[data-appreciation-delete]');
    if(removeAppreciation){write(KEYS.appreciation,read(KEYS.appreciation,[]).filter(x=>x.id!==removeAppreciation.dataset.appreciationDelete));renderAppreciationFavorites();return;}
    const saveQuality=event.target.closest('[data-save-quality]');
    if(saveQuality){const items=read(KEYS.quality,[]);items.unshift({id:makeId(),title:saveQuality.dataset.saveQuality,at:stamp()});write(KEYS.quality,items.slice(0,40));renderQualityFavorites();record('Saved quality-time idea',saveQuality.dataset.saveQuality);return;}
    const removeQuality=event.target.closest('[data-quality-delete]');
    if(removeQuality){write(KEYS.quality,read(KEYS.quality,[]).filter(x=>x.id!==removeQuality.dataset.qualityDelete));renderQualityFavorites();renderDashboard();return;}
    const scenario=event.target.closest('[data-scenario-choice]');
    if(scenario){const item=scenarios[scenarioIndex], index=Number(scenario.dataset.scenarioChoice);q('#v2ScenarioFeedback').hidden=false;q('#v2ScenarioFeedback').innerHTML=`<strong>${index===1?'A balanced option':'Consider the possible impact'}</strong><p>${esc(item.feedback[index])}</p><p>Ask yourself: does this response respect both people’s feelings and boundaries?</p>`;return;}
    const button=event.target.closest('[data-tool-action]');
    if(button){action(button.dataset.toolAction,button.dataset.copyTarget);return;}
  }

  function handleToolSubmit(event) {
    if (event.target.id === 'v2GoalForm') {
      event.preventDefault(); const title=q('#v2GoalTitle').value.trim(); if(!title)return;
      const items=read(KEYS.goals,[]); items.unshift({id:makeId(),title,category:q('#v2GoalCategory').value,done:false,createdAt:stamp()});
      if(write(KEYS.goals,items.slice(0,80))){q('#v2GoalForm').reset();renderGoals();record('Added personal goal',title);toast('Goal saved on this device.');}
    }
    if (event.target.id === 'v2StyleForm') {
      event.preventDefault(); const answers=[];
      for(let i=0;i<7;i++){const selected=q(`input[name="style-${i}"]:checked`);if(!selected){toast('Answer each question to build your summary.');return;}answers.push(Number(selected.value));}
      const themes=['clear communication','reassurance and consistency','time to process','appreciation through actions and words','mutual independence','being listened to','preparing for difficult conversations'];
      const result=answers.map((value,index)=>`${themes[index]}: ${['You often prefer a direct, spoken approach.','You often prefer a little time or a mix, depending on context.','You often value a flexible approach that considers the situation.'][value]}`).join('\n');
      q('#v2StyleResult').hidden=false;q('#v2StyleResult').innerHTML=`<h3>Your communication preferences</h3><p>${esc(result).replace(/\n/g,'<br>')}</p><p>These are preferences, not fixed traits. You can share any part of this summary if you feel comfortable.</p><button type="button" class="button button-outline button-small" data-tool-action="save-style">Save summary</button>`;
      q('#v2StyleResult').dataset.summary=result;
    }
  }

  function handleActionsExtended(name) {
    if (name==='save-compromise') { const text=['v2CompA1','v2CompA2','v2CompA3','v2CompB1','v2CompB2','v2CompB3'].map(id=>q(`#${id}`).value.trim()).join('\n');savePlan('Compromise discussion notes',[{title:'Both perspectives',answer:text}]); }
    if (name==='save-trust') { const text=['v2TrustIssue','v2TrustBoundary','v2TrustActions','v2TrustReview'].map(id=>q(`#${id}`).value.trim()).join('\n');savePlan('Trust rebuilding plan',[{title:'Plan notes',answer:text}]); }
    if (name==='save-conversation') { const text=['v2ConversationTopic','v2ConversationWhy','v2ConversationFeeling','v2ConversationNeed','v2ConversationListen'].map(id=>q(`#${id}`).value.trim()).join('\n');savePlan('Conversation outline',[{title:'Discussion preparation',answer:text}]); }
    if (name==='save-style') { const text=q('#v2StyleResult').dataset.summary||'';const items=read(KEYS.style,[]);items.unshift({id:makeId(),text,at:stamp()});write(KEYS.style,items.slice(0,20));record('Saved communication preferences','Communication style summary');toast('Summary saved on this device.'); }
  }

  function initV2() {
    renderCatalog(); renderDashboard();
    q('#v2ToolSearch').addEventListener('input', event => {
      const term=event.target.value.trim().toLowerCase(); let visible=0;
      qa('.v2-tool-card').forEach(card=>{const show=card.textContent.toLowerCase().includes(term);card.hidden=!show;if(show)visible++;});
      q('#v2ToolEmpty').hidden=visible>0; q('#v2PrimaryCount').textContent=`${qa('#v2PrimaryTools .v2-tool-card:not([hidden])').length} tools`;q('#v2ExtraCount').textContent=`${qa('#v2ExtraTools .v2-tool-card:not([hidden])').length} extras`;
    });
    document.addEventListener('click', handleToolClick);
    document.addEventListener('click', event => { const b=event.target.closest('[data-tool-action="save-compromise"],[data-tool-action="save-trust"],[data-tool-action="save-conversation"],[data-tool-action="save-style"]'); if(b) handleActionsExtended(b.dataset.toolAction); });
    document.addEventListener('submit', handleToolSubmit);
    q('#v2CloseTool').addEventListener('click',()=>{stopTimer();q('#v2ToolDialog').close();});
    q('#v2ToolDialog').addEventListener('close',stopTimer);
    q('#v2ToolDialog').addEventListener('click',event=>{if(event.target===q('#v2ToolDialog')){stopTimer();q('#v2ToolDialog').close();}});
    q('#v2NewDashboardReminder').addEventListener('click',()=>{const list=remindersV2.filter(item=>item!==q('#v2DashboardReminder').textContent);q('#v2DashboardReminder').textContent=list[Math.floor(Math.random()*list.length)];});
    q('#v2ClearData').addEventListener('click',()=>{
      if(!confirm('Delete all BETWEEN US data saved in this browser? This includes v2 tool data and your existing reflection journal. This cannot be undone.'))return;
      Object.keys(localStorage).filter(key=>key.startsWith(PREFIX)||key==='betweenUsReflections_v1').forEach(key=>localStorage.removeItem(key));
      renderDashboard(); if(q('#journalCount'))q('#journalCount').textContent='No saved reflections yet'; toast('Local BETWEEN US data cleared.');
    });
    // Extend the mobile menu's existing close behavior for the new section links.
    qa('#mainNav a').forEach(link=>link.addEventListener('click',()=>{q('#mainNav').classList.remove('open');q('#menuToggle').setAttribute('aria-expanded','false');}));
    // Active navigation tracking includes the added dashboard and toolbox sections.
    if ('IntersectionObserver' in window) {
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){qa('.nav-link').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));}}),{rootMargin:'-28% 0px -62% 0px'});
      ['dashboard','all-tools'].forEach(id=>{const section=q(`#${id}`);if(section)observer.observe(section);});
    }
    q('#v2DashboardReminder').textContent=remindersV2[0];
    q('#currentYear').textContent=new Date().getFullYear();
  }
  document.addEventListener('DOMContentLoaded', initV2);
})();
