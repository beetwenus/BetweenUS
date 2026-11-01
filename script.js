'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const articles = [
  {id:'space-without-pressure',category:'distance',label:'Emotional distance',title:'When your partner needs space',summary:'How to respect a pause without leaving either person guessing.',intro:'Needing space is not automatically a sign that someone has stopped caring. People sometimes need quiet time to regulate, think, or handle other responsibilities. The important part is how that space is communicated and respected.',happening:'Your partner may feel overwhelmed, tired, or unsure how to explain what is happening. You may experience the distance as uncertainty or fear. Neither interpretation is proof of what the other person intends.',why:'People have different ways of processing emotions. Some talk things through immediately; others need a little time before they can find clear words. Stress outside the relationship can also affect how available someone feels.',each:'One partner may want connection and reassurance. The other may want time to settle their thoughts. Both needs can matter at once.',do:'Ask what kind of space would help and whether you can agree on a time to reconnect. Keep your own routine going while you wait. When you talk again, share what the silence felt like without accusing.',partner:'They may need a calm conversation, no repeated messages, and a clear understanding that taking time is okay as long as it is communicated.',avoid:'Avoid repeatedly checking their online status, sending multiple messages to get an answer, or treating a short pause as definite rejection. Also avoid accepting indefinite silence as the only way problems are handled.',example:'“I understand you might need some time. I care about us, and I would appreciate knowing when we can check in again. I’ll give you room until then.”',reminder:'Space can be healthy when it comes with respect and a plan to reconnect.'},
  {id:'shorter-replies',category:'overthinking',label:'Overthinking',title:'When their replies become shorter',summary:'Separate a change you noticed from the story your mind builds around it.',intro:'A shorter message can feel meaningful when you care about someone. Before deciding it means something is wrong, pause and look at the wider pattern.',happening:'You noticed a change in the way they message. That observation is real. The reason behind it is not yet known. They could be busy, tired, distracted, stressed, or experiencing a change in how they communicate.',why:'Text messages leave out tone, facial expressions, and context. When information is missing, it is easy for worry to fill the gaps.',each:'You may be looking for reassurance and consistency. They may not realize their replies feel different, or they may have less energy for messaging that day.',do:'Name the specific change without making it an accusation. Ask whether everything is okay, then give them space to answer. Notice patterns over time rather than judging one conversation.',partner:'They may appreciate a clear, non-accusing question instead of being expected to guess what you are worried about.',avoid:'Avoid sending test messages, demanding instant replies, or treating online activity as proof that someone is deliberately ignoring you.',example:'“Hey, I noticed our conversations have felt a little shorter lately. Is everything okay between us, or have things just been busy?”',reminder:'A fact is what happened. An assumption is the explanation you attach to it.'},
  {id:'online-not-replying',category:'overthinking',label:'Overthinking',title:'When they are online but have not replied',summary:'Why online status is incomplete information, and what to do instead of monitoring it.',intro:'Seeing someone online without receiving a reply can trigger worry. But an online indicator does not tell you what they are doing, how they feel, or whether they are ready for a conversation.',happening:'You can see an activity indicator, but you cannot see the full context. They might be reading something, answering another message, or simply not ready to respond.',why:'Apps make availability look simple, even though real attention is not. A person can be online and still be distracted, busy, or emotionally unavailable for a conversation.',each:'You may want a response because connection helps you feel settled. They may need to choose a time when they can give the conversation proper attention.',do:'Send one clear message when needed, then step away from the app. Do something that helps you feel grounded. If response expectations keep causing tension, talk about a communication rhythm that works for both of you.',partner:'They may need a reasonable amount of time to respond without being monitored or questioned about every minute online.',avoid:'Avoid checking status repeatedly, using another account to watch activity, or sending messages designed to make them feel guilty.',example:'“I like hearing from you, but I know you have your own things going on. Let me know when you have time to talk.”',reminder:'Being visible online does not mean being available for every conversation.'},
  {id:'jealousy-without-control',category:'jealousy',label:'Jealousy & insecurity',title:'Handling jealousy without becoming controlling',summary:'Understand the feeling, identify the need underneath it, and choose a respectful response.',intro:'Jealousy is an emotion, not a command. You can acknowledge it without turning it into rules that limit another person’s friendships or choices.',happening:'You may be worried about comparison, losing connection, or not knowing where you stand. The feeling deserves attention, but it does not automatically mean a boundary has been crossed.',why:'Jealousy can grow from uncertainty, previous experiences, unclear expectations, or a fear that you are not important. Sometimes there is a real agreement that needs discussing; sometimes the worry is based on an assumption.',each:'You may need reassurance and clarity. Your partner may need trust, freedom to have friendships, and confidence that they will not be punished for normal social interactions.',do:'Identify the specific event that triggered the feeling. Ask yourself what you know and what you are imagining. Explain the feeling using “I” language, then discuss mutually agreed boundaries that apply fairly to both people.',partner:'They may appreciate being told what would reassure you, while still being treated as someone who can make their own choices.',avoid:'Avoid demanding passwords, checking private conversations, forbidding friendships, tracking someone, or using guilt to get reassurance.',example:'“I felt a little insecure when that happened. I know the feeling is mine to work through, but could we talk about what helps both of us feel respected?”',reminder:'Trust grows through honest agreements, not through control.'},
  {id:'after-an-argument',category:'conflict',label:'Arguments',title:'What to do after an argument',summary:'Move from winning the point toward understanding the impact and repairing the connection.',intro:'Arguments happen when people have different needs, interpretations, or limits. Repair is not about pretending nothing happened; it is about understanding what needs to change.',happening:'Both of you may still be upset. A person may need a pause before they can listen well. The issue may also have several parts that got tangled together.',why:'When emotions rise, people often focus on defending themselves rather than hearing the other person. Old frustrations can make one disagreement feel much bigger.',each:'You may want to resolve it quickly so the relationship feels safe again. Your partner may need time, a sincere acknowledgement, or a chance to explain their side.',do:'Wait until both people can speak respectfully. Discuss one issue at a time. Reflect what you heard before explaining your perspective. Agree on one practical change each person can make.',partner:'They may need you to understand the effect of your words or actions, not only hear that you did not mean to hurt them.',avoid:'Avoid insults, threats, scorekeeping, bringing up unrelated mistakes, or demanding immediate forgiveness.',example:'“I don’t want us to keep hurting each other while we talk. I want to understand what upset you, and I’ll explain my side too when we’re both ready.”',reminder:'Repair takes listening, accountability, and changed behavior—not just ending the argument.'},
  {id:'sincere-apology',category:'repair',label:'Repair & trust',title:'How to apologize sincerely',summary:'A meaningful apology names the action, recognizes the impact, and includes a realistic change.',intro:'An apology is not a way to force someone to forgive you. It is a way to take responsibility for your part and show that you understand why it mattered.',happening:'The other person may still be hurt even after you say sorry. They may need time to process, ask questions, or see a consistent change.',why:'A quick apology can feel incomplete when it skips what happened or focuses mostly on the apologizing person’s discomfort.',each:'You may feel guilty and want the situation to be okay again. They may need their feelings acknowledged without being hurried toward forgiveness.',do:'Be specific about what you did. Acknowledge the impact without adding “but”. Say what you will try to do differently. Then let your actions support your words.',partner:'They may need time, honesty, and a chance to explain what the action meant to them. They do not owe an immediate response.',avoid:'Avoid “sorry you feel that way,” excuses, repeated apologies that demand comfort, or promises you cannot keep.',example:'“I’m sorry I said that. It was hurtful, and I understand why it upset you. I’m going to pause before responding when I’m frustrated. You don’t have to forgive me right away.”',reminder:'A sincere apology makes room for the other person’s experience.'},
  {id:'dry-conversations',category:'communication',label:'Communication',title:'When conversations start feeling dry',summary:'Talk about connection without turning every quiet moment into a test.',intro:'A relationship does not need constant conversation to be meaningful. At the same time, it is reasonable to miss the connection you used to have.',happening:'Conversations may be shorter because of routines, school or work, tiredness, stress, or a change in what each person needs. It is worth checking in rather than deciding the reason alone.',why:'People have different social energy and schedules. The start of a relationship can also include more frequent messaging than is practical long term.',each:'You may feel close through regular conversation. Your partner may feel connected in other ways or may need more downtime.',do:'Share what you miss and ask what communication feels realistic. Suggest a shared activity or a planned check-in instead of trying to keep a conversation going at all costs.',partner:'They may need flexibility and the reassurance that a quiet day will not automatically become a conflict.',avoid:'Avoid testing whether they will message first, intentionally going cold, or measuring love only by message length.',example:'“I miss our longer conversations. Could we choose a time to catch up properly this week? I also want to know what kind of communication feels good for you.”',reminder:'Consistency matters, but connection can look different from constant messaging.'},
  {id:'feeling-unappreciated',category:'communication',label:'Communication',title:'When you feel like you are the only one trying',summary:'Describe the effort you notice, ask for specific changes, and look for mutual follow-through.',intro:'Feeling unappreciated can be lonely, especially when you are putting time and care into the relationship. The goal is not to keep score; it is to understand whether both people can contribute in ways that matter.',happening:'You may be noticing that you often initiate plans, check in, apologize, or make compromises. Your partner may not see the pattern the same way, or may show care differently.',why:'People can have different ideas about what effort looks like. Sometimes expectations have never been discussed clearly. Sometimes the imbalance is real and needs honest attention.',each:'You may need reciprocity and recognition. They may need to understand what actions help you feel cared for and explain what they are able to give.',do:'Use examples rather than broad statements. Ask for one or two specific changes. Listen to their view, then notice whether actions become more mutual over time.',partner:'They may need a clear explanation instead of being told they never do enough. They also need to take the concern seriously.',avoid:'Avoid silently building resentment, keeping a hidden scorecard, or sacrificing all your needs to prove your love.',example:'“I’ve been feeling like I initiate most of our time together. I’d feel more connected if we both took turns making plans. How does that feel to you?”',reminder:'A caring relationship makes room for effort from both people.'},
  {id:'asking-for-reassurance',category:'communication',label:'Communication',title:'How to ask for reassurance',summary:'Make a clear, reasonable request without making the other person responsible for every worry.',intro:'Wanting reassurance is human. Healthy reassurance is honest and mutual; it does not require constant proof, surveillance, or giving up personal boundaries.',happening:'Something may have made you uncertain about the relationship. You might be seeking a reminder that you matter or that a misunderstanding can be discussed.',why:'Uncertainty can feel uncomfortable. But reassurance can only help for so long if the underlying worry is never examined or communicated.',each:'You may want a direct expression of care. Your partner may want to support you without feeling they must answer the same fear repeatedly.',do:'Ask for one specific thing that would help. Share what triggered the worry. Also practise ways to calm yourself that do not depend entirely on an immediate reply.',partner:'They may need to know that a small, genuine reassurance can help, while still having permission to be busy or have boundaries.',avoid:'Avoid asking trick questions, demanding proof, or making someone responsible for removing every uncomfortable feeling.',example:'“I’m feeling a little unsure today. Could you remind me that we are okay? I’m also going to take a moment to settle my thoughts.”',reminder:'Reassurance is healthiest when it supports trust rather than replacing it.'},
  {id:'setting-boundaries',category:'communication',label:'Communication',title:'Setting a boundary kindly',summary:'A boundary explains what you will do to protect your well-being, not how to control someone else.',intro:'Boundaries help people understand what behavior they can accept and what they will do if a situation becomes unhealthy.',happening:'You may be uncomfortable with a repeated behavior, the way disagreements happen, or how much time and attention is expected.',why:'People may have different limits and may not know yours unless you communicate them. A boundary can be firm without being cruel.',each:'You may need safety, privacy, rest, or respectful communication. Your partner may need clarity about what the boundary means in practice.',do:'Be specific, calm, and realistic. Describe the behavior, say what you need, and explain what action you will take if it continues. Invite a conversation when safe.',partner:'They may need time to understand the boundary, but they do not have to agree with every preference for you to keep your own limit.',avoid:'Avoid threats disguised as boundaries, rules that control another persons friendships, or boundaries you use only to punish.',example:'“I want to talk this through, but I’m not okay with insults. If we start insulting each other, I’m going to pause the conversation and return when we can speak respectfully.”',reminder:'A boundary protects your choices; it does not control another persons.'},
  {id:'trust-rebuilding',category:'repair',label:'Repair & trust',title:'Rebuilding trust through actions',summary:'Trust is rebuilt gradually through honesty, reliability, accountability, and realistic agreements.',intro:'Trust can be damaged by dishonesty, broken agreements, or repeated behavior that leaves someone uncertain. Rebuilding it takes more than saying “trust me.”',happening:'One person may be looking for proof that something has changed. The other may feel discouraged that their efforts are not immediately believed.',why:'Trust is built from patterns over time. Both people need a shared understanding of what happened and what repair would look like.',each:'The hurt person may need transparency and consistency. The person rebuilding trust may need clear expectations and a chance to demonstrate change without being controlled.',do:'Name what damaged trust. Agree on specific, fair actions. Set a time to review how things are going. Consider outside support if the issue is complex or keeps repeating.',partner:'They may need consistency more than grand promises, and they deserve to ask reasonable questions about the agreement.',avoid:'Avoid demanding instant trust, checking every private interaction, making impossible promises, or using past mistakes to justify ongoing punishment.',example:'“I understand why that affected your trust. I want to agree on a few practical ways I can be more reliable, and we can talk again about how it is going.”',reminder:'Trust returns through consistent choices, not pressure.'},
  {id:'different-needs',category:'distance',label:'Emotional distance',title:'When you have different communication needs',summary:'Find a rhythm that respects closeness as well as personal space.',intro:'One partner may want frequent updates while the other prefers fewer, more intentional conversations. A difference does not make either person wrong, but it does need communication.',happening:'You may interpret frequent contact as care, while your partner experiences it as pressure. Or one person may experience silence as peaceful while the other feels disconnected.',why:'Communication preferences are shaped by personality, routine, responsibilities, and previous experiences. They are not always a measure of love.',each:'You may need predictable connection. They may need quiet time and flexibility. Both can make a reasonable effort to understand the other.',do:'Talk about what helps each person feel connected. Try a simple routine, such as one check-in at a predictable time, and review whether it works for both.',partner:'They may need to know that a small effort toward consistency matters, even if they do not want to message all day.',avoid:'Avoid assuming that your preferred communication style is the only caring one, or treating every compromise as proof of love.',example:'“I think we feel connected in different ways. Could we find a routine that gives us time together and still leaves room for our own day?”',reminder:'Compatibility includes learning how to meet in the middle.'}
];

