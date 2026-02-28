import { combineRegistry, RegistryCompiler, writeFumadocsRegistry } from '@fumadocs/cli/build';
import { registry } from '@/components/registry.js';

export async function buildRegistry() {
  const result = await new RegistryCompiler(registry).compile();
  const all = combineRegistry(result);

  await writeFumadocsRegistry(all, {
    dir: 'public/registry',
  });
}
