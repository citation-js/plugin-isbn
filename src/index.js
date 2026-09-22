/**
 * @module input/bibjson
 */

import { plugins } from '@citation-js/core'
import { ref, formats as input } from './input.js'
import config from './config.js'

plugins.add(ref, { input, config })
