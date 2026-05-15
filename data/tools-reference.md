# AI Tools & Modes — Comprehensive Reference

Last updated: May 2026. This document is the source data for the AI Tool Helper recommendation engine. Each entry represents a *distinct mode or product*, not just a parent platform. Where a platform has multiple meaningfully different products, each is treated separately.

---

## PERPLEXITY

### Perplexity Search (Standard)
- **Provider:** Perplexity AI
- **What it is:** AI-powered web search that returns cited, sourced answers in real time.
- **Good for:** Quick factual questions, current events, source-backed answers, fact-checking, finding citations.
- **Bad for:** Long-form creative writing, coding, content generation, complex multi-step reasoning.
- **Skill level:** Beginner to advanced.
- **Frequency:** One-off or ongoing.
- **Pricing:** Free tier with usage limits.
- **Access:** perplexity.ai → ask a question in the main bar.

### Perplexity Pro Search
- **What it is:** Upgraded search that runs multi-step queries, uses better underlying models, and follows up with clarifying questions.
- **Good for:** Multi-faceted questions, comparison research, more thorough sourced answers than standard search.
- **Bad for:** Same limitations as standard search; not for creative or coding tasks.
- **Skill level:** Beginner to advanced.
- **Pricing:** Perplexity Pro ($20/mo).
- **Access:** perplexity.ai → toggle "Pro" in the search bar.

### Perplexity Deep Research
- **What it is:** Agentic research mode that browses the web for 2-5 minutes, reads dozens of sources, and produces a structured multi-page report with citations.
- **Good for:** Research reports, due diligence, market analysis, academic-style summaries, anything needing sourced depth.
- **Bad for:** Quick answers, creative writing, coding, real-time conversation.
- **Skill level:** Beginner to advanced.
- **Frequency:** One-off (each run is a self-contained report).
- **Pricing:** Pro plan, 300 Deep Research runs/month.
- **Access:** perplexity.ai → select "Deep Research" in mode picker.

### Perplexity Spaces
- **What it is:** Shared research workspaces where teams or individuals can organize sources, threads, and ongoing investigations around a topic.
- **Good for:** Collaborative research, ongoing investigation into a topic, building a knowledge base over time, team research projects.
- **Bad for:** One-off questions, solo quick tasks, non-research workflows.
- **Skill level:** Some experience.
- **Frequency:** Ongoing.
- **Pricing:** Pro plan or higher.
- **Access:** perplexity.ai → Spaces in left sidebar → create new space.

### Perplexity Comet (AI Browser)
- **What it is:** A standalone AI browser that can navigate websites, control web apps by voice, understand on-screen content, and act on the user's behalf.
- **Good for:** Hands-free web tasks, accessibility, navigating complex sites, automating browser workflows, screen-aware help.
- **Bad for:** Pure content generation, coding, anything not browser-based.
- **Skill level:** Some experience.
- **Frequency:** Ongoing.
- **Pricing:** Pro plan.
- **Access:** Download Comet browser from perplexity.ai/comet.

### Perplexity Computer
- **What it is:** Agentic task automation that runs multi-step workflows in the background using web tools — research, financial tasks, scheduling, etc.
- **Good for:** Background workflows, recurring research tasks, multi-step web automation, "AI assistant" tasks that take minutes to hours.
- **Bad for:** Real-time conversation, creative work, anything needing immediate response.
- **Skill level:** Some to advanced.
- **Frequency:** Ongoing.
- **Pricing:** Pro plan, with additional charges for heavy usage.
- **Access:** perplexity.ai → Computer in left sidebar.

### Perplexity Voice
- **What it is:** Hands-free voice interaction with Perplexity, including search and Comet control.
- **Good for:** Driving, hands-free questions, quick voice search.
- **Bad for:** Long or detailed responses, anything requiring visual context.
- **Pricing:** Available on free and paid tiers (with limits).
- **Access:** Perplexity mobile app → tap voice icon.

### Perplexity API (Sonar)
- **What it is:** Developer API for integrating Perplexity's grounded search into other applications. Includes Sonar models and Embeddings API.
- **Good for:** Building search-grounded features into apps, RAG pipelines that need fresh web data.
- **Bad for:** General chat, anything requiring local data.
- **Skill level:** Technical.
- **Pricing:** Pay-per-use, varies by model.
- **Access:** docs.perplexity.ai for API keys and documentation.

