import { plugins } from '@citation-js/core'
import '..'

const b = plugins.input.data(1e10, '@isbn/number')

type Expect<T extends true> = T
type IsString<T> = T extends string ? true : false

// @ts-ignore
type Tests = [
  Expect<IsString<typeof b>>
]
