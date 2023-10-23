import type { NProgress } from 'nprogress'

import Index from '../page/index'

declare global {
  const NProgress: NProgress
  const Pjax: any
  const Index: typeof Index
}