---

## CHATGPT / OPENAI

### ChatGPT Chat (default GPT-5)
- **Provider:** OpenAI
- **What it is:** General-purpose conversational AI for writing, analysis, coding, learning, planning, and brainstorming.
- **Good for:** Almost any task — writing, code, analysis, explanations, brainstorming, problem-solving.
- **Bad for:** Real-time current events without web search enabled, autonomous multi-step tasks, very large codebases.
- **Skill level:** Beginner to advanced.
- **Pricing:** Free tier with limits; Plus $20/mo for higher limits and premium models.
- **Access:** chatgpt.com → start a new chat.

### ChatGPT Deep Research
- **What it is:** Autonomous research mode where ChatGPT browses the web for 5-30 minutes, reads dozens of sources, and writes a multi-page sourced report.
- **Good for:** In-depth research, due diligence, comprehensive topic analysis, sourced reports.
- **Bad for:** Quick questions, creative writing, coding.
- **Frequency:** One-off per query.
- **Pricing:** Plus plan or higher (limited monthly runs).
- **Access:** ChatGPT → tools menu → Deep Research.

### ChatGPT Canvas
- **What it is:** Collaborative editing surface where ChatGPT and the user work side-by-side on long documents or code with inline edits, highlights, and revision tracking.
- **Good for:** Writing and editing long documents, code refactoring with explanation, content that needs iterative refinement.
- **Bad for:** Quick questions, one-shot outputs.
- **Skill level:** Beginner to advanced.
- **Pricing:** Available on free and paid tiers.
- **Access:** ChatGPT → tools menu → Canvas.

### ChatGPT Voice Mode
- **What it is:** Real-time voice conversation with ChatGPT, multilingual, with emotional inflection and interruption support.
- **Good for:** Hands-free use, language practice, brainstorming on the go, quick verbal questions.
- **Bad for:** Anything requiring visual output, code, or detailed written responses.
- **Pricing:** Free tier (limited); Plus for full access.
- **Access:** ChatGPT mobile app → voice icon. Web also supports voice.

### ChatGPT Operator
- **What it is:** Agentic browsing mode using OpenAI's CUA (Computer Use Agent) model that autonomously clicks, types, and navigates websites to complete tasks.
- **Good for:** Booking flights, ordering items, filling forms, scraping info, repetitive web tasks.
- **Bad for:** Tasks requiring login to secure financial accounts, anything that needs human judgment on edge cases.
- **Skill level:** Some experience.
- **Pricing:** ChatGPT Pro ($200/mo) required.
- **Access:** operator.openai.com → describe the task.

### ChatGPT Custom GPTs
- **What it is:** User-built specialized GPTs with custom instructions, knowledge files, and actions/tools. A marketplace of community-built GPTs is also available.
- **Good for:** Repeatable workflows with specific personas, domain experts, integrating private knowledge bases.
- **Bad for:** One-off tasks where building a GPT is overkill.
- **Skill level:** Some to advanced.
- **Pricing:** Plus or higher to build; using community GPTs requires Plus.
- **Access:** ChatGPT → Explore GPTs → Create.

### ChatGPT Image Generation (GPT-Image / DALL·E)
- **What it is:** In-chat image generation with strong instruction-following and text rendering.
- **Good for:** Marketing visuals, mockups, illustrations, infographics, images with text.
- **Bad for:** Highly artistic or stylized outputs (Midjourney is better), video.
- **Pricing:** Free tier (limited); Plus for higher limits.
- **Access:** ChatGPT → ask for an image directly.

### ChatGPT Data Analysis (Advanced Data Analysis)
- **What it is:** Python sandbox inside ChatGPT for running code on uploaded files (CSV, Excel, PDF, images) and producing charts, calculations, and outputs.
- **Good for:** Quick data analysis, chart generation, statistical work, file conversion.
- **Bad for:** Production data pipelines, very large datasets, anything requiring persistent storage.
- **Skill level:** Beginner to technical.
- **Pricing:** Plus plan.
- **Access:** ChatGPT → upload file → ask for analysis.

### ChatGPT Codex
- **What it is:** OpenAI's agentic coding tool, separate from the regular chat — runs in a sandboxed environment and can autonomously write, run, and edit code across files.
- **Good for:** Multi-file coding tasks, autonomous feature implementation, agentic dev work.
- **Bad for:** Single-line autocomplete (use Copilot for that), non-coding tasks.
- **Skill level:** Technical.
- **Pricing:** ChatGPT Pro plan.
- **Access:** chatgpt.com/codex.

