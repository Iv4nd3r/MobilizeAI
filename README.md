<a href="https://aiweather.vercel.ai/">
  <img alt="AIWeather: Weather forecasting with AI." src="https://aiweather.vercel.rocks/og.png">
  <h1 align="center">AIWeather: Weather Forecasting with AI</h1>
</a>

<p align="center">
  An open-source AI weather forecasting app built with Next.js, the Vercel AI SDK, Google Gemini, and OpenWeather API.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Integration with Google Gemini and OpenWeather API for AI-powered weather forecasting
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Phosphor Icons](https://phosphoricons.com)
- Session storage with [Vercel KV](https://vercel.com/storage/kv)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication

## Model Providers

This template ships with Google Gemini `models/gemini-1.0-pro-001` as the default. However, thanks to the [Vercel AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), [Hugging Face](https://huggingface.co), or using [LangChain](https://js.langchain.com) with just a few lines of code.

## Deploy Your Own

You can deploy your own version of the AIWeather to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?demo-title=AIWeather&demo-description=A+full-featured%2C+hackable+Next.js+AI+weather+forecasting+built+by+Vercel+Labs&demo-url=https%3A%2F%2Faiweather.vercel.ai%2F&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4aVPvWuTmBvzM5cEdRdqeW%2F4234f9baf160f68ffb385a43c3527645%2FCleanShot_2023-06-16_at_17.09.21.png&project-name=AIWeather&repository-name=aiweather&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Faiweather&from=templates&skippable-integrations=1&env=GOOGLE_GENERATIVE_AI_API_KEY%2CAUTH_SECRET&envDescription=How+to+get+these+env+vars&envLink=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Faiweather%2Fblob%2Fmain%2F.env.example&teamCreateStatus=hidden&stores=[{%22type%22:%22kv%22}])

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run AIWeather. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various Google Cloud and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

## Authors

This library is created by [Vercel](https://vercel.com) and [Next.js](https://nextjs.org) team members, with contributions from:

- Jared Palmer ([@jaredpalmer](https://twitter.com/jaredpalmer)) - [Vercel](https://vercel.com)
- Shu Ding ([@shuding\_](https://twitter.com/shuding_)) - [Vercel](https://vercel.com)
- shadcn ([@shadcn](https://twitter.com/shadcn)) - [Vercel](https://vercel.com)
- Jeremy Philemon ([@jrmyphlmn](https://twitter.com/jrmyphlmn)) - [Vercel](https://vercel.com)

This project is adapted for AIWeather by Ivander Andreas Wijaya