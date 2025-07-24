## ⚙️ SETUP

### ✅ 1. Install & Configure Vitest

- Installed **Vitest extension** in VS Code.
- Created shortcut `iv` to expand to `import { describe, expect, it } from 'vitest';`
- Set up **Vitest UI** to visualize test results.

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
