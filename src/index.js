/**
 * @module input/bibjson
 */

import { plugins } from '@citation-js/core'
import { ref, formats as input } from './input.js'

plugins.add(ref, { input })
