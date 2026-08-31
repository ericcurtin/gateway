import { ProviderAPIConfig } from '../types';

// llmman (https://github.com/llmmanorg/llmman) serves OpenAI-, Ollama- and
// Anthropic-compatible APIs, so the endpoints match the Ollama-API provider.
// Only the default host differs: llmman listens on 17434.
const LLMMAN_DEFAULT_HOST = 'http://localhost:17434';

const LlmmanAPIConfig: ProviderAPIConfig = {
  headers: () => {
    return {};
  },
  getBaseURL: ({ providerOptions }) => {
    return providerOptions.customHost ?? LLMMAN_DEFAULT_HOST;
  },
  getEndpoint: ({ fn, providerOptions }) => {
    let mappedFn = fn;
    const { urlToFetch } = providerOptions;
    if (fn === 'proxy' && urlToFetch && urlToFetch?.indexOf('/api/chat') > -1) {
      mappedFn = 'chatComplete';
    } else if (
      fn === 'proxy' &&
      urlToFetch &&
      urlToFetch?.indexOf('/embeddings') > -1
    ) {
      mappedFn = 'embed';
    }

    switch (mappedFn) {
      case 'chatComplete': {
        return `/v1/chat/completions`;
      }
      case 'embed': {
        return `/api/embeddings`;
      }
      default:
        return '';
    }
  },
};

export default LlmmanAPIConfig;