const situations = {
  distant:{title:'When your partner feels distant',intro:'A change in closeness can feel unsettling. It is worth noticing, but it does not tell you the reason by itself.',happening:'They may be tired, stressed, focused on other responsibilities, processing a feeling, or unsure how to bring something up. It is also possible that something between you needs attention. You cannot know without a conversation.',you:'You might feel confused, lonely, anxious, or unsure whether to reach out. Those feelings make sense when connection feels different.',them:'They may be overwhelmed, needing quiet, or unaware that their behavior feels different to you. Try not to decide their feelings for them.',do:['Choose a calm moment and mention one specific change you noticed.','Ask an open question, then listen without immediately defending yourself.','Agree on a reasonable time to reconnect if they need space.','Keep caring for your own day while the conversation is pending.'],avoid:'Avoid repeated messages, monitoring online activity, accusations, or assuming that distance means the relationship is over.',say:'“I’ve noticed we haven’t felt as connected lately. I miss talking with you. Is something on your mind, or have things just been busy?”',reminder:'You can ask for clarity while giving someone room to answer honestly.'},
  overthinking:{title:'When your thoughts keep spiraling',intro:'Overthinking often tries to protect you by preparing for every possible outcome. But a possibility is not automatically a fact.',happening:'A small change may have triggered a bigger worry. Texting, tone, timing, and social media can leave gaps that your mind tries to fill.',you:'You may feel tense, distracted, restless, or afraid that you missed a sign. You deserve a pause before reacting.',them:'Your partner may not know how much meaning you are attaching to a small moment. They may be handling something unrelated.',do:['Write down the event in one sentence, without explaining why it happened.','Make a second list of possible explanations, not only the frightening one.','Wait until you feel calmer before sending a serious message.','Ask a direct, kind question if the concern still matters.'],avoid:'Avoid turning assumptions into accusations, repeatedly rereading old messages, or checking their activity to try to feel certain.',say:'“I might be reading too much into this, so I wanted to ask instead of assume. Are we okay?”',reminder:'You do not have to solve an imagined problem before you know what is real.'},
  jealousy:{title:'When jealousy shows up',intro:'Jealousy is a signal to understand, not an instruction to control another person.',happening:'The situation may have touched a fear about trust, comparison, or where you stand. It could also point to a boundary or agreement that needs a clear conversation.',you:'You may feel threatened, insecure, left out, or worried about losing the relationship. Naming the emotion helps you choose what to do with it.',them:'Your partner may see the interaction as ordinary friendship and may feel confused if they are treated as though they did something wrong.',do:['Identify exactly what triggered the feeling.','Separate the event from what you fear it means.','Ask for reassurance or clarity without demanding control.','Discuss mutual boundaries that apply fairly to both people.'],avoid:'Avoid passwords demands, spying, banning friendships, threats, or guilt-tripping. Those behaviors damage trust rather than build it.',say:'“I felt insecure about that moment. I’m not asking you to stop having friends; I’d like us to talk about what helps both of us feel respected.”',reminder:'You can work on insecurity and still ask for respectful communication.'},
  angry:{title:'When your partner is upset with you',intro:'Someone being upset does not automatically make you a terrible partner. It does mean there may be something important to understand.',happening:'They may feel hurt, frustrated, misunderstood, or overwhelmed. You need to hear what happened from them rather than guessing.',you:'You might feel guilty, defensive, anxious, or afraid of making things worse. Take a moment so you can listen instead of reacting.',them:'They may need acknowledgement, an explanation, a change, or time to calm down. Their feelings matter, and respectful communication still matters too.',do:['Ask whether they are ready to explain what upset them.','Listen to the impact before explaining your intention.','Own the part that is yours and ask what repair would help.','If either person is too upset, agree to return to the discussion later.'],avoid:'Avoid arguing about whether they are allowed to feel upset, sending a flood of apologies to get comfort, or accepting insults and intimidation.',say:'“I can tell something hurt you. I want to understand what happened from your side. I’ll listen, and I’ll be honest about my part too.”',reminder:'Accountability and self-respect can exist together.'},
  arguments:{title:'When the same arguments keep happening',intro:'Repeated arguments often point to an unresolved need or a pattern in how the two of you handle conflict.',happening:'The surface topic may change while the underlying issue stays the same: feeling unheard, having different expectations, or not knowing how to pause respectfully.',you:'You may feel tired, frustrated, or worried that nothing will change.',them:'Your partner may also feel stuck, criticized, unheard, or unsure what practical change is expected.',do:['Choose one recurring pattern to discuss, not every past disagreement.','Describe the effect and the need underneath it.','Agree on one action each person can practise.','Check in later about whether the change is helping.'],avoid:'Avoid insults, threats, bringing up every old mistake, or trying to settle everything while emotions are high.',say:'“I don’t want us to repeat the same argument. Can we talk about what keeps happening and choose one thing we can each do differently?”',reminder:'A new outcome often needs a new pattern, not a louder argument.'},
  ignored:{title:'When you feel ignored or unappreciated',intro:'Wanting to feel noticed is reasonable. The next step is to make the need specific enough that both people can understand it.',happening:'You may be missing quality time, thoughtful messages, shared effort, or acknowledgement. Your partner may not recognize the pattern or may show care differently.',you:'You might feel unimportant, disappointed, or lonely. Try to identify which action would help you feel more connected.',them:'They may be busy, distracted, or unaware of the impact. They may also have needs they have not expressed.',do:['Name two concrete examples rather than saying “you never”.','Explain what those moments mean to you.','Ask for a realistic action that would help.','Notice whether both people make an effort over time.'],avoid:'Avoid keeping score secretly, testing whether they will notice, or ignoring your own needs to avoid conflict.',say:'“I’ve been missing feeling connected. It would mean a lot if we could plan time together and both make the effort to start sometimes.”',reminder:'Your needs deserve a conversation, not a competition.'},
  space:{title:'When your partner asks for space',intro:'Space can help someone settle their thoughts. It works best when both people understand what the pause means.',happening:'They may need quiet, time to process, or a break from a difficult conversation. Ask what kind of space they mean and when you can check back in.',you:'You may feel worried or abandoned, especially if silence is difficult for you. You can respect their request and still ask for a clear plan.',them:'They may want to avoid saying something hurtful or need time to understand their feelings.',do:['Acknowledge their request without arguing.','Ask whether they can share a rough time to reconnect.','Use the pause to care for yourself rather than monitor them.','Return to the issue when both people are ready.'],avoid:'Avoid repeated contact or treating a reasonable pause as rejection. Also, do not let “space” become a permanent way to avoid every important conversation.',say:'“I’ll respect that you need some time. Could we agree on when to check in again so neither of us is left guessing?”',reminder:'Respecting space and asking for clarity can happen together.'},
  reassurance:{title:'When you need reassurance',intro:'It is okay to ask for care directly. The aim is to make a clear request while also building ways to steady yourself.',happening:'Something may have left you uncertain. You may need to hear that the relationship matters or that a misunderstanding can be worked through.',you:'You might feel vulnerable, anxious, or afraid to seem needy. A respectful request is not the same as demanding constant proof.',them:'They may want to support you but not know what kind of reassurance would help. They may also have their own limits and responsibilities.',do:['Identify one specific reassurance that would help.','Ask at a calm time, using direct words.','Thank them when they respond with care.','Practise another calming strategy for moments when they are unavailable.'],avoid:'Avoid testing them, asking trick questions, demanding instant responses, or making them responsible for every worry.',say:'“I’m feeling a little uncertain today. Could you remind me that we are okay when you have a moment? I’m working on calming my thoughts too.”',reminder:'Asking for reassurance can be healthy when it leaves room for the needs of both people.'},
  exhausted:{title:'When you feel emotionally exhausted',intro:'Feeling worn down is a signal to pause and look at what you have been carrying. You do not have to solve everything in one conversation.',happening:'Ongoing uncertainty, conflict, pressure, school or work demands, and lack of rest can all contribute to feeling emotionally drained.',you:'You may feel tired, irritable, disconnected, or unable to find the right words. Give yourself permission to rest and seek support.',them:'Your partner may not realize how much you are carrying. They may also be tired. A conversation about capacity can help both people be realistic.',do:['Take a break from the discussion if you are overwhelmed.','Attend to basic needs such as rest, food, hydration, and trusted support.','Identify one issue that needs attention first.','Talk about what each person can realistically contribute.'],avoid:'Avoid making major decisions in the middle of exhaustion, blaming yourself for needing rest, or carrying every problem alone.',say:'“I care about us, but I’m feeling worn out and need a little time to recharge. Can we choose a time to talk when I can be more present?”',reminder:'Caring for yourself is part of being able to care for a relationship.'},
  fear:{title:'When you are afraid of losing someone',intro:'Fear can make you want certainty immediately. You can acknowledge that fear without allowing it to decide your actions.',happening:'A disagreement, change in routine, or uncertain moment may have activated worry about the future. It does not predict what will happen.',you:'You may feel anxious, attached, or afraid to speak honestly because you worry it could push them away.',them:'Your partner may not know that you are feeling this way. They may be focused on a different part of the situation.',do:['Slow down and name the fear without treating it as a fact.','Ask what is actually happening between you today.','Share your need for clarity without asking for a promise about the future.','Keep your friendships, interests, rest, and own goals in view.'],avoid:'Avoid pleading, threatening, testing their love, or abandoning your own boundaries to prevent someone from leaving.',say:'“I’ve been feeling afraid because things seem uncertain. I don’t want to pressure you, but I would like to talk honestly about where we are.”',reminder:'A relationship matters, and so does the person you are within it.'},
  mistake:{title:'When you think you made a mistake',intro:'Making a mistake does not define your whole character. What matters now is honesty, responsibility, and what you choose to do next.',happening:'You may have said or done something that affected your partner. They may need you to understand the impact, even if you did not intend to hurt them.',you:'You might feel regret, guilt, or urgency to fix everything immediately. Try to turn that energy into a thoughtful repair.',them:'They may be hurt, disappointed, or unsure whether the behavior will change. They are allowed to take time.',do:['Be clear about what you did without minimizing it.','Acknowledge the effect on them.','Offer a realistic change rather than a dramatic promise.','Give them room to respond in their own time.'],avoid:'Avoid making the apology about how bad you feel, demanding forgiveness, or repeating the same behavior while expecting words to be enough.',say:'“I’m sorry for what I did. I understand that it affected you, and I’m not going to make excuses. I’ll work on changing this, and I respect that you may need time.”',reminder:'A mistake is something to take responsibility for, not a reason to give up on growing.'},
  confused:{title:'When you do not understand what your partner needs',intro:'You cannot be expected to read another person\'s mind. You can show care by asking with curiosity and listening to the answer.',happening:'Your partner may have a need they have not explained clearly, or they may not fully understand it themselves yet.',you:'You might feel confused, frustrated, or worried that you keep getting it wrong.',them:'They may need time to find words, or they may be expecting you to notice something that has not been directly communicated.',do:['Ask an open question about what would help.','Reflect back what you heard to check your understanding.','Share what you need too.','Agree on one next step that feels fair to both.'],avoid:'Avoid guessing repeatedly, taking every unclear response as rejection, or accepting responsibility for needs that have never been communicated.',say:'“I want to understand what you need, but I don’t want to guess. Could you tell me what would help right now? I’ll share what I need too.”',reminder:'Healthy understanding is built through communication, not mind-reading.'}
};

