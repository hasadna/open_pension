# Contributing Guidelines

A few set of guidelines 

### General

Develop features in a topic branch

### Linting

`npm run lint`

### Commit Message Format
try to follow formating for commits:

 **type**, a **scope** and a **subject**:

```
 <type>(<scope>): <subject>
```

Lines should not exceed 100 characters. This allows the message to be easier to read on github as well as in various git tools and produces a nice, neat commit log ie:

```
 #459  refactor(utils): create url mapper utility function
 #463  chore(webpack): update to isomorphic tools v2
 #494  fix(babel): correct dependencies and polyfills
 #510  feat(app): add react-bootstrap responsive navbar
``` 

#### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Scope

The scope could be anything specifying place of the commit change. For example `webpack`,
`helpers`, `api` etc...

#### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end
