import { ProviderConfigs } from '../types';
import {
  OllamaEmbedConfig,
  OllamaEmbedResponseTransform,
} from '../ollama/embed';
import LlmmanAPIConfig from './api';
import {
  OllamaChatCompleteConfig,
  OllamaChatCompleteResponseTransform,
  OllamaChatCompleteStreamChunkTransform,
} from '../ollama/chatComplete';

// llmman serves the same wire APIs, so the request/response transforms are
// shared; only the API config (default host) differs.
const LlmmanConfig: ProviderConfigs = {
  embed: OllamaEmbedConfig,
  api: LlmmanAPIConfig,
  chatComplete: OllamaChatCompleteConfig,
  responseTransforms: {
    chatComplete: OllamaChatCompleteResponseTransform,
    'stream-chatComplete': OllamaChatCompleteStreamChunkTransform,
    embed: OllamaEmbedResponseTransform,
  },
};

export default LlmmanConfig;