const stageDetails = [
  {title:'Getting to know each other',text:'Early connection is a chance to learn who you each are beyond the excitement of being together. Curiosity and honesty create a steadier foundation.',items:['Share values, interests, and expectations.','Talk about privacy, boundaries, and friendships.','Notice how each person prefers to communicate.','Let trust develop through consistent actions.']},
  {title:'Growing together',text:'A relationship can become part of everyday life while each person keeps growing as an individual.',items:['Make time for connection that fits both schedules.','Show appreciation in ways the other person understands.','Support each other’s goals and friendships.','Check whether responsibilities and effort feel mutual.']},
  {title:'Facing challenges',text:'Stress and conflict do not automatically mean a relationship is failing. They do create a chance to notice patterns and decide what needs to change.',items:['Separate facts from assumptions.','Notice triggers without blaming yourself for every feeling.','Pause when emotions become too intense.','Discuss repeated issues with clear examples.']},
  {title:'Understanding each other',text:'Understanding is an active skill. It means listening carefully, naming needs, and respecting that two people can experience the same moment differently.',items:['Listen before preparing a defense.','Use clear “I feel / I need” statements.','Respect personal space and reasonable boundaries.','Look for compromises that do not erase either person.']},
  {title:'Healing and rebuilding',text:'Repair takes time and needs more than good intentions. Both people should be able to participate freely and safely.',items:['Acknowledge what happened and its impact.','Agree on practical, observable changes.','Give trust time to grow through consistency.','Seek trusted or professional support when needed.']}
];