### OpenAI API
- **What it is:** Developer API access to all OpenAI models (GPT-5, GPT-5 mini, image models, Whisper, embeddings, realtime voice).
- **Good for:** Building any AI-powered product or feature.
- **Skill level:** Technical.
- **Pricing:** Pay-per-token, varies by model.
- **Access:** platform.openai.com.

---

## CLAUDE / ANTHROPIC

### Claude Chat (default Sonnet 4.6)
- **Provider:** Anthropic
- **What it is:** General-purpose conversational AI with particular strengths in nuanced reasoning, long-document handling, writing quality, and code.
- **Good for:** Writing, analysis, complex reasoning, coding, document review, anything requiring careful thought.
- **Bad for:** Real-time web info without web search enabled, image generation, video.
- **Pricing:** Free tier; Pro $20/mo; Max $100-200/mo for heavy usage.
- **Access:** claude.ai → start chat.

### Claude Opus (4.6)
- **What it is:** Anthropic's most capable model, used for the hardest reasoning, research, and coding tasks.
- **Good for:** Complex analysis, hard coding problems, multi-step reasoning, top-tier writing quality.
- **Bad for:** Quick simple tasks (Sonnet is faster and cheaper), anything where speed matters more than depth.
- **Pricing:** Included in Claude Pro (limited messages) and Max plans.
- **Access:** claude.ai → model picker → Opus.

### Claude Projects
- **What it is:** Persistent workspaces with shared context, custom instructions, and uploaded knowledge files that apply to every conversation in the project.
- **Good for:** Ongoing work on a specific topic, codebase, research area, or client. Anything where context persistence matters.
- **Bad for:** One-off questions, throwaway tasks.
- **Skill level:** Beginner to advanced.
- **Pricing:** Pro or higher.
- **Access:** claude.ai → Projects in left sidebar → new project.

### Claude Artifacts
- **What it is:** Side-by-side panel where Claude renders code, documents, diagrams, or interactive components in real time, separate from the chat. Code can be executed and iterated on inline.
- **Good for:** Building single-page apps, interactive components, visualizations, documents that need iterative editing, working prototypes.
- **Bad for:** Multi-file projects, anything needing a real backend.
- **Skill level:** Beginner to advanced.
- **Pricing:** Free and paid tiers.
- **Access:** claude.ai → ask Claude to build or create something visual or executable; an Artifact panel opens automatically.

### Claude Code
- **What it is:** Anthropic's terminal-based agentic coding tool that autonomously reads, writes, edits, and tests code across an entire codebase from the command line.
- **Good for:** Multi-file refactors, autonomous feature implementation, debugging across files, building tools and scripts, agentic dev work in real projects.
- **Bad for:** Total beginners with no ability to evaluate generated code, single-line autocomplete, design work.
- **Skill level:** Some to advanced (need to be comfortable with terminal).
- **Frequency:** Project or ongoing.
- **Pricing:** Included with Pro and Max plans (with usage limits scaling by tier); also available via API.
- **Access:** Install via `npm install -g @anthropic-ai/claude-code`, run `claude` in your project folder.

### Claude in Chrome (Browsing Agent)
- **What it is:** Browser extension that lets Claude operate inside Chrome — reading pages, filling forms, navigating sites, and acting as an agent.
- **Good for:** Web research with action, form filling, navigating complex sites, browser-based agentic workflows.
- **Bad for:** Anything outside the browser, sensitive financial transactions.
- **Skill level:** Beginner to advanced.
- **Pricing:** Beta access via Max plan or waitlist.
- **Access:** claude.ai → Chrome extension install link.

### Claude in Excel
- **What it is:** Spreadsheet agent that lives inside Excel, capable of analyzing data, generating formulas, and acting on spreadsheet content.
- **Good for:** Data analysis in Excel, formula generation, cleaning messy spreadsheets, financial modeling assistance.
- **Bad for:** Non-Excel data workflows.
- **Skill level:** Beginner to advanced.
- **Pricing:** Beta access.
- **Access:** claude.ai → Excel integration setup.

