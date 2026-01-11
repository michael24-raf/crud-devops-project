import { describe, test, expect, vi } from 'vitest'
import {
  getAllUsers,
  createUser,
  deleteUser,
  checkHealth,
} from '../src/services/api'

global.fetch = vi.fn()

describe('API service', () => {
  test('getAllUsers retourne une liste', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ data: [] }),
    })

    const res = await getAllUsers()
    expect(res.data).toEqual([])
  })

  test('createUser fonctionne', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ success: true }),
    })

    const res = await createUser({ name: 'Test' })
    expect(res.success).toBe(true)
  })

  test('deleteUser fonctionne', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ success: true }),
    })

    const res = await deleteUser(1)
    expect(res.success).toBe(true)
  })

  test('checkHealth retourne OK', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ success: true }),
    })

    const res = await checkHealth()
    expect(res.success).toBe(true)
  })
})
