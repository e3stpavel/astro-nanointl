# Contribute to the project
Hey there! Thanks for interest in contributing to this repository. You can freely work on this project and/or ask for help if needed. For newcomers, I recommend you to check [this guidelines](https://github.com/firstcontributions/first-contributions).

## Set things up
Clone the repo and install the dependencies:
```shell
git clone && cd ...
pnpm install
```

## Testing and code style
To run tests use:
```shell
pnpm test
```

Also before commiting make sure you follow the consistent code style:
```shell
pnpm lint # to check for issues
pnpm lint --fix # to fix autofixable issues
```

Also I personally recommend to test if everything is working by `pnpm link ...` (or [using `file:` protocol](https://github.com/pnpm/pnpm/issues/6804#issuecomment-1635571574)) to some empty Astro project.

## Pushing your changes
Once you are ready with your changes please do not forget to use
```shell
pnpm changeset
```
to add the [`changeset`](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md). It is important to keep the track of the changes needed to release the next version. Then you're ready to create pull request.
