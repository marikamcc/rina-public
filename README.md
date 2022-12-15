This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

# Specs for this project

- Posts require [date, title, tags] in the frontmatter of the .md file.  Except for date, these values can be null.
- There is an issue about the way I have done the tags (calling functions to generate) and it throws an error "Warning: Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information."  So far it is not a big deal.  We'll see how that changes though.