### Claude Cowork
- **What it is:** Desktop application that lets Claude operate files, applications, and tasks across the user's computer — automating workflows beyond a single app. (Not just a Slack integration; it operates broadly across the desktop.)
- **Good for:** File and task management automation, cross-app workflows, non-developer agentic tasks on desktop.
- **Bad for:** Tasks that need persistent server-side automation.
- **Skill level:** Some experience.
- **Pricing:** Beta.
- **Access:** Download from claude.ai.

### Claude API
- **What it is:** Developer API for Claude models (Opus 4.6, Sonnet 4.6, Haiku 4.5) and skills/tools.
- **Good for:** Building any AI-powered product, RAG pipelines, agentic tools.
- **Skill level:** Technical.
- **Pricing:** Pay-per-token (~$3/M input, $15/M output for Sonnet, varies by model).
- **Access:** console.anthropic.com.

---

## GEMINI / GOOGLE

### Gemini Chat (default 2.5 Pro / 3 Pro)
- **Provider:** Google DeepMind
- **What it is:** Multimodal conversational AI with very large context windows and tight integration with Google services.
- **Good for:** Long-context tasks, research, multimodal input (image, audio, video), Google Workspace integration.
- **Bad for:** Tasks where tone and writing quality matter most (ChatGPT/Claude often win), some regions have limited features.
- **Pricing:** Free tier; Google AI Pro ~$20/mo; Ultra plans for heavy usage.
- **Access:** gemini.google.com.

### Gemini Deep Research
- **What it is:** Multi-step research agent that browses the web, plans, refines, and writes long sourced reports.
- **Good for:** Research reports, comprehensive topic exploration with sources, especially anything benefiting from Google's search index.
- **Bad for:** Quick questions, creative writing, coding.
- **Pricing:** Google AI Pro or higher.
- **Access:** gemini.google.com → Deep Research toggle.

### Gemini Canvas
- **What it is:** Collaborative document and code workspace where Gemini and the user co-edit content with inline interactions, similar to ChatGPT Canvas.
- **Good for:** Document drafting, code iteration, content that benefits from side-by-side editing.
- **Bad for:** Quick one-shot tasks.
- **Pricing:** Available in Gemini app.
- **Access:** gemini.google.com → Canvas mode.

### Gemini Live
- **What it is:** Real-time voice and video conversation with Gemini, including screen sharing, camera-based interactions, and live collaboration.
- **Good for:** Hands-free conversation, learning with visual aids, getting help while looking at something, language practice.
- **Bad for:** Detailed written output, code generation in chat.
- **Pricing:** Free and Pro tiers.
- **Access:** Gemini mobile app → Live mode.

### NotebookLM
- **What it is:** A standalone Google product (powered by Gemini) for building persistent notebooks from your own source materials — PDFs, docs, slides, web pages — with AI Q&A, summaries, mind maps, and AI-generated podcasts of your sources.
- **Good for:** Studying, research synthesis, building a knowledge base from your own documents, audio overviews of research material, learning.
- **Bad for:** General chat, anything outside the uploaded source material.
- **Skill level:** Beginner to advanced.
- **Frequency:** Ongoing.
- **Pricing:** Free with a generous tier; NotebookLM Plus for higher limits.
- **Access:** notebooklm.google.com.

### Gemini in Google Workspace (Gmail, Docs, Sheets, Slides)
- **What it is:** Gemini integrated directly into Google Workspace apps for drafting emails, summarizing threads, generating slides, analyzing spreadsheets, and more.
- **Good for:** Productivity work within Google's ecosystem, email drafting, document summarization, spreadsheet help.
- **Bad for:** Anything outside Google apps.
- **Pricing:** Included in Google Workspace Business plans and Google One AI Premium.
- **Access:** Within Gmail, Docs, Sheets, Slides — Gemini icon in toolbar.

### Imagen 4
- **What it is:** Google's flagship image generation model.
- **Good for:** Photo-realistic images, marketing visuals, image generation needing high quality.
- **Bad for:** Highly stylized artistic outputs (Midjourney often preferred).
- **Pricing:** Free tier in Gemini app; API via Vertex AI.
- **Access:** Via Gemini app or Vertex AI.

### Veo
- **What it is:** Google's text-to-video model, capable of generating high-quality video clips from prompts.
- **Good for:** Short-form video generation, marketing clips, creative video work.
- **Bad for:** Long-form video, anything requiring exact control over motion.
- **Pricing:** Limited access via Gemini app and Vertex AI.
- **Access:** Through Gemini or Vertex AI.

