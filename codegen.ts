import type { CodegenConfig } from '@graphql-codegen/cli'
import { uris } from './lib/constants'

const config: CodegenConfig = {
  // TODO: parameterize
  schema: uris.graph,
  documents: ['lib/**/*.{ts,tsx}'],
  generates: {
    './lib/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        withHooks: true,
        scalars: {
          ID: 'string',
          Bytes: 'string',
          BigInt: 'string',
        },
      },
    },
  },
}
export default config
