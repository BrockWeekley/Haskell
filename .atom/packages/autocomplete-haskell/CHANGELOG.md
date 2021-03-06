## 1.0.1
* Unicode identifiers and operators properly supported via XRegExp
* Parenthesized operators omitted from operator suggestions

## 1.0.0
* Suggest operators in completions
* Hide hint panel by default
* Optionally show completion hint as ide-haskell tooltips
* Cleanup & minor fixes
* Rewrite in TypeScript
* Migrate to UPI 0.3

## 0.7.2
* Use atom-highlight for completion hint panel

## 0.7.1
* Fix keybinding deactivation

## 0.7.0
* hideHintPanelIfEmpty, remove old workarounds
* Atom version bump
* Fix LICENSE date
* Update LICENSE

## 0.6.7
* Add option for default hint panel visibility

## 0.6.6
* Support instance overlap pragmas

## 0.6.5
* Fix preprocessorSuggestions

## 0.6.4
* Updates for ac-p 2.25 and bugfixes
* 'ingoreMinimumWordLengthForHoleCompletions' option to control hole completions on keystroke.

## 0.6.3
* Match type scope on meta.type-signature.haskell
* Add package keywords

## 0.6.2
* Delayed hint panel grammar setting, use hint grammar

## 0.6.1
* Activate autocomplete-haskell only on Haskell files

## 0.6.0
* Add a panel with last completion hint (https://github.com/atom-haskell/ide-haskell/issues/99)

## 0.5.1
* Screencasts update

## 0.5.0
* Allow for hole completion refinement

## 0.4.5
* Support for haskell-ghc-mod 0.8.0

## 0.4.4
* Bail on completion if no backend

## 0.4.3
* Deactivation fix

## 0.4.2
* Set inclusionPriority=0

## 0.4.1
* atom-backend-helper version bump

## 0.4.0
* Use haskell-completion-backend service
* Add message on multiple backends and none selected
* Possible undefined symbol module
* Remove dep on underscore-plus
* Specify atom version according to docs
* Specify package versions
* Add info on haskell-completion-backend service
* Use fuzzaldrin
* Added pragma words, general overhaul
* Cleanup, array scopes, support for exportsScope

## 0.3.1
* Fix deprecated ac+ blacklist option

## 0.3.0
* Updated to work with newest haskell-ghc-mod
* Hole completions no longer depend on Hoogle
* Autocomplete+ API 2.0
* Changed EditorController to BufferController

## 0.2.1
* BUGFIX: activation problems

## 0.2.0
* Migrate to new json-based service provider
* Move out provider code to sep. file
* Bump atom version

## 0.1.2
* Fix typo
* A little refactoring

## 0.1.1
* Use atom.services.consume once and pass reference around

## 0.1.0 - First Release
* Initial release