const bothSides = [
  {id:'space',name:'One wants to talk; the other needs space',a:'You may feel unsettled by the pause and want to talk now so you can feel connected and understand what happened.',b:'They may feel overwhelmed and want time to settle their thoughts before speaking. They may worry that talking while upset will make things worse.',middle:'Agree on a pause and a time to reconnect. The person asking for space can communicate when they expect to return; the person wanting to talk can respect that pause without repeated pressure.'},
  {id:'jealousy',name:'Jealousy and friendships',a:'You may feel insecure or worry that a friendship threatens your place in the relationship.',b:'They may see the friendship as ordinary and feel hurt if they are expected to give up normal social connections.',middle:'Talk about the exact behavior that caused discomfort and agree on mutual, fair boundaries. Reassurance should not require control or isolation.'},
  {id:'replies',name:'Different expectations about replies',a:'Frequent messages may help you feel close, so a long gap can feel like distance or disinterest.',b:'They may be busy, tired, or prefer to focus on one thing at a time rather than message throughout the day.',middle:'Discuss a realistic communication rhythm. Agree on what matters most—such as checking in when plans change—rather than expecting constant availability.'},
  {id:'arguments',name:'An argument where both feel unheard',a:'You may be trying to explain your feelings and feel frustrated when the other person responds defensively.',b:'They may feel criticized or misunderstood and focus on defending their intention rather than hearing the impact.',middle:'Take turns explaining one point at a time. Each person summarizes what they heard before responding. Intention and impact can both be discussed.'},
  {id:'dry',name:'Conversations feel different',a:'You may miss the attention and excitement of earlier conversations and wonder whether something changed.',b:'They may feel comfortable with quiet moments or have less time and energy for messaging.',middle:'Share what you miss and ask what feels realistic. Plan meaningful time together without measuring care only by message frequency.'},
  {id:'effort',name:'One person feels they try harder',a:'You may notice you usually initiate plans, check in, or repair disagreements and feel unappreciated.',b:'They may not recognize the imbalance or may show care in ways that are different from what you notice.',middle:'Use specific examples and ask for a practical change. Both people should be willing to discuss how effort can become more mutual.'},
  {id:'trust',name:'Trust has been affected',a:'You may need consistency and answers because something happened that made you feel uncertain.',b:'They may want a chance to show change without feeling permanently monitored or punished.',middle:'Agree on reasonable actions that address the original issue. Trust takes time, and rebuilding should not turn into surveillance or control.'},
  {id:'apology',name:'One person wants an apology',a:'You may need the other person to acknowledge what happened and understand why it hurt.',b:'They may feel they did not intend harm and worry that apologizing means accepting every interpretation.',middle:'An apology can acknowledge impact without pretending intentions were different. Both people can share their understanding after listening.'},
  {id:'boundaries',name:'Different ideas about boundaries',a:'You may need more privacy, space, or clarity about what feels respectful.',b:'They may have different expectations and not realize that an action crosses a limit for you.',middle:'Explain the boundary and why it matters. Discuss mutual agreements while remembering that a boundary governs your own choices, not another person’s autonomy.'},
  {id:'reassurance',name:'One needs reassurance; one feels pressured',a:'You may be asking for reassurance because you feel uncertain or disconnected.',b:'They may care but feel overwhelmed if the same reassurance is requested repeatedly or urgently.',middle:'Agree on one or two genuine ways to reconnect. Pair that with personal calming strategies so reassurance supports trust rather than becoming the only source of security.'},
  {id:'misunderstanding',name:'A message was misunderstood',a:'You may feel hurt by how a message sounded and want the other person to understand the impact.',b:'They may have intended something different and feel surprised by the reaction.',middle:'Ask what the person meant, explain how it landed, and clarify the next time. Meaning and impact both deserve attention.'},
  {id:'busy',name:'School, work, and relationship time',a:'You may want more time together and fear that busy schedules mean you are becoming less important.',b:'They may be balancing responsibilities and feel unable to be available as often as before.',middle:'Plan quality time that fits real schedules, communicate when you are unavailable, and keep supporting each other’s responsibilities.'}
];

