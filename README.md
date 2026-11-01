# BETWEEN US — Version 2

A responsive, mobile-first relationship support website built with **HTML5, CSS3, and vanilla JavaScript**. It runs locally in Visual Studio Code with Live Server and can be published as a static site using GitHub Pages or Netlify.

## What's included

### Core experience
- Premium dark, lavender, and pink visual theme.
- Responsive homepage and mobile navigation.
- Relationship Journey with five flexible learning stages.
- Searchable advice library and guided situation advice.
- Understand Both Sides perspective explorer.
- Message Helper, daily reminders, relationship check-in, and reflection journal.
- Communication mini-guide and About/disclaimer section.

### Dashboard
- Locally calculated mood, goal, challenge, and reflection summaries.
- Current personal goals and recent activity timeline.
- Quick access to the toolbox and a local-data reset option.

### 12 core interactive tools
1. Mood Check-in — save emotion check-ins and optional notes.
2. Cool Down Before You Reply — 1-, 3-, and 5-minute timer with pause, resume, reset, and prompts.
3. Argument Recovery Planner — seven-step guided planner with saved plans.
4. Before You Send — wording checklist and editable suggestion.
5. Communication Style — preference quiz and locally saved summary.
6. Relationship Growth Tracker — add, edit, complete, and delete goals; save weekly reviews.
7. Appreciation Generator — create, edit, copy, and save favorite ideas.
8. Weekly Couple Check-in — separate Person A and Person B responses, shared summary, edit/delete, and explicit shared-consent checkbox.
9. Compromise Builder — compare both perspectives and save discussion notes.
10. Quality Time Idea Generator — filter by budget, time (including 5-minute ideas), setting, and mood; save favorites.
11. Boundary Builder — create an editable boundary statement.
12. Personal Growth Challenges — daily/weekly prompts and completion history.

### Six additional tools
- Feelings Translator
- Apology Builder
- Trust Rebuilding Planner
- Conversation Planner
- Conflict Simulator
- Personal Progress Timeline

All tools are client-side. The simple message and wording helpers use predefined templates and text rules; they are **not AI**, do not connect to an AI service, and cannot know the full context of a relationship.

## Project structure

```text
BETWEEN-US/
├── index.html
├── style.css
├── script.js
├── v2.js
├── bridge.js          # v2.1 flagship guided conversation
├── README.md
└── assets/
    ├── images/
    └── icons/
```

## Run locally in VS Code

1. Extract `BETWEEN-US-v2.zip` to a folder on your Windows computer.
2. Open Visual Studio Code.
3. Choose **File → Open Folder** and select the `BETWEEN-US` folder.
4. Open Extensions (`Ctrl+Shift+X`) and install **Live Server** by Ritwick Dey.
5. Open `index.html` in the editor.
6. Right-click inside the editor and choose **Open with Live Server**.
7. The browser should open a local address similar to `http://127.0.0.1:5500`.
8. Edit `index.html`, `style.css`, `script.js`, or `v2.js`; Live Server refreshes the browser when files change.

No Node.js, npm, database, backend, or API key is required. You can also open `index.html` directly in a browser, although browser features such as clipboard access can be more limited outside localhost/HTTPS.

## How to use the website

- Use the navigation bar to open Journey, Advice, Find Guidance, Both Sides, Tools, Dashboard, and Toolbox.
- Open a toolbox card to launch its interactive panel.
- Use the dashboard to review locally saved progress.
- Use the original **Reflection Journal** for longer private reflections; open it from the original Tools section.
- For two-person activities, use the same device only when both people agree to view and save the shared answers.

## Privacy and data storage

- The site has no user accounts, backend, analytics, or hidden tracking code.
- Journal entries from the original version and v2 activities are stored in the browser's `localStorage` on the current device.
- Data does not automatically sync to another browser or device.
- `localStorage` is not encrypted cloud storage. Anyone with access to the browser profile/device may be able to access saved information. Avoid storing passwords or details you would not want another device user to see.
- Clearing browser/site data may erase saved entries.
- The dashboard's **Delete all local BETWEEN US data** button removes the site's local journal and v2 data from that browser. It does not delete browser data belonging to other websites.
- The Weekly Couple Check-in is a shared-device activity. Both partners must agree before the shared responses are saved. It does not send responses to the other person's device.

## Publish free with GitHub Pages

1. Sign in to GitHub and create a new repository, for example `BETWEEN-US`.
2. Upload the contents of the project folder. Make sure `index.html` is in the repository root, not inside another nested folder.
3. Open the repository's **Settings**.
4. Select **Pages** from the left menu.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Wait for GitHub Pages to finish publishing. The Pages screen will show the public URL.
8. Open the URL on a phone using mobile data or another network to confirm it is public.
9. To update the site, upload/commit the changed files to the same branch. GitHub Pages will publish the new version.

GitHub's menus may change over time; follow the current labels shown in repository Settings → Pages.

## Publish free with Netlify

1. Create/sign in to a Netlify account.
2. Choose the option to add a new site/project.
3. Either connect your GitHub repository or use Netlify's manual deploy/drop interface if it is available on your account.
4. For a manual deploy, upload the **contents** of the `BETWEEN-US` folder (the root must contain `index.html`).
5. Netlify will publish a site and provide a public `*.netlify.app` address.
6. Open the public URL on desktop and phone to test it.
7. For future updates, redeploy the updated folder or push changes to the connected repository.

No paid custom domain is required. The default hosting subdomain is sufficient.

