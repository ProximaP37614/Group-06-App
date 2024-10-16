/* eslint-disable */
/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

/**
 * PAGES
 */
const PAGES = {
  "/": `/`,
  "/auth/login": `/auth/login`,
  "/auth/register": `/auth/register`,
  "/auth/สำรอง": `/auth/สำรอง`,
  "/customer/list_ticket": `/customer/list_ticket`,
  "/customer/payment": `/customer/payment`,
  "/customer/reservation": `/customer/reservation`,
  "/customer/reservation_change": `/customer/reservation_change`,
  "/customer/search": `/customer/search`,
  "/customer/search_change": `/customer/search_change`,
  "/customer/ticket": `/customer/ticket`,
  "/dashboard": `/dashboard`,
  "/staff/addstations": `/staff/addstations`,
  "/staff/addtrips": `/staff/addtrips`,
  "/staff/check": `/staff/check`,
  "/staff/check/check2": `/staff/check/check2`,
  "/staff/check/check2/confirm_ticket": `/staff/check/check2/confirm_ticket`,
  "/staff/manage": `/staff/manage`,
  "/staff/payment": `/staff/payment`,
  "/staff/reservation": `/staff/reservation`,
  "/staff/search": `/staff/search`,
  "/staff/ticket": `/staff/ticket`,
  "/test": `/test`
}

/**
 * SERVERS
 */
const SERVERS = {
  
}

/**
 * ACTIONS
 */
const ACTIONS = {
  "default /auth/login": `/auth/login`,
  "deleteAllUsers /auth/register": `/auth/register?/deleteAllUsers`,
  "registerUser /auth/register": `/auth/register?/registerUser`,
  "default /auth/สำรอง": `/auth/สำรอง`,
  "simulatePayment /customer/payment": `/customer/payment?/simulatePayment`,
  "default /logout": `/logout`,
  "simulatePayment /staff/payment": `/staff/payment?/simulatePayment`
}

/**
 * LINKS
 */
const LINKS = {
  
}

type ParamValue = string | number | undefined

/**
 * Append search params to a string
 */
export const appendSp = (sp?: Record<string, ParamValue | ParamValue[]>, prefix: '?' | '&' = '?') => {
  if (sp === undefined) return ''

  const params = new URLSearchParams()
  const append = (n: string, v: ParamValue) => {
    if (v !== undefined) {
      params.append(n, String(v))
    }
  }

  for (const [name, val] of Object.entries(sp)) {
    if (Array.isArray(val)) {
      for (const v of val) {
        append(name, v)
      }
    } else {
      append(name, val)
    }
  }

  const formatted = params.toString()
  if (formatted) {
    return `${prefix}${formatted}`
  }
  return ''
}

/**
 * get the current search params
 * 
 * Could be use like this:
 * ```
 * route("/cities", { page: 2 }, { ...currentSP() })
 * ```
 */ 
export const currentSp = () => {
  const params = new URLSearchParams(window.location.search)
  const record: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    record[key] = value
  }
  return record
}

// route function helpers
type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never

const AllObjs = { ...PAGES, ...ACTIONS, ...SERVERS, ...LINKS }
type AllTypes = typeof AllObjs

export type Routes = keyof AllTypes extends `${string}/${infer Route}` ? `/${Route}` : keyof AllTypes
export const routes = [
	...new Set(Object.keys(AllObjs).map((route) => /^\/.*|[^ ]?\/.*$/.exec(route)?.[0] ?? route)),
] as Routes[]

/**
 * To be used like this: 
 * ```ts
 * import { route } from './ROUTES'
 * 
 * route('site_id', { id: 1 })
 * ```
 */
export function route<T extends FunctionKeys<AllTypes>>(key: T, ...params: FunctionParams<AllTypes[T]>): string
export function route<T extends NonFunctionKeys<AllTypes>>(key: T): string
export function route<T extends keyof AllTypes>(key: T, ...params: any[]): string {
  if (AllObjs[key] as any instanceof Function) {
    const element = (AllObjs as any)[key] as (...args: any[]) => string
    return element(...params)
  } else {
    return AllObjs[key] as string
  }
}

/**
* Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
*
* Full example:
* ```ts
* import type { KIT_ROUTES } from './ROUTES'
* import { kitRoutes } from 'vite-plugin-kit-routes'
*
* kitRoutes<KIT_ROUTES>({
*  PAGES: {
*    // here, key of object will be typed!
*  }
* })
* ```
*/
export type KIT_ROUTES = {
  PAGES: { '/': never, '/auth/login': never, '/auth/register': never, '/auth/สำรอง': never, '/customer/list_ticket': never, '/customer/payment': never, '/customer/reservation': never, '/customer/reservation_change': never, '/customer/search': never, '/customer/search_change': never, '/customer/ticket': never, '/dashboard': never, '/staff/addstations': never, '/staff/addtrips': never, '/staff/check': never, '/staff/check/check2': never, '/staff/check/check2/confirm_ticket': never, '/staff/manage': never, '/staff/payment': never, '/staff/reservation': never, '/staff/search': never, '/staff/ticket': never, '/test': never }
  SERVERS: Record<string, never>
  ACTIONS: { 'default /auth/login': never, 'deleteAllUsers /auth/register': never, 'registerUser /auth/register': never, 'default /auth/สำรอง': never, 'simulatePayment /customer/payment': never, 'default /logout': never, 'simulatePayment /staff/payment': never }
  LINKS: Record<string, never>
  Params: Record<string, never>
}