const messageTemplates = {
  apology:['I’m sorry for how I handled that. I understand it affected you, and I want to take responsibility instead of making excuses. I’ll work on doing better.','I’ve thought about what happened, and I can see where I went wrong. I’m sorry. You deserve to have your feelings heard, and I’m willing to listen.','I’m sorry for my part in what happened. I won’t ask you to move past it immediately. I want my actions to show that I’m taking it seriously.'],
  reassure:['I care about you, and I’m here. You don’t have to have everything figured out right now. We can talk when you feel ready.','I want you to know that your feelings matter to me. I may not always have the perfect words, but I want to understand and support you.','We don’t have to solve everything at once. I care about us, and I’m willing to take things one step at a time.'],
  space:['I need a little time to settle my thoughts so I can talk respectfully. I’m not trying to ignore you. Can we check in again later?','I care about this conversation, and I want to be present for it. I need a short pause first, then I’ll come back so we can talk properly.','I’m feeling overwhelmed right now. I’m going to take some time to calm down, and I’d like us to continue when I can listen better.'],
  'give-space':['I understand you need some time. I’ll respect that and give you room. When you’re ready, please let me know when we can check in.','Take the time you need to settle your thoughts. I care about hearing your side, and I’ll be here when you’re ready to talk.','I won’t pressure you to talk right now. I hope you can take care of yourself, and we can reconnect when it feels okay.'],
  feelings:['I want to share something without blaming you. I’ve been feeling a little disconnected lately, and I’d like us to talk about it when we both have time.','I’ve had something on my mind. I’m not expecting you to fix everything, but I would appreciate it if you could listen and help me understand your side too.','It’s been difficult for me to explain this, but I want to be honest rather than make assumptions. Could we talk when you’re available?'],
  jealousy:['I felt insecure about what happened, and I want to talk about it calmly. I know I’m responsible for how I handle that feeling, and I also want us to understand each other.','I noticed I was feeling jealous. I don’t want to control who you talk to; I’d rather explain what triggered me and hear your perspective.','Can we talk about what boundaries feel respectful to both of us? I want us to feel trusted, not restricted.'],
  argument:['I don’t want us to keep going in circles. I’d like to understand what hurt you and explain my side when we’re both ready to listen.','I care more about understanding each other than winning this argument. Can we pause and come back to the issue calmly?','I know we see parts of this differently. I’m willing to listen properly and talk about what we can each do next.'],
  'check-in':['Hey, just checking in. I hope your day is going okay. No pressure to reply right away—just wanted to say I’m thinking of you.','How are you doing today? I’d like to hear about your day whenever you have time.','Just wanted to see how you’re feeling. I hope you’re taking care of yourself.'],
  appreciation:['I appreciate the little things you do, even when I don’t always say it. Thank you for making time and being part of my life.','I wanted to remind you that I notice your effort. Thank you for the care you show in your own ways.','I’m grateful for the moments we share. I don’t want the everyday things you do to go unnoticed.'],
  communication:['Could we talk about what communication feels good for both of us? I want to stay connected while respecting our time and responsibilities.','I’ve been missing our conversations. Could we find a routine that works for both of us instead of guessing what the other needs?','I want us to be able to say when something feels off without it turning into a fight. What would help us do that?'],
  boundary:['I care about us, and I also need our conversations to stay respectful. If things become hurtful, I’m going to pause and return when we can talk calmly.','I’m comfortable discussing this, but I’m not okay with pressure or insults. I want us to find a way to talk that respects both of us.','I understand we may see this differently. This is a limit I need to keep for my own well-being, and I hope we can discuss it respectfully.']
};
const toneEdits = {
  gentle: s => s,
  mature: s => s.replace(/I just wanted to /gi,'I wanted to ').replace(/a little/gi,'some'),
  reassuring: s => s.replace(/I’m sorry/g,'I’m genuinely sorry').replace(/I care about us/g,'I care about us and want us to understand each other'),
  sincere: s => s.replace(/I’d like/g,'I genuinely want').replace(/I want to/g,'I truly want to'),
  understanding: s => s.replace(/I understand/g,'I want to understand').replace(/I know/g,'I recognize'),
  short: s => { const first=s.split(/(?<=[.!?])\s+/)[0]; return first.length>140 ? first.slice(0,137)+'...' : first; }
};