## Mobile and accessibility checks

Use browser responsive design tools to test at approximately:

- 320px, 360px, 375px, 390px, 414px, and 430px phone widths.
- 768px tablet width.
- 1024px small-laptop width.
- 1440px desktop width.

Also test portrait and landscape orientations, keyboard navigation, visible focus states, form labels, and reduced-motion preferences. Real-device testing in Safari on iPhone and Chrome/Samsung Internet on Android is still recommended before sharing the public site widely.

## Troubleshooting

**CSS is missing:** confirm `style.css` is next to `index.html` and the link is exactly `style.css`.

**JavaScript is missing:** confirm both `script.js` and `v2.js` are next to `index.html`; check the browser console for file path or syntax errors.

**Live Server does not open:** right-click `index.html` and choose Open with Live Server, or use the **Go Live** control in VS Code. Check whether another app is already using the chosen port.

**Changes do not appear:** save the file, refresh the browser, and try a hard refresh (`Ctrl+Shift+R`).

**Clipboard copying is blocked:** use the website through Live Server (localhost) or HTTPS. You can also select the generated text and copy manually.

**Saved data is missing:** check that you are using the same browser profile and same site address. `localhost`, a GitHub Pages URL, and a Netlify URL each have separate browser storage.

## Important limitations

- The site is static. There are no accounts, cloud sync, private partner invitations, or cross-device shared check-ins.
- The tools provide educational prompts and templates, not therapy, diagnosis, legal advice, or emergency support.
- Advice cannot guarantee a relationship outcome. Boundaries, safety, and each person's freedom to choose must be respected.
- PWA/offline installation is a possible future enhancement and is not part of this initial v2 build.

---

**BETWEEN US — Because understanding each other is part of loving each other.**


## Version 2.1 — THE BRIDGE

THE BRIDGE is the flagship guided two-person conversation experience, launched from the homepage feature panel. It supports Person A and Person B turn-by-turn answers, explicit two-person consent before revealing either perspective, reflection/acknowledgement, an understanding check, common-ground notes, a voluntary action plan, and an editable summary. Conversations can be saved, resumed, copied, deleted, restarted, paused, or exited without saving.

### Privacy and storage

The initial release runs without an account or backend. Saved Bridge conversations use browser `localStorage` on the current device only. They are not encrypted, password-protected, or synchronized to other devices. The Bridge does not read or share the separate private reflection journal. Both participants should use the same device and only reveal answers when comfortable.

### Updating an existing GitHub Pages repository

Upload/replace `index.html` and `style.css`, and add the new `bridge.js` file in the repository root. Keep the existing `script.js`, `v2.js`, favicon files, and `assets` folder unchanged. Commit the changes to the publishing branch.

## Version 2.2 — THE FOLLOW-THROUGH

Adds a same-device, local-only progress workspace with personal commitments (private to the selected participant or explicitly shared), shared relationship goals, target dates, status and notes, follow-up review dates, progress check-ins with private/shared visibility, and a growth timeline. Goal agreements can be kept in progress, paused, replaced, or completed. Data can be exported or deleted from the feature.

Review dates are displayed in the website; this static version does not guarantee operating-system notifications and cannot sync across devices. Local browser storage is not encrypted or password-protected. Upload the updated `index.html`, `style.css`, and new `followthrough.js` to your existing repository. Keep the existing `script.js`, `v2.js`, `bridge.js`, and other assets.


# Version 2.3 — PARTNER LINK

PARTNER LINK adds cross-device connections using Supabase Auth (anonymous sign-in), Postgres with Row Level Security, Edge Functions for one-time 24-hour invitation codes, and Realtime notification updates. It is not active until a Supabase project is configured and the migration and Edge Functions are deployed.

## Supabase setup (required)
1. Create a Supabase project. Enable **Anonymous Sign-Ins** in Authentication settings.
2. In SQL Editor, run `supabase/migrations/202611010001_partner_link.sql`.
3. Deploy Edge Functions `create-partner-invite` and `join-partner-invite` from the matching folders. Supabase provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to deployed Edge Functions; never copy the service-role key into website files.
4. Copy the Project URL and publishable/anon key into `supabase-config.js`. The browser key is public by design; RLS is the security boundary.
5. Upload all files to the GitHub Pages repository root, including the `supabase/` folder for your deployment reference.
6. Test with two separate browsers/devices and two separate anonymous auth identities.

## Security and scope notes
- Invite codes are random, hashed in the database, expire after 24 hours, and the join Edge Function checks the invitation and adds at most one Person B.
- Database access is guarded by RLS. A participant can read their own assessment. The partner can read it only after the owner submits with sharing consent and the other participant also submits with consent.
- Personal advice is generated in the participant's browser from that participant's own answers using explicit rule-based category guidance. It is not AI-generated and is not stored in a shared table.
- The combined report is a rule-based presentation of consented answers, not a diagnosis or judgement.
- Notifications are session-scoped shared event records; do not put private assessment text or private advice in notification bodies.
- Anonymous authentication provides a persistent browser identity, not account recovery. Clearing browser data can lose access to that identity. Add a proper account/recovery flow before production use.
- The initial implementation includes connection, assessment consent, shared summary, private rule-based advice, shared recommendations, goals, action plans, and notification center. For production, review and harden database policies, add rate limiting/abuse controls, secure account recovery, full partner/session deletion workflows, participant-specific agreement confirmations, and end-to-end security testing.
- GitHub Pages alone cannot run backend services. Supabase must be configured separately.
