import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import App from '../src/App'

// 🔹 MOCK DE L’API
vi.mock('../src/services/api', () => ({
  checkHealth: vi.fn(() => Promise.resolve()),
  getAllUsers: vi.fn(() =>
    Promise.resolve({ data: [] })
  ),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}))

describe('App component', () => {
  test('affiche le titre et le statut API en ligne', async () => {
    render(<App />)

    // ✅ Le titre principal
    expect(
      screen.getByText(/CRUD DevOps - Gestion Utilisateurs/i)
    ).toBeInTheDocument()

    // ✅ Attendre que l’API passe en ligne
    await waitFor(() =>
      expect(
        screen.getByText(/API en ligne/i)
      ).toBeInTheDocument()
    )
  })
})