const reminders = [
  'You can love someone deeply while still respecting their personal space.',
  'Communication is not about winning an argument. It is about understanding each other.',
  'Don’t let an assumption become a conclusion.',
  'Healthy love requires effort from both people.',
  'Taking a moment to calm down is better than saying something you regret.',
  'Your feelings matter, and so do your partner’s boundaries.',
  'A healthy relationship allows both people to grow.',
  'You cannot control another person’s feelings, but you can choose how you communicate.',
  'Love should not require you to abandon yourself.',
  'You can ask for clarity without demanding certainty about everything.'
];
const checkinItems = [
  'Do we communicate respectfully, even when we disagree?',
  'Do we listen to understand instead of only defending ourselves?',
  'Can both of us express feelings without fear of insults or threats?',
  'Do we respect each other’s privacy and personal boundaries?',
  'Can we apologize and take responsibility when we make mistakes?',
  'Do we make time for each other in ways that fit our responsibilities?',
  'Do we allow each other friendships, interests, and personal space?',
  'Can we disagree without trying to control or punish each other?',
  'Are both people making a reasonable effort to care for the relationship?'
];

let activeCategory = 'all';
let reminderPosition = 0;
let lastMessageIndex = -1;
let toastTimer;
let editingReflectionId = null;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function safeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function renderArticles() {
  const term = $('#adviceSearch').value.trim().toLowerCase();
  const matches = articles.filter(article => {
    const categoryMatch = activeCategory === 'all' || article.category === activeCategory;
    const searchable = [article.title, article.summary, article.label, article.intro, article.happening].join(' ').toLowerCase();
    return categoryMatch && searchable.includes(term);
  });
  $('#articleGrid').innerHTML = matches.map(article => `
    <article class="article-card">
      <span class="article-category">${safeText(article.label)}</span>
      <h3>${safeText(article.title)}</h3>
      <p>${safeText(article.summary)}</p>
      <button class="article-read" data-article="${safeText(article.id)}">Read guidance <span>↗</span></button>
    </article>`).join('');
  $('#articleEmpty').hidden = matches.length !== 0;
}

function openArticle(id) {
  const article = articles.find(item => item.id === id);
  if (!article) return;
  const sections = [
    ['What might be happening?', article.happening],
    ['Why can this happen?', article.why],
    ['How each person might experience it', article.each],
    ['What you can do', article.do],
    ['What your partner might need', article.partner],
    ['What to avoid', article.avoid],
  ];
  $('#articleDialogContent').innerHTML = `<div class="article-dialog-content"><span class="article-category">${safeText(article.label)}</span><h2 id="articleDialogTitle">${safeText(article.title)}</h2><p class="article-lead">${safeText(article.intro)}</p>${sections.map(([heading,body]) => `<section class="article-section"><h3>${safeText(heading)}</h3><p>${safeText(body)}</p></section>`).join('')}<section class="article-section"><h3>A practical way to say it</h3><div class="article-callout">“${safeText(article.example)}”</div></section><section class="article-section"><h3>A reminder for you</h3><p>${safeText(article.reminder)}</p></section></div>`;
  $('#articleDialog').showModal();
}

