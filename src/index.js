/**
 * @module input/bibjson
 */

import { plugins } from '@citation-js/core'
import { ref, formats as input } from './input'

plugins.add(ref, { input })
