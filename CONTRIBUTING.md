# Contributing to the Archive

Thank you for helping document how companies and institutions refer to Chinese New Year! This guide walks you through adding a new entry — **no coding experience required**. Everything can be done through GitHub's web interface.

---

## What You'll Need

1. A **GitHub account** ([sign up free](https://github.com/signup))
2. A **screenshot** of the company's page showing how they refer to the holiday
3. The **URL** of that page

---

## How to Add an Entry

### 1. Take a Screenshot

- Go to the company's page that mentions Chinese New Year (or "Lunar New Year")
- Screenshot the relevant section
- Name the file descriptively, e.g. `kering_cny_2026.jpg` or `byredo_lny_2026.jpg`

### 2. Upload the Screenshot

1. Go to the `screenshots/` folder in this repository
2. Click **Add file** → **Upload files**
3. Upload your screenshot and click **Commit changes**

### 3. Add a JSON Entry

Choose the right file:

- Used **"Chinese New Year"** → edit `data/cny.json`
- Used **"Lunar New Year"** → edit `data/lny.json`

Then:

1. Click the **pencil icon** (✏️) to edit the file
2. Add a new entry at the **top** of the array (after the opening `[`):

```json
  {
    "name": "Company Name",
    "url": "https://www.example.com/page-url",
    "screenshot": "screenshots/company_cny_2026.jpg",
    "note": "Optional context."
  },
```

3. Click **Commit changes**

### 4. Submit a Pull Request

1. You should see a banner saying "This branch is X commits ahead…"
2. Click **Contribute** → **Open pull request**
3. Add a brief title, e.g. "Add Kering CNY 2026"
4. Click **Create pull request**

That's it! We'll review your entry and merge it.

---

## Field Reference

| Field        | Required | Description                                       |
| ------------ | -------- | ------------------------------------------------- |
| `name`       | ✅ Yes   | Company or brand name                             |
| `url`        | ✅ Yes   | Direct link to the company's relevant page        |
| `screenshot` | ✅ Yes   | Path to your screenshot in `screenshots/`         |
| `note`       | ❌ No    | Optional context about how they referred to it    |

---

## Guidelines

- **Accuracy matters.** Only add entries where the company clearly uses "Chinese New Year" or "Lunar New Year" in official materials.
- **Screenshots should be clear** and show the relevant text prominently.
- **Be respectful.** This project advocates for historical accuracy, not hostility toward any company or culture.

---

## Questions?

Open an [Issue](../../issues) and we'll help!