function renderGuidance(key) {
  const item = situations[key];
  if (!item) return;
  const result = $('#guidanceResult');
  result.hidden = false;
  $('#situationChoices').hidden = true;
  result.innerHTML = `<span class="result-kicker">A PLACE TO START</span><h3>${safeText(item.title)}</h3><p class="result-intro">${safeText(item.intro)}</p>
    <div class="guidance-block"><h4>1. What might be happening?</h4><p>${safeText(item.happening)}</p></div>
    <div class="guidance-block"><h4>2. What might you be feeling?</h4><p>${safeText(item.you)}</p></div>
    <div class="guidance-block"><h4>3. What might your partner be feeling?</h4><p>${safeText(item.them)}</p></div>
    <div class="guidance-block"><h4>4. What can you do right now?</h4><ul>${item.do.map(step=>`<li>${safeText(step)}</li>`).join('')}</ul></div>
    <div class="guidance-block"><h4>5. What should you avoid?</h4><p>${safeText(item.avoid)}</p></div>
    <div class="guidance-block"><h4>6. A way to start the conversation</h4><div class="suggested-message" id="guidanceMessage">“${safeText(item.say)}”</div></div>
    <div class="guidance-block"><h4>7. A reminder for you</h4><p>${safeText(item.reminder)}</p></div>
    <div class="result-actions"><button class="button button-primary button-small" id="copyGuidance">Copy example message</button><button class="button button-outline button-small" id="readRelated">Read related advice</button><button class="result-back" id="backToChoices">← Choose another situation</button></div>`;
  $('#copyGuidance').addEventListener('click', () => copyText(item.say, 'Message copied.'));
  $('#readRelated').addEventListener('click', () => {
    const related = articles.find(article => article.title.toLowerCase().includes(key) || article.summary.toLowerCase().includes(key)) || articles[0];
    openArticle(related.id);
  });
  $('#backToChoices').addEventListener('click', () => {
    result.hidden = true;
    result.innerHTML = '';
    $('#situationChoices').hidden = false;
  });
  result.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'nearest'});
}

function renderSideOptions() {
  $('#sideOptions').innerHTML = bothSides.map((item,index) => `<button class="side-option ${index===0?'active':''}" data-side="${safeText(item.id)}">${safeText(item.name)} <span>→</span></button>`).join('');
  renderSides(bothSides[0].id);
}
function renderSides(id) {
  const item = bothSides.find(side=>side.id===id);
  if (!item) return;
  $$('.side-option').forEach(button=>button.classList.toggle('active',button.dataset.side===id));
  $('#sidesResult').innerHTML = `<div class="mini-label">TWO PERSPECTIVES</div><h3>${safeText(item.name)}</h3><div class="perspective-columns"><article class="perspective-card"><h4>Person A might feel</h4><p>${safeText(item.a)}</p></article><article class="perspective-card partner"><h4>Person B might feel</h4><p>${safeText(item.b)}</p></article></div><div class="middle-ground"><h4>A healthy middle ground</h4><p>${safeText(item.middle)}</p></div>`;
}

function nextReminder() {
  reminderPosition = (reminderPosition + 1) % reminders.length;
  $('#dailyReminder').textContent = reminders[reminderPosition];
  $('#reminderIndex').textContent = `${String(reminderPosition+1).padStart(2,'0')} / ${String(reminders.length).padStart(2,'0')}`;
}

function generateMessage() {
  const purpose = $('#messagePurpose').value;
  const tone = $('#messageTone').value;
  const variants = messageTemplates[purpose] || messageTemplates.feelings;
  let index = Math.floor(Math.random() * variants.length);
  if (variants.length > 1 && index === lastMessageIndex) index = (index + 1) % variants.length;
  lastMessageIndex = index;
  const text = toneEdits[tone](variants[index]);
  $('#messageOutput').value = text;
  $('#messageStatus').textContent = 'Draft created. Edit it so it reflects what you genuinely mean.';
}

async function copyText(text, successMessage='Copied to clipboard.') {
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else {
      const helper = document.createElement('textarea');
      helper.value = text; helper.setAttribute('readonly',''); helper.style.position='fixed'; helper.style.opacity='0';
      document.body.appendChild(helper); helper.select();
      const copied = document.execCommand('copy'); helper.remove();
      if (!copied) throw new Error('Clipboard unavailable');
    }
    showToast(successMessage);
  } catch (error) {
    showToast('Copy is unavailable here. You can select and copy the text manually.');
  }
}

function renderCheckin() {
  $('#checkinQuestions').innerHTML = checkinItems.map((question,index)=>`<div class="checkin-question"><p>${index+1}. ${safeText(question)}</p><div class="checkin-options"><label><input type="radio" name="checkin-${index}" value="yes"> Yes</label><label><input type="radio" name="checkin-${index}" value="sometimes"> Sometimes</label><label><input type="radio" name="checkin-${index}" value="no"> No</label></div></div>`).join('');
}
function showCheckinResult() {
  const answers = checkinItems.map((_,index)=>$(`input[name="checkin-${index}"]:checked`)?.value || 'unanswered');
  const unanswered = answers.filter(answer=>answer==='unanswered').length;
  if (unanswered) { showToast(`Please answer the remaining ${unanswered} question${unanswered===1?'':'s'} first.`); return; }
  const strengths = answers.filter(answer=>answer==='yes').length;
  const attention = answers.map((answer,index)=>({answer,question:checkinItems[index]})).filter(item=>item.answer!=='yes');
  let heading = strengths >= 7 ? 'Notice and protect what is working.' : strengths >= 4 ? 'There are strengths to build on.' : 'Start with one area that needs care.';
  let intro = strengths >= 7 ? 'Your answers suggest several healthy habits are present. Keep practising them, especially when things get stressful.' : 'Your answers point to a few areas that may benefit from a gentle, honest conversation. This is not a score or a label.';
  $('#checkinResult').hidden = false;
  $('#checkinResult').innerHTML = `<h4>${heading}</h4><p>${intro}</p>${attention.length ? `<p><b>Possible places to focus:</b></p><ul>${attention.slice(0,5).map(item=>`<li>${safeText(item.question)}</li>`).join('')}</ul>` : '<p>Keep checking in with each other rather than assuming everything will stay easy.</p>'}<p>Choose one small change you can practise yourself, then discuss what both people can contribute.</p>`;
  $('#checkinResult').scrollIntoView({behavior:'smooth',block:'nearest'});
}

