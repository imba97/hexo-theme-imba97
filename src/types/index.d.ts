import type { NProgress } from 'nprogress'

import Index from '../layout/index'

declare global {
  const NProgress: NProgress
  const Pjax: any
  const Index: typeof Index
}