### Lyria
- **What it is:** Google's music generation model.
- **Good for:** AI music generation, soundtracks.
- **Pricing:** Limited access.
- **Access:** Via Google AI products.

### Vertex AI / Gemini API
- **What it is:** Developer platform for accessing Gemini models with enterprise features.
- **Pricing:** Pay-per-token.
- **Access:** cloud.google.com/vertex-ai.

---

## GROK / XAI

### Grok Chat
- **Provider:** xAI
- **What it is:** Conversational AI with real-time access to X (Twitter) data and looser content policies than most competitors.
- **Good for:** Current events from X, real-time social info, math and logic problems, less filtered output.
- **Bad for:** Tasks requiring strict safety guardrails, enterprise compliance, polished writing.
- **Pricing:** Free tier; SuperGrok $30/mo; SuperGrok Heavy $300/mo for top models.
- **Access:** grok.com or X app.

### Grok Think (Reasoning Mode)
- **What it is:** Multi-step reasoning mode where Grok runs extended thinking before responding.
- **Good for:** Hard math, complex logic, multi-step problems.
- **Bad for:** Quick questions where speed matters.
- **Pricing:** SuperGrok or higher.
- **Access:** grok.com → Think mode.

### Grok DeepSearch
- **What it is:** Web search-grounded mode that pulls from real-time sources including X.
- **Good for:** Current events, real-time information, things happening on X/social media.
- **Pricing:** Free and paid tiers.
- **Access:** grok.com → DeepSearch toggle.

### Grok Voice
- **What it is:** Voice conversation mode with Grok, including personality modes.
- **Good for:** Hands-free interaction, casual conversation.
- **Pricing:** SuperGrok plan.
- **Access:** Grok mobile app.

### Grok Imagine
- **What it is:** Image and short video generation tool.
- **Good for:** Quick image generation with fewer content restrictions than competitors.
- **Bad for:** High-quality artistic output, longer videos.
- **Pricing:** SuperGrok plan.
- **Access:** grok.com → Imagine.

### xAI API
- **What it is:** Developer API for Grok models.
- **Pricing:** Pay-per-token.
- **Access:** x.ai/api.

---

## META AI

### Meta AI Assistant
- **Provider:** Meta
- **What it is:** Conversational assistant built into Facebook, Instagram, WhatsApp, and Messenger, plus a standalone web interface at meta.ai.
- **Good for:** Quick questions in Meta's apps, casual chat, image generation in chat.
- **Bad for:** Professional work, enterprise tasks, integration with non-Meta tools.
- **Pricing:** Free.
- **Access:** meta.ai or inside any Meta app.

### Meta AI on Ray-Ban Smart Glasses
- **What it is:** Voice and vision AI integrated into Ray-Ban Meta smart glasses.
- **Good for:** Hands-free queries, identifying what you're looking at, capturing and describing surroundings.
- **Pricing:** Free with glasses purchase.
- **Access:** Ray-Ban Meta glasses + Meta View app.

### Meta Imagine (Image Generation)
- **What it is:** Real-time image generation in Meta apps (especially WhatsApp).
- **Good for:** Quick casual images, fast previews as you type.
- **Bad for:** Professional-quality output.
- **Pricing:** Free.
- **Access:** Meta apps → Imagine command.

### Llama Models (Open-Source)
- **What it is:** Meta's open-weights model family (Llama 3 8B/70B and successors) downloadable for research and most commercial use.
- **Good for:** Self-hosted AI, fine-tuning, research, on-device inference, building products without per-token costs.
- **Bad for:** Users without technical setup capabilities, tasks where frontier closed models still win.
- **Skill level:** Technical.
- **Pricing:** Free (compute costs only).
- **Access:** llama.meta.com or Hugging Face.

---

## MICROSOFT COPILOT

### Microsoft 365 Copilot
- **What it is:** AI assistant inside Word, Excel, PowerPoint, Outlook, Teams — leveraging your organization's data via Microsoft Graph.
- **Good for:** Document drafting, email summarization, spreadsheet analysis, slide generation, meeting summaries — all grounded in your work data.
- **Bad for:** Anything outside the Microsoft ecosystem.
- **Pricing:** ~$30/user/month on top of Microsoft 365.
- **Access:** Within Word, Excel, PowerPoint, Outlook, Teams.