const JOURNAL_KEY = 'betweenUsReflections_v1';
function readReflections() {
  try {
    const saved = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(item=>item && typeof item.id==='string') : [];
  } catch (error) { return []; }
}
function writeReflections(items) {
  try { localStorage.setItem(JOURNAL_KEY,JSON.stringify(items)); return true; }
  catch (error) { showToast('Could not save. This browser may have storage disabled or full.'); return false; }
}
function updateJournalCount() {
  const count = readReflections().length;
  $('#journalCount').textContent = count ? `${count} saved reflection${count===1?'':'s'} on this device` : 'No saved reflections yet';
}
function renderReflectionList() {
  const items = readReflections().sort((a,b)=>b.updatedAt-a.updatedAt);
  $('#reflectionList').innerHTML = items.length ? items.map(item=>`<article class="reflection-item"><div><strong>${safeText(item.title)}</strong><small>${new Date(item.updatedAt).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'})}</small></div><div class="reflection-item-actions"><button data-edit-reflection="${safeText(item.id)}">Edit</button><button data-delete-reflection="${safeText(item.id)}">Delete</button></div></article>`).join('') : '<p class="microcopy">Your saved reflections will appear here.</p>';
  updateJournalCount();
}
function resetJournalForm() {
  $('#journalForm').reset();
  $('#journalEntryId').value='';
  editingReflectionId=null;
  $('#journalTitle').textContent='Your reflection space';
  $('#journalStatus').textContent='';
}
function openJournal(itemId=null) {
  resetJournalForm();
  if (itemId) {
    const item=readReflections().find(entry=>entry.id===itemId);
    if (item) {
      editingReflectionId=item.id;
      $('#journalEntryId').value=item.id;
      $('#journalTitle').textContent='Edit your reflection';
      $('#journalTitleInput').value=item.title;
      $('#reflectionFeeling').value=item.feeling || '';
      $('#reflectionFacts').value=item.facts || '';
      $('#reflectionNext').value=item.next || '';
    }
  }
  renderReflectionList();
  $('#journalDialog').showModal();
}
function saveReflection(event) {
  event.preventDefault();
  const title=$('#journalTitleInput').value.trim();
  if (!title) { $('#journalStatus').textContent='Please add a title first.'; return; }
  const items=readReflections();
  const now=Date.now();
  const id=editingReflectionId || (window.crypto?.randomUUID ? crypto.randomUUID() : `${now}-${Math.random().toString(36).slice(2,9)}`);
  const old=items.find(item=>item.id===id);
  const entry={id,title,feeling:$('#reflectionFeeling').value.trim(),facts:$('#reflectionFacts').value.trim(),next:$('#reflectionNext').value.trim(),createdAt:old?.createdAt || now,updatedAt:now};
  const next=old ? items.map(item=>item.id===id?entry:item) : [...items,entry];
  if (writeReflections(next)) {
    $('#journalStatus').textContent='Reflection saved on this device.';
    resetJournalForm(); renderReflectionList(); showToast('Reflection saved on this device.');
  }
}
function deleteReflection(id) {
  const items=readReflections();
  if (!items.some(item=>item.id===id)) return;
  if (!window.confirm('Delete this reflection from this browser? This cannot be undone.')) return;
  writeReflections(items.filter(item=>item.id!==id));
  if (editingReflectionId===id) resetJournalForm();
  renderReflectionList(); showToast('Reflection deleted.');
}

function setupNavigation() {
  const toggle=$('#menuToggle'), nav=$('#mainNav');
  toggle.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    nav.classList.toggle('open',open);
  });
  $$('#mainNav a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');
  }));
  const sections=$$('main section[id]');
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        $$('.nav-link').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
      }
    }),{rootMargin:'-30% 0px -60% 0px'});
    sections.forEach(section=>observer.observe(section));
  }
}

function setupEvents() {
  document.addEventListener('click',event=>{
    const articleButton=event.target.closest('[data-article]');
    if(articleButton) openArticle(articleButton.dataset.article);
    const situationButton=event.target.closest('[data-situation]');
    if(situationButton) renderGuidance(situationButton.dataset.situation);
    const stageButton=event.target.closest('.journey-open');
    if(stageButton){
      const stage=stageDetails[Number(stageButton.dataset.stage)];
      $('#journeyDetail').hidden=false;
      $('#journeyDetail').innerHTML=`<h3>${safeText(stage.title)}</h3><p>${safeText(stage.text)}</p><ul>${stage.items.map(item=>`<li>${safeText(item)}</li>`).join('')}</ul>`;
      $('#journeyDetail').scrollIntoView({behavior:'smooth',block:'nearest'});
    }
    const sideButton=event.target.closest('[data-side]');
    if(sideButton) renderSides(sideButton.dataset.side);
    const editButton=event.target.closest('[data-edit-reflection]');
    if(editButton) openJournal(editButton.dataset.editReflection);
    const deleteButton=event.target.closest('[data-delete-reflection]');
    if(deleteButton) deleteReflection(deleteButton.dataset.deleteReflection);
  });
  $('#adviceSearch').addEventListener('input',renderArticles);
  $('#categoryFilters').addEventListener('click',event=>{
    const button=event.target.closest('[data-category]'); if(!button)return;
    activeCategory=button.dataset.category;
    $$('.filter-chip').forEach(chip=>chip.classList.toggle('active',chip===button));
    renderArticles();
  });
  $('#nextReminder').addEventListener('click',nextReminder);
  $('#generateMessage').addEventListener('click',generateMessage);
  $('#regenerateMessage').addEventListener('click',generateMessage);
  $('#copyMessage').addEventListener('click',()=>$('#messageOutput').value.trim()?copyText($('#messageOutput').value,'Message copied.'):showToast('Generate or write a message first.'));
  $('#clearMessage').addEventListener('click',()=>{$('#messageOutput').value='';$('#messageStatus').textContent='Draft cleared.';});
  $('#showCheckin').addEventListener('click',showCheckinResult);
  $('#openJournal').addEventListener('click',()=>openJournal());
  $('#journalForm').addEventListener('submit',saveReflection);
  $('#resetJournalForm').addEventListener('click',resetJournalForm);
  $('#clearAllReflections').addEventListener('click',()=>{
    const existing=readReflections(); if(!existing.length){showToast('There are no reflections to clear.');return;}
    if(window.confirm('Delete every saved reflection from this browser? This cannot be undone.')){writeReflections([]);resetJournalForm();renderReflectionList();showToast('All reflections cleared.');}
  });
  $('#closeArticle').addEventListener('click',()=>$('#articleDialog').close());
  $('#closeJournal').addEventListener('click',()=>$('#journalDialog').close());
  ['articleDialog','journalDialog'].forEach(id=>{
    const dialog=$(`#${id}`);
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  });
}

function init() {
  $('#currentYear').textContent=new Date().getFullYear();
  renderArticles();renderSideOptions();renderCheckin();renderReflectionList();setupNavigation();setupEvents();
  $('#dailyReminder').textContent=reminders[0];
  $('#reminderIndex').textContent=`01 / ${String(reminders.length).padStart(2,'0')}`;
}

document.addEventListener('DOMContentLoaded',init);
