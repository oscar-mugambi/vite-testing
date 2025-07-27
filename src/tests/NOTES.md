## ⚙️ SETUP

### ✅ 1. Install & Configure Vitest

- Installed **Vitest extension** in VS Code.
- Created shortcut `iv` to expand to `import { describe, expect, it } from 'vitest';`
- Set up **Vitest UI** to visualize test results.
- Use itr to import test functions like `describe`, `it`, etc.

### ✅ 2. Simulating Browser Environment

- Our tests run in a **Node.js environment**, which **doesn't have browser APIs** like `document`, `window`, etc.
- To fix this, we use **JSDOM**, which simulates a browser inside Node.

### ✅ 3. Configure Vitest to Use JSDOM

In your `vite.config.ts` or `vitest.config.ts`:

```ts
test: {
  environment: 'jsdom',
}
```

### ✅ 4. Setup for DOM Matchers

- Installed `@testing-library/jest-dom`.
- It adds extra **custom matchers** like `.toBeInTheDocument()`, `.toHaveTextContent()`, etc., for **DOM assertions**.

---

## ⚛️ TESTING REACT COMPONENTS

### 🎯 What You Should Test

- ✅ The **behavior** of the component (What it does)
- ❌ Not the **implementation details** (How it does it)

> Example: Don’t check internal state or method calls. Instead, check what the user sees or can interact with.

---

### 🔍 1. Testing Rendering

- Confirm that the component renders with the expected elements and content.

```tsx
render(<MyComponent />);
expect(screen.getByText('Hello')).toBeInTheDocument();
```

---

### 🧑‍💻 2. Testing User Interactions

- Use `userEvent` to simulate user actions (clicks, typing, etc.)

```tsx
userEvent.click(screen.getByRole('button', { name: 'Submit' }));
expect(mockHandler).toHaveBeenCalled();
```

---

### 🧩 3. Working with Component Libraries

- When using libraries like **Material UI**, **Chakra**, or **Tailwind UI**, always test **visible behavior** (e.g. "is modal open?") rather than internal classNames or DOM structure.

---

## 📌 REMINDERS

- 🧪 Keep tests **focused** — one behavior per test.
- 🔁 Use `describe()` to group related tests.
- 🧼 Use `beforeEach()` to set up repeatable logic or mocks.
- 🧰 Use `jest-dom` matchers for **better readability**: `.toBeInTheDocument()`, `.toHaveAttribute()`, etc.

# 🧪 React + Vitest Setup Notes

## ✅ Query Methods in React Testing Library

- You can use various query methods like `getByText`, `getByLabelText`, `getByTestId`, etc.
- Prefer `getByRole`:
  - It's more robust and reliable.
  - Reflects how real users (and screen readers) interact with the UI.
  - Encourages testing behavior over implementation details.

---

## ⚙️ Vitest Configuration Steps

- In `vitest.config.ts`, set up your test environment:
  - Enable the `jsdom` environment to simulate browser APIs.
  - Enable `globals: true` to use global test functions like `describe` and `it` without importing them.
  - Specify a setup file using `setupFiles`.

```ts
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: 'src/tests/setup.ts',
}
```

### User interactions

We use fire event to simulate user interactions.
We do not use fireEvent because it a lightweight wrapper around the native event system. It does not simulate a real world scenario