### Windows Copilot
- **What it is:** AI assistant built into Windows 11 that can interact with the OS, take actions, and use Copilot Vision to see your screen.
- **Good for:** OS-level help, file management, screen-aware assistance, settings changes.
- **Bad for:** Specialized tasks better served by domain tools.
- **Pricing:** Free with Windows 11.
- **Access:** Windows key + C, or Copilot icon in taskbar.

### Copilot Chat (Bing Chat / Edge)
- **What it is:** Free consumer chat assistant available in Edge browser and Copilot mobile app, powered by GPT-4-class models.
- **Good for:** Free access to powerful chat, web-grounded answers, image generation.
- **Bad for:** Tasks where ChatGPT/Claude provide better quality.
- **Pricing:** Free; Copilot Pro $20/mo for priority access.
- **Access:** copilot.microsoft.com or Edge browser.

### Copilot Studio
- **What it is:** Low-code platform for building custom AI agents and workflows on top of Copilot for enterprise use.
- **Good for:** Custom enterprise AI agents, workflow automation, internal tooling.
- **Skill level:** Some to technical.
- **Pricing:** Enterprise licensing.
- **Access:** copilotstudio.microsoft.com.

### Power Platform Copilot
- **What it is:** AI assistant inside Microsoft's Power Platform (Power BI, Power Apps, Power Automate).
- **Good for:** Building dashboards, apps, and automations within Power Platform.
- **Pricing:** Per-license.
- **Access:** Within Power Platform tools.

### Dynamics 365 Copilot
- **What it is:** AI inside Microsoft's CRM and ERP (Dynamics 365).
- **Good for:** Sales, customer service, supply chain workflows within Dynamics.
- **Pricing:** Per-license.
- **Access:** Within Dynamics 365.

---

## DEVELOPER & AGENTIC CODING TOOLS

### GitHub Copilot
- **What it is:** AI coding assistant integrated into IDEs (VS Code, JetBrains, Visual Studio) offering inline autocomplete, chat, and PR review.
- **Good for:** Inline code suggestions, writing boilerplate, code explanation, PR reviews, codebase-wide chat.
- **Bad for:** Fully autonomous multi-file work (Claude Code, Cursor, or Codex are stronger).
- **Skill level:** Some to advanced.
- **Pricing:** Free tier (limited); Pro $10/mo; Pro+ $39/mo; Enterprise custom.
- **Access:** Install Copilot extension in your IDE.

### Cursor
- **What it is:** Standalone AI-first code editor (fork of VS Code) with deep multi-file AI integration, agents, and tab-completion.
- **Good for:** Active development work where you're driving but want AI as a constant pair programmer, multi-file edits, codebase chat.
- **Bad for:** Total beginners, non-coding work.
- **Skill level:** Technical.
- **Pricing:** Free tier; Pro $20/mo; Business $40/user.
- **Access:** Download from cursor.com.

### Windsurf (formerly Codeium)
- **What it is:** AI code editor and IDE plugin with agentic features, free for individual use.
- **Good for:** Free AI coding alternative, multi-file edits, in-IDE chat.
- **Skill level:** Technical.
- **Pricing:** Free for individuals; paid for teams/enterprise.
- **Access:** windsurf.com.

### Replit
- **What it is:** Browser-based IDE with deployment, hosting, database, and AI coding agent (Replit Agent) built in.
- **Good for:** Building and deploying small apps without local setup, learning to code, quick prototypes, hackathons.
- **Bad for:** Large production codebases, anything needing local dev tools.
- **Skill level:** Beginner to advanced.
- **Pricing:** Free Starter; Core $20/mo; Pro $95/mo.
- **Access:** replit.com.

### Replit Agent
- **What it is:** Replit's autonomous coding agent that builds full apps from a description and deploys them.
- **Good for:** Going from idea to deployed app without coding, especially small projects.
- **Bad for:** Complex production systems.
- **Pricing:** Replit Core or Pro.
- **Access:** Within Replit.

---

## VISUAL APP & UI BUILDERS

### Lovable
- **What it is:** No-code AI app builder that generates full-stack web apps (with database, auth, frontend) from natural-language prompts. Includes hosting.
- **Good for:** Non-coders building MVPs, founders prototyping, fast no-code apps with real backends.
- **Bad for:** Production apps at scale (cost), users who need full code control, complex business logic.
- **Skill level:** Beginner.
- **Frequency:** One-off or project.
- **Pricing:** Free (5 credits/day); Pro $25/mo; Business $50/mo. Realistic active use often runs $100-500/mo.
- **Access:** lovable.dev.

