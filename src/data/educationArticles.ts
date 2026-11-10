import { EducationalArticle } from '../types/wellness';

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  // --- STRESS ARTICLES ---
  {
    id: 'stress-fundamentals',
    title: 'The Physiology of Stress: Acute Response vs. Chronic Strain',
    category: 'stress',
    categoryLabel: 'Stress Fundamentals',
    readTime: '4 min read',
    summary: 'How the hypothalamic-pituitary-adrenal (HPA) axis activates, why short-term stress protects us, and how prolonged stress alters physical and neurological health.',
    content: [
      {
        heading: 'The Evolutionary Architecture of Stress',
        paragraphs: [
          'Stress is an evolutionary survival mechanism mediated by the sympathetic nervous system and the hypothalamic-pituitary-adrenal (HPA) axis. When encountering an immediate challenge, the brain releases corticotropin-releasing hormone, triggering adrenaline and cortisol release from the adrenal glands.',
          'In acute scenarios, this response increases heart rate, dilates bronchial passages, and mobilizes glucose to prepare muscles for rapid action. In modern life, however, stressors are rarely physical threats; they are psychological, ongoing, and chronic.',
        ],
      },
      {
        heading: 'When Acute Adaptation Becomes Chronic Exhaustion',
        paragraphs: [
          'When stress remains unmitigated over weeks or months, sustained cortisol elevations begin exerting allostatic load on the cardiovascular, immune, and metabolic systems. Common manifestations include impaired hippocampal memory consolidation, dysregulated sleep architecture, and systemic low-grade inflammation.',
        ],
        bulletPoints: [
          'Physical indicators: tension headaches, jaw clenching (bruxism), digestive disturbances, hypertension.',
          'Cognitive indicators: reduced working memory, difficulty switching tasks, decision fatigue.',
          'Emotional indicators: shortened temper, anhedonia, subjective sense of helplessness.',
        ],
      },
      {
        heading: 'Clinical Thresholds for Seeking Professional Guidance',
        paragraphs: [
          'Occasional stress is an expected dimension of human life. However, when stress produces persistent physical pain, emotional detachment, or interferes with family and occupational duties for more than four weeks, consulting a general practitioner or psychologist is strongly advised.',
        ],
      },
    ],
    clinicalTakeaway: 'Short-term stress mobilizes survival energy; chronic unbuffered stress accumulates allostatic load. Distinguish controllable stressors from ambient demands.',
    references: [
      'Cohen, S., Janicki-Deverts, D., & Miller, G. E. (2007). Psychological stress and disease. JAMA, 298(14), 1685-1687.',
      'McEwen, B. S. (1998). Protective and damaging effects of stress mediators. New England Journal of Medicine, 338(3), 171-179.',
    ],
  },
  {
    id: 'workplace-burnout',
    title: 'Workplace Burnout & Academic Overload: Clinical Recognition and Boundaries',
    category: 'stress',
    categoryLabel: 'Occupational Health',
    readTime: '5 min read',
    summary: 'Recognizing the three WHO diagnostic dimensions of burnout: emotional exhaustion, depersonalization/cynicism, and reduced professional efficacy.',
    content: [
      {
        heading: 'The WHO ICD-11 Definition of Burnout',
        paragraphs: [
          'In the 11th Revision of the International Classification of Diseases (ICD-11), the World Health Organization formally classified burnout as an occupational phenomenon resulting from chronic workplace stress that has not been successfully managed.',
          'Crucially, burnout is defined by three distinct dimensions: feelings of energy depletion or exhaustion, increased mental distance or cynicism from one’s job, and a sense of ineffectiveness or lack of accomplishment.',
        ],
      },
      {
        heading: 'Practical Strategies for Workplace Boundary Restoration',
        paragraphs: [
          'Mitigating burnout requires structural boundary recalibration rather than simply attempting to "relax more". Consider these evidence-backed principles:',
        ],
        bulletPoints: [
          'Defend transition rituals: establish a clean 15-minute buffer between work and domestic life to signal physiological shutdown.',
          'Enforce digital disengagement: eliminate corporate messaging notifications after contracted hours.',
          'Renegotiate unsustainable scopes: discuss deadline triage with managers before personal health fails.',
        ],
      },
    ],
    clinicalTakeaway: 'Burnout is an occupational condition, not a personal character flaw. Sustainable recovery requires boundary renegotiation and intentional nervous system rest.',
    references: [
      'World Health Organization. (2019). Burn-out an "occupational phenomenon": International Classification of Diseases (ICD-11).',
      'Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.',
    ],
  },

  // --- ANXIETY ARTICLES ---
  {
    id: 'anxiety-mechanisms',
    title: 'Understanding Generalized Anxiety: The Neuroscience of Persistent Worry',
    category: 'anxiety',
    categoryLabel: 'Anxiety Spectrum',
    readTime: '5 min read',
    summary: 'Why the amygdala misinterprets future uncertainty as immediate danger, and how cognitive-behavioral tools dismantle catastrophic worry loops.',
    content: [
      {
        heading: 'The Hyper-Vigilant Brain',
        paragraphs: [
          'Anxiety is fundamentally a future-oriented emotional state characterized by apprehension regarding potential threat or misfortune. In Generalized Anxiety Disorder (GAD), the prefrontal cortex struggles to downregulate an overactive amygdala, interpreting ambiguity as imminent peril.',
          'This leads to chronic autonomic arousal: shallow upper-chest breathing, muscle hypertonicity, and a constant search for environmental hazards.',
        ],
      },
      {
        heading: 'The Paradox of Worry as an Avoidance Strategy',
        paragraphs: [
          'Research in clinical psychology demonstrates that worry often functions as an unconscious cognitive avoidance strategy: people believe that worrying about an outcome will either prevent it or prepare them emotionally. In reality, worry prevents emotional processing and reinforces neurological fear circuits.',
        ],
        bulletPoints: [
          'Intolerance of uncertainty: demanding 100% guarantees in an inherently uncertain world.',
          'Catastrophizing: automatically jumping to the worst-case scenario while minimizing personal coping capacity.',
          'Safety behaviors: compulsive checking, reassurance seeking, or avoiding harmless situations.',
        ],
      },
      {
        heading: 'Gold-Standard Evidence-Based Interventions',
        paragraphs: [
          'Cognitive Behavioral Therapy (CBT) and Acceptance and Commitment Therapy (ACT) represent the gold-standard psychological approaches. Through cognitive restructuring and behavioral experiments, individuals learn to tolerate uncertainty and respond to anxious thoughts with psychological flexibility.',
        ],
      },
    ],
    clinicalTakeaway: 'Worry gives the illusion of control while amplifying distress. Learning to tolerate uncertainty is the cornerstone of anxiety recovery.',
    references: [
      'Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of Internal Medicine, 166(10), 1092-1097.',
      'Borkovec, T. D., Ray, S. D., & Stöber, J. (1998). Worry: A cognitive phenomenon intimately linked to affective, physiological, and interpersonal behavioral processes.',
    ],
  },
  {
    id: 'panic-vs-anxiety',
    title: 'Panic Attacks vs. Generalized Anxiety: Somatic Symptoms & Grounding Techniques',
    category: 'anxiety',
    categoryLabel: 'Acute Intervention',
    readTime: '4 min read',
    summary: 'Differentiating sudden autonomic surges from ongoing worry, and executing physiological grounding to regulate hyperventilation.',
    content: [
      {
        heading: 'Distinguishing Panic from Generalized Anxiety',
        paragraphs: [
          'While generalized anxiety is a chronic, slow-burning state of cognitive apprehension, a panic attack is an acute, sudden surge of overwhelming fear that peaks within minutes. Physical symptoms are dramatic: tachycardia, trembling, numbness/tingling (paresthesia), and derealization.',
          'It is crucial to recognize that although panic attacks feel physically terrifying, they are not intrinsically dangerous to a healthy heart.',
        ],
      },
      {
        heading: 'Immediate Somatic Grounding Protocol',
        paragraphs: [
          'During an acute panic surge, cognitive rationalization is difficult because the prefrontal cortex is temporarily inhibited. Somatic physiological interventions are far more effective:',
        ],
        bulletPoints: [
          'Physiological sigh: two deep inhales through the nose followed by one long, slow sigh through the mouth to immediately trigger the parasympathetic brake.',
          'Thermal sensory grounding: splashing cold water on the face or holding an ice cube to activate the mammalian dive reflex.',
          'Anchoring to gravity: pressing both feet firmly into the floor and naming tactile textures in your environment.',
        ],
      },
    ],
    clinicalTakeaway: 'Panic is a temporary surge of adrenaline that always passes. Regulate breathing through prolonged exhalations to restore parasympathetic balance.',
    references: [
      'American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.).',
      'Meuret, A. E., Wilhelm, F. H., Ritz, T., & Roth, W. T. (2003). Respiratory feedback for treating panic disorder. Journal of Clinical Psychology, 59(6), 689-700.',
    ],
  },

  // --- DEPRESSION ARTICLES ---
  {
    id: 'depression-insights',
    title: 'Understanding Depression: Neurobiology, Anhedonia, and Behavioral Activation',
    category: 'depression',
    categoryLabel: 'Mood Disorders',
    readTime: '6 min read',
    summary: 'Depression is far more than feeling sad. Explore the neurological disruption of reward circuitry and the clinical power of Behavioral Activation.',
    content: [
      {
        heading: 'Beyond Sadness: The Clinical Spectrum of Depression',
        paragraphs: [
          'Major Depressive Disorder is not a transient bad mood or personal weakness; it is a complex biopsychosocial condition affecting neurochemistry, neural connectivity, and behavioral motivation.',
          'A defining core symptom is anhedonia: the profound loss of interest or pleasure in activities once cherished. People experiencing depression frequently report feeling an emotional flatness, heavy physical fatigue, and intense cognitive self-blame.',
        ],
      },
      {
        heading: 'The Lethargy Trap & Behavioral Activation',
        paragraphs: [
          'Depression creates a negative self-reinforcing loop: low mood leads to withdrawal and inactivity, which eliminates positive environmental feedback, further depressing mood. Common clinical intuition tells us: "Wait until you feel motivated before doing things."',
          'Clinical psychology demonstrates the reverse: action must precede motivation. This therapeutic principle is termed Behavioral Activation (BA).',
        ],
        bulletPoints: [
          'Micro-step goal setting: breaking a task into its smallest non-threatening unit (e.g., placing walking shoes by the door).',
          'Pleasure and mastery tracking: rating activities on a 0-10 scale for both enjoyment and sense of accomplishment.',
          'Protecting routines: adhering to scheduled actions rather than relying on fickle internal emotional impulses.',
        ],
      },
    ],
    clinicalTakeaway: 'Depression tricks the mind into waiting for motivation. In evidence-based recovery, small actions reliably stimulate neurochemical reward signals before motivation arrives.',
    references: [
      'Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606-613.',
      'Cuijpers, P., van Straten, A., & Warmerdam, L. (2007). Behavioral activation treatments of depression: A meta-analysis. Clinical Psychology Review, 27(3), 318-326.',
    ],
  },
  {
    id: 'supporting-loved-ones',
    title: 'How to Support Someone Experiencing Depression or Anxiety',
    category: 'depression',
    categoryLabel: 'Care & Community',
    readTime: '4 min read',
    summary: 'Practical, compassionate communication guidelines for friends, family, and colleagues. What phrases to avoid and how to provide meaningful support.',
    content: [
      {
        heading: 'What Truly Helps: Active Presence Over Toxic Positivity',
        paragraphs: [
          'When someone we care about is struggling with depression or anxiety, our natural instinct is often to offer quick fixes or cheer them up. Well-intentioned platitudes like "Look on the bright side" or "You have so much to be grateful for" frequently amplify shame and isolation.',
        ],
        bulletPoints: [
          'Validate their reality: "It sounds like you are carrying a tremendous amount of weight right now. I am here with you."',
          'Offer concrete support: Instead of asking "Let me know if you need anything", offer specific help: "Can I bring over dinner on Tuesday or pick up groceries?"',
          'Respect pacing: Understand that low energy is a symptom of neurobiological exhaustion, not deliberate indifference.',
        ],
      },
      {
        heading: 'Recognizing Urgent Safety Red Flags',
        paragraphs: [
          'Always remain attentive to critical warning signs: giving away treasured belongings, sudden unexpected calm after deep depression, direct expressions of wanting to disappear, or explicit statements regarding suicide. Never hesitate to connect them with emergency resources or crisis lines.',
        ],
      },
    ],
    clinicalTakeaway: 'You do not need to fix someone’s depression to help them heal. Non-judgmental presence, validation, and practical assistance build the foundation of recovery.',
    references: [
      'National Institute of Mental Health (NIMH). (2023). Helping someone with depression.',
      'World Health Organization (WHO). (2021). Depression and other common mental disorders: Global health estimates.',
    ],
  },

  // --- GENERAL WELLNESS ARTICLES ---
  {
    id: 'sleep-and-mental-health',
    title: 'The Bidirectional Architecture of Sleep and Mental Well-Being',
    category: 'general',
    categoryLabel: 'Lifestyle Medicine',
    readTime: '5 min read',
    summary: 'Why REM sleep functions as overnight emotional therapy, and evidence-based sleep hygiene habits to protect psychological balance.',
    content: [
      {
        heading: 'Sleep as Emotional First Aid',
        paragraphs: [
          'Sleep and psychological wellness share a tight bidirectional relationship. Sleep disturbances are not merely symptoms of stress, anxiety, or depression; they are potent causal drivers.',
          'During Rapid Eye Movement (REM) sleep, the brain processes emotionally charged autobiographical memories in a neurochemically calm environment (noradrenaline is virtually shut off). When REM sleep is chronically truncated, emotional reactivity skyrockets.',
        ],
      },
      {
        heading: 'Non-Negotiable Sleep Hygiene Pillars',
        paragraphs: [
          'Clinical sleep research highlights several core behaviors that dramatically enhance sleep onset latency and sleep architecture:',
        ],
        bulletPoints: [
          'Consistent wake time: wake up at the exact same hour every day, including weekends, to calibrate the suprachiasmatic nucleus.',
          'Morning photon exposure: view 10-15 minutes of natural sunlight within 60 minutes of waking to set the circadian timer for melatonin production 16 hours later.',
          'Caffeine curfew: respect caffeine’s 5-7 hour half-life (and 12-hour quarter-life) by ceasing caffeine consumption after 12:00 PM.',
          'Cool bedroom: sleep in a room between 18°C and 20°C (65-68°F), as the human body requires a 1°C drop in core temperature to initiate deep slow-wave sleep.',
        ],
      },
    ],
    clinicalTakeaway: 'Sleep is the foundational physiological bedrock of emotional regulation. Prioritizing consistent wake times and light exposure directly stabilizes mood.',
    references: [
      'Walker, M. P. (2017). Why We Sleep: Unlocking the Power of Sleep and Dreams. Scribner.',
      'Baglioni, C., et al. (2011). Insomnia as a predictor of depression: a meta-analytic evaluation. Journal of Affective Disorders, 135(1-3), 10-19.',
    ],
  },
  {
    id: 'myths-vs-facts',
    title: 'Mental Health Myths vs. Clinical Facts: Dispelling Stigma',
    category: 'general',
    categoryLabel: 'Public Health',
    readTime: '4 min read',
    summary: 'Deconstructing pervasive misconceptions regarding willpower, therapy, medication, and seeking help for stress, anxiety, and depression.',
    content: [
      {
        heading: 'Myth 1: "Mental health struggles are a sign of weak character."',
        paragraphs: [
          'Fact: Decades of epidemiological, genetic, and neuroimaging studies demonstrate that stress, anxiety disorders, and depression are complex medical conditions influenced by genetics, neurochemistry, developmental trauma, and societal stressors. They have zero correlation with moral fortitude or willpower.',
        ],
      },
      {
        heading: 'Myth 2: "Therapy is only for people in acute crisis."',
        paragraphs: [
          'Fact: Psychotherapy and psychological screening tools are equally valuable as proactive wellness practices. Learning emotional regulation, metacognition, and cognitive flexibility early prevents mild distress from escalating into debilitating chronic illness.',
        ],
      },
      {
        heading: 'Myth 3: "Asking someone if they are thinking about suicide plants the idea."',
        paragraphs: [
          'Fact: Extensive psychological research confirms that asking someone directly, compassionately, and clearly about suicidal thoughts does NOT increase risk or plant ideas. Rather, it reduces isolation, validates their pain, and opens an immediate pathway to safety.',
        ],
      },
    ],
    clinicalTakeaway: 'Stigma thrives in silence and misinformation. Honest, scientifically accurate conversations normalize seeking help before crisis strikes.',
    references: [
      'Gould, M. S., et al. (2005). Evaluating iatrogenic risk of youth suicide screening: a randomized controlled trial. JAMA, 293(14), 1635-1643.',
      'World Health Organization. (2022). World mental health report: Transforming mental health for all.',
    ],
  },
];
