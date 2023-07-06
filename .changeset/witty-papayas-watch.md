---
"astro-nanointl": patch
---

Fixed types to work with `moduleResolution` not in `Node16` or `NodeNext`. 

Before you needed to [set `moduleResolution` in `compilerOptions` to `Node16` or `NodeNext`](https://stackoverflow.com/a/70020984) in order to types work. Now you don't need to. It should work out of the box!