### v0 by Vercel
- **What it is:** AI app and UI builder from Vercel, generating React/Next.js apps with one-click deployment to Vercel.
- **Good for:** Generating UI components, scaffolding Next.js apps, design-to-code workflows, when you want to own and edit the code.
- **Bad for:** Total no-coders (you'll still need to deploy and customize); non-React stacks.
- **Skill level:** Some to advanced.
- **Pricing:** Free tier ($5 credits, ~7 messages/day); Premium $20/mo; Team $30/user; Business $100/user.
- **Access:** v0.dev.

### Bolt (StackBlitz)
- **What it is:** Browser-based AI app builder with instant preview, built-in hosting, and design-system support. Uses Claude under the hood.
- **Good for:** Quick web app prototyping, design-system-aware UI generation, browser-only workflows.
- **Bad for:** Heavy backend work, very large apps (token costs).
- **Skill level:** Some to advanced.
- **Pricing:** Free (300K tokens/day); Pro $25/mo; Teams $30/user.
- **Access:** bolt.new.

---

## DESIGN & VISUAL AI

### Figma AI / Make
- **What it is:** AI features inside Figma, including Figma Make (text-to-design), AI prototyping, and design generation.
- **Good for:** UI design, design system generation, design-to-code workflows in Figma.
- **Pricing:** Included in Figma Professional/Organization plans.
- **Access:** figma.com → AI features in Figma.

### Adobe Firefly
- **What it is:** Adobe's family of generative AI models for image, video, audio, and design — integrated across Photoshop, Illustrator, Premiere, and Express.
- **Good for:** Commercial-safe image/video generation, in-app AI editing in Adobe products, generative fill in Photoshop, text effects.
- **Bad for:** Users not in Adobe ecosystem; sometimes less creative range than Midjourney.
- **Pricing:** Free tier; Firefly Premium $10-30/mo; included in Creative Cloud plans.
- **Access:** firefly.adobe.com or inside Adobe apps.

### Canva AI / Magic Studio
- **What it is:** AI tools inside Canva — Magic Design, Magic Write, Magic Edit, AI image generation, AI presentations.
- **Good for:** Non-designers making social media graphics, presentations, marketing materials.
- **Bad for:** Professional design work requiring precision.
- **Pricing:** Free tier; Canva Pro $15/mo.
- **Access:** canva.com → Magic Studio features.

---

## IMAGE GENERATION (SPECIALIZED)

### Midjourney
- **What it is:** Premier AI image generator known for highly stylized, artistic output. Also supports short video loops (~5s).
- **Good for:** Artistic images, concept art, marketing visuals with style, hero imagery.
- **Bad for:** Accurate text in images, precise control, anything needing API access.
- **Pricing:** Basic $10/mo; Standard $30/mo; Pro $60/mo; Mega $120/mo.
- **Access:** midjourney.com (web) or Discord.

### Ideogram
- **What it is:** Image generator that excels at rendering accurate text in images (logos, posters, signage).
- **Good for:** Designs requiring text, posters, logos, typography-heavy images.
- **Bad for:** Highly stylized art (Midjourney often better).
- **Pricing:** Free tier; Plus $8/mo; Pro $20/mo.
- **Access:** ideogram.ai.

### Stable Diffusion (Open-Source)
- **What it is:** Open-source image generation model family (and ecosystem) that can be run locally or via hosted services.
- **Good for:** Self-hosting, fine-tuning, full control, custom workflows, ComfyUI users.
- **Skill level:** Technical.
- **Pricing:** Free if self-hosted; varies via hosted services.
- **Access:** Hugging Face, Stability AI, or local install.

### Flux (Black Forest Labs)
- **What it is:** Open-weights image model family known for photo-realistic quality, used widely in creative tools.
- **Good for:** Photo-realistic images, high quality without subscription.
- **Skill level:** Technical for self-hosting; available via many platforms.
- **Pricing:** Free open-source; via APIs varies.
- **Access:** blackforestlabs.ai or partner platforms.

---

## VIDEO GENERATION

### Runway
- **What it is:** AI video generation and editing studio (Gen-3 model, image-to-video, video editing tools).
- **Good for:** Text-to-video, image-to-video, professional video editing with AI, filmmaking workflows.
- **Pricing:** Free trial; Standard $15/mo; Pro $35/mo; Unlimited $95/mo.
- **Access:** runwayml.com.

### Sora (OpenAI)
- **What it is:** OpenAI's text-to-video generator, integrated into ChatGPT for higher tiers.
- **Good for:** High-quality video generation from text, photorealistic clips.
- **Pricing:** ChatGPT Plus (limited) or Pro plan.
- **Access:** sora.com or ChatGPT.

### Pika Labs
- **What it is:** Consumer-friendly AI video generator with strong character and effect tools.
- **Good for:** Social-media-friendly AI videos, character-driven clips.
- **Pricing:** Free tier; paid plans from $10/mo.
- **Access:** pika.art.

### Luma Dream Machine
- **What it is:** Text-to-video and image-to-video from Luma AI.
- **Good for:** Realistic motion, smooth video generation, image-to-video.
- **Pricing:** Free tier; paid plans from $10/mo.
- **Access:** lumalabs.ai/dream-machine.

---

## AUDIO & VOICE

### ElevenLabs
- **What it is:** Industry-leading text-to-speech, voice cloning, and AI audio tools.
- **Good for:** Audiobook narration, dubbing, podcast voices, voice cloning, custom voices for apps.
- **Pricing:** Free tier; Starter $5/mo; Creator $22/mo; Pro $99/mo.
- **Access:** elevenlabs.io.

### Suno
- **What it is:** AI music generation that produces full songs (lyrics, vocals, instruments) from text prompts.
- **Good for:** Music creators looking for inspiration, drafts, full songs from prompts.
- **Bad for:** Professional-grade production without further editing.
- **Pricing:** Free tier; Pro $8/mo; Premier $24/mo.
- **Access:** suno.com.

### Udio
- **What it is:** AI music generation competitor to Suno with strong quality.
- **Good for:** Same as Suno; alternatives for music generation.
- **Pricing:** Free tier; Standard $10/mo; Pro $30/mo.
- **Access:** udio.com.

### Descript
- **What it is:** AI audio/video editor that lets you edit audio by editing text transcripts, plus voice cloning ("Overdub").
- **Good for:** Podcast editing, video editing with transcript-based workflow, cleaning up speech.
- **Pricing:** Free tier; Hobbyist $12/mo; Creator $24/mo; Business $40/mo.
- **Access:** descript.com.

---

## PRODUCTIVITY & WORKSPACE AI

### Notion AI
- **What it is:** AI features embedded inside Notion for writing, summarizing, automating tasks, and querying workspace content. Includes Notion Agent for multi-step automation.
- **Good for:** Anyone already using Notion who wants AI inside their docs and databases.
- **Bad for:** Non-Notion users.
- **Pricing:** Included in Business ($20/user) and Enterprise; some features use credits.
- **Access:** Within Notion.

### Coda AI
- **What it is:** AI features in Coda's docs/database hybrid platform.
- **Good for:** Coda users wanting AI inside their workspace.
- **Pricing:** Included in paid Coda plans.
- **Access:** Within Coda.

### Slack AI
- **What it is:** AI features inside Slack — message summaries, channel recaps, search.
- **Good for:** Slack-heavy teams catching up on missed conversations.
- **Pricing:** Slack add-on, per-user.
- **Access:** Within Slack workspace.

---

## SEARCH ALTERNATIVES

### You.com
- **What it is:** AI-powered search with multiple model options and agentic features.
- **Good for:** Search alternative to Perplexity, multi-model access in one place.
- **Pricing:** Free tier; Pro $20/mo.
- **Access:** you.com.

### Phind
- **What it is:** AI search optimized for developers and technical questions.
- **Good for:** Programming help, debugging, technical documentation search.
- **Pricing:** Free tier; Pro $20/mo.
- **Access:** phind.com.

---

## NOTES ON COVERAGE

This document covers the major consumer and prosumer AI products as of May 2026. It is intentionally not exhaustive — many vertical or enterprise tools (legal AI, medical AI, sales AI, customer service AI) are out of scope for the recommender's first version. The matching engine should focus on the products listed here and add specialized verticals later if user demand surfaces.

Pricing and features change frequently. The `lastVerified` date on each `tools.json` entry will track freshness, and the GitHub Action update pipeline (when added) will flag outdated entries for review